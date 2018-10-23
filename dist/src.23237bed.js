parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"0JnT":[function(require,module,exports) {
"use strict";function e(e){return function(){for(var r=arguments.length,o=new Array(r),t=0;t<r;t++)o[t]=arguments[t];console.log("["+e+"]:: "+o.join())}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeLogger=e,exports.logger=void 0;var r={};exports.logger=r,r.register=function(o){r[o]=e(o)};
},{}],"Jsz8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.util=void 0;var r=require("../core_modules/logger.js"),n=!0,e={};exports.util=e,e.set_debug=function(r){n=r},e.bug=function(r){if(n){console.log("<- "+r+" ->");for(var e=0;e<(arguments.length<=1?0:arguments.length-1);e++)console.log(e+1<1||arguments.length<=e+1?void 0:arguments[e+1]);console.log("<- "+r+" ->")}},r.logger.register("bug"),e.debug=function(e){n&&r.logger.bug(e)},e.avg=function(r){for(var n=0,e=0;e<r.length;e++)n+=r[e];return n/r.length},e.take=function(r,n){for(var e=Array(n).fill(0),t=0;t<n;t++)e[t]=r[t];return e},e.arr_mult=function(r,n){return r.map(function(r){return r/n})},e.perf=function(r){var n=Array(2e4).fill(0);for(i=0;i<2e4;i++){var e=performance.now(),t=(r(),performance.now());n[i]=t-e}return avg(n)},e.range=function(r,n){for(var e=n-r,t=Array(e).fill(0),o=0;o<e;o++)t[o]=r+o;return t},e.first=function(r){return r[0]},e.last=function(r){return r[r.length-1]},e.zip=function(r,n){return r.map(function(r,e){return[r,n[e]]})},e.dict_2_vec=function(r){var n=[];for(var e in r)n.push([e,r[e]]);return n},e.number_or_self=function(r){var n=Number(r);return isNaN(n)?r:n},e.d_map=function(r,n){for(var e in r)r[e]=n(r[e]);return r},e.dict_vals_2_num=function(r){return e.d_map(r,number_or_self)},e.diff=function(r){for(var n=Array(r.length-1).fill(0),e=1;e<r.length;e++)n[e-1]=r[e]-r[e-1];return n},e.max=function(r){for(var n=r[0],e=1;e<r.length;e++)r[e]>n&&(n=r[e]);return n},e.min=function(r){for(var n=r[0],e=1;e<r.length;e++)r[e]<n&&(n=r[e]);return n},e.dom=function(r){return document.createElement(r)},e.set_inner_html=function(r,n){n instanceof HTMLElement?r.appendChild(n):r.innerHTML=n},e.flex_row=function(r,n,t){var o,i;for((o=e.dom("div")).className="flex-row",i=0;i<r;i++){var u=e.dom("div"),a=t(i,u);a&&e.set_inner_html(u,a),o.appendChild(u)}return o},e.make_div_array=function(r,n,t,o){var i,u;for((i=e.dom("div")).className="flex-column",i.id=t,i.style="width: 100% ; height : 100% ",u=0;u<r;u++){var a=t+"_"+u+",",f=e.flex_row(n,a,function(r,n){return o(u,r,n)});i.appendChild(f)}return i},e.id_from_loc=function(r,n,e){return e*r+n},e.test_div_array=function(r,n){return e.make_div_array(r,n,"foo",function(r,t,o){return e.id_from_loc(r,t,n).toString()})},e.app_clear=function(){for(var r=document.getElementById("app");r.firstChild;)r.removeChild(r.firstChild)},e.app_render=function(r){e.app_clear(),document.getElementById("app").appendChild(r)};var t=["black","blue","red","green","yellow","orange"];e.get_colors=function(r){return e.take(t,r)};
},{"../core_modules/logger.js":"0JnT"}],"YbFb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./logger.js"),t=n(require("../module_resources/utils.js"));function n(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}var o=function(){function n(t){s(this,n),this.url=t,this.connection=null,this.log=(0,e.makeLogger)("WS"),this.default_handler=function(e){this.log("No data handler has been defined!")},this.data_handler=this.default_handler}return i(n,[{key:"connect",value:function(){var e=new WebSocket(this.url);e.addEventListener("open",function(e){this.log("Connection to "+this.url+" successful. Registering client with server."),this.send_json({type:"register",data:"client"}),this.send_json({type:"control",data:"start"})}.bind(this)),e.addEventListener("message",function(e){this.data_handler(t.default.dict_vals_2_num(JSON.parse(e.data)))}.bind(this)),this.connection=e}},{key:"start_stream",value:function(){this.send_json({type:"control",data:"start"})}},{key:"stop_stream",value:function(){this.send_json({type:"control",data:"stop"})}},{key:"set_data_handler",value:function(e){this.data_handler=e}},{key:"send_json",value:function(e){this.connection.send(JSON.stringify(e))}}]),n}();exports.default=o;
},{"./logger.js":"0JnT","../module_resources/utils.js":"Jsz8"}],"VekP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./logger.js"),e=s(require("../module_resources/utils.js"));function s(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,e,s){return e&&a(t.prototype,e),s&&a(t,s),t}var o=function(){function s(e){i(this,s),this.session_id=e||(new Date).toISOString(),this.data_history=[],this.part_counter=1,this.save_interval_id=null,this.loaded_session=null,this.log=(0,t.makeLogger)("DS"),this.default_handler=function(t){this.log("No data handler has been defined!")},this.data_handler=this.default_handler,this.stream_index=0}return n(s,[{key:"flush_data",value:function(){var t=JSON.stringify(this.data_history);name=this.session_id+"_part"+this.part_counter.toString(),this.data_history=[],localStorage.setItem(name,t),this.part_counter+=1,this.log("Saved data chunk: "+name)}},{key:"start_saving",value:function(t){this.save_interval_id=setInterval(function(){this.flush_data()}.bind(this),1e3*t),this.log("Saving started for session: "+this.session_id)}},{key:"stop_saving",value:function(){clearInterval(this.save_interval_id),this.log("Saving stopped for session: "+this.session_id)}},{key:"process_data",value:function(t){this.data_history.push(t)}},{key:"load_session",value:function(){this.log("Loading session..."),this.loaded_session=d(this.session_id),this.stream_index=0,this.buffer_size=this.loaded_session.length,this.streaming=!1,this.zero_time_axis(),this.diffs=e.default.diff(this.loaded_session.map(function(t){return t.time})),this.log("Session loaded: "+this.session_id)}},{key:"set_data_handler",value:function(t){this.data_handler=t}},{key:"start_stream",value:function(){this.stream_index=0,this.streaming=!0,this.start_stream_loop()}},{key:"stream_single_packet",value:function(){if(this.stream_index<this.buffer_size){var t=this.loaded_session[this.stream_index];return this.data_handler(t),this.stream_index+=1,t}this.stop_stream()}},{key:"start_stream_loop",value:function(){if(this.streaming){var t=this.loaded_session[this.stream_index];if(this.data_handler(t),this.stream_index==this.buffer_size-1)this.stop_stream();else{var e=this.diffs[this.stream_index];this.stream_index+=1,setTimeout(function(){this.start_stream_loop()}.bind(this),e)}}}},{key:"zero_time_axis",value:function(){if(this.log("Zeroing time axis"),!this.loaded_session.length)throw"Session must be loaded!";var t=e.default.first(this.loaded_session).time;this.loaded_session.map(function(e){return e.time=e.time-t,e}),this.log("Done")}},{key:"stop_stream",value:function(){this.streaming=!1,this.stream_index=0,this.log("Stream finished.")}},{key:"to_csv",value:function(t){this.log("Creating csv file for: "+this.session_id);var e="data:text/csv;charset=utf-8,",s=Object.keys(this.loaded_session[0]).sort();e+=s.join(",")+"\n";for(var i=0;i<this.loaded_session.length;i++){var a=this.loaded_session[i];if("B"==a.dev){for(var n=[],o=0;o<s.length;o++){var r=s[o];a[r];n.push(a[r])}e+=n.join(",")+"\n"}}var d=encodeURI(e),h=document.createElement("a");h.setAttribute("href",d),h.setAttribute("download",(t||this.session_id)+".csv"),h.click()}}]),s}();function r(t){return Object.keys(localStorage).filter(function(e){return e.includes(t)}).sort()}function d(t){var e=r(t);return tmp=e.map(function(t){return JSON.parse(localStorage.getItem(t))}),[].concat.apply([],tmp)}exports.default=o;
},{"./logger.js":"0JnT","../module_resources/utils.js":"Jsz8"}],"E2Av":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./logger.js");function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}var a=function(){function t(){n(this,t),this.log=(0,e.makeLogger)("PM")}return r(t,[{key:"connect",value:function(e,n){e.set_data_handler(function(e){n.process_data(e)}.bind(n))}},{key:"disconnect",value:function(e,n){e.set_data_handler(e.default_handler)}}]),t}();exports.default=a;
},{"./logger.js":"0JnT"}],"z4YX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./logger.js"),t=r(require("../module_resources/utils.js"));function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}var o=function(){function t(){n(this,t),this.data_history=[],this.log=(0,e.makeLogger)("RA")}return a(t,[{key:"process_data",value:function(e){this.data_history.push(e),this.log("Received data!")}},{key:"produce_report",value:function(){var e=s(this.data_history);return this.log("Printing report: "),this.log(JSON.stringify(e)),e}},{key:"dist_field",value:function(e){var t=this.data_history.map(function(t){return t[e]});g_hist(t,"Distribution for: "+e)}},{key:"line_field",value:function(e){var t=this.data_history.map(function(t){return t[e]});g_line(t,"Time series for: "+e)}}]),t}();function u(e,t){return utils.avg(e.map(function(e){return e[t]}))}function s(e){return{len:e.length,acc_x_avg:u(e,"acc_x"),acc_y_avg:u(e,"acc_y"),acc_z_avg:u(e,"acc_z"),gyr_x_avg:u(e,"gyr_x"),gyr_y_avg:u(e,"gyr_y"),gyr_z_avg:u(e,"gyr_z")}}exports.default=o;
},{"./logger.js":"0JnT","../module_resources/utils.js":"Jsz8"}],"NC6u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.params=void 0;var e={global_x_len:200};exports.params=e;
},{}],"2cav":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../module_resources/global_params.js"),r=require("../module_resources/utils.js");function t(e,r){return a(e)||i(e,r)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(e,r){var t=[],n=!0,i=!1,a=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(t.push(o.value),!r||t.length!==r);n=!0);}catch(s){i=!0,a=s}finally{try{n||null==l.return||l.return()}finally{if(i)throw a}}return t}function a(e){if(Array.isArray(e))return e}function o(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function l(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,r,t){return r&&l(e.prototype,r),t&&l(e,t),e}var u=Bokeh.Plotting;function h(e){return Array(e).fill(0)}function f(e){return r.util.range(-e,0).map(function(e){return e/100})}function c(e){for(var t=e.x_len,n=e.series_array,i=e.title,a=n.length,o=[],l=[],s=0;s<a;s++)o.push(f(t)),l.push(h(t));var c=new Bokeh.ColumnDataSource({data:{xs:o,ys:l}}),_=u.figure({title:i,tools:"pan,crosshair,wheel_zoom,box_zoom,reset,save",sizing_mode:"stretch_both"}),p=_.multi_line({field:"xs"},{field:"ys"},{source:c,line_color:r.util.get_colors(a)});return{plot:_,glyph:p,source:c}}var _=function(e,r,t){for(var n=e.data,i=n.xs,a=n.ys,o=0;o<a.length;o++)t[o]&&(i[o].push(r),i[o].shift(),a[o].push(t[o]),a[o].shift());return n.xs=i,n.ys=a,e.setv("data",n,{silent:!0}),e.trigger("stream")},p=function(){function r(t){o(this,r);var n=t.series_vector,i=t.title;this.parent=null,this.series_vector=n;var a=c({x_len:e.params.global_x_len,title:i,series_array:n}),l=a.plot,s=a.glyph,u=a.source;l.background_fill_color="#e5efff",l.background_fill_alpha=.2,l.border_fill_color="#e5efff",l.border_fill_alpha=.2,this.multi_line_graph=l,this.source=u,this.glyph=s}return s(r,[{key:"get_data_source",value:function(){return this.source}},{key:"render_into_element",value:function(e){u.show(this.multi_line_graph,e)}}]),r}(),g=function(){function e(r){o(this,e),this.graphs={},this.parent=r,this.last_series_buffer={}}return s(e,[{key:"add_graph",value:function(e,r){var t=new p({series_vector:r,title:e+": "+r.join(", ")});this.graphs[e]=t}},{key:"init",value:function(){var e=r.util.dict_2_vec(this.graphs);this.graph_array=e;var n=2,i=Math.ceil(Object.keys(this.graphs).length/2);1==e.length&&(n=i=1),r.util.bug("n_row",i);var a=r.util.make_div_array(i,n,"rgui",function(i,a,o){var l=r.util.id_from_loc(i,a,n);if(!(l<e.length))return"";var s=t(e[l],2);s[0];s[1].render_into_element(o)});r.util.app_render(a)}},{key:"stream_to_graph",value:function(e,r,t){_(this.graphs[e].get_data_source(),r,t)}},{key:"handle_sensor_buffer",value:function(e,r){for(var t in this.graphs){var n,i,a,o;for(n=this.graphs[t].series_vector,i=Array(n.length).fill(0),a=0;a<n.length;a++)o=r[n[a]],i[a]=o;_(this.graphs[t].get_data_source(),e,i)}}}]),e}();exports.default=g;
},{"../module_resources/global_params.js":"NC6u","../module_resources/utils.js":"Jsz8"}],"eXVO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./logger.js"),e=i(require("./ui.js"));function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function n(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),t}var o=function(){function i(r){s(this,i);var n=r.buffer_size,o=r.gui_mode,a=r.debug_mode;this.log=(0,t.makeLogger)("SM"),this.buffer_size=n,this.sensor_buffer_size=n,this.buffer=Array(n).fill(u),this.sensors={},this.transitioners={},this.transitioner_groups={},this.STATE={},this.gui_mode=o,this.debug_mode=a||!1,o&&(this.sensors_gui_buffer={},this.ui_mapping=null,this.ui=new e.default(null))}return n(i,[{key:"initialize",value:function(t){this.STATE=t}},{key:"update_buffer_with_data_object",value:function(t){this.buffer.push(t),this.buffer.shift()}},{key:"add_sensor",value:function(t){var e,i;e=t.id,i=t.f,this.sensors[e]={},this.sensors[e].function=i,this.sensors[e].buffer=Array(this.sensor_buffer_size).fill(NaN),this.debug_mode&&this.log("Added sensor: "+e)}},{key:"init_gui",value:function(t){for(var e in this.ui_mapping=t,this.ui_mapping){var i=this.ui_mapping[e];this.ui.add_graph(e,i)}this.ui.init()}},{key:"run_sensor",value:function(t){var e=this.buffer,i=(0,this.sensors[t].function)(e);return i&&(this.sensors[t].buffer.push(i),this.sensors[t].buffer.shift()),i}},{key:"get_sensor_last_N",value:function(t,e){return this.sensors[t].buffer.slice(this.buffer_size-e)}},{key:"get_sensor_last_N",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return get_sensor_last_N(t,1)})},{key:"add_transitioner",value:function(t,e){if(!e.detector||!e.applicator)throw"Transitioner object does not contain both detector and applicator!";this.transitioners[t]=e,e.group&&(this.transitioner_groups[e.group]=!0),this.debug_mode&&this.log("Added transitioner: "+t)}},{key:"run_transitioner",value:function(t){var e=this.transitioners[t],i=e.group,s=this.transitioner_groups[i];if(0!=s){var r=e.detector,n=e.applicator;r(this)?(this.debug_mode&&this.log(":match: => "+t),n(this),s&&(this.transitioner_groups[i]=!1)):this.debug_mode&&this.log(":fail: => "+t)}}},{key:"process_data",value:function(t){for(var e in this.update_buffer_with_data_object(t),this.sensors){var i=this.run_sensor(e);this.gui_mode&&(this.sensors_gui_buffer[e]=i)}for(var s in this.transitioners)this.run_transitioner(s);for(var r in this.transitioner_groups)this.transitioner_groups[r]=!0;this.gui_mode&&this.ui.handle_sensor_buffer(t.time,this.sensors_gui_buffer)}},{key:"run_debug_cycle",value:function(){this.process_data(_())}}]),i}();exports.default=o;var u={acc_x:0,acc_y:0,acc_z:0,gyr_x:0,gyr_y:0,gyr_z:0,sample:0,time:0,dev:"B"},a=Math.random,f=0;function _(){return{acc_x:a(),acc_y:a(),acc_z:a(),gyr_x:a(),gyr_y:a(),gyr_z:a(),sample:f++,dev:"B"}}
},{"./logger.js":"0JnT","./ui.js":"2cav"}],"twt7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mods=void 0;var e=t(require("./core_modules/web_socket.js")),r=t(require("./core_modules/data_storage.js")),a=t(require("./core_modules/pipe_manager.js")),s=t(require("./core_modules/raw_analyzer.js")),u=t(require("./core_modules/state_machine.js")),o=t(require("./core_modules/ui.js"));function t(e){return e&&e.__esModule?e:{default:e}}var d={web_socket:e.default,data_storage:r.default,pipe_manager:a.default,raw_analyzer:s.default,state_machine:u.default,ui:o.default};exports.mods=d;
},{"./core_modules/web_socket.js":"YbFb","./core_modules/data_storage.js":"VekP","./core_modules/pipe_manager.js":"E2Av","./core_modules/raw_analyzer.js":"z4YX","./core_modules/state_machine.js":"eXVO","./core_modules/ui.js":"2cav"}],"yyI5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.wrtsm=void 0;var e=require("./module_bundle.js"),r={};exports.wrtsm=r,r.mods=e.mods,window.wrtsm=r;
},{"./module_bundle.js":"twt7"}],"YJSl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.sme=void 0;var e=require("../core_modules/logger.js"),r=t(require("./utils.js"));function t(e){return e&&e.__esModule?e:{default:e}}e.logger.register("sme");var n={sensors:{dev_a:{},dev_b:{}},transitioners:{}};exports.sme=n,n.sensors.field=function(e){return function(t){return r.default.last(t)[e]}},n.sensors.field_diff=function(e){return function(r){var t=r.length;return r[t-1][e]-r[t-2][e]}},n.is_dev_b=function(e){return"B"==e.dev},n.is_dev_a=function(e){return"A"==e.dev},n.sensors.dev_b.field=function(e){return function(t){return d=r.default.last(t),"B"==d.dev?d[e]:(r.default.debug("filter miss"),!1)}},n.transitioners.test_turn_on={detector:function(e){return!e.STATE.is_on},applicator:function(r){r.STATE.is_on=!0,r.debug_mode&&e.logger.sme("TURNED ON")},group:"switch"},n.transitioners.test_turn_off={detector:function(e){return e.STATE.is_on},applicator:function(r){r.STATE.is_on=!1,r.debug_mode&&e.logger.sme("TURNED OFF")},group:"switch"};
},{"../core_modules/logger.js":"0JnT","./utils.js":"Jsz8"}],"moiz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.flow=void 0;var e=i(require("../module_resources/utils.js")),s=require("../module_resources/state_machine_elements.js"),r=require("../wrtsm.js"),t=require("../core_modules/logger.js");function i(e){return e&&e.__esModule?e:{default:e}}t.logger.register("rg");var a={};exports.flow=a,a.test_storage_persist=function(e){ws=new r.wrtsm.mods.web_socket("ws://localhost:1234"),ds=new r.wrtsm.mods.data_storage(e),pm=new r.wrtsm.mods.pipe_manager,pm.connect(ws,ds),ds.start_saving(5),ws.connect(),setTimeout(function(){ws.stop_stream(),ds.stop_saving(),console.log("Streaming and saving stopped.")},21e3)},a.test_storage_replay=function(){return ds=new r.wrtsm.mods.data_storage("eugene_walk_rev"),ds.load_session(),ra=new r.wrtsm.mods.raw_analyzer,pm=new r.wrtsm.mods.pipe_manager,pm.connect(ds,ra),ds.start_stream(),[ds,ra]},a.test_state_machine=function(e){t.logger.rg("Creating state machine with size: "+e);var n=new r.wrtsm.mods.state_machine({buffer_size:e,gui_mode:!1});return n.initialize({is_on:!1}),t.logger.rg("Adding sensors"),n.add_sensor({id:"acc_x",f:s.sme.sensors.field("acc_x"),graph:"g1"}),n.add_sensor({id:"acc_x_diff",f:s.sme.sensors.field_diff("acc_x"),graph:"g1"}),t.logger.rg("Adding transitioners"),n.add_transitioner("test_turn_on",s.sme.transitioners.test_turn_on),n.add_transitioner("test_turn_off",s.sme.transitioners.test_turn_off),t.logger.rg("Returning sm"),n},a.test_state_machine_gui=function(e){t.logger.rg("Creating state machine with size: 200");var n=new r.wrtsm.mods.state_machine({buffer_size:200,gui_mode:!0});return n.initialize({is_on:!1}),t.logger.rg("Adding sensors"),n.add_sensor({id:"acc_x",f:s.sme.sensors.field("acc_x"),graph:"g1"}),n.add_sensor({id:"acc_x_diff",f:s.sme.sensors.field_diff("acc_x"),graph:"g1"}),t.logger.rg("Adding transitioners"),n.add_transitioner("test_turn_on",s.sme.transitioners.test_turn_on),n.add_transitioner("test_turn_off",s.sme.transitioners.test_turn_off),n.init_gui(e),t.logger.rg("Returning sm"),n},a.playback_gui=function(e){n=200,t.logger.rg("Creating state machine with size: "+n);var i=new r.wrtsm.mods.state_machine({buffer_size:n,gui_mode:!0,debug_mode:!1});t.logger.rg("Adding sensors"),i.add_sensor({id:"dev_b_gyr_z",f:s.sme.sensors.dev_b.field("gyr_z")}),i.add_sensor({id:"acc_y",f:s.sme.sensors.field("acc_y")}),i.add_sensor({id:"gyr_z",f:s.sme.sensors.field("gyr_z")}),t.logger.rg("Adding transitioners"),i.add_transitioner("test_turn_on",s.sme.transitioners.test_turn_on),i.add_transitioner("test_turn_off",s.sme.transitioners.test_turn_off),t.logger.rg("Calling sm.init_gui"),i.init_gui(e);var a=new r.wrtsm.mods.data_storage("eugene_walk_rev");return a.load_session(),pm=new r.wrtsm.mods.pipe_manager,pm.connect(a,i),[a,pm,i]},a.graph_dances=function(){var e=a.test_state_machine_gui({g1:["acc_x","acc_y"]}),s=20,r=0,t=setInterval(function(){e.ui.handle_sensor_buffer(200+s*r,{acc_x:Math.sin(.02*r),acc_y:-Math.sin(.05*r)}),r++},50);return[e,t,function(){clearInterval(t)}]},a.graph_sm_test=function(){for(var s=Array(200).fill(0),r=Array(200).fill(0),n=0;n<200;n++){var i=2+1*n;s[n]=i;var a=test_state_machine(i),o=function(){a.run_debug_cycle()}.bind(a);r[n]=e.default.perf(o)}t.logger.rg("Graphing results... "),bar_graph("Perf","size","time",s,r),t.logger.rg("hmm.. ?")},a.EW=function(){return d=new r.wrtsm.mods.data_storage("eugene_walk_rev"),d.load_session(),d};
},{"../module_resources/utils.js":"Jsz8","../module_resources/state_machine_elements.js":"YJSl","../wrtsm.js":"yyI5","../core_modules/logger.js":"0JnT"}],"H99C":[function(require,module,exports) {
"use strict";var s=require("./wrtsm.js"),r=require("./scripts/rose_gait_workflows.js");s.wrtsm.flow=r.flow,console.log(":: "+new Date+" ::"),console.log(":: wrtsm initialized ::");
},{"./wrtsm.js":"yyI5","./scripts/rose_gait_workflows.js":"moiz"}]},{},["H99C"], null)
//# sourceMappingURL=/src.23237bed.map