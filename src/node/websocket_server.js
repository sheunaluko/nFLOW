//Mon Oct  1 12:16:41 PDT 2018
//web socket server for RoseGait 

var port  = 1234  
var debug = [] 
var debugging = true

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: port });
log = console.log 

var streaming_to_client = false 
var client_connection   = null 
var data_connection     = null 

wss.on('connection', function connection(ws) {
    console.log("Received connection!")


    ws.on('message', function incoming(message_string) {
	
	message = JSON.parse(message_string) 
	
	switch(message.type) { 
	    
	case "register" : 
	    if (message.data == "client") { 
		client_connection = ws
		log("Client registered.") 
	    }
	    break 
	    
	case "control" : 
	    switch(message.data) { 
	    case "start" : 
		streaming_to_client = true 
		log("Streaming enabled.") 
		break 
	    case "stop" : 
		streaming_to_client = false 
		log("Streaming disabled.")
		break 
	    default : 
		log("Unrecognized data: " + message.data + " for msg type: " + message.type)
		break
		
	    }
	    break
	    
	default : 
	    // for the default message, a simple data packet is received, and should be forwarded 
	    // to the client_connection if client has registered AND streaming is enabled
	    if (client_connection) { 
		if (streaming_to_client) {
		    client_connection.send(message_string) 
		} 
	    } else { 
		//log("Client not yet registered. Cannot handle message: ")
		//log(message) 
	    }
	}

	    
  });
 
  client_connection.on('close', function close() {
      client_connection = null 
      console.log("Client disconnected") 
  });


    
});


console.log("[RoseGait] websocket server waiting for connections on port: " + port ) 
