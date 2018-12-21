//Tue Oct  2 10:12:11 PDT 2018

import {makeLogger} from "./logger.js"
import {util} from "../module_resources/utils.js"

/**
 * 
 * 
 */

export default class data_storage {

    /**
     * Manages data persistence and replay/simulation. Uses browser based local storage. 
     * @param {String} name - Session identifier, use null for default time string
     */ 
    constructor(name) { 
	this.session_id = name || (new Date()).toISOString()
	this.data_history = [] 
	this.part_counter = 1 
	this.save_interval_id = null 
	this.loaded_session = null 
	this.playback_speed_multiplier = 1
	
	this.log = makeLogger("DS")
	this.default_handler = function(data) { 
	    this.log("No data handler has been defined!") 
	} 
	this.data_handler = this.default_handler 
	this.stream_index = 0 
    } 
    
    /**
     *  Persists a chunk of data to localStorage. Uses session name + part_number as identifier
     */ 
    flush_data() { 
	var to_save = JSON.stringify(this.data_history)
	name    = this.session_id + "_part" + this.part_counter.toString() 
	this.data_history = [] 
	localStorage.setItem(name, to_save) 
	this.part_counter += 1 
	this.log("Saved data chunk: " + name ) 
    } 
    
    /**
     * Start saving data to localStorage. Data is saved in chunks called 'parts'. 
     * @param {Number} rate - The rate to flush data to localStorage in SECONDS 
     */ 
    start_saving(rate) { 
	this.save_interval_id = setInterval(  (function(){this.flush_data()}).bind(this) , rate*1000)
	this.log("Saving started for session: " + this.session_id) 
    } 

    /**
     * Stop saving data to localStorage
     */ 
    stop_saving() { 
	clearInterval(this.save_interval_id) 
	this.log("Saving stopped for session: " + this.session_id) 
    } 
    
    /** 
     * Main data handler. Will append the incoming data to the data_history array 
     * @param {Object} obj - The data obj to add 
     */
    process_data(obj) { 
	this.data_history.push(obj) 
    } 

    /** 
     * Loads a data storage session from localStorage. Returns Array. 
     */
    load_session() { 
	this.log("Loading session...")
	this.loaded_session = get_session(this.session_id)  // see definition below 
	this.stream_index = 0 
	this.buffer_size = this.loaded_session.length
	this.streaming = false 
	this.zero_time_axis() 
	this.diffs = util.diff( this.loaded_session.map( d => d["time"] )  )
	this.log("Session loaded: " + this.session_id) 
    } 


    /** 
     * Set the data_handler for data replay/simulation 
     * @param {Function} f - The data handler function  
     */
    set_data_handler(f) { 
	this.data_handler = f 
    } 
    
    /** 
     * Start streaming the session that was previously loaded from localStorage 
     */
    start_stream(speed) { 
	this.stream_index =  0 
	this.streaming = true 
	this.playback_speed_multiplier = speed || 1 
	this.start_stream_loop() 

    } 
    
    /** 
     * Stream single packet
     */
    stream_single_packet() { 
	if (this.stream_index < this.buffer_size  ) { 	
	    //get the data
	    var val = this.loaded_session[this.stream_index]
	    //send the data
	    this.data_handler(val) 
	    //increment the stream index 
	    this.stream_index += 1 
	    return val 
	} else { 
	    this.stop_stream() 
	} 
	

    } 
    
    
    /** 
     * Helper function for start_stream() 
     */
    start_stream_loop() { 
    	//when starting, this.index is 0, this.diffs is defined 
	if (this.streaming) { 
	    //get the data
	    var val = this.loaded_session[this.stream_index]
	    //send the data
	    this.data_handler(val) 
	    
	    if (this.stream_index == this.buffer_size - 1 ) { 
		//on the last data point  
		//significant b/c the diff array is finished 
		//so we stop streaming 
		this.stop_stream() 
		
	    } else { 
		//not on the last data point 
		//now acces the next diff 
		var delay = this.diffs[this.stream_index]
		//increment the stream_index 
		this.stream_index += 1 
		//schedule the loop again 
		var mod =  this.playback_speed_multiplier 
		setTimeout( (function() {this.start_stream_loop()}).bind(this) , delay*mod)
	    }
	    
	}
	
    }
		
    
    /** 
     * Zero the time axis of the data session 
     */
    zero_time_axis() { 
	this.log("Zeroing time axis") 
	if (!this.loaded_session.length) { 
	    throw("Session must be loaded!")
	} else { 
	    //get first time point 
	    var t_1  = util.first(this.loaded_session)["time"] 
	    //now we subtract t_1 from all time points 
	    this.loaded_session.map( function(d) { 
		d["time"] = d["time"] - t_1 
		return d 
	    })
	    this.log("Done")
	}
	
    } 



    /** 
     * Stop streaming the session that was previously loaded from localStorage 
     */
    stop_stream() { 
	this.streaming = false 
	this.stream_index =  0 
	this.log("Stream finished.") 
    } 

    
    
    /** 
     * Makes csv string from this.loaded_session 
     */
    to_csv(name) { 
	this.log("Creating csv file for: " + this.session_id) 
	let csvContent = "data:text/csv;charset=utf-8,";
	
	//figure out the keys in the data objects 
	let keys = Object.keys(this.loaded_session[0]).sort()
	
	//write csv header 
	csvContent += ( keys.join(",") + "\n" ) 
	
	//then loop through the structure 
	for (var i =0 ; i < this.loaded_session.length ; i ++) { 
	    var data = this.loaded_session[i]
	    if (data.dev == "B" ) { 
		var row_content = []
		//loop through keys to build the row 
		for (var k = 0 ; k < keys.length ; k ++ ) { 
		    var key = keys[k] 
		    var val = data[key]
		    row_content.push(data[key]) 
		}
		csvContent += (row_content.join(",") + "\n" ) 
	    }
	} 
	
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", (name || this.session_id)   + ".csv");
	link.click();
	
	
    } 

    /** 
     * Makes and downloads json string from this.loaded_session 
     */
    to_json(name) { 
	this.log("Creating json file for: " + this.session_id) 
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.loaded_session)) 
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",     dataStr);
	downloadAnchorNode.setAttribute("download", (name || this.session_id) + ".json");
	downloadAnchorNode.click();
    }
    
    
    /** 
     * Loads json data into local storage 
     */
    load_json() { 
	var i = make_json_input() 
	i.click() 
	return i
    }
    
    
}


// define some helpers 
function get_session_part_names(id) { 
    return Object.keys(localStorage).filter( s => s.includes(id) ).sort() 
} 
    
function get_session(id) { 
    var parts_names = get_session_part_names(id) 
    // part names are sorted already 
    var tmp = parts_names.map( function(name) { 
	return JSON.parse(localStorage.getItem(name))
    }) 
    
    var merged = [].concat.apply([], tmp);
    return merged.map( util.dict_vals_2_num ) 
}


function file_cb(evt) { 
    var f = evt.target.files[0]
    var fname = f.name.replace(".json","")
    var reader = new FileReader() 
    reader.onloadend = function(evt) { 
	if (evt.target.readyState == FileReader.DONE) {
	    localStorage.setItem(fname, evt.target.result) 
	    console.log("[DS]:: Saved item to local storage: " + fname )
	} else { 
	    console.log("[DS]:: error reading.. ") 
	    console.log(evt) 
	} 
    }
    reader.readAsText(f) 
}


function make_json_input() {
    var i =   document.createElement("input")
    i.type = "file" 
    i.addEventListener("change", file_cb ) 
    return i 
} 
