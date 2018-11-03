export function load_script(url,cb){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE 
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
		if (cb) { 
                    cb();
		}
            }
        };
    } else {  //Others
        script.onload = function(){
	    if (cb) {
		cb();
	    }
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


export function load_css(url,cb) { 
    
    var link = document.createElement("link")
    link.type = "text/css";
    link.rel = 'stylesheet';


    if (link.readyState){  //IE 
        link.onreadystatechange = function(){
            if (link.readyState == "loaded" ||
                    link.readyState == "complete"){
                link.onreadystatechange = null;
		if (cb) { 
                    cb();
		}
            }
        };
    } else {  //Others
        link.onload = function(){
	    if (cb) {
		cb();
	    }
        };
    }

    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
    
