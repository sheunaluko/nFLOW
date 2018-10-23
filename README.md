# webrt_state_machine
Javascript websocket real time data analyzer with built in state machine and visualization (bokeh)


## Usage 

Because the UI depends on Bokeh, you will need to include the following in your index.html:

```html
<link rel="stylesheet" href="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js"></script>
<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sheunaluko/webrt_state_machine/dist/index.js"></script>
 ```
 
Make sure you include an "app" tag in your html as well, like this: 

```html 
<div id="app" style="width : 100% ; height : 75%" > </div>   
```

