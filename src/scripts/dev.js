import {sme}      from "../module_resources/state_machine_elements.js"
import {logger} from "../core_modules/logger.js"
import * as util from "../module_resources/utils.js"
import {gait_detector} from "./gait_detector.js"
import {gait_detector_ios} from "./gait_detector_ios.js"
import * as bokeh from "../module_resources/bokeh.js"

logger.register("dev") 
window.addEventListener("nflow_ready" , nflow_init) 

let mods = nflow.mods 
let ui   = nflow.mods.ui 

// look at dev_old.js for workflows from previous versions 



export function sm_ds_test() { 
    var n = 200 
    logger.dev("Creating state machine with size: " + n) 
    var sm = new nflow.mods.state_machine({buffer_size :n, gui_mode:  true, debug_mode : false }) 
    logger.dev("Adding sensors") 
    sm.add_sensor({id: "gyr_z" ,f: sme.sensors.dev_b.field("gyr_z")})

    logger.dev("Calling sm.init_gui") 
    sm.init_gui("nflow", { main : ["gyr_z" ] } ) 
    
    //will load the file from storage 
    var ds = new nflow.mods.data_storage({id:"home_1",is_source:true})
        
    //and then connect
    ds.connect(sm) 
    
    //and start stream 
    ds.start_stream() 
    
    window.ds = ds ; window.sm = sm ;
} 


export function ds_log() { 
    
    //will load the file from storage 
    var ds = new nflow.mods.data_storage({id:"home_1",is_source:true}) 
        
    //and then connect
    ds.connect(new nflow.mods.logger_node())
    
    //and start stream 
    ds.start_stream() 
    
    window.ds = ds
}

export function test_sim_tf() { 
    let sim = new mods.simulator({mode : "sin" , rate : 0.005 } ) 
    let tf = new mods.transformer(function(d) { return {y : d['val'] + 10 } }  ) 
    let ui = new mods.ui_object_grapher({container: "nflow"  , x_len : 200} ) 
    let l  = new mods.logger_node() 
    //sim.connect(tf).connect(l).connect(ui)
    sim.connect(tf).connect(ui)
    sim.start_stream(50) 

    window.sim = sim 
    window.tf  = tf 
    window.ui  = ui 
} 

export function test_ED() { 
    let sim = new mods.simulator({mode : "burst" })
    let l   = new mods.logger_node() 
    let ed  = new mods.event_detector() 
    //let ui  = new mods.ui_object_grapher({container: "nflow" , x_len : 100 }) 
    
    //sim.connect(l).connect(ed)
    sim.connect(ed).connect(l, {output_port : "events"})
    sim.start_stream(30)
    window.sim = sim 

} 

export function test_base() { 
    let n1 = new mods.base_node() 
    let n2 = new mods.base_node() 
    n1.connect(n2) 
    return {n1, n2 } 
}

export function dev_x1() { 
    let d = new nflow.mods.data_storage("eugene_walk_rev")
    let l = new nflow.mods.logger_node()
    d.connect(l) 
    d.start_stream()
    window.d = d 
    window.l = l 
}



export function sample_walk_node() { 
   //1. Get the sample data from nflow lib
   let sample_walk = nflow.resources.sample_walk 

   //2. Create a data_storage node with session_id 'sample_walk' which will hold the data
   let walk_simulator = new nflow.mods.data_storage("sample_walk")
   walk_simulator.set_session(sample_walk)   
    
   return walk_simulator
    
} 

export function tut_1() { 
   //1. Get the sample data from nflow lib
   let sample_walk = nflow.resources.sample_walk 

   //2. Create a data_storage node with session_id 'sample_walk' which will hold the data
   let walk_simulator = new nflow.mods.data_storage("sample_walk")
   walk_simulator.set_session(sample_walk)   
    
    //3. Create logger node 
   let logger_node = new nflow.mods.logger_node() 
   
   //4. Connect the data_storage node to the logger node 
   walk_simulator.connect(logger_node) 
   
   //5. Start streaming data and stop after 1 s 
   walk_simulator.start_stream() 
   setTimeout( function() { walk_simulator.stop_stream() } , 1000) 
} 

export function tut_2() { 
  //1. Get the sample data from nflow lib
   let sample_walk = nflow.resources.sample_walk 

   //2. Create a data_storage node with session_id 'sample_walk' which will hold the data
   let walk_simulator = new nflow.mods.data_storage("sample_walk")
   walk_simulator.set_session(sample_walk) 
   
   //3. Create logger node 
   let logger_node = new nflow.mods.logger_node() 
   
   //4. Create our transformer 
   let transformer = new nflow.mods.transformer(function(payload) { 
   if (payload.dev == 'B') { 
   return {gyr_z : payload.gyr_z , dev : payload.dev }
   } else { 
   return nflow.SKIP_PAYLOAD
   } 
   })
   
   //5. Connect the nodes together! 
   walk_simulator.connect(transformer).connect(logger_node) 
   
   //6. Start streaming data and stop after 1 second
   walk_simulator.start_stream() 
   setTimeout( function() { walk_simulator.stop_stream() } , 1000) 
    
} 


export function tut_3() { 
    //1. Get the sample data from nflow lib
    let sample_walk = nflow.resources.sample_walk 

    //2. Create a data_storage node with session_id 'sample_walk' which will hold the data
    let walk_simulator = new nflow.mods.data_storage("sample_walk")
    walk_simulator.set_session(sample_walk) 
    
    //3. Create grapher 
    let grapher =  new nflow.mods.ui_object_grapher( {container : "nflow" , exclude : ["dev"]} ) 
    
    //4. Create our transformer 
    let transformer = new nflow.mods.transformer(function(payload) { 
	if (payload.dev == 'B') { 
            return {gyr_z : payload.gyr_z , dev : payload.dev }
	} else { 
            return nflow.SKIP_PAYLOAD
	} 
    })
    
    //5. Connect the nodes together! 
    walk_simulator.connect(transformer).connect(grapher) 
    
    //6. Start streaming data and stop after 10 second
    walk_simulator.start_stream() 
    setTimeout( function() { walk_simulator.stop_stream() } , 10000) 
    
    
} 

export function tut_4() { 
    //1. Get the sample data from nflow lib
    let sample_walk = nflow.resources.sample_walk 

    //2. Create a data_storage node with session_id 'sample_walk' which will hold the data
    let walk_simulator = new nflow.mods.data_storage("sample_walk")
    walk_simulator.set_session(sample_walk) 
    
    //3. Create grapher 
    let grapher =  new nflow.mods.ui_object_grapher( {container : "nflow" } ) 
    
    //4. Create our transformer 
    let _get_dev_b = new nflow.mods.transformer(function(payload) { 
	if (payload.dev == 'B') { 
            return {val : payload.gyr_z , dev : payload.dev }
	} else { 
            return nflow.SKIP_PAYLOAD
	} 
    })

    // create another transformer that gets the diff 
    // let _get_dy = new nflow.mods.transformer(function(payload) { 
    // 	if (!this.last_val) { 
    // 	    this.last_val = 0
    // 	} 
    // 	let result = payload.val - this.last_val
    // 	this.last_val = payload.val
    // 	return {val : result}
    // })
    
    // let _get_dy2 = new nflow.mods.transformer(function(payload) { 
    // 	if (!this.last_val) { 
    // 	    this.last_val = 0
    // 	} 
    // 	let result = payload.val - this.last_val
    // 	this.last_val = payload.val
    // 	return {val : result}
    // })

    let logger_node = new nflow.mods.logger_node() 
    
    //5. Connect the nodes together! 
    walk_simulator.connect(_get_dev_b).connect(grapher) 
    //walk_simulator.connect(_get_dev_b).connect(_get_dy).connect(logger_node) 
    //walk_simulator.connect(_get_dev_b).connect(_get_dy)
	//.connect(new nflow.mods.transformer(e=>e)).connect(grapher)
    
    //6. Start streaming data and stop after 10 second
    walk_simulator.start_stream() 
    //setTimeout( function() { walk_simulator.stop_stream() } , 1000)
    setTimeout( function() { walk_simulator.stop_stream() } , 10000) 
    
} 


/* 
   Notes -- for real time GENERALIZED (i.e. no param) gait detection... 
   0. pre-allocate buffer to hold data 
   1. wait until gyr_z = 0 
   2. detect monotonic increase to MAX
   3. detect monotonic decrease until 0
   4. detect monotonic decrease until MIN  ~> record t stamp ~> start appending to buffer
   5. Repeat 1-4 until N=3? t stamps are recorded ~> check for periodicity 
   --  if periodic: 
   ------ walking = TRUE 
   ------ params = get_params_from_buffer(buffer)  [find std_dev minimum]
   6. If NOT periodic OR any steps fail to happen or fail to happen in order: 
   ------ go back to 0. 
   
*/ 


export function eugene_node() { 
    var ds = new nflow.mods.data_storage("eugene_walk_rev") 
     return ds 
}

export function get_std(d,n) { 
    let x = util.get_series(d,'time') 
    let gyr = util.get_series(d,'gyr_z') 
    let y =  util.loop_fn(gyr,util.std,n)
    bokeh.line_plot( { x , y } ) 
} 

export function avg_abs_diff(coll) { 
    let lv = util.last(coll) 
    let tmp = coll.slice(0,-1).map(e=>Math.abs(e-lv))
    return util.multiply(tmp)
}

export function get_density(d,n) { 
    let x = util.get_series(d,'time') 
    let gyr = util.get_series(d,'gyr_z') 
    let y =  util.loop_fn(gyr,util.arr_range,n)
    bokeh.line_plot( { x , y } ) 
}

export function get_diff(d,n) { 
    let x = util.get_series(d,'time') 
    let gyr = util.get_series(d,'gyr_z') 
    let y =  util.loop_fn(gyr,(arr) => { return util.first(util.diff(arr.slice(-2)))} ,n)
    bokeh.line_plot( { x, y } ) 
}

export function num_decs(d,n) { 
    let x = util.get_series(d,'time') 
    let gyr = util.get_series(d,'gyr_z') 
    let f = function(arr) { 
	let d = util.diff(arr) 
	let num  = d.filter(x =>  x <=0 ).length
	return num 
    } 
    let y =  util.loop_fn(gyr,f ,n)
    bokeh.line_plot( { x, y } ) 
}



export function gait_dev() { 
    var gd = gait_detector({buffer_size : 300, debug_mode : false, gui_mode : true})
    var sw = sample_walk_node() 
    
    let _dev_b = new nflow.mods.transformer(function(payload) { 
	if (payload.dev == 'B') { 
            return payload
	} else { 
            return nflow.SKIP_PAYLOAD
	} 
    })

    var ln = new nflow.mods.logger_node() 
    sw.connect(_dev_b).connect(gd)
    
    window.gd = gd 
    window.sw = sw
    
    
}


export function gait_dev_ws() { 
    var gd = gait_detector({buffer_size : 300, debug_mode : false, gui_mode : true})
    var ws = new nflow.mods.web_socket({url:"ws://localhost:1234",dev_mode:false})    
    
    let _dev_b = new nflow.mods.transformer(function(payload) { 
	if (payload.dev == 'B') { 
            return payload
	} else { 
            return nflow.SKIP_PAYLOAD
	} 
    })

    //var ln = new nflow.mods.logger_node() 
    ws.connect(_dev_b).connect(gd)
    
    window.gd = gd 
    window.ws = ws
}


export function ios_log() { 
    
    logger.nflow("Initializing ios_log")
    // - 
    var ln = new nflow.mods.logger_node() 
    // - 
    window.ios_log = function(m) { 
	ln.trigger_input(JSON.parse(m))
    }
    // - globals 
    window.ln = ln 
}

export function test_eugene_multi() { 
    var en = eugene_node() 
    var sm = new nflow.mods.state_machine({buffer_size : 200 , gui_mode:  true, debug_mode : false }) 
    
    logger.dev("Adding sensors") 
    sm.add_sensor({id: "gyr_z" ,f: sme.sensors.dev_b.field("gyr_z")})
    sm.add_sensor({id: "gyr_x" ,f: sme.sensors.dev_b.field("gyr_x")})    
    sm.add_sensor({id: "gyr_y" ,f: sme.sensors.dev_b.field("gyr_y")})        

    logger.dev("Calling sm.init_gui") 
    sm.init_gui("nflow", { gz : ["gyr_z" , "gyr_y" ]   } ) // , gx : [ "gyr_x" ]   } ) 
    
    // dont forget to wire up the nodes ! 
    en.connect(sm) 
    
    window.en = en 
}



function nflow_init() { 
    logger.dev("initialized") 
    //tut_4()
    //test_eugene_multi() 
    //ios_log() 
  
    ios_init() 
    
    
} 

// all the functionality for initiating the APP inside the IOS webview 
export function ios_init() { 
    
    
    window.ios_beep_1 = function() { 
	window.webkit.messageHandlers.soundHandler.postMessage(1072)
    } 
    
    window.ios_beep_2 = function(){
	window.webkit.messageHandlers.soundHandler.postMessage(1075)
    }
    
    
    //init the ios gait application 
    var {gd } = ios_gait() 

    //link 
    
    window.ios_link  = function(m) { 
	//_dev_b.trigger_input(m) 
	//console.log("!") 
	gd.trigger_input(m) 
	
    }

}


export function ios_gait() { 
    
    logger.nflow("Initializing ios_gait app")
    
    //init gait detector 
    var gd = gait_detector_ios({buffer_size : 300, debug_mode : false, gui_mode : false})    
    
    
    window.gd = gd 
    
    logger.nflow("Finished init ") 
    
    return { gd } 

}





export function log_ws() { 
     //1. create web_socket object 
    var ws = new nflow.mods.web_socket({url:"ws://localhost:1234",dev_mode:false})

    //2. create data_storage object 
    let l  = new mods.logger_node() 

    //3. connect 1 & 2 
    ws.connect(l) 

    //4. start the ws stream 
    ws.start_stream()
    
    //export 
    window.ws = ws 
    window.l = l 
}

export function make_recording(name,l) { 
    
    //1. create web_socket object 
    var ws = new nflow.mods.web_socket({url:"ws://localhost:1234"})

    //2. create data_storage object 
    var ds = new nflow.mods.data_storage({id:name,is_sink:true})

    //window.x = {ws,ds}
    //return 
    
    //3. connect 1 & 2 
    ws.connect(ds) 

    //4. Enable saving on the data_storage object every 5s  
    ds.start_saving(5) 

    //5. start the websocket stream
    ws.start_stream()
    
    //6. Stop streaming 
    setTimeout(function() { 
	ws.stop_stream() 
	ds.stop_saving() 
	console.log("Streaming and saving stopped.") 
    }, l*1000)
    
}
