// Sat Sep 29 18:31:15 PDT 2018

import {makeLogger} from "./logger.js"
import util from "../module_resources/utils.js"

/**
 * Manages the websocket connection to an incoming data stream.
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
 class web_socket {
    
    constructor(url) { 
	this.url = url ;  
	this.connection = null ;  
	this.log = makeLogger("WS")
	this.default_handler = function(data) { 
	    this.log("No data handler has been defined!") 
	} 
	this.data_handler = this.default_handler 
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
	    //this.log("Received msg: " + event.data) 
	    this.data_handler(util.dict_vals_2_num(JSON.parse(event.data))) //parse json and convert nums
	}).bind(this)) //bind is necessary for web_socket class vs WebSocket instance! 
	
	this.connection = conn ; 
    } 
    
    /** 
     * Start accepting incoming raw data objects.
     */ 
    start_stream() { 
	this.send_json({type : "control" , data : "start" } ) 
    }

    /** 
     * Stop accepting incoming raw data objects.
     */ 
    stop_stream() { 
	this.send_json({type : "control" , data : "stop" } ) 
    }

    /** 
     * Sets the data_handler attribute, which determines what the socket does to incomin data.
     * @param {Function} func - Function which accepts ONE raw data object {..} and processes it.
     */ 
    set_data_handler(func) { 
	this.data_handler = func ; 
    }

    /** 
     * Sends JSON data through socket. 
     * @param {Object} obj - Data object to send 
     */ 
    send_json(obj) { 
	this.connection.send(JSON.stringify(obj))
    }

    
    
}
