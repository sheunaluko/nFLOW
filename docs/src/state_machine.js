//Wed Oct  3 09:42:59 PDT 2018
// I remembered my development mantra - be patient. simplify. Refactor when necessary 

import {makeLogger} from "./logger.js"
import ui from "./ui.js"
import {util} from "../module_resources/utils.js"

/**
 * 
 * 
 */

 class state_machine {

    /**
     * 
     * 
     */ 
    constructor(opts) { 
	var {buffer_size, gui_mode, debug_mode, init} = opts
	this.log = makeLogger("SM") 
	this.buffer_size = buffer_size 
	this.sensor_buffer_size = buffer_size 
	this.buffer = Array(buffer_size).fill(default_data_obj)
	this.sensors = {} 
	this.transitioners = {} 
	this.transitioner_groups = {} 
	this.STATE  = init || {} 
	this.gui_mode = gui_mode 
	this.debug_mode = debug_mode || false 
	if (gui_mode) { 
	    //create the sensor_gui buffer 
	    this.sensors_gui_buffer = {}
	    
	    this.ui_mapping = null
	    
	    //also create a ui object  
	    this.ui = new ui(null) 
	} 
    } 
    
    
    /** 
     * Initializes the state machine
     * @param {Object} state - the initial state for the state machine 
     */
    initialize(state) { 
	this.STATE = state 
    } 


    /** 
     * Updates buffer with a data object. Uses js function `.shift()` to cycle array. 
     * @param {Object} obj - Data object to consume 
     */
    update_buffer_with_data_object(obj) { 
	this.buffer.push(obj) 
	this.buffer.shift() 
    } 
    
    /*
     * Computes the order that sensors will be evaluated in 
     */
    set_sensor_order() { 
	var compare = function(x,y) { 
	    var l1 = x[1].level
	    var l2 = y[1].level
	    //console.log( [l1, l2] ) 
	    if (l1 > l2 ) {   //index 2 is the level ! 
		return 1
	    } else  { 
		return -1
	    } 
	}
	this.sensor_order = util.dict_2_vec(this.sensors).sort(compare).map(e=>e[0])
    }
    
    
    /** 
     * Adds a sensor to the state machine. 
     * @param {Object} opts - contains id, f (function) , graph (if gui_mode). Graph should be id of the graph that the sensor should be graphed on 
     */
    add_sensor(opts) { 
	var id,f,l
	id = opts.id ; f = opts.f ; l = opts.level 
	//register the sensor 
	this.sensors[id] = {} 
  	//add the function 
	this.sensors[id]["function"] = f 
	//and then allocate a buffer for the sensor values 
	this.sensors[id]["buffer"] = Array(this.sensor_buffer_size).fill(NaN) 
	//and then allocate the sensor level, 0 if undefined 
	this.sensors[id]["level"] = l || 0 
	//and create the 'last_skipped' flag (see run sensor for more information) 
	this.sensors[id]["last_skipped"] = false 
	if (this.debug_mode) { 
	    this.log("Added sensor: " + id) 
	}
	this.set_sensor_order() 
    } 
    
    /** 
     * 
     * Init gui 
     * @param {String|DOM} container - id or reference for container to render into 
     * @param {Object} ui_mapping - Dictionary where keys are graph ids and vals are vectors of the sensors which could be graphed on that graph. E.g { graph-1 : ["acc_x", "acc_z" ] , etc} 
     */
    init_gui(container, ui_mapping) { 
	this.ui_mapping = ui_mapping 
	//loop through the graphs 
	for (var graph in this.ui_mapping )  { 
	    var sensors = this.ui_mapping[graph] 
	    this.ui.add_graph(graph, sensors)  // initializes a graph 
	} 
	
	//after all the graphs have been added then we call init 
	this.ui.init(container) 
	
    } 

    
    /** 
     * Runs the sensor function with the state machine buffer as input 
     * then updates the corresponding sensor's buffer.
     * @param {String} id - Sensor id to run   
     */
    run_sensor(id) { 
	//get the sensor function
	var f = this.sensors[id]["function"]
	//run the sensor passing in the sm object
	var val = f(this) 
	
	/*
	  sensors 
	  only append the value if it exists 
	  this allows the ability for sensors to act simultaneously as data filters 
	  by introspecting on the data_packet somehow and deciding to reject it from 
	  their buffer. 
	 
	*/
	
	if (val) { 
	    //append the new value to the sensors buffer 
	    this.sensors[id]["buffer"].push(val)
	    this.sensors[id]["buffer"].shift() 
	    this.sensors[id]["last_skipped"] = false 
	}  else {
	    //the sensor rejected a value. In this case, it can be helpful to set a special 
	    //flag in case there are sensors which derive from this one and also wish to 
	    //reject 
	    this.sensors[id]["last_skipped"] = true 
	}
	
	return val 
    } 

    /** 
     * Utility function for retrieving the last N values of a sensor's buffer
     * Used to make it easier to write Detectors 
     * @param {String} id - Sensor id 
     * @param {Number} num - The number of values to retrieve from END of buffer 
     */
    get_sensor_last_N(id,num) { 
	if (this.sensors[id]["last_skipped"]) { 
	    //we have skipped a value, so will pass that info on 
	    return false 
	} else { 
	    return this.sensors[id]["buffer"].slice(this.buffer_size - num) 
	}
    }

    /** 
     * Utility function for retrieving the last value of a sensor's buffer
     * Used to make it easier to write Detectors 
     * @param {String} id - Sensor id 
     */
    get_sensor_last_1(id) { 
	if (this.sensors[id]["last_skipped"]) { 
	    //we have skipped a value, so will pass that info on 
	    return false 
	} else { 
	    return util.first(this.get_sensor_last_N(id, 1 ) )
	} 
    }
    
    /** 
     * Adds a transitioner to the state machine. 
     * @param {String} id - Transitioner id for reference 
     * @param {Object} transitioner - Transitioner implementation (Object with keys [detector, applicator]) The detector and applicator both  accept the state_machine object in its entirety in order to allow easy access to all fields. 
     */
    add_transitioner(id,transitioner) { 
	//make sure it has what we want 
	if (! (transitioner.detector && transitioner.applicator ) ) { 
	    throw "Transitioner object does not contain both detector and applicator!" 
	} 
	
 	//register the transitioner
	this.transitioners[id] = transitioner 
	
	//if it is part of a group we register that too , and by default activate it 
	if (transitioner.group) { 
	    this.transitioner_groups[transitioner.group] = true 
	}
	
	if (this.debug_mode) { 
	    this.log("Added transitioner: " + id) 
	}

    }
    
    /** 
     * Runs the transitioner 
     * @param {String} id - Transitioner to run 
     */
    run_transitioner(id) { 
	//get the transitioner  
	var transitioner = this.transitioners[id] 
	
	//get the group and group status
	var group = transitioner.group
	var group_status = this.transitioner_groups[group]
	
	//only run if group is NULL or if it exists and is TRUE 
	if ( group_status != false ) {
	    
	    //get the detector and applicator 
	    var detector = transitioner.detector 
	    var applicator = transitioner.applicator 

	    
	    //the detector and applicator both  accept the state_machine object in its entirety in order to allow easy access to all fields 
	    //apply the applicator IF the detector returns true  
	    if (detector(this)) { 
		if (this.debug_mode) { this.log(":match: => " + id) }
		applicator(this)  // the applciator will actually mutate the this.STATE object  
		// deactivate this group if it is part of one
		if (group_status) { 
		    this.transitioner_groups[group] = false 
		} 
	    } else { 
		if (this.debug_mode) { this.log(":fail: => " + id) }
	    }
	    
	}
	
    } 
    
    
    
    /** 
     * Run all sensors. Will sort them by the sensor level 
     */
    run_sensors() { 
	for (var i =0 ; i < this.sensor_order.length; i++ ) { 

	    var sensor_id = this.sensor_order[i]
	    var val = this.run_sensor(sensor_id) 
	    
	    if (this.debug_mode) {
		this.log("Ran sensor: " + sensor_id + " with result: " )
		this.log(val)
	    }
	    
	    if (this.gui_mode){ 
		this.sensors_gui_buffer[sensor_id] = val 
	    }
	}
	
    }


    /** 
     * Processes a data object, running one cycle of the state machine. 
     * @param {Object} obj - Data object to process 
     */
    process_data(obj) { 
	
	//1. update the data buffer  
	this.update_buffer_with_data_object(obj) 
	
	//2. now we need to update all of the sensors 
	this.run_sensors() 
	
	//3. now we run all the transitioners (which rely on most up to date Sensor values) 
	for (var transitioner_id in this.transitioners ) { 
	    this.run_transitioner(transitioner_id) 
	} 
	
	//at this point, this.STATE should be updated , one cycle of the state machine has been completed 
	//in order to reset, we should return the state of all transition groups 
	for (var group in this.transitioner_groups) {
	    this.transitioner_groups[group] = true 
	}
	
	
	// after all this is done we will update the ui 
	//the sensors_gui_buffer is now full and updated and can be passed to the ui for processing 
	//pass all the sensor data to the UI for updating 
	if (this.gui_mode) { 
	    // also we need to give an X coordinate for the data  
	    // for now we will pass the 'time' value of the data obj 
	    this.ui.handle_sensor_buffer(obj.time,this.sensors_gui_buffer)
	}

	
    } 
    
    /** 
     * For debug purposes and profiling. Processes one cycle with a defualt data object
     */
    run_debug_cycle() { 
	this.process_data(random_data_obj()) 
    } 
    

    
}


var default_data_obj = { 
    'acc_x' : 0 , 
    'acc_y' : 0 , 
    'acc_z' : 0 , 
    'gyr_x' : 0 , 
    'gyr_y' : 0 , 
    'gyr_z' : 0 , 
    'sample': 0 , 
    'time'  : 0 , 
    'dev'   : "B" 
}


//for generating random data packets 
var m = Math.random 
var count = 0 
function random_data_obj() { 
    return {'acc_x' : m(),
	    'acc_y' : m(),
	    'acc_z' : m(), 
	    'gyr_x' : m(), 
	    'gyr_y' : m(), 
	    'gyr_z' : m(),
	    'sample': count++ , 
	    'dev'   : "B"}
} 
