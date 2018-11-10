// Thu Nov  8 18:55:08 PST 2018

import {makeLogger} from "./logger.js"
import util from "../module_resources/utils.js"

/**
 * Simulator node for testing data streams
 *
 */
export default class simulator {
    
    constructor(opts) { 
	
	this.opts  = opts
	
	this.log = makeLogger("SIM")
	this.mode = mode 
	this.default_handler = function(data) { 
	    return null 
	} 
	this.data_handler = this.default_handler 
	this.stream_interval = null 
	//this.load_time = (new Date()).getTime() 
    } 

    /** 
     * Sets the data_handler attribute
     * @param {Function} func - Function which accepts ONE raw data object and processes it.
     */ 
    set_data_handler(func) { 
	this.data_handler = func 
    }

    /**
     * Start streaming simulated data 
     * 
     */
    start_stream(r) { 
	this.stream_interval = setInterval( (this.send_val).bind(this) , r ) 
	
    }
    
    /** 
     * Stop streaming data 
     */ 
    stop_stream() { 
	clearInterval(this.stream_interval) 
    }
    
    send_val() { 
	var val  ; 
	switch (this.opts.mode)  { 
	case 'sin' : 
	    val  = Math.sin ( (new Date().getTime()) * this.opts.rate )
	    break  ; 
	} 
	
	this.data_handler(val) 
    } 
       
    
    
}

