import {sme}      from "../module_resources/state_machine_elements.js"
import {logger} from "../core_modules/logger.js"
import * as util from "../module_resources/utils.js"
import * as bokeh from "../module_resources/bokeh.js"


let mods = nflow.mods 
let ui   = nflow.mods.ui 

export function gait_detector(opts) { 
    var verb = true 
    var mi_detect = 10
    var num_cycles = 3
    var num_dec  = 15 
    // will use state machine api 
    
    //will define states  
    var states = {'pre_mi' : 0 , 
		  'monotonically_increasing' : 1 , 
		  'monotonically_decreasing_pre_0' : 2, 
		  'monotonically_decreasing_post_0' : 3 , 
		  'hs' : 4, 
		  'pre_to' : 5 , 
		  'to'  : 6 } 
    
    //define init state 
    var init = states.pre_mi
    
    var new_opts = util.merge(opts,{init : init})
    
    //make state machine 
    var sm = new nflow.mods.state_machine(new_opts)

    //initialize params 
    sm.num_cycles = 0
    
    // will only use gyr_z 
    sm.add_sensor({id : "gyr_z", f : function(sm) {
	var d = util.last(sm.buffer)
	return d['gyr_z']
    }})

    // will define the state machine transitioners 
    var p_mi = { 
	"detector" : function(sm) { 
	    if (sm.STATE != states.monotonically_increasing) { 
		var last_N = sm.get_sensor_last_N("gyr_z", mi_detect) 
		//console.log(last_N)
		return util.array_and(util.diff(last_N).map(x=>x>0)) && (util.last(last_N) > 0)
	    } else {return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.monotonically_increasing 
	    sm.num_cycles += 1 
	    
	    if (sm.num_cycles == 1 ) { 
		sm.cycles_start_index = sm.data_counter 
	    }
	    
	    if (verb) { console.log("MI") 
			console.log("Cycle: " + sm.num_cycles) } 
	    
	    if (false ) {
	    //if (sm.num_cycles == num_cycles) { 
		sm.cycles_end_index = sm.data_counter 
		console.log("WALKING!!!") 
		console.log("Analysis period: ")
		console.log([sm.cycles_start_index,sm.cycles_end_index].toString())
		//extract from buffer
		let num_to_get = sm.cycles_end_index - sm.cycles_start_index
		window.data = sm.buffer.slice(-num_to_get) 
		nflow.bokeh.line_plot({ y : window.data.map(e=>e.gyr_z) } ) 
		
	    }

	    
	},
	"group" : "gait" 
    } 
    // - 
    var mi_md = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.monotonically_increasing) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		return ( (last_2[1] - last_2[0]) < 0 ) 
	    }
	    else { return false }
	},
	"applicator" : function(sm) { 
	    sm.STATE = states.monotonically_decreasing_pre_0
	    if (verb) { console.log("MD") } 
	},
	"group" : "gait"
    }
    // -
    var md_mdp0 = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.monotonically_decreasing_pre_0) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		return ( (last_2[1] - last_2[0]) < 0 ) && ( last_2[1] < 0 ) 
	    } else { return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.monotonically_decreasing_post_0
	    if (verb) { console.log("MDp0") } 
	}, 
	"group" : "gait" 
    }
    var md_0 = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.monotonically_decreasing_pre_0) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		return ( (last_2[1] - last_2[0]) > 0 ) && ( last_2[1] > 0 ) 
	    } else { return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.pre_0
	    if (verb) { console.log("md_0!") } 
	    
	    sm.num_cycles = 0
	    
	}, 
	"group" : "gait" 
    }
    
    
    var mdp0_hs = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.monotonically_decreasing_post_0) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		return ( (last_2[1] - last_2[0]) > 0 ) 
	    } else { return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.hs
	    sm.num_dec = 0 
	    nflow.beep(1)
	    if (verb) { console.log("HS") } 
	}, 
	"group" : "gait" 
    }
    
     var hs_pto = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.hs) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		if  (last_2[1] - last_2[0] < 0  )  { 
		    sm.num_dec += 1 
		}
		return (sm.num_dec >= num_dec )
	    } else { return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.pto
	    if (verb) { console.log("pto") } 
	}, 
	"group" : "gait" 
    }
    
    var pto_to = { 
	"detector" : function(sm) { 
	    if (sm.STATE == states.pto) { 
		var last_2 = sm.get_sensor_last_N("gyr_z", 2) 
		return ( (last_2[1] - last_2[0]) > 0 ) 		
	    } else { return false } 
	}, 
	"applicator" : function(sm) { 
	    sm.STATE = states.to
	    nflow.beep(3) 
	    if (verb) { console.log("to") } 
	}, 
	"group" : "gait" 
    }
    //now we add the transitioners 
    sm.add_transitioner("p_mi", p_mi)
    sm.add_transitioner("mi_md", mi_md)
    sm.add_transitioner("md_mdp0", md_mdp0)
    sm.add_transitioner("md_0", md_0)
    sm.add_transitioner("mdp0_hs", mdp0_hs)
    sm.add_transitioner("hs_pto", hs_pto)
    sm.add_transitioner("pto_to", pto_to)
    
    var d = { main : ["gyr_z" ] } 
    if (opts.gui_mode ) { 
	sm.init_gui("nflow", d) 
    }

    return sm 
} 
