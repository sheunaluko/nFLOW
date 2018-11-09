import {util}     from "./utils.js"

var smu = { sensors : {} , transformers : {}  } 

smu.sensors.field = function(field) { 
    return function(sm) { 
	let d = sm.buffer 
	return util.last(d)[field] 
    }
} 


export { smu } 
