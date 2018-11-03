# webrt_state_machine
Welcome to the Web Realtime State Machine, or WRTSM. WRTSM is a javascript library built by motion analysis researchers at Stanford University for protyping and implementing real time detection and feedback systems. Data is piped in realtime via websockets into a configurable state machine, which allows visualization of both raw and derived data features. Both raw data and derived features trigger state transitions through arbitrarily defined "detectors" and "applicators", which allows for the implementation of various feedback and detection systems. Check out the documentation for more information, or quickly get started by following the instructions below. 

![](wrtsm.gif)


## Getting Started 

All you have to do is include the wrtsm.js file in your html, and tell wrtsm which DOM node you would like to render the UI too. Here is the barebones HTML example to get you started: 
```html
<html>
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sheunaluko/webrt_state_machine@v0.1-alpha/dist/index.js"></script>
</head>

<body>
  <div id="wrtsm"></div>
  
  <script> 
           function demo() { 
	       wrtsm.flow.graph_dances() 
	   } 

  	   window.addEventListener("wrtsm_ready", demo ) 
  
  </script> 

</body>

</html>
```
 
Note the div element with ID 'wrtsm'  - this is where the UI will be rendered. Also note the cdn loaded script in the head section of the html, which loads the wrtsm module into your page. Finally, the inline script waits for the wrtsm_ready event and then loads an demo real time graph. 


