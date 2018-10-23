//Tue Oct  2 10:12:11 PDT 2018

import {makeLogger} from "./logger.js"

/**
 * Manages the flow of streaming data between various modules of RoseGait
 * e.g. pipe_manager.connect(web_socket, data_storage) 
 */
export default class pipe_manager {
    
    constructor() { 
	this.log = makeLogger("PM")
    } 
    
    
    /**
     * Connects a streaming output data source to a streaming input source. 
     * @param {Object} from - data source (emits data). Must implement method `set_data_handler` 
     * and have member default_handler
     * @param {Object} to -   data sink   (consumes data). Must implement method `process_data` 
     */ 
    connect(from, to) { 
	from.set_data_handler(  (function(d) {to.process_data(d)}).bind(to) ) 
    } 

    /**
     * Disconnects a streaming output data source from a streaming input source. 
     * @param {Object} from - data source (emits data). Must implement method `set_data_handler` 
     * and have member default_handler
     * @param {Object} to -   data sink   (consumes data). Must implement method `process_data` 
     */ 
    disconnect(from, to) { 
	from.set_data_handler(from.default_handler)
    } 

    
}




