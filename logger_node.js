// Thu Nov  8 18:54:49 PST 2018

import {makeLogger} from "./logger.js"
import util from "../module_resources/utils.js"

/**
 * Data node that logs its input 
 *
 */
export default class logger_node {
    
    constructor() { 
	this.log = makeLogger("LG")
	this.default_handler = function(data) { 
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
	this.log(obj)
    }

    
    
}

