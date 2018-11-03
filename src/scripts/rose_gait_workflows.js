1//Fri Oct  5 18:28:58 PDT 2018
// workflows for RoseGait  

import util     from "../module_resources/utils.js"
import {sme}      from "../module_resources/state_machine_elements.js"
import {wrtsm}  from "../wrtsm.js"
import {logger} from "../core_modules/logger.js"

logger.register("rg") 

var flow = {} 

flow.test_storage_persist = function(name) { 
    //1. create web_socket object 
    ws = new wrtsm.mods.web_socket("ws://localhost:1234") 

    //2. create data_storage object 
    ds = new wrtsm.mods.data_storage(name) 

    //3. create pipe manager object and connect 1 & 2 
    pm = new wrtsm.mods.pipe_manager() 
    pm.connect(ws,ds) 

    //4. Enable saving on the data_storage object every 5s  
    ds.start_saving(5) 

    //5. connect the websocket (which should automatically start receiving data) 
    ws.connect()
    
    //6. Stop streaming after 20s 
    setTimeout(function() { 
	ws.stop_stream() 
	ds.stop_saving() 
	console.log("Streaming and saving stopped.") 
    }, 21*1000)
    
} 


flow.test_storage_replay = function() { 
    //1. create data_storage object & load session 
    ds = new wrtsm.mods.data_storage("eugene_walk_rev") 
    ds.load_session() 
    
    //2. create raw_analyzer object 
    ra = new wrtsm.mods.raw_analyzer() 

    //3. create pipe manager object and connect 1 & 2 
    pm = new wrtsm.mods.pipe_manager() 
    pm.connect(ds,ra) 

    //4. start the stream ! 
    ds.start_stream() 
    
    return [ds,ra ] 

} 

flow.test_state_machine = function(n) {
    logger.rg("Creating state machine with size: " + n) 
    var sm = new wrtsm.mods.state_machine({buffer_size : n, gui_mode:  false } ) 
    sm.initialize({"is_on" : false }) 
    
    logger.rg("Adding sensors") 
    sm.add_sensor({id:"acc_x" , f:sme.sensors.field("acc_x"), graph : "g1"})
    sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x"), graph : "g1"})
    
    logger.rg("Adding transitioners") 
    sm.add_transitioner("test_turn_on", sme.transitioners.test_turn_on ) 
    sm.add_transitioner("test_turn_off", sme.transitioners.test_turn_off ) 
    
    // ok so at this point everything should be initialized and we should be able 
    // to start profiling and inspecing the state machine 
    logger.rg("Returning sm") 
    return sm 
    
    
    
} 


flow.test_state_machine_gui = function(d) {
    var n = 200 
    logger.rg("Creating state machine with size: " + n) 
    var sm = new wrtsm.mods.state_machine({buffer_size : n, gui_mode:  true } ) 
    sm.initialize({"is_on" : false }) 
    
    logger.rg("Adding sensors") 
    sm.add_sensor({id:"acc_x" , f:sme.sensors.field("acc_x"), graph : "g1"})
    sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x"), graph : "g1"})
    
    logger.rg("Adding transitioners") 
    sm.add_transitioner("test_turn_on", sme.transitioners.test_turn_on ) 
    sm.add_transitioner("test_turn_off", sme.transitioners.test_turn_off ) 
    
    // ok so at this point everything should be initialized and we should be able 
    // to start profiling and inspecing the state machine 

    sm.init_gui("wrtsm",d) 

    logger.rg("Returning sm") 
    return sm 
    
    
    
} 

flow.playback_gui = function(d) {
    var n = 200 
    logger.rg("Creating state machine with size: " + n) 
    var sm = new wrtsm.mods.state_machine({buffer_size :n, gui_mode:  true, debug_mode : false }) 
    
    logger.rg("Adding sensors") 
    sm.add_sensor({id:"dev_b_gyr_z" , f:sme.sensors.dev_b.field("gyr_z") })
    //sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x")})
    sm.add_sensor({id: "acc_y" ,f: sme.sensors.field("acc_y")})
    sm.add_sensor({id: "gyr_z" ,f: sme.sensors.field("gyr_z")})

    logger.rg("Adding transitioners") 
    sm.add_transitioner("test_turn_on", sme.transitioners.test_turn_on )
    sm.add_transitioner("test_turn_off", sme.transitioners.test_turn_off )


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


flow.graph_dances = function() { 
    var d = { g1 : ["acc_x", "acc_y"] } //, "gyr_z"] }  
    //[sm,d] = test_state_machine_gui({ g1 : ["acc_x"] , g2 : [ "acc_y"] }) 
    var sm = flow.test_state_machine_gui(d) 
    //[sm,d] = test_state_machine_gui({ g1 : ["acc_x",  "acc_y"] , g2 : [  "gyr_z"] })
    //util.app_render(test_div_array(1,2)) 


    var line_dance = function() { 
	sm.ui.handle_sensor_buffer(200+speed*counter, {acc_x : 0.5*counter , acc_y : -0.5*counter})
    }

    var sine_rate = 2/100
    var sine_rate_2 = 5/100
    var sine_rate_3 = 7/100
    var sine_dance_0 = function() { 
	sm.ui.handle_sensor_buffer(200+speed*counter, {acc_x : Math.sin(sine_rate*counter) , acc_y : -Math.sin(sine_rate_2*counter)})
    }

    var sine_dance_1 = function() { 
	sm.ui.handle_sensor_buffer(200+speed*counter, {acc_x : Math.sin(sine_rate*counter) , acc_y : -Math.sin(sine_rate_2*counter) , gyr_z : Math.sin(sine_rate_3*counter)})
    }


    var speed = 20
    var counter = 0 
    var a = setInterval( (function() { 
	sine_dance_0()
	counter++ 
    }), 50 ) 
    var stop = function() { 
	clearInterval(a) 
    }

    return [sm  , a,  stop ] 

}
    


// [0,1,2,3,4] 
//  [1,1,1,1] 

flow.graph_sm_test = function() { 
    //now we will loop and do the perf 
    var num = 200
    var interval = 1
    var start = 2
    var sizes = Array(num).fill(0) 
    var results = Array(num).fill(0) 
    for (var i = 0; i < num ; i ++ ) { 
	var size = start + i * interval 
	sizes[i] = size 
	//create the sm 
	var sm = test_state_machine(size) 
	
	//define the perf function 
	var test_cycle = ( function() { 
	    sm.run_debug_cycle() 
	}).bind(sm)
	
	//now we perf it 
	results[i] = util.perf(test_cycle)
    } 
    
    //at this point results should be full . 
    logger.rg("Graphing results... ") 
    bar_graph("Perf" , "size", "time" , sizes, results ) 
    logger.rg("hmm.. ?")
}
    
    
// want to be able to play back data 
/* 
A brief historical aside: 
at first I recorded the data withuot converting the Strings inside the objects to numbers 
To solve, I loaded the recorded file, then mapped the conversion accross the loaded buffer 
Then I made a new wrtsm.mods.data storage object with _rev extension, and connecnted d1 to d2. 
Then I started d2.save and d1.stream 
voila 
 */ 

flow.EW = function() { 
    d = new wrtsm.mods.data_storage("eugene_walk_rev") 
    d.load_session() 
    
    //at this pt data is accesible in d.loaded_sesssion 
    return d 
} 
    



export {flow} 

