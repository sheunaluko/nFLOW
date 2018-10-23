//The main program 

import {wrtsm} from  "./wrtsm.js"  //import global wrtsm object 
import {flow}  from  "./scripts/rose_gait_workflows.js" 
import "../css/styles.css"

/* additions to global context */ 
wrtsm.flow = flow 


/* - - - - - - - */ 
console.log( ":: " + (new Date()) + " ::") 
console.log(":: wrtsm initialized ::")

















