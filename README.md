# webrt_state_machine
Javascript websocket real time data analyzer with built in state machine and visualization (bokeh)

![](wrtsm.gif)


## Usage 

Because the UI depends on Bokeh, you will need to include the following in your index.html:

```html
<link rel="stylesheet" href="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css" type="text/css" />
<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js"></script>
<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js"></script>
```

And the following to import the wrtsm module directly: 
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sheunaluko/webrt_state_machine@v0.1-alpha/dist/index.js"></script>
 ```
 
Finally, for UI rendering, make sure you include an "app" tag in your html as well, like this: 
```html 
<div id="app" style="width : 100% ; height : 75%" > </div>   
```

