// Thu Nov  8 18:55:08 PST 2018

import base_node from  "./base_node.js"

/**
 * Simulator node for testing data streams
 *
 */
 class simulator extends base_node {
    
    constructor(opts) { 
	
	let node_name = "SIM" 
	let is_source = true 
	let dev_mode = false 
	super({node_name, is_source, dev_mode})  
	
	let main_handler = function(payload) { 
	    return payload //just forwards the data it generates 
	} 
	
	this.configure({main_handler}) 
	
	this.opts  = opts
	this.mode = opts.mode 
	this.stream_interval = null 
	      
    } 

    /**
     * enable streaming simulated data 
     * 
     */
    enable_stream(r) { 
	let rate = r || 500 
	this.stream_interval = setInterval( (this.send_val).bind(this) , rate ) 
	
    }
    
    start_stream(r) { 
	this.streaming = true 
	this.enable_stream(r) 
	
    }
    
    /** 
     * Stop streaming data 
     */ 
    disable_stream() { 
	clearInterval(this.stream_interval) 
    }
    
    send_val() { 
	
	var val  ; 
	switch (this.opts.mode)  { 
	case 'sin' : 
	    val  = { val :  Math.sin ( (new Date().getTime()) * (this.opts.rate || 0.001) )}
	    break  ; 
	case 'rand' : 
	    val = { val : (this.opts.multiplier || 1 ) * Math.random() + (this.opts.offset || 0 ) } 
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
	
	this.trigger_input(val)  // send the val ! 
    } 
       
}

