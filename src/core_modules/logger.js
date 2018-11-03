
export function makeLogger(tag) { 
    return function(...stuff) { 
	console.log("[" + tag + "]:: " + stuff.join())
    }
} 


var logger = {} 

logger.register = function(tag) { 
    logger[tag] = makeLogger(tag)
} 


export {logger}  
