
import {util} from "../module_resources/utils.js"
import base_node from  "./base_node.js"

/*
 The event detector accepts a (possibly nested) dictionary as input. It converts the dictionary 
 into a linear array of values representing that data structure (see linearize) 
 As a new dictionary comes in, 
 it calculates the same linear array and takes a log difference @ each index rom the previous. 
 
 If at least 1 of the indeces shows a log diff out of bounds of the thresholds, we can say 
 a "change" has occurred. 
 
 The event detector commences in the state "awaiting_baseline" 
 Baseline is established when no "change" has been detected for "baseline_counter" number of times 
 At this point, when a "change" is detected an EVENT is said to begin, and starts being recorded. 
 Because of the logic, as long as "changes" keep occuring then the event keeps recording. 
 Once no changes have occured for "baseline_counter" num packets, then baseline is again 
 established  and the ED "flushes" the event to internal memory and outputs it to the events
 output port
 
 In addition Each packet received is forwarded to the main_ouput, making this a "through node"
 */

/**
 * Detects and emits deviation "events" from streams of arbitraty data objects
 *
 * @param {Object} opts - configuration options
 */
 class event_detector extends base_node {
    
    constructor(opts) { 
	
	let node_name = "ED" 
	super({node_name}) 
	
	let main_handler = function(payload) { 
	    this.process_data(payload) 
	    return payload 
	} 
	
	this.configure({main_handler})
	
	//create events output 
	this.new_output("events") 
	
	var opts = opts || {} 
	this.opts =  opts
	this.state =  "awaiting_baseline" //  established_baseline | processing_event
	
	//init counters for estabishing baseline 
	//baseline will be established when thresholds are respected for "baseline_counter" number
	//of events 
	this.baseline_counter = 0 
	this.baseline_number = opts.baseline_number || 60
	
	//keep log of events that have been detected 
	this.current_event = [] 
	this.events =  {} 
			
	//set detection threshold 
	this.detection_params = { upper : null, lower : null } 
	//detection_thresh expressed as percent difference 
	this.init_detection_params(opts.detection_thresh || 30) 
	
	// save the last linearized packet for calculation 
	this.last_linearized = null 
	
	// initialize history buffer 
	this.history_buffer_size  = opts.history_buffer_size || 50
	this.init_history_buffer()  

	
    } 

    init_detection_params(t) { 
	this.detection_params.upper = Math.log( (t+100)/100 ) 
	this.detection_params.lower = Math.log( (100-t)/100 )
    }
    
    in_range(val) { 
	return (val >= this.detection_params.lower && val <= this.detection_params.upper) 
    }
    
    detect(arr) {
	return !util.apply( util.and , arr.map(this.in_range, this)  )
    }
    
    /** 
     * Statefully checks if detector is at baseline 
     * @param {Boolean} detected - result of this.detect() 
     */
    check_baseline(detected) { 
	if (detected) { 
	    //detected an event, reset the counter
	    this.baseline_counter = 0 
	    return false 
	} else { 
	    //no event detected... increment baseline counter 
	    this.baseline_counter += 1 
	    if (this.baseline_counter > this.baseline_number) { 
		// reset baseline counter  (for later) 
		this.baseline_counter = 0 
		return true 
	    } 
	    return false 
	}
    }
    
    /** 
     * Process a received data object
     * @param {obj} Data object to receive 
     */ 
    process_data(obj) { 

	//transform the object into linearized struct 
	let lp = linearize(reduce(obj))
	
	//on the first call we will set last_linearized 
	//and return 
	if (!this.last_linearized) { 
	    this.last_linearized = lp
	    return 
	}
	
	//on all subsequent calls we will get here.. 
	var result,bl ; 
	
	//run the detection 
	let log_diff = util.array_log_diff(this.last_linearized, lp) 
	let detected = this.detect(log_diff) 

	switch (this.state) { 
	    
	case "awaiting_baseline" : 
	    bl = this.check_baseline(detected) 
	    if (bl) { 
		this.log("Baseline established")
		this.state = "baseline_established" 
	    }
	    // should we add to history here? 
	    break; 
	    
	case "baseline_established" :
	    // here we are waiting for the detection of an event 
	    this.add_to_history(obj) //add current obj to history
	    if (detected) { 
		//detected an event 
		this.log("Detected event...") 
		this.state = "processing_event" 
		this.init_event() //copies contents of history buff into current event
	    } else {}  //do nothing
	    break; 
	    
	case "processing_event" : 
	    //add the obj to current event 
	    this.current_event.push(obj) 
	    //check if we have reached baseline yet 
	    bl = this.check_baseline(detected) 
	    if (bl) { 
		this.log("Event ended")
		this.state = "baseline_established" 
		this.flush_event()
	    } else {  } //do nothing
	    break ; 
	    
	default : 
	    break ; 
	} // END switch --- 
	
	
	return log_diff //this is the array of log diffs for each of the linearized indexes 

    }
    
    /** 
     * Initiate event 
     * 
     */ 
    init_event() { 
	//copy contents of history buffer into current event 
	this.current_event = [] 
	for (var i=0;i<this.history_buffer.length;i++) { 
	    this.current_event.push(this.history_buffer[i])
	}
	return null 
    }
    
    /** 
     * Flush current event to the event buffer 
     * 
     */ 
    flush_event() { 
	this.events[ new Date().getTime() ] = this.current_event
	// flush output to specific output pipe 
	// v2 
	
	this.log("Flushed event") 
	/* will send to events output port */ 
	let payload = this.current_event 
	let output_port = "events" 
	this.trigger_output_packet({ output_port, payload}) 
	
	this.current_event = [] 
    }
    
    add_to_history(obj) { 
	util.cycle_array(this.history_buffer, obj) 
    }

    
    /**
     * init history buffer 
     * 
     */
    init_history_buffer() { 
	this.history_buffer = Array(this.history_buffer_size).fill(0)
    }
    
    
    
}




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

/* 
 * loop through keys
 * if num, push num to ret 
 * if dict, push the recursive result
 */
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


