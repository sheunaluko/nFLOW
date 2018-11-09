


window.addEventListener("wrtsm_ready" , wrtsm_init) 

let util = wrtsm.util 
let tf   = wrtsm.mods.transformer 

function wrtsm_init() { 
    
    // - 
    let t0 = util.now() 

    //define transformers 
    let bin = new tf( function(d) { if ( d > 0 )  { return 1 } else { return - 1 } }) 
    let add_time = new tf (function(d) { return {val : d , time :  util.now() - t0 } })
    
    // create objects
    let sim = new wrtsm.mods.simulator("sin") 
    let sm  = new wrtsm.mods.state_machine({gui_mode : true } ) 
    let pm  = new wrtsm.mods.pipe_manager() 

    //configure the state machine 
    sm.add_sensor({id: "val" , f : wrtsm.smu.sensors.field("val") })

    // wire stuff up 
    pm.connect(sim,bin).connect(add_time).connect(sm)
    
    // init gui 
    sm.init_gui("wrtsm" , { g1 : ["val" ]  } ) 

    //start the stream 
    sim.start_stream(20)
    
    
    

} 


