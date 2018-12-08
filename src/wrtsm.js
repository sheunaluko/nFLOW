import {mods}  from  "./module_bundle.js"
import {smu}   from  "./module_resources/sm_utils.js" 
import {dev}   from  "./dev.js"

// defines object that will be attached to window 
var wrtsm = {}  

//give it modules
wrtsm.mods = mods 
wrtsm.smu  = smu 
wrtsm.dev  = dev



//add it to window 
window.wrtsm = wrtsm 


//export it for use 
export { wrtsm } 



