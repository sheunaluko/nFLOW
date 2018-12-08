// Wed Dec  5 08:11:17 PST 2018

import {makeLogger} from "./logger.js"
import util from "../module_resources/utils.js"

/**
 * Logs whatever it receives
 *
 * @param {Function} f - The function to use as transform 
 */
export default class logger_node {
    
    constructor() { 
	this.log = makeLogger("LN")
	this.default_handler = function(data) { 
	    //do nothing  
	    return null 
	} 
	this.data_handler = this.default_handler 
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
	this.data_handler( obj ) 
	console.log(obj)
    }

    
}

