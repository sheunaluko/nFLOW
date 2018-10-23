const WebSocket = require('ws');

port =  "1234"
rate = 20 
    
const ws = new WebSocket('ws://localhost:' + port);

//for generating random data packets 
m = Math.random 
var count = 0 
function get_data_packet(){ 
    return {'acc_x' : m(),
	    'acc_y' : m(),
	    'acc_z' : m(), 
	    'gyr_x' : m(), 
	    'gyr_y' : m(), 
	    'gyr_z' : m(),
	    'sample': count++ , 
	    'dev'   : "B"}
} 
     

function start_streaming() { 
    setInterval(function() { 
	ws.send(JSON.stringify(get_data_packet()))
    }, rate)
}

ws.on('open', function open() {
    console.log("WS opened. Streaming in 1s.") ; 
    setTimeout(start_streaming, 1000)
});
 
ws.on('message', function incoming(data) {
  console.log(data);
}); 

