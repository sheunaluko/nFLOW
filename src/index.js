//The main program 

import {wrtsm} from  "./wrtsm.js"  //import global wrtsm object 
import {flow}  from  "./scripts/rose_gait_workflows.js" 
import "../css/styles.css"
import {util}  from  "./module_resources/utils.js"

// set debug 
util.set_debug(false)

/* additions to global context */ 
wrtsm.flow = flow 
wrtsm.util = util 


/* - - - - - - - */ 
console.log(":: wrtsm is initialized ::")



//var d = {"misc" : ["dev_b_gyr_z"] } 

//setTimeout( function() { window.d = flow.playback_gui(d) ; window.d[0].start_stream()  } , 1000)
















