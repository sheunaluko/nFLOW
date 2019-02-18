// Wed Dec  5 08:11:17 PST 2018

import base_node from  "./base_node.js"

/**
 * Logs whatever it receives
 *
 */
export default class logger_node extends base_node {
    
    constructor() { 
	
	let node_name = "LN" 
	let is_sink = true 
	
	super({node_name , is_sink})

	let main_handler = function(payload) { 
	    console.log(payload) 
	    return payload 
	} 
	
	this.configure({main_handler})
	
    } 

    
}

