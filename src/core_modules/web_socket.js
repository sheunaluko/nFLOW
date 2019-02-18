// Sat Dec 22 22:02:38 EST 2018

import {util} from "../module_resources/utils.js"
import base_node from  "./base_node.js"

/**
 * Manages the websocket connection to an incoming data stream.
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
export default class web_socket extends base_node {
    
    constructor(url) { 

	let node_name = "WS" 
	let is_source = true 

	super({node_name, is_source})

	let stream_enabler = function(){ 
	    this.connect() 
	}
	
	let stream_disabler = function(){ 
	    this.send_json({type : "control" , data : "stop" })
	    this.connection.close() 
	}
	
	this.configure({stream_enabler, stream_disabler}) 
	this.url = url ;  
	this.connection = null ;  

    } 
    
    /**
     * Connect to remote websocket server. Upon success, registers the websocket connection
     * as "client" with the server, enables streaming, and this.logs to console. 
     */ 
    connect() { 
	var conn  = new WebSocket(this.url) ; 
	// Connection opened
	conn.addEventListener('open', (function (event) {
	    this.log("Connection to " + this.url + " successful. Registering client with server.")
	    this.send_json({type: "register" , data : "client" })
	    this.send_json({type: "control"  , data : "start"  }) 
	}).bind(this)) //bind is necessary for web_socket class vs WebSocket instance! 

	// Listen for messages
	conn.addEventListener('message', (function (event) {
	    let payload = util.dict_vals_2_num(JSON.parse(event.data))
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

