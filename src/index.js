//The main program 1

/* - - - - - - - */ 
console.log(":: nflow initializing ::")


import {nflow}  from  "./nflow.js"  //import global nflow object 
import {flow}   from  "./scripts/rose_gait_workflows.js" 
import * as util from  "./module_resources/utils.js"
import {beep}   from  "./module_resources/sounds.js"
import {logger} from  "./core_modules/logger.js"
import {load_script, load_css} from  "./module_resources/script_loader.js"
import * as dev from  "./scripts/dev.js"
import * as bokeh from  "./module_resources/bokeh.js"

// set debug 
util.set_debug(false)

//make logger 
logger.register("nflow")

/* additions to global context */ 
nflow.flow = flow 
nflow.util = util 
nflow.beep = beep 
nflow.dev  = dev
nflow.bokeh  = bokeh 

/* additions to window */ 
window.util = util 
window.mods = nflow.mod
window.dev = dev

// HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 
if (window.Bokeh) { 
    logger.nflow("Bokeh was detected already. If you experience any errors, please make sure that the following resources are included in your html for proper functionality:")
    console.log("<link rel=\"stylesheet\" href=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css\" type=\"text/css\" />")
    console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js\"></script>")
    console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js\"></script>")
} else { 
    //will dynamically load the above resources: 
    //define callback 
    function load_api() { 
	logger.nflow("bokeh-0.12.5.js loaded")
	window.ls = load_script 
	load_script("https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js" , function () { 
	    console.log("[nflow]:: bokeh-api-0.12.5.min.js loaded" )
	    //we will bubble an event that says nflow is ready ! 
	    var event = new Event('nflow_ready');
	    window.dispatchEvent(event);
	} ) 
    } 
    logger.nflow("Loading Bokeh functionality:") 
    load_script("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js" , load_api ) 
    load_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css" , function () { console.log("[nflow]:: bokeh-0.12.5.min.css loaded" ) } ) 
} 
// HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 

nflow.load_time  = (new Date()).getTime() 




//var d = {"misc" : ["dev_b_gyr_z"] } 

//setTimeout( function() { window.d = flow.playback_gui(d) ; window.d[0].start_stream()  } , 1000)







//FOR IOS integration 

// function setupWKWebViewJavascriptBridge(callback) {
//     if (window.WKWebViewJavascriptBridge) { return callback(WKWebViewJavascriptBridge); }
//     if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
//     window.WKWVJBCallbacks = [callback];
// //    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
// }


// logger.nflow("Initializing bridge") 

// setupWKWebViewJavascriptBridge(function(bridge) {

// 	/* Initialize your app here */

// 	bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
// 		console.log('iOS called testJavascriptHandler with', data)
// 		responseCallback({ 'Javascript Says':'Right back atcha!' })
// 	})
    
    
        
//     logger.nflow("Calling ios bridge testBridge") 
// 	bridge.callHandler('testBridge', {'foo': 'bar'}, function(response) {
// 		console.log('JS got response', response)
// 	})
    
//     logger.nflow("Assigning bridge to global object") 
//     window.bridge = bridge 
// })






// logger.
//    nflow("Bridge initialized") 

window.setHeaderText = function(x) { 
    document.getElementById("headerText").innerHTML = x 
}


window.sendMsg = function(msg) { 
    logger.nflow("Sending msg!") 
    window.webkit.messageHandlers.jsHandler.postMessage(msg);
}




