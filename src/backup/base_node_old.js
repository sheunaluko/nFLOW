// Fri Dec 21 12:12:27 EST 2018

import {makeLogger} from "./logger.js"
import {util} from "../module_resources/utils.js"


/* 
I would like to make it such that ALL wrtsm nodes can inherit from this class 
thereby encapsulating all common functionality and providing an avenue for 
simultaneous upgrades 

Would like to support: 
- stream_single 
- each node manages its connections to other nodes 
- various (named) output and input ports for nodes 
   
TERMS=> 
Packet consists of { input_port_name , payload }
Payload is the actual data which is communicated 

Nodes always transmit PACKETS to each other,  which are then destructure into the 
destired port, to which the specific PAYLOAD is delivered. 

A payload handler will match the payload at a specific port with a specific handler (or collection of handlers) , which each routes the output to a specied OUTPUT port 


The key thing to realize about this architecture is that there are both 
INTRA nodal routings (mapping input to output ports via handlers )  
- these are handled by the NODE_PAYLOAD_ROUTER instance -- 
and 
INTER nodal routings (mapping output ports to input ports of other nodes via forwarding) 
-- these are handled by the node_io_router ---

BOTH of these routings can have SEVERAL handlers associated with a given port 

For example, node_1 could have input ports (i1) and (i2) , and two output port (o1) and (o2). 
The first INTRA nodal handler may route i1->o1 via HANDLER_1,  i.e. o1( HANDLER_1(i1) ) 
and another handler may route i1->o2 via HANDLER_2,  i.e. o2( HANDLER_2(i1) ) 



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
	if (! window.wrtsm.node_connections ) { window.wrtsm.node_connections = {} }
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
	window.wrtsm.node_connections[connection_name] = { 
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
	window.wrtsm.node_connections[connection_name] = null 
    }
    
    get_global_connections() { 
	return window.wrtsm.node_connections 
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
	this.io_dict = new node_io_router() ; 
    }
    
    has_handler(port_name) { 
	return this.handler_dict[port_name]
    }
    
    send_payload_to_output({payload, output_port}) {
	/* look up the handlers and execute them */ 
	let handler_obj = this.io_dict.outputs[output_port]
	/* each handler obj is a dict with multiple handlers
	   indexed via connection_name */ 
	for (var k in handler_obj ) { 
	    handler_obj[k](payload) 
	}
    }
	
    add_input_handler({handler_id, input_port, handler, output_port})  { 

	//create the ports if they do not exist 
	this.io_dict.ensure_input_output(input_port, output_port) 
	
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
	    this.send_payload_to_output({payload, output_port})
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
 * Base class for defining wrtsm nodes 
 *
 */
export default class base_node {
    
    constructor(opts) { 
	opts = opts || {} 
	
	/* instantiate member variables */ 
	this.opts = opts
	this.name = opts.node_name || "base_node" 
	/* create global counter for node IDs */ 
	if (!wrtsm.node_counter) {wrtsm.node_counter = 0}
	this.id = this.name + "_" + wrtsm.node_counter++
	this.log = makeLogger(this.id) 
	this.dev_logger = makeLogger(this.id + "_dev")
	this.dev_mode = false
	this.dlog = function(msg) { if (this.dev_mode) { this.dev_logger(msg) } } 
	this.dclog = function(msg) {if (this.dev_mode) { console.log(msg) } } 
	this.creation_time = new Date() 
	
	/* configure the node type base on opts params  */ 
	this.is_source     = opts.source 
	this.is_sink       = opts.sink 
	this.is_through    = opts.through || true 
	/* these have significance in terms of base functionalities of the node /* 

	
	/* create a payload router object for managing connections  */
	this.payload_router = new node_payload_router() 
	
	/* assign appropriate references */
	this.io_dict = this.payload_router.io_dict 
	this.payload_router.set_base_node(this) 
	this.io_dict.set_base_node(this) 
	
	/* define a default handler */
	this.default_handler = (function(payload){
	    this.log(payload); return payload //must return in order to pass it on ! 
	}).bind(this)
	
	/* By default each node maps main_input -> main_handler -> main_output */ 
	let main_opts = {handler_id : "main" , input_port : "main_input" , 
			 output_port : "main_output" , handler : this.default_handler }
	
	/* configure main route */ 
	this.payload_router.add_input_handler( main_opts ) 
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
	this.dlog("Processing data packet...")
	//in general when a packet comes in we 
	//1. find the handlers associated with the input_port requested 
	let handler_obj = this.payload_router.handler_dict[input_port] 
	this.dclog(handler_obj)
	//2. make sure it exists -- if not this is likely an error 
	console.assert(handler_obj) 
	//3. run all the handlers with the included payload 
	this.run_handlers({handler_obj, payload})
    } 
    
    
    /* pass on creation of inputs */ 
    new_input(id)  { this.io_dict.new_input(id) }
    new_output(id) { this.io_dict.new_output(id) }
    
    /** 
     * Connect node to another node 
     * @param {base_node} sink - Node to connect to 
     * @param {obj} opts - Contains {output_port = "main_output",input_port = "main_input"}
     */
    connect(sink, { output_port = "main_output" , input_port = "main_input" } = {} ) { 
	let dict_from = this.io_dict 
	let dict_to   = sink.io_dict 
	this.io_dict.connect({output_port, dict_from, input_port, dict_to})
	
	/* return the sink node for chaining connections :) */ 
	return sink 
    }
    
    disconnect(sink, { output_port = "main_output" , input_port = "main_input" } = {} ) { 
	let dict_from = this.io_dict 
	let dict_to   = sink.io_dict 
	this.io_dict.disconnect({output_port, dict_from, input_port, dict_to})
	
	/* return the sink node for chaining connections :) */ 
	return sink 
    }
    

    /* Dev utilities for maually triggering nodes */ 
    /* These ARE NOT INTENDED FOR REALTIME NODE COMMUNICATIONS */ 
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



