


var menu_str = '<div id="menu" class="sidenav">
                 <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"> 
                  <i class="fas fa-window-close"></i>
                </a>
               </div>'



function wrap_body() { 
    
    let children  = document.body.children
    let wrapper = document.createElement("div") 
    wrapper.id = "menuX_body" 
    
    //copy them over
    for (let c of children) { 
	wrapper.appendChild(c.cloneNode(true))   //note the cloneNode call 
    }
    
    //now delete all the items from the body 
    while (document.body.firstChild) {
	document.body.removechild(document.body.firstChild) 
    }
    
    //add the div to body 
    document.body.insertAdjacentElement('afterbegin', wrapper) 
    

    
}

