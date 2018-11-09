//The main program 

/* - - - - - - - */ 
console.log(":: wrtsm initializing ::")


import {wrtsm}  from  "./wrtsm.js"  //import global wrtsm object 
import {flow}   from  "./scripts/rose_gait_workflows.js" 
import {util}   from  "./module_resources/utils.js"
import {beep}   from  "./module_resources/sounds.js"
import {logger} from  "./core_modules/logger.js"
import {load_script, load_css} from  "./module_resources/script_loader.js"

// set debug 
util.set_debug(false)

//make logger 
logger.register("wrtsm")

/* additions to global context */ 
wrtsm.flow = flow 
wrtsm.util = util 
wrtsm.beep = beep 



// HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 
if (window.Bokeh) { 
    logger.wrtsm("Bokeh was detected already. If you experience any errors, please make sure that the following resources are included in your html for proper functionality:")
    console.log("<link rel=\"stylesheet\" href=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css\" type=\"text/css\" />")
    console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js\"></script>")
    console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js\"></script>")
} else { 
    //will dynamically load the above resources: 
    //define callback 
    function load_api() { 
	logger.wrtsm("bokeh-0.12.5.js loaded")
	window.ls = load_script 
	load_script("https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js" , function () { 
	    console.log("[wrtsm]:: bokeh-api-0.12.5.min.js loaded" )
	    //we will bubble an event that says wrtsm is ready ! 
	    var event = new Event('wrtsm_ready');
	    window.dispatchEvent(event);
	} ) 
    } 
    logger.wrtsm("Loading Bokeh functionality:") 
    load_script("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js" , load_api ) 
    load_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css" , function () { console.log("[wrtsm]:: bokeh-0.12.5.min.css loaded" ) } ) 
} 
// HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 

wrtsm.load_time  = (new Date()).getTime() 




//var d = {"misc" : ["dev_b_gyr_z"] } 

//setTimeout( function() { window.d = flow.playback_gui(d) ; window.d[0].start_stream()  } , 1000)
















