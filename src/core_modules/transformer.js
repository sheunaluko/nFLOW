// Thu Nov  8 18:17:14 PST 2018

import base_node from  "./base_node.js"

/**
 * Applies a transformation function to a data stream 
 *
 * @param {Function} f - The function to use as transform 
 */
export default class transformer extends base_node  {
    
    constructor(f) { 
	let node_name = "TF"
	super({node_name}) 
	
	let main_handler = function(payload) { 
	    return this.f(payload)
	}
	this.configure({main_handler})
	this.f =  f

    } 

    /** 
     * Set the transformer function 
     * @param {Function} func - Function which accepts ONE raw data object and transforms it.
     */ 
    set_transformer(func) { 
	this.f = func 
    } 
    
}

