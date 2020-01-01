//Fri Oct  5 19:31:23 PDT 2018

// filefor collecting definitions of Sensors and transitioners

import {logger} from "../core_modules/logger.js"
import * as util    from "./utils.js"

logger.register("sme") 

var sme = { sensors : { dev_a : {} , dev_b : {} } , 
	    transitioners : {} }  


//extract a specific field from the data objects 
//i.e. [{:acc_x :acc_y... } , ... ] => [ acc_x, acc_x ... ] 
sme.sensors.field = function(field) { 
    return function(sm) { 
	return util.last(sm.buffer)[field] 
    }
} 

sme.sensors.foo = function(x) { 
    return function(sm) { 
	console.log(sm)
	return 20 
    }
    
}


//field diff will take the  diff of a particular field in the data object 
sme.sensors.field_diff = function(field) { 
    return function(d) { 
	d = d.buffer 
	var l = d.length 
	return d[l-1][field] - d[l-2][field]
    }
} 



sme.is_dev_b = function (d) { 
    return d.dev == "B" 
} 

sme.is_dev_a = function (d) { 
    return d.dev == "A" 
} 

sme.sensors.dev_b.field = function(field) { 
    //return sme.generic_filter(sme.is_dev_b , d=>d[field] ) 
    return function(d) {
	var buf = d.buffer 
	var d = util.last(buf) 
	if (d.dev == "B") { 
	    return d[field]
	} else { 
	    util.debug("filter miss")
	    return false }
    }
}

sme.transitioners.test_turn_on  = { 
    "detector" : function(state_machine) { 
	return !state_machine.STATE.is_on 
	
    } , 
    "applicator" : function(state_machine) { 
	state_machine.STATE.is_on = true 
	if (state_machine.debug_mode ) { logger.sme("TURNED ON") }
    },
    "group" : "switch" 
}


sme.transitioners.test_turn_off  = { 
    "detector" : function(state_machine) { 
	return state_machine.STATE.is_on 
    } , 
    "applicator" : function(state_machine) { 
	state_machine.STATE.is_on = false  
	if (state_machine.debug_mode ) { logger.sme("TURNED OFF") }
    } , 
    "group" : "switch" 
}




export { sme } 
