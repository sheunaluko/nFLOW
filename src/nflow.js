import {mods}  from  "./module_bundle.js"
import {smu}   from  "./module_resources/sm_utils.js" 
import {dev}   from  "./dev.js"
import sample_walk  from  "./module_resources/sample_walk.json"


// defines object that will be attached to window 
var nflow = {}  

//give it modules
nflow.mods = mods 
nflow.smu  = smu 
nflow.dev  = dev

//load sample data 
nflow.resources = { sample_walk }

//define global data params 
nflow.SKIP_PAYLOAD = "nflow_skip_payload_0000001"    //could alternatively use uuid

//add it to window 
window.nflow = nflow


//export it for use 
export { nflow } 





