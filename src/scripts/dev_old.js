


//window.addEventListener("wrtsm_ready" , wrtsm_init) 

let util = wrtsm.util 
let tf   = wrtsm.mods.transformer 
let state_machine = wrtsm.mods.state_machine 
let mods = wrtsm.mods 
let pm = new mods.pipe_manager() 



function wrtsm_init() { 
    
    // - 
    let t0 = util.now() 

    //define transformers 
    let bin = new tf( function(d) { if ( d > 0 )  { return 1 } else { return -1 } }) 
    let add_time = new tf (function(d) { return {val : d , time :  util.now() - t0 } })
    
    // create objects
    let sim = new wrtsm.mods.simulator({mode : "sin"})
    let sm  = new wrtsm.mods.state_machine({gui_mode : true } ) 
    let pm  = new wrtsm.mods.pipe_manager() 

    //configure the state machine 
    sm.add_sensor({id: "val" , f : wrtsm.smu.sensors.field("val") })

    // wire stuff up 
    pm.connect(sim,bin).connect(add_time).connect(sm)
    
    // init gui 
    sm.init_gui("wrtsm" , { g1 : ["val" ]  } ) 

    //start the stream at rate of 20ms
    sim.start_stream(400)
} 



// for rosegait init, we have to accomplish a coup of things 
// 1. create a websocket object and connect to the websocket_server (on localhost:1234  by default) 
// 2. Create the desired pipeline for analysis and vizualization of the desired data 
// 3. Wrap the two above things into a function that is run AFTER the following two things 
//  - a) The websocket_server is started via node websocket_server.js 
//  - b) The ios app has connected to websocket_server by entering its url ( IP:1234 ) 

function rose_gait_test_connection() { 
    
    //1. create web socket object
    ws = new mods.web_socket("ws://localhost:1234") 
    
    //2. create a logger node  
    ln = new mods.logger_node() 
    
    //3. connect them with pipe manager 
    pm = new mods.pipe_manager() 
    pm.connect(ws,ln) 
    
    //4. launch the web socket connection and we should get streaming data provided 
    //that 3a and 3b have been satisfied 
    ws.connect() 
    
    //5. return objects for manipulation 
    return { ws, ln, pm } 
    
} 

function rose_gait_init() { 
    
    // TODO --> creation of satte machine and definition of relevant parameters, etc.. 
    // also TODO -> modify index.js to make use of menuX ! 

    //2. create state machine and define sensors 
    //let sm_buffer = 200 
    //let sm        = state_machine({buffer_size : sm_buffer , gui_mode: true}) 
   
}


let test_matrix = [ [1,2,3]  , [2,3,4] , [ 3,4,5 ] ] 



// FOR ARBITRARY GRAPHING -----------------------------------------------                                                   
function dict_to_update(dict) { 
    return dict 
}

function get_array_series(o) {
    //console.log(o)
    return util.range(0,o.length).map(v=>"index_" + v)
}

function get_dict_series(d) { 
    var ret
    var list = Object.keys(d) 
    //return list   -- allows toggling the removal of time key from object
    var ind = list.indexOf('time') 
    if (ind >= 0 ) { 
	list.splice(ind , 1 ) 
	ret = list 
    } else { ret = list } 
    return ret 
} 

function array_to_update(arr) { 
    let ser = get_array_series(arr)
    return util.zip_map(ser, arr)
}


function make_graph_for_obj(opts) { 
    var {o, container, x_len} = opts 
    var graph_ui = new mods.ui()
    var series   = null 
    //console.log(o)
    if (typeof o == "object") { 
	if (Array.isArray(o)) {
	    // its an array
	    console.log("Making array grapher")
	    series = get_array_series(o) 
	    graph_ui.convert = array_to_update
	} else {
	    // assume its a dict
	    console.log("Making dict grapher")
	    series = get_dict_series(o) 
	    graph_ui.convert = dict_to_update
	}
    }
    
    graph_ui.add_graph({id  :"main", series_vector:  series, x_len : 1000})
    graph_ui.init(container) 
    graph_ui.init_time = util.now()
    return graph_ui 
}


function graph_object(x,o,graph_ui) { 
    let updates = graph_ui.convert(o) 
    //console.log(updates)
    //apply the updates to the graph 
    graph_ui.handle_sensor_buffer((x-graph_ui.init_time)/1000,updates)  // should work???
}


function get_object_grapher(opts) { 
    var {container, x_len} = opts 
    var grapher = {}
    grapher.init = true 
    grapher.graph_ui = null 
    
    grapher.process_data = function(o) { 
	if (grapher.init) { 
	    grapher.graph_ui = make_graph_for_obj({o,container,x_len})
	    grapher.init = false 
	} else { 
	    var t = util.now()
	    //console.log(o)
	    graph_object(t,o,grapher.graph_ui)
	}
    }
    
    return grapher
}


//PROBLEM  !! when removing time attr from node then NO GREAPH! 

function get_sim_node(opts) {
     // - 
    let t0 = util.now() 
    //define a transformer
    let node = new tf (function(d) { 
	var packet =  {val : d , time :  util.now() - t0} 
	//console.log(packet) 
	return packet 
    })
    
    // create objects
    let sim = new wrtsm.mods.simulator(opts) 
    let pm  = new wrtsm.mods.pipe_manager() 
    // wire stuff up 
    pm.connect(sim,node)
    return {sim, node} 
}

function wrap_sim(s) { 
    let pm = new mods.pipe_manager() 
    let t0 = util.now() 
    //define a transformer
    let t = new tf (function(d) { 
	var packet =  {val : d , time :  util.now() - t0} 
	return packet 
    })
    pm.connect(s,t) 
    return { 'start_stream' : (function() { s.start_stream() }).bind(s) , 
	     'set_data_handler' : (function(f) {t.set_data_handler(f)}).bind(t) } 
}



function dev_0() { 
    var w = document.getElementById("wrtsm") 
    var {sim,node} = get_sim_node({mode : "rand"})
    
    let grapher = get_object_grapher(w) 
    
    node.set_data_handler( grapher.handler ) 
    
    sim.start_stream()
    return {sim, node, grapher}
}



function dev_1() { 
    let sim = wrap_sim( new mods.simulator({mode: "rand" , offset : 10 , multiplier : 1 }) ) 
    let grapher = get_object_grapher(document.getElementById("wrtsm") )
    let ln      = new mods.logger_node() 
    let ED      = new mods.event_detector() 
    
    pm.connect(sim,ED).connect(grapher)

    sim.start_stream() 
    return {sim, grapher, ED}
}

export function dev_2() { 
    let sim = new mods.simulator({mode: "burst" } ) 
    let grapher = get_object_grapher({container : document.getElementById("wrtsm") , 
				      x_len     : 1000 } ) 
    let ln      = new mods.logger_node() 
    let ED      = new mods.event_detector({baseline_buffer_size : 5}) 
    
    pm.connect(sim,ED).connect(grapher)
    //pm.connect(sim,grapher)
    //pm.connect(sim,ln)
    //pm.connect(sim,ED).connect(ln)
    sim.start_stream() 
    //return {sim, grapher, ED}
    
    
    //an example of how to graph an event -- 
    //wrtsm.mods.ui.multi_line_graph("wrtsm", { ys : [ ED.events[1545375031336].map(e=>e.y) ] } )
    
    return {sim,ED}
}

export function test_base() { 
    let n1 = new mods.base_node() 
    let n2 = new mods.base_node() 
    n1.connect(n2) 
    return {n1, n2 } 
}

export function dev_x1() { 
    let d = new wrtsm.mods.data_storage("eugene_walk_rev")
    let l = new wrtsm.mods.logger_node()
    d.connect(l) 
    d.start_stream()
    window.d = d 
    window.l = l 
}




