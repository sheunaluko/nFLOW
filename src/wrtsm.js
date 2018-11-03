import {mods}  from  "./module_bundle.js"


// defines object that will be attached to window 
var wrtsm = {}  

//give it modules
wrtsm.mods = mods 




//add it to window 
window.wrtsm = wrtsm 


//export it for use 
export { wrtsm } 



