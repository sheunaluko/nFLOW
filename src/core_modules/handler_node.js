// Sun Dec 29 12:40:42 CST 2019

import * as util from "../module_resources/utils.js"
import base_node from  "./base_node.js"

/* 
    
   ADAPTING FROM WEB_SOCKET BUT NEVER FINISHED 
   
*/ 




/**
 * Handler node for generic triggering 
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
export default class web_socket extends base_node {
    
    constructor({url, dev_mode}) { 

	let node_name = "WS" 
	let is_source = true 

	super({node_name, is_source, dev_mode})

	let stream_enabler = function(){ 
	    this.ws_connect() 
	}
	
	let stream_disabler = function(){ 
	    this.send_json({type : "control" , data : "stop" })
	    this.connection.close() 
	}
	
	let main_handler = function(payload) { 
	    return payload //just forwards the data it receives 
	} 

	

	
	this.configure({stream_enabler, stream_disabler, main_handler}) 
	this.url = url ;  
	this.connection = null ;  

    } 

    
    parse_event(e) { 
	//parses and converts it to payload 
	return util.dict_vals_2_num(JSON.parse(event.data)) 
    }
    
    /**
     * Connect to remote websocket server. Upon success, registers the websocket connection
     * as "client" with the server, enables streaming, and this.logs to console. 
     */ 
    ws_connect() { 
	var conn  = new WebSocket(this.url) ; 
	// Connection opened
	conn.addEventListener('open', (function (event) {
	    this.log("Connection to " + this.url + " successful. Registering client with server.")
	    setTimeout( (function() { 
		this.send_json({type: "register" , data : "client" })
		this.send_json({type: "control"  , data : "start"  }) 
	    }).bind(this), 1000 ) 
	    
	}).bind(this)) //bind is necessary for web_socket class vs WebSocket instance! 

	// Listen for messages
	conn.addEventListener('message', (function (event) {
	    let payload = this.parse_event(event) 
	    this.trigger_input(payload) //defaults to main input_port 
	}).bind(this)) //bind is necessary for web_socket class vs WebSocket instance! 
	
	this.connection = conn ; 
    } 
    
   /** 
     * Sends JSON data through socket. 
     * @param {Object} obj - Data object to send 
     */ 
    send_json(obj) { 
	this.connection.send(JSON.stringify(obj))
    }

}

