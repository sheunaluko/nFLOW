// Thu Nov  8 18:17:14 PST 2018

import {makeLogger} from "./logger.js"
import util from "../module_resources/utils.js"

/**
 * Applies a transformation function to a data stream 
 *
 * @param {Function} f - The function to use as transform 
 */
export default class transformer {
    
    constructor(f) { 
	this.f =  f
	this.log = makeLogger("TF")
	this.default_handler = function(data) { 
	    this.log("No data handler has been defined!") 
	} 
	this.data_handler = this.default_handler 
    } 

    /** 
     * Set the transformer function 
     * @param {Function} func - Function which accepts ONE raw data object and transforms it.
     */ 
    set_transformer(func) { 
	this.f = func 
    } 
    
    
    /** 
     * Sets the data_handler attribute
     * @param {Function} func - Function which accepts ONE raw data object and processes it.
     */ 
    set_data_handler(func) { 
	this.data_handler = func 
    }

    
    
    /** 
     * Process a received data object (simply pass it to the data handler) 
     * @param {obj} Data object to receive and transform 
     */ 
    process_data(obj) { 
	this.data_handler( this.f(obj) ) 
    }

    
    
}

