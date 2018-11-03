// Sat Sep 29 18:31:15 PDT 2018

log = makeLogger("WS")

/**
 * Manages the websocket connection to an incoming data stream.
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
class web_socket {
    constructor(url) { 
	this.url = url ;  
	this.connection = null ;  
    } 
    
    
    /**
     * Connect to remote websocket server. Logs to console upon success. 
     */ 
    connect() { 
	var conn  = new WebSocket(this.url) ; 
	// Connection opened
	conn.addEventListener('open', function (event) {
	    log("Connection to " + this.url + " successful")
	});

	// Listen for messages
	conn.addEventListener('message', function (event) {
	    log('Message from server: ', event.data);
	});	    
	
	this.connection = conn ; 
    } 
}


