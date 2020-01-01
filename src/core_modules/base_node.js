// Fri Dec 21 12:12:27 EST 2018

import {makeLogger} from "./logger.js"
import * as util from "../module_resources/utils.js"


/* 
[Fri Dec 21 12:12:27 EST 2018]
I would like to make it such that ALL nflow nodes can inherit from this class 
thereby encapsulating all common functionality and providing an avenue for 
simultaneous upgrades 

Would like to support: 
- stream_single 
- each node manages its connections to other nodes 
- various (named) output and input ports for nodes 
   
TERMS=> 
Packet consists of { input_port_name , payload }
Payload is the actual data which is communicated 

Nodes always transmit PACKETS to each other,  which are then destructured into the 
desired port, to which the specific PAYLOAD is delivered. 

A payload handler will match the payload at a specific port with a specific handler (or collection of handlers) , which each routes  processed payload to a specied OUTPUT port according to the routing defined in NODE_PAYLOAD_ROUTER 

Outputs are then processed via the routing in NODE_IO_ROUTER 

The key thing to realize about this architecture is that there are both 
INTRA nodal routings (mapping input to output ports via handlers )  
- these are handled by the NODE_PAYLOAD_ROUTER instance -- 
and 
INTER nodal routings (mapping output ports to input ports of other nodes via forwarding) 
-- these are handled by the NODE_IO_ROUTER ---
BOTH of these routings can have !SEVERAL! handlers associated with a given port 

For example, node_1 could have input ports (i1) and (i2) , and two output port (o1) and (o2). 
The first INTRA nodal handler (PAYLOAD_ROUTER)  may route i1->o1 via HANDLER_1,  i.e. o1( HANDLER_1(i1) ) 
and another handler may route i1->o2 via HANDLER_2,  i.e. o2( HANDLER_2(i1) ) 

Finally, node_1 o2 could be routed to multiple input ports of other nodes. 
You will notice that the base_node class has two instances in the code when a handler_obj 
Is retrieved and then all the attached handlers are called with a payload. 
These two instances correspond to the INTRA and INTER nodal mappings discussed above

--- 

About streaming. 
this.enable_stream will make  a SOURCE node initialize its data soure, but this.streaming will still be false and the source node will IGNORE packets 
this.streaming = true will allow ANY node to actually process its input packet 


*/




/* 
 * Object for retaining information of input and output ports of a node, 
 * as well as information about global node connectivity 
 */
class node_io_router { 
    
    constructor() { 
	this.inputs = {} 
	this.outputs = {} 
	this.base_node = null 
	/* initialize the global node connectivity map (used to inspect connections)  */ 
	if (! window.nflow.node_connections ) { window.nflow.node_connections = {} }
    } 
    
    new_input(id) { 
	this.inputs[id] = {} 
    }
    
    new_output(id) { 
	this.outputs[id] = {} 
    }
    
    ensure_input(i) { 
	if (!this.inputs[i]) { this.new_input(i) }	
    } 
    
    ensure_output(o) { 
	if (!this.outputs[o]) { this.new_output(o) }	
    } 
    
    ensure_input_output(i,o) { 
	this.ensure_input(i) ; this.ensure_output(o)  ; 
    }
    
    get_connection_name({dict_from, dict_to, input_port, output_port}) { 
	return dict_from.base_node.id + "." + output_port + "~>" + dict_to.base_node.id + "." + input_port 
    }
	
    /* 
     * Connect output_port of dict_from with input_port of dict_to 
     *
     */
    connect({output_port, dict_from, input_port, dict_to}) { 
	/*  If the output_port or input_port is missing should ERROR  */ 
	console.assert(dict_from.outputs[output_port])
	console.assert(dict_to.inputs[input_port])
	
	/* 
	 Some info briefly. The purpose of this fn is to route a payload OUT of a node 
	 and into the correct port of another node. Once it leaves the dict_from we no 
	 longer care what happens (presumably there are handlers set up for it!)  
	 
	 The output dictionary this.outputs is indexed by the output_port name. 
	 
	 */ 
	
	/* get connection name */
	let connection_name = this.get_connection_name({dict_from, dict_to, input_port, output_port})
	dict_from.outputs[output_port][connection_name] = function(payload) { 
	    // this function is the payload handler
	    // will create packet and route it to destination node 
	    let packet = { input_port, payload } 
	    dict_to.base_node.process_packet(packet)
	}
	
	/* and will also update the global connection struct */ 
	window.nflow.node_connections[connection_name] = { 
	    source : [ dict_from.base_node.id , output_port ], 
	    sink   : [ dict_to.base_node.id , input_port ] 
	} 
	
    }
    
    disconnect({output_port, dict_from, input_port, dict_to}) { 
	/*  If the output_port or input_port is missing should ERROR  */ 
	console.assert(dict_from.outputs[output_port])
	console.assert(dict_to.inputs[input_port])
	
	/* get connection name */
	let connection_name = this.get_connection_name({dict_from, dict_to, input_port, output_port})
	dict_from.outputs[output_port][connection_name] = null 
	
	/* and will also update the global connection struct */ 
	window.nflow.node_connections[connection_name] = null 
    }
    
    get_global_connections() { 
	return window.nflow.node_connections 
    }
    
    set_base_node(node) { 
	this.base_node = node 
    }
    
}

/* 
 * Object for managing handlers and mapping between input and output ports 
 */ 
class node_payload_router { 
    
    constructor() { 
	this.handler_dict = {} 
	this.base_node = null //reference to the node this belongs to 
	this.io_router = new node_io_router() ; 
    }
    
    has_handler(port_name) { 
	return this.handler_dict[port_name]
    }
    
    send_payload_to_output({payload, output_port}) {
	/* look up the handlers and execute them */ 
	let handler_obj = this.io_router.outputs[output_port]
	/* each handler obj is a dict with multiple handlers
	   indexed via connection_name */ 
	for (var k in handler_obj ) { 
	    handler_obj[k](payload) 
	}
    }
	
    add_input_handler({handler_id, input_port, handler, output_port})  { 

	//create the ports if they do not exist 
	this.io_router.ensure_input_output(input_port, output_port) 
	
	//create and register the appropriate handler 
	if (!this.has_handler(input_port) ) { 
	    this.base_node.dlog("Handler unregistered")
	    //handler not yet defined for this port 
	    this.handler_dict[input_port] = {} 
	} 
	  
	//handlers have been defined  
	this.base_node.dlog("Handler registered...")
	this.handler_dict[input_port][handler_id] = (function(_payload) { 
	    //process the payload with the handler and send to output port 
	    let payload = handler(_payload) 
	    if (payload == nflow.SKIP_PAYLOAD) { 
		return 
	    } else { 
		this.send_payload_to_output({payload, output_port})
	    } 
	}).bind(this)   /* have to bind for this reference */
    }
    
    remove_input_handler(opts) { 
	var {input_port, handler_id} = opts 
	if (this.has_handler(input_port)) { 
	    this.handler_dict[input_port][handler_id] = null 
	}
    }
    
    set_base_node(node) { 
	this.base_node = node 
    }
    
}


/**
 * Base class for defining nflow nodes 
 *
 */
export default class base_node {
    
    constructor(opts) { 
	opts = opts || {} 
	
	/* instantiate member variables */ 
	this.opts = opts
	this.base_node = this 
	this.configured = false 
	this.name = opts.node_name || "base_node" 
	/* create global counter for node IDs */ 
	if (!nflow.node_counter) {nflow.node_counter = 0}
	if (!nflow.nodes) {nflow.nodes = {}}
	this.id = this.name + "_" + nflow.node_counter++
	nflow.nodes[this.id] = this
	this.log = makeLogger(this.id) 
	this.dev_logger = makeLogger(this.id + "_dev")
	this.dev_mode = opts.dev_mode || false 
	this.dlog = function(msg) { if (this.dev_mode) { this.dev_logger(msg) } } 
	this.dclog = function(msg) {if (this.dev_mode) { console.log(msg) } } 
	this.creation_time = new Date() 
	this.data_counter = 0 
	/* stream stuff */ 
	this.num_to_stream = null //for gating number of packets from source 
	
	/* WATCH out... default handling of stream enabling etc is confusing! */ 
	this.streaming = opts.streaming || true 
	this.stream_enabled = opts.stream_enabled || !opts.is_source 
	    
	/* configure the node type base on opts params  */ 
	this.is_source     = opts.is_source 
	this.is_sink       = opts.is_sink 
	this.is_through    = opts.is_through || true 
	/* these have significance in terms of base functionalities of the node /* 

	/* create a payload router object for managing connections  */
	this.payload_router = new node_payload_router() 
	
	/* assign appropriate references */
	this.io_router = this.payload_router.io_router 
	this.payload_router.set_base_node(this) 
	this.io_router.set_base_node(this) 
	
	/* define a default handler */
	this.default_handler = (function(payload){
	    this.dclog(payload); return payload //must return in order to pass it on ! 
	}).bind(this)
	
	/* By default each node maps main_input -> main_handler -> main_output */ 
	let main_opts = {handler_id : "main" , input_port : "main_input" , 
			 output_port : "main_output" , handler : this.default_handler }
	
	/* configure main route */ 
	this.payload_router.add_input_handler( main_opts ) 
	
    } 
    
    configure({stream_enabler , stream_disabler, main_handler}) {
	this.stream_enabler = stream_enabler
	this.stream_disabler = stream_disabler
	this.main_handler = main_handler || this.default_handler 
	
	/* By default each node maps main_input -> main_handler -> main_output */ 
	let main_opts = {handler_id : "main" , input_port : "main_input" , 
			 output_port : "main_output" , handler : this.main_handler.bind(this) } 
	
	/* configure main route */ 
	this.payload_router.add_input_handler( main_opts ) 
	this.configured = true 
    }
    
    /* 
     * Helper function for calling handlers 
     * @param {obj} opts - Contains {handler_obj , payload} 
     */
    run_handlers({handler_obj, payload}) { 
	for (var k in handler_obj ) { 
	    handler_obj[k](payload) 
	}
    }
    
    /** 
     * Generic packet processor 
     * @param {Dict} packet - contains { input_port , payload } 
     */ 
    process_packet({input_port, payload}) { 
	console.assert(this.configured, "Node not configured: " + this.id) 
	if (this.streaming) { 
	    this.dlog("Processing data packet...")
	    this.dclog({input_port, payload})
	    //in general when a packet comes in we 
	    //1. find the handlers associated with the input_port requested 
	    let handler_obj = this.payload_router.handler_dict[input_port] 
	    //this.dclog(handler_obj)
	    //2. make sure it exists -- if not this is likely an error 
	    console.assert(handler_obj) 
	    //3. run all the handlers with the included payload 
	    this.run_handlers({handler_obj, payload})
	    
	    if (this.num_to_stream) { 
		if (--this.num_to_stream == 0 ) { this.streaming = false } 
	    } 
	    
	    this.data_counter += 1 
						
	} else {this.dlog("Not streaming!")}
    }
	    
    
    
    /* pass on creation of inputs */ 
    new_input(id)  { this.io_router.new_input(id) }
    new_output(id) { this.io_router.new_output(id) }
    
    /** 
     * Connect node to another node 
     * @param {base_node} sink - Node to connect to 
     * @param {obj} opts - Contains {output_port = "main_output",input_port = "main_input"}
     */
    connect(sink, { output_port = "main_output" , input_port = "main_input" } = {} ) { 
	let dict_from = this.io_router 
	let dict_to   = sink.io_router 
	this.io_router.connect({output_port, dict_from, input_port, dict_to})
	
	/* return the sink node for chaining connections :) */ 
	return sink 
    }
    
    disconnect(sink, { output_port = "main_output" , input_port = "main_input" } = {} ) { 
	let dict_from = this.io_router 
	let dict_to   = sink.io_router 
	this.io_router.disconnect({output_port, dict_from, input_port, dict_to})
	
	/* return the sink node for chaining connections :) */ 
	return sink 
    }
    
    /*  
	Sat Dec 22 12:59:41 EST 2018
	I am unsure if I should use protocols or class functions for implementing 
	the start_stream , stop_stream, stream_single... etc... 
	
	FROM Stack Overflow --> "class" defines what an object is.
	"protocol" defines a behavior the object has.
	
	One difference which resonated with me is: Consider you have an object STREAMER 
	which takes 
	a base_node and will call start_stream. As long as you are only dealing with base_nodes 
	this is fine, but if in the future you could have OTHER objects which ALSO implement 
	start_stream, then for extensibility sake it is better to implmenet STREAMER 
	by having it accept ANY object which implements a protocol ? 
	
	I think this makes a bigger difference if you are using a STATICALLY typed language, 
	since in a dynamically typed language functions can take arbitrary inputs without 
	validating what their TYPE is or which protocols they implement (and call them 
	however they want -- which of course risks run time errors ) 
	
	Regardless -- JS does not support protocols , so I will have child classes 
	assign functions to instance variables which are called via a "protocol" 
     */
    
    /* the member variables used below are created at object instantiation */ 
    enable_stream()  {this.stream_enabler(this)}
    disable_stream() {this.stream_disabler(this)}    
    
    /* start, stop, and num streams */
    start_stream()  { 
	if (!this.stream_enabled) { this.enable_stream() } 
	this.num_to_stream = null 
	this.streaming = true 
    }
    stop_stream() { 
	this.streaming = false 
    }
    stream_num(n) { 
	if (!this.stream_enabled) { this.enable_stream() } 
	this.num_to_stream = n 
	this.streaming = true 
    } 
    stream_single() {this.stream_num(1)} 

    /* Dev utilities for maually triggering nodes */ 
    /* These are not originally intended for realtime node communications */
    /* though may prove useful */ 
    /* Update : have found them useful so far for triggering source nodes */
    trigger_input_packet({input_port = "main_input" , payload} ) { 
	this.process_packet({input_port , payload })
    }
    trigger_output_packet({output_port = "main_output" , payload} ) { 
	this.payload_router.send_payload_to_output({payload, output_port})
    }
    trigger_input(payload) { 
	this.trigger_input_packet({payload})
    }
    trigger_output(payload) { 
	this.trigger_output_packet({payload})
    }
}

