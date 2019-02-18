import * as util from "./utils.js" 


/* my JS interface to Bokeh */ 


/* 
   
 Render plot into element: Bokeh.Plotting.show(plot, el)  
 Create data source: new Bokeh.ColumnDataSource( {data : {xs : _ , ys : }} ) 
 Make Figure : Bokeh.Plotting.figure({title: _ , sizing_mode : 'stretch_both'})
 Using data source:  
    var glyph = p.multi_line({ field: "xs" }, { field: "ys" }, {
	source: source,
	line_color: util.get_colors(series_len)
    }) 
 
 Changing data source: 
 function addPoint() {
    // The data can be added, but generally all fields must be the
    // same length.
    source.data.x.push(Math.random());
    source.data.y.push(Math.random());
    // Also, the DataSource object must be notified when it has changed.
    source.change.emit();
 }
 
   
 */ 

export function get_el(id) { 
    return document.getElementById(id) 
}

export function _make_bar_plot(opts) { 
    var {x , y, width, title } = opts 
    var source = new Bokeh.ColumnDataSource({
	data: {x:x,top:y} 
    })
    
    //make plot 
    let p = Bokeh.Plotting.figure({title : title||"bokeh plot"})
    
    // add a Vbar glyph
    var vbar = new Bokeh.VBar({
	x: { field: "x" },
	top: { field: "top" },
	bottom : 0 , 
	fill_color : "#f46d43" , 
	width : width || 0.5  
    });
    
    p.add_glyph(vbar,source) 
    return {plot: p , source : source } 
}

export function _make_line_plot(opts) { 
    var {x , y, title } = opts 
    var source = new Bokeh.ColumnDataSource({
	data: {x:x,y:y} 
    })
    
    //make plot 
    let p = Bokeh.Plotting.figure({title : title||"bokeh plot"})
    
    // add a Vbar glyph
    var l = new Bokeh.Line({
	x: { field: "x" },
	y: { field: "y" },
	line_color : "#f46d43" , 
    });

    var c = new Bokeh.Circle({
	x: { field: "x" },
	y: { field: "y" },
	fill_color : "#f46d43",
	size : 2 , 
    });

    p.add_glyph(l,source) 
    p.add_glyph(c,source) 
    
    return {plot: p , source : source } 
}



export function set_bokeh_default_container(el) { 
    if (typeof el == "string") { 
	el = document.getElementById(el)
    }
    window.bokeh_default_container = el 
}

export function get_bokeh_default_container(){ 
    return window.bokeh_default_container || document.getElementById("nflow") 
}


var  plot_dict  = { "bar"  : _make_bar_plot , 
		    "line" : _make_line_plot} 


export function bokeh_plot(plot,container) { 
    while (container.firstChild) { container.removeChild(container.firstChild) } 
    Bokeh.Plotting.show(plot,container) 
}
    
function plot(opts, kind) { 
    if (opts.x == undefined) { 
	opts.x = util.range(0,opts.y.length)
    } 
    
    let plot_maker  = plot_dict[kind]
    var {plot, source} = plot_maker(opts)
    let container = opts.container || get_bokeh_default_container() 
    bokeh_plot(plot,container) 
    return  {plot, source } 
}

export function bar_plot(opts) { 
    return plot(opts, "bar")
} 

export function line_plot(opts) { 
    return plot(opts, "line")
} 



export function go() { 
    let p1  = bar_plot() 
    Bokeh.Plotting.show(p1,get_el("nflow"))
}


/* 
   TODO : build legit javascript interface for graphing ! :) 
   consider incorporating into util somehow/making it a global file ! 
   */ 
