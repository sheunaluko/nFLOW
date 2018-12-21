

var flow = {} 


var logger = {} 
logger.rg = function(d) { 
    console.log("[dev]: " + d ) 
} 

logger.sme = function(d) { 
    console.log("[sme]: " + d ) 
} 


flow.playback_gui = function(d, debug) {
    var n = 200 
    logger.rg("Creating state machine with size: " + n) 
    var sm = new wrtsm.mods.state_machine({buffer_size :n, gui_mode:  true, debug_mode : debug }) 
    
    logger.rg("Adding sensors") 
    sm.add_sensor({id: "dev_b" , f : sme.sensors.dev_b } ) 
    sm.add_sensor({id: "dev_b_gyr_z" , f : sme.sensors.dev_b_field("gyr_z") , level :  1 } ) 
    sm.add_sensor({id: "dev_b_gyr_z_diff" , f : sme.sensors.dev_b_gyr_z_diff, level :  2 } ) 
    sm.add_sensor({id: "dev_b_gyr_z_std" , f : sme.sensors.bgz_std(20) , level :  1 })
    
    
    //sm.add_sensor({id:"dev_b_gyr_z" , f:sme.sensors.dev_b.field("gyr_z") , level : 3})
    //sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x")})
        
    //sm.add_sensor({id: "b_ay" ,f: sme.sensors.dev_b_field("acc_y"), level : 1})
    //sm.add_sensor({id: "b_ax" ,f: sme.sensors.dev_b_field("acc_x"), level : 1})
    //sm.add_sensor({id: "b_az" ,f: sme.sensors.dev_b_field("acc_z"), level : 1})


    logger.rg("Adding transitioners") 
    /*
    sm.add_transitioner("test_turn_on", sme.transitioners.test_turn_on )
    sm.add_transitioner("test_turn_off", sme.transitioners.test_turn_off )
    */ 
    sm.add_transitioner("pd", sme.transitioners.positive_descending )
    sm.add_transitioner("hs", sme.transitioners.hs)
    sm.add_transitioner("pre_to", sme.transitioners.pre_to )
    sm.add_transitioner("to", sme.transitioners.to )

    // ok so at this point state machine should be initialized 
    logger.rg("Calling sm.init_gui") 
    sm.init_gui("wrtsm", d) 
    
    //will load the file from storage 
    var ds = new wrtsm.mods.data_storage("eugene_walk_rev") 
    ds.load_session() 
    
    
    
    //and then create a pipe manager to connect the stored data file to the state machine 
    var pm = new wrtsm.mods.pipe_manager() 
    pm.connect(ds,sm) 
    
    //return them and can call ds.start_stream() for continuous simulation 
    //OR ds.stream_single_packet() to step one sample
    return [ds, pm, sm ] 

} 





flow.t1 = function() { 
    //var d = { misc : [ "dev_b_gyr_z" , "dev_b_gyr_z_diff"  ] } 
    var d = { main : ["dev_b_gyr_z" ], add : [ "dev_b_gyr_z_diff"], foo :[ "dev_b_gyr_z_std" ] }
    //var d = { main : ["dev_b_gyr_z" , "b_ax", "b_ay", "b_az" ] }
    //var d = { main : ["dev_b_gyr_z" , "b_ay" ]} 
    //var d = { main : [ "dev_b_gyr_z_diff" ] } // "bgzv10" ] }
    window.d = flow.playback_gui(d,false)
    window.d[0].start_stream(1)
    window.ds = window.d[0]
    window.sm = window.d[2]
}







var sme = { sensors : { dev_a : {} , dev_b : {} } , 
	    transitioners : {} }  


var beep = wrtsm.beep 






// THE FILTERS HAVE ACCESS TO THE ENTIRE STATE MACHINE OBJECT !!!!

//extract a specific field from the data objects 
//i.e. [{:acc_x :acc_y... } , ... ] => [ acc_x, acc_x ... ] 
sme.sensors.field = function(field) { 
    return function(d) { 
	var buffer = d.buffer 
	return util.last(buffer)[field] 
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

sme.sensors.dev_b = function(sm) { 
    let d = util.last(sm.buffer)
    if (sme.is_dev_b(d)) { 
	return d
    } else { 
	return false 
    } 
}
    

sme.sensors.dev_b_field = function(field) { 
    return function(sm) { 
	let d = sm.get_sensor_last_1("dev_b")
	if (d) { 
	    return d[field]
	} else { 
	    return false 
	} 
    } 
    
} 

sme.sensors.dev_b_gyr_z_diff = function(sm) { 
    let d = sm.get_sensor_last_N("dev_b_gyr_z" , 2)
    if (d) { 
	return d[1] - d[0] 
    } else 
	return false 
}

sme.sensors.bgzv = function(N) { 
    return function(sm) { 
	let buff = sm.get_sensor_last_N("dev_b", N) 
	if (buff ) { 
	    let val  = util.variance(buff.map(e=>e.gyr_z))/ 30
	    return val 
	} else { 
	    return false 
	} 
    } 
} 

sme.sensors.bgz_std = function(N) { 
    return function(sm) { 
	let buff = sm.get_sensor_last_N("dev_b", N) 
	if (buff ) { 
	    let val  = util.std(buff.map(e=>e.gyr_z))
	    return val 
	} else { 
	    return false 
	} 
    } 
} 
// sme.sensors.dev_b_old.field = function(field) { 
//     //return sme.generic_filter(sme.is_dev_b , d=>d[field] ) 
//     return function(d) {
// 	var buf = d.buffer 
// 	var d = util.last(buf) 
// 	if (d.dev == "B") { 
// 	    return d[field]
// 	} else { 
// 	    util.debug("filter miss")
// 	    return false }
//     }
// }

/// ---------------------------------------- > TRANSITIONERS 

function gait_state(sm) { 
    return sm.STATE.gait_state 
} 

let params = { 
    gyr_z : { pd_thresh : 190 } , 
    gyr_z_std : { pre_to_thresh : 15 } , 
    
}


sme.transitioners.positive_descending = {
    "detector" : function(sm) { 
	// gyr_z is > thresh AND gyr_z derivative is negative AND state is not pd
	let gstate = gait_state(sm) 
	let gyr_z  = sm.get_sensor_last_1("dev_b_gyr_z")
	let diff   = sm.get_sensor_last_1("dev_b_gyr_z_diff") 
	
	if (gyr_z &&  gstate != 'pd' && gyr_z > params.gyr_z.pd_thresh && diff < 0 ) { 
	    return true 
	} else { 
	    return false 
	}
    } , 
    "applicator" : function(sm) { 
	sm.STATE.gait_state = 'pd' 
	//if (true) { sm.log("PD") ; beep(0) }
    }, 
    "group" : "gait" 
}


sme.transitioners.hs = {
    "detector" : function(sm) { 
	// state = pd && diff >= 0 && 
	let gstate = gait_state(sm) 
	let diff   = sm.get_sensor_last_1("dev_b_gyr_z_diff") 
	
	if ( diff && gstate == 'pd' && diff >= 0 ) { 
	    return true 
	} else { 
	    return false 
	}
    } , 
    "applicator" : function(sm) { 
	sm.STATE.gait_state = 'hs' 
	if (true) { sm.log("hs") ; beep(0) }
    }, 
    "group" : "gait" 
}


sme.transitioners.pre_to = {
    "detector" : function(sm) { 
	// state = pd && diff >= 0 && 
	let gstate = gait_state(sm) 
	let gyr_z_std = sm.get_sensor_last_1("dev_b_gyr_z_std")
	
	if ( gyr_z_std && gstate == 'hs' && gyr_z_std <= params.gyr_z_std.pre_to_thresh ) { 
	    return true 
	} else { 
	    return false 
	}
    } , 
    "applicator" : function(sm) { 
	sm.STATE.gait_state = 'pre_to'
	//if (true) { sm.log("pre_to") ; beep(2) }
    }, 
    "group" : "gait" 
}


sme.transitioners.to = {
    "detector" : function(sm) { 
	// state = pd && diff >= 0 && 
	let gstate = gait_state(sm) 
	let diff   = sm.get_sensor_last_1("dev_b_gyr_z_diff") 
	
	if ( diff && gstate == 'pre_to' && diff >= 0 ) { 
	    return true 
	} else { 
	    return false 
	}
    } , 
    "applicator" : function(sm) { 
	sm.STATE.gait_state = 'to'
	if (true) { sm.log("to") ; beep(3) }
    }, 
    "group" : "gait" 
}







// ------------------------------------------------------------------------------------------
    
    

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




