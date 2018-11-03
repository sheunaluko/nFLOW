//The main program 

import {wrtsm} from  "./wrtsm.js"  //import global wrtsm object 
import {flow}  from  "./scripts/rose_gait_workflows.js" 
import {util}  from  "./module_resources/utils.js"
import {beep}  from  "./module_resources/sounds.js"



// set debug 
util.set_debug(false)

/* additions to global context */ 
wrtsm.flow = flow 
wrtsm.util = util 
wrtsm.beep = beep 


/* - - - - - - - */ 
console.log(":: wrtsm initialized ::")



//var d = {"misc" : ["dev_b_gyr_z"] } 

//setTimeout( function() { window.d = flow.playback_gui(d) ; window.d[0].start_stream()  } , 1000)
















