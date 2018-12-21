import {makeLogger} from "./logger.js"
import {util} from "../module_resources/utils.js"


//scroll DOWN for class definition ! 
// will need to tidy up this file @ some point 

// if array of numbers, return the power of array
// if its a dictionary, then return the reduced version of all its keys
// if its a number, return the number
// for now i wont compare strings

var  power = util.rms 
    
function map_f_on_dict(d,f) {
    for (var k in d ) {
	d[k] = f(d[k]) 
    }
    return d 
}

function reduce_val(v) {

    if (typeof v == "object") { 
	if (Array.isArray(v)) {
	    // its an array
	    return power(v) 
	    
	} else {
	    // assume its a dict
	    return map_f_on_dict(v, reduce_val) 
	}
    } else {

	// assume its a number
	return v  

    }

}

var reduce = reduce_val 

function reduce_dict(obj) {
    return map_f_on_dict(obj, reduce_val)
}

let test_dict = { acc : [ 1,2,3,4,5] , gyr : { foo : 2 , bar : [1,2,3,4,5] } , happy : 1 } 

// then, I will need to  Linearize the data object (will assume it is a dict) 
///  loop through keys
///  if num, push num to ret 
///  if dict, push the recursive result

function linearize_dict(obj) {
    var result = []
    for (var k in  obj) {
if (typeof obj[k]  == "object" ) {
   result.push( linearize_dict(obj[k]) ) 
} else {
   result.push(obj[k])
} 
    }
    let flattened =  [].concat.apply([], result)
    return flattened 

} 

function linearize(obj) {
    return linearize_dict(obj) 
} 


// so the workflow for the event_detecting_node is that it does linearize(reduce(packet))
// and then appends the result to cycling buffer

// so i want the coefficient of variability (STD / MEAN) of ALL indeces to reach some threshold [BT] , at which point baseline is established
// A baseline snapshot will be taken which includes the mean and std  for all indeces in buffer of B points
// when a new packet comes in, it is linearized and then transformed to vec of zscores, and DET threshold applied, [DT]

// separately, a history buffer of the actual data objects is kept with size [HB]

// when DT treshold triggered, STATE transitioned to "recording event" and contents of HB dumped into  "current event"
// any new packets  are added into "current event" , UNTIL [EE] number of packets which do not trigger DT have been received at which
// point the "current event" is optionally added to bank but DEFNITELY FORWARDED to next node as an ARRAY of DATA PACKETS

// At any point -- can trigger the detector_node to re-configure the baseline stds

// optionally there should be a mode for using WRTSM to vizualize the incoming z scores inorder to validate z scoring thresholds 




/**
 * Detects and emits deviation "events" from streams of arbitraty data objects
 *
 * @param {Object} opts - configuration options
 */
export default class event_detector {
    
    constructor(opts) { 
	var opts = opts || {} 
	this.opts =  opts
	this.log = makeLogger("ED")
	this.baseline_data =  null 
	//this.spread_fn = util.spd_matrix 
	this.spread_fn = util.matrix_mapper(util.std)
	
	this.state =  { found_baseline : false  } 
	
	this.detection_thresh = Math.log(1.3) 
	
	// for spread metric 
	this.last_spread_metric = null 
	this.spread_metric_threshhold = 0.1  
	this.spread_metric_count = 0 
	   
	// for last_linearized  
	this.last_linearized = null 
	
	this.baseline_buffer_size  = opts.baseline_buffer_size || 10 
	this.history_buffer_size  = opts.baseline_buffer_size || 50
	this.init_baseline_buffer() //will init baseline buffer with size N and fill with value null 
	this.init_history_buffer()  
	
	
	
	this.default_handler = function(data) { 
	    this.log("No data handler has been defined!") 
	} 
	this.data_handler = this.default_handler 
    } 
    
    
    process_pre_baseline(obj) { 
	let transformed_packet = linearize(reduce(obj))  //transform the packet into linear array 
	this.add_to_baseline(transformed_packet)         //add the information to our baseline buffer 
	
	
	//console.log(transformed_packet)
	//calculate percent change in spread_metric 
	if (this.last_linearized) { 
	    let ret = util.array_log_diff(this.last_linearized, transformed_packet)  
	    //console.log(ret)
	    this.last_linearized = transformed_packet
	    return ret 
	} else { 
	    this.last_linearized = transformed_packet
	    return null 
	} 
	
	
    }
    


	
    
       
    /** 
     * Process a received data object
     * @param {obj} Data object to receive 
     */ 
    process_data(obj) { 
	if (this.baseline_buffer_full() ) { 
	    var result
	    if (this.state.found_baseline ) { 
		result = this.process_post_baseline(obj)
	    } else { 
		result = this.process_pre_baseline(obj) 
	    }
	    if (result) { 
		this.data_handler(result)
	    }
	} else { 
	    
	    let transformed_packet = linearize(reduce(obj))  //transform the packet into linear array 
	    this.add_to_baseline(transformed_packet)         //add the information to our baseline buffe
	    
	}
    }
    
    
    add_to_baseline(obj) { 
	util.cycle_array(this.baseline_buffer, obj) 
    }

    add_to_history(obj) { 
	util.cycle_array(this.history_buffer, obj) 
    }

    /**
     * Init baseline buffer 
     * 
     */
    init_baseline_buffer() { 
	this.baseline_buffer = Array(this.baseline_buffer_size).fill(0)	
    }
    
    /**
     * init history buffer 
     * 
     */
    init_history_buffer() { 
	this.history_buffer = Array(this.history_buffer_size).fill(0)
    }
    
    /**
     * Checks if the baseline buffer is full 
     */
    baseline_buffer_full() { 
	return this.baseline_buffer[0]   //this works because the basline buffer is an array of 0 at init. Only when last value exists b[0] will be true
    } 
    
    
    
    /** 
     * Sets the data_handler attribute
     * @param {Function} func - Function which accepts ONE raw data object and processes it.
     */ 
    set_data_handler(func) { 
	this.data_handler = func 
    }

 

    
    
}
