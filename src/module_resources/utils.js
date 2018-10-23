//Tue Oct  2 18:06:09 PDT 2018
//General JS utils file 
//would like to try creating soft?hard? links so that the utils files can be shared 

import {logger} from "../core_modules/logger.js"


var global_debug = true 

var util = {} 

util.set_debug = function(b) { 
    global_debug = b 
} 

util.bug = function(tag,...msg) { 
    if (global_debug) { 
	console.log("<- " + tag + " ->" )
	for (var i = 0 ; i < msg.length ; i++) { 
	    console.log(msg[i])
	}
	console.log("<- " + tag + " ->" )
    }
}

logger.register("bug") 

util.debug = function(msg) { 
    if (global_debug) {
	logger.bug(msg)
    }
}



util.avg = function(arr) { 
    var sum = 0;
    for( var i = 0; i < arr.length; i++ ){
	sum += arr[i]
    }
    return sum/arr.length 
}

util.take = function(coll,num) { 
    var ret = Array(num).fill(0) 
    for (var i =0;i<num; i++) { 
	ret[i] = coll[i]
    }
    return ret 
} 

util.arr_mult = function(arr,x) { 
    return arr.map( y => y /x ) 
}

util.perf = function(f) { 
    var num_times = 20000
    var results = Array(num_times).fill(0) 
    for (i = 0 ; i < num_times ; i++ ) { 
	var t0 = performance.now();
	var result = f() 
	var t1 = performance.now();
	results[i] = t1 - t0 
    } 
    return avg(results) 
} 

util.range = function(a,b) { 
    var len = b - a 
    var ret = Array(len).fill(0)  ; 
    for (var i = 0 ; i< len ; i++) {  
	ret[i] = a + i 
    }
    return ret 
    
} 

util.first = function(d) { 
    return d[0]
} 


util.last = function(d) { 
    return d[d.length - 1 ] 
} 


util.zip = function(xs,ys) { 
        return xs.map(function(x,i) { 
	    return [x, ys[i]]
	}) 
}

util.dict_2_vec = function(d) { 
    var ret = [] ; 
    for (var k in d) { 
	ret.push([ k, d[k] ]) 
    } 
    return ret 
}

util.number_or_self = function(d) { 
    var val = Number(d) 
    if (isNaN(val)) {
	return d 
    } else { 
	return val 
    } 
}

util.d_map = function(d,f) { 
    for (var k in d) {
	d[k] = f(d[k])
    }
    return d 
}

util.dict_vals_2_num = function(d) { 
    return util.d_map(d,number_or_self) 
}
    

util.diff = function(d) { 
    var r =   Array(d.length - 1).fill(0) 
    for (var i = 1 ; i < d.length ; i ++ ) { 
	r[i-1] = d[i] - d[i-1]
    }
    return r 
}


util.max = function(d) { 
    var curr_max = d[0] 
    
    for (var i=1;i<d.length;i++) { 
	if (d[i] > curr_max) { curr_max = d[i] }
    } 
    
    return curr_max 
} 


util.min = function(d) { 
    var curr_min = d[0] 
    
    for (var i=1;i<d.length;i++) { 
	if (d[i] < curr_min) { curr_min = d[i] }
    } 
    
    return curr_min
    
} 



// define ui utilities now ------------> 




util.dom = function(s) { 
    return document.createElement(s) 
} 

util.set_inner_html = function(d,thang) { 
    if (thang instanceof HTMLElement) { 
	d.appendChild(thang) 
    } else { 
	d.innerHTML = thang 
    } 
    
} 

util.flex_row = function(num,id_base,f) { 
    var container, i 

    container = util.dom("div")  
    container.className = "flex-row"  // see styles.css   
    
    for (i =0 ; i < num ; i ++ ) { 
	var d = util.dom("div") 
	var html = f(i,d) 
	if (html) { 
	    util.set_inner_html(d, html) 
	} 
	container.appendChild(d) 
    } 
	
    return container  
     
}


/* 
 * Create a flexbox of divs [m,n] in shape 
 * @param {Function} f - accepts row, column, and HTMLelement. Can either mutate the el or return an new el (which will be appended to div at spot r,c) or return String (which will be set to innerHTML) 
 */ 
util.make_div_array = function(m,n,id_base,f) { 
    var container, i 
    
    container = util.dom("div")  
    container.className = "flex-column"  // see styles.css  
    container.id = id_base 
    
    container.style = "width: 100% ; height : 100% " 
    
    // now we will add in the child elements 
    for (i =0 ; i < m ; i ++ ) { 
	
	//f is a function which takes a row and column and element 
	//build a function that takes just a col with row hard coded 
	//and returns f(r,col)
	var fn = function(col,el) {
	    return f(i,col,el) 
	}
	
	var new_id_base = id_base + "_" +  i + "," 
	var row = util.flex_row(n,new_id_base , fn )
	container.appendChild(row) 
    }
    
    return container
    

} 

util.id_from_loc = function(m,n,c) { 
    return c*m + n   // intersing that this function needs arg c, which is (static) number of cols 
}

util.test_div_array = function(m,n) { 
    var f = function(r,c,el) { 
	return (util.id_from_loc(r,c,n)).toString()
    } 

    return util.make_div_array(m,n,"foo", f) 
    
} 
	

util.app_clear = function() { 
    var app = document.getElementById("app");
    while (app.firstChild) {
	app.removeChild(app.firstChild);
    }   
}

util.app_render = function(el) { 
    util.app_clear() 
    var app = document.getElementById("app")  
    app.appendChild(el) 
}


var colors = ["black" , "blue" , "red" , "green" , "yellow" , "orange"]

util.get_colors = function(num) { 
    return util.take(colors, num) 
}



///   extensions 


// Array.prototype.first = function(arr) { 
//     return arr[0] 
// }


export {util} 
