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
	this.mode = opts.mode 
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
	case 'rand' : 
	    val = (this.opts.multiplier || 1 ) * Math.random() + (this.opts.offset || 0 ) 
	    break ; 
	case 'burst' : 

	    var burst = ! ( (new Date).getSeconds() % 5  )
	    if (burst ) { 
		//val = {x :  0.1*Math.random() + 10} 
		//console.log("burst")
		val = {x :  Math.random() + 5, y : Math.random() + 20}
	    } else { 
		//val = {x :  0.1*Math.random() + 0.5 }
		val = {x :  Math.random() + 5, y : Math.random() + 10}
	    }
	    break ;
	} 
	
	this.data_handler(val) 
    } 
       
}

