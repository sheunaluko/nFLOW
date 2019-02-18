// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/core_modules/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLogger = makeLogger;
exports.logger = void 0;

function makeLogger(tag) {
  return function () {
    for (var _len = arguments.length, stuff = new Array(_len), _key = 0; _key < _len; _key++) {
      stuff[_key] = arguments[_key];
    }

    console.log("[" + tag + "]:: " + stuff.join());
  };
}

var logger = {};
exports.logger = logger;

logger.register = function (tag) {
  logger[tag] = makeLogger(tag);
};
},{}],"src/module_resources/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set_debug = set_debug;
exports.bug = bug;
exports.debug = debug;
exports.and = and;
exports.array_and = array_and;
exports.apply = apply;
exports.avg = avg;
exports.multiply = multiply;
exports.rms = rms;
exports.variance = variance;
exports.std = std;
exports.take = take;
exports.arr_mult = arr_mult;
exports.perf = perf;
exports.arr_range = arr_range;
exports.range = range;
exports.first = first;
exports.last = last;
exports.zip_map = zip_map;
exports.zip = zip;
exports.dict_2_vec = dict_2_vec;
exports.number_or_self = number_or_self;
exports.d_map = d_map;
exports.dict_vals_2_num = dict_vals_2_num;
exports.diff = diff;
exports.max = max;
exports.min = min;
exports.merge = merge;
exports.cycle_array = cycle_array;
exports.loop_fn = loop_fn;
exports.get_series = get_series;
exports.std_percent_diff = std_percent_diff;
exports.array_percent_diff = array_percent_diff;
exports.array_log_diff = array_log_diff;
exports.cv = cv;
exports.cv_matrix = cv_matrix;
exports.log_diff_half_buff = log_diff_half_buff;
exports.spd_matrix = spd_matrix;
exports.matrix_map = matrix_map;
exports.matrix_mapper = matrix_mapper;
exports.dom = dom;
exports.set_inner_html = set_inner_html;
exports.flex_row = flex_row;
exports.make_div_array = make_div_array;
exports.id_from_loc = id_from_loc;
exports.test_div_array = test_div_array;
exports.app_clear = app_clear;
exports.app_render = app_render;
exports.get_colors = get_colors;
exports.now = now;

var _logger = require("../core_modules/logger.js");

//Tue Oct  2 18:06:09 PDT 2018
//General JS utils file 
//would like to try creating soft?hard? links so that the utils files can be shared 
var global_debug = true;

function set_debug(b) {
  global_debug = b;
}

_logger.logger.register("bug");

function bug(tag) {
  if (global_debug) {
    console.log("<- " + tag + " ->");

    for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
      console.log(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }

    console.log("<- " + tag + " ->");
  }
}

function debug(msg) {
  if (global_debug) {
    _logger.logger.bug(msg);
  }
}

function and() {
  var ret = true;

  for (var i = 0; i < arguments.length; i++) {
    ret = ret && (i < 0 || arguments.length <= i ? undefined : arguments[i]);
  }

  return ret ? true : false;
}

function array_and(arr) {
  var ret = true;

  for (var i = 0; i < arr.length; i++) {
    ret = ret && arr[i];
  }

  return ret ? true : false;
}

function apply(f, args) {
  return f.apply(null, args);
}

function avg(arr) {
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
}

function multiply(arr) {
  var ret = 1;

  for (var i = 0; i < arr.length; i++) {
    ret *= arr[i];
  }

  return ret;
}

function rms(arr) {
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum += arr[i] * arr[i];
  }

  return Math.sqrt(sum / arr.length);
}

function variance(arr) {
  var _avg = avg(arr);

  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum += Math.pow(arr[i] - _avg, 2);
  }

  return sum / arr.length;
}

function std(arr) {
  return Math.sqrt(variance(arr));
}

function take(coll, num) {
  var ret = Array(num).fill(0);

  for (var i = 0; i < num; i++) {
    ret[i] = coll[i];
  }

  return ret;
}

function arr_mult(arr, x) {
  return arr.map(function (y) {
    return y / x;
  });
}

function perf(f) {
  var num_times = 20000;
  var results = Array(num_times).fill(0);

  for (i = 0; i < num_times; i++) {
    var t0 = performance.now();
    var result = f();
    var t1 = performance.now();
    results[i] = t1 - t0;
  }

  return avg(results);
}

function arr_range(arr) {
  return apply(Math.max, arr) - apply(Math.min, arr);
}

function range(a, b) {
  var len = b - a;
  var ret = Array(len).fill(0);

  for (var i = 0; i < len; i++) {
    ret[i] = a + i;
  }

  return ret;
}

function first(d) {
  return d[0];
}

function last(d) {
  return d[d.length - 1];
}

function zip_map(ks, vs) {
  var result = {};

  for (var i = 0; i < ks.length; i++) {
    result[ks[i]] = vs[i];
  }

  return result;
}

function zip(xs, ys) {
  return xs.map(function (x, i) {
    return [x, ys[i]];
  });
}

function dict_2_vec(d) {
  var ret = [];

  for (var k in d) {
    ret.push([k, d[k]]);
  }

  return ret;
}

function number_or_self(d) {
  var val = Number(d);

  if (isNaN(val)) {
    return d;
  } else {
    return val;
  }
}

function d_map(d, f) {
  for (var k in d) {
    d[k] = f(d[k]);
  }

  return d;
}

function dict_vals_2_num(d) {
  return d_map(d, number_or_self);
}

function diff(d) {
  var r = Array(d.length - 1).fill(0);

  for (var i = 1; i < d.length; i++) {
    r[i - 1] = d[i] - d[i - 1];
  }

  return r;
}

function max(d) {
  var curr_max = d[0];

  for (var i = 1; i < d.length; i++) {
    if (d[i] > curr_max) {
      curr_max = d[i];
    }
  }

  return curr_max;
}

function min(d) {
  var curr_min = d[0];

  for (var i = 1; i < d.length; i++) {
    if (d[i] < curr_min) {
      curr_min = d[i];
    }
  }

  return curr_min;
}

function merge(a, b) {
  var result = Object.assign({}, a, b);
  return result;
}

function cycle_array(a, v) {
  a.push(v);
  a.shift();
  return a;
}

function loop_fn(coll, fn, num) {
  var l = coll.length;
  var ret = Array(l).fill(0);

  for (var i = num; i < l; i++) {
    ret[i] = fn(coll.slice(i - num, i));
  }

  return ret;
}

function get_series(coll, field) {
  return coll.map(function (e) {
    return e[field];
  });
}

function std_percent_diff(arr) {
  // Meant to be a magnitude normalized average derivative of an array 
  // calculates the vector of percentage differences (consecutive indeces) 
  // then gets the std of those 
  var tmp = Array(arr.length - 1).fill(NaN);

  for (var i = 0; i < tmp.length; i++) {
    tmp[i] = (arr[i + 1] - arr[i]) / arr[i];
  }

  return std(tmp);
}

function array_percent_diff(a1, a2) {
  var ret = Array(a2.length).fill(0);

  for (var i = 0; i < ret.length; i++) {
    ret[i] = (a2[i] - a1[i]) / a1[i];
  }

  return ret;
}

function array_log_diff(a1, a2) {
  var ret = Array(a2.length).fill(0);

  for (var i = 0; i < ret.length; i++) {
    ret[i] = Math.log(a2[i]) - Math.log(a1[i]);
  }

  return ret;
}

function cv(arr) {
  return std(arr) / avg(arr);
}

function cv_matrix(matrix) {
  var num_els = matrix[0].length;
  var result = Array(num_els).fill(null);

  for (var e = 0; e < num_els; e++) {
    var el_array = matrix.map(function (arr) {
      return arr[e];
    });
    result[e] = cv(el_array);
  }

  return result;
}

function log_diff_half_buff(buff) {
  //splits buffer in half, averages two halves, then calcs log diff of both halves 
  var split = Math.ceil(buff.length / 2);
  var fh = take(buff, split);
  var sh = buff.slice(-(buff.length - split));
  return Math.log(avg(sh)) - Math.log(avg(fh));
}

function spd_matrix(matrix) {
  // foo
  var num_els = matrix[0].length;
  var result = Array(num_els).fill(null);

  for (var e = 0; e < num_els; e++) {
    var el_array = matrix.map(function (arr) {
      return arr[e];
    });
    result[e] = std_percent_diff(el_array);
  }

  return result;
}

function matrix_map(matrix, f) {
  var num_els = matrix[0].length;
  var result = Array(num_els).fill(null);

  for (var e = 0; e < num_els; e++) {
    var el_array = matrix.map(function (arr) {
      return arr[e];
    });
    result[e] = f(el_array);
  }

  return result;
}

function matrix_mapper(f) {
  return function (m) {
    return matrix_map(m, f);
  };
} // define ui utilities now ------------> 


function dom(s) {
  return document.createElement(s);
}

function set_inner_html(d, thang) {
  if (thang instanceof HTMLElement) {
    d.appendChild(thang);
  } else {
    d.innerHTML = thang;
  }
}

function flex_row(num, id_base, f) {
  var container, i;
  container = dom("div"); //container.className = "flex-row"  // see styles.css   

  container.style = "display : flex ; flex-wrap : nowrap ; flex-direction : row ; flex-grow : 1 ";

  for (i = 0; i < num; i++) {
    var d = dom("div");
    d.style = "flex-grow : 1";
    var html = f(i, d);

    if (html) {
      set_inner_html(d, html);
    }

    container.appendChild(d);
  }

  return container;
}
/* 
 * Create a flexbox of divs [m,n] in shape 
 * @param {Function} f - accepts row, column, and HTMLelement. Can either mutate the el or return an new el (which will be appended to div at spot r,c) or return String (which will be set to innerHTML) 
 */


function make_div_array(m, n, id_base, f) {
  var container, i;
  container = dom("div"); //container.className = "flex-column"  // see styles.css  

  container.id = id_base;
  container.style = "width: 100% ; height : 100% ; display : flex ; flex-wrap : nowrap ; flex-direction : column "; // now we will add in the child elements 

  for (i = 0; i < m; i++) {
    //f is a function which takes a row and column and element 
    //build a function that takes just a col with row hard coded 
    //and returns f(r,col)
    var fn = function fn(col, el) {
      return f(i, col, el);
    };

    var new_id_base = id_base + "_" + i + ",";
    var row = flex_row(n, new_id_base, fn);
    container.appendChild(row);
  }

  return container;
}

function id_from_loc(m, n, c) {
  return c * m + n; // intersing that this function needs arg c, which is (static) number of cols 
}

function test_div_array(m, n) {
  var f = function f(r, c, el) {
    return id_from_loc(r, c, n).toString();
  };

  return make_div_array(m, n, "foo", f);
}

function app_clear() {
  var app = document.getElementById("app");

  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

function app_render(el) {
  app_clear();
  var app = document.getElementById("app");
  app.appendChild(el);
}

var colors = ["black", "blue", "red", "green", "yellow", "orange"];

function get_colors(num) {
  return take(colors, num);
}

function now() {
  return new Date().getTime();
} ///   extensions 
// Array.prototype.first = function(arr) { 
//     return arr[0] 
// }
},{"../core_modules/logger.js":"src/core_modules/logger.js"}],"src/core_modules/base_node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* 
[Fri Dec 21 12:12:27 EST 2018]
I would like to make it such that ALL nflow nodes can inherit from this class 
thereby encapsulating all common functionality and providing an avenue for 
simultaneous upgrades 

Would like to support: 
- stream_single 
- each node manages its connections to other nodes 
- various (named) output and input ports for nodes 
   
TERMS=> 
Packet consists of { input_port_name , payload }
Payload is the actual data which is communicated 

Nodes always transmit PACKETS to each other,  which are then destructured into the 
desired port, to which the specific PAYLOAD is delivered. 

A payload handler will match the payload at a specific port with a specific handler (or collection of handlers) , which each routes  processed payload to a specied OUTPUT port according to the routing defined in NODE_PAYLOAD_ROUTER 

Outputs are then processed via the routing in NODE_IO_ROUTER 

The key thing to realize about this architecture is that there are both 
INTRA nodal routings (mapping input to output ports via handlers )  
- these are handled by the NODE_PAYLOAD_ROUTER instance -- 
and 
INTER nodal routings (mapping output ports to input ports of other nodes via forwarding) 
-- these are handled by the NODE_IO_ROUTER ---
BOTH of these routings can have !SEVERAL! handlers associated with a given port 

For example, node_1 could have input ports (i1) and (i2) , and two output port (o1) and (o2). 
The first INTRA nodal handler (PAYLOAD_ROUTER)  may route i1->o1 via HANDLER_1,  i.e. o1( HANDLER_1(i1) ) 
and another handler may route i1->o2 via HANDLER_2,  i.e. o2( HANDLER_2(i1) ) 

Finally, node_1 o2 could be routed to multiple input ports of other nodes. 
You will notice that the base_node class has two instances in the code when a handler_obj 
Is retrieved and then all the attached handlers are called with a payload. 
These two instances correspond to the INTRA and INTER nodal mappings discussed above

--- 

About streaming. 
this.enable_stream will make  a SOURCE node initialize its data soure, but this.streaming will still be false and the source node will IGNORE packets 
this.streaming = true will allow ANY node to actually process its input packet 


*/

/* 
 * Object for retaining information of input and output ports of a node, 
 * as well as information about global node connectivity 
 */
var node_io_router =
/*#__PURE__*/
function () {
  function node_io_router() {
    _classCallCheck(this, node_io_router);

    this.inputs = {};
    this.outputs = {};
    this.base_node = null;
    /* initialize the global node connectivity map (used to inspect connections)  */

    if (!window.nflow.node_connections) {
      window.nflow.node_connections = {};
    }
  }

  _createClass(node_io_router, [{
    key: "new_input",
    value: function new_input(id) {
      this.inputs[id] = {};
    }
  }, {
    key: "new_output",
    value: function new_output(id) {
      this.outputs[id] = {};
    }
  }, {
    key: "ensure_input",
    value: function ensure_input(i) {
      if (!this.inputs[i]) {
        this.new_input(i);
      }
    }
  }, {
    key: "ensure_output",
    value: function ensure_output(o) {
      if (!this.outputs[o]) {
        this.new_output(o);
      }
    }
  }, {
    key: "ensure_input_output",
    value: function ensure_input_output(i, o) {
      this.ensure_input(i);
      this.ensure_output(o);
    }
  }, {
    key: "get_connection_name",
    value: function get_connection_name(_ref) {
      var dict_from = _ref.dict_from,
          dict_to = _ref.dict_to,
          input_port = _ref.input_port,
          output_port = _ref.output_port;
      return dict_from.base_node.id + "." + output_port + "~>" + dict_to.base_node.id + "." + input_port;
    }
    /* 
     * Connect output_port of dict_from with input_port of dict_to 
     *
     */

  }, {
    key: "connect",
    value: function connect(_ref2) {
      var output_port = _ref2.output_port,
          dict_from = _ref2.dict_from,
          input_port = _ref2.input_port,
          dict_to = _ref2.dict_to;

      /*  If the output_port or input_port is missing should ERROR  */
      console.assert(dict_from.outputs[output_port]);
      console.assert(dict_to.inputs[input_port]);
      /* 
       Some info briefly. The purpose of this fn is to route a payload OUT of a node 
       and into the correct port of another node. Once it leaves the dict_from we no 
       longer care what happens (presumably there are handlers set up for it!)  
       
       The output dictionary this.outputs is indexed by the output_port name. 
       
       */

      /* get connection name */

      var connection_name = this.get_connection_name({
        dict_from: dict_from,
        dict_to: dict_to,
        input_port: input_port,
        output_port: output_port
      });

      dict_from.outputs[output_port][connection_name] = function (payload) {
        // this function is the payload handler
        // will create packet and route it to destination node 
        var packet = {
          input_port: input_port,
          payload: payload
        };
        dict_to.base_node.process_packet(packet);
      };
      /* and will also update the global connection struct */


      window.nflow.node_connections[connection_name] = {
        source: [dict_from.base_node.id, output_port],
        sink: [dict_to.base_node.id, input_port]
      };
    }
  }, {
    key: "disconnect",
    value: function disconnect(_ref3) {
      var output_port = _ref3.output_port,
          dict_from = _ref3.dict_from,
          input_port = _ref3.input_port,
          dict_to = _ref3.dict_to;

      /*  If the output_port or input_port is missing should ERROR  */
      console.assert(dict_from.outputs[output_port]);
      console.assert(dict_to.inputs[input_port]);
      /* get connection name */

      var connection_name = this.get_connection_name({
        dict_from: dict_from,
        dict_to: dict_to,
        input_port: input_port,
        output_port: output_port
      });
      dict_from.outputs[output_port][connection_name] = null;
      /* and will also update the global connection struct */

      window.nflow.node_connections[connection_name] = null;
    }
  }, {
    key: "get_global_connections",
    value: function get_global_connections() {
      return window.nflow.node_connections;
    }
  }, {
    key: "set_base_node",
    value: function set_base_node(node) {
      this.base_node = node;
    }
  }]);

  return node_io_router;
}();
/* 
 * Object for managing handlers and mapping between input and output ports 
 */


var node_payload_router =
/*#__PURE__*/
function () {
  function node_payload_router() {
    _classCallCheck(this, node_payload_router);

    this.handler_dict = {};
    this.base_node = null; //reference to the node this belongs to 

    this.io_router = new node_io_router();
  }

  _createClass(node_payload_router, [{
    key: "has_handler",
    value: function has_handler(port_name) {
      return this.handler_dict[port_name];
    }
  }, {
    key: "send_payload_to_output",
    value: function send_payload_to_output(_ref4) {
      var payload = _ref4.payload,
          output_port = _ref4.output_port;

      /* look up the handlers and execute them */
      var handler_obj = this.io_router.outputs[output_port];
      /* each handler obj is a dict with multiple handlers
         indexed via connection_name */

      for (var k in handler_obj) {
        handler_obj[k](payload);
      }
    }
  }, {
    key: "add_input_handler",
    value: function add_input_handler(_ref5) {
      var handler_id = _ref5.handler_id,
          input_port = _ref5.input_port,
          handler = _ref5.handler,
          output_port = _ref5.output_port;
      //create the ports if they do not exist 
      this.io_router.ensure_input_output(input_port, output_port); //create and register the appropriate handler 

      if (!this.has_handler(input_port)) {
        this.base_node.dlog("Handler unregistered"); //handler not yet defined for this port 

        this.handler_dict[input_port] = {};
      } //handlers have been defined  


      this.base_node.dlog("Handler registered...");

      this.handler_dict[input_port][handler_id] = function (_payload) {
        //process the payload with the handler and send to output port 
        var payload = handler(_payload);

        if (payload == nflow.SKIP_PAYLOAD) {
          return;
        } else {
          this.send_payload_to_output({
            payload: payload,
            output_port: output_port
          });
        }
      }.bind(this);
      /* have to bind for this reference */

    }
  }, {
    key: "remove_input_handler",
    value: function remove_input_handler(opts) {
      var input_port = opts.input_port,
          handler_id = opts.handler_id;

      if (this.has_handler(input_port)) {
        this.handler_dict[input_port][handler_id] = null;
      }
    }
  }, {
    key: "set_base_node",
    value: function set_base_node(node) {
      this.base_node = node;
    }
  }]);

  return node_payload_router;
}();
/**
 * Base class for defining nflow nodes 
 *
 */


var base_node =
/*#__PURE__*/
function () {
  function base_node(opts) {
    _classCallCheck(this, base_node);

    opts = opts || {};
    /* instantiate member variables */

    this.opts = opts;
    this.base_node = this;
    this.configured = false;
    this.name = opts.node_name || "base_node";
    /* create global counter for node IDs */

    if (!nflow.node_counter) {
      nflow.node_counter = 0;
    }

    if (!nflow.nodes) {
      nflow.nodes = {};
    }

    this.id = this.name + "_" + nflow.node_counter++;
    nflow.nodes[this.id] = this;
    this.log = (0, _logger.makeLogger)(this.id);
    this.dev_logger = (0, _logger.makeLogger)(this.id + "_dev");
    this.dev_mode = opts.dev_mode || false;

    this.dlog = function (msg) {
      if (this.dev_mode) {
        this.dev_logger(msg);
      }
    };

    this.dclog = function (msg) {
      if (this.dev_mode) {
        console.log(msg);
      }
    };

    this.creation_time = new Date();
    this.data_counter = 0;
    /* stream stuff */

    this.num_to_stream = null; //for gating number of packets from source 

    /* only sources are disbabled by default */

    this.streaming = opts.streaming || !opts.is_source;
    this.stream_enabled = opts.stream_enabled || !opts.is_source;
    /* configure the node type base on opts params  */

    this.is_source = opts.is_source;
    this.is_sink = opts.is_sink;
    this.is_through = opts.is_through || true;
    /* these have significance in terms of base functionalities of the node /* 
    	/* create a payload router object for managing connections  */

    this.payload_router = new node_payload_router();
    /* assign appropriate references */

    this.io_router = this.payload_router.io_router;
    this.payload_router.set_base_node(this);
    this.io_router.set_base_node(this);
    /* define a default handler */

    this.default_handler = function (payload) {
      this.dclog(payload);
      return payload; //must return in order to pass it on ! 
    }.bind(this);
    /* By default each node maps main_input -> main_handler -> main_output */


    var main_opts = {
      handler_id: "main",
      input_port: "main_input",
      output_port: "main_output",
      handler: this.default_handler
      /* configure main route */

    };
    this.payload_router.add_input_handler(main_opts);
  }

  _createClass(base_node, [{
    key: "configure",
    value: function configure(_ref6) {
      var stream_enabler = _ref6.stream_enabler,
          stream_disabler = _ref6.stream_disabler,
          main_handler = _ref6.main_handler;
      this.stream_enabler = stream_enabler;
      this.stream_disabler = stream_disabler;
      this.main_handler = main_handler || this.default_handler;
      /* By default each node maps main_input -> main_handler -> main_output */

      var main_opts = {
        handler_id: "main",
        input_port: "main_input",
        output_port: "main_output",
        handler: this.main_handler.bind(this)
        /* configure main route */

      };
      this.payload_router.add_input_handler(main_opts);
      this.configured = true;
    }
    /* 
     * Helper function for calling handlers 
     * @param {obj} opts - Contains {handler_obj , payload} 
     */

  }, {
    key: "run_handlers",
    value: function run_handlers(_ref7) {
      var handler_obj = _ref7.handler_obj,
          payload = _ref7.payload;

      for (var k in handler_obj) {
        handler_obj[k](payload);
      }
    }
    /** 
     * Generic packet processor 
     * @param {Dict} packet - contains { input_port , payload } 
     */

  }, {
    key: "process_packet",
    value: function process_packet(_ref8) {
      var input_port = _ref8.input_port,
          payload = _ref8.payload;
      console.assert(this.configured, "Node not configured: " + this.id);

      if (this.streaming) {
        this.dlog("Processing data packet...");
        this.dclog({
          input_port: input_port,
          payload: payload
        }); //in general when a packet comes in we 
        //1. find the handlers associated with the input_port requested 

        var handler_obj = this.payload_router.handler_dict[input_port]; //this.dclog(handler_obj)
        //2. make sure it exists -- if not this is likely an error 

        console.assert(handler_obj); //3. run all the handlers with the included payload 

        this.run_handlers({
          handler_obj: handler_obj,
          payload: payload
        });

        if (this.num_to_stream) {
          if (--this.num_to_stream == 0) {
            this.streaming = false;
          }
        }

        this.data_counter += 1;
      } else {
        this.dlog("Not streaming!");
      }
    }
    /* pass on creation of inputs */

  }, {
    key: "new_input",
    value: function new_input(id) {
      this.io_router.new_input(id);
    }
  }, {
    key: "new_output",
    value: function new_output(id) {
      this.io_router.new_output(id);
    }
    /** 
     * Connect node to another node 
     * @param {base_node} sink - Node to connect to 
     * @param {obj} opts - Contains {output_port = "main_output",input_port = "main_input"}
     */

  }, {
    key: "connect",
    value: function connect(sink) {
      var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref9$output_port = _ref9.output_port,
          output_port = _ref9$output_port === void 0 ? "main_output" : _ref9$output_port,
          _ref9$input_port = _ref9.input_port,
          input_port = _ref9$input_port === void 0 ? "main_input" : _ref9$input_port;

      var dict_from = this.io_router;
      var dict_to = sink.io_router;
      this.io_router.connect({
        output_port: output_port,
        dict_from: dict_from,
        input_port: input_port,
        dict_to: dict_to
      });
      /* return the sink node for chaining connections :) */

      return sink;
    }
  }, {
    key: "disconnect",
    value: function disconnect(sink) {
      var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref10$output_port = _ref10.output_port,
          output_port = _ref10$output_port === void 0 ? "main_output" : _ref10$output_port,
          _ref10$input_port = _ref10.input_port,
          input_port = _ref10$input_port === void 0 ? "main_input" : _ref10$input_port;

      var dict_from = this.io_router;
      var dict_to = sink.io_router;
      this.io_router.disconnect({
        output_port: output_port,
        dict_from: dict_from,
        input_port: input_port,
        dict_to: dict_to
      });
      /* return the sink node for chaining connections :) */

      return sink;
    }
    /*  
    Sat Dec 22 12:59:41 EST 2018
    I am unsure if I should use protocols or class functions for implementing 
    the start_stream , stop_stream, stream_single... etc... 
    FROM Stack Overflow --> "class" defines what an object is.
    "protocol" defines a behavior the object has.
    One difference which resonated with me is: Consider you have an object STREAMER 
    which takes 
    a base_node and will call start_stream. As long as you are only dealing with base_nodes 
    this is fine, but if in the future you could have OTHER objects which ALSO implement 
    start_stream, then for extensibility sake it is better to implmenet STREAMER 
    by having it accept ANY object which implements a protocol ? 
    I think this makes a bigger difference if you are using a STATICALLY typed language, 
    since in a dynamically typed language functions can take arbitrary inputs without 
    validating what their TYPE is or which protocols they implement (and call them 
    however they want -- which of course risks run time errors ) 
    Regardless -- JS does not support protocols , so I will have child classes 
    assign functions to instance variables which are called via a "protocol" 
     */

    /* the member variables used below are created at object instantiation */

  }, {
    key: "enable_stream",
    value: function enable_stream() {
      this.stream_enabler(this);
    }
  }, {
    key: "disable_stream",
    value: function disable_stream() {
      this.stream_disabler(this);
    }
    /* start, stop, and num streams */

  }, {
    key: "start_stream",
    value: function start_stream() {
      if (!this.stream_enabled) {
        this.enable_stream();
      }

      this.num_to_stream = null;
      this.streaming = true;
    }
  }, {
    key: "stop_stream",
    value: function stop_stream() {
      this.streaming = false;
    }
  }, {
    key: "stream_num",
    value: function stream_num(n) {
      if (!this.stream_enabled) {
        this.enable_stream();
      }

      this.num_to_stream = n;
      this.streaming = true;
    }
  }, {
    key: "stream_single",
    value: function stream_single() {
      this.stream_num(1);
    }
    /* Dev utilities for maually triggering nodes */

    /* These are not originally intended for realtime node communications */

    /* though may prove useful */

    /* Update : have found them useful so far for triggering source nodes */

  }, {
    key: "trigger_input_packet",
    value: function trigger_input_packet(_ref11) {
      var _ref11$input_port = _ref11.input_port,
          input_port = _ref11$input_port === void 0 ? "main_input" : _ref11$input_port,
          payload = _ref11.payload;
      this.process_packet({
        input_port: input_port,
        payload: payload
      });
    }
  }, {
    key: "trigger_output_packet",
    value: function trigger_output_packet(_ref12) {
      var _ref12$output_port = _ref12.output_port,
          output_port = _ref12$output_port === void 0 ? "main_output" : _ref12$output_port,
          payload = _ref12.payload;
      this.payload_router.send_payload_to_output({
        payload: payload,
        output_port: output_port
      });
    }
  }, {
    key: "trigger_input",
    value: function trigger_input(payload) {
      this.trigger_input_packet({
        payload: payload
      });
    }
  }, {
    key: "trigger_output",
    value: function trigger_output(payload) {
      this.trigger_output_packet({
        payload: payload
      });
    }
  }]);

  return base_node;
}();

exports.default = base_node;
},{"./logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js"}],"src/core_modules/data_storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * 
 * 
 */
var data_storage =
/*#__PURE__*/
function (_base_node) {
  _inherits(data_storage, _base_node);

  /**
   * Manages data persistence and replay/simulation. Uses browser based local storage. 
   * @param {String} name - Session identifier, use null for default time string
   */
  function data_storage(name) {
    var _this;

    _classCallCheck(this, data_storage);

    var node_name = "DS";
    var is_source = true;
    var is_sink = true;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(data_storage).call(this, {
      node_name: node_name,
      is_source: is_source,
      is_sink: is_sink
    }));

    var stream_enabler = function stream_enabler() {
      this.load_session();
    };

    var stream_disabler = function stream_disabler() {
      this.log("No stream disabler implemented");
    };

    var main_handler = function main_handler(payload) {
      this.data_history.push(obj);
    };

    _this.configure({
      stream_enabler: stream_enabler,
      stream_disabler: stream_disabler
    });

    _this.session_id = name || new Date().toISOString();
    _this.data_history = [];
    _this.part_counter = 1;
    _this.save_interval_id = null;
    _this.loaded_session = null;
    _this.playback_speed_multiplier = 1;
    _this.stream_index = 0;
    return _this;
  }
  /**
   *  Persists a chunk of data to localStorage. Uses session name + part_number as identifier
   */


  _createClass(data_storage, [{
    key: "flush_data",
    value: function flush_data() {
      var to_save = JSON.stringify(this.data_history);
      name = this.session_id + "_part" + this.part_counter.toString();
      this.data_history = [];
      localStorage.setItem(name, to_save);
      this.part_counter += 1;
      this.log("Saved data chunk: " + name);
    }
    /**
     * Start saving data to localStorage. Data is saved in chunks called 'parts'. 
     * @param {Number} rate - The rate to flush data to localStorage in SECONDS 
     */

  }, {
    key: "start_saving",
    value: function start_saving(rate) {
      this.save_interval_id = setInterval(function () {
        this.flush_data();
      }.bind(this), rate * 1000);
      this.log("Saving started for session: " + this.session_id);
    }
    /**
     * Stop saving data to localStorage
     */

  }, {
    key: "stop_saving",
    value: function stop_saving() {
      clearInterval(this.save_interval_id);
      this.log("Saving stopped for session: " + this.session_id);
    }
    /** 
     * Loads a data storage session from localStorage. Returns Array. 
     */

  }, {
    key: "load_session",
    value: function load_session() {
      this.log("Loading session...");
      this.loaded_session = get_session(this.session_id); // see definition below 

      this.stream_index = 0;
      this.buffer_size = this.loaded_session.length;
      this.streaming = false;
      this.zero_time_axis();
      this.diffs = util.diff(this.loaded_session.map(function (d) {
        return d["time"];
      }));
      this.log("Session loaded: " + this.session_id);
    }
    /**
     * Sets the session using json object as data input  
     * @param {Array} d - The data array to set
     */

  }, {
    key: "set_session",
    value: function set_session(d) {
      this.log("Setting session...");
      this.loaded_session = d;
      this.stream_index = 0;
      this.buffer_size = this.loaded_session.length;
      this.streaming = false;
      this.zero_time_axis();
      this.diffs = util.diff(this.loaded_session.map(function (d) {
        return d["time"];
      }));
      this.log("Session set: " + this.session_id);
      this.stream_enabled = true;
    }
    /** 
     * Start streaming the session that was previously loaded from localStorage 
     */

  }, {
    key: "start_stream",
    value: function start_stream(speed) {
      if (!this.stream_enabled) {
        this.enable_stream();
      }

      this.stream_index = 0;
      this.streaming = true;
      this.playback_speed_multiplier = speed || 1;
      this.start_stream_loop();
    }
    /** 
     * Stream single packet
     */

  }, {
    key: "stream_single",
    value: function stream_single() {
      if (this.stream_index < this.buffer_size) {
        //get the data
        var val = this.loaded_session[this.stream_index]; //send the data

        this.data_handler(val); //increment the stream index 

        this.stream_index += 1;
        return val;
      } else {
        this.stop_stream();
      }
    }
    /** 
     * Helper function for start_stream() 
     */

  }, {
    key: "start_stream_loop",
    value: function start_stream_loop() {
      //when starting, this.index is 0, this.diffs is defined 
      if (this.streaming) {
        //get the data
        var val = this.loaded_session[this.stream_index]; //send the data

        this.trigger_input(val);

        if (this.stream_index == this.buffer_size - 1) {
          //on the last data point  
          //significant b/c the diff array is finished 
          //so we stop streaming 
          this.stop_stream();
        } else {
          //not on the last data point 
          //now acces the next diff 
          var delay = this.diffs[this.stream_index]; //increment the stream_index 

          this.stream_index += 1; //schedule the loop again 

          var mod = this.playback_speed_multiplier;
          setTimeout(function () {
            this.start_stream_loop();
          }.bind(this), delay * mod);
        }
      }
    }
    /** 
     * Zero the time axis of the data session 
     */

  }, {
    key: "zero_time_axis",
    value: function zero_time_axis() {
      this.log("Zeroing time axis");

      if (!this.loaded_session.length) {
        throw "Session must be loaded!";
      } else {
        //get first time point 
        var t_1 = util.first(this.loaded_session)["time"]; //now we subtract t_1 from all time points 

        this.loaded_session.map(function (d) {
          d["time"] = d["time"] - t_1;
          return d;
        });
        this.log("Done");
      }
    }
    /** 
     * Stop streaming the session that was previously loaded from localStorage 
     */

  }, {
    key: "stop_stream",
    value: function stop_stream() {
      this.streaming = false;
      this.stream_index = 0;
      this.log("Stream finished.");
    }
    /** 
     * Makes csv string from this.loaded_session 
     */

  }, {
    key: "to_csv",
    value: function to_csv(name) {
      this.log("Creating csv file for: " + this.session_id);
      var csvContent = "data:text/csv;charset=utf-8,"; //figure out the keys in the data objects 

      var keys = Object.keys(this.loaded_session[0]).sort(); //write csv header 

      csvContent += keys.join(",") + "\n"; //then loop through the structure 

      for (var i = 0; i < this.loaded_session.length; i++) {
        var data = this.loaded_session[i];

        if (data.dev == "B") {
          var row_content = []; //loop through keys to build the row 

          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            var val = data[key];
            row_content.push(data[key]);
          }

          csvContent += row_content.join(",") + "\n";
        }
      }

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", (name || this.session_id) + ".csv");
      link.click();
    }
    /** 
     * Makes and downloads json string from this.loaded_session 
     */

  }, {
    key: "to_json",
    value: function to_json(name) {
      this.log("Creating json file for: " + this.session_id);
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.loaded_session));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", (name || this.session_id) + ".json");
      downloadAnchorNode.click();
    }
    /** 
     * Loads json data into local storage 
     */

  }, {
    key: "load_json",
    value: function load_json() {
      var i = make_json_input();
      i.click();
      return i;
    }
  }]);

  return data_storage;
}(_base_node2.default); // define some helpers 


exports.default = data_storage;

function get_session_part_names(id) {
  return Object.keys(localStorage).filter(function (s) {
    return s.includes(id);
  }).sort();
}

function get_session(id) {
  var parts_names = get_session_part_names(id); // part names are sorted already 

  var tmp = parts_names.map(function (name) {
    return JSON.parse(localStorage.getItem(name));
  });
  var merged = [].concat.apply([], tmp);
  return merged.map(util.dict_vals_2_num);
}

function file_cb(evt) {
  var f = evt.target.files[0];
  var fname = f.name.replace(".json", "");
  var reader = new FileReader();

  reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
      localStorage.setItem(fname, evt.target.result);
      console.log("[DS]:: Saved item to local storage: " + fname);
    } else {
      console.log("[DS]:: error reading.. ");
      console.log(evt);
    }
  };

  reader.readAsText(f);
}

function make_json_input() {
  var i = document.createElement("input");
  i.type = "file";
  i.addEventListener("change", file_cb);
  return i;
}
},{"../module_resources/utils.js":"src/module_resources/utils.js","./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/web_socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../module_resources/utils.js");

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Manages the websocket connection to an incoming data stream.
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
var web_socket =
/*#__PURE__*/
function (_base_node) {
  _inherits(web_socket, _base_node);

  function web_socket(url) {
    var _this;

    _classCallCheck(this, web_socket);

    var node_name = "WS";
    var is_source = true;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(web_socket).call(this, {
      node_name: node_name,
      is_source: is_source
    }));

    var stream_enabler = function stream_enabler() {
      this.connect();
    };

    var stream_disabler = function stream_disabler() {
      this.send_json({
        type: "control",
        data: "stop"
      });
      this.connection.close();
    };

    _this.configure({
      stream_enabler: stream_enabler,
      stream_disabler: stream_disabler
    });

    _this.url = url;
    _this.connection = null;
    return _this;
  }
  /**
   * Connect to remote websocket server. Upon success, registers the websocket connection
   * as "client" with the server, enables streaming, and this.logs to console. 
   */


  _createClass(web_socket, [{
    key: "connect",
    value: function connect() {
      var conn = new WebSocket(this.url); // Connection opened

      conn.addEventListener('open', function (event) {
        this.log("Connection to " + this.url + " successful. Registering client with server.");
        this.send_json({
          type: "register",
          data: "client"
        });
        this.send_json({
          type: "control",
          data: "start"
        });
      }.bind(this)); //bind is necessary for web_socket class vs WebSocket instance! 
      // Listen for messages

      conn.addEventListener('message', function (event) {
        var payload = _utils.util.dict_vals_2_num(JSON.parse(event.data));

        this.trigger_input(payload); //defaults to main input_port 
      }.bind(this)); //bind is necessary for web_socket class vs WebSocket instance! 

      this.connection = conn;
    }
    /** 
      * Sends JSON data through socket. 
      * @param {Object} obj - Data object to send 
      */

  }, {
    key: "send_json",
    value: function send_json(obj) {
      this.connection.send(JSON.stringify(obj));
    }
  }]);

  return web_socket;
}(_base_node2.default);

exports.default = web_socket;
},{"../module_resources/utils.js":"src/module_resources/utils.js","./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/logger_node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Logs whatever it receives
 *
 */
var logger_node =
/*#__PURE__*/
function (_base_node) {
  _inherits(logger_node, _base_node);

  function logger_node() {
    var _this;

    _classCallCheck(this, logger_node);

    var node_name = "LN";
    var is_sink = true;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(logger_node).call(this, {
      node_name: node_name,
      is_sink: is_sink
    }));

    var main_handler = function main_handler(payload) {
      console.log(payload);
      return payload;
    };

    _this.configure({
      main_handler: main_handler
    });

    return _this;
  }

  return logger_node;
}(_base_node2.default);

exports.default = logger_node;
},{"./base_node.js":"src/core_modules/base_node.js"}],"src/module_resources/global_params.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.params = void 0;
var params = {
  global_x_len: 200
};
exports.params = params;
},{}],"src/core_modules/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui_object_grapher = exports.default = void 0;

var _global_params = require("../module_resources/global_params.js");

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function make_y_series(len) {
  return Array(len).fill(0);
}

function make_x_series(len) {
  return util.range(-len, 0).map(function (x) {
    return x / 100;
  }); // the /100 is hax for now for streaming
}

function create_static_multi_line_graph(container, opts) {
  var xs = opts.xs,
      ys = opts.ys,
      title = opts.title; //will use indeces for x arrays if not provided 

  if (!xs) {
    xs = [];

    for (var i = 0; i < ys.length; i++) {
      xs.push(util.range(0, ys[0].length));
    }
  }

  var source = new Bokeh.ColumnDataSource({
    data: {
      xs: xs,
      ys: ys
    }
  }); // make the plot and add some tools
  //var tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save";
  // WOW ! -- how lucky to find sizing_mode : stretch_both lmao 
  // https://github.com/bokeh/bokeh/issues/4958

  var p = Bokeh.Plotting.figure({
    title: title,
    sizing_mode: 'stretch_both'
  }); //add the multiline 

  var glyph = p.multi_line({
    field: "xs"
  }, {
    field: "ys"
  }, {
    source: source,
    line_color: util.get_colors(xs.length)
  });
  var tooltips = [["x", "$x"], ["y", "$y"]];
  p.add_tools(new Bokeh.HoverTool({
    tooltips: tooltips,
    line_policy: "next"
  }));
  var el = container;

  if (typeof container == 'string') {
    el = document.getElementById(container);
  }

  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  Bokeh.Plotting.show(p, el);
  return {
    plot: p,
    glyph: glyph,
    source: source
  };
}

function create_multi_line_graph(opts) {
  var x_len = opts.x_len,
      series_array = opts.series_array,
      title = opts.title;
  var series_len = series_array.length; //make xs and ys vector 

  var xs = [];
  var ys = [];

  for (var i = 0; i < series_len; i++) {
    xs.push(make_x_series(x_len));
    ys.push(make_y_series(x_len));
  } //make data source 


  var source = new Bokeh.ColumnDataSource({
    data: {
      xs: xs,
      ys: ys
    }
  }); // make the plot and add some tools
  //var tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save";
  // WOW ! -- how lucky to find sizing_mode : stretch_both lmao 
  // https://github.com/bokeh/bokeh/issues/4958

  var p = Bokeh.Plotting.figure({
    title: title,
    sizing_mode: 'stretch_both'
  }); //add the multiline 

  var glyph = p.multi_line({
    field: "xs"
  }, {
    field: "ys"
  }, {
    source: source,
    line_color: util.get_colors(series_len)
  });
  var tooltips = [["x", "$x"], ["y", "$y"]];
  p.add_tools(new Bokeh.HoverTool({
    tooltips: tooltips,
    line_policy: "next"
  })); //NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > 
  //Need to call Bokeh.Plotting.show(p , HTMLelement) 

  return {
    plot: p,
    glyph: glyph,
    source: source
  };
} // Figured out this function by looking at bokeh source code 


var bokeh_multi_stream = function bokeh_multi_stream(ds, x, ys) {
  var data = ds.data;
  var xss = data.xs;
  var yss = data.ys; // make modifications 

  for (var i = 0; i < yss.length; i++) {
    //NOTE* if one of the y values is false (or undefined) , then the assumption is that 
    //the series at that index should NOT BE updated 
    //Sensors in rosegait return false when they wish NOT to be updated 
    if (ys[i]) {
      // -  
      xss[i].push(x);
      xss[i].shift(); // -  

      yss[i].push(ys[i]);
      yss[i].shift();
    }
  } // re assign the data 


  data.xs = xss;
  data.ys = yss;
  ds.setv('data', data, {
    silent: true
  });
  return ds.trigger('stream');
}; // < -- START CLASS DEFINITIONS -- START CLASS DEFINITIONS -- START CLASS DEFINITIONS -- > 

/* 
 * A bokeh real time, multi line graph 
 *  
 */


var Graph =
/*#__PURE__*/
function () {
  function Graph(opts) {
    _classCallCheck(this, Graph);

    var series_vector = opts.series_vector,
        title = opts.title;
    this.parent = null;
    this.opts = opts;
    this.series_vector = series_vector;
    var x_len = opts.x_len || _global_params.params.global_x_len;
    console.log("Graph with Len : " + x_len);
    var multi_opts = {
      x_len: x_len,
      title: title,
      series_array: series_vector
    };

    var _create_multi_line_gr = create_multi_line_graph(multi_opts),
        plot = _create_multi_line_gr.plot,
        glyph = _create_multi_line_gr.glyph,
        source = _create_multi_line_gr.source;

    var color = "#e5efff"; // "white" //"#003559" //"#B9D6F2"

    var alpha = 0.2;
    plot.background_fill_color = color;
    plot.background_fill_alpha = alpha;
    plot.border_fill_color = color;
    plot.border_fill_alpha = alpha;
    this.multi_line_graph = plot;
    this.source = source;
    this.glyph = glyph;
  }

  _createClass(Graph, [{
    key: "get_data_source",
    value: function get_data_source() {
      return this.source;
    }
  }, {
    key: "render_into_element",
    value: function render_into_element(el) {
      //el.innerHTML = 'waiting'
      //this.parent = el 
      Bokeh.Plotting.show(this.multi_line_graph, el);
    }
  }]);

  return Graph;
}();

var ui =
/*#__PURE__*/
function () {
  /* 
   * 
   * @param {HTMLElement} parent - The DOM to render the UI into 
   */
  function ui(parent) {
    _classCallCheck(this, ui);

    this.graphs = {};
    this.parent = parent;
    this.last_series_buffer = {}; // holds the previous update sent to graph 
  }
  /* 
   * Add graph to the ui 
   * @param {Object} opts - Dict containing fields: id - graph id , series_vector - vector of Ids for series which will be graphed on this graph 
   */


  _createClass(ui, [{
    key: "add_graph",
    value: function add_graph(opts) {
      var id = opts.id,
          series_vector = opts.series_vector,
          x_len = opts.x_len; //console.log(series_vector)

      var graph = new Graph({
        series_vector: series_vector,
        x_len: x_len,
        title: id + ": " + series_vector.join(", ")
      });
      this.graphs[id] = graph;
    }
    /* 
     *
     * After all graphs have been added, init is called to actually display the graphs 
     *
     */

  }, {
    key: "init",
    value: function init(container) {
      // logic for displaying all of the added graphs 
      // should make a panel view of sorts and initialize with empty values 
      var graph_array = util.dict_2_vec(this.graphs);
      this.graph_array = graph_array; // for now will put two graphs side by side 

      var n_cols = 2;
      var n_rows = Math.ceil(Object.keys(this.graphs).length / 2); // some hax  

      if (graph_array.length == 1) {
        n_cols = n_rows = 1;
      }

      util.bug("n_row", n_rows); // make a grid of divs 

      var app_el = util.make_div_array(n_rows, n_cols, "rgui", function (r, c, el) {
        //get the graph index
        var index = util.id_from_loc(r, c, n_cols); // debug - console.log( [index, graph_array] )

        if (index < graph_array.length) {
          //get the graph info using destructuring 
          var _graph_array$index = _slicedToArray(graph_array[index], 2),
              id = _graph_array$index[0],
              graph = _graph_array$index[1];

          graph.render_into_element(el);
        } else {
          return "";
        }
      }); //here we will resolve the container 

      if (typeof container == 'string') {
        container = document.getElementById(container);
      } // if not for now assume it is the element 
      //render the 


      app_render(container, app_el);
    }
    /* 
     * Streams data to a particular graph defined by graph_id. 
     * @param {Number} x - The x coordinate for new data 
     * @param {Vector} ys - New y points to add. These should correspond to and be in the same order as the series_vector assoiated with the same graph id
     */

  }, {
    key: "stream_to_graph",
    value: function stream_to_graph(id, x, ys) {
      bokeh_multi_stream(this.graphs[id].get_data_source(), x, ys);
    }
    /* 
     * Main data handler. 
     * @param {Object} series_buffer - Dictionary with all the series values for updating
     */

  }, {
    key: "handle_sensor_buffer",
    value: function handle_sensor_buffer(x, series_buffer) {
      //1) loop through the available graphs
      for (var graph in this.graphs) {
        var series, ys, i, val; //2) get the series_vector for that graph 

        series = this.graphs[graph].series_vector; //3) look up the values for each series in the sensor_gui_buffer

        ys = Array(series.length).fill(0);

        for (i = 0; i < series.length; i++) {
          //get the value of the series 
          val = series_buffer[series[i]]; //if it is false we pass it anyways (graph will handle it) 

          ys[i] = val;
        } //update the graph 


        bokeh_multi_stream(this.graphs[graph].get_data_source(), x, ys);
      }
    }
  }], [{
    key: "multi_line_graph",
    value: function multi_line_graph(container, opts) {
      create_static_multi_line_graph(container, opts);
    }
  }]);

  return ui;
}();

exports.default = ui;
var app_el = null;

var app_clear = function app_clear() {
  while (app_el.firstChild) {
    app_el.removeChild(app_el.firstChild);
  }
};

var app_render = function app_render(container, el) {
  if (app_el) {
    app_clear();
  } else {
    container.appendChild(el);
    app_el = container;
  }
}; // FOR ARBITRARY GRAPHING -----------------------------------------------                                                   


function dict_to_update(dict) {
  return dict;
}

function get_array_series(o) {
  //console.log(o)
  return util.range(0, o.length).map(function (v) {
    return "index_" + v;
  });
}

function get_dict_series(d) {
  var ret;
  var list = Object.keys(d); //return list   -- allows toggling the removal of time key from object

  var ind = list.indexOf('time');

  if (ind >= 0) {
    list.splice(ind, 1);
    ret = list;
  } else {
    ret = list;
  }

  return ret;
}

function array_to_update(arr) {
  var ser = get_array_series(arr);
  return util.zip_map(ser, arr);
}

function make_graph_for_obj(opts) {
  var o = opts.o,
      container = opts.container,
      x_len = opts.x_len,
      exclude = opts.exclude; //delete the fields which we want to exclude from the graph 
  //note this only occurs on the first object processed 

  if (exclude) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = exclude[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;
        delete o[i];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var graph_ui = new ui();
  var series = null; //console.log(o)

  if (_typeof(o) == "object") {
    if (Array.isArray(o)) {
      // its an array
      console.log("Making array grapher");
      series = get_array_series(o);
      graph_ui.convert = array_to_update;
    } else {
      // assume its a dict
      console.log("Making dict grapher");
      series = get_dict_series(o);
      graph_ui.convert = dict_to_update;
    }
  }

  graph_ui.add_graph({
    id: "main",
    series_vector: series,
    x_len: x_len || 500
  });
  graph_ui.init(container);
  graph_ui.init_time = util.now();
  return graph_ui;
}

function graph_object(x, o, graph_ui) {
  var updates = graph_ui.convert(o); //console.log(updates)
  //apply the updates to the graph 

  graph_ui.handle_sensor_buffer((x - graph_ui.init_time) / 1000, updates); // should work???
}

function get_object_grapher(opts) {
  var container = opts.container,
      x_len = opts.x_len,
      exclude = opts.exclude;
  var grapher = {};
  grapher.init = true;
  grapher.graph_ui = null;

  grapher.process_data = function (o) {
    if (grapher.init) {
      grapher.graph_ui = make_graph_for_obj({
        o: o,
        container: container,
        x_len: x_len,
        exclude: exclude
      });
      grapher.init = false;
    } else {
      var t = util.now(); //console.log(o)

      graph_object(t, o, grapher.graph_ui);
    }
  };

  return grapher;
}

var ui_object_grapher =
/*#__PURE__*/
function (_base_node) {
  _inherits(ui_object_grapher, _base_node);

  function ui_object_grapher(opts) {
    var _this;

    _classCallCheck(this, ui_object_grapher);

    var node_name = "UIG";
    var is_sink = true;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ui_object_grapher).call(this, {
      node_name: node_name,
      is_sink: is_sink
    }));

    var main_handler = function main_handler(payload) {
      if (true) {
        this.object_grapher.process_data(payload);
      }
    };

    _this.configure({
      main_handler: main_handler
    });

    _this.object_grapher = get_object_grapher(opts);
    return _this;
  }

  return ui_object_grapher;
}(_base_node2.default);

exports.ui_object_grapher = ui_object_grapher;
},{"../module_resources/global_params.js":"src/module_resources/global_params.js","../module_resources/utils.js":"src/module_resources/utils.js","./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/transformer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Applies a transformation function to a data stream 
 *
 * @param {Function} f - The function to use as transform 
 */
var transformer =
/*#__PURE__*/
function (_base_node) {
  _inherits(transformer, _base_node);

  function transformer(f) {
    var _this;

    _classCallCheck(this, transformer);

    var node_name = "TF";
    _this = _possibleConstructorReturn(this, _getPrototypeOf(transformer).call(this, {
      node_name: node_name
    }));

    var main_handler = function main_handler(payload) {
      return this.f(payload);
    };

    _this.configure({
      main_handler: main_handler
    });

    _this.f = f;
    return _this;
  }
  /** 
   * Set the transformer function 
   * @param {Function} func - Function which accepts ONE raw data object and transforms it.
   */


  _createClass(transformer, [{
    key: "set_transformer",
    value: function set_transformer(func) {
      this.f = func;
    }
  }]);

  return transformer;
}(_base_node2.default);

exports.default = transformer;
},{"./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/simulator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Simulator node for testing data streams
 *
 */
var simulator =
/*#__PURE__*/
function (_base_node) {
  _inherits(simulator, _base_node);

  function simulator(opts) {
    var _this;

    _classCallCheck(this, simulator);

    var node_name = "SIM";
    var is_source = true;
    var dev_mode = false;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(simulator).call(this, {
      node_name: node_name,
      is_source: is_source,
      dev_mode: dev_mode
    }));

    var main_handler = function main_handler(payload) {
      return payload; //just forwards the data it generates 
    };

    _this.configure({
      main_handler: main_handler
    });

    _this.opts = opts;
    _this.mode = opts.mode;
    _this.stream_interval = null;
    return _this;
  }
  /**
   * enable streaming simulated data 
   * 
   */


  _createClass(simulator, [{
    key: "enable_stream",
    value: function enable_stream(r) {
      var rate = r || 500;
      this.stream_interval = setInterval(this.send_val.bind(this), rate);
    }
  }, {
    key: "start_stream",
    value: function start_stream(r) {
      this.streaming = true;
      this.enable_stream(r);
    }
    /** 
     * Stop streaming data 
     */

  }, {
    key: "disable_stream",
    value: function disable_stream() {
      clearInterval(this.stream_interval);
    }
  }, {
    key: "send_val",
    value: function send_val() {
      var val;

      switch (this.opts.mode) {
        case 'sin':
          val = {
            val: Math.sin(new Date().getTime() * (this.opts.rate || 0.001))
          };
          break;

        case 'rand':
          val = {
            val: (this.opts.multiplier || 1) * Math.random() + (this.opts.offset || 0)
          };
          break;

        case 'burst':
          var burst = !(new Date().getSeconds() % 5);

          if (burst) {
            //val = {x :  0.1*Math.random() + 10} 
            //console.log("burst")
            val = {
              x: Math.random() + 5,
              y: Math.random() + 20
            };
          } else {
            //val = {x :  0.1*Math.random() + 0.5 }
            val = {
              x: Math.random() + 5,
              y: Math.random() + 10
            };
          }

          break;
      }

      this.trigger_input(val); // send the val ! 
    }
  }]);

  return simulator;
}(_base_node2.default);

exports.default = simulator;
},{"./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/state_machine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ui = _interopRequireDefault(require("./ui.js"));

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * 
 * 
 */
var state_machine =
/*#__PURE__*/
function (_base_node) {
  _inherits(state_machine, _base_node);

  /**
   * 
   * 
   */
  function state_machine(opts) {
    var _this;

    _classCallCheck(this, state_machine);

    var buffer_size = opts.buffer_size,
        gui_mode = opts.gui_mode,
        debug_mode = opts.debug_mode,
        init = opts.init;
    var node_name = "SM";
    _this = _possibleConstructorReturn(this, _getPrototypeOf(state_machine).call(this, {
      node_name: node_name
    }));

    var main_handler = function main_handler(payload) {
      this.process_data(payload);
    };

    _this.configure({
      main_handler: main_handler
    });

    _this.buffer_size = buffer_size || 200;
    _this.sensor_buffer_size = buffer_size;
    _this.buffer = Array(buffer_size).fill(default_data_obj);
    _this.sensors = {};
    _this.transitioners = {};
    _this.transitioner_groups = {};

    if (init == undefined) {
      _this.STATE = {};
    } else {
      _this.STATE = init;
    }

    _this.gui_mode = gui_mode;
    _this.debug_mode = debug_mode || false;

    if (gui_mode) {
      //create the sensor_gui buffer 
      _this.sensors_gui_buffer = {};
      _this.ui_mapping = null; //also create a ui object  

      _this.ui = new _ui.default(null);
    }

    return _this;
  }
  /** 
   * Initializes the state machine
   * @param {Object} state - the initial state for the state machine 
   */


  _createClass(state_machine, [{
    key: "initialize",
    value: function initialize(state) {
      this.STATE = state;
    }
    /** 
     * Updates buffer with a data object. Uses js function `.shift()` to cycle array. 
     * @param {Object} obj - Data object to consume 
     */

  }, {
    key: "update_buffer_with_data_object",
    value: function update_buffer_with_data_object(obj) {
      this.buffer.push(obj);
      this.buffer.shift();
    }
    /*
     * Computes the order that sensors will be evaluated in 
     */

  }, {
    key: "set_sensor_order",
    value: function set_sensor_order() {
      var compare = function compare(x, y) {
        var l1 = x[1].level;
        var l2 = y[1].level; //console.log( [l1, l2] ) 

        if (l1 > l2) {
          //index 2 is the level ! 
          return 1;
        } else {
          return -1;
        }
      };

      this.sensor_order = util.dict_2_vec(this.sensors).sort(compare).map(function (e) {
        return e[0];
      });
    }
    /** 
     * Adds a sensor to the state machine. 
     * @param {Object} opts - contains id, f (function) , level (level 0 is evaluated first , then 1, etc.. ) 
     */

  }, {
    key: "add_sensor",
    value: function add_sensor(opts) {
      var id, f, l;
      id = opts.id;
      f = opts.f;
      l = opts.level; //register the sensor 

      this.sensors[id] = {}; //add the function 

      this.sensors[id]["function"] = f; //and then allocate a buffer for the sensor values 

      this.sensors[id]["buffer"] = Array(this.sensor_buffer_size).fill(NaN); //and then allocate the sensor level, 0 if undefined 

      this.sensors[id]["level"] = l || 0; //and create the 'last_skipped' flag (see run sensor for more information) 

      this.sensors[id]["last_skipped"] = false;

      if (this.debug_mode) {
        this.log("Added sensor: " + id);
      }

      this.set_sensor_order();
    }
    /** 
     * 
     * Init gui 
     * @param {String|DOM} container - id or reference for container to render into 
     * @param {Object} ui_mapping - Dictionary where keys are graph ids and vals are vectors of the sensors which could be graphed on that graph. E.g { graph-1 : ["acc_x", "acc_z" ] , etc} 
     */

  }, {
    key: "init_gui",
    value: function init_gui(container, ui_mapping) {
      this.ui_mapping = ui_mapping; //loop through the graphs 

      for (var graph in this.ui_mapping) {
        var sensors = this.ui_mapping[graph];
        var opts = {
          id: graph,
          series_vector: sensors /// POTENTIAL BUG ON NEXT RUN  !? UNLESS FIX IS GOLDEN FIX

        };
        this.ui.add_graph(opts); // initializes a graph 
      } //after all the graphs have been added then we call init 


      this.ui.init(container);
    }
    /** 
     * Runs the sensor function with the state machine buffer as input 
     * then updates the corresponding sensor's buffer.
     * @param {String} id - Sensor id to run   
     */

  }, {
    key: "run_sensor",
    value: function run_sensor(id) {
      //get the sensor function
      var f = this.sensors[id]["function"]; //run the sensor passing in the sm object

      var val = f(this);
      /*
        sensors 
        only append the value if it exists 
        this allows the ability for sensors to act simultaneously as data filters 
        by introspecting on the data_packet somehow and deciding to reject it from 
        their buffer. 
       
      */

      if (val != 0 || val != undefined || val != false || val != nflow.SKIP_PAYLOAD) {
        //append the new value to the sensors buffer 
        this.sensors[id]["buffer"].push(val);
        this.sensors[id]["buffer"].shift();
        this.sensors[id]["last_skipped"] = false;
      } else {
        //the sensor rejected a value. In this case, it can be helpful to set a special 
        //flag in case there are sensors which derive from this one and also wish to 
        //reject 
        this.sensors[id]["last_skipped"] = true;
      }

      return val;
    }
    /** 
     * Utility function for retrieving the last N values of a sensor's buffer
     * Used to make it easier to write Detectors 
     * @param {String} id - Sensor id 
     * @param {Number} num - The number of values to retrieve from END of buffer 
     */

  }, {
    key: "get_sensor_last_N",
    value: function get_sensor_last_N(id, num) {
      if (this.sensors[id]["last_skipped"]) {
        //we have skipped a value, so will pass that info on 
        return false;
      } else {
        return this.sensors[id]["buffer"].slice(this.buffer_size - num);
      }
    }
    /** 
     * Utility function for retrieving the last value of a sensor's buffer
     * Used to make it easier to write Detectors 
     * @param {String} id - Sensor id 
     */

  }, {
    key: "get_sensor_last_1",
    value: function get_sensor_last_1(id) {
      if (this.sensors[id]["last_skipped"]) {
        //we have skipped a value, so will pass that info on 
        return false;
      } else {
        return util.first(this.get_sensor_last_N(id, 1));
      }
    }
    /** 
     * Adds a transitioner to the state machine. 
     * @param {String} id - Transitioner id for reference 
     * @param {Object} transitioner - Transitioner implementation (Object with keys [detector, applicator]) The detector and applicator both  accept the state_machine object in its entirety in order to allow easy access to all fields. 
     */

  }, {
    key: "add_transitioner",
    value: function add_transitioner(id, transitioner) {
      //make sure it has what we want 
      if (!(transitioner.detector && transitioner.applicator)) {
        throw "Transitioner object does not contain both detector and applicator!";
      } //register the transitioner


      this.transitioners[id] = transitioner; //if it is part of a group we register that too , and by default activate it 

      if (transitioner.group) {
        this.transitioner_groups[transitioner.group] = true;
      }

      if (this.debug_mode) {
        this.log("Added transitioner: " + id);
      }
    }
    /** 
     * Runs the transitioner 
     * @param {String} id - Transitioner to run 
     */

  }, {
    key: "run_transitioner",
    value: function run_transitioner(id) {
      //get the transitioner  
      var transitioner = this.transitioners[id]; //get the group and group status

      var group = transitioner.group;
      var group_status = this.transitioner_groups[group]; //only run if group is NULL or if it exists and is TRUE 

      if (group_status != false) {
        //get the detector and applicator 
        var detector = transitioner.detector;
        var applicator = transitioner.applicator; //the detector and applicator both  accept the state_machine object in its entirety in order to allow easy access to all fields 
        //apply the applicator IF the detector returns true  

        if (detector(this)) {
          if (this.debug_mode) {
            this.log(":match: => " + id);
          }

          applicator(this); // the applciator will actually mutate the this.STATE object  
          // deactivate this group if it is part of one

          if (group_status) {
            this.transitioner_groups[group] = false;
          }
        } else {
          if (this.debug_mode) {
            this.log(":fail: => " + id);
          }
        }
      }
    }
    /** 
     * Run all sensors. Will sort them by the sensor level 
     */

  }, {
    key: "run_sensors",
    value: function run_sensors() {
      for (var i = 0; i < this.sensor_order.length; i++) {
        var sensor_id = this.sensor_order[i];
        var val = this.run_sensor(sensor_id);

        if (this.debug_mode) {
          this.log("Ran sensor: " + sensor_id + " with result: ");
          this.log(val);
        }

        if (this.gui_mode) {
          this.sensors_gui_buffer[sensor_id] = val;
        }
      }
    }
    /** 
     * Processes a data object, running one cycle of the state machine. 
     * @param {Object} obj - Data object to process 
     */

  }, {
    key: "process_data",
    value: function process_data(obj) {
      //1. update the data buffer  
      this.update_buffer_with_data_object(obj); //2. now we need to update all of the sensors 

      this.run_sensors(); //3. now we run all the transitioners (which rely on most up to date Sensor values) 

      for (var transitioner_id in this.transitioners) {
        this.run_transitioner(transitioner_id);
      } //at this point, this.STATE should be updated , one cycle of the state machine has been completed 
      //in order to reset, we should return the state of all transition groups 


      for (var group in this.transitioner_groups) {
        this.transitioner_groups[group] = true;
      } // after all this is done we will update the ui 
      //the sensors_gui_buffer is now full and updated and can be passed to the ui for processing 
      //pass all the sensor data to the UI for updating 


      if (this.gui_mode) {
        // also we need to give an X coordinate for the data  
        // for now we will pass the 'time' value of the data obj 
        this.ui.handle_sensor_buffer(obj.time, this.sensors_gui_buffer);
      }
    }
    /** 
     * For debug purposes and profiling. Processes one cycle with a defualt data object
     */

  }, {
    key: "run_debug_cycle",
    value: function run_debug_cycle() {
      this.process_data(random_data_obj());
    }
  }]);

  return state_machine;
}(_base_node2.default);

exports.default = state_machine;
var default_data_obj = {
  'acc_x': 0,
  'acc_y': 0,
  'acc_z': 0,
  'gyr_x': 0,
  'gyr_y': 0,
  'gyr_z': 0,
  'sample': 0,
  'time': 0,
  'dev': "B" //for generating random data packets 

};
var m = Math.random;
var count = 0;

function random_data_obj() {
  return {
    'acc_x': m(),
    'acc_y': m(),
    'acc_z': m(),
    'gyr_x': m(),
    'gyr_y': m(),
    'gyr_z': m(),
    'sample': count++,
    'dev': "B"
  };
}
},{"./ui.js":"src/core_modules/ui.js","../module_resources/utils.js":"src/module_resources/utils.js","./base_node.js":"src/core_modules/base_node.js"}],"src/core_modules/event_detector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var _base_node2 = _interopRequireDefault(require("./base_node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 The event detector accepts a (possibly nested) dictionary as input. It converts the dictionary 
 into a linear array of values representing that data structure (see linearize) 
 As a new dictionary comes in, 
 it calculates the same linear array and takes a log difference @ each index rom the previous. 
 
 If at least 1 of the indeces shows a log diff out of bounds of the thresholds, we can say 
 a "change" has occurred. 
 
 The event detector commences in the state "awaiting_baseline" 
 Baseline is established when no "change" has been detected for "baseline_counter" number of times 
 At this point, when a "change" is detected an EVENT is said to begin, and starts being recorded. 
 Because of the logic, as long as "changes" keep occuring then the event keeps recording. 
 Once no changes have occured for "baseline_counter" num packets, then baseline is again 
 established  and the ED "flushes" the event to internal memory and outputs it to the events
 output port
 
 In addition Each packet received is forwarded to the main_ouput, making this a "through node"
 */

/**
 * Detects and emits deviation "events" from streams of arbitraty data objects
 *
 * @param {Object} opts - configuration options
 */
var event_detector =
/*#__PURE__*/
function (_base_node) {
  _inherits(event_detector, _base_node);

  function event_detector(opts) {
    var _this;

    _classCallCheck(this, event_detector);

    var node_name = "ED";
    _this = _possibleConstructorReturn(this, _getPrototypeOf(event_detector).call(this, {
      node_name: node_name
    }));

    var main_handler = function main_handler(payload) {
      this.process_data(payload);
      return payload;
    };

    _this.configure({
      main_handler: main_handler
    }); //create events output 


    _this.new_output("events");

    var opts = opts || {};
    _this.opts = opts;
    _this.state = "awaiting_baseline"; //  established_baseline | processing_event
    //init counters for estabishing baseline 
    //baseline will be established when thresholds are respected for "baseline_counter" number
    //of events 

    _this.baseline_counter = 0;
    _this.baseline_number = opts.baseline_number || 60; //keep log of events that have been detected 

    _this.current_event = [];
    _this.events = {}; //set detection threshold 

    _this.detection_params = {
      upper: null,
      lower: null //detection_thresh expressed as percent difference 

    };

    _this.init_detection_params(opts.detection_thresh || 30); // save the last linearized packet for calculation 


    _this.last_linearized = null; // initialize history buffer 

    _this.history_buffer_size = opts.history_buffer_size || 50;

    _this.init_history_buffer();

    return _this;
  }

  _createClass(event_detector, [{
    key: "init_detection_params",
    value: function init_detection_params(t) {
      this.detection_params.upper = Math.log((t + 100) / 100);
      this.detection_params.lower = Math.log((100 - t) / 100);
    }
  }, {
    key: "in_range",
    value: function in_range(val) {
      return val >= this.detection_params.lower && val <= this.detection_params.upper;
    }
  }, {
    key: "detect",
    value: function detect(arr) {
      return !util.apply(util.and, arr.map(this.in_range, this));
    }
    /** 
     * Statefully checks if detector is at baseline 
     * @param {Boolean} detected - result of this.detect() 
     */

  }, {
    key: "check_baseline",
    value: function check_baseline(detected) {
      if (detected) {
        //detected an event, reset the counter
        this.baseline_counter = 0;
        return false;
      } else {
        //no event detected... increment baseline counter 
        this.baseline_counter += 1;

        if (this.baseline_counter > this.baseline_number) {
          // reset baseline counter  (for later) 
          this.baseline_counter = 0;
          return true;
        }

        return false;
      }
    }
    /** 
     * Process a received data object
     * @param {obj} Data object to receive 
     */

  }, {
    key: "process_data",
    value: function process_data(obj) {
      //transform the object into linearized struct 
      var lp = linearize(reduce(obj)); //on the first call we will set last_linearized 
      //and return 

      if (!this.last_linearized) {
        this.last_linearized = lp;
        return;
      } //on all subsequent calls we will get here.. 


      var result, bl; //run the detection 

      var log_diff = util.array_log_diff(this.last_linearized, lp);
      var detected = this.detect(log_diff);

      switch (this.state) {
        case "awaiting_baseline":
          bl = this.check_baseline(detected);

          if (bl) {
            this.log("Baseline established");
            this.state = "baseline_established";
          } // should we add to history here? 


          break;

        case "baseline_established":
          // here we are waiting for the detection of an event 
          this.add_to_history(obj); //add current obj to history

          if (detected) {
            //detected an event 
            this.log("Detected event...");
            this.state = "processing_event";
            this.init_event(); //copies contents of history buff into current event
          } else {} //do nothing


          break;

        case "processing_event":
          //add the obj to current event 
          this.current_event.push(obj); //check if we have reached baseline yet 

          bl = this.check_baseline(detected);

          if (bl) {
            this.log("Event ended");
            this.state = "baseline_established";
            this.flush_event();
          } else {} //do nothing


          break;

        default:
          break;
      } // END switch --- 


      return log_diff; //this is the array of log diffs for each of the linearized indexes 
    }
    /** 
     * Initiate event 
     * 
     */

  }, {
    key: "init_event",
    value: function init_event() {
      //copy contents of history buffer into current event 
      this.current_event = [];

      for (var i = 0; i < this.history_buffer.length; i++) {
        this.current_event.push(this.history_buffer[i]);
      }

      return null;
    }
    /** 
     * Flush current event to the event buffer 
     * 
     */

  }, {
    key: "flush_event",
    value: function flush_event() {
      this.events[new Date().getTime()] = this.current_event; // flush output to specific output pipe 
      // v2 

      this.log("Flushed event");
      /* will send to events output port */

      var payload = this.current_event;
      var output_port = "events";
      this.trigger_output_packet({
        output_port: output_port,
        payload: payload
      });
      this.current_event = [];
    }
  }, {
    key: "add_to_history",
    value: function add_to_history(obj) {
      util.cycle_array(this.history_buffer, obj);
    }
    /**
     * init history buffer 
     * 
     */

  }, {
    key: "init_history_buffer",
    value: function init_history_buffer() {
      this.history_buffer = Array(this.history_buffer_size).fill(0);
    }
  }]);

  return event_detector;
}(_base_node2.default); // if array of numbers, return the power of array
// if its a dictionary, then return the reduced version of all its keys
// if its a number, return the number
// for now i wont compare strings


exports.default = event_detector;
var power = util.rms;

function map_f_on_dict(d, f) {
  for (var k in d) {
    d[k] = f(d[k]);
  }

  return d;
}

function reduce_val(v) {
  if (_typeof(v) == "object") {
    if (Array.isArray(v)) {
      // its an array
      return power(v);
    } else {
      // assume its a dict
      return map_f_on_dict(v, reduce_val);
    }
  } else {
    // assume its a number
    return v;
  }
}

var reduce = reduce_val;

function reduce_dict(obj) {
  return map_f_on_dict(obj, reduce_val);
}

var test_dict = {
  acc: [1, 2, 3, 4, 5],
  gyr: {
    foo: 2,
    bar: [1, 2, 3, 4, 5]
  },
  happy: 1
  /* 
   * loop through keys
   * if num, push num to ret 
   * if dict, push the recursive result
   */

};

function linearize_dict(obj) {
  var result = [];

  for (var k in obj) {
    if (_typeof(obj[k]) == "object") {
      result.push(linearize_dict(obj[k]));
    } else {
      result.push(obj[k]);
    }
  }

  var flattened = [].concat.apply([], result);
  return flattened;
}

function linearize(obj) {
  return linearize_dict(obj);
}
},{"../module_resources/utils.js":"src/module_resources/utils.js","./base_node.js":"src/core_modules/base_node.js"}],"src/module_bundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mods = void 0;

var _base_node = _interopRequireDefault(require("./core_modules/base_node.js"));

var _data_storage = _interopRequireDefault(require("./core_modules/data_storage.js"));

var _web_socket = _interopRequireDefault(require("./core_modules/web_socket.js"));

var _logger_node = _interopRequireDefault(require("./core_modules/logger_node.js"));

var _ui = _interopRequireWildcard(require("./core_modules/ui.js"));

var _transformer = _interopRequireDefault(require("./core_modules/transformer.js"));

var _simulator = _interopRequireDefault(require("./core_modules/simulator.js"));

var _state_machine = _interopRequireDefault(require("./core_modules/state_machine.js"));

var _event_detector = _interopRequireDefault(require("./core_modules/event_detector.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bundles all the modules into one object 
// Mon Oct 22 22:16:23 PDT 2018
var mods = {
  web_socket: _web_socket.default,
  data_storage: _data_storage.default,
  state_machine: _state_machine.default,
  ui: _ui.default,
  transformer: _transformer.default,
  simulator: _simulator.default,
  logger_node: _logger_node.default,
  event_detector: _event_detector.default,
  base_node: _base_node.default,
  ui_object_grapher: _ui.ui_object_grapher
};
exports.mods = mods;
},{"./core_modules/base_node.js":"src/core_modules/base_node.js","./core_modules/data_storage.js":"src/core_modules/data_storage.js","./core_modules/web_socket.js":"src/core_modules/web_socket.js","./core_modules/logger_node.js":"src/core_modules/logger_node.js","./core_modules/ui.js":"src/core_modules/ui.js","./core_modules/transformer.js":"src/core_modules/transformer.js","./core_modules/simulator.js":"src/core_modules/simulator.js","./core_modules/state_machine.js":"src/core_modules/state_machine.js","./core_modules/event_detector.js":"src/core_modules/event_detector.js"}],"src/module_resources/sm_utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smu = void 0;

var _utils = require("./utils.js");

var smu = {
  sensors: {},
  transformers: {}
};
exports.smu = smu;

smu.sensors.field = function (field) {
  return function (sm) {
    var d = sm.buffer;
    return _utils.util.last(d)[field];
  };
};
},{"./utils.js":"src/module_resources/utils.js"}],"src/dev.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = void 0;

var _utils = require("./module_resources/utils.js");

var dev = {
  vars: {}
};
exports.dev = dev;
dev.msg = "Used for shipping development objects and functions with wrtsm";
},{"./module_resources/utils.js":"src/module_resources/utils.js"}],"src/module_resources/sample_walk.json":[function(require,module,exports) {
module.exports = [{
  "acc_x": -862.967,
  "acc_y": 216.977,
  "acc_z": -421.815,
  "angle": -7703308.3415,
  "dev": "A",
  "gyr_x": 1.4,
  "gyr_y": 1.26,
  "gyr_z": 0.21,
  "sample": -7703308,
  "time": 0
}, {
  "acc_x": -861.32,
  "acc_y": 225.151,
  "acc_z": -428.647,
  "angle": -7780900.34147,
  "dev": "A",
  "gyr_x": 1.82,
  "gyr_y": 1.89,
  "gyr_z": 0.07,
  "sample": -7780900,
  "time": 0.019000000000000128
}, {
  "acc_x": -958.615,
  "acc_y": -132.187,
  "acc_z": -212.768,
  "angle": 1.1986154361037165e+238,
  "dev": "B",
  "gyr_x": -0.63,
  "gyr_y": 0.7,
  "gyr_z": 1.19,
  "sample": 1.1986153830884358e+238,
  "time": 0.028999999999999915
}, {
  "acc_x": -865.712,
  "acc_y": 228.079,
  "acc_z": -424.011,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.43,
  "gyr_y": 1.54,
  "gyr_z": -0.28,
  "sample": 0,
  "time": 0.03799999999999937
}, {
  "acc_x": -959.896,
  "acc_y": -121.451,
  "acc_z": -205.509,
  "angle": 0,
  "dev": "B",
  "gyr_x": -0.35,
  "gyr_y": 0.49,
  "gyr_z": 1.54,
  "sample": 0,
  "time": 0.04800000000000004
}, {
  "acc_x": -965.386,
  "acc_y": -121.634,
  "acc_z": -202.276,
  "angle": 0,
  "dev": "B",
  "gyr_x": -0.42,
  "gyr_y": -0.49,
  "gyr_z": 1.89,
  "sample": 0,
  "time": 0.06700000000000017
}, {
  "acc_x": -869.86,
  "acc_y": 231.251,
  "acc_z": -417.057,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.36,
  "gyr_y": 0.63,
  "gyr_z": -0.84,
  "sample": 0,
  "time": 0.05799999999999983
}, {
  "acc_x": -865.407,
  "acc_y": 215.452,
  "acc_z": -414.8,
  "angle": -9.233099483536187e+83,
  "dev": "A",
  "gyr_x": 2.94,
  "gyr_y": 0.28,
  "gyr_z": -1.05,
  "sample": -9.23309908685898e+83,
  "time": 0.07699999999999996
}, {
  "acc_x": -957.212,
  "acc_y": -100.955,
  "acc_z": -209.291,
  "angle": 1.1986154361053104e+238,
  "dev": "B",
  "gyr_x": 0.49,
  "gyr_y": -1.05,
  "gyr_z": 2.24,
  "sample": 0,
  "time": 0.08599999999999941
}, {
  "acc_x": -857.782,
  "acc_y": 228.811,
  "acc_z": -425.902,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.26,
  "gyr_y": 1.26,
  "gyr_z": -1.05,
  "sample": 0,
  "time": 0.09600000000000009
}, {
  "acc_x": -858.27,
  "acc_y": 237.534,
  "acc_z": -436.821,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.24,
  "gyr_y": 1.96,
  "gyr_z": -0.7,
  "sample": 0,
  "time": 0.11699999999999999
}, {
  "acc_x": -859.917,
  "acc_y": 249.185,
  "acc_z": -424.56,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.64,
  "gyr_y": 1.47,
  "gyr_z": -0.7,
  "sample": 0,
  "time": 0.13600000000000012
}, {
  "acc_x": -866.322,
  "acc_y": 245.952,
  "acc_z": -411.994,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.78,
  "gyr_y": 0.63,
  "gyr_z": -1.19,
  "sample": 1.2494535195316786e+238,
  "time": 0.15499999999999936
}, {
  "acc_x": -961.787,
  "acc_y": -116.327,
  "acc_z": -210.755,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.96,
  "gyr_y": -0.7,
  "gyr_z": 2.52,
  "sample": 0,
  "time": 0.10599999999999987
}, {
  "acc_x": -959.591,
  "acc_y": -104.432,
  "acc_z": -208.559,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.59,
  "gyr_y": -0.7,
  "gyr_z": 2.66,
  "sample": 0,
  "time": 0.125
}, {
  "acc_x": -961.421,
  "acc_y": -105.957,
  "acc_z": -202.886,
  "angle": 1.1986154360880522e+238,
  "dev": "B",
  "gyr_x": 1.96,
  "gyr_y": -0.98,
  "gyr_z": 2.59,
  "sample": 1.1986153830884367e+238,
  "time": 0.14499999999999957
}, {
  "acc_x": -960.872,
  "acc_y": -88.877,
  "acc_z": -197.884,
  "angle": 1.0798799133520644e+161,
  "dev": "B",
  "gyr_x": 1.05,
  "gyr_y": -0.98,
  "gyr_z": 2.52,
  "sample": 1.079879867422496e+161,
  "time": 0.1639999999999997
}, {
  "acc_x": -964.532,
  "acc_y": -85.583,
  "acc_z": -199.287,
  "angle": -1.0803561586804876e+161,
  "dev": "B",
  "gyr_x": 0.7,
  "gyr_y": -0.84,
  "gyr_z": 2.31,
  "sample": 8069796,
  "time": 0.18400000000000016
}, {
  "acc_x": -862.54,
  "acc_y": 245.098,
  "acc_z": -401.868,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.1,
  "gyr_y": 0.14,
  "gyr_z": -1.4,
  "sample": 0,
  "time": 0.17499999999999982
}, {
  "acc_x": -866.444,
  "acc_y": 240.218,
  "acc_z": -419.314,
  "angle": -9.233099483520848e+83,
  "dev": "A",
  "gyr_x": 1.05,
  "gyr_y": 0.49,
  "gyr_z": -1.19,
  "sample": 9.006883029641396e+83,
  "time": 0.19399999999999995
}, {
  "acc_x": -964.532,
  "acc_y": -79.117,
  "acc_z": -203.862,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.12,
  "gyr_y": -0.42,
  "gyr_z": 2.03,
  "sample": 0,
  "time": 0.2029999999999994
}, {
  "acc_x": -965.752,
  "acc_y": -102.724,
  "acc_z": -212.341,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.33,
  "gyr_y": 0.28,
  "gyr_z": 1.61,
  "sample": 0,
  "time": 0.22199999999999953
}, {
  "acc_x": -867.542,
  "acc_y": 234.606,
  "acc_z": -414.678,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.05,
  "gyr_y": 0.91,
  "gyr_z": -0.77,
  "sample": 0,
  "time": 0.21300000000000008
}, {
  "acc_x": -963.007,
  "acc_y": -100.406,
  "acc_z": -201.666,
  "angle": 9.006883424851148e+83,
  "dev": "B",
  "gyr_x": 1.4,
  "gyr_y": 0.28,
  "gyr_z": 1.33,
  "sample": 9.006883029641401e+83,
  "time": 0.24099999999999966
}, {
  "acc_x": -862.113,
  "acc_y": 235.704,
  "acc_z": -418.399,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.38,
  "gyr_y": 1.12,
  "gyr_z": -0.42,
  "sample": 0,
  "time": 0.23299999999999965
}, {
  "acc_x": -865.59,
  "acc_y": 229.726,
  "acc_z": -409.737,
  "angle": 20.96687,
  "dev": "A",
  "gyr_x": 1.4,
  "gyr_y": 0.14,
  "gyr_z": -0.35,
  "sample": 0,
  "time": 0.2530000000000001
}, {
  "acc_x": -862.723,
  "acc_y": 221.491,
  "acc_z": -416.081,
  "angle": 8.987745308421443e+83,
  "dev": "A",
  "gyr_x": -0.21,
  "gyr_y": 0.07,
  "gyr_z": -0.21,
  "sample": 8.987744913132257e+83,
  "time": 0.27199999999999935
}, {
  "acc_x": -855.708,
  "acc_y": 230.153,
  "acc_z": -421.51,
  "angle": -1.0803561586922494e+161,
  "dev": "A",
  "gyr_x": 0.14,
  "gyr_y": 0.63,
  "gyr_z": 0.14,
  "sample": -1.0803561127601682e+161,
  "time": 0.2919999999999998
}, {
  "acc_x": -959.408,
  "acc_y": -88.694,
  "acc_z": -195.444,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.68,
  "gyr_y": 0.28,
  "gyr_z": 1.12,
  "sample": 0,
  "time": 0.2610000000000001
}, {
  "acc_x": -960.323,
  "acc_y": -98.149,
  "acc_z": -200.446,
  "angle": -1.0803561586428508e+161,
  "dev": "B",
  "gyr_x": 1.54,
  "gyr_y": 0.42,
  "gyr_z": 0.84,
  "sample": -1.0803561127601683e+161,
  "time": 0.2809999999999997
}, {
  "acc_x": -960.384,
  "acc_y": -103.09,
  "acc_z": -207.4,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.47,
  "gyr_y": 0.77,
  "gyr_z": 0.77,
  "sample": 0,
  "time": 0.2999999999999998
}, {
  "acc_x": -857.294,
  "acc_y": 232.593,
  "acc_z": -424.682,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.8,
  "gyr_y": 0.77,
  "gyr_z": 0.56,
  "sample": 0,
  "time": 0.31099999999999994
}, {
  "acc_x": -955.931,
  "acc_y": -109.312,
  "acc_z": -203.496,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.4,
  "gyr_y": 0.98,
  "gyr_z": 0.77,
  "sample": 0,
  "time": 0.31899999999999995
}, {
  "acc_x": -967.521,
  "acc_y": -99.308,
  "acc_z": -205.631,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.19,
  "gyr_y": 0.84,
  "gyr_z": 0.7,
  "sample": 0,
  "time": 0.3389999999999995
}, {
  "acc_x": -962.092,
  "acc_y": -84.851,
  "acc_z": -200.69,
  "angle": -1.2078876951611853e+238,
  "dev": "B",
  "gyr_x": 1.75,
  "gyr_y": 0.7,
  "gyr_z": 0.56,
  "sample": 0,
  "time": 0.35799999999999965
}, {
  "acc_x": -866.322,
  "acc_y": 240.767,
  "acc_z": -418.277,
  "angle": -1.0803561586776606e+161,
  "dev": "A",
  "gyr_x": 3.85,
  "gyr_y": 0.49,
  "gyr_z": 0.56,
  "sample": -1.0803561127601685e+161,
  "time": 0.33000000000000007
}, {
  "acc_x": -869.25,
  "acc_y": 240.218,
  "acc_z": -416.02,
  "angle": -7763552.34144,
  "dev": "A",
  "gyr_x": 4.48,
  "gyr_y": -0.14,
  "gyr_z": 0.56,
  "sample": -1.0803561127601686e+161,
  "time": 0.34999999999999964
}, {
  "acc_x": -864.248,
  "acc_y": 230.763,
  "acc_z": -403.82,
  "angle": 1.0343083829929812e+161,
  "dev": "A",
  "gyr_x": 3.43,
  "gyr_y": -0.98,
  "gyr_z": 0.84,
  "sample": 1.0343083372055738e+161,
  "time": 0.3689999999999998
}, {
  "acc_x": -962.946,
  "acc_y": -77.714,
  "acc_z": -202.093,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.1,
  "gyr_y": 0.84,
  "gyr_z": 0.35,
  "sample": 0,
  "time": 0.3769999999999998
}, {
  "acc_x": -956.785,
  "acc_y": -105.835,
  "acc_z": -202.764,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.89,
  "gyr_y": 0.98,
  "gyr_z": 0,
  "sample": 0,
  "time": 0.3959999999999999
}, {
  "acc_x": -853.146,
  "acc_y": 228.75,
  "acc_z": -429.562,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.7,
  "gyr_y": -0.77,
  "gyr_z": 1.26,
  "sample": 0,
  "time": 0.38899999999999935
}, {
  "acc_x": -856.989,
  "acc_y": 223.748,
  "acc_z": -433.222,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.42,
  "gyr_y": 0,
  "gyr_z": 1.33,
  "sample": 0,
  "time": 0.4089999999999998
}, {
  "acc_x": -959.103,
  "acc_y": -102.663,
  "acc_z": -214.232,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.96,
  "gyr_y": 1.19,
  "gyr_z": -0.14,
  "sample": 0,
  "time": 0.4169999999999998
}, {
  "acc_x": -861.442,
  "acc_y": 235.765,
  "acc_z": -424.316,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.19,
  "gyr_y": 0.56,
  "gyr_z": 1.12,
  "sample": 0,
  "time": 0.42799999999999994
}, {
  "acc_x": -959.164,
  "acc_y": -115.107,
  "acc_z": -214.232,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.75,
  "gyr_y": 1.12,
  "gyr_z": -0.14,
  "sample": 0,
  "time": 0.43599999999999994
}, {
  "acc_x": -960.933,
  "acc_y": -102.541,
  "acc_z": -202.642,
  "angle": 8.987745308504747e+83,
  "dev": "B",
  "gyr_x": 1.61,
  "gyr_y": 0.91,
  "gyr_z": -0.14,
  "sample": 8.987744913132269e+83,
  "time": 0.45500000000000007
}, {
  "acc_x": -865.224,
  "acc_y": 231.434,
  "acc_z": -420.717,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.96,
  "gyr_y": 0.63,
  "gyr_z": 0.84,
  "sample": 0,
  "time": 0.4479999999999995
}, {
  "acc_x": -869.433,
  "acc_y": 225.151,
  "acc_z": -414.739,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.4,
  "gyr_y": 0.49,
  "gyr_z": 0.42,
  "sample": 0,
  "time": 0.46699999999999964
}, {
  "acc_x": -961.482,
  "acc_y": -94.794,
  "acc_z": -202.398,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.03,
  "gyr_y": 0.98,
  "gyr_z": 0.07,
  "sample": 0,
  "time": 0.47499999999999964
}, {
  "acc_x": -860.649,
  "acc_y": 226.554,
  "acc_z": -422.425,
  "angle": -8047344.34238,
  "dev": "A",
  "gyr_x": -0.21,
  "gyr_y": 0.35,
  "gyr_z": 0,
  "sample": -8047344,
  "time": 0.48599999999999977
}, {
  "acc_x": -959.286,
  "acc_y": -109.495,
  "acc_z": -207.522,
  "angle": -1.080356158678228e+161,
  "dev": "B",
  "gyr_x": 1.26,
  "gyr_y": 1.12,
  "gyr_z": 0,
  "sample": -1.0803561127601697e+161,
  "time": 0.4939999999999998
}, {
  "acc_x": -956.48,
  "acc_y": -105.652,
  "acc_z": -214.476,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.12,
  "gyr_y": 1.33,
  "gyr_z": 0.14,
  "sample": 0,
  "time": 0.5129999999999999
}, {
  "acc_x": -857.782,
  "acc_y": 230.214,
  "acc_z": -423.035,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.35,
  "gyr_y": 0.63,
  "gyr_z": 0,
  "sample": 0,
  "time": 0.5059999999999993
}, {
  "acc_x": -860.344,
  "acc_y": 238.327,
  "acc_z": -421.876,
  "angle": -8047344.34257,
  "dev": "A",
  "gyr_x": 1.75,
  "gyr_y": 0.91,
  "gyr_z": 0.28,
  "sample": -8047344,
  "time": 0.5249999999999995
}, {
  "acc_x": -960.201,
  "acc_y": -101.016,
  "acc_z": -205.448,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.61,
  "gyr_y": 1.54,
  "gyr_z": 0.21,
  "sample": 0,
  "time": 0.532
}, {
  "acc_x": -960.384,
  "acc_y": -86.498,
  "acc_z": -201.91,
  "angle": -8047344.34203,
  "dev": "B",
  "gyr_x": 1.75,
  "gyr_y": 1.68,
  "gyr_z": 0.07,
  "sample": -8047344,
  "time": 0.5519999999999996
}, {
  "acc_x": -862.357,
  "acc_y": 230.458,
  "acc_z": -421.51,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.31,
  "gyr_y": 1.12,
  "gyr_z": 0.49,
  "sample": 0,
  "time": 0.5449999999999999
}, {
  "acc_x": -956.663,
  "acc_y": -97.051,
  "acc_z": -209.718,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.61,
  "gyr_y": 1.96,
  "gyr_z": -0.21,
  "sample": 0,
  "time": 0.5720000000000001
}, {
  "acc_x": -864.309,
  "acc_y": 234.85,
  "acc_z": -411.018,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.28,
  "gyr_y": 1.61,
  "gyr_z": 0.49,
  "sample": 0,
  "time": 0.5649999999999995
}, {
  "acc_x": -870.409,
  "acc_y": 238.205,
  "acc_z": -428.83,
  "angle": -9.347344590370466e+83,
  "dev": "A",
  "gyr_x": 0.84,
  "gyr_y": 1.61,
  "gyr_z": 0.7,
  "sample": -9.347344193784114e+83,
  "time": 0.5839999999999996
}, {
  "acc_x": -962.214,
  "acc_y": -105.53,
  "acc_z": -203.008,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.19,
  "gyr_y": 2.03,
  "gyr_z": -0.28,
  "sample": 0,
  "time": 0.5909999999999993
}, {
  "acc_x": -961.421,
  "acc_y": -110.715,
  "acc_z": -218.441,
  "angle": 0,
  "dev": "B",
  "gyr_x": 1.54,
  "gyr_y": 2.24,
  "gyr_z": -0.21,
  "sample": -8047344,
  "time": 0.6099999999999994
}, {
  "acc_x": -859.612,
  "acc_y": 232.41,
  "acc_z": -424.865,
  "angle": -1.0779969208069327e+161,
  "dev": "A",
  "gyr_x": 2.52,
  "gyr_y": 0.56,
  "gyr_z": 0.84,
  "sample": -1.0779968748768175e+161,
  "time": 0.6029999999999998
}, {
  "acc_x": -958.493,
  "acc_y": -103.7,
  "acc_z": -220.637,
  "angle": -8047344.34253,
  "dev": "B",
  "gyr_x": 2.17,
  "gyr_y": 2.31,
  "gyr_z": -0.07,
  "sample": -8047344,
  "time": 0.6299999999999999
}, {
  "acc_x": -857.477,
  "acc_y": 219.722,
  "acc_z": -432.978,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.45,
  "gyr_y": 0.42,
  "gyr_z": 0.49,
  "sample": 0,
  "time": 0.6229999999999993
}, {
  "acc_x": -850.584,
  "acc_y": 241.682,
  "acc_z": -432.673,
  "angle": 8.987745308540377e+83,
  "dev": "A",
  "gyr_x": 0.07,
  "gyr_y": 1.82,
  "gyr_z": -0.21,
  "sample": -7783128,
  "time": 0.6419999999999995
}, {
  "acc_x": -954.65,
  "acc_y": -115.839,
  "acc_z": -218.746,
  "angle": -1.0779969208071205e+161,
  "dev": "B",
  "gyr_x": 2.73,
  "gyr_y": 2.45,
  "gyr_z": 0,
  "sample": -1.077996874876818e+161,
  "time": 0.649
}, {
  "acc_x": -959.103,
  "acc_y": -95.831,
  "acc_z": -223.992,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.59,
  "gyr_y": 2.31,
  "gyr_z": 0.14,
  "sample": 0,
  "time": 0.6680000000000001
}, {
  "acc_x": -854.061,
  "acc_y": 241.987,
  "acc_z": -430.416,
  "angle": -8047344.3425,
  "dev": "A",
  "gyr_x": 1.68,
  "gyr_y": 2.17,
  "gyr_z": -0.49,
  "sample": -8047344,
  "time": 0.6609999999999996
}, {
  "acc_x": -863.089,
  "acc_y": 222.528,
  "acc_z": -423.096,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.59,
  "gyr_y": 1.96,
  "gyr_z": -0.7,
  "sample": 0,
  "time": 0.6819999999999995
}, {
  "acc_x": -956.419,
  "acc_y": -97.417,
  "acc_z": -208.803,
  "angle": -9.347344590456876e+83,
  "dev": "B",
  "gyr_x": 2.38,
  "gyr_y": 2.03,
  "gyr_z": 0.21,
  "sample": -1.2525032860721983e+238,
  "time": 0.6869999999999994
}, {
  "acc_x": -853.146,
  "acc_y": 229.116,
  "acc_z": -426.939,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.98,
  "gyr_y": 2.52,
  "gyr_z": -1.4,
  "sample": 0,
  "time": 0.7009999999999996
}, {
  "acc_x": -958.249,
  "acc_y": -101.992,
  "acc_z": -210.084,
  "angle": -1.0779969208071205e+161,
  "dev": "B",
  "gyr_x": 1.68,
  "gyr_y": 2.1,
  "gyr_z": 0.28,
  "sample": -1.0779968748768184e+161,
  "time": 0.7079999999999993
}, {
  "acc_x": -955.626,
  "acc_y": -110.41,
  "acc_z": -217.221,
  "angle": 0,
  "dev": "B",
  "gyr_x": 0.42,
  "gyr_y": 2.24,
  "gyr_z": 0.14,
  "sample": 0,
  "time": 0.7269999999999994
}, {
  "acc_x": -854.061,
  "acc_y": 233.508,
  "acc_z": -431.88,
  "angle": -7780900.3415,
  "dev": "A",
  "gyr_x": -1.19,
  "gyr_y": 3.64,
  "gyr_z": -1.82,
  "sample": -7780900,
  "time": 0.7199999999999998
}, {
  "acc_x": -858.453,
  "acc_y": 227.591,
  "acc_z": -441.396,
  "angle": -9.347344590034679e+83,
  "dev": "A",
  "gyr_x": 0.77,
  "gyr_y": 3.57,
  "gyr_z": -1.96,
  "sample": 0,
  "time": 0.7399999999999993
}, {
  "acc_x": -956.785,
  "acc_y": -102.785,
  "acc_z": -214.354,
  "angle": -7773700.3415,
  "dev": "B",
  "gyr_x": -1.19,
  "gyr_y": 2.24,
  "gyr_z": 0,
  "sample": -7773700,
  "time": 0.7459999999999996
}, {
  "acc_x": -847.961,
  "acc_y": 222.467,
  "acc_z": -425.841,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.75,
  "gyr_y": 4.2,
  "gyr_z": -2.45,
  "sample": 0,
  "time": 0.7589999999999995
}, {
  "acc_x": -955.809,
  "acc_y": -96.441,
  "acc_z": -216.855,
  "angle": -1.0779969208083053e+161,
  "dev": "B",
  "gyr_x": -2.52,
  "gyr_y": 2.1,
  "gyr_z": -0.21,
  "sample": -1.0779968748768187e+161,
  "time": 0.7649999999999997
}, {
  "acc_x": -950.136,
  "acc_y": -110.532,
  "acc_z": -228.384,
  "angle": 0,
  "dev": "B",
  "gyr_x": -4.2,
  "gyr_y": 2.17,
  "gyr_z": -0.21,
  "sample": -1.0779968748768189e+161,
  "time": 0.7850000000000001
}, {
  "acc_x": -850.645,
  "acc_y": 219.844,
  "acc_z": -450.668,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.41,
  "gyr_y": 7,
  "gyr_z": -3.08,
  "sample": 0,
  "time": 0.7779999999999996
}, {
  "acc_x": -951.905,
  "acc_y": -133.102,
  "acc_z": -227.774,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.53,
  "gyr_y": 2.73,
  "gyr_z": -0.14,
  "sample": 0,
  "time": 0.8039999999999994
}, {
  "acc_x": -855.159,
  "acc_y": 219.417,
  "acc_z": -450.424,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.97,
  "gyr_y": 7.7,
  "gyr_z": -3.71,
  "sample": 0,
  "time": 0.798
}, {
  "acc_x": -832.589,
  "acc_y": 218.624,
  "acc_z": -419.558,
  "angle": -1.0779969208088847e+161,
  "dev": "A",
  "gyr_x": -3.71,
  "gyr_y": 6.51,
  "gyr_z": -3.92,
  "sample": -1.0779968748768189e+161,
  "time": 0.8179999999999996
}, {
  "acc_x": -941.23,
  "acc_y": -104.676,
  "acc_z": -203.74,
  "angle": -7773700.34116,
  "dev": "B",
  "gyr_x": -5.53,
  "gyr_y": 3.57,
  "gyr_z": 0.07,
  "sample": -7773700,
  "time": 0.8229999999999995
}, {
  "acc_x": -909.51,
  "acc_y": -45.384,
  "acc_z": -194.407,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.95,
  "gyr_y": 4.41,
  "gyr_z": -0.56,
  "sample": 0,
  "time": 0.843
}, {
  "acc_x": -807.579,
  "acc_y": 235.826,
  "acc_z": -383.385,
  "angle": 8.98774530855073e+83,
  "dev": "A",
  "gyr_x": -5.6,
  "gyr_y": 6.02,
  "gyr_z": -3.99,
  "sample": 8.987744913132288e+83,
  "time": 0.8369999999999997
}, {
  "acc_x": -816.912,
  "acc_y": 247.233,
  "acc_z": -385.093,
  "angle": 0,
  "dev": "A",
  "gyr_x": -8.54,
  "gyr_y": 8.05,
  "gyr_z": -3.29,
  "sample": 0,
  "time": 0.8569999999999993
}, {
  "acc_x": -897.92,
  "acc_y": -3.172,
  "acc_z": -216.428,
  "angle": 1.2494535727167113e+238,
  "dev": "B",
  "gyr_x": -9.94,
  "gyr_y": 5.74,
  "gyr_z": -2.45,
  "sample": 1.2494535195316841e+238,
  "time": 0.8629999999999995
}, {
  "acc_x": -931.409,
  "acc_y": -28.304,
  "acc_z": -250.1,
  "angle": -8047344.34247,
  "dev": "B",
  "gyr_x": -14.21,
  "gyr_y": 7.49,
  "gyr_z": -4.69,
  "sample": -8047344,
  "time": 0.8819999999999997
}, {
  "acc_x": -1000.217,
  "acc_y": -16.348,
  "acc_z": -224.297,
  "angle": 0,
  "dev": "B",
  "gyr_x": -14.21,
  "gyr_y": 7.14,
  "gyr_z": -6.02,
  "sample": 0,
  "time": 0.9009999999999998
}, {
  "acc_x": -845.277,
  "acc_y": 319.823,
  "acc_z": -428.342,
  "angle": 8.987745308539066e+83,
  "dev": "A",
  "gyr_x": -9.45,
  "gyr_y": 9.03,
  "gyr_z": -0.84,
  "sample": 8.987744913132291e+83,
  "time": 0.8759999999999994
}, {
  "acc_x": -877.607,
  "acc_y": 319.518,
  "acc_z": -415.349,
  "angle": 1.0437683959562313e+161,
  "dev": "A",
  "gyr_x": -3.85,
  "gyr_y": 7.35,
  "gyr_z": 2.66,
  "sample": -9.347344193784131e+83,
  "time": 0.8959999999999999
}, {
  "acc_x": -880.657,
  "acc_y": 251.32,
  "acc_z": -426.451,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.52,
  "gyr_y": 4.2,
  "gyr_z": 4.76,
  "sample": 0,
  "time": 0.915
}, {
  "acc_x": -997.35,
  "acc_y": -86.681,
  "acc_z": -215.208,
  "angle": 9.347993026155915e+83,
  "dev": "B",
  "gyr_x": -10.22,
  "gyr_y": 4.27,
  "gyr_z": -6.09,
  "sample": 0,
  "time": 0.9199999999999999
}, {
  "acc_x": -959.042,
  "acc_y": -92.537,
  "acc_z": -215.208,
  "angle": -8067240.34239,
  "dev": "B",
  "gyr_x": -6.44,
  "gyr_y": 3.43,
  "gyr_z": -6.72,
  "sample": -8067240,
  "time": 0.9399999999999995
}, {
  "acc_x": -846.375,
  "acc_y": 207.034,
  "acc_z": -441.518,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.38,
  "gyr_y": 2.45,
  "gyr_z": 5.67,
  "sample": 0,
  "time": 0.9340000000000002
}, {
  "acc_x": -939.644,
  "acc_y": -95.892,
  "acc_z": -245.342,
  "angle": 9.347993026035031e+83,
  "dev": "B",
  "gyr_x": -5.25,
  "gyr_y": 4.41,
  "gyr_z": -7.42,
  "sample": -8047344,
  "time": 0.9589999999999996
}, {
  "acc_x": -810.751,
  "acc_y": 228.384,
  "acc_z": -478.606,
  "angle": 1.0431988322371571e+161,
  "dev": "A",
  "gyr_x": 4.41,
  "gyr_y": 2.24,
  "gyr_z": 6.86,
  "sample": 1.0431987864877639e+161,
  "time": 0.9550000000000001
}, {
  "acc_x": -788.974,
  "acc_y": 287.615,
  "acc_z": -465.613,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.38,
  "gyr_y": 1.05,
  "gyr_z": 6.86,
  "sample": 1.043198786487764e+161,
  "time": 0.9739999999999993
}, {
  "acc_x": -821.243,
  "acc_y": 334.402,
  "acc_z": -483.852,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.44,
  "gyr_y": 2.17,
  "gyr_z": 5.32,
  "sample": 0,
  "time": 0.9929999999999994
}, {
  "acc_x": -862.357,
  "acc_y": 306.952,
  "acc_z": -481.107,
  "angle": -7773700.34138,
  "dev": "A",
  "gyr_x": -0.14,
  "gyr_y": 4.06,
  "gyr_z": 3.64,
  "sample": -7773700,
  "time": 1.013
}, {
  "acc_x": -839.177,
  "acc_y": 242.231,
  "acc_z": -485.56,
  "angle": -1.2532951234820746e+238,
  "dev": "A",
  "gyr_x": -7.77,
  "gyr_y": 3.85,
  "gyr_z": 1.68,
  "sample": -1.253295070299274e+238,
  "time": 1.032
}, {
  "acc_x": -932.507,
  "acc_y": -128.344,
  "acc_z": -270.23,
  "angle": 0,
  "dev": "B",
  "gyr_x": -7.07,
  "gyr_y": 4.27,
  "gyr_z": -8.05,
  "sample": 0,
  "time": 0.9779999999999998
}, {
  "acc_x": -945.683,
  "acc_y": -66.307,
  "acc_z": -272.182,
  "angle": -9.347344590335302e+83,
  "dev": "B",
  "gyr_x": -6.51,
  "gyr_y": 3.99,
  "gyr_z": -8.47,
  "sample": 0,
  "time": 0.9979999999999993
}, {
  "acc_x": -986.248,
  "acc_y": -33.123,
  "acc_z": -273.219,
  "angle": 0,
  "dev": "B",
  "gyr_x": -4.9,
  "gyr_y": 3.5,
  "gyr_z": -9.24,
  "sample": 0,
  "time": 1.0179999999999998
}, {
  "acc_x": -970.327,
  "acc_y": -190.93,
  "acc_z": -270.291,
  "angle": 0,
  "dev": "B",
  "gyr_x": -7.56,
  "gyr_y": 2.38,
  "gyr_z": -9.03,
  "sample": 0,
  "time": 1.037
}, {
  "acc_x": -947.635,
  "acc_y": -194.956,
  "acc_z": -272.121,
  "angle": 8.987745308550489e+83,
  "dev": "B",
  "gyr_x": -6.93,
  "gyr_y": 2.31,
  "gyr_z": -8.33,
  "sample": 8.987744913132302e+83,
  "time": 1.056
}, {
  "acc_x": -954.589,
  "acc_y": -184.464,
  "acc_z": -243.329,
  "angle": 0,
  "dev": "B",
  "gyr_x": -2.31,
  "gyr_y": 1.33,
  "gyr_z": -7.49,
  "sample": 0,
  "time": 1.0750000000000002
}, {
  "acc_x": -851.682,
  "acc_y": 197.396,
  "acc_z": -467.199,
  "angle": -7773700.34149,
  "dev": "A",
  "gyr_x": -8.26,
  "gyr_y": 3.43,
  "gyr_z": -1.54,
  "sample": -7773700,
  "time": 1.0510000000000002
}, {
  "acc_x": -874.313,
  "acc_y": 213.195,
  "acc_z": -441.518,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.7,
  "gyr_y": 2.17,
  "gyr_z": -3.57,
  "sample": 0,
  "time": 1.0709999999999997
}, {
  "acc_x": -895.968,
  "acc_y": 266.875,
  "acc_z": -454.084,
  "angle": 0,
  "dev": "A",
  "gyr_x": 8.26,
  "gyr_y": 0.91,
  "gyr_z": -3.22,
  "sample": 0,
  "time": 1.0899999999999999
}, {
  "acc_x": -985.943,
  "acc_y": -125.477,
  "acc_z": -247.294,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.1,
  "gyr_y": 1.75,
  "gyr_z": -6.72,
  "sample": 0,
  "time": 1.0949999999999998
}, {
  "acc_x": -1001.437,
  "acc_y": -83.57,
  "acc_z": -266.753,
  "angle": 0,
  "dev": "B",
  "gyr_x": 6.44,
  "gyr_y": 1.61,
  "gyr_z": -6.65,
  "sample": 0,
  "time": 1.1139999999999999
}, {
  "acc_x": -875.96,
  "acc_y": 294.569,
  "acc_z": -472.689,
  "angle": 0,
  "dev": "A",
  "gyr_x": 16.03,
  "gyr_y": -1.12,
  "gyr_z": -1.33,
  "sample": 0,
  "time": 1.1099999999999994
}, {
  "acc_x": -829.722,
  "acc_y": 259.799,
  "acc_z": -502.03,
  "angle": 8.98774530856003e+83,
  "dev": "A",
  "gyr_x": 19.39,
  "gyr_y": -3.22,
  "gyr_z": -0.49,
  "sample": 8.987744913132305e+83,
  "time": 1.13
}, {
  "acc_x": -969.473,
  "acc_y": -172.325,
  "acc_z": -264.557,
  "angle": 0,
  "dev": "B",
  "gyr_x": 10.5,
  "gyr_y": 2.73,
  "gyr_z": -6.44,
  "sample": 0,
  "time": 1.1339999999999995
}, {
  "acc_x": -821.853,
  "acc_y": 223.321,
  "acc_z": -508.496,
  "angle": 0,
  "dev": "A",
  "gyr_x": 20.86,
  "gyr_y": -3.15,
  "gyr_z": -2.24,
  "sample": 0,
  "time": 1.149
}, {
  "acc_x": -953.735,
  "acc_y": -191.784,
  "acc_z": -298.29,
  "angle": 0,
  "dev": "B",
  "gyr_x": 14.35,
  "gyr_y": 2.17,
  "gyr_z": -6.16,
  "sample": 0,
  "time": 1.1529999999999996
}, {
  "acc_x": -937.326,
  "acc_y": -177.144,
  "acc_z": -294.935,
  "angle": -1.2532951234687492e+238,
  "dev": "B",
  "gyr_x": 16.52,
  "gyr_y": 0.98,
  "gyr_z": -6.16,
  "sample": -1.2532950702992753e+238,
  "time": 1.173
}, {
  "acc_x": -831.247,
  "acc_y": 238.51,
  "acc_z": -487.39,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.1,
  "gyr_y": -1.82,
  "gyr_z": -5.74,
  "sample": 0,
  "time": 1.1680000000000001
}, {
  "acc_x": -801.418,
  "acc_y": 278.404,
  "acc_z": -495.32,
  "angle": -1.2532951234827108e+238,
  "dev": "A",
  "gyr_x": 22.75,
  "gyr_y": 0,
  "gyr_z": -9.87,
  "sample": -1.2532950702992751e+238,
  "time": 1.1879999999999997
}, {
  "acc_x": -941.169,
  "acc_y": -161.345,
  "acc_z": -279.502,
  "angle": 0,
  "dev": "B",
  "gyr_x": 19.39,
  "gyr_y": 1.61,
  "gyr_z": -5.04,
  "sample": 0,
  "time": 1.1920000000000002
}, {
  "acc_x": -912.316,
  "acc_y": -116.144,
  "acc_z": -297.009,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.63,
  "gyr_y": 1.54,
  "gyr_z": -4.27,
  "sample": 0,
  "time": 1.2109999999999994
}, {
  "acc_x": -796.843,
  "acc_y": 263.398,
  "acc_z": -498.736,
  "angle": 0,
  "dev": "A",
  "gyr_x": 18.83,
  "gyr_y": 1.82,
  "gyr_z": -14,
  "sample": 0,
  "time": 1.2069999999999999
}, {
  "acc_x": -932.202,
  "acc_y": -159.21,
  "acc_z": -285.175,
  "angle": -8067232.34203,
  "dev": "B",
  "gyr_x": 19.53,
  "gyr_y": 1.4,
  "gyr_z": -4.34,
  "sample": -8067232,
  "time": 1.2299999999999995
}, {
  "acc_x": -813.069,
  "acc_y": 245.403,
  "acc_z": -467.565,
  "angle": 0,
  "dev": "A",
  "gyr_x": 16.73,
  "gyr_y": 2.45,
  "gyr_z": -16.59,
  "sample": 0,
  "time": 1.226
}, {
  "acc_x": -840.336,
  "acc_y": 224.358,
  "acc_z": -450.424,
  "angle": 0,
  "dev": "A",
  "gyr_x": 17.01,
  "gyr_y": 1.4,
  "gyr_z": -17.01,
  "sample": 0,
  "time": 1.2469999999999999
}, {
  "acc_x": -934.215,
  "acc_y": -124.806,
  "acc_z": -299.937,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.28,
  "gyr_y": 0.49,
  "gyr_z": -4.2,
  "sample": -9.347344193784153e+83,
  "time": 1.25
}, {
  "acc_x": -941.657,
  "acc_y": -105.347,
  "acc_z": -240.584,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.91,
  "gyr_y": 0.14,
  "gyr_z": -4.34,
  "sample": 0,
  "time": 1.2699999999999996
}, {
  "acc_x": -816.302,
  "acc_y": 232.593,
  "acc_z": -448.777,
  "angle": 1.082275620449523e+161,
  "dev": "A",
  "gyr_x": 19.46,
  "gyr_y": 0.42,
  "gyr_z": -15.61,
  "sample": 0,
  "time": 1.266
}, {
  "acc_x": -921.649,
  "acc_y": -95.892,
  "acc_z": -238.083,
  "angle": -1.2532951234822527e+238,
  "dev": "B",
  "gyr_x": 29.61,
  "gyr_y": 0.42,
  "gyr_z": -5.6,
  "sample": -1.2532950702992762e+238,
  "time": 1.2889999999999997
}, {
  "acc_x": -826.611,
  "acc_y": 231.373,
  "acc_z": -450.485,
  "angle": 1.0431988322371571e+161,
  "dev": "A",
  "gyr_x": 26.32,
  "gyr_y": -1.19,
  "gyr_z": -13.79,
  "sample": 1.043198786487766e+161,
  "time": 1.2850000000000001
}, {
  "acc_x": -836.066,
  "acc_y": 282.43,
  "acc_z": -433.832,
  "angle": 0,
  "dev": "A",
  "gyr_x": 32.83,
  "gyr_y": -3.29,
  "gyr_z": -12.88,
  "sample": 0,
  "time": 1.3049999999999997
}, {
  "acc_x": -948.855,
  "acc_y": -123.525,
  "acc_z": -262.239,
  "angle": -9.347344589831957e+83,
  "dev": "B",
  "gyr_x": 27.51,
  "gyr_y": 0.63,
  "gyr_z": -7.91,
  "sample": -9.347344193784156e+83,
  "time": 1.3079999999999998
}, {
  "acc_x": -975.207,
  "acc_y": -70.272,
  "acc_z": -262.178,
  "angle": -9.34734459033663e+83,
  "dev": "B",
  "gyr_x": 28.56,
  "gyr_y": -0.07,
  "gyr_z": -10.08,
  "sample": -9.347344193784157e+83,
  "time": 1.3279999999999994
}, {
  "acc_x": -831.796,
  "acc_y": 335.561,
  "acc_z": -452.986,
  "angle": 0,
  "dev": "A",
  "gyr_x": 36.19,
  "gyr_y": -4.2,
  "gyr_z": -12.18,
  "sample": 0,
  "time": 1.3239999999999998
}, {
  "acc_x": -976.122,
  "acc_y": -44.103,
  "acc_z": -277.611,
  "angle": 1.0819983470051492e+161,
  "dev": "B",
  "gyr_x": 30.1,
  "gyr_y": -1.61,
  "gyr_z": -12.18,
  "sample": 1.0819983010754346e+161,
  "time": 1.3469999999999995
}, {
  "acc_x": -824.232,
  "acc_y": 304.146,
  "acc_z": -462.075,
  "angle": 1.2494535727144857e+238,
  "dev": "A",
  "gyr_x": 34.37,
  "gyr_y": -5.11,
  "gyr_z": -12.6,
  "sample": 1.2494535195316874e+238,
  "time": 1.3439999999999994
}, {
  "acc_x": -820.694,
  "acc_y": 307.989,
  "acc_z": -464.454,
  "angle": 0,
  "dev": "A",
  "gyr_x": 30.8,
  "gyr_y": -5.18,
  "gyr_z": -15.26,
  "sample": -1.2532950702992764e+238,
  "time": 1.3629999999999995
}, {
  "acc_x": -969.961,
  "acc_y": -136.274,
  "acc_z": -262.3,
  "angle": 1.2494535727146639e+238,
  "dev": "B",
  "gyr_x": 27.93,
  "gyr_y": -1.19,
  "gyr_z": -14.84,
  "sample": 1.2494535195316879e+238,
  "time": 1.3659999999999997
}, {
  "acc_x": -970.266,
  "acc_y": -86.986,
  "acc_z": -235.277,
  "angle": 1.2494535727006815e+238,
  "dev": "B",
  "gyr_x": 26.25,
  "gyr_y": -1.26,
  "gyr_z": -17.08,
  "sample": 1.249453519531688e+238,
  "time": 1.3849999999999998
}, {
  "acc_x": -971.547,
  "acc_y": -35.502,
  "acc_z": -235.826,
  "angle": 8045768.34255,
  "dev": "B",
  "gyr_x": 22.75,
  "gyr_y": -2.24,
  "gyr_z": -19.74,
  "sample": 8045768,
  "time": 1.4049999999999994
}, {
  "acc_x": -832.894,
  "acc_y": 330.498,
  "acc_z": -442.555,
  "angle": 8.925365794228849e+83,
  "dev": "A",
  "gyr_x": 28.7,
  "gyr_y": -6.51,
  "gyr_z": -18.9,
  "sample": 8.925365398818392e+83,
  "time": 1.383
}, {
  "acc_x": -838.872,
  "acc_y": 340.807,
  "acc_z": -416.569,
  "angle": 1.0431988322295051e+161,
  "dev": "A",
  "gyr_x": 25.76,
  "gyr_y": -7.98,
  "gyr_z": -21.35,
  "sample": 1.0431987864877668e+161,
  "time": 1.4029999999999996
}, {
  "acc_x": -846.375,
  "acc_y": 361.608,
  "acc_z": -401.258,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.1,
  "gyr_y": -9.87,
  "gyr_z": -21.63,
  "sample": 0,
  "time": 1.4219999999999997
}, {
  "acc_x": -997.106,
  "acc_y": 11.529,
  "acc_z": -232.593,
  "angle": 0,
  "dev": "B",
  "gyr_x": 19.46,
  "gyr_y": -1.33,
  "gyr_z": -23.87,
  "sample": 0,
  "time": 1.4249999999999998
}, {
  "acc_x": -980.514,
  "acc_y": 1.464,
  "acc_z": -263.764,
  "angle": 8045768.34256,
  "dev": "B",
  "gyr_x": 18.34,
  "gyr_y": -0.84,
  "gyr_z": -29.05,
  "sample": 0,
  "time": 1.444
}, {
  "acc_x": -846.192,
  "acc_y": 378.81,
  "acc_z": -421.51,
  "angle": 0,
  "dev": "A",
  "gyr_x": 22.33,
  "gyr_y": -13.86,
  "gyr_z": -20.02,
  "sample": 0,
  "time": 1.4409999999999998
}, {
  "acc_x": -865.895,
  "acc_y": 380.64,
  "acc_z": -430.294,
  "angle": 0,
  "dev": "A",
  "gyr_x": 26.11,
  "gyr_y": -22.05,
  "gyr_z": -16.94,
  "sample": 0,
  "time": 1.4609999999999994
}, {
  "acc_x": -989.237,
  "acc_y": -48.983,
  "acc_z": -247.66,
  "angle": 0,
  "dev": "B",
  "gyr_x": 17.08,
  "gyr_y": -1.19,
  "gyr_z": -34.93,
  "sample": 0,
  "time": 1.463
}, {
  "acc_x": -1036.756,
  "acc_y": -8.906,
  "acc_z": -290.482,
  "angle": 0,
  "dev": "B",
  "gyr_x": 17.5,
  "gyr_y": -2.17,
  "gyr_z": -40.95,
  "sample": 0,
  "time": 1.4829999999999997
}, {
  "acc_x": -888.099,
  "acc_y": 396.134,
  "acc_z": -433.527,
  "angle": 0,
  "dev": "A",
  "gyr_x": 34.02,
  "gyr_y": -29.33,
  "gyr_z": -13.16,
  "sample": 0,
  "time": 1.4799999999999995
}, {
  "acc_x": -1040.721,
  "acc_y": -41.602,
  "acc_z": -276.879,
  "angle": 0,
  "dev": "B",
  "gyr_x": 16.38,
  "gyr_y": -3.64,
  "gyr_z": -47.18,
  "sample": 0,
  "time": 1.5019999999999998
}, {
  "acc_x": -965.691,
  "acc_y": 346.419,
  "acc_z": -417.484,
  "angle": 0,
  "dev": "A",
  "gyr_x": 32.2,
  "gyr_y": -29.26,
  "gyr_z": -9.66,
  "sample": 0,
  "time": 1.4989999999999997
}, {
  "acc_x": -990.823,
  "acc_y": 333.121,
  "acc_z": -403.82,
  "angle": 8.925365794866191e+83,
  "dev": "A",
  "gyr_x": 14.42,
  "gyr_y": -27.65,
  "gyr_z": -7.07,
  "sample": 0,
  "time": 1.5190000000000001
}, {
  "acc_x": -1109.163,
  "acc_y": -115.473,
  "acc_z": -242.048,
  "angle": -1.0427129333158683e+161,
  "dev": "B",
  "gyr_x": 14.28,
  "gyr_y": -3.99,
  "gyr_z": -52.57,
  "sample": -1.0427128875283867e+161,
  "time": 1.521
}, {
  "acc_x": -1113.86,
  "acc_y": -128.039,
  "acc_z": -175.07,
  "angle": -1.0427129333146436e+161,
  "dev": "B",
  "gyr_x": 18.83,
  "gyr_y": -3.85,
  "gyr_z": -55.93,
  "sample": -1.0427128875283868e+161,
  "time": 1.54
}, {
  "acc_x": -970.51,
  "acc_y": 328.18,
  "acc_z": -341.6,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.87,
  "gyr_y": -28.21,
  "gyr_z": -4.62,
  "sample": 0,
  "time": 1.5389999999999997
}, {
  "acc_x": -1131.367,
  "acc_y": -119.194,
  "acc_z": -151.89,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.68,
  "gyr_y": -3.57,
  "gyr_z": -60.06,
  "sample": 0,
  "time": 1.561
}, {
  "acc_x": -1110.566,
  "acc_y": -154.757,
  "acc_z": -137.189,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.92,
  "gyr_y": -3.5,
  "gyr_z": -65.31,
  "sample": 0,
  "time": 1.58
}, {
  "acc_x": -1095.865,
  "acc_y": -162.138,
  "acc_z": -152.439,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.05,
  "gyr_y": -2.87,
  "gyr_z": -70.35,
  "sample": 0,
  "time": 1.5989999999999993
}, {
  "acc_x": -1016.748,
  "acc_y": 305,
  "acc_z": -316.224,
  "angle": -1.0427129333141581e+161,
  "dev": "A",
  "gyr_x": -17.22,
  "gyr_y": -23.87,
  "gyr_z": -1.68,
  "sample": -1.0427128875283867e+161,
  "time": 1.5579999999999998
}, {
  "acc_x": -984.296,
  "acc_y": 275.964,
  "acc_z": -232.715,
  "angle": 0,
  "dev": "A",
  "gyr_x": -26.74,
  "gyr_y": -23.87,
  "gyr_z": 3.01,
  "sample": 0,
  "time": 1.5779999999999994
}, {
  "acc_x": -977.769,
  "acc_y": 280.417,
  "acc_z": -181.658,
  "angle": -1.0427129333093851e+161,
  "dev": "A",
  "gyr_x": -19.18,
  "gyr_y": -35,
  "gyr_z": 9.38,
  "sample": -1.0427128875283869e+161,
  "time": 1.5969999999999995
}, {
  "acc_x": -1099.586,
  "acc_y": -118.218,
  "acc_z": -139.263,
  "angle": -1.0824804917077974e+161,
  "dev": "B",
  "gyr_x": 37.24,
  "gyr_y": -2.17,
  "gyr_z": -74.41,
  "sample": -1.082480445848597e+161,
  "time": 1.6179999999999994
}, {
  "acc_x": -1139.541,
  "acc_y": -26.84,
  "acc_z": -148.962,
  "angle": 0,
  "dev": "B",
  "gyr_x": 42.42,
  "gyr_y": -0.56,
  "gyr_z": -79.73,
  "sample": 0,
  "time": 1.638
}, {
  "acc_x": -1189.927,
  "acc_y": 54.046,
  "acc_z": -76.006,
  "angle": 1.0431988322687662e+161,
  "dev": "B",
  "gyr_x": 43.89,
  "gyr_y": 0.91,
  "gyr_z": -86.1,
  "sample": 1.0431987864877687e+161,
  "time": 1.657
}, {
  "acc_x": -1178.581,
  "acc_y": 23.668,
  "acc_z": -126.331,
  "angle": 1.2494535726864886e+238,
  "dev": "B",
  "gyr_x": 48.3,
  "gyr_y": 3.43,
  "gyr_z": -91.77,
  "sample": 1.2494535195316902e+238,
  "time": 1.6760000000000002
}, {
  "acc_x": -1123.193,
  "acc_y": -3.416,
  "acc_z": -207.583,
  "angle": 8.92536579422645e+83,
  "dev": "B",
  "gyr_x": 48.79,
  "gyr_y": 9.17,
  "gyr_z": -95.62,
  "sample": 8.925365398818411e+83,
  "time": 1.6949999999999994
}, {
  "acc_x": -1053.47,
  "acc_y": -276.94,
  "acc_z": -283.833,
  "angle": -1.208510565366848e+238,
  "dev": "B",
  "gyr_x": 37.73,
  "gyr_y": 14.07,
  "gyr_z": -97.23,
  "sample": -1.2085105124015362e+238,
  "time": 1.7159999999999993
}, {
  "acc_x": -980.331,
  "acc_y": 286.578,
  "acc_z": -144.204,
  "angle": 0,
  "dev": "A",
  "gyr_x": -3.15,
  "gyr_y": -48.93,
  "gyr_z": 17.01,
  "sample": 0,
  "time": 1.6159999999999997
}, {
  "acc_x": -1002.413,
  "acc_y": 349.408,
  "acc_z": -123.281,
  "angle": 8.925365794232041e+83,
  "dev": "A",
  "gyr_x": 8.47,
  "gyr_y": -62.65,
  "gyr_z": 25.62,
  "sample": 8.925365398818406e+83,
  "time": 1.6360000000000001
}, {
  "acc_x": -1005.829,
  "acc_y": 347.334,
  "acc_z": -107.848,
  "angle": 0,
  "dev": "A",
  "gyr_x": 13.93,
  "gyr_y": -74.06,
  "gyr_z": 35.7,
  "sample": 0,
  "time": 1.6549999999999994
}, {
  "acc_x": -982.954,
  "acc_y": 371.551,
  "acc_z": -97.539,
  "angle": 0,
  "dev": "A",
  "gyr_x": 10.99,
  "gyr_y": -81.69,
  "gyr_z": 44.66,
  "sample": 0,
  "time": 1.6749999999999998
}, {
  "acc_x": -971.242,
  "acc_y": 346.541,
  "acc_z": -174.765,
  "angle": 0,
  "dev": "A",
  "gyr_x": 8.61,
  "gyr_y": -83.79,
  "gyr_z": 54.32,
  "sample": 0,
  "time": 1.6949999999999994
}, {
  "acc_x": -998.936,
  "acc_y": 334.097,
  "acc_z": -291.885,
  "angle": 0,
  "dev": "A",
  "gyr_x": 10.29,
  "gyr_y": -80.99,
  "gyr_z": 62.44,
  "sample": 0,
  "time": 1.7139999999999995
}, {
  "acc_x": -921.344,
  "acc_y": -432.002,
  "acc_z": -356.789,
  "angle": -8069284.34255,
  "dev": "B",
  "gyr_x": 24.36,
  "gyr_y": 18.34,
  "gyr_z": -94.78,
  "sample": -8069284,
  "time": 1.7349999999999994
}, {
  "acc_x": -1052.799,
  "acc_y": 242.048,
  "acc_z": -395.646,
  "angle": 8.998639028316184e+83,
  "dev": "A",
  "gyr_x": 8.68,
  "gyr_y": -73.43,
  "gyr_z": 66.78,
  "sample": 8.998638632887785e+83,
  "time": 1.7329999999999997
}, {
  "acc_x": -1097.39,
  "acc_y": 169.885,
  "acc_z": -442.189,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.82,
  "gyr_y": -61.46,
  "gyr_z": 67.06,
  "sample": 0,
  "time": 1.7530000000000001
}, {
  "acc_x": -783.728,
  "acc_y": -531.432,
  "acc_z": -322.263,
  "angle": -1.0824804917539773e+161,
  "dev": "B",
  "gyr_x": 17.57,
  "gyr_y": 21.84,
  "gyr_z": -84.84,
  "sample": 0,
  "time": 1.7539999999999996
}, {
  "acc_x": -711.565,
  "acc_y": -629.459,
  "acc_z": -369.66,
  "angle": 0,
  "dev": "B",
  "gyr_x": 9.87,
  "gyr_y": 23.87,
  "gyr_z": -68.81,
  "sample": 0,
  "time": 1.7729999999999997
}, {
  "acc_x": -1113.433,
  "acc_y": 74.237,
  "acc_z": -410.957,
  "angle": -8069284.34257,
  "dev": "A",
  "gyr_x": -15.96,
  "gyr_y": -54.6,
  "gyr_z": 64.82,
  "sample": -8069284,
  "time": 1.7719999999999994
}, {
  "acc_x": -1091.778,
  "acc_y": 60.878,
  "acc_z": -392.108,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.33,
  "gyr_y": -50.47,
  "gyr_z": 60.9,
  "sample": 0,
  "time": 1.7919999999999998
}, {
  "acc_x": -1003.023,
  "acc_y": 133.163,
  "acc_z": -356.911,
  "angle": -1.2085099444101711e+238,
  "dev": "A",
  "gyr_x": -41.09,
  "gyr_y": -44.8,
  "gyr_z": 55.44,
  "sample": 1.0426501389872762e+161,
  "time": 1.8119999999999994
}, {
  "acc_x": -582.062,
  "acc_y": -807.701,
  "acc_z": -340.868,
  "angle": 1.2494535727168038e+238,
  "dev": "B",
  "gyr_x": 4.69,
  "gyr_y": 24.78,
  "gyr_z": -50.89,
  "sample": 1.249453519531691e+238,
  "time": 1.7930000000000001
}, {
  "acc_x": -585.417,
  "acc_y": -400.892,
  "acc_z": -252.479,
  "angle": -1.2077274752920796e+238,
  "dev": "B",
  "gyr_x": 26.25,
  "gyr_y": 21.98,
  "gyr_z": -23.8,
  "sample": -1.2077274222757804e+238,
  "time": 1.8119999999999994
}, {
  "acc_x": -497.882,
  "acc_y": -131.455,
  "acc_z": 12.322,
  "angle": 8.925365794246811e+83,
  "dev": "B",
  "gyr_x": 26.67,
  "gyr_y": 2.8,
  "gyr_z": 6.16,
  "sample": 8.925365398818419e+83,
  "time": 1.8309999999999995
}, {
  "acc_x": -427.854,
  "acc_y": -352.031,
  "acc_z": -38.064,
  "angle": 1.252584070195979e+238,
  "dev": "B",
  "gyr_x": -3.92,
  "gyr_y": -3.64,
  "gyr_z": 33.74,
  "sample": 1.2525840170130066e+238,
  "time": 1.851
}, {
  "acc_x": -476.41,
  "acc_y": -563.579,
  "acc_z": -230.641,
  "angle": 1.0818599784258218e+161,
  "dev": "B",
  "gyr_x": -53.55,
  "gyr_y": 1.96,
  "gyr_z": 60.2,
  "sample": 1.0818599324976009e+161,
  "time": 1.8709999999999996
}, {
  "acc_x": -948.367,
  "acc_y": 151.585,
  "acc_z": -368.074,
  "angle": 1.0818599784272183e+161,
  "dev": "A",
  "gyr_x": -50.61,
  "gyr_y": -35.98,
  "gyr_z": 50.75,
  "sample": 1.0818599324976004e+161,
  "time": 1.8309999999999995
}, {
  "acc_x": -556.808,
  "acc_y": -485.987,
  "acc_z": -228.079,
  "angle": -8069284.34258,
  "dev": "B",
  "gyr_x": -76.09,
  "gyr_y": -3.36,
  "gyr_z": 86.03,
  "sample": 9.01046332104071e+83,
  "time": 1.8899999999999997
}, {
  "acc_x": -925.98,
  "acc_y": 124.074,
  "acc_z": -332.572,
  "angle": 8.925365794243584e+83,
  "dev": "A",
  "gyr_x": -54.81,
  "gyr_y": -26.04,
  "gyr_z": 45.36,
  "sample": 0,
  "time": 1.851
}, {
  "acc_x": -908.9,
  "acc_y": 99.735,
  "acc_z": -286.822,
  "angle": 0,
  "dev": "A",
  "gyr_x": -58.59,
  "gyr_y": -18.62,
  "gyr_z": 38.99,
  "sample": 0,
  "time": 1.87
}, {
  "acc_x": -900.421,
  "acc_y": 58.377,
  "acc_z": -259.311,
  "angle": 9.010463716437541e+83,
  "dev": "A",
  "gyr_x": -58.73,
  "gyr_y": -9.66,
  "gyr_z": 34.58,
  "sample": 9.010463321040708e+83,
  "time": 1.8889999999999993
}, {
  "acc_x": -894.809,
  "acc_y": 87.474,
  "acc_z": -249.734,
  "angle": 9.010463716413109e+83,
  "dev": "A",
  "gyr_x": -50.61,
  "gyr_y": -1.4,
  "gyr_z": 33.88,
  "sample": 9.010463321040709e+83,
  "time": 1.9089999999999998
}, {
  "acc_x": -852.109,
  "acc_y": 119.743,
  "acc_z": -232.654,
  "angle": -1.0824804917539773e+161,
  "dev": "A",
  "gyr_x": -38.29,
  "gyr_y": 5.25,
  "gyr_z": 36.12,
  "sample": -1.0824804458485988e+161,
  "time": 1.928
}, {
  "acc_x": -668.377,
  "acc_y": -385.886,
  "acc_z": -144.021,
  "angle": 8067760.34256,
  "dev": "B",
  "gyr_x": -75.11,
  "gyr_y": -13.65,
  "gyr_z": 107.17,
  "sample": 8067760,
  "time": 1.9089999999999998
}, {
  "acc_x": -779.885,
  "acc_y": -433.283,
  "acc_z": -187.819,
  "angle": 0,
  "dev": "B",
  "gyr_x": -81.62,
  "gyr_y": -22.82,
  "gyr_z": 123.55,
  "sample": 0,
  "time": 1.928
}, {
  "acc_x": -837.408,
  "acc_y": -498.37,
  "acc_z": -210.145,
  "angle": 8.925365794246811e+83,
  "dev": "B",
  "gyr_x": -85.26,
  "gyr_y": -34.79,
  "gyr_z": 138.25,
  "sample": 1.2084372335475813e+238,
  "time": 1.9479999999999995
}, {
  "acc_x": -845.582,
  "acc_y": 123.769,
  "acc_z": -190.991,
  "angle": 0,
  "dev": "A",
  "gyr_x": -27.79,
  "gyr_y": 6.65,
  "gyr_z": 38.5,
  "sample": 0,
  "time": 1.947
}, {
  "acc_x": -839.543,
  "acc_y": 124.501,
  "acc_z": -172.691,
  "angle": 0,
  "dev": "A",
  "gyr_x": -21,
  "gyr_y": 13.09,
  "gyr_z": 35.21,
  "sample": 0,
  "time": 1.968
}, {
  "acc_x": -844.606,
  "acc_y": -454.145,
  "acc_z": -218.929,
  "angle": 1.0314321400340438e+161,
  "dev": "B",
  "gyr_x": -72.52,
  "gyr_y": -45.92,
  "gyr_z": 151.69,
  "sample": 1.031432094248453e+161,
  "time": 1.9669999999999996
}, {
  "acc_x": -914.634,
  "acc_y": -417.789,
  "acc_z": -305.915,
  "angle": 0,
  "dev": "B",
  "gyr_x": -59.99,
  "gyr_y": -54.18,
  "gyr_z": 164.85,
  "sample": 0,
  "time": 1.987
}, {
  "acc_x": -851.499,
  "acc_y": 193.614,
  "acc_z": -177.449,
  "angle": 1.0314321400340438e+161,
  "dev": "A",
  "gyr_x": -17.57,
  "gyr_y": 20.72,
  "gyr_z": 30.73,
  "sample": 1.0314320942484529e+161,
  "time": 1.987
}, {
  "acc_x": -838.567,
  "acc_y": 259.311,
  "acc_z": -175.558,
  "angle": 0,
  "dev": "A",
  "gyr_x": -14.98,
  "gyr_y": 25.55,
  "gyr_z": 25.06,
  "sample": -9.348516009727274e+83,
  "time": 2.0059999999999993
}, {
  "acc_x": -813.069,
  "acc_y": 229.299,
  "acc_z": -194.468,
  "angle": 8067760.34258,
  "dev": "A",
  "gyr_x": -14.42,
  "gyr_y": 27.65,
  "gyr_z": 17.78,
  "sample": 0,
  "time": 2.026
}, {
  "acc_x": -956.053,
  "acc_y": -407.724,
  "acc_z": -324.764,
  "angle": 7784668.34147,
  "dev": "B",
  "gyr_x": -46.34,
  "gyr_y": -62.58,
  "gyr_z": 176.82,
  "sample": 0,
  "time": 2.0059999999999993
}, {
  "acc_x": -964.471,
  "acc_y": -322.629,
  "acc_z": -224.541,
  "angle": 9.010463716452794e+83,
  "dev": "B",
  "gyr_x": -30.24,
  "gyr_y": -69.58,
  "gyr_z": 185.78,
  "sample": 9.010463321040718e+83,
  "time": 2.026
}, {
  "acc_x": -977.708,
  "acc_y": -295.484,
  "acc_z": -183.61,
  "angle": -1.2083515875673406e+238,
  "dev": "B",
  "gyr_x": -26.32,
  "gyr_y": -68.46,
  "gyr_z": 192.43,
  "sample": 1.208437233547582e+238,
  "time": 2.045
}, {
  "acc_x": -811.178,
  "acc_y": 206.302,
  "acc_z": -182.146,
  "angle": 0,
  "dev": "A",
  "gyr_x": -17.85,
  "gyr_y": 31.64,
  "gyr_z": 10.5,
  "sample": 1.0426501389872777e+161,
  "time": 2.045
}, {
  "acc_x": -1014.43,
  "acc_y": -298.778,
  "acc_z": -226.554,
  "angle": 0,
  "dev": "B",
  "gyr_x": -29.47,
  "gyr_y": -63.63,
  "gyr_z": 197.89,
  "sample": 0,
  "time": 2.064
}, {
  "acc_x": -808.25,
  "acc_y": 214.415,
  "acc_z": -108.092,
  "angle": 1.0314321400340438e+161,
  "dev": "A",
  "gyr_x": -21.14,
  "gyr_y": 28.63,
  "gyr_z": 3.85,
  "sample": 1.0314320942484534e+161,
  "time": 2.064
}, {
  "acc_x": -800.198,
  "acc_y": 291.153,
  "acc_z": -52.704,
  "angle": 1.0431966870242704e+161,
  "dev": "A",
  "gyr_x": -31.57,
  "gyr_y": 21.07,
  "gyr_z": -3.29,
  "sample": 1.0431966412385024e+161,
  "time": 2.0839999999999996
}, {
  "acc_x": -1043.832,
  "acc_y": -305.671,
  "acc_z": -196.176,
  "angle": 0,
  "dev": "B",
  "gyr_x": -19.6,
  "gyr_y": -59.36,
  "gyr_z": 201.67,
  "sample": -1.0824804458486e+161,
  "time": 2.0829999999999993
}, {
  "acc_x": -1056.825,
  "acc_y": -226.432,
  "acc_z": -178.974,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.95,
  "gyr_y": -53.55,
  "gyr_z": 201.46,
  "sample": -1.0824804458486002e+161,
  "time": 2.1029999999999998
}, {
  "acc_x": -806.969,
  "acc_y": 343.552,
  "acc_z": -96.502,
  "angle": -7781904.34147,
  "dev": "A",
  "gyr_x": -52.29,
  "gyr_y": 23.24,
  "gyr_z": -11.62,
  "sample": -7781904,
  "time": 2.104
}, {
  "acc_x": -1090.802,
  "acc_y": -127.429,
  "acc_z": -165.92,
  "angle": 0,
  "dev": "B",
  "gyr_x": 3.71,
  "gyr_y": -46.97,
  "gyr_z": 196.77,
  "sample": 0,
  "time": 2.122
}, {
  "acc_x": -1082.75,
  "acc_y": -46.177,
  "acc_z": -102.358,
  "angle": 0,
  "dev": "B",
  "gyr_x": 8.33,
  "gyr_y": -41.51,
  "gyr_z": 185.85,
  "sample": 0,
  "time": 2.1419999999999995
}, {
  "acc_x": -822.097,
  "acc_y": 400.282,
  "acc_z": -60.268,
  "angle": 0,
  "dev": "A",
  "gyr_x": -53.69,
  "gyr_y": 25.55,
  "gyr_z": -17.08,
  "sample": 0,
  "time": 2.1229999999999993
}, {
  "acc_x": -835.944,
  "acc_y": 489.525,
  "acc_z": -1.891,
  "angle": -9.348516406383997e+83,
  "dev": "A",
  "gyr_x": -36.75,
  "gyr_y": 17.92,
  "gyr_z": -16.38,
  "sample": 0,
  "time": 2.143
}, {
  "acc_x": -924.272,
  "acc_y": 624.823,
  "acc_z": 82.106,
  "angle": 1.0431966870259807e+161,
  "dev": "A",
  "gyr_x": -18.48,
  "gyr_y": 9.66,
  "gyr_z": -8.89,
  "sample": 1.0431966412385029e+161,
  "time": 2.162
}, {
  "acc_x": -903.776,
  "acc_y": 617.259,
  "acc_z": 134.749,
  "angle": -9.348516406180051e+83,
  "dev": "A",
  "gyr_x": -15.33,
  "gyr_y": 7.77,
  "gyr_z": -3.01,
  "sample": 1.0817204912951313e+161,
  "time": 2.181
}, {
  "acc_x": -1018.7,
  "acc_y": 69.601,
  "acc_z": -56.303,
  "angle": 0,
  "dev": "B",
  "gyr_x": 10.01,
  "gyr_y": -34.23,
  "gyr_z": 168.21,
  "sample": 0,
  "time": 2.1609999999999996
}, {
  "acc_x": -893.284,
  "acc_y": 636.047,
  "acc_z": 106.384,
  "angle": 0,
  "dev": "A",
  "gyr_x": -34.65,
  "gyr_y": 9.31,
  "gyr_z": 0.7,
  "sample": 0,
  "time": 2.2009999999999996
}, {
  "acc_x": -1012.295,
  "acc_y": 38.979,
  "acc_z": -10.187,
  "angle": 0,
  "dev": "B",
  "gyr_x": 3.01,
  "gyr_y": -24.71,
  "gyr_z": 143.78,
  "sample": 0,
  "time": 2.181
}, {
  "acc_x": -981.551,
  "acc_y": 36.661,
  "acc_z": -80.642,
  "angle": 0,
  "dev": "B",
  "gyr_x": -6.23,
  "gyr_y": -15.19,
  "gyr_z": 113.4,
  "sample": 0,
  "time": 2.2
}, {
  "acc_x": -929.457,
  "acc_y": 112.423,
  "acc_z": -79.422,
  "angle": 9.010463716469099e+83,
  "dev": "B",
  "gyr_x": -7.56,
  "gyr_y": -8.82,
  "gyr_z": 78.4,
  "sample": 9.010463321040729e+83,
  "time": 2.2189999999999994
}, {
  "acc_x": -912.56,
  "acc_y": 636.352,
  "acc_z": 64.538,
  "angle": 0,
  "dev": "A",
  "gyr_x": -40.46,
  "gyr_y": 17.99,
  "gyr_z": 5.53,
  "sample": 0,
  "time": 2.2199999999999998
}, {
  "acc_x": -891.454,
  "acc_y": 561.627,
  "acc_z": 17.812,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.47,
  "gyr_y": 17.71,
  "gyr_z": 11.76,
  "sample": 0,
  "time": 2.2409999999999997
}, {
  "acc_x": -918.782,
  "acc_y": 104.371,
  "acc_z": -102.968,
  "angle": 9.010463716413109e+83,
  "dev": "B",
  "gyr_x": -13.93,
  "gyr_y": -3.15,
  "gyr_z": 38.78,
  "sample": -8075408,
  "time": 2.2379999999999995
}, {
  "acc_x": -867.115,
  "acc_y": 61.671,
  "acc_z": -104.92,
  "angle": 9.010463716460972e+83,
  "dev": "B",
  "gyr_x": -26.6,
  "gyr_y": 3.99,
  "gyr_z": -2.52,
  "sample": 9.010463321040731e+83,
  "time": 2.258
}, {
  "acc_x": -796.05,
  "acc_y": 458.537,
  "acc_z": 22.814,
  "angle": 9.34199962739158e+83,
  "dev": "A",
  "gyr_x": -14.14,
  "gyr_y": 20.58,
  "gyr_z": 19.81,
  "sample": 9.341999230945012e+83,
  "time": 2.26
}, {
  "acc_x": -855.098,
  "acc_y": -41.724,
  "acc_z": -152.256,
  "angle": 0,
  "dev": "B",
  "gyr_x": -38.71,
  "gyr_y": 14.21,
  "gyr_z": -39.27,
  "sample": 0,
  "time": 2.2779999999999996
}, {
  "acc_x": -721.813,
  "acc_y": 386.74,
  "acc_z": -70.76,
  "angle": -1.0824804917077974e+161,
  "dev": "A",
  "gyr_x": -8.47,
  "gyr_y": 29.12,
  "gyr_z": 22.47,
  "sample": -1.082480445848601e+161,
  "time": 2.279
}, {
  "acc_x": -728.34,
  "acc_y": 249.795,
  "acc_z": -305.305,
  "angle": 0,
  "dev": "A",
  "gyr_x": -18.2,
  "gyr_y": 48.72,
  "gyr_z": 13.16,
  "sample": 0,
  "time": 2.2989999999999995
}, {
  "acc_x": -855.281,
  "acc_y": -158.905,
  "acc_z": -245.342,
  "angle": -1.0824804917806575e+161,
  "dev": "B",
  "gyr_x": -44.17,
  "gyr_y": 25.06,
  "gyr_z": -68.25,
  "sample": 1.0430614905345702e+161,
  "time": 2.2969999999999997
}, {
  "acc_x": -966.972,
  "acc_y": 386.374,
  "acc_z": -306.464,
  "angle": 9.01046371641882e+83,
  "dev": "B",
  "gyr_x": -43.89,
  "gyr_y": 37.45,
  "gyr_z": -83.86,
  "sample": 9.010463321040734e+83,
  "time": 2.316
}, {
  "acc_x": -882.243,
  "acc_y": 686.738,
  "acc_z": -84.119,
  "angle": 9.010463716471273e+83,
  "dev": "B",
  "gyr_x": -17.71,
  "gyr_y": 35.77,
  "gyr_z": -58.45,
  "sample": 9.010463321040735e+83,
  "time": 2.3359999999999994
}, {
  "acc_x": -894.26,
  "acc_y": 270.474,
  "acc_z": -365.329,
  "angle": 1.252741806006812e+238,
  "dev": "A",
  "gyr_x": -19.74,
  "gyr_y": 65.31,
  "gyr_z": -6.16,
  "sample": 1.2527417528511876e+238,
  "time": 2.3179999999999996
}, {
  "acc_x": -908.412,
  "acc_y": 676.612,
  "acc_z": 41.968,
  "angle": 9.010463716469099e+83,
  "dev": "A",
  "gyr_x": -7.14,
  "gyr_y": 65.38,
  "gyr_z": -16.8,
  "sample": 9.010463321040733e+83,
  "time": 2.336999999999999
}, {
  "acc_x": -1340.902,
  "acc_y": 950.441,
  "acc_z": 124.135,
  "angle": 9.34323628710853e+83,
  "dev": "A",
  "gyr_x": -21.98,
  "gyr_y": 68.81,
  "gyr_z": -22.05,
  "sample": 0,
  "time": 2.357
}, {
  "acc_x": -1448.384,
  "acc_y": 251.503,
  "acc_z": 132.065,
  "angle": 1.0430615363215773e+161,
  "dev": "B",
  "gyr_x": -44.24,
  "gyr_y": 34.44,
  "gyr_z": -40.53,
  "sample": 1.0430614905345706e+161,
  "time": 2.3549999999999995
}, {
  "acc_x": -1247.572,
  "acc_y": 512.461,
  "acc_z": 168.543,
  "angle": 1.0431966870255112e+161,
  "dev": "B",
  "gyr_x": -21.07,
  "gyr_y": 34.79,
  "gyr_z": -48.58,
  "sample": 1.0431966412385045e+161,
  "time": 2.3739999999999997
}, {
  "acc_x": -1320.406,
  "acc_y": 644.465,
  "acc_z": -71.248,
  "angle": 0,
  "dev": "A",
  "gyr_x": -58.31,
  "gyr_y": 57.4,
  "gyr_z": -27.65,
  "sample": 0,
  "time": 2.377
}, {
  "acc_x": -1266.116,
  "acc_y": 75.396,
  "acc_z": 198.494,
  "angle": 1.0828248042866561e+161,
  "dev": "B",
  "gyr_x": -43.12,
  "gyr_y": 35.98,
  "gyr_z": -68.81,
  "sample": 1.082824758356243e+161,
  "time": 2.393
}, {
  "acc_x": -1049.871,
  "acc_y": 292.617,
  "acc_z": -43.188,
  "angle": 0,
  "dev": "A",
  "gyr_x": -36.68,
  "gyr_y": 52.78,
  "gyr_z": -15.54,
  "sample": 0,
  "time": 2.396
}, {
  "acc_x": -705.953,
  "acc_y": 114.741,
  "acc_z": -330.864,
  "angle": 1.0314321400340438e+161,
  "dev": "A",
  "gyr_x": 4.2,
  "gyr_y": 48.51,
  "gyr_z": -2.03,
  "sample": 1.0314320942484557e+161,
  "time": 2.4159999999999995
}, {
  "acc_x": -1046.821,
  "acc_y": 89.853,
  "acc_z": -61.488,
  "angle": 0,
  "dev": "B",
  "gyr_x": -105.7,
  "gyr_y": 41.44,
  "gyr_z": -88.34,
  "sample": 0,
  "time": 2.4140000000000006
}, {
  "acc_x": -797.88,
  "acc_y": -233.325,
  "acc_z": -353.251,
  "angle": 9.349178737153863e+83,
  "dev": "B",
  "gyr_x": -105.35,
  "gyr_y": 38.15,
  "gyr_z": -95.48,
  "sample": 1.031432094248456e+161,
  "time": 2.432999999999999
}, {
  "acc_x": -546.438,
  "acc_y": 33.916,
  "acc_z": -592.798,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.24,
  "gyr_y": 36.82,
  "gyr_z": -10.36,
  "sample": 0,
  "time": 2.4349999999999996
}, {
  "acc_x": -779.031,
  "acc_y": -223.687,
  "acc_z": -683.566,
  "angle": 9.012784189925233e+83,
  "dev": "B",
  "gyr_x": -67.41,
  "gyr_y": 36.05,
  "gyr_z": -85.54,
  "sample": 9.012783794509057e+83,
  "time": 2.451999999999999
}, {
  "acc_x": -907.68,
  "acc_y": -366.915,
  "acc_z": -598.105,
  "angle": 0,
  "dev": "B",
  "gyr_x": -31.64,
  "gyr_y": 40.53,
  "gyr_z": -72.17,
  "sample": 0,
  "time": 2.470999999999999
}, {
  "acc_x": -681.309,
  "acc_y": 151.341,
  "acc_z": -665.266,
  "angle": 9.351480683864245e+83,
  "dev": "A",
  "gyr_x": 4.97,
  "gyr_y": 40.67,
  "gyr_z": -9.45,
  "sample": 9.351480287211775e+83,
  "time": 2.4539999999999997
}, {
  "acc_x": -868.762,
  "acc_y": 274.683,
  "acc_z": -485.194,
  "angle": 1.0314321400361836e+161,
  "dev": "A",
  "gyr_x": 32.62,
  "gyr_y": 48.51,
  "gyr_z": -2.66,
  "sample": 1.031432094248456e+161,
  "time": 2.4739999999999993
}, {
  "acc_x": -979.416,
  "acc_y": -265.228,
  "acc_z": -242.353,
  "angle": 1.0430615363201588e+161,
  "dev": "B",
  "gyr_x": 9.73,
  "gyr_y": 34.86,
  "gyr_z": -59.5,
  "sample": 1.0430614905345714e+161,
  "time": 2.4910000000000005
}, {
  "acc_x": -869.433,
  "acc_y": 293.044,
  "acc_z": -390.339,
  "angle": 0,
  "dev": "A",
  "gyr_x": 29.05,
  "gyr_y": 46.13,
  "gyr_z": -9.38,
  "sample": 0,
  "time": 2.4929999999999994
}, {
  "acc_x": -996.618,
  "acc_y": -16.043,
  "acc_z": 85.461,
  "angle": 1.2527418060370648e+238,
  "dev": "B",
  "gyr_x": 40.88,
  "gyr_y": 29.54,
  "gyr_z": -52.71,
  "sample": 1.2527417528511893e+238,
  "time": 2.509999999999999
}, {
  "acc_x": -987.59,
  "acc_y": 72.407,
  "acc_z": 21.838,
  "angle": 0,
  "dev": "B",
  "gyr_x": 23.66,
  "gyr_y": 30.59,
  "gyr_z": -51.38,
  "sample": 0,
  "time": 2.528999999999999
}, {
  "acc_x": -888.038,
  "acc_y": 280.661,
  "acc_z": -365.939,
  "angle": 0,
  "dev": "A",
  "gyr_x": 18.48,
  "gyr_y": 44.87,
  "gyr_z": -18.69,
  "sample": 0,
  "time": 2.5119999999999996
}, {
  "acc_x": -863.089,
  "acc_y": 225.517,
  "acc_z": -405.223,
  "angle": 0,
  "dev": "A",
  "gyr_x": 12.18,
  "gyr_y": 40.74,
  "gyr_z": -24.64,
  "sample": 1.0430582726606682e+161,
  "time": 2.5330000000000004
}, {
  "acc_x": -935.984,
  "acc_y": -108.58,
  "acc_z": -245.037,
  "angle": 0,
  "dev": "B",
  "gyr_x": -26.88,
  "gyr_y": 32.97,
  "gyr_z": -53.76,
  "sample": 0,
  "time": 2.547999999999999
}, {
  "acc_x": -808.189,
  "acc_y": 163.968,
  "acc_z": -535.824,
  "angle": 9.351480683888746e+83,
  "dev": "A",
  "gyr_x": 12.67,
  "gyr_y": 37.24,
  "gyr_z": -25.69,
  "sample": 9.35148028721178e+83,
  "time": 2.5520000000000005
}, {
  "acc_x": -781.654,
  "acc_y": 197.762,
  "acc_z": -552.416,
  "angle": 1.2079659420684543e+238,
  "dev": "A",
  "gyr_x": 28.14,
  "gyr_y": 31.78,
  "gyr_z": -19.6,
  "sample": 9.351480287211781e+83,
  "time": 2.5710000000000006
}, {
  "acc_x": -958.737,
  "acc_y": -278.77,
  "acc_z": -477.081,
  "angle": 1.0430615363213296e+161,
  "dev": "B",
  "gyr_x": -34.3,
  "gyr_y": 34.16,
  "gyr_z": -49.84,
  "sample": 1.0430614905345719e+161,
  "time": 2.569
}, {
  "acc_x": -970.266,
  "acc_y": -177.693,
  "acc_z": -442.25,
  "angle": 1.0431966870235932e+161,
  "dev": "B",
  "gyr_x": 6.44,
  "gyr_y": 27.37,
  "gyr_z": -41.09,
  "sample": 1.2079658890547636e+238,
  "time": 2.588
}, {
  "acc_x": -988.017,
  "acc_y": 3.416,
  "acc_z": -250.466,
  "angle": 9.01633669123739e+83,
  "dev": "B",
  "gyr_x": 53.27,
  "gyr_y": 21.35,
  "gyr_z": -32.55,
  "sample": 9.016336295806867e+83,
  "time": 2.607
}, {
  "acc_x": -775.005,
  "acc_y": 381.25,
  "acc_z": -519.659,
  "angle": 0,
  "dev": "A",
  "gyr_x": 51.8,
  "gyr_y": 27.02,
  "gyr_z": -10.29,
  "sample": 0,
  "time": 2.591
}, {
  "acc_x": -828.502,
  "acc_y": 378.566,
  "acc_z": -474.946,
  "angle": 0,
  "dev": "A",
  "gyr_x": 58.94,
  "gyr_y": 24.36,
  "gyr_z": -6.37,
  "sample": -1.2082049768409777e+238,
  "time": 2.6100000000000003
}, {
  "acc_x": -833.443,
  "acc_y": 345.626,
  "acc_z": -447.374,
  "angle": 0,
  "dev": "A",
  "gyr_x": 56.14,
  "gyr_y": 21.14,
  "gyr_z": -7.84,
  "sample": 0,
  "time": 2.6290000000000004
}, {
  "acc_x": -1005.646,
  "acc_y": 151.646,
  "acc_z": -210.816,
  "angle": 0,
  "dev": "B",
  "gyr_x": 54.04,
  "gyr_y": 21.21,
  "gyr_z": -32.69,
  "sample": 0,
  "time": 2.6260000000000003
}, {
  "acc_x": -979.965,
  "acc_y": -98.271,
  "acc_z": -199.348,
  "angle": 1.0431966870250396e+161,
  "dev": "B",
  "gyr_x": 24.64,
  "gyr_y": 22.19,
  "gyr_z": -35.42,
  "sample": 1.0431966412385063e+161,
  "time": 2.646
}, {
  "acc_x": -836.737,
  "acc_y": 277.001,
  "acc_z": -463.417,
  "angle": 1.2079659420730372e+238,
  "dev": "A",
  "gyr_x": 50.4,
  "gyr_y": 17.57,
  "gyr_z": -13.23,
  "sample": 1.2079658890547637e+238,
  "time": 2.649
}, {
  "acc_x": -970.327,
  "acc_y": -248.331,
  "acc_z": -342.942,
  "angle": 0,
  "dev": "B",
  "gyr_x": 9.94,
  "gyr_y": 22.75,
  "gyr_z": -34.23,
  "sample": 0,
  "time": 2.665
}, {
  "acc_x": -864.98,
  "acc_y": 231.068,
  "acc_z": -503.86,
  "angle": 8069760.34257,
  "dev": "A",
  "gyr_x": 50.33,
  "gyr_y": 15.33,
  "gyr_z": -16.59,
  "sample": 0,
  "time": 2.6689999999999996
}, {
  "acc_x": -845.155,
  "acc_y": 283.467,
  "acc_z": -523.563,
  "angle": 1.0431966870255112e+161,
  "dev": "A",
  "gyr_x": 56.77,
  "gyr_y": 12.74,
  "gyr_z": -15.19,
  "sample": 1.0431966412385063e+161,
  "time": 2.6879999999999997
}, {
  "acc_x": -984.662,
  "acc_y": -159.271,
  "acc_z": -303.292,
  "angle": 1.0430615363214515e+161,
  "dev": "B",
  "gyr_x": 25.48,
  "gyr_y": 16.1,
  "gyr_z": -29.47,
  "sample": 1.0430614905345727e+161,
  "time": 2.684
}, {
  "acc_x": -996.374,
  "acc_y": -54.839,
  "acc_z": -241.194,
  "angle": 9.012784189929288e+83,
  "dev": "B",
  "gyr_x": 44.31,
  "gyr_y": 14,
  "gyr_z": -24.15,
  "sample": 1.0431966412385066e+161,
  "time": 2.7039999999999997
}, {
  "acc_x": -858.392,
  "acc_y": 305.671,
  "acc_z": -513.986,
  "angle": 1.2079659420719476e+238,
  "dev": "A",
  "gyr_x": 63.56,
  "gyr_y": 8.61,
  "gyr_z": -12.6,
  "sample": 1.2079658890547642e+238,
  "time": 2.7079999999999993
}, {
  "acc_x": -1012.417,
  "acc_y": -92.049,
  "acc_z": -288.103,
  "angle": 1.2079659420733287e+238,
  "dev": "B",
  "gyr_x": 42.7,
  "gyr_y": 11.55,
  "gyr_z": -23.66,
  "sample": 8.395,
  "time": 2.7239999999999993
}, {
  "acc_x": -958.188,
  "acc_y": -144.875,
  "acc_z": -278.648,
  "angle": 7786708.3415,
  "dev": "B",
  "gyr_x": 38.08,
  "gyr_y": 11.06,
  "gyr_z": -23.59,
  "sample": 7786708,
  "time": 2.7429999999999994
}, {
  "acc_x": -828.746,
  "acc_y": 308.538,
  "acc_z": -497.76,
  "angle": 1.20796594207226e+238,
  "dev": "A",
  "gyr_x": 65.73,
  "gyr_y": 3.01,
  "gyr_z": -12.39,
  "sample": 1.2079658890547643e+238,
  "time": 2.7269999999999994
}, {
  "acc_x": -812.032,
  "acc_y": 319.884,
  "acc_z": -479.155,
  "angle": 0,
  "dev": "A",
  "gyr_x": 64.4,
  "gyr_y": -1.96,
  "gyr_z": -14.77,
  "sample": 0,
  "time": 2.746999999999999
}, {
  "acc_x": -947.757,
  "acc_y": -83.448,
  "acc_z": -285.48,
  "angle": 1.2079659420724936e+238,
  "dev": "B",
  "gyr_x": 38.78,
  "gyr_y": 11.27,
  "gyr_z": -22.96,
  "sample": 1.2079658890547649e+238,
  "time": 2.7619999999999996
}, {
  "acc_x": -817.278,
  "acc_y": 322.019,
  "acc_z": -458.659,
  "angle": 0,
  "dev": "A",
  "gyr_x": 61.95,
  "gyr_y": -6.44,
  "gyr_z": -17.78,
  "sample": 0,
  "time": 2.765999999999999
}, {
  "acc_x": -965.63,
  "acc_y": -66.246,
  "acc_z": -272.548,
  "angle": 1.2084360445515617e+238,
  "dev": "B",
  "gyr_x": 39.48,
  "gyr_y": 12.53,
  "gyr_z": -23.45,
  "sample": 1.2084359915331137e+238,
  "time": 2.7809999999999997
}, {
  "acc_x": -923.479,
  "acc_y": -30.561,
  "acc_z": -281.942,
  "angle": 1.0431966870255112e+161,
  "dev": "B",
  "gyr_x": 41.3,
  "gyr_y": 12.18,
  "gyr_z": -23.87,
  "sample": 1.0431966412385073e+161,
  "time": 2.8009999999999993
}, {
  "acc_x": -768.905,
  "acc_y": 343.064,
  "acc_z": -449.265,
  "angle": 1.2527418060381058e+238,
  "dev": "A",
  "gyr_x": 57.05,
  "gyr_y": -9.31,
  "gyr_z": -19.88,
  "sample": 1.0822728929818488e+161,
  "time": 2.7849999999999993
}, {
  "acc_x": -756.095,
  "acc_y": 309.514,
  "acc_z": -458.537,
  "angle": 0,
  "dev": "A",
  "gyr_x": 50.82,
  "gyr_y": -7.91,
  "gyr_z": -21,
  "sample": 0,
  "time": 2.806
}, {
  "acc_x": -914.817,
  "acc_y": -86.315,
  "acc_z": -282.369,
  "angle": 0,
  "dev": "B",
  "gyr_x": 36.54,
  "gyr_y": 11.2,
  "gyr_z": -25.41,
  "sample": 0,
  "time": 2.8199999999999994
}, {
  "acc_x": -796.111,
  "acc_y": 287.493,
  "acc_z": -473.055,
  "angle": 8069760.34255,
  "dev": "A",
  "gyr_x": 44.8,
  "gyr_y": -4.2,
  "gyr_z": -22.33,
  "sample": 8069760,
  "time": 2.825
}, {
  "acc_x": -929.213,
  "acc_y": -105.042,
  "acc_z": -277.428,
  "angle": 8076972.34257,
  "dev": "B",
  "gyr_x": 30.87,
  "gyr_y": 9.8,
  "gyr_z": -27.3,
  "sample": -8067240,
  "time": 2.839999999999999
}, {
  "acc_x": -939.034,
  "acc_y": -150.67,
  "acc_z": -298.107,
  "angle": 0,
  "dev": "B",
  "gyr_x": 27.09,
  "gyr_y": 9.94,
  "gyr_z": -29.12,
  "sample": 0,
  "time": 2.858999999999999
}, {
  "acc_x": -831.003,
  "acc_y": 254.065,
  "acc_z": -460.428,
  "angle": 9.341999627631174e+83,
  "dev": "A",
  "gyr_x": 41.23,
  "gyr_y": -0.28,
  "gyr_z": -23.87,
  "sample": 9.341999230945045e+83,
  "time": 2.8440000000000003
}, {
  "acc_x": -848.083,
  "acc_y": 223.016,
  "acc_z": -423.889,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42,
  "gyr_y": -2.38,
  "gyr_z": -24.85,
  "sample": 7786708,
  "time": 2.864
}, {
  "acc_x": -949.831,
  "acc_y": -105.591,
  "acc_z": -294.874,
  "angle": 0,
  "dev": "B",
  "gyr_x": 33.18,
  "gyr_y": 10.5,
  "gyr_z": -29.12,
  "sample": -9.324032930378987e+83,
  "time": 2.8790000000000004
}, {
  "acc_x": -805.444,
  "acc_y": 264.984,
  "acc_z": -404.247,
  "angle": 9.341999627628793e+83,
  "dev": "A",
  "gyr_x": 44.31,
  "gyr_y": -4.06,
  "gyr_z": -23.94,
  "sample": 1.0822728929818494e+161,
  "time": 2.883
}, {
  "acc_x": -922.991,
  "acc_y": -88.877,
  "acc_z": -268.156,
  "angle": 8076972.34258,
  "dev": "B",
  "gyr_x": 38.36,
  "gyr_y": 10.99,
  "gyr_z": -29.61,
  "sample": -1.2528237258064657e+238,
  "time": 2.8980000000000006
}, {
  "acc_x": -796.782,
  "acc_y": 248.453,
  "acc_z": -407.053,
  "angle": 1.2079659420724936e+238,
  "dev": "A",
  "gyr_x": 50.82,
  "gyr_y": -3.85,
  "gyr_z": -21.42,
  "sample": 1.2079658890547656e+238,
  "time": 2.902
}, {
  "acc_x": -792.085,
  "acc_y": 298.473,
  "acc_z": -401.99,
  "angle": 0,
  "dev": "A",
  "gyr_x": 53.34,
  "gyr_y": -3.71,
  "gyr_z": -19.95,
  "sample": 0,
  "time": 2.9219999999999997
}, {
  "acc_x": -813.313,
  "acc_y": 360.693,
  "acc_z": -392.657,
  "angle": 0,
  "dev": "A",
  "gyr_x": 57.61,
  "gyr_y": -5.18,
  "gyr_z": -18.06,
  "sample": -1.2082049768409802e+238,
  "time": 2.941
}, {
  "acc_x": -840.458,
  "acc_y": 365.634,
  "acc_z": -396.683,
  "angle": 7786708.34148,
  "dev": "A",
  "gyr_x": 55.65,
  "gyr_y": -6.09,
  "gyr_z": -16.03,
  "sample": 7786708,
  "time": 2.9609999999999994
}, {
  "acc_x": -914.085,
  "acc_y": -123.525,
  "acc_z": -285.297,
  "angle": 1.207965942070703e+238,
  "dev": "B",
  "gyr_x": 37.59,
  "gyr_y": 11.41,
  "gyr_z": -31.92,
  "sample": 1.207965889054766e+238,
  "time": 2.916999999999999
}, {
  "acc_x": -913.353,
  "acc_y": -36.722,
  "acc_z": -292.373,
  "angle": -1.081934525840108e+161,
  "dev": "B",
  "gyr_x": 40.81,
  "gyr_y": 12.18,
  "gyr_z": -34.37,
  "sample": -1.0819344799096983e+161,
  "time": 2.935999999999999
}, {
  "acc_x": -949.282,
  "acc_y": -21.411,
  "acc_z": -298.534,
  "angle": 1.2079659420702727e+238,
  "dev": "B",
  "gyr_x": 40.74,
  "gyr_y": 12.11,
  "gyr_z": -37.87,
  "sample": 1.2079658890547663e+238,
  "time": 2.9560000000000004
}, {
  "acc_x": -976.366,
  "acc_y": -75.335,
  "acc_z": -261.019,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.38,
  "gyr_y": 10.57,
  "gyr_z": -42.63,
  "sample": -8067240,
  "time": 2.9750000000000005
}, {
  "acc_x": -869.982,
  "acc_y": 341.966,
  "acc_z": -397.659,
  "angle": 7786708.34258,
  "dev": "A",
  "gyr_x": 50.33,
  "gyr_y": -7.7,
  "gyr_z": -14.98,
  "sample": 9.341999230945052e+83,
  "time": 2.980999999999999
}, {
  "acc_x": -1006.073,
  "acc_y": -100.101,
  "acc_z": -251.747,
  "angle": 1.207965942038965e+238,
  "dev": "B",
  "gyr_x": 34.86,
  "gyr_y": 10.43,
  "gyr_z": -47.46,
  "sample": 1.2079658890547666e+238,
  "time": 2.995
}, {
  "acc_x": -872.971,
  "acc_y": 341.417,
  "acc_z": -367.159,
  "angle": 0,
  "dev": "A",
  "gyr_x": 48.58,
  "gyr_y": -11.41,
  "gyr_z": -15.47,
  "sample": 0,
  "time": 2.999999999999999
}, {
  "acc_x": -902.861,
  "acc_y": 393.145,
  "acc_z": -338.367,
  "angle": -1.081934525840108e+161,
  "dev": "A",
  "gyr_x": 46.27,
  "gyr_y": -13.65,
  "gyr_z": -16.66,
  "sample": -1.0819344799096985e+161,
  "time": 3.0189999999999992
}, {
  "acc_x": -1012.356,
  "acc_y": -98.942,
  "acc_z": -225.517,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.02,
  "gyr_y": 10.36,
  "gyr_z": -51.73,
  "sample": 0,
  "time": 3.0140000000000002
}, {
  "acc_x": -1046.76,
  "acc_y": -73.688,
  "acc_z": -214.049,
  "angle": 9.34199962762341e+83,
  "dev": "B",
  "gyr_x": 34.23,
  "gyr_y": 10.64,
  "gyr_z": -56.91,
  "sample": 0,
  "time": 3.034
}, {
  "acc_x": -921.954,
  "acc_y": 455.609,
  "acc_z": -336.537,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.49,
  "gyr_y": -15.05,
  "gyr_z": -16.38,
  "sample": 0,
  "time": 3.0390000000000006
}, {
  "acc_x": -1081.408,
  "acc_y": -76.128,
  "acc_z": -227.347,
  "angle": 0,
  "dev": "B",
  "gyr_x": 33.39,
  "gyr_y": 10.64,
  "gyr_z": -63.07,
  "sample": 0,
  "time": 3.053
}, {
  "acc_x": -1130.879,
  "acc_y": -39.467,
  "acc_z": -254.919,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.37,
  "gyr_y": 10.43,
  "gyr_z": -69.44,
  "sample": 0,
  "time": 3.072
}, {
  "acc_x": -910.547,
  "acc_y": 531.859,
  "acc_z": -338.367,
  "angle": 0,
  "dev": "A",
  "gyr_x": 38.78,
  "gyr_y": -20.02,
  "gyr_z": -15.75,
  "sample": 0,
  "time": 3.057999999999999
}, {
  "acc_x": -987.956,
  "acc_y": 539.606,
  "acc_z": -323.178,
  "angle": -1.0819345258386415e+161,
  "dev": "A",
  "gyr_x": 32.55,
  "gyr_y": -23.52,
  "gyr_z": -14.07,
  "sample": -1.0819344799096989e+161,
  "time": 3.076999999999999
}, {
  "acc_x": -1204.567,
  "acc_y": -35.075,
  "acc_z": -269.132,
  "angle": 0,
  "dev": "B",
  "gyr_x": 36.26,
  "gyr_y": 10.64,
  "gyr_z": -77,
  "sample": -1.042992842557974e+161,
  "time": 3.091
}, {
  "acc_x": -1040.294,
  "acc_y": 632.753,
  "acc_z": -300.608,
  "angle": 0,
  "dev": "A",
  "gyr_x": 25.41,
  "gyr_y": -26.67,
  "gyr_z": -9.94,
  "sample": 0,
  "time": 3.098
}, {
  "acc_x": -1288.381,
  "acc_y": -5.185,
  "acc_z": -184.891,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.36,
  "gyr_y": 10.36,
  "gyr_z": -85.47,
  "sample": 0,
  "time": 3.1109999999999998
}, {
  "acc_x": -1393.667,
  "acc_y": 170.068,
  "acc_z": -102.236,
  "angle": 0,
  "dev": "B",
  "gyr_x": 42.07,
  "gyr_y": 10.08,
  "gyr_z": -94.5,
  "sample": 0,
  "time": 3.1309999999999993
}, {
  "acc_x": -1054.324,
  "acc_y": 673.501,
  "acc_z": -166.286,
  "angle": 0,
  "dev": "A",
  "gyr_x": 24.71,
  "gyr_y": -36.05,
  "gyr_z": -4.06,
  "sample": 0,
  "time": 3.117
}, {
  "acc_x": -1179.801,
  "acc_y": 684.725,
  "acc_z": 5.856,
  "angle": 0,
  "dev": "A",
  "gyr_x": 19.81,
  "gyr_y": -49.91,
  "gyr_z": 6.44,
  "sample": 0,
  "time": 3.136
}, {
  "acc_x": -1481.873,
  "acc_y": 251.442,
  "acc_z": -37.21,
  "angle": 1.2084360445489244e+238,
  "dev": "B",
  "gyr_x": 43.4,
  "gyr_y": 10.57,
  "gyr_z": -104.86,
  "sample": -1.20883654120093e+238,
  "time": 3.1499999999999995
}, {
  "acc_x": -1133.136,
  "acc_y": 610,
  "acc_z": 117.547,
  "angle": 8076972.34256,
  "dev": "A",
  "gyr_x": 7.77,
  "gyr_y": -66.85,
  "gyr_z": 24.15,
  "sample": -8067240,
  "time": 3.1559999999999997
}, {
  "acc_x": -1118.008,
  "acc_y": 380.884,
  "acc_z": 21.716,
  "angle": -1.2083509665613136e+238,
  "dev": "A",
  "gyr_x": -4.97,
  "gyr_y": -84.63,
  "gyr_z": 41.23,
  "sample": -1.2083509135416582e+238,
  "time": 3.175
}, {
  "acc_x": -1061.888,
  "acc_y": 420.168,
  "acc_z": -191.601,
  "angle": 0,
  "dev": "A",
  "gyr_x": 4.2,
  "gyr_y": -102.69,
  "gyr_z": 60.06,
  "sample": 0,
  "time": 3.1949999999999994
}, {
  "acc_x": -1523.414,
  "acc_y": 252.662,
  "acc_z": 77.531,
  "angle": 0,
  "dev": "B",
  "gyr_x": 48.93,
  "gyr_y": 12.74,
  "gyr_z": -114.24,
  "sample": 0,
  "time": 3.1689999999999996
}, {
  "acc_x": -1128.805,
  "acc_y": 342.576,
  "acc_z": -478.667,
  "angle": 1.2084360445527925e+238,
  "dev": "A",
  "gyr_x": 12.46,
  "gyr_y": -102.2,
  "gyr_z": 77.42,
  "sample": -9.013330333170297e+83,
  "time": 3.2139999999999995
}, {
  "acc_x": -1410.442,
  "acc_y": 247.599,
  "acc_z": -50.142,
  "angle": 0,
  "dev": "B",
  "gyr_x": 65.1,
  "gyr_y": 19.18,
  "gyr_z": -120.4,
  "sample": 1.0430582726606727e+161,
  "time": 3.188999999999999
}, {
  "acc_x": -1285.331,
  "acc_y": -66.795,
  "acc_z": -397.964,
  "angle": 1.2079659420701061e+238,
  "dev": "B",
  "gyr_x": 69.58,
  "gyr_y": 30.52,
  "gyr_z": -125.16,
  "sample": -9.0133303331703e+83,
  "time": 3.2079999999999993
}, {
  "acc_x": -1118.862,
  "acc_y": -456.341,
  "acc_z": -393.267,
  "angle": 0,
  "dev": "B",
  "gyr_x": 53.76,
  "gyr_y": 40.25,
  "gyr_z": -125.72,
  "sample": -1.2083509135416589e+238,
  "time": 3.2269999999999994
}, {
  "acc_x": -871.202,
  "acc_y": -376.98,
  "acc_z": -274.439,
  "angle": -1.0819345257688901e+161,
  "dev": "B",
  "gyr_x": 36.96,
  "gyr_y": 40.6,
  "gyr_z": -111.09,
  "sample": -1.0819344799097003e+161,
  "time": 3.2459999999999996
}, {
  "acc_x": -1220.61,
  "acc_y": 135.176,
  "acc_z": -510.326,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.09,
  "gyr_y": -92.89,
  "gyr_z": 82.81,
  "sample": -1.2082049768409824e+238,
  "time": 3.233999999999999
}, {
  "acc_x": -1194.563,
  "acc_y": 80.032,
  "acc_z": -444.141,
  "angle": 1.2079659420702727e+238,
  "dev": "A",
  "gyr_x": -15.82,
  "gyr_y": -81.97,
  "gyr_z": 80.08,
  "sample": -9.0133303331703e+83,
  "time": 3.2540000000000004
}, {
  "acc_x": -1159.793,
  "acc_y": 39.406,
  "acc_z": -385.215,
  "angle": 0,
  "dev": "A",
  "gyr_x": -38.43,
  "gyr_y": -73.36,
  "gyr_z": 75.18,
  "sample": 0,
  "time": 3.2730000000000006
}, {
  "acc_x": -695.522,
  "acc_y": -593.652,
  "acc_z": -368.928,
  "angle": 0,
  "dev": "B",
  "gyr_x": 14.49,
  "gyr_y": 36.75,
  "gyr_z": -80.71,
  "sample": 1.0426501389872858e+161,
  "time": 3.2670000000000003
}, {
  "acc_x": -573.278,
  "acc_y": -1044.198,
  "acc_z": -446.947,
  "angle": 0,
  "dev": "B",
  "gyr_x": -11.13,
  "gyr_y": 27.72,
  "gyr_z": -52.99,
  "sample": 0,
  "time": 3.2860000000000005
}, {
  "acc_x": -423.34,
  "acc_y": -1006.927,
  "acc_z": -517.89,
  "angle": 0,
  "dev": "B",
  "gyr_x": 2.24,
  "gyr_y": 9.8,
  "gyr_z": -27.44,
  "sample": -1.0429928425579754e+161,
  "time": 3.3050000000000006
}, {
  "acc_x": -1187.182,
  "acc_y": 25.071,
  "acc_z": -369.111,
  "angle": 0,
  "dev": "A",
  "gyr_x": -52.08,
  "gyr_y": -65.1,
  "gyr_z": 68.53,
  "sample": 0,
  "time": 3.291999999999999
}, {
  "acc_x": -1125.938,
  "acc_y": 84.79,
  "acc_z": -417.301,
  "angle": 0,
  "dev": "A",
  "gyr_x": -64.4,
  "gyr_y": -53.76,
  "gyr_z": 59.64,
  "sample": 0,
  "time": 3.3120000000000003
}, {
  "acc_x": -402.539,
  "acc_y": -255.956,
  "acc_z": -298.961,
  "angle": -1.0819345258389132e+161,
  "dev": "B",
  "gyr_x": 36.4,
  "gyr_y": -6.58,
  "gyr_z": -0.28,
  "sample": -1.0819344799097008e+161,
  "time": 3.323999999999999
}, {
  "acc_x": -1044.625,
  "acc_y": 21.289,
  "acc_z": -458.232,
  "angle": 0,
  "dev": "A",
  "gyr_x": -69.58,
  "gyr_y": -39.69,
  "gyr_z": 54.6,
  "sample": 0,
  "time": 3.3310000000000004
}, {
  "acc_x": -958.005,
  "acc_y": -41.114,
  "acc_z": -416.752,
  "angle": 0,
  "dev": "A",
  "gyr_x": -69.51,
  "gyr_y": -32.97,
  "gyr_z": 51.1,
  "sample": 1.0433339371917131e+161,
  "time": 3.3500000000000005
}, {
  "acc_x": -249.185,
  "acc_y": -216.55,
  "acc_z": 61.976,
  "angle": 0,
  "dev": "B",
  "gyr_x": 69.93,
  "gyr_y": -16.45,
  "gyr_z": 43.75,
  "sample": 8067716,
  "time": 3.3440000000000003
}, {
  "acc_x": -263.337,
  "acc_y": -339.587,
  "acc_z": -52.094,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.62,
  "gyr_y": -22.4,
  "gyr_z": 81.69,
  "sample": 1.2535304320420844e+238,
  "time": 3.3630000000000004
}, {
  "acc_x": -876.814,
  "acc_y": -104.615,
  "acc_z": -371.368,
  "angle": 0,
  "dev": "A",
  "gyr_x": -64.89,
  "gyr_y": -30.94,
  "gyr_z": 48.02,
  "sample": 0,
  "time": 3.37
}, {
  "acc_x": -381.86,
  "acc_y": -587.613,
  "acc_z": -223.077,
  "angle": 0,
  "dev": "B",
  "gyr_x": -23.94,
  "gyr_y": -19.95,
  "gyr_z": 114.45,
  "sample": -1.0439726851614961e+161,
  "time": 3.3820000000000006
}, {
  "acc_x": -531.981,
  "acc_y": -542.778,
  "acc_z": -367.22,
  "angle": -1.0819345258386794e+161,
  "dev": "B",
  "gyr_x": -55.72,
  "gyr_y": -17.57,
  "gyr_z": 137.55,
  "sample": -1.0819344799097013e+161,
  "time": 3.400999999999999
}, {
  "acc_x": -824.476,
  "acc_y": -33.367,
  "acc_z": -378.993,
  "angle": 0,
  "dev": "A",
  "gyr_x": -52.22,
  "gyr_y": -25.62,
  "gyr_z": 48.16,
  "sample": 0,
  "time": 3.3899999999999997
}, {
  "acc_x": -792.817,
  "acc_y": 48.556,
  "acc_z": -405.711,
  "angle": 0,
  "dev": "A",
  "gyr_x": -32.34,
  "gyr_y": -15.68,
  "gyr_z": 51.1,
  "sample": 0,
  "time": 3.409
}, {
  "acc_x": -606.279,
  "acc_y": -405.406,
  "acc_z": -283.833,
  "angle": 1.208436044517316e+238,
  "dev": "B",
  "gyr_x": -55.79,
  "gyr_y": -27.44,
  "gyr_z": 151.97,
  "sample": 1.2084359915331185e+238,
  "time": 3.4219999999999997
}, {
  "acc_x": -759.755,
  "acc_y": 49.288,
  "acc_z": -447.984,
  "angle": -1.2528150848920624e+238,
  "dev": "A",
  "gyr_x": -8.68,
  "gyr_y": -3.99,
  "gyr_z": 53.83,
  "sample": -1.2528150317051524e+238,
  "time": 3.4289999999999994
}, {
  "acc_x": -697.108,
  "acc_y": 100.65,
  "acc_z": -442.433,
  "angle": 0,
  "dev": "A",
  "gyr_x": 8.12,
  "gyr_y": 5.95,
  "gyr_z": 53.55,
  "sample": 0,
  "time": 3.4479999999999995
}, {
  "acc_x": -687.836,
  "acc_y": 192.638,
  "acc_z": -328.363,
  "angle": 0,
  "dev": "A",
  "gyr_x": 13.37,
  "gyr_y": 15.82,
  "gyr_z": 49.07,
  "sample": 0,
  "time": 3.4669999999999996
}, {
  "acc_x": -608.536,
  "acc_y": -358.863,
  "acc_z": -282.369,
  "angle": 0,
  "dev": "B",
  "gyr_x": -60.83,
  "gyr_y": -42.07,
  "gyr_z": 165.69,
  "sample": 0,
  "time": 3.441
}, {
  "acc_x": -706.746,
  "acc_y": -463.295,
  "acc_z": -369.843,
  "angle": 0,
  "dev": "B",
  "gyr_x": -80.85,
  "gyr_y": -53.13,
  "gyr_z": 180.53,
  "sample": 0,
  "time": 3.46
}, {
  "acc_x": -756.522,
  "acc_y": -535.519,
  "acc_z": -403.271,
  "angle": 0,
  "dev": "B",
  "gyr_x": -88.55,
  "gyr_y": -63.7,
  "gyr_z": 193.41,
  "sample": 0,
  "time": 3.479
}, {
  "acc_x": -873.337,
  "acc_y": -454.206,
  "acc_z": -396.439,
  "angle": 0,
  "dev": "B",
  "gyr_x": -83.51,
  "gyr_y": -75.6,
  "gyr_z": 202.09,
  "sample": 0,
  "time": 3.4989999999999997
}, {
  "acc_x": -959.469,
  "acc_y": -453.535,
  "acc_z": -477.63,
  "angle": -1.2528150848875466e+238,
  "dev": "B",
  "gyr_x": -74.97,
  "gyr_y": -84.98,
  "gyr_z": 208.53,
  "sample": -1.2528150317051534e+238,
  "time": 3.518
}, {
  "acc_x": -695.095,
  "acc_y": 206.424,
  "acc_z": -288.164,
  "angle": -1.0819345258379122e+161,
  "dev": "A",
  "gyr_x": -0.35,
  "gyr_y": 27.58,
  "gyr_z": 39.2,
  "sample": -1.0819344799097015e+161,
  "time": 3.486999999999999
}, {
  "acc_x": -730.231,
  "acc_y": 231.129,
  "acc_z": -264.862,
  "angle": -1.0819345258393088e+161,
  "dev": "A",
  "gyr_x": -16.8,
  "gyr_y": 41.51,
  "gyr_z": 28.49,
  "sample": -1.252815031705153e+238,
  "time": 3.5059999999999993
}, {
  "acc_x": -732.305,
  "acc_y": 204.716,
  "acc_z": -258.091,
  "angle": 0,
  "dev": "A",
  "gyr_x": -39.27,
  "gyr_y": 47.6,
  "gyr_z": 14.7,
  "sample": -1.25282372580647e+238,
  "time": 3.525999999999999
}, {
  "acc_x": -897.493,
  "acc_y": -388.265,
  "acc_z": -328.729,
  "angle": -8075392.34256,
  "dev": "B",
  "gyr_x": -51.31,
  "gyr_y": -96.25,
  "gyr_z": 216.79,
  "sample": 0,
  "time": 3.537
}, {
  "acc_x": -722.911,
  "acc_y": 107.421,
  "acc_z": -197.64,
  "angle": 0,
  "dev": "A",
  "gyr_x": -58.94,
  "gyr_y": 45.22,
  "gyr_z": -0.14,
  "sample": 0,
  "time": 3.5460000000000003
}, {
  "acc_x": -934.703,
  "acc_y": -316.895,
  "acc_z": -74.542,
  "angle": 0,
  "dev": "B",
  "gyr_x": -36.75,
  "gyr_y": -93.66,
  "gyr_z": 225.54,
  "sample": 0,
  "time": 3.5569999999999995
}, {
  "acc_x": -1055.727,
  "acc_y": -269.254,
  "acc_z": -161.711,
  "angle": 1.2079659420730372e+238,
  "dev": "B",
  "gyr_x": -52.22,
  "gyr_y": -74.76,
  "gyr_z": 227.15,
  "sample": 1.207965889054771e+238,
  "time": 3.576999999999999
}, {
  "acc_x": -1138.748,
  "acc_y": -274.988,
  "acc_z": -217.831,
  "angle": 0,
  "dev": "B",
  "gyr_x": -58.52,
  "gyr_y": -62.44,
  "gyr_z": 225.75,
  "sample": 1.0825501664498455e+161,
  "time": 3.595999999999999
}, {
  "acc_x": -1143.506,
  "acc_y": -260.897,
  "acc_z": -120.231,
  "angle": 0,
  "dev": "B",
  "gyr_x": -46.06,
  "gyr_y": -55.44,
  "gyr_z": 223.79,
  "sample": 0,
  "time": 3.6149999999999993
}, {
  "acc_x": -1108.431,
  "acc_y": -93.696,
  "acc_z": -104.554,
  "angle": 12565872452934912,
  "dev": "B",
  "gyr_x": -32.13,
  "gyr_y": -42.7,
  "gyr_z": 212.31,
  "sample": 1.20843599153312e+238,
  "time": 3.6339999999999995
}, {
  "acc_x": -755.973,
  "acc_y": 141.154,
  "acc_z": -171.898,
  "angle": 0,
  "dev": "A",
  "gyr_x": -70,
  "gyr_y": 45.57,
  "gyr_z": -14.28,
  "sample": 1.0440418694504155e+161,
  "time": 3.5650000000000004
}, {
  "acc_x": -850.035,
  "acc_y": 162.626,
  "acc_z": -122.915,
  "angle": 0,
  "dev": "A",
  "gyr_x": -83.79,
  "gyr_y": 44.73,
  "gyr_z": -27.02,
  "sample": 1.0825517753867967e+161,
  "time": 3.5840000000000005
}, {
  "acc_x": -875.777,
  "acc_y": 243.695,
  "acc_z": 71.187,
  "angle": 0,
  "dev": "A",
  "gyr_x": -88.34,
  "gyr_y": 29.82,
  "gyr_z": -38.5,
  "sample": 0,
  "time": 3.604
}, {
  "acc_x": -913.17,
  "acc_y": 372.039,
  "acc_z": 132.553,
  "angle": -1.2528150848920531e+238,
  "dev": "A",
  "gyr_x": -75.32,
  "gyr_y": 15.61,
  "gyr_z": -43.19,
  "sample": -1.2528150317051538e+238,
  "time": 3.623
}, {
  "acc_x": -959.347,
  "acc_y": 599.142,
  "acc_z": 183.061,
  "angle": 0,
  "dev": "A",
  "gyr_x": -60.13,
  "gyr_y": 14.21,
  "gyr_z": -36.05,
  "sample": 0,
  "time": 3.643
}, {
  "acc_x": -1066.402,
  "acc_y": 14.213,
  "acc_z": -79.3,
  "angle": 0,
  "dev": "B",
  "gyr_x": -25.83,
  "gyr_y": -28.21,
  "gyr_z": 190.47,
  "sample": 0,
  "time": 3.653999999999999
}, {
  "acc_x": -1007.537,
  "acc_y": 26.413,
  "acc_z": -146.705,
  "angle": 1.208436044517316e+238,
  "dev": "B",
  "gyr_x": -15.33,
  "gyr_y": -17.01,
  "gyr_z": 160.65,
  "sample": 1.2084359915331203e+238,
  "time": 3.672999999999999
}, {
  "acc_x": -915.122,
  "acc_y": 61.61,
  "acc_z": -140.666,
  "angle": 0,
  "dev": "B",
  "gyr_x": -0.21,
  "gyr_y": -7.84,
  "gyr_z": 119.91,
  "sample": 0,
  "time": 3.6930000000000005
}, {
  "acc_x": -953.857,
  "acc_y": 758.352,
  "acc_z": 232.471,
  "angle": 0,
  "dev": "A",
  "gyr_x": -52.22,
  "gyr_y": 10.36,
  "gyr_z": -20.58,
  "sample": 0,
  "time": 3.6629999999999994
}, {
  "acc_x": -978.379,
  "acc_y": 820.938,
  "acc_z": 255.773,
  "angle": 7784660.3415,
  "dev": "A",
  "gyr_x": -37.17,
  "gyr_y": 9.94,
  "gyr_z": -3.36,
  "sample": 7784660,
  "time": 3.6819999999999995
}, {
  "acc_x": -968.985,
  "acc_y": 743.895,
  "acc_z": 0.366,
  "angle": 7784660.34148,
  "dev": "A",
  "gyr_x": -37.94,
  "gyr_y": 20.09,
  "gyr_z": 12.39,
  "sample": 7784660,
  "time": 3.701999999999999
}, {
  "acc_x": -864.553,
  "acc_y": 571.265,
  "acc_z": 17.69,
  "angle": 0,
  "dev": "A",
  "gyr_x": -25.06,
  "gyr_y": 19.6,
  "gyr_z": 28.49,
  "sample": 0,
  "time": 3.720999999999999
}, {
  "acc_x": -753.167,
  "acc_y": 486.048,
  "acc_z": -16.226,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.68,
  "gyr_y": 9.17,
  "gyr_z": 39.83,
  "sample": 1.043058272660676e+161,
  "time": 3.7399999999999993
}, {
  "acc_x": -868.03,
  "acc_y": 366.671,
  "acc_z": -156.221,
  "angle": 8078188.34258,
  "dev": "A",
  "gyr_x": 17.01,
  "gyr_y": 17.64,
  "gyr_z": 42.21,
  "sample": 7780376,
  "time": 3.759999999999999
}, {
  "acc_x": -887.001,
  "acc_y": 181.353,
  "acc_z": -95.038,
  "angle": 1.207965942074585e+238,
  "dev": "B",
  "gyr_x": 17.36,
  "gyr_y": -0.7,
  "gyr_z": 71.47,
  "sample": 0,
  "time": 3.711999999999999
}, {
  "acc_x": -907.497,
  "acc_y": -7.808,
  "acc_z": -88.694,
  "angle": 7780376.3415,
  "dev": "B",
  "gyr_x": 20.58,
  "gyr_y": 6.93,
  "gyr_z": 17.85,
  "sample": 7780376,
  "time": 3.732
}, {
  "acc_x": -908.473,
  "acc_y": -105.469,
  "acc_z": -144.936,
  "angle": 0,
  "dev": "B",
  "gyr_x": 10.01,
  "gyr_y": 13.37,
  "gyr_z": -33.18,
  "sample": 0,
  "time": 3.7510000000000003
}, {
  "acc_x": -1038.098,
  "acc_y": 154.696,
  "acc_z": -441.457,
  "angle": 1.2079659420707516e+238,
  "dev": "B",
  "gyr_x": 1.12,
  "gyr_y": 21.91,
  "gyr_z": -74.55,
  "sample": 0,
  "time": 3.7700000000000005
}, {
  "acc_x": -974.658,
  "acc_y": 449.326,
  "acc_z": -493.124,
  "angle": -1.2528194319416937e+238,
  "dev": "B",
  "gyr_x": -3.92,
  "gyr_y": 37.59,
  "gyr_z": -96.53,
  "sample": -1.2528193787558139e+238,
  "time": 3.7890000000000006
}, {
  "acc_x": -1591.185,
  "acc_y": 1003.877,
  "acc_z": 732.854,
  "angle": -1.2528194319427116e+238,
  "dev": "B",
  "gyr_x": 34.16,
  "gyr_y": 43.96,
  "gyr_z": -69.16,
  "sample": -1.252819378755814e+238,
  "time": 3.809
}, {
  "acc_x": -1075.308,
  "acc_y": 394.975,
  "acc_z": -317.505,
  "angle": -1.0819345258389132e+161,
  "dev": "A",
  "gyr_x": 23.17,
  "gyr_y": 36.89,
  "gyr_z": 35.07,
  "sample": -1.0819344799097034e+161,
  "time": 3.778999999999999
}, {
  "acc_x": -1219.634,
  "acc_y": 557.906,
  "acc_z": 150.182,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.38,
  "gyr_y": 59.57,
  "gyr_z": 27.93,
  "sample": 0,
  "time": 3.797999999999999
}, {
  "acc_x": -1252.818,
  "acc_y": 1462.536,
  "acc_z": 203.374,
  "angle": 0,
  "dev": "A",
  "gyr_x": -19.46,
  "gyr_y": 67.62,
  "gyr_z": 7.63,
  "sample": -1.0429928425579784e+161,
  "time": 3.819
}, {
  "acc_x": -1321.443,
  "acc_y": 152.622,
  "acc_z": -57.584,
  "angle": 9.343180706941395e+83,
  "dev": "B",
  "gyr_x": 35.21,
  "gyr_y": 32.48,
  "gyr_z": -68.74,
  "sample": 9.343180310255322e+83,
  "time": 3.8280000000000003
}, {
  "acc_x": -1236.897,
  "acc_y": -423.096,
  "acc_z": 52.155,
  "angle": 9.35271271169373e+83,
  "dev": "B",
  "gyr_x": -81.27,
  "gyr_y": 47.25,
  "gyr_z": -103.67,
  "sample": 9.352712315041339e+83,
  "time": 3.848
}, {
  "acc_x": -1248.67,
  "acc_y": 372.649,
  "acc_z": -444.873,
  "angle": -1.2528194319427116e+238,
  "dev": "A",
  "gyr_x": -66.99,
  "gyr_y": 58.24,
  "gyr_z": -16.59,
  "sample": 9.352689156623489e+83,
  "time": 3.838
}, {
  "acc_x": -762.317,
  "acc_y": -595.543,
  "acc_z": -323.727,
  "angle": 7784660.34151,
  "dev": "A",
  "gyr_x": -25.9,
  "gyr_y": 43.68,
  "gyr_z": -14,
  "sample": 7784660,
  "time": 3.857
}, {
  "acc_x": -902.8,
  "acc_y": -251.32,
  "acc_z": -461.709,
  "angle": 1.2079659420707516e+238,
  "dev": "B",
  "gyr_x": -92.33,
  "gyr_y": 47.46,
  "gyr_z": -115.36,
  "sample": 0,
  "time": 3.867
}, {
  "acc_x": -623.664,
  "acc_y": 83.143,
  "acc_z": -721.02,
  "angle": 9.352712711727411e+83,
  "dev": "A",
  "gyr_x": -0.21,
  "gyr_y": 40.81,
  "gyr_z": -19.25,
  "sample": 0,
  "time": 3.877
}, {
  "acc_x": -740.479,
  "acc_y": -332.755,
  "acc_z": -706.99,
  "angle": -1.0819345258428131e+161,
  "dev": "A",
  "gyr_x": 17.43,
  "gyr_y": 51.73,
  "gyr_z": -25.55,
  "sample": 0,
  "time": 3.896
}, {
  "acc_x": -945.317,
  "acc_y": -5.307,
  "acc_z": -631.899,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.35,
  "gyr_y": 48.37,
  "gyr_z": -20.16,
  "sample": 0,
  "time": 3.915
}, {
  "acc_x": -855.342,
  "acc_y": -483.425,
  "acc_z": -364.17,
  "angle": 0,
  "dev": "B",
  "gyr_x": -71.96,
  "gyr_y": 44.59,
  "gyr_z": -112.21,
  "sample": 0,
  "time": 3.8869999999999996
}, {
  "acc_x": -815.692,
  "acc_y": -756.156,
  "acc_z": -762.866,
  "angle": 0,
  "dev": "B",
  "gyr_x": -48.65,
  "gyr_y": 44.17,
  "gyr_z": -96.32,
  "sample": -1.2528181367413409e+238,
  "time": 3.9059999999999997
}, {
  "acc_x": -987.346,
  "acc_y": -625.494,
  "acc_z": -373.076,
  "angle": -1.252818189928247e+238,
  "dev": "B",
  "gyr_x": 36.61,
  "gyr_y": 34.58,
  "gyr_z": -69.65,
  "sample": 9.343180310255328e+83,
  "time": 3.925
}, {
  "acc_x": -967.521,
  "acc_y": 258.152,
  "acc_z": -505.751,
  "angle": -1.0819345258435004e+161,
  "dev": "A",
  "gyr_x": 72.31,
  "gyr_y": 42.07,
  "gyr_z": -17.99,
  "sample": -1.0819344799097044e+161,
  "time": 3.9349999999999996
}, {
  "acc_x": -1074.881,
  "acc_y": -43.127,
  "acc_z": 6.039,
  "angle": -1.2528181899251146e+238,
  "dev": "B",
  "gyr_x": 97.3,
  "gyr_y": 21.77,
  "gyr_z": -55.72,
  "sample": -1.2528181367413412e+238,
  "time": 3.944
}, {
  "acc_x": -983.625,
  "acc_y": 251.869,
  "acc_z": -143.655,
  "angle": 0,
  "dev": "B",
  "gyr_x": 83.3,
  "gyr_y": 22.47,
  "gyr_z": -51.24,
  "sample": 0,
  "time": 3.9639999999999995
}, {
  "acc_x": -802.882,
  "acc_y": 318.481,
  "acc_z": -543.51,
  "angle": 0,
  "dev": "A",
  "gyr_x": 67.41,
  "gyr_y": 33.88,
  "gyr_z": -22.54,
  "sample": 0,
  "time": 3.954999999999999
}, {
  "acc_x": -750.544,
  "acc_y": 332.206,
  "acc_z": -547.048,
  "angle": -1.0819345258434724e+161,
  "dev": "A",
  "gyr_x": 56.07,
  "gyr_y": 32.27,
  "gyr_z": -26.95,
  "sample": 9.352689156623496e+83,
  "time": 3.9739999999999993
}, {
  "acc_x": -929.823,
  "acc_y": 5.734,
  "acc_z": -365.207,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.54,
  "gyr_y": 27.65,
  "gyr_z": -50.96,
  "sample": 0,
  "time": 3.983999999999999
}, {
  "acc_x": -975.024,
  "acc_y": -304.878,
  "acc_z": -491.843,
  "angle": 0,
  "dev": "B",
  "gyr_x": -7.98,
  "gyr_y": 27.02,
  "gyr_z": -46.76,
  "sample": 0,
  "time": 4.002999999999999
}, {
  "acc_x": -761.402,
  "acc_y": 321.043,
  "acc_z": -581.513,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.22,
  "gyr_y": 34.44,
  "gyr_z": -27.86,
  "sample": 0,
  "time": 3.993999999999999
}, {
  "acc_x": -973.682,
  "acc_y": -161.345,
  "acc_z": -401.136,
  "angle": 0,
  "dev": "B",
  "gyr_x": 20.86,
  "gyr_y": 19.53,
  "gyr_z": -40.67,
  "sample": -1.04299284255798e+161,
  "time": 4.021999999999999
}, {
  "acc_x": -775.31,
  "acc_y": 235.643,
  "acc_z": -578.402,
  "angle": 9.352689553273864e+83,
  "dev": "A",
  "gyr_x": 50.61,
  "gyr_y": 35.42,
  "gyr_z": -27.16,
  "sample": 8078188,
  "time": 4.012999999999999
}, {
  "acc_x": -802.882,
  "acc_y": 266.57,
  "acc_z": -586.881,
  "angle": 0,
  "dev": "A",
  "gyr_x": 59.01,
  "gyr_y": 33.74,
  "gyr_z": -21.98,
  "sample": 0,
  "time": 4.031999999999999
}, {
  "acc_x": -977.708,
  "acc_y": 163.541,
  "acc_z": -255.407,
  "angle": 0,
  "dev": "B",
  "gyr_x": 49.28,
  "gyr_y": 15.33,
  "gyr_z": -35.07,
  "sample": 0,
  "time": 4.041999999999999
}, {
  "acc_x": -815.082,
  "acc_y": 325.801,
  "acc_z": -549.549,
  "angle": 0,
  "dev": "A",
  "gyr_x": 68.74,
  "gyr_y": 27.93,
  "gyr_z": -17.22,
  "sample": 1.2535304320420892e+238,
  "time": 4.0520000000000005
}, {
  "acc_x": -844.301,
  "acc_y": 316.224,
  "acc_z": -523.136,
  "angle": 0,
  "dev": "A",
  "gyr_x": 70.28,
  "gyr_y": 22.68,
  "gyr_z": -17.71,
  "sample": 0,
  "time": 4.071000000000001
}, {
  "acc_x": -1004.853,
  "acc_y": 11.224,
  "acc_z": -287.371,
  "angle": 0,
  "dev": "B",
  "gyr_x": 33.39,
  "gyr_y": 13.65,
  "gyr_z": -33.95,
  "sample": -1.252818136741342e+238,
  "time": 4.060999999999999
}, {
  "acc_x": -977.098,
  "acc_y": -189.405,
  "acc_z": -358.07,
  "angle": 1.2538496829496715e+238,
  "dev": "B",
  "gyr_x": 9.52,
  "gyr_y": 9.38,
  "gyr_z": -32.9,
  "sample": 1.2538496297618668e+238,
  "time": 4.079999999999999
}, {
  "acc_x": -807.579,
  "acc_y": 282.857,
  "acc_z": -481.046,
  "angle": -9.179937019492302e+83,
  "dev": "A",
  "gyr_x": 66.78,
  "gyr_y": 17.43,
  "gyr_z": -21,
  "sample": -9.179936622848566e+83,
  "time": 4.092
}, {
  "acc_x": -986.736,
  "acc_y": -159.332,
  "acc_z": -273.951,
  "angle": 0,
  "dev": "B",
  "gyr_x": 15.33,
  "gyr_y": 5.39,
  "gyr_z": -29.19,
  "sample": 1.0430582726606786e+161,
  "time": 4.098999999999999
}, {
  "acc_x": -965.508,
  "acc_y": -51.667,
  "acc_z": -249.185,
  "angle": -9.179937019541339e+83,
  "dev": "B",
  "gyr_x": 30.31,
  "gyr_y": 2.1,
  "gyr_z": -24.92,
  "sample": -9.17993662284857e+83,
  "time": 4.12
}, {
  "acc_x": -828.929,
  "acc_y": 263.703,
  "acc_z": -492.026,
  "angle": 0,
  "dev": "A",
  "gyr_x": 63.21,
  "gyr_y": 12.95,
  "gyr_z": -24.5,
  "sample": 0,
  "time": 4.111
}, {
  "acc_x": -821.792,
  "acc_y": 274.744,
  "acc_z": -480.619,
  "angle": 0,
  "dev": "A",
  "gyr_x": 63.28,
  "gyr_y": 6.93,
  "gyr_z": -26.53,
  "sample": 0,
  "time": 4.13
}, {
  "acc_x": -966.118,
  "acc_y": -60.939,
  "acc_z": -258.762,
  "angle": 1.2079659420707516e+238,
  "dev": "B",
  "gyr_x": 30.73,
  "gyr_y": 0.56,
  "gyr_z": -22.96,
  "sample": 1.2079658890547751e+238,
  "time": 4.139
}, {
  "acc_x": -804.773,
  "acc_y": 313.418,
  "acc_z": -472.506,
  "angle": 0,
  "dev": "A",
  "gyr_x": 63.84,
  "gyr_y": -0.91,
  "gyr_z": -27.37,
  "sample": 0,
  "time": 4.1499999999999995
}, {
  "acc_x": -815.753,
  "acc_y": 309.331,
  "acc_z": -483.791,
  "angle": 1.207965942071057e+238,
  "dev": "A",
  "gyr_x": 66.57,
  "gyr_y": -7.42,
  "gyr_z": -26.39,
  "sample": 1.207965889054775e+238,
  "time": 4.169
}, {
  "acc_x": -800.808,
  "acc_y": 285.968,
  "acc_z": -422.669,
  "angle": 0,
  "dev": "A",
  "gyr_x": 71.61,
  "gyr_y": -11.62,
  "gyr_z": -25.13,
  "sample": 0,
  "time": 4.188
}, {
  "acc_x": -816.18,
  "acc_y": 302.011,
  "acc_z": -460.123,
  "angle": 0,
  "dev": "A",
  "gyr_x": 76.44,
  "gyr_y": -11.06,
  "gyr_z": -24.15,
  "sample": 0,
  "time": 4.207999999999999
}, {
  "acc_x": -950.014,
  "acc_y": -71.004,
  "acc_z": -312.747,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.98,
  "gyr_y": 1.61,
  "gyr_z": -22.54,
  "sample": 0,
  "time": 4.158
}, {
  "acc_x": -782.996,
  "acc_y": 345.443,
  "acc_z": -428.525,
  "angle": -9.324024063662274e+83,
  "dev": "A",
  "gyr_x": 73.43,
  "gyr_y": -6.79,
  "gyr_z": -23.87,
  "sample": 0,
  "time": 4.227999999999999
}, {
  "acc_x": -791.231,
  "acc_y": 318.603,
  "acc_z": -402.356,
  "angle": 0,
  "dev": "A",
  "gyr_x": 69.65,
  "gyr_y": -7.91,
  "gyr_z": -24.99,
  "sample": 9.008138215888953e+83,
  "time": 4.246999999999999
}, {
  "acc_x": -805.932,
  "acc_y": 331.169,
  "acc_z": -383.995,
  "angle": 9.352689553267238e+83,
  "dev": "A",
  "gyr_x": 63.56,
  "gyr_y": -8.47,
  "gyr_z": -26.25,
  "sample": 9.352689156623512e+83,
  "time": 4.267
}, {
  "acc_x": -948.672,
  "acc_y": -6.039,
  "acc_z": -287.92,
  "angle": -8075400.34258,
  "dev": "B",
  "gyr_x": 37.17,
  "gyr_y": 3.64,
  "gyr_z": -21.56,
  "sample": 0,
  "time": 4.1770000000000005
}, {
  "acc_x": -912.987,
  "acc_y": -18.3,
  "acc_z": -307.989,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.71,
  "gyr_y": 4.55,
  "gyr_z": -22.47,
  "sample": 1.0430582726606792e+161,
  "time": 4.197
}, {
  "acc_x": -950.197,
  "acc_y": 31.293,
  "acc_z": -267.424,
  "angle": 0,
  "dev": "B",
  "gyr_x": 44.24,
  "gyr_y": 8.68,
  "gyr_z": -23.45,
  "sample": 0,
  "time": 4.216
}, {
  "acc_x": -912.072,
  "acc_y": 60.634,
  "acc_z": -281.759,
  "angle": 9.349141683659633e+83,
  "dev": "B",
  "gyr_x": 47.18,
  "gyr_y": 11.34,
  "gyr_z": -24.85,
  "sample": 9.349141287009282e+83,
  "time": 4.235
}, {
  "acc_x": -920.978,
  "acc_y": -34.648,
  "acc_z": -239.669,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.95,
  "gyr_y": 10.85,
  "gyr_z": -26.88,
  "sample": 0,
  "time": 4.2540000000000004
}, {
  "acc_x": -936.838,
  "acc_y": 31.842,
  "acc_z": -276.025,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.15,
  "gyr_y": 10.43,
  "gyr_z": -29.68,
  "sample": 0,
  "time": 4.2749999999999995
}, {
  "acc_x": -926.346,
  "acc_y": 89.67,
  "acc_z": -313.479,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.32,
  "gyr_y": 11.13,
  "gyr_z": -32.83,
  "sample": -9.01807780882909e+83,
  "time": 4.294
}, {
  "acc_x": -908.473,
  "acc_y": 13.969,
  "acc_z": -290.238,
  "angle": -1.2528181899289873e+238,
  "dev": "B",
  "gyr_x": 40.88,
  "gyr_y": 11.69,
  "gyr_z": -36.19,
  "sample": -1.252818136741344e+238,
  "time": 4.313
}, {
  "acc_x": -947.574,
  "acc_y": -54.412,
  "acc_z": -237.961,
  "angle": 9.352689553275883e+83,
  "dev": "B",
  "gyr_x": 34.58,
  "gyr_y": 11.83,
  "gyr_z": -40.04,
  "sample": 9.352689156623519e+83,
  "time": 4.332999999999999
}, {
  "acc_x": -814.35,
  "acc_y": 309.453,
  "acc_z": -376.858,
  "angle": 9.352689553301799e+83,
  "dev": "A",
  "gyr_x": 55.72,
  "gyr_y": -4.9,
  "gyr_z": -26.53,
  "sample": 9.352689156623513e+83,
  "time": 4.2860000000000005
}, {
  "acc_x": -816.363,
  "acc_y": 300.303,
  "acc_z": -382.836,
  "angle": 0,
  "dev": "A",
  "gyr_x": 51.38,
  "gyr_y": -4.27,
  "gyr_z": -25.41,
  "sample": -7784140,
  "time": 4.305000000000001
}, {
  "acc_x": -810.202,
  "acc_y": 319.457,
  "acc_z": -389.546,
  "angle": 0,
  "dev": "A",
  "gyr_x": 49,
  "gyr_y": -4.27,
  "gyr_z": -23.24,
  "sample": 0,
  "time": 4.325
}, {
  "acc_x": -957.09,
  "acc_y": 17.873,
  "acc_z": -235.765,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.72,
  "gyr_y": 11.69,
  "gyr_z": -45.08,
  "sample": 0,
  "time": 4.351999999999999
}, {
  "acc_x": -977.769,
  "acc_y": 42.578,
  "acc_z": -262.605,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.93,
  "gyr_y": 11.76,
  "gyr_z": -50.89,
  "sample": 0,
  "time": 4.3709999999999996
}, {
  "acc_x": -970.998,
  "acc_y": 38.552,
  "acc_z": -237.717,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.75,
  "gyr_y": 11.2,
  "gyr_z": -56.7,
  "sample": 0,
  "time": 4.39
}, {
  "acc_x": -842.715,
  "acc_y": 328.973,
  "acc_z": -372.954,
  "angle": 9.352689553271983e+83,
  "dev": "A",
  "gyr_x": 47.04,
  "gyr_y": -4.2,
  "gyr_z": -21.63,
  "sample": 9.352689156623517e+83,
  "time": 4.344
}, {
  "acc_x": -840.336,
  "acc_y": 356.179,
  "acc_z": -380.945,
  "angle": 0,
  "dev": "A",
  "gyr_x": 47.74,
  "gyr_y": -6.79,
  "gyr_z": -20.16,
  "sample": 0,
  "time": 4.363
}, {
  "acc_x": -833.748,
  "acc_y": 357.765,
  "acc_z": -375.211,
  "angle": 0,
  "dev": "A",
  "gyr_x": 49,
  "gyr_y": -8.96,
  "gyr_z": -16.94,
  "sample": 0,
  "time": 4.3839999999999995
}, {
  "acc_x": -847.412,
  "acc_y": 329.156,
  "acc_z": -373.442,
  "angle": 9.353847474159612e+83,
  "dev": "A",
  "gyr_x": 41.09,
  "gyr_y": -7.49,
  "gyr_z": -14.14,
  "sample": 9.353847077515893e+83,
  "time": 4.403
}, {
  "acc_x": -1000.034,
  "acc_y": -47.458,
  "acc_z": -224.785,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.15,
  "gyr_y": 11.69,
  "gyr_z": -63,
  "sample": 0,
  "time": 4.4110000000000005
}, {
  "acc_x": -869.311,
  "acc_y": 332.084,
  "acc_z": -373.625,
  "angle": 0,
  "dev": "A",
  "gyr_x": 34.23,
  "gyr_y": -8.89,
  "gyr_z": -12.88,
  "sample": -9.353207905183304e+83,
  "time": 4.422
}, {
  "acc_x": -1016.87,
  "acc_y": -66.978,
  "acc_z": -200.263,
  "angle": 0,
  "dev": "B",
  "gyr_x": 20.86,
  "gyr_y": 11.62,
  "gyr_z": -69.3,
  "sample": 0,
  "time": 4.430000000000001
}, {
  "acc_x": -1041.453,
  "acc_y": -62.22,
  "acc_z": -226.432,
  "angle": 0,
  "dev": "B",
  "gyr_x": 19.32,
  "gyr_y": 11.83,
  "gyr_z": -75.53,
  "sample": 0,
  "time": 4.448999999999999
}, {
  "acc_x": -918.721,
  "acc_y": 405.894,
  "acc_z": -358.558,
  "angle": 0,
  "dev": "A",
  "gyr_x": 30.17,
  "gyr_y": -13.86,
  "gyr_z": -13.51,
  "sample": 0,
  "time": 4.441999999999999
}, {
  "acc_x": -942.633,
  "acc_y": 489.769,
  "acc_z": -373.808,
  "angle": 0,
  "dev": "A",
  "gyr_x": 25.97,
  "gyr_y": -18.48,
  "gyr_z": -14.14,
  "sample": 1.0426501389872932e+161,
  "time": 4.460999999999999
}, {
  "acc_x": -1100.501,
  "acc_y": -87.108,
  "acc_z": -267.973,
  "angle": 1.0831262118107274e+161,
  "dev": "B",
  "gyr_x": 18.27,
  "gyr_y": 10.92,
  "gyr_z": -81.83,
  "sample": 1.0831261658785214e+161,
  "time": 4.467999999999999
}, {
  "acc_x": -971.669,
  "acc_y": 557.662,
  "acc_z": -344.223,
  "angle": 0,
  "dev": "A",
  "gyr_x": 22.4,
  "gyr_y": -19.95,
  "gyr_z": -12.32,
  "sample": 0,
  "time": 4.4799999999999995
}, {
  "acc_x": -1037.671,
  "acc_y": 601.643,
  "acc_z": -319.64,
  "angle": 0,
  "dev": "A",
  "gyr_x": 7.98,
  "gyr_y": -17.08,
  "gyr_z": -7.42,
  "sample": 0,
  "time": 4.499999999999999
}, {
  "acc_x": -1006.317,
  "acc_y": 639.89,
  "acc_z": -208.803,
  "angle": -9.179937019497047e+83,
  "dev": "A",
  "gyr_x": -6.16,
  "gyr_y": -19.25,
  "gyr_z": -1.05,
  "sample": 0,
  "time": 4.5200000000000005
}, {
  "acc_x": -1180.472,
  "acc_y": 11.041,
  "acc_z": -296.948,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.42,
  "gyr_y": 10.99,
  "gyr_z": -87.85,
  "sample": 0,
  "time": 4.488
}, {
  "acc_x": -1257.393,
  "acc_y": 19.398,
  "acc_z": -231.495,
  "angle": -9.179937019492302e+83,
  "dev": "B",
  "gyr_x": 25.06,
  "gyr_y": 10.99,
  "gyr_z": -95.06,
  "sample": 0,
  "time": 4.507000000000001
}, {
  "acc_x": -1354.383,
  "acc_y": 54.534,
  "acc_z": -206.729,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.29,
  "gyr_y": 11.9,
  "gyr_z": -102.9,
  "sample": 0,
  "time": 4.525999999999999
}, {
  "acc_x": -1198.894,
  "acc_y": 539.911,
  "acc_z": -105.957,
  "angle": 1.207965942072866e+238,
  "dev": "A",
  "gyr_x": -1.96,
  "gyr_y": -28.14,
  "gyr_z": 8.61,
  "sample": 1.2079658890547777e+238,
  "time": 4.54
}, {
  "acc_x": -1210.057,
  "acc_y": 520.757,
  "acc_z": -47.214,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.14,
  "gyr_y": -49.84,
  "gyr_z": 22.82,
  "sample": 0,
  "time": 4.559
}, {
  "acc_x": -1122.339,
  "acc_y": 457.622,
  "acc_z": -109.556,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.8,
  "gyr_y": -80.08,
  "gyr_z": 37.87,
  "sample": 0,
  "time": 4.578
}, {
  "acc_x": -1090.07,
  "acc_y": 390.217,
  "acc_z": -157.624,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.58,
  "gyr_y": -100.94,
  "gyr_z": 53.27,
  "sample": 0,
  "time": 4.598
}, {
  "acc_x": -1383.846,
  "acc_y": 116.937,
  "acc_z": -125.294,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.86,
  "gyr_y": 11.9,
  "gyr_z": -111.02,
  "sample": 0,
  "time": 4.546
}, {
  "acc_x": -1475.651,
  "acc_y": 68.381,
  "acc_z": -24.034,
  "angle": -8067236.3426,
  "dev": "B",
  "gyr_x": 37.66,
  "gyr_y": 10.71,
  "gyr_z": -118.86,
  "sample": -8067236,
  "time": 4.566
}, {
  "acc_x": -1476.322,
  "acc_y": 207.034,
  "acc_z": -44.957,
  "angle": 1.20796594207536e+238,
  "dev": "B",
  "gyr_x": 57.26,
  "gyr_y": 14,
  "gyr_z": -121.17,
  "sample": 0,
  "time": 4.585
}, {
  "acc_x": -1298.629,
  "acc_y": 303.414,
  "acc_z": -313.357,
  "angle": 0,
  "dev": "B",
  "gyr_x": 70.77,
  "gyr_y": 22.47,
  "gyr_z": -121.17,
  "sample": -1.2528237258064784e+238,
  "time": 4.604
}, {
  "acc_x": -1222.867,
  "acc_y": -417.667,
  "acc_z": -427.732,
  "angle": 1.2079659420724936e+238,
  "dev": "B",
  "gyr_x": 51.45,
  "gyr_y": 36.33,
  "gyr_z": -124.6,
  "sample": 0,
  "time": 4.623
}, {
  "acc_x": -1111.847,
  "acc_y": 349.408,
  "acc_z": -309.575,
  "angle": -8067236.34259,
  "dev": "A",
  "gyr_x": 12.46,
  "gyr_y": -107.45,
  "gyr_z": 71.82,
  "sample": -8067236,
  "time": 4.617
}, {
  "acc_x": -1225.978,
  "acc_y": 108.275,
  "acc_z": -449.509,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.52,
  "gyr_y": -100.17,
  "gyr_z": 82.04,
  "sample": 0,
  "time": 4.636
}, {
  "acc_x": -1011.746,
  "acc_y": -608.597,
  "acc_z": -446.581,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.03,
  "gyr_y": 42.56,
  "gyr_z": -122.64,
  "sample": 0,
  "time": 4.643
}, {
  "acc_x": -841.861,
  "acc_y": -396.561,
  "acc_z": -245.098,
  "angle": 0,
  "dev": "B",
  "gyr_x": 57.33,
  "gyr_y": 39.76,
  "gyr_z": -98.28,
  "sample": 0,
  "time": 4.662
}, {
  "acc_x": -1179.557,
  "acc_y": 28.182,
  "acc_z": -382.104,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.21,
  "gyr_y": -89.25,
  "gyr_z": 81.76,
  "sample": 0,
  "time": 4.656999999999999
}, {
  "acc_x": -662.948,
  "acc_y": -458.171,
  "acc_z": -291.275,
  "angle": 0,
  "dev": "B",
  "gyr_x": 67.55,
  "gyr_y": 29.47,
  "gyr_z": -61.95,
  "sample": 0,
  "time": 4.681
}, {
  "acc_x": -1122.583,
  "acc_y": 196.542,
  "acc_z": -308.111,
  "angle": 0,
  "dev": "A",
  "gyr_x": -11.83,
  "gyr_y": -79.73,
  "gyr_z": 78.75,
  "sample": 0,
  "time": 4.675999999999999
}, {
  "acc_x": -1175.714,
  "acc_y": 185.257,
  "acc_z": -373.442,
  "angle": 1.083126211799551e+161,
  "dev": "A",
  "gyr_x": -30.66,
  "gyr_y": -66.64,
  "gyr_z": 73.85,
  "sample": 1.0831261658785226e+161,
  "time": 4.694999999999999
}, {
  "acc_x": -568.825,
  "acc_y": -1081.774,
  "acc_z": -392.108,
  "angle": 1.0831262118122598e+161,
  "dev": "B",
  "gyr_x": 36.75,
  "gyr_y": 24.78,
  "gyr_z": -35.42,
  "sample": 1.083126165878523e+161,
  "time": 4.701
}, {
  "acc_x": -580.11,
  "acc_y": -723.704,
  "acc_z": -589.382,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.34,
  "gyr_y": 16.1,
  "gyr_z": -20.23,
  "sample": 0,
  "time": 4.720999999999999
}, {
  "acc_x": -1169.553,
  "acc_y": 180.133,
  "acc_z": -430.538,
  "angle": 0,
  "dev": "A",
  "gyr_x": -55.23,
  "gyr_y": -54.11,
  "gyr_z": 64.54,
  "sample": 1.2535304320420941e+238,
  "time": 4.714999999999999
}, {
  "acc_x": -1116.3,
  "acc_y": 227.835,
  "acc_z": -487.39,
  "angle": 7780408.3415,
  "dev": "A",
  "gyr_x": -74.83,
  "gyr_y": -45.22,
  "gyr_z": 56.7,
  "sample": 7780408,
  "time": 4.733999999999999
}, {
  "acc_x": -1022.97,
  "acc_y": 143.35,
  "acc_z": -473.665,
  "angle": 0,
  "dev": "A",
  "gyr_x": -90.86,
  "gyr_y": -35.63,
  "gyr_z": 50.12,
  "sample": 0,
  "time": 4.752999999999999
}, {
  "acc_x": -464.332,
  "acc_y": -93.025,
  "acc_z": -102.175,
  "angle": -1.0439732672632149e+161,
  "dev": "B",
  "gyr_x": 59.43,
  "gyr_y": -0.28,
  "gyr_z": 8.47,
  "sample": 0,
  "time": 4.739999999999999
}, {
  "acc_x": -334.951,
  "acc_y": -246.806,
  "acc_z": 69.723,
  "angle": 0,
  "dev": "B",
  "gyr_x": 58.1,
  "gyr_y": -10.01,
  "gyr_z": 49.07,
  "sample": 0,
  "time": 4.7589999999999995
}, {
  "acc_x": -922.198,
  "acc_y": -20.923,
  "acc_z": -401.563,
  "angle": 0,
  "dev": "A",
  "gyr_x": -96.18,
  "gyr_y": -31.08,
  "gyr_z": 47.67,
  "sample": 0,
  "time": 4.773000000000001
}, {
  "acc_x": -342.881,
  "acc_y": -457.439,
  "acc_z": -92.781,
  "angle": 0,
  "dev": "B",
  "gyr_x": -26.39,
  "gyr_y": -7.07,
  "gyr_z": 84.49,
  "sample": 0,
  "time": 4.778
}, {
  "acc_x": -449.57,
  "acc_y": -552.172,
  "acc_z": -226.432,
  "angle": 0,
  "dev": "B",
  "gyr_x": -68.39,
  "gyr_y": -12.6,
  "gyr_z": 118.51,
  "sample": 0,
  "time": 4.797999999999999
}, {
  "acc_x": -846.924,
  "acc_y": -102.358,
  "acc_z": -358.192,
  "angle": 0,
  "dev": "A",
  "gyr_x": -91.56,
  "gyr_y": -27.58,
  "gyr_z": 47.95,
  "sample": 0,
  "time": 4.791999999999999
}, {
  "acc_x": -606.401,
  "acc_y": -446.154,
  "acc_z": -224.297,
  "angle": 0,
  "dev": "B",
  "gyr_x": -70.49,
  "gyr_y": -21,
  "gyr_z": 143.22,
  "sample": 0,
  "time": 4.816999999999999
}, {
  "acc_x": -636.535,
  "acc_y": -372.893,
  "acc_z": -154.818,
  "angle": 0,
  "dev": "B",
  "gyr_x": -67.48,
  "gyr_y": -35.91,
  "gyr_z": 158.55,
  "sample": 0,
  "time": 4.836999999999999
}, {
  "acc_x": -809.348,
  "acc_y": -86.681,
  "acc_z": -378.566,
  "angle": 0,
  "dev": "A",
  "gyr_x": -76.86,
  "gyr_y": -22.89,
  "gyr_z": 48.72,
  "sample": 0,
  "time": 4.812
}, {
  "acc_x": -769.088,
  "acc_y": -10.492,
  "acc_z": -430.294,
  "angle": 1.0831262118067255e+161,
  "dev": "A",
  "gyr_x": -49.14,
  "gyr_y": -13.23,
  "gyr_z": 52.57,
  "sample": 1.0831213390676687e+161,
  "time": 4.832
}, {
  "acc_x": -726.571,
  "acc_y": 12.505,
  "acc_z": -421.937,
  "angle": 0,
  "dev": "A",
  "gyr_x": -16.1,
  "gyr_y": -6.58,
  "gyr_z": 57.33,
  "sample": 0,
  "time": 4.851
}, {
  "acc_x": -706.624,
  "acc_y": 102.175,
  "acc_z": -379.725,
  "angle": 1.2092296917996264e+238,
  "dev": "A",
  "gyr_x": 3.08,
  "gyr_y": 0.91,
  "gyr_z": 57.47,
  "sample": 1.209229638781913e+238,
  "time": 4.87
}, {
  "acc_x": -701.744,
  "acc_y": -414.861,
  "acc_z": -234.118,
  "angle": -1.2091533079078797e+238,
  "dev": "B",
  "gyr_x": -74.62,
  "gyr_y": -53.76,
  "gyr_z": 173.74,
  "sample": -1.2091532548917721e+238,
  "time": 4.855999999999999
}, {
  "acc_x": -754.509,
  "acc_y": -493.795,
  "acc_z": -340.929,
  "angle": -1.2091533079123515e+238,
  "dev": "B",
  "gyr_x": -90.58,
  "gyr_y": -66.22,
  "gyr_z": 187.53,
  "sample": -1.2091532548917722e+238,
  "time": 4.876
}, {
  "acc_x": -808.677,
  "acc_y": -489.769,
  "acc_z": -349.286,
  "angle": 1.0831262118107274e+161,
  "dev": "B",
  "gyr_x": -94.99,
  "gyr_y": -79.03,
  "gyr_z": 199.85,
  "sample": 1.0831261658785242e+161,
  "time": 4.8950000000000005
}, {
  "acc_x": -708.515,
  "acc_y": 143.838,
  "acc_z": -293.776,
  "angle": 0,
  "dev": "A",
  "gyr_x": 5.32,
  "gyr_y": 12.25,
  "gyr_z": 52.01,
  "sample": 0,
  "time": 4.89
}, {
  "acc_x": -886.086,
  "acc_y": -488,
  "acc_z": -366.305,
  "angle": 0,
  "dev": "B",
  "gyr_x": -96.74,
  "gyr_y": -89.6,
  "gyr_z": 207.2,
  "sample": 0,
  "time": 4.914000000000001
}, {
  "acc_x": -743.102,
  "acc_y": 191.784,
  "acc_z": -224.419,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.52,
  "gyr_y": 24.64,
  "gyr_z": 41.72,
  "sample": 9.343235890458214e+83,
  "time": 4.909
}, {
  "acc_x": -736.636,
  "acc_y": 149.816,
  "acc_z": -243.695,
  "angle": 0,
  "dev": "A",
  "gyr_x": -22.68,
  "gyr_y": 36.75,
  "gyr_z": 27.16,
  "sample": 0,
  "time": 4.928
}, {
  "acc_x": -869.982,
  "acc_y": -550.22,
  "acc_z": -414.007,
  "angle": 0,
  "dev": "B",
  "gyr_x": -95.55,
  "gyr_y": -96.67,
  "gyr_z": 212.52,
  "sample": -9.353207905183335e+83,
  "time": 4.932999999999999
}, {
  "acc_x": -871.629,
  "acc_y": -557.113,
  "acc_z": -287.371,
  "angle": 1.0831262118084657e+161,
  "dev": "B",
  "gyr_x": -81.48,
  "gyr_y": -101.15,
  "gyr_z": 222.04,
  "sample": 0,
  "time": 4.953
}, {
  "acc_x": -733.586,
  "acc_y": 28.67,
  "acc_z": -304.878,
  "angle": 0,
  "dev": "A",
  "gyr_x": -56.49,
  "gyr_y": 48.65,
  "gyr_z": 9.52,
  "sample": 0,
  "time": 4.948999999999999
}, {
  "acc_x": -740.479,
  "acc_y": -56.181,
  "acc_z": -128.466,
  "angle": 0,
  "dev": "A",
  "gyr_x": -67.34,
  "gyr_y": 44.03,
  "gyr_z": -8.33,
  "sample": 0,
  "time": 4.967999999999999
}, {
  "acc_x": -930.128,
  "acc_y": -463.661,
  "acc_z": -246.928,
  "angle": 0,
  "dev": "B",
  "gyr_x": -62.3,
  "gyr_y": -97.37,
  "gyr_z": 233.94,
  "sample": 0,
  "time": 4.973
}, {
  "acc_x": -1028.033,
  "acc_y": -426.451,
  "acc_z": -237.9,
  "angle": 0,
  "dev": "B",
  "gyr_x": -48.72,
  "gyr_y": -84.42,
  "gyr_z": 243.32,
  "sample": 0,
  "time": 4.992
}, {
  "acc_x": -1098.793,
  "acc_y": -417.911,
  "acc_z": -249.368,
  "angle": 1.0831262118067255e+161,
  "dev": "B",
  "gyr_x": -32.83,
  "gyr_y": -69.02,
  "gyr_z": 243.81,
  "sample": 1.0831261658785249e+161,
  "time": 5.011
}, {
  "acc_x": -812.093,
  "acc_y": 52.582,
  "acc_z": -13.847,
  "angle": 0,
  "dev": "A",
  "gyr_x": -61.6,
  "gyr_y": 29.89,
  "gyr_z": -26.74,
  "sample": 0,
  "time": 4.986999999999999
}, {
  "acc_x": -826.733,
  "acc_y": 246.501,
  "acc_z": -12.078,
  "angle": 7780408.34151,
  "dev": "A",
  "gyr_x": -80.64,
  "gyr_y": 24.57,
  "gyr_z": -45.15,
  "sample": 7780408,
  "time": 5.007000000000001
}, {
  "acc_x": -834.907,
  "acc_y": 459.269,
  "acc_z": 22.204,
  "angle": 0,
  "dev": "A",
  "gyr_x": -95.76,
  "gyr_y": 29.61,
  "gyr_z": -52.08,
  "sample": 0,
  "time": 5.025999999999999
}, {
  "acc_x": -1199.87,
  "acc_y": -371.612,
  "acc_z": -368.013,
  "angle": 0,
  "dev": "B",
  "gyr_x": -10.5,
  "gyr_y": -53.06,
  "gyr_z": 234.5,
  "sample": 0,
  "time": 5.031
}, {
  "acc_x": -1087.691,
  "acc_y": 48.861,
  "acc_z": -234.545,
  "angle": 1.0831262118089212e+161,
  "dev": "B",
  "gyr_x": 5.46,
  "gyr_y": -44.8,
  "gyr_z": 214.83,
  "sample": 1.0831261658785252e+161,
  "time": 5.05
}, {
  "acc_x": -823.561,
  "acc_y": 666.73,
  "acc_z": -28.609,
  "angle": 1.0831262118077265e+161,
  "dev": "A",
  "gyr_x": -59.01,
  "gyr_y": 27.86,
  "gyr_z": -37.1,
  "sample": 1.0831261658785248e+161,
  "time": 5.046
}, {
  "acc_x": -970.693,
  "acc_y": 110.898,
  "acc_z": -16.653,
  "angle": 1.0831213850017886e+161,
  "dev": "B",
  "gyr_x": 15.68,
  "gyr_y": -37.94,
  "gyr_z": 183.33,
  "sample": 0,
  "time": 5.069
}, {
  "acc_x": -930.006,
  "acc_y": 871.873,
  "acc_z": 170.983,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.07,
  "gyr_y": 27.3,
  "gyr_z": -11.55,
  "sample": 0,
  "time": 5.065
}, {
  "acc_x": -966.118,
  "acc_y": 1002.535,
  "acc_z": 265.716,
  "angle": 0,
  "dev": "A",
  "gyr_x": -17.22,
  "gyr_y": 19.04,
  "gyr_z": -3.29,
  "sample": 0,
  "time": 5.085
}, {
  "acc_x": -915.061,
  "acc_y": -78.08,
  "acc_z": -216.55,
  "angle": 0,
  "dev": "B",
  "gyr_x": -17.36,
  "gyr_y": -18.27,
  "gyr_z": 134.47,
  "sample": 0,
  "time": 5.088
}, {
  "acc_x": -852.658,
  "acc_y": 3.355,
  "acc_z": -274.805,
  "angle": 0,
  "dev": "B",
  "gyr_x": -21.35,
  "gyr_y": 0.14,
  "gyr_z": 76.58,
  "sample": 0,
  "time": 5.108
}, {
  "acc_x": -930.921,
  "acc_y": 816.607,
  "acc_z": 161.65,
  "angle": 0,
  "dev": "A",
  "gyr_x": -56.91,
  "gyr_y": 16.45,
  "gyr_z": 0.35,
  "sample": 0,
  "time": 5.1049999999999995
}, {
  "acc_x": -872.3,
  "acc_y": 57.279,
  "acc_z": -146.339,
  "angle": 1.0831262116642739e+161,
  "dev": "B",
  "gyr_x": -1.89,
  "gyr_y": 12.32,
  "gyr_z": 16.45,
  "sample": 1.0831261658785257e+161,
  "time": 5.127999999999999
}, {
  "acc_x": -807.579,
  "acc_y": 587.186,
  "acc_z": -2.989,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.47,
  "gyr_y": 28.56,
  "gyr_z": 13.79,
  "sample": 0,
  "time": 5.124
}, {
  "acc_x": -704.123,
  "acc_y": 533.445,
  "acc_z": -91.439,
  "angle": 1.083121385001431e+161,
  "dev": "A",
  "gyr_x": -12.04,
  "gyr_y": 41.79,
  "gyr_z": 28.14,
  "sample": 1.0831213390676707e+161,
  "time": 5.143
}, {
  "acc_x": -884.744,
  "acc_y": 6.588,
  "acc_z": -181.658,
  "angle": 0,
  "dev": "B",
  "gyr_x": -15.68,
  "gyr_y": 25.06,
  "gyr_z": -43.33,
  "sample": 0,
  "time": 5.146999999999999
}, {
  "acc_x": -806.42,
  "acc_y": 307.928,
  "acc_z": -430.233,
  "angle": 0,
  "dev": "A",
  "gyr_x": -18.13,
  "gyr_y": 47.11,
  "gyr_z": 25.2,
  "sample": 1.2535304320420974e+238,
  "time": 5.162999999999999
}, {
  "acc_x": -1056.642,
  "acc_y": 223.992,
  "acc_z": -315.126,
  "angle": 0,
  "dev": "A",
  "gyr_x": -11.62,
  "gyr_y": 73.5,
  "gyr_z": 7.14,
  "sample": 0,
  "time": 5.1819999999999995
}, {
  "acc_x": -965.752,
  "acc_y": -13.115,
  "acc_z": -325.618,
  "angle": 0,
  "dev": "B",
  "gyr_x": -49.07,
  "gyr_y": 37.73,
  "gyr_z": -96.39,
  "sample": 0,
  "time": 5.1659999999999995
}, {
  "acc_x": -1019.005,
  "acc_y": 852.536,
  "acc_z": -82.106,
  "angle": 0,
  "dev": "B",
  "gyr_x": -63,
  "gyr_y": 56.21,
  "gyr_z": -111.23,
  "sample": 0,
  "time": 5.185999999999999
}, {
  "acc_x": -1647.915,
  "acc_y": 606.34,
  "acc_z": 761.585,
  "angle": 0,
  "dev": "B",
  "gyr_x": -29.75,
  "gyr_y": 46.2,
  "gyr_z": -62.09,
  "sample": 0,
  "time": 5.204999999999999
}, {
  "acc_x": -1222.562,
  "acc_y": -71.553,
  "acc_z": -49.898,
  "angle": 0,
  "dev": "B",
  "gyr_x": -36.96,
  "gyr_y": 37.38,
  "gyr_z": -64.05,
  "sample": 0,
  "time": 5.223999999999999
}, {
  "acc_x": -1321.382,
  "acc_y": 914.512,
  "acc_z": 402.478,
  "angle": 1.0831262118136583e+161,
  "dev": "A",
  "gyr_x": -21.7,
  "gyr_y": 80.36,
  "gyr_z": -16.66,
  "sample": 1.0831261658785258e+161,
  "time": 5.201
}, {
  "acc_x": -1567.09,
  "acc_y": 1085.739,
  "acc_z": -160.491,
  "angle": 0,
  "dev": "A",
  "gyr_x": -89.53,
  "gyr_y": 59.29,
  "gyr_z": -43.68,
  "sample": 7780408,
  "time": 5.222
}, {
  "acc_x": -1076.65,
  "acc_y": -317.505,
  "acc_z": -110.959,
  "angle": 7780408.3415,
  "dev": "A",
  "gyr_x": -65.73,
  "gyr_y": 83.02,
  "gyr_z": -33.25,
  "sample": 7780408,
  "time": 5.2410000000000005
}, {
  "acc_x": -1314.306,
  "acc_y": -361.303,
  "acc_z": 206.546,
  "angle": 0,
  "dev": "B",
  "gyr_x": -95.48,
  "gyr_y": 50.4,
  "gyr_z": -95.9,
  "sample": 1.0825469485759529e+161,
  "time": 5.242999999999999
}, {
  "acc_x": -1051.701,
  "acc_y": -91.256,
  "acc_z": -278.526,
  "angle": 0,
  "dev": "B",
  "gyr_x": -98.28,
  "gyr_y": 48.51,
  "gyr_z": -107.45,
  "sample": 9.343235890458236e+83,
  "time": 5.264
}, {
  "acc_x": -700.89,
  "acc_y": 69.418,
  "acc_z": -539.545,
  "angle": 1.0831262118089212e+161,
  "dev": "A",
  "gyr_x": 3.29,
  "gyr_y": 71.33,
  "gyr_z": -15.26,
  "sample": 1.0831261658785262e+161,
  "time": 5.259999999999999
}, {
  "acc_x": -470.859,
  "acc_y": -135.237,
  "acc_z": -764.452,
  "angle": 7780408.34151,
  "dev": "A",
  "gyr_x": -5.74,
  "gyr_y": 56.63,
  "gyr_z": -28.84,
  "sample": 7780408,
  "time": 5.28
}, {
  "acc_x": -715.286,
  "acc_y": -166.591,
  "acc_z": -712.907,
  "angle": 1.0818637326179979e+161,
  "dev": "A",
  "gyr_x": -1.19,
  "gyr_y": 51.8,
  "gyr_z": -28.42,
  "sample": -1.0833262103728412e+161,
  "time": 5.299
}, {
  "acc_x": -862.967,
  "acc_y": 187.514,
  "acc_z": -748.287,
  "angle": 1.0831213849958707e+161,
  "dev": "A",
  "gyr_x": 47.04,
  "gyr_y": 51.73,
  "gyr_z": -15.26,
  "sample": 1.0831213390676718e+161,
  "time": 5.3180000000000005
}, {
  "acc_x": -831.613,
  "acc_y": -462.807,
  "acc_z": -406.931,
  "angle": -7788252.34151,
  "dev": "B",
  "gyr_x": -107.24,
  "gyr_y": 48.02,
  "gyr_z": -115.71,
  "sample": 1.0831213390676719e+161,
  "time": 5.283
}, {
  "acc_x": -699.182,
  "acc_y": -502.03,
  "acc_z": -882.731,
  "angle": 0,
  "dev": "B",
  "gyr_x": -88.62,
  "gyr_y": 49.07,
  "gyr_z": -106.26,
  "sample": 8079208,
  "time": 5.3020000000000005
}, {
  "acc_x": -961.97,
  "acc_y": -640.378,
  "acc_z": -556.564,
  "angle": 0,
  "dev": "B",
  "gyr_x": 6.02,
  "gyr_y": 41.09,
  "gyr_z": -74.9,
  "sample": 0,
  "time": 5.321000000000001
}, {
  "acc_x": -1090.497,
  "acc_y": -105.469,
  "acc_z": -119.072,
  "angle": 0,
  "dev": "B",
  "gyr_x": 71.05,
  "gyr_y": 27.23,
  "gyr_z": -57.96,
  "sample": 0,
  "time": 5.341
}, {
  "acc_x": -831.308,
  "acc_y": 295.606,
  "acc_z": -560.285,
  "angle": -7788252.34151,
  "dev": "A",
  "gyr_x": 54.04,
  "gyr_y": 46.62,
  "gyr_z": -17.08,
  "sample": -7788252,
  "time": 5.338
}, {
  "acc_x": -843.874,
  "acc_y": 254.675,
  "acc_z": -546.072,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.28,
  "gyr_y": 39.41,
  "gyr_z": -26.53,
  "sample": 0,
  "time": 5.357
}, {
  "acc_x": -1001.193,
  "acc_y": 278.404,
  "acc_z": -79.727,
  "angle": 0,
  "dev": "B",
  "gyr_x": 72.17,
  "gyr_y": 27.72,
  "gyr_z": -55.58,
  "sample": 1.0430582726606867e+161,
  "time": 5.36
}, {
  "acc_x": -981.002,
  "acc_y": -122.976,
  "acc_z": -289.689,
  "angle": 0,
  "dev": "B",
  "gyr_x": 12.04,
  "gyr_y": 28.28,
  "gyr_z": -56.28,
  "sample": 0,
  "time": 5.3790000000000004
}, {
  "acc_x": -835.517,
  "acc_y": 235.155,
  "acc_z": -540.704,
  "angle": 0,
  "dev": "A",
  "gyr_x": 40.46,
  "gyr_y": 40.32,
  "gyr_z": -32.06,
  "sample": 0,
  "time": 5.377
}, {
  "acc_x": -984.113,
  "acc_y": -453.84,
  "acc_z": -390.705,
  "angle": 0,
  "dev": "B",
  "gyr_x": -18.83,
  "gyr_y": 24.36,
  "gyr_z": -50.33,
  "sample": 0,
  "time": 5.399
}, {
  "acc_x": -826.062,
  "acc_y": 111.996,
  "acc_z": -590.114,
  "angle": 0,
  "dev": "A",
  "gyr_x": 41.86,
  "gyr_y": 41.51,
  "gyr_z": -35.07,
  "sample": 0,
  "time": 5.396999999999999
}, {
  "acc_x": -799.893,
  "acc_y": 190.625,
  "acc_z": -624.213,
  "angle": 0,
  "dev": "A",
  "gyr_x": 47.74,
  "gyr_y": 41.3,
  "gyr_z": -35.07,
  "sample": 0,
  "time": 5.4159999999999995
}, {
  "acc_x": -989.664,
  "acc_y": -314.699,
  "acc_z": -401.319,
  "angle": 0,
  "dev": "B",
  "gyr_x": 6.93,
  "gyr_y": 19.6,
  "gyr_z": -41.3,
  "sample": 0,
  "time": 5.419
}, {
  "acc_x": -1018.029,
  "acc_y": -53.436,
  "acc_z": -250.588,
  "angle": -8079732.34256,
  "dev": "B",
  "gyr_x": 39.48,
  "gyr_y": 13.86,
  "gyr_z": -32.69,
  "sample": -8079732,
  "time": 5.438
}, {
  "acc_x": -913.353,
  "acc_y": 187.453,
  "acc_z": -535.58,
  "angle": 0,
  "dev": "A",
  "gyr_x": 61.74,
  "gyr_y": 31.92,
  "gyr_z": -32.55,
  "sample": 1.0426501389872994e+161,
  "time": 5.435
}, {
  "acc_x": -999.485,
  "acc_y": -22.57,
  "acc_z": -147.62,
  "angle": 0,
  "dev": "B",
  "gyr_x": 41.72,
  "gyr_y": 10.01,
  "gyr_z": -28.49,
  "sample": 0,
  "time": 5.457
}, {
  "acc_x": -999.302,
  "acc_y": -135.786,
  "acc_z": -206.729,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.55,
  "gyr_y": 7.28,
  "gyr_z": -27.02,
  "sample": 9.018666032642481e+83,
  "time": 5.476
}, {
  "acc_x": -948.733,
  "acc_y": 31.232,
  "acc_z": -304.268,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.45,
  "gyr_y": 4.76,
  "gyr_z": -25.48,
  "sample": 0,
  "time": 5.4959999999999996
}, {
  "acc_x": -942.694,
  "acc_y": 190.259,
  "acc_z": -309.026,
  "angle": 0,
  "dev": "B",
  "gyr_x": 43.19,
  "gyr_y": 3.92,
  "gyr_z": -24.78,
  "sample": 8067716,
  "time": 5.515
}, {
  "acc_x": -871.324,
  "acc_y": 191.723,
  "acc_z": -439.078,
  "angle": 0,
  "dev": "A",
  "gyr_x": 70.07,
  "gyr_y": 18.69,
  "gyr_z": -31.85,
  "sample": 0,
  "time": 5.454999999999999
}, {
  "acc_x": -828.563,
  "acc_y": 256.383,
  "acc_z": -446.032,
  "angle": 0,
  "dev": "A",
  "gyr_x": 77.77,
  "gyr_y": 6.51,
  "gyr_z": -30.94,
  "sample": 0,
  "time": 5.473999999999999
}, {
  "acc_x": -719.251,
  "acc_y": 399.977,
  "acc_z": -500.078,
  "angle": 1.083121385001431e+161,
  "dev": "A",
  "gyr_x": 85.05,
  "gyr_y": -2.52,
  "gyr_z": -28.21,
  "sample": 1.0831213390676729e+161,
  "time": 5.493999999999999
}, {
  "acc_x": -749.507,
  "acc_y": 417.118,
  "acc_z": -464.942,
  "angle": 0,
  "dev": "A",
  "gyr_x": 85.47,
  "gyr_y": -5.04,
  "gyr_z": -25.41,
  "sample": 1.2535304320421e+238,
  "time": 5.514
}, {
  "acc_x": -790.377,
  "acc_y": 342.759,
  "acc_z": -441.701,
  "angle": 0,
  "dev": "A",
  "gyr_x": 78.75,
  "gyr_y": -5.39,
  "gyr_z": -25.34,
  "sample": 0,
  "time": 5.533
}, {
  "acc_x": -939.217,
  "acc_y": 60.329,
  "acc_z": -239.852,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.99,
  "gyr_y": 4.9,
  "gyr_z": -27.44,
  "sample": 1.2535304320421006e+238,
  "time": 5.534
}, {
  "acc_x": -925.858,
  "acc_y": 34.16,
  "acc_z": -261.019,
  "angle": 1.0831213850018265e+161,
  "dev": "B",
  "gyr_x": 33.74,
  "gyr_y": 5.67,
  "gyr_z": -30.8,
  "sample": -1.0833262103728432e+161,
  "time": 5.553999999999999
}, {
  "acc_x": -811.544,
  "acc_y": 316.529,
  "acc_z": -406.26,
  "angle": 0,
  "dev": "A",
  "gyr_x": 70.56,
  "gyr_y": -5.6,
  "gyr_z": -27.02,
  "sample": 0,
  "time": 5.553
}, {
  "acc_x": -829.234,
  "acc_y": 309.026,
  "acc_z": -396.561,
  "angle": 0,
  "dev": "A",
  "gyr_x": 68.39,
  "gyr_y": -7.35,
  "gyr_z": -28.49,
  "sample": 0,
  "time": 5.572
}, {
  "acc_x": -950.136,
  "acc_y": -17.08,
  "acc_z": -232.532,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.15,
  "gyr_y": 9.73,
  "gyr_z": -32.69,
  "sample": 0,
  "time": 5.573999999999999
}, {
  "acc_x": -951.722,
  "acc_y": 16.226,
  "acc_z": -259.555,
  "angle": 0,
  "dev": "B",
  "gyr_x": 43.33,
  "gyr_y": 13.02,
  "gyr_z": -34.37,
  "sample": 0,
  "time": 5.592999999999999
}, {
  "acc_x": -940.986,
  "acc_y": 52.826,
  "acc_z": -263.032,
  "angle": 1.0831213850028055e+161,
  "dev": "B",
  "gyr_x": 48.72,
  "gyr_y": 16.1,
  "gyr_z": -36.4,
  "sample": 1.083121339067674e+161,
  "time": 5.611999999999999
}, {
  "acc_x": -824.476,
  "acc_y": 298.412,
  "acc_z": -392.352,
  "angle": 1.0831213849980665e+161,
  "dev": "A",
  "gyr_x": 73.36,
  "gyr_y": -10.22,
  "gyr_z": -29.19,
  "sample": -1.083326210372843e+161,
  "time": 5.591
}, {
  "acc_x": -827.587,
  "acc_y": 302.682,
  "acc_z": -370.087,
  "angle": 0,
  "dev": "A",
  "gyr_x": 72.1,
  "gyr_y": -12.67,
  "gyr_z": -30.8,
  "sample": 0,
  "time": 5.611
}, {
  "acc_x": -838.628,
  "acc_y": 328.79,
  "acc_z": -415.837,
  "angle": 0,
  "dev": "A",
  "gyr_x": 64.82,
  "gyr_y": -11.27,
  "gyr_z": -31.22,
  "sample": 1.0818636866838452e+161,
  "time": 5.63
}, {
  "acc_x": -956.358,
  "acc_y": 55.632,
  "acc_z": -204.106,
  "angle": 0,
  "dev": "B",
  "gyr_x": 49.14,
  "gyr_y": 18.48,
  "gyr_z": -39.62,
  "sample": 0,
  "time": 5.630999999999999
}, {
  "acc_x": -966.728,
  "acc_y": 24.644,
  "acc_z": -224.663,
  "angle": -8079732.34257,
  "dev": "B",
  "gyr_x": 43.05,
  "gyr_y": 16.73,
  "gyr_z": -43.82,
  "sample": -8079732,
  "time": 5.650999999999999
}, {
  "acc_x": -839.97,
  "acc_y": 310.49,
  "acc_z": -355.813,
  "angle": 9.349118525294411e+83,
  "dev": "A",
  "gyr_x": 46.55,
  "gyr_y": -2.45,
  "gyr_z": -30.03,
  "sample": 9.34911812859151e+83,
  "time": 5.6499999999999995
}, {
  "acc_x": -976.061,
  "acc_y": 41.663,
  "acc_z": -248.636,
  "angle": 0,
  "dev": "B",
  "gyr_x": 39.34,
  "gyr_y": 16.1,
  "gyr_z": -48.09,
  "sample": 0,
  "time": 5.669999999999999
}, {
  "acc_x": -843.142,
  "acc_y": 326.411,
  "acc_z": -384.727,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.92,
  "gyr_y": -3.78,
  "gyr_z": -28.77,
  "sample": 0,
  "time": 5.669999999999999
}, {
  "acc_x": -826.977,
  "acc_y": 369.233,
  "acc_z": -353.312,
  "angle": 0,
  "dev": "A",
  "gyr_x": 46.06,
  "gyr_y": -7,
  "gyr_z": -26.74,
  "sample": 0,
  "time": 5.688999999999999
}, {
  "acc_x": -968.68,
  "acc_y": 55.632,
  "acc_z": -258.213,
  "angle": -9.014567388107615e+83,
  "dev": "B",
  "gyr_x": 37.17,
  "gyr_y": 16.1,
  "gyr_z": -52.57,
  "sample": -9.014566992683492e+83,
  "time": 5.69
}, {
  "acc_x": -961.97,
  "acc_y": 52.155,
  "acc_z": -264.313,
  "angle": 0,
  "dev": "B",
  "gyr_x": 32.97,
  "gyr_y": 16.38,
  "gyr_z": -58.31,
  "sample": 0,
  "time": 5.7090000000000005
}, {
  "acc_x": -834.907,
  "acc_y": 362.157,
  "acc_z": -333.975,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.01,
  "gyr_y": -10.36,
  "gyr_z": -24.57,
  "sample": 0,
  "time": 5.707999999999999
}, {
  "acc_x": -999.546,
  "acc_y": 70.394,
  "acc_z": -284.016,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.73,
  "gyr_y": 15.96,
  "gyr_z": -64.54,
  "sample": 0,
  "time": 5.729
}, {
  "acc_x": -880.962,
  "acc_y": 362.95,
  "acc_z": -329.339,
  "angle": 0,
  "dev": "A",
  "gyr_x": 50.4,
  "gyr_y": -11.69,
  "gyr_z": -19.95,
  "sample": 0,
  "time": 5.727999999999999
}, {
  "acc_x": -876.387,
  "acc_y": 382.592,
  "acc_z": -342.82,
  "angle": 0,
  "dev": "A",
  "gyr_x": 54.18,
  "gyr_y": -14.21,
  "gyr_z": -14.21,
  "sample": 0,
  "time": 5.746999999999999
}, {
  "acc_x": -1017.053,
  "acc_y": 55.937,
  "acc_z": -219.661,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.08,
  "gyr_y": 14.91,
  "gyr_z": -71.05,
  "sample": 0,
  "time": 5.748
}, {
  "acc_x": -1037.244,
  "acc_y": 43.798,
  "acc_z": -197.518,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.17,
  "gyr_y": 16.24,
  "gyr_z": -77.77,
  "sample": 0,
  "time": 5.767
}, {
  "acc_x": -886.452,
  "acc_y": 432.246,
  "acc_z": -336.476,
  "angle": 0,
  "dev": "A",
  "gyr_x": 41.23,
  "gyr_y": -11.76,
  "gyr_z": -8.4,
  "sample": -1.0429928425579909e+161,
  "time": 5.765999999999999
}, {
  "acc_x": -1088.179,
  "acc_y": -27.328,
  "acc_z": -207.034,
  "angle": 9.349118525254122e+83,
  "dev": "B",
  "gyr_x": 27.72,
  "gyr_y": 16.8,
  "gyr_z": -85.82,
  "sample": 9.349118128591521e+83,
  "time": 5.7860000000000005
}, {
  "acc_x": -914.817,
  "acc_y": 464.149,
  "acc_z": -359.046,
  "angle": 9.349118525173199e+83,
  "dev": "A",
  "gyr_x": 20.93,
  "gyr_y": -11.2,
  "gyr_z": -5.25,
  "sample": -1.2537769719151594e+238,
  "time": 5.7860000000000005
}, {
  "acc_x": -969.107,
  "acc_y": 542.9,
  "acc_z": -325.374,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.8,
  "gyr_y": -13.86,
  "gyr_z": -3.85,
  "sample": -1.2537763509079226e+238,
  "time": 5.806
}, {
  "acc_x": -1145.275,
  "acc_y": -55.937,
  "acc_z": -218.929,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.95,
  "gyr_y": 17.36,
  "gyr_z": -93.52,
  "sample": 0,
  "time": 5.806
}, {
  "acc_x": -1227.381,
  "acc_y": -12.566,
  "acc_z": -203.496,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.33,
  "gyr_y": 17.01,
  "gyr_z": -100.52,
  "sample": 0,
  "time": 5.826
}, {
  "acc_x": -998.753,
  "acc_y": 683.2,
  "acc_z": -299.144,
  "angle": -8079732.34259,
  "dev": "A",
  "gyr_x": 3.29,
  "gyr_y": -18.2,
  "gyr_z": -1.75,
  "sample": -8079732,
  "time": 5.825
}, {
  "acc_x": -1385.005,
  "acc_y": 138.836,
  "acc_z": -216.367,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.31,
  "gyr_y": 16.03,
  "gyr_z": -108.78,
  "sample": 0,
  "time": 5.845
}, {
  "acc_x": -1064.938,
  "acc_y": 781.227,
  "acc_z": -196.115,
  "angle": 1.0831213849886962e+161,
  "dev": "A",
  "gyr_x": -8.33,
  "gyr_y": -19.74,
  "gyr_z": 3.15,
  "sample": 1.0831213390676752e+161,
  "time": 5.845
}, {
  "acc_x": -1247.877,
  "acc_y": 730.902,
  "acc_z": 63.562,
  "angle": -8079732.34259,
  "dev": "A",
  "gyr_x": -32.06,
  "gyr_y": -26.04,
  "gyr_z": 12.6,
  "sample": 0,
  "time": 5.864
}, {
  "acc_x": -1470.954,
  "acc_y": 130.845,
  "acc_z": -137.311,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.21,
  "gyr_y": 14.77,
  "gyr_z": -120.33,
  "sample": 0,
  "time": 5.864
}, {
  "acc_x": -1682.746,
  "acc_y": 148.291,
  "acc_z": -63.806,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.66,
  "gyr_y": 14.07,
  "gyr_z": -130.27,
  "sample": 0,
  "time": 5.8839999999999995
}, {
  "acc_x": -1359.995,
  "acc_y": 569.008,
  "acc_z": 86.498,
  "angle": 0,
  "dev": "A",
  "gyr_x": -23.1,
  "gyr_y": -55.44,
  "gyr_z": 27.51,
  "sample": 0,
  "time": 5.883
}, {
  "acc_x": -1696.532,
  "acc_y": 485.682,
  "acc_z": 200.263,
  "angle": 0,
  "dev": "B",
  "gyr_x": 66.71,
  "gyr_y": 14.21,
  "gyr_z": -135.17,
  "sample": 0,
  "time": 5.903
}, {
  "acc_x": -1404.22,
  "acc_y": 313.357,
  "acc_z": -85.522,
  "angle": -1.0833262563069961e+161,
  "dev": "B",
  "gyr_x": 85.89,
  "gyr_y": 24.01,
  "gyr_z": -134.96,
  "sample": -1.0833262103728455e+161,
  "time": 5.922
}, {
  "acc_x": -1224.941,
  "acc_y": 348.981,
  "acc_z": 58.682,
  "angle": 9.34911852528361e+83,
  "dev": "A",
  "gyr_x": -6.51,
  "gyr_y": -89.39,
  "gyr_z": 45.85,
  "sample": 9.349118128591524e+83,
  "time": 5.903
}, {
  "acc_x": -1305.827,
  "acc_y": -332.816,
  "acc_z": -400.526,
  "angle": -9.014562756413865e+83,
  "dev": "B",
  "gyr_x": 73.92,
  "gyr_y": 40.39,
  "gyr_z": -133.49,
  "sample": -9.014562360999937e+83,
  "time": 5.941
}, {
  "acc_x": -1009.672,
  "acc_y": 412.543,
  "acc_z": -56.73,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.4,
  "gyr_y": -116.76,
  "gyr_z": 65.17,
  "sample": 0,
  "time": 5.922
}, {
  "acc_x": -1094.889,
  "acc_y": 363.194,
  "acc_z": -450.302,
  "angle": -8079732.34259,
  "dev": "A",
  "gyr_x": 11.2,
  "gyr_y": -116.41,
  "gyr_z": 85.19,
  "sample": -8079732,
  "time": 5.9430000000000005
}, {
  "acc_x": -1344.074,
  "acc_y": 124.562,
  "acc_z": -607.438,
  "angle": 1.2092265867662225e+238,
  "dev": "A",
  "gyr_x": 17.22,
  "gyr_y": -96.32,
  "gyr_z": 97.86,
  "sample": 1.2092265337457365e+238,
  "time": 5.961999999999999
}, {
  "acc_x": -1135.027,
  "acc_y": -446.398,
  "acc_z": -475.617,
  "angle": -7788224.34148,
  "dev": "B",
  "gyr_x": 51.1,
  "gyr_y": 47.53,
  "gyr_z": -131.6,
  "sample": -7788224,
  "time": 5.960999999999999
}, {
  "acc_x": -885.781,
  "acc_y": -410.835,
  "acc_z": -271.084,
  "angle": -8079732.34258,
  "dev": "B",
  "gyr_x": 42.49,
  "gyr_y": 42,
  "gyr_z": -113.26,
  "sample": -8079732,
  "time": 5.980999999999999
}, {
  "acc_x": -1325.347,
  "acc_y": 100.101,
  "acc_z": -483.364,
  "angle": -9.009852335496011e+83,
  "dev": "A",
  "gyr_x": -4.76,
  "gyr_y": -82.18,
  "gyr_z": 95.13,
  "sample": -9.009851938809762e+83,
  "time": 5.980999999999999
}, {
  "acc_x": -651.175,
  "acc_y": -716.384,
  "acc_z": -361.547,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.44,
  "gyr_y": 29.05,
  "gyr_z": -77.77,
  "sample": 1.2092265337457372e+238,
  "time": 5.999999999999999
}, {
  "acc_x": -1261.785,
  "acc_y": 219.6,
  "acc_z": -426.146,
  "angle": -8079732.34259,
  "dev": "A",
  "gyr_x": -39.69,
  "gyr_y": -76.65,
  "gyr_z": 85.61,
  "sample": -8079732,
  "time": 6.001
}, {
  "acc_x": -1287.649,
  "acc_y": 145.424,
  "acc_z": -464.82,
  "angle": 0,
  "dev": "A",
  "gyr_x": -62.16,
  "gyr_y": -70.7,
  "gyr_z": 76.86,
  "sample": 0,
  "time": 6.0200000000000005
}, {
  "acc_x": -553.758,
  "acc_y": -1385.066,
  "acc_z": -651.907,
  "angle": 9.356177211037391e+83,
  "dev": "B",
  "gyr_x": 7.91,
  "gyr_y": 15.05,
  "gyr_z": -47.25,
  "sample": 9.356176814351441e+83,
  "time": 6.018999999999999
}, {
  "acc_x": -527.162,
  "acc_y": -581.879,
  "acc_z": -571.997,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.56,
  "gyr_y": -1.68,
  "gyr_z": -20.51,
  "sample": 0,
  "time": 6.039000000000001
}, {
  "acc_x": -1151.558,
  "acc_y": 203.984,
  "acc_z": -523.014,
  "angle": -1.0827524021275945e+161,
  "dev": "A",
  "gyr_x": -77.21,
  "gyr_y": -61.25,
  "gyr_z": 67.83,
  "sample": -1.0827523561934444e+161,
  "time": 6.039000000000001
}, {
  "acc_x": -298.534,
  "acc_y": 2.257,
  "acc_z": 135.42,
  "angle": 0,
  "dev": "B",
  "gyr_x": 72.17,
  "gyr_y": -14.21,
  "gyr_z": 17.78,
  "sample": 0,
  "time": 6.057999999999999
}, {
  "acc_x": -1084.092,
  "acc_y": 159.82,
  "acc_z": -474.763,
  "angle": -1.0827524021238344e+161,
  "dev": "A",
  "gyr_x": -92.12,
  "gyr_y": -51.52,
  "gyr_z": 61.18,
  "sample": 0,
  "time": 6.059
}, {
  "acc_x": -1006.927,
  "acc_y": -16.287,
  "acc_z": -377.834,
  "angle": -7788224.34149,
  "dev": "A",
  "gyr_x": -107.45,
  "gyr_y": -49.35,
  "gyr_z": 55.16,
  "sample": 0,
  "time": 6.079
}, {
  "acc_x": -171.349,
  "acc_y": -280.173,
  "acc_z": 102.175,
  "angle": 0,
  "dev": "B",
  "gyr_x": 44.17,
  "gyr_y": -22.33,
  "gyr_z": 61.67,
  "sample": 0,
  "time": 6.076999999999999
}, {
  "acc_x": -286.944,
  "acc_y": -623.542,
  "acc_z": -211.731,
  "angle": 0,
  "dev": "B",
  "gyr_x": -45.85,
  "gyr_y": -12.11,
  "gyr_z": 103.6,
  "sample": 0,
  "time": 6.095999999999999
}, {
  "acc_x": -433.588,
  "acc_y": -695.461,
  "acc_z": -264.74,
  "angle": 0,
  "dev": "B",
  "gyr_x": -76.23,
  "gyr_y": -14,
  "gyr_z": 140.91,
  "sample": 0,
  "time": 6.117
}, {
  "acc_x": -487.817,
  "acc_y": -517.036,
  "acc_z": -193.065,
  "angle": 8067716.34255,
  "dev": "B",
  "gyr_x": -64.75,
  "gyr_y": -28.63,
  "gyr_z": 163.38,
  "sample": 0,
  "time": 6.136
}, {
  "acc_x": -507.154,
  "acc_y": -351.482,
  "acc_z": -87.291,
  "angle": 1.0831213850007716e+161,
  "dev": "B",
  "gyr_x": -55.02,
  "gyr_y": -41.58,
  "gyr_z": 179.06,
  "sample": 1.0831213390676775e+161,
  "time": 6.155
}, {
  "acc_x": -893.833,
  "acc_y": -92.11,
  "acc_z": -309.636,
  "angle": 0,
  "dev": "A",
  "gyr_x": -105.35,
  "gyr_y": -43.54,
  "gyr_z": 49.56,
  "sample": 0,
  "time": 6.098
}, {
  "acc_x": -823.927,
  "acc_y": -137.006,
  "acc_z": -315.736,
  "angle": -1.0827524021284996e+161,
  "dev": "A",
  "gyr_x": -93.31,
  "gyr_y": -32.76,
  "gyr_z": 44.38,
  "sample": -1.0827523561934449e+161,
  "time": 6.117999999999999
}, {
  "acc_x": -784.948,
  "acc_y": -158.905,
  "acc_z": -357.948,
  "angle": 0,
  "dev": "A",
  "gyr_x": -73.01,
  "gyr_y": -21.84,
  "gyr_z": 43.75,
  "sample": 0,
  "time": 6.137
}, {
  "acc_x": -720.471,
  "acc_y": -141.825,
  "acc_z": -406.687,
  "angle": 0,
  "dev": "A",
  "gyr_x": -40.6,
  "gyr_y": -14.14,
  "gyr_z": 48.09,
  "sample": 0,
  "time": 6.156
}, {
  "acc_x": -569.313,
  "acc_y": -373.442,
  "acc_z": -207.095,
  "angle": 0,
  "dev": "B",
  "gyr_x": -70.91,
  "gyr_y": -48.79,
  "gyr_z": 196.98,
  "sample": 0,
  "time": 6.174
}, {
  "acc_x": -701.378,
  "acc_y": -506.178,
  "acc_z": -368.074,
  "angle": 0,
  "dev": "B",
  "gyr_x": -90.72,
  "gyr_y": -55.72,
  "gyr_z": 217.07,
  "sample": 0,
  "time": 6.194
}, {
  "acc_x": -765.367,
  "acc_y": -614.636,
  "acc_z": -395.768,
  "angle": -9.020486679725404e+83,
  "dev": "B",
  "gyr_x": -88.13,
  "gyr_y": -67.83,
  "gyr_z": 232.82,
  "sample": -9.020486284285333e+83,
  "time": 6.213
}, {
  "acc_x": -639.463,
  "acc_y": -107.787,
  "acc_z": -417.789,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.01,
  "gyr_y": -7.49,
  "gyr_z": 52.15,
  "sample": 1.0426501389873041e+161,
  "time": 6.175999999999999
}, {
  "acc_x": -606.95,
  "acc_y": -17.629,
  "acc_z": -366.549,
  "angle": -9.020486679718485e+83,
  "dev": "A",
  "gyr_x": 38.36,
  "gyr_y": -2.24,
  "gyr_z": 52.29,
  "sample": 0,
  "time": 6.194999999999999
}, {
  "acc_x": -652.517,
  "acc_y": 106.994,
  "acc_z": -271.877,
  "angle": -9.014562756453602e+83,
  "dev": "A",
  "gyr_x": 54.6,
  "gyr_y": 12.88,
  "gyr_z": 44.94,
  "sample": -9.014562360999948e+83,
  "time": 6.2139999999999995
}, {
  "acc_x": -781.654,
  "acc_y": -594.933,
  "acc_z": -353.251,
  "angle": 0,
  "dev": "B",
  "gyr_x": -65.52,
  "gyr_y": -79.59,
  "gyr_z": 242.55,
  "sample": 0,
  "time": 6.232
}, {
  "acc_x": -791.658,
  "acc_y": -508.679,
  "acc_z": -386.618,
  "angle": 0,
  "dev": "B",
  "gyr_x": -41.65,
  "gyr_y": -89.95,
  "gyr_z": 254.24,
  "sample": 0,
  "time": 6.252
}, {
  "acc_x": -610.915,
  "acc_y": 75.701,
  "acc_z": -262.422,
  "angle": -9.014562756446062e+83,
  "dev": "A",
  "gyr_x": 49.49,
  "gyr_y": 29.89,
  "gyr_z": 30.1,
  "sample": -9.01456236099995e+83,
  "time": 6.235
}, {
  "acc_x": -566.385,
  "acc_y": 47.092,
  "acc_z": -250.222,
  "angle": 1.0433334466680808e+161,
  "dev": "A",
  "gyr_x": 24.85,
  "gyr_y": 35.07,
  "gyr_z": 11.76,
  "sample": 1.0433334008794145e+161,
  "time": 6.2540000000000004
}, {
  "acc_x": -823.683,
  "acc_y": -437.675,
  "acc_z": -269.925,
  "angle": 0,
  "dev": "B",
  "gyr_x": -17.01,
  "gyr_y": -98.35,
  "gyr_z": 268.94,
  "sample": -9.355574695487421e+83,
  "time": 6.271999999999999
}, {
  "acc_x": -596.214,
  "acc_y": 26.596,
  "acc_z": -206.668,
  "angle": 0,
  "dev": "A",
  "gyr_x": -9.94,
  "gyr_y": 34.79,
  "gyr_z": -12.04,
  "sample": 8067716,
  "time": 6.273000000000001
}, {
  "acc_x": -997.899,
  "acc_y": -295.179,
  "acc_z": -59.841,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.67,
  "gyr_y": -92.54,
  "gyr_z": 280.77,
  "sample": 0,
  "time": 6.2909999999999995
}, {
  "acc_x": -1229.394,
  "acc_y": -178.059,
  "acc_z": -123.952,
  "angle": 0,
  "dev": "B",
  "gyr_x": -25.83,
  "gyr_y": -71.82,
  "gyr_z": 277.76,
  "sample": -1.0429928425579947e+161,
  "time": 6.31
}, {
  "acc_x": -716.75,
  "acc_y": 177.266,
  "acc_z": -49.471,
  "angle": 1.0433334466689539e+161,
  "dev": "A",
  "gyr_x": -43.33,
  "gyr_y": 49.21,
  "gyr_z": -38.08,
  "sample": 1.0433334008794148e+161,
  "time": 6.293
}, {
  "acc_x": -803.065,
  "acc_y": 395.646,
  "acc_z": 61.549,
  "angle": 0,
  "dev": "A",
  "gyr_x": -83.65,
  "gyr_y": 49.77,
  "gyr_z": -61.95,
  "sample": 0,
  "time": 6.312
}, {
  "acc_x": -1415.322,
  "acc_y": -232.166,
  "acc_z": -268.339,
  "angle": -1.0827524021285735e+161,
  "dev": "B",
  "gyr_x": -42,
  "gyr_y": -58.45,
  "gyr_z": 260.96,
  "sample": 0,
  "time": 6.329
}, {
  "acc_x": -933.056,
  "acc_y": 665.51,
  "acc_z": 19.886,
  "angle": 0,
  "dev": "A",
  "gyr_x": -114.8,
  "gyr_y": 36.4,
  "gyr_z": -75.11,
  "sample": 0,
  "time": 6.331
}, {
  "acc_x": -1001.315,
  "acc_y": 1037.305,
  "acc_z": 287.554,
  "angle": -9.014562756446062e+83,
  "dev": "A",
  "gyr_x": -74.13,
  "gyr_y": 16.38,
  "gyr_z": -60.2,
  "sample": -9.014562360999956e+83,
  "time": 6.351
}, {
  "acc_x": -1245.437,
  "acc_y": -62.525,
  "acc_z": -32.086,
  "angle": 0,
  "dev": "B",
  "gyr_x": -37.17,
  "gyr_y": -54.18,
  "gyr_z": 232.68,
  "sample": 0,
  "time": 6.348999999999999
}, {
  "acc_x": -931.897,
  "acc_y": 105.896,
  "acc_z": 28.975,
  "angle": 0,
  "dev": "B",
  "gyr_x": -24.5,
  "gyr_y": -43.26,
  "gyr_z": 191.52,
  "sample": 0,
  "time": 6.367999999999999
}, {
  "acc_x": -1021.201,
  "acc_y": 1179.679,
  "acc_z": 437.797,
  "angle": 0,
  "dev": "A",
  "gyr_x": -21.98,
  "gyr_y": 1.82,
  "gyr_z": -26.81,
  "sample": 0,
  "time": 6.3709999999999996
}, {
  "acc_x": -838.018,
  "acc_y": 77.165,
  "acc_z": -265.411,
  "angle": 0,
  "dev": "B",
  "gyr_x": -31.92,
  "gyr_y": -24.64,
  "gyr_z": 132.09,
  "sample": 0,
  "time": 6.387
}, {
  "acc_x": -1088.362,
  "acc_y": 1088.85,
  "acc_z": 281.637,
  "angle": 0,
  "dev": "A",
  "gyr_x": -60.9,
  "gyr_y": 7.63,
  "gyr_z": -2.73,
  "sample": 0,
  "time": 6.390999999999999
}, {
  "acc_x": -926.712,
  "acc_y": 622.139,
  "acc_z": 127.185,
  "angle": 0,
  "dev": "A",
  "gyr_x": -73.22,
  "gyr_y": 7.21,
  "gyr_z": 12.18,
  "sample": 0,
  "time": 6.409999999999999
}, {
  "acc_x": -789.035,
  "acc_y": 383.202,
  "acc_z": -27.206,
  "angle": 0,
  "dev": "A",
  "gyr_x": -40.04,
  "gyr_y": 23.38,
  "gyr_z": 25.41,
  "sample": 0,
  "time": 6.428999999999999
}, {
  "acc_x": -853.39,
  "acc_y": 202.215,
  "acc_z": -245.525,
  "angle": 0,
  "dev": "A",
  "gyr_x": -9.73,
  "gyr_y": 41.65,
  "gyr_z": 35.42,
  "sample": 0,
  "time": 6.448999999999999
}, {
  "acc_x": -1075.735,
  "acc_y": -5.307,
  "acc_z": -419.497,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.8,
  "gyr_y": 52.15,
  "gyr_z": 27.51,
  "sample": 0,
  "time": 6.467999999999999
}, {
  "acc_x": -894.016,
  "acc_y": 44.164,
  "acc_z": -270.901,
  "angle": 0,
  "dev": "B",
  "gyr_x": -21.28,
  "gyr_y": -5.32,
  "gyr_z": 61.04,
  "sample": 0,
  "time": 6.406999999999999
}, {
  "acc_x": -889.624,
  "acc_y": -125.294,
  "acc_z": -202.764,
  "angle": 1.0430577821379063e+161,
  "dev": "B",
  "gyr_x": -2.73,
  "gyr_y": 7.14,
  "gyr_z": -8.05,
  "sample": 1.0430577363483764e+161,
  "time": 6.4270000000000005
}, {
  "acc_x": -936.899,
  "acc_y": -70.76,
  "acc_z": -181.353,
  "angle": 0,
  "dev": "B",
  "gyr_x": -1.96,
  "gyr_y": 19.81,
  "gyr_z": -65.66,
  "sample": 0,
  "time": 6.446000000000001
}, {
  "acc_x": -1104.405,
  "acc_y": 301.096,
  "acc_z": -571.631,
  "angle": 0,
  "dev": "B",
  "gyr_x": -24.71,
  "gyr_y": 34.79,
  "gyr_z": -111.58,
  "sample": 0,
  "time": 6.464999999999999
}, {
  "acc_x": -1101.111,
  "acc_y": 1078.724,
  "acc_z": 216.672,
  "angle": 0,
  "dev": "B",
  "gyr_x": -18.34,
  "gyr_y": 49.84,
  "gyr_z": -103.04,
  "sample": 0,
  "time": 6.483999999999999
}, {
  "acc_x": -1067.988,
  "acc_y": 451.095,
  "acc_z": 366.793,
  "angle": 0,
  "dev": "A",
  "gyr_x": 29.96,
  "gyr_y": 65.94,
  "gyr_z": 18.97,
  "sample": 0,
  "time": 6.486999999999999
}, {
  "acc_x": -1423.801,
  "acc_y": 1789.374,
  "acc_z": 195.444,
  "angle": -7785208.34151,
  "dev": "A",
  "gyr_x": -25.83,
  "gyr_y": 65.45,
  "gyr_z": -8.4,
  "sample": -7785208,
  "time": 6.508
}, {
  "acc_x": -1437.099,
  "acc_y": 330.681,
  "acc_z": -211.67,
  "angle": -7789264.34151,
  "dev": "A",
  "gyr_x": -90.93,
  "gyr_y": 70.07,
  "gyr_z": -26.11,
  "sample": -7789264,
  "time": 6.527
}, {
  "acc_x": -1530.673,
  "acc_y": 560.041,
  "acc_z": 376.187,
  "angle": 0,
  "dev": "B",
  "gyr_x": 6.37,
  "gyr_y": 35.28,
  "gyr_z": -56.35,
  "sample": 0,
  "time": 6.5040000000000004
}, {
  "acc_x": -805.383,
  "acc_y": -367.769,
  "acc_z": -346.48,
  "angle": 0,
  "dev": "A",
  "gyr_x": -25.13,
  "gyr_y": 63.56,
  "gyr_z": -14.21,
  "sample": 0,
  "time": 6.546
}, {
  "acc_x": -356.606,
  "acc_y": 168.909,
  "acc_z": -712.297,
  "angle": -1.0834694516939557e+161,
  "dev": "A",
  "gyr_x": -15.26,
  "gyr_y": 57.4,
  "gyr_z": -20.93,
  "sample": -1.0834694057615411e+161,
  "time": 6.566
}, {
  "acc_x": -529.724,
  "acc_y": -202.703,
  "acc_z": -662.155,
  "angle": 0,
  "dev": "A",
  "gyr_x": -15.96,
  "gyr_y": 49.14,
  "gyr_z": -35.35,
  "sample": 7788788,
  "time": 6.585
}, {
  "acc_x": -1377.624,
  "acc_y": 29.524,
  "acc_z": 20.923,
  "angle": -7789264.3415,
  "dev": "B",
  "gyr_x": -43.4,
  "gyr_y": 46.76,
  "gyr_z": -86.17,
  "sample": -7789264,
  "time": 6.523000000000001
}, {
  "acc_x": -1224.026,
  "acc_y": -617.564,
  "acc_z": -20.069,
  "angle": -1.0834694516956879e+161,
  "dev": "B",
  "gyr_x": -100.17,
  "gyr_y": 50.12,
  "gyr_z": -110.04,
  "sample": -1.0834694057615413e+161,
  "time": 6.543
}, {
  "acc_x": -913.841,
  "acc_y": -103.944,
  "acc_z": -263.947,
  "angle": 0,
  "dev": "B",
  "gyr_x": -107.24,
  "gyr_y": 50.47,
  "gyr_z": -125.79,
  "sample": -9.020486284285352e+83,
  "time": 6.562
}, {
  "acc_x": -656.97,
  "acc_y": -302.926,
  "acc_z": -605.486,
  "angle": 0,
  "dev": "B",
  "gyr_x": -106.33,
  "gyr_y": 52.85,
  "gyr_z": -124.39,
  "sample": -1.0429928425579965e+161,
  "time": 6.582
}, {
  "acc_x": -711.016,
  "acc_y": -376.553,
  "acc_z": -771.101,
  "angle": -1.0834694516956879e+161,
  "dev": "B",
  "gyr_x": -93.52,
  "gyr_y": 47.67,
  "gyr_z": -109.34,
  "sample": -1.0834694057615417e+161,
  "time": 6.601
}, {
  "acc_x": -893.955,
  "acc_y": 61.305,
  "acc_z": -699.487,
  "angle": 7789764.34152,
  "dev": "A",
  "gyr_x": 5.32,
  "gyr_y": 51.24,
  "gyr_z": -21.42,
  "sample": 0,
  "time": 6.604
}, {
  "acc_x": -1012.295,
  "acc_y": -706.685,
  "acc_z": -477.447,
  "angle": -9.020486679730045e+83,
  "dev": "B",
  "gyr_x": -18.48,
  "gyr_y": 42.91,
  "gyr_z": -85.47,
  "sample": -9.020486284285355e+83,
  "time": 6.62
}, {
  "acc_x": -1194.197,
  "acc_y": -365.146,
  "acc_z": -122,
  "angle": 0,
  "dev": "B",
  "gyr_x": 56.14,
  "gyr_y": 31.29,
  "gyr_z": -66.85,
  "sample": 0,
  "time": 6.639
}, {
  "acc_x": -1002.779,
  "acc_y": 277.245,
  "acc_z": -521.855,
  "angle": 0,
  "dev": "A",
  "gyr_x": 38.57,
  "gyr_y": 48.23,
  "gyr_z": -14.49,
  "sample": 0,
  "time": 6.624
}, {
  "acc_x": -875.899,
  "acc_y": 225.212,
  "acc_z": -476.227,
  "angle": 8.945462669280341e+83,
  "dev": "A",
  "gyr_x": 34.93,
  "gyr_y": 37.59,
  "gyr_z": -22.54,
  "sample": 8.945462273826711e+83,
  "time": 6.643
}, {
  "acc_x": -831.796,
  "acc_y": 203.435,
  "acc_z": -512.217,
  "angle": 0,
  "dev": "A",
  "gyr_x": 36.26,
  "gyr_y": 37.1,
  "gyr_z": -28.07,
  "sample": 0,
  "time": 6.662999999999999
}, {
  "acc_x": -873.642,
  "acc_y": 221.613,
  "acc_z": -537.41,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.14,
  "gyr_y": 39.69,
  "gyr_z": -32.34,
  "sample": 0,
  "time": 6.682999999999999
}, {
  "acc_x": -967.033,
  "acc_y": 300.425,
  "acc_z": 88.084,
  "angle": 0,
  "dev": "B",
  "gyr_x": 86.73,
  "gyr_y": 20.51,
  "gyr_z": -64.54,
  "sample": 0,
  "time": 6.659
}, {
  "acc_x": -936.167,
  "acc_y": 39.04,
  "acc_z": -291.824,
  "angle": -7789264.3415,
  "dev": "B",
  "gyr_x": 28.35,
  "gyr_y": 22.12,
  "gyr_z": -64.05,
  "sample": -7789264,
  "time": 6.678999999999999
}, {
  "acc_x": -994.3,
  "acc_y": -510.509,
  "acc_z": -359.9,
  "angle": -1.2086776163663536e+238,
  "dev": "B",
  "gyr_x": -30.66,
  "gyr_y": 25.2,
  "gyr_z": -58.03,
  "sample": 0,
  "time": 6.6979999999999995
}, {
  "acc_x": -922.808,
  "acc_y": 150.914,
  "acc_z": -560.895,
  "angle": -7785208.34151,
  "dev": "A",
  "gyr_x": 44.73,
  "gyr_y": 42.56,
  "gyr_z": -37.73,
  "sample": -7785208,
  "time": 6.701999999999999
}, {
  "acc_x": -1056.703,
  "acc_y": -513.803,
  "acc_z": -395.585,
  "angle": 8071844.34258,
  "dev": "B",
  "gyr_x": -14.63,
  "gyr_y": 20.37,
  "gyr_z": -48.3,
  "sample": 8071844,
  "time": 6.717
}, {
  "acc_x": -852.475,
  "acc_y": 190.808,
  "acc_z": -591.7,
  "angle": 8071844.3426,
  "dev": "A",
  "gyr_x": 52.78,
  "gyr_y": 43.89,
  "gyr_z": -39.9,
  "sample": 8071844,
  "time": 6.720999999999999
}, {
  "acc_x": -826.367,
  "acc_y": 245.037,
  "acc_z": -555.771,
  "angle": 8071844.34258,
  "dev": "A",
  "gyr_x": 62.51,
  "gyr_y": 40.46,
  "gyr_z": -38.22,
  "sample": 8.945462273826717e+83,
  "time": 6.7410000000000005
}, {
  "acc_x": -1037.854,
  "acc_y": -188.673,
  "acc_z": -268.095,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.42,
  "gyr_y": 13.51,
  "gyr_z": -39.06,
  "sample": 0,
  "time": 6.736999999999999
}, {
  "acc_x": -969.839,
  "acc_y": 54.534,
  "acc_z": -235.643,
  "angle": -7785208.3415,
  "dev": "B",
  "gyr_x": 51.66,
  "gyr_y": 6.44,
  "gyr_z": -33.67,
  "sample": -7785208,
  "time": 6.755999999999999
}, {
  "acc_x": -782.386,
  "acc_y": 268.156,
  "acc_z": -518.683,
  "angle": 0,
  "dev": "A",
  "gyr_x": 67.62,
  "gyr_y": 32.62,
  "gyr_z": -37.73,
  "sample": 0,
  "time": 6.759999999999999
}, {
  "acc_x": -968.558,
  "acc_y": -70.272,
  "acc_z": -239.181,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.29,
  "gyr_y": 5.25,
  "gyr_z": -30.66,
  "sample": 0,
  "time": 6.7749999999999995
}, {
  "acc_x": -829.234,
  "acc_y": 284.443,
  "acc_z": -466.101,
  "angle": 8.94546266925339e+83,
  "dev": "A",
  "gyr_x": 68.25,
  "gyr_y": 24.71,
  "gyr_z": -38.29,
  "sample": -7785208,
  "time": 6.778999999999999
}, {
  "acc_x": -785.619,
  "acc_y": 304.573,
  "acc_z": -431.27,
  "angle": -1.2086776163688706e+238,
  "dev": "A",
  "gyr_x": 68.39,
  "gyr_y": 17.57,
  "gyr_z": -37.66,
  "sample": 0,
  "time": 6.8
}, {
  "acc_x": -819.108,
  "acc_y": 298.168,
  "acc_z": -444.69,
  "angle": -7789264.3426,
  "dev": "A",
  "gyr_x": 68.88,
  "gyr_y": 11.41,
  "gyr_z": -36.05,
  "sample": -1.0429928425579976e+161,
  "time": 6.819
}, {
  "acc_x": -956.663,
  "acc_y": -153.781,
  "acc_z": -314.272,
  "angle": 0,
  "dev": "B",
  "gyr_x": 15.12,
  "gyr_y": 5.67,
  "gyr_z": -28.63,
  "sample": 0,
  "time": 6.794
}, {
  "acc_x": -912.926,
  "acc_y": -26.413,
  "acc_z": -382.958,
  "angle": -1.0443915908707031e+161,
  "dev": "B",
  "gyr_x": 31.78,
  "gyr_y": 7.49,
  "gyr_z": -25.41,
  "sample": 0,
  "time": 6.813999999999999
}, {
  "acc_x": -916.952,
  "acc_y": -0.61,
  "acc_z": -199.775,
  "angle": 0,
  "dev": "B",
  "gyr_x": 64.75,
  "gyr_y": 16.87,
  "gyr_z": -23.66,
  "sample": 0,
  "time": 6.8340000000000005
}, {
  "acc_x": -965.142,
  "acc_y": 28.975,
  "acc_z": -344.284,
  "angle": -7785208.34152,
  "dev": "B",
  "gyr_x": 65.73,
  "gyr_y": 17.15,
  "gyr_z": -23.66,
  "sample": -7785208,
  "time": 6.852999999999999
}, {
  "acc_x": -791.475,
  "acc_y": 339.648,
  "acc_z": -428.403,
  "angle": -1.2086776163679545e+238,
  "dev": "A",
  "gyr_x": 70.42,
  "gyr_y": 4.62,
  "gyr_z": -33.6,
  "sample": 0,
  "time": 6.838
}, {
  "acc_x": -812.215,
  "acc_y": 356.24,
  "acc_z": -417.057,
  "angle": -1.2531342826113698e+238,
  "dev": "A",
  "gyr_x": 72.24,
  "gyr_y": -2.94,
  "gyr_z": -30.94,
  "sample": -1.2531342294249549e+238,
  "time": 6.858
}, {
  "acc_x": -963.983,
  "acc_y": 45.994,
  "acc_z": -264.13,
  "angle": 0,
  "dev": "B",
  "gyr_x": 63.35,
  "gyr_y": 10.15,
  "gyr_z": -26.39,
  "sample": 0,
  "time": 6.871999999999999
}, {
  "acc_x": -819.474,
  "acc_y": 318.725,
  "acc_z": -367.769,
  "angle": 8071844.3426,
  "dev": "A",
  "gyr_x": 75.67,
  "gyr_y": -9.73,
  "gyr_z": -30.52,
  "sample": 8071844,
  "time": 6.877
}, {
  "acc_x": -961.787,
  "acc_y": 20.13,
  "acc_z": -155.428,
  "angle": 0,
  "dev": "B",
  "gyr_x": 53.76,
  "gyr_y": 5.11,
  "gyr_z": -29.68,
  "sample": 0,
  "time": 6.892
}, {
  "acc_x": -952.515,
  "acc_y": 71.492,
  "acc_z": -174.643,
  "angle": 1.254316680390466e+238,
  "dev": "B",
  "gyr_x": 45.71,
  "gyr_y": 4.97,
  "gyr_z": -33.32,
  "sample": 1.254316627204052e+238,
  "time": 6.9110000000000005
}, {
  "acc_x": -845.521,
  "acc_y": 351.665,
  "acc_z": -309.514,
  "angle": 0,
  "dev": "A",
  "gyr_x": 80.5,
  "gyr_y": -15.96,
  "gyr_z": -30.38,
  "sample": 0,
  "time": 6.896999999999999
}, {
  "acc_x": -813.984,
  "acc_y": 366.915,
  "acc_z": -279.868,
  "angle": 0,
  "dev": "A",
  "gyr_x": 76.09,
  "gyr_y": -17.99,
  "gyr_z": -29.75,
  "sample": 0,
  "time": 6.9159999999999995
}, {
  "acc_x": -936.228,
  "acc_y": 154.025,
  "acc_z": -224.724,
  "angle": 0,
  "dev": "B",
  "gyr_x": 44.24,
  "gyr_y": 6.44,
  "gyr_z": -37.94,
  "sample": 0,
  "time": 6.930000000000001
}, {
  "acc_x": -825.757,
  "acc_y": 349.652,
  "acc_z": -296.46,
  "angle": 0,
  "dev": "A",
  "gyr_x": 62.65,
  "gyr_y": -9.31,
  "gyr_z": -26.88,
  "sample": 0,
  "time": 6.935999999999999
}, {
  "acc_x": -809.043,
  "acc_y": 361.364,
  "acc_z": -409.981,
  "angle": 0,
  "dev": "A",
  "gyr_x": 50.33,
  "gyr_y": -3.64,
  "gyr_z": -23.1,
  "sample": 0,
  "time": 6.956
}, {
  "acc_x": -819.535,
  "acc_y": 320.982,
  "acc_z": -373.259,
  "angle": 0,
  "dev": "A",
  "gyr_x": 32.27,
  "gyr_y": 2.03,
  "gyr_z": -20.51,
  "sample": 0,
  "time": 6.9750000000000005
}, {
  "acc_x": -927.505,
  "acc_y": 52.46,
  "acc_z": -207.583,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.94,
  "gyr_y": 7.63,
  "gyr_z": -43.75,
  "sample": 0,
  "time": 6.948999999999999
}, {
  "acc_x": -939.766,
  "acc_y": 2.806,
  "acc_z": -220.698,
  "angle": -1.0443915908690867e+161,
  "dev": "B",
  "gyr_x": 30.1,
  "gyr_y": 11.27,
  "gyr_z": -49.91,
  "sample": 0,
  "time": 6.97
}, {
  "acc_x": -963.373,
  "acc_y": -102.541,
  "acc_z": -243.39,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.83,
  "gyr_y": 12.04,
  "gyr_z": -55.02,
  "sample": 0,
  "time": 6.989
}, {
  "acc_x": -833.016,
  "acc_y": 289.14,
  "acc_z": -376.065,
  "angle": 0,
  "dev": "A",
  "gyr_x": 30.17,
  "gyr_y": 0.42,
  "gyr_z": -20.79,
  "sample": 0,
  "time": 6.993999999999999
}, {
  "acc_x": -967.155,
  "acc_y": -57.584,
  "acc_z": -235.704,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.25,
  "gyr_y": 10.99,
  "gyr_z": -59.08,
  "sample": 0,
  "time": 7.008
}, {
  "acc_x": -1004.548,
  "acc_y": -42.517,
  "acc_z": -237.351,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.83,
  "gyr_y": 11.06,
  "gyr_z": -63.28,
  "sample": 0,
  "time": 7.027
}, {
  "acc_x": -1044.564,
  "acc_y": -80.276,
  "acc_z": -213.195,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.15,
  "gyr_y": 9.38,
  "gyr_z": -68.32,
  "sample": 0,
  "time": 7.047
}, {
  "acc_x": -848.876,
  "acc_y": 323.117,
  "acc_z": -367.83,
  "angle": 0,
  "dev": "A",
  "gyr_x": 39.69,
  "gyr_y": -1.75,
  "gyr_z": -20.58,
  "sample": 0,
  "time": 7.014
}, {
  "acc_x": -900.238,
  "acc_y": 343.552,
  "acc_z": -361.242,
  "angle": 8071824.3426,
  "dev": "A",
  "gyr_x": 44.45,
  "gyr_y": -1.96,
  "gyr_z": -19.88,
  "sample": 8071824,
  "time": 7.033
}, {
  "acc_x": -868.945,
  "acc_y": 376.431,
  "acc_z": -337.757,
  "angle": 0,
  "dev": "A",
  "gyr_x": 44.24,
  "gyr_y": -4.97,
  "gyr_z": -18.06,
  "sample": 0,
  "time": 7.0520000000000005
}, {
  "acc_x": -856.806,
  "acc_y": 424.987,
  "acc_z": -371.429,
  "angle": 8071824.3426,
  "dev": "A",
  "gyr_x": 41.16,
  "gyr_y": -8.96,
  "gyr_z": -15.68,
  "sample": 8071824,
  "time": 7.0729999999999995
}, {
  "acc_x": -1034.682,
  "acc_y": -35.319,
  "acc_z": -179.584,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.6,
  "gyr_y": 8.4,
  "gyr_z": -73.57,
  "sample": 0,
  "time": 7.066
}, {
  "acc_x": -1065.975,
  "acc_y": -35.563,
  "acc_z": -206.485,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.74,
  "gyr_y": 9.52,
  "gyr_z": -79.66,
  "sample": 0,
  "time": 7.085
}, {
  "acc_x": -920.49,
  "acc_y": 493.856,
  "acc_z": -387.533,
  "angle": 0,
  "dev": "A",
  "gyr_x": 35.63,
  "gyr_y": -11.55,
  "gyr_z": -14,
  "sample": 0,
  "time": 7.092
}, {
  "acc_x": -1138.016,
  "acc_y": -153.659,
  "acc_z": -262.117,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.06,
  "gyr_y": 10.08,
  "gyr_z": -86.66,
  "sample": 0,
  "time": 7.1049999999999995
}, {
  "acc_x": -982.466,
  "acc_y": 669.536,
  "acc_z": -421.571,
  "angle": 0,
  "dev": "A",
  "gyr_x": 25.55,
  "gyr_y": -13.86,
  "gyr_z": -15.26,
  "sample": 0,
  "time": 7.111
}, {
  "acc_x": -1046.76,
  "acc_y": 790.743,
  "acc_z": -304.207,
  "angle": 8075948.34259,
  "dev": "A",
  "gyr_x": 22.61,
  "gyr_y": -22.12,
  "gyr_z": -15.89,
  "sample": 8075948,
  "time": 7.130999999999999
}, {
  "acc_x": -1261.541,
  "acc_y": -55.754,
  "acc_z": -258.945,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.4,
  "gyr_y": 8.19,
  "gyr_z": -92.61,
  "sample": 0,
  "time": 7.124999999999999
}, {
  "acc_x": -1397.693,
  "acc_y": 96.746,
  "acc_z": -195.017,
  "angle": 8075948.34259,
  "dev": "B",
  "gyr_x": 31.64,
  "gyr_y": 5.18,
  "gyr_z": -100.1,
  "sample": 7788756,
  "time": 7.143999999999999
}, {
  "acc_x": -1090.985,
  "acc_y": 895.419,
  "acc_z": -125.66,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.38,
  "gyr_y": -33.67,
  "gyr_z": -11.55,
  "sample": 0,
  "time": 7.1499999999999995
}, {
  "acc_x": -1503.162,
  "acc_y": 268.461,
  "acc_z": -103.273,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.35,
  "gyr_y": 3.71,
  "gyr_z": -111.23,
  "sample": 0,
  "time": 7.162999999999999
}, {
  "acc_x": -1671.644,
  "acc_y": 387.228,
  "acc_z": 48.617,
  "angle": -1.0443915908713004e+161,
  "dev": "B",
  "gyr_x": 25.48,
  "gyr_y": 7.35,
  "gyr_z": -124.88,
  "sample": -1.044391545081252e+161,
  "time": 7.1819999999999995
}, {
  "acc_x": -1207.312,
  "acc_y": 829.173,
  "acc_z": 149.267,
  "angle": 8071824.34259,
  "dev": "A",
  "gyr_x": -11.76,
  "gyr_y": -46.27,
  "gyr_z": 1.68,
  "sample": 8071824,
  "time": 7.169
}, {
  "acc_x": -1313.635,
  "acc_y": 464.149,
  "acc_z": 203.557,
  "angle": 0,
  "dev": "A",
  "gyr_x": -24.36,
  "gyr_y": -68.39,
  "gyr_z": 24.22,
  "sample": 0,
  "time": 7.188999999999999
}, {
  "acc_x": -1166.625,
  "acc_y": 259.006,
  "acc_z": 49.959,
  "angle": -1.2528237789941427e+238,
  "dev": "A",
  "gyr_x": -16.1,
  "gyr_y": -99.12,
  "gyr_z": 47.6,
  "sample": -1.2528237258064973e+238,
  "time": 7.207999999999999
}, {
  "acc_x": -1033.767,
  "acc_y": 327.082,
  "acc_z": -261.995,
  "angle": 0,
  "dev": "A",
  "gyr_x": 15.68,
  "gyr_y": -121.24,
  "gyr_z": 71.54,
  "sample": 0,
  "time": 7.227999999999999
}, {
  "acc_x": -1167.723,
  "acc_y": 393.45,
  "acc_z": -471.225,
  "angle": 0,
  "dev": "A",
  "gyr_x": 26.04,
  "gyr_y": -115.08,
  "gyr_z": 92.68,
  "sample": 0,
  "time": 7.248
}, {
  "acc_x": -1629.737,
  "acc_y": 374.662,
  "acc_z": 83.448,
  "angle": -1.0443915908715302e+161,
  "dev": "B",
  "gyr_x": 36.68,
  "gyr_y": 14.07,
  "gyr_z": -137.34,
  "sample": 0,
  "time": 7.201999999999999
}, {
  "acc_x": -1461.133,
  "acc_y": 236.253,
  "acc_z": -119.316,
  "angle": -1.20867202730192e+238,
  "dev": "B",
  "gyr_x": 70.49,
  "gyr_y": 21.49,
  "gyr_z": -139.93,
  "sample": -1.2086719742831765e+238,
  "time": 7.220999999999999
}, {
  "acc_x": -1297.226,
  "acc_y": -182.451,
  "acc_z": -423.218,
  "angle": -1.0443915908690867e+161,
  "dev": "B",
  "gyr_x": 96.11,
  "gyr_y": 29.05,
  "gyr_z": -137.76,
  "sample": -1.0443915450812523e+161,
  "time": 7.239999999999999
}, {
  "acc_x": -1105.015,
  "acc_y": -253.211,
  "acc_z": -482.815,
  "angle": 0,
  "dev": "B",
  "gyr_x": 72.45,
  "gyr_y": 32.06,
  "gyr_z": -133.56,
  "sample": 0,
  "time": 7.259999999999999
}, {
  "acc_x": -835.395,
  "acc_y": -332.206,
  "acc_z": -427.915,
  "angle": 0,
  "dev": "B",
  "gyr_x": 7.42,
  "gyr_y": 35.35,
  "gyr_z": -122.15,
  "sample": 0,
  "time": 7.28
}, {
  "acc_x": -597.434,
  "acc_y": -839.299,
  "acc_z": -363.865,
  "angle": 8071824.34257,
  "dev": "B",
  "gyr_x": -23.52,
  "gyr_y": 23.38,
  "gyr_z": -96.25,
  "sample": 8071824,
  "time": 7.299
}, {
  "acc_x": -1357.677,
  "acc_y": 168.299,
  "acc_z": -538.081,
  "angle": 8071824.3426,
  "dev": "A",
  "gyr_x": 8.68,
  "gyr_y": -93.66,
  "gyr_z": 96.39,
  "sample": 8071824,
  "time": 7.267
}, {
  "acc_x": -1342.793,
  "acc_y": 63.928,
  "acc_z": -492.453,
  "angle": 8071824.34257,
  "dev": "A",
  "gyr_x": -25.34,
  "gyr_y": -77.14,
  "gyr_z": 86.38,
  "sample": -1.0443915450812522e+161,
  "time": 7.2860000000000005
}, {
  "acc_x": -1259.101,
  "acc_y": 90.158,
  "acc_z": -403.454,
  "angle": 1.2540105238240801e+238,
  "dev": "A",
  "gyr_x": -48.86,
  "gyr_y": -73.22,
  "gyr_z": 78.96,
  "sample": 0,
  "time": 7.306
}, {
  "acc_x": -1191.635,
  "acc_y": 57.706,
  "acc_z": -379.847,
  "angle": 0,
  "dev": "A",
  "gyr_x": -61.39,
  "gyr_y": -68.81,
  "gyr_z": 71.33,
  "sample": 0,
  "time": 7.325
}, {
  "acc_x": -505.141,
  "acc_y": -1329.739,
  "acc_z": -425.414,
  "angle": 0,
  "dev": "B",
  "gyr_x": -20.16,
  "gyr_y": 17.43,
  "gyr_z": -57.96,
  "sample": 0,
  "time": 7.3180000000000005
}, {
  "acc_x": -532.652,
  "acc_y": -566.202,
  "acc_z": -494.1,
  "angle": 0,
  "dev": "B",
  "gyr_x": 13.72,
  "gyr_y": 14.84,
  "gyr_z": -20.65,
  "sample": 0,
  "time": 7.336999999999999
}, {
  "acc_x": -343.064,
  "acc_y": -146.644,
  "acc_z": 51.972,
  "angle": 0,
  "dev": "B",
  "gyr_x": 56.7,
  "gyr_y": -0.35,
  "gyr_z": 21.7,
  "sample": 0,
  "time": 7.357
}, {
  "acc_x": -1122.217,
  "acc_y": 114.619,
  "acc_z": -443.531,
  "angle": 0,
  "dev": "A",
  "gyr_x": -70.91,
  "gyr_y": -54.32,
  "gyr_z": 65.24,
  "sample": 0,
  "time": 7.345
}, {
  "acc_x": -1052.189,
  "acc_y": 157.014,
  "acc_z": -395.341,
  "angle": 0,
  "dev": "A",
  "gyr_x": -80.36,
  "gyr_y": -39.55,
  "gyr_z": 60.55,
  "sample": 0,
  "time": 7.364999999999999
}, {
  "acc_x": -247.294,
  "acc_y": -344.772,
  "acc_z": 71.675,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.81,
  "gyr_y": -16.66,
  "gyr_z": 63.63,
  "sample": 7785712,
  "time": 7.376
}, {
  "acc_x": -951.539,
  "acc_y": 8.723,
  "acc_z": -344.894,
  "angle": 0,
  "dev": "A",
  "gyr_x": -94.99,
  "gyr_y": -31.85,
  "gyr_z": 55.23,
  "sample": 0,
  "time": 7.3839999999999995
}, {
  "acc_x": -279.502,
  "acc_y": -679.54,
  "acc_z": -152.561,
  "angle": 0,
  "dev": "B",
  "gyr_x": -29.47,
  "gyr_y": -10.43,
  "gyr_z": 96.39,
  "sample": 0,
  "time": 7.396
}, {
  "acc_x": -409.676,
  "acc_y": -656.238,
  "acc_z": -249.917,
  "angle": 0,
  "dev": "B",
  "gyr_x": -60.2,
  "gyr_y": -9.03,
  "gyr_z": 127.05,
  "sample": 0,
  "time": 7.415
}, {
  "acc_x": -861.869,
  "acc_y": -98.759,
  "acc_z": -346.114,
  "angle": 9.01516950700859e+83,
  "dev": "A",
  "gyr_x": -98.7,
  "gyr_y": -27.3,
  "gyr_z": 48.58,
  "sample": -7790324,
  "time": 7.403999999999999
}, {
  "acc_x": -836.493,
  "acc_y": -48.617,
  "acc_z": -343.186,
  "angle": -1.0834640885738845e+161,
  "dev": "A",
  "gyr_x": -80.64,
  "gyr_y": -21.21,
  "gyr_z": 47.11,
  "sample": -1.0834640426383746e+161,
  "time": 7.422999999999999
}, {
  "acc_x": -515.816,
  "acc_y": -451.705,
  "acc_z": -134.566,
  "angle": 8071824.3426,
  "dev": "B",
  "gyr_x": -54.53,
  "gyr_y": -21.14,
  "gyr_z": 152.11,
  "sample": 8071824,
  "time": 7.435
}, {
  "acc_x": -784.277,
  "acc_y": -85.949,
  "acc_z": -354.654,
  "angle": 0,
  "dev": "A",
  "gyr_x": -59.43,
  "gyr_y": -14.21,
  "gyr_z": 49.21,
  "sample": 0,
  "time": 7.441999999999999
}, {
  "acc_x": -509.167,
  "acc_y": -309.331,
  "acc_z": -58.316,
  "angle": 0,
  "dev": "B",
  "gyr_x": -53.55,
  "gyr_y": -35,
  "gyr_z": 170.17,
  "sample": 1.0818636866838573e+161,
  "time": 7.454
}, {
  "acc_x": -616.039,
  "acc_y": -375.882,
  "acc_z": -164.273,
  "angle": 0,
  "dev": "B",
  "gyr_x": -76.65,
  "gyr_y": -41.86,
  "gyr_z": 188.16,
  "sample": 7788788,
  "time": 7.473
}, {
  "acc_x": -716.201,
  "acc_y": -117.791,
  "acc_z": -357.887,
  "angle": -7789256.3415,
  "dev": "A",
  "gyr_x": -36.26,
  "gyr_y": -8.68,
  "gyr_z": 52.22,
  "sample": -7789256,
  "time": 7.461999999999999
}, {
  "acc_x": -693.021,
  "acc_y": -65.88,
  "acc_z": -361.852,
  "angle": 0,
  "dev": "A",
  "gyr_x": -3.5,
  "gyr_y": -0.49,
  "gyr_z": 54.67,
  "sample": 8071824,
  "time": 7.480999999999999
}, {
  "acc_x": -719.983,
  "acc_y": -543.632,
  "acc_z": -312.076,
  "angle": 0,
  "dev": "B",
  "gyr_x": -104.02,
  "gyr_y": -50.19,
  "gyr_z": 206.36,
  "sample": 0,
  "time": 7.492
}, {
  "acc_x": -826.001,
  "acc_y": -598.654,
  "acc_z": -337.635,
  "angle": 8071824.34258,
  "dev": "B",
  "gyr_x": -100.73,
  "gyr_y": -63.77,
  "gyr_z": 218.33,
  "sample": 8071824,
  "time": 7.512
}, {
  "acc_x": -662.582,
  "acc_y": 48.251,
  "acc_z": -330.803,
  "angle": 9.021065640163619e+83,
  "dev": "A",
  "gyr_x": 17.5,
  "gyr_y": 8.68,
  "gyr_z": 52.64,
  "sample": 9.021065244731587e+83,
  "time": 7.501
}, {
  "acc_x": -693.692,
  "acc_y": 88.694,
  "acc_z": -247.05,
  "angle": 0,
  "dev": "A",
  "gyr_x": 21.14,
  "gyr_y": 18.83,
  "gyr_z": 45.57,
  "sample": -7789256,
  "time": 7.521
}, {
  "acc_x": -852.048,
  "acc_y": -573.4,
  "acc_z": -367.403,
  "angle": -7789256.34151,
  "dev": "B",
  "gyr_x": -76.37,
  "gyr_y": -79.87,
  "gyr_z": 225.89,
  "sample": -7789256,
  "time": 7.531999999999999
}, {
  "acc_x": -687.043,
  "acc_y": 125.843,
  "acc_z": -211.426,
  "angle": 8071824.34258,
  "dev": "A",
  "gyr_x": 15.75,
  "gyr_y": 28.56,
  "gyr_z": 31.36,
  "sample": -1.0834640426383753e+161,
  "time": 7.54
}, {
  "acc_x": -802.272,
  "acc_y": -511.18,
  "acc_z": -322.385,
  "angle": 7788788.34152,
  "dev": "B",
  "gyr_x": -47.95,
  "gyr_y": -93.8,
  "gyr_z": 236.67,
  "sample": 7788788,
  "time": 7.550999999999999
}, {
  "acc_x": -833.321,
  "acc_y": -423.157,
  "acc_z": -221.918,
  "angle": 9.021051745125523e+83,
  "dev": "B",
  "gyr_x": -31.92,
  "gyr_y": -99.05,
  "gyr_z": 249.41,
  "sample": -9.353203273499913e+83,
  "time": 7.569999999999999
}, {
  "acc_x": -630.557,
  "acc_y": 76.433,
  "acc_z": -224.907,
  "angle": -9.35320367020053e+83,
  "dev": "A",
  "gyr_x": -3.01,
  "gyr_y": 33.95,
  "gyr_z": 11.76,
  "sample": 1.08268424452917e+161,
  "time": 7.559
}, {
  "acc_x": -663.619,
  "acc_y": -8.235,
  "acc_z": -142.984,
  "angle": -9.350929513570721e+83,
  "dev": "A",
  "gyr_x": -23.52,
  "gyr_y": 32.06,
  "gyr_z": -11.13,
  "sample": -9.350929116867289e+83,
  "time": 7.579
}, {
  "acc_x": -709.308,
  "acc_y": 166.408,
  "acc_z": -10.126,
  "angle": -1.083194323475463e+161,
  "dev": "A",
  "gyr_x": -38.64,
  "gyr_y": 33.32,
  "gyr_z": -35.14,
  "sample": -1.0831942775428253e+161,
  "time": 7.598
}, {
  "acc_x": -983.93,
  "acc_y": -390.339,
  "acc_z": -137.921,
  "angle": 0,
  "dev": "B",
  "gyr_x": -34.23,
  "gyr_y": -91.07,
  "gyr_z": 259.77,
  "sample": 0,
  "time": 7.589999999999999
}, {
  "acc_x": -1133.868,
  "acc_y": -387.777,
  "acc_z": -236.924,
  "angle": -8080756.34259,
  "dev": "B",
  "gyr_x": -45.71,
  "gyr_y": -75.04,
  "gyr_z": 259.14,
  "sample": -8080756,
  "time": 7.608999999999999
}, {
  "acc_x": -1219.939,
  "acc_y": -317.627,
  "acc_z": -256.688,
  "angle": 0,
  "dev": "B",
  "gyr_x": -38.92,
  "gyr_y": -64.47,
  "gyr_z": 249.55,
  "sample": -1.2086719742831795e+238,
  "time": 7.627999999999999
}, {
  "acc_x": -809.531,
  "acc_y": 416.142,
  "acc_z": -52.155,
  "angle": 0,
  "dev": "A",
  "gyr_x": -70.49,
  "gyr_y": 39.83,
  "gyr_z": -55.16,
  "sample": 0,
  "time": 7.617
}, {
  "acc_x": -836.981,
  "acc_y": 561.81,
  "acc_z": -50.874,
  "angle": 9.021065640163032e+83,
  "dev": "A",
  "gyr_x": -94.71,
  "gyr_y": 35.49,
  "gyr_z": -64.61,
  "sample": 9.021065244731595e+83,
  "time": 7.637
}, {
  "acc_x": -927.383,
  "acc_y": 776.286,
  "acc_z": 110.837,
  "angle": -1.0831943234778705e+161,
  "dev": "A",
  "gyr_x": -56,
  "gyr_y": 20.3,
  "gyr_z": -52.15,
  "sample": -1.0831942775428257e+161,
  "time": 7.656999999999999
}, {
  "acc_x": -1218.719,
  "acc_y": -165.432,
  "acc_z": -271.084,
  "angle": 0,
  "dev": "B",
  "gyr_x": -14.21,
  "gyr_y": -58.1,
  "gyr_z": 236.25,
  "sample": 7788752,
  "time": 7.646999999999999
}, {
  "acc_x": -1047.553,
  "acc_y": 173.362,
  "acc_z": -51.362,
  "angle": 12565872450648736,
  "dev": "B",
  "gyr_x": 11.06,
  "gyr_y": -47.81,
  "gyr_z": 213.01,
  "sample": -8080756,
  "time": 7.666999999999999
}, {
  "acc_x": -945.927,
  "acc_y": 142.069,
  "acc_z": -30.256,
  "angle": -9.018119889426794e+83,
  "dev": "B",
  "gyr_x": 12.67,
  "gyr_y": -28.35,
  "gyr_z": 173.04,
  "sample": 0,
  "time": 7.687
}, {
  "acc_x": -1019.371,
  "acc_y": 1013.454,
  "acc_z": 323.544,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.36,
  "gyr_y": 8.75,
  "gyr_z": -27.37,
  "sample": -1.0834640426383762e+161,
  "time": 7.675999999999999
}, {
  "acc_x": -1084.214,
  "acc_y": 1121.119,
  "acc_z": 439.078,
  "angle": 0,
  "dev": "A",
  "gyr_x": -22.33,
  "gyr_y": 7.21,
  "gyr_z": -9.94,
  "sample": 0,
  "time": 7.696000000000001
}, {
  "acc_x": -903.959,
  "acc_y": 157.319,
  "acc_z": -279.38,
  "angle": -9.018119889435162e+83,
  "dev": "B",
  "gyr_x": -2.31,
  "gyr_y": -9.59,
  "gyr_z": 118.79,
  "sample": -9.018119493981405e+83,
  "time": 7.706
}, {
  "acc_x": -995.52,
  "acc_y": 990.701,
  "acc_z": 258.518,
  "angle": 0,
  "dev": "A",
  "gyr_x": -70.49,
  "gyr_y": 8.89,
  "gyr_z": -0.28,
  "sample": 9.343235890458369e+83,
  "time": 7.714999999999999
}, {
  "acc_x": -830.21,
  "acc_y": 214.964,
  "acc_z": -115.9,
  "angle": 0,
  "dev": "B",
  "gyr_x": 12.46,
  "gyr_y": 1.05,
  "gyr_z": 56.49,
  "sample": -7790320,
  "time": 7.7250000000000005
}, {
  "acc_x": -870.165,
  "acc_y": 187.636,
  "acc_z": -31.537,
  "angle": 0,
  "dev": "B",
  "gyr_x": 13.23,
  "gyr_y": 13.51,
  "gyr_z": -8.47,
  "sample": 0,
  "time": 7.745
}, {
  "acc_x": -821.243,
  "acc_y": 611.342,
  "acc_z": 37.698,
  "angle": 0,
  "dev": "A",
  "gyr_x": -68.88,
  "gyr_y": 19.39,
  "gyr_z": 14.7,
  "sample": 0,
  "time": 7.733999999999999
}, {
  "acc_x": -701.439,
  "acc_y": 448.533,
  "acc_z": -22.509,
  "angle": -1.083194323478334e+161,
  "dev": "A",
  "gyr_x": -42.98,
  "gyr_y": 30.17,
  "gyr_z": 31.43,
  "sample": -1.0831942775428263e+161,
  "time": 7.7540000000000004
}, {
  "acc_x": -915.244,
  "acc_y": 53.68,
  "acc_z": -151.402,
  "angle": 7788752.3415,
  "dev": "B",
  "gyr_x": -23.66,
  "gyr_y": 26.6,
  "gyr_z": -69.51,
  "sample": 7788752,
  "time": 7.764
}, {
  "acc_x": -803.614,
  "acc_y": 226.188,
  "acc_z": -305.854,
  "angle": 0,
  "dev": "A",
  "gyr_x": -11.62,
  "gyr_y": 44.24,
  "gyr_z": 36.12,
  "sample": 1.0818636866838589e+161,
  "time": 7.773000000000001
}, {
  "acc_x": -1025.349,
  "acc_y": 95.709,
  "acc_z": -379.725,
  "angle": 0,
  "dev": "B",
  "gyr_x": -64.75,
  "gyr_y": 36.54,
  "gyr_z": -117.04,
  "sample": 0,
  "time": 7.783
}, {
  "acc_x": -993.629,
  "acc_y": 954.223,
  "acc_z": 8.479,
  "angle": 0,
  "dev": "B",
  "gyr_x": -67.83,
  "gyr_y": 50.26,
  "gyr_z": -120.26,
  "sample": 7785712,
  "time": 7.8020000000000005
}, {
  "acc_x": -1045.113,
  "acc_y": 126.575,
  "acc_z": -392.535,
  "angle": 1.2544800052953237e+238,
  "dev": "A",
  "gyr_x": 10.78,
  "gyr_y": 67.34,
  "gyr_z": 23.8,
  "sample": 1.254479952107368e+238,
  "time": 7.794
}, {
  "acc_x": -1058.35,
  "acc_y": 675.27,
  "acc_z": 355.813,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.42,
  "gyr_y": 83.02,
  "gyr_z": 7,
  "sample": 0,
  "time": 7.813
}, {
  "acc_x": -1528.172,
  "acc_y": 479.094,
  "acc_z": 571.204,
  "angle": 6.49877,
  "dev": "B",
  "gyr_x": -33.04,
  "gyr_y": 36.82,
  "gyr_z": -65.87,
  "sample": -8080756,
  "time": 7.8229999999999995
}, {
  "acc_x": -1304.79,
  "acc_y": 91.195,
  "acc_z": -84.119,
  "angle": 0,
  "dev": "B",
  "gyr_x": -58.52,
  "gyr_y": 39.48,
  "gyr_z": -77.49,
  "sample": 1.2544799521073689e+238,
  "time": 7.842
}, {
  "acc_x": -1422.886,
  "acc_y": 1661.03,
  "acc_z": 145.18,
  "angle": 0,
  "dev": "A",
  "gyr_x": -103.46,
  "gyr_y": 70.56,
  "gyr_z": -25.69,
  "sample": 0,
  "time": 7.832
}, {
  "acc_x": -1430.267,
  "acc_y": 3.965,
  "acc_z": -115.595,
  "angle": -9.018119889442357e+83,
  "dev": "A",
  "gyr_x": -112.84,
  "gyr_y": 65.38,
  "gyr_z": -38.22,
  "sample": -1.0445229415989693e+161,
  "time": 7.851999999999999
}, {
  "acc_x": -1291.126,
  "acc_y": -474.763,
  "acc_z": 188.246,
  "angle": -8080756.34259,
  "dev": "B",
  "gyr_x": -99.75,
  "gyr_y": 49,
  "gyr_z": -106.89,
  "sample": -8080756,
  "time": 7.861
}, {
  "acc_x": -925.492,
  "acc_y": -378.078,
  "acc_z": -311.405,
  "angle": 1.0826875083378669e+161,
  "dev": "A",
  "gyr_x": -21.7,
  "gyr_y": 67.55,
  "gyr_z": -18.48,
  "sample": 1.0826874624030752e+161,
  "time": 7.8709999999999996
}, {
  "acc_x": -446.642,
  "acc_y": 97.783,
  "acc_z": -798.795,
  "angle": -1.044527814197655e+161,
  "dev": "A",
  "gyr_x": -16.66,
  "gyr_y": 60.55,
  "gyr_z": -19.11,
  "sample": -1.0445277684098243e+161,
  "time": 7.89
}, {
  "acc_x": -611.891,
  "acc_y": -519.476,
  "acc_z": -647.576,
  "angle": 0,
  "dev": "A",
  "gyr_x": -10.92,
  "gyr_y": 43.54,
  "gyr_z": -29.82,
  "sample": 0,
  "time": 7.909999999999999
}, {
  "acc_x": -1059.143,
  "acc_y": -126.392,
  "acc_z": -417.606,
  "angle": 0,
  "dev": "B",
  "gyr_x": -118.09,
  "gyr_y": 47.53,
  "gyr_z": -115.78,
  "sample": 0,
  "time": 7.88
}, {
  "acc_x": -855.769,
  "acc_y": -526.186,
  "acc_z": -351.726,
  "angle": 0,
  "dev": "B",
  "gyr_x": -113.26,
  "gyr_y": 54.32,
  "gyr_z": -123.9,
  "sample": 0,
  "time": 7.8999999999999995
}, {
  "acc_x": -595.421,
  "acc_y": -635.498,
  "acc_z": -864.248,
  "angle": -1.044527814197655e+161,
  "dev": "B",
  "gyr_x": -90.09,
  "gyr_y": 51.66,
  "gyr_z": -111.09,
  "sample": -1.0445277684098249e+161,
  "time": 7.919
}, {
  "acc_x": -903.959,
  "acc_y": 159.759,
  "acc_z": -737.124,
  "angle": 0,
  "dev": "A",
  "gyr_x": 35.91,
  "gyr_y": 42.84,
  "gyr_z": -15.12,
  "sample": 0,
  "time": 7.930000000000001
}, {
  "acc_x": -960.933,
  "acc_y": -744.322,
  "acc_z": -520.269,
  "angle": -1.0445229873902186e+161,
  "dev": "B",
  "gyr_x": 3.64,
  "gyr_y": 47.32,
  "gyr_z": -82.11,
  "sample": -1.0445229415989703e+161,
  "time": 7.938
}, {
  "acc_x": -1127.89,
  "acc_y": -263.154,
  "acc_z": -223.626,
  "angle": 0,
  "dev": "B",
  "gyr_x": 80.15,
  "gyr_y": 33.25,
  "gyr_z": -61.32,
  "sample": 0,
  "time": 7.957999999999999
}, {
  "acc_x": -944.402,
  "acc_y": 324.459,
  "acc_z": -553.026,
  "angle": -8080756.34258,
  "dev": "A",
  "gyr_x": 68.53,
  "gyr_y": 40.39,
  "gyr_z": -13.23,
  "sample": -8080756,
  "time": 7.948999999999999
}, {
  "acc_x": -810.202,
  "acc_y": 335.683,
  "acc_z": -515.145,
  "angle": -9.018119889412835e+83,
  "dev": "A",
  "gyr_x": 49.56,
  "gyr_y": 34.58,
  "gyr_z": -23.24,
  "sample": -9.018119493981416e+83,
  "time": 7.969
}, {
  "acc_x": -1009.916,
  "acc_y": 256.322,
  "acc_z": -7.198,
  "angle": 0,
  "dev": "B",
  "gyr_x": 107.38,
  "gyr_y": 19.74,
  "gyr_z": -54.46,
  "sample": 0,
  "time": 7.977999999999999
}, {
  "acc_x": -792.268,
  "acc_y": 325.923,
  "acc_z": -514.535,
  "angle": -8080756.34258,
  "dev": "A",
  "gyr_x": 40.95,
  "gyr_y": 35.77,
  "gyr_z": -30.52,
  "sample": -8080756,
  "time": 7.988
}, {
  "acc_x": -934.093,
  "acc_y": 244.183,
  "acc_z": -133.163,
  "angle": -8080756.3426,
  "dev": "B",
  "gyr_x": 52.43,
  "gyr_y": 18.06,
  "gyr_z": -56.63,
  "sample": -8080756,
  "time": 7.996999999999999
}, {
  "acc_x": -959.469,
  "acc_y": -213.927,
  "acc_z": -401.685,
  "angle": 1.2543197854269329e+238,
  "dev": "B",
  "gyr_x": -24.78,
  "gyr_y": 23.59,
  "gyr_z": -55.51,
  "sample": 1.2543197322402448e+238,
  "time": 8.015999999999998
}, {
  "acc_x": -811.422,
  "acc_y": 292.434,
  "acc_z": -545.401,
  "angle": 1.2543197854290982e+238,
  "dev": "A",
  "gyr_x": 41.23,
  "gyr_y": 38.01,
  "gyr_z": -33.32,
  "sample": 1.2543197322402442e+238,
  "time": 8.007000000000001
}, {
  "acc_x": -858.392,
  "acc_y": 197.945,
  "acc_z": -547.841,
  "angle": 0,
  "dev": "A",
  "gyr_x": 41.09,
  "gyr_y": 39.97,
  "gyr_z": -36.75,
  "sample": 0,
  "time": 8.027000000000001
}, {
  "acc_x": -1030.168,
  "acc_y": -488.976,
  "acc_z": -460.306,
  "angle": 1.0826875083354814e+161,
  "dev": "B",
  "gyr_x": -34.09,
  "gyr_y": 21.35,
  "gyr_z": -49.14,
  "sample": 1.0826874624030767e+161,
  "time": 8.035
}, {
  "acc_x": -840.763,
  "acc_y": 224.968,
  "acc_z": -544.364,
  "angle": 1.0826875083385722e+161,
  "dev": "A",
  "gyr_x": 49.84,
  "gyr_y": 40.6,
  "gyr_z": -36.05,
  "sample": 1.0826874624030763e+161,
  "time": 8.046
}, {
  "acc_x": -1026.752,
  "acc_y": -271.816,
  "acc_z": -336.903,
  "angle": -9.018119889412835e+83,
  "dev": "B",
  "gyr_x": 11.62,
  "gyr_y": 11.9,
  "gyr_z": -41.58,
  "sample": -9.018119493981425e+83,
  "time": 8.055
}, {
  "acc_x": -994.971,
  "acc_y": 50.813,
  "acc_z": -204.228,
  "angle": 0,
  "dev": "B",
  "gyr_x": 47.53,
  "gyr_y": 4.9,
  "gyr_z": -34.86,
  "sample": 0,
  "time": 8.073999999999998
}, {
  "acc_x": -840.763,
  "acc_y": 245.098,
  "acc_z": -502.03,
  "angle": -8079696.34259,
  "dev": "A",
  "gyr_x": 60.34,
  "gyr_y": 38.78,
  "gyr_z": -33.25,
  "sample": 7788752,
  "time": 8.065000000000001
}, {
  "acc_x": -840.458,
  "acc_y": 273.646,
  "acc_z": -476.105,
  "angle": 0,
  "dev": "A",
  "gyr_x": 68.04,
  "gyr_y": 32.97,
  "gyr_z": -31.29,
  "sample": 0,
  "time": 8.085999999999999
}, {
  "acc_x": -961.177,
  "acc_y": 55.449,
  "acc_z": -166.347,
  "angle": 1.2543197854290982e+238,
  "dev": "B",
  "gyr_x": 38.5,
  "gyr_y": 4.55,
  "gyr_z": -31.36,
  "sample": 0,
  "time": 8.093
}, {
  "acc_x": -933.605,
  "acc_y": -121.207,
  "acc_z": -340.319,
  "angle": 1.2543197854266622e+238,
  "dev": "B",
  "gyr_x": 13.93,
  "gyr_y": 7.28,
  "gyr_z": -29.89,
  "sample": 1.2543197322402455e+238,
  "time": 8.113
}, {
  "acc_x": -947.635,
  "acc_y": -192.333,
  "acc_z": -285.358,
  "angle": -1.2545582522063752e+238,
  "dev": "B",
  "gyr_x": 19.81,
  "gyr_y": 13.58,
  "gyr_z": -27.3,
  "sample": -1.254558199019223e+238,
  "time": 8.133
}, {
  "acc_x": -793.732,
  "acc_y": 253.516,
  "acc_z": -475.922,
  "angle": -1.2545582522053134e+238,
  "dev": "A",
  "gyr_x": 68.53,
  "gyr_y": 29.75,
  "gyr_z": -31.22,
  "sample": -1.2545581990192223e+238,
  "time": 8.105
}, {
  "acc_x": -813.74,
  "acc_y": 308.721,
  "acc_z": -446.215,
  "angle": -8080756.34258,
  "dev": "A",
  "gyr_x": 66.01,
  "gyr_y": 26.53,
  "gyr_z": -32.41,
  "sample": 1.2093904796562995e+238,
  "time": 8.123999999999999
}, {
  "acc_x": -965.386,
  "acc_y": -21.411,
  "acc_z": -274.439,
  "angle": -9.018119889427432e+83,
  "dev": "B",
  "gyr_x": 42.35,
  "gyr_y": 11.69,
  "gyr_z": -24.71,
  "sample": -1.0445229415989716e+161,
  "time": 8.152000000000001
}, {
  "acc_x": -963.922,
  "acc_y": 82.96,
  "acc_z": -185.44,
  "angle": -1.0442500044173466e+161,
  "dev": "B",
  "gyr_x": 56.98,
  "gyr_y": 12.04,
  "gyr_z": -22.96,
  "sample": -1.0442499586295181e+161,
  "time": 8.171
}, {
  "acc_x": -816.241,
  "acc_y": 312.32,
  "acc_z": -437.431,
  "angle": -1.0442500044176822e+161,
  "dev": "A",
  "gyr_x": 66.57,
  "gyr_y": 20.3,
  "gyr_z": -33.32,
  "sample": -1.0442499586295175e+161,
  "time": 8.143999999999998
}, {
  "acc_x": -878.156,
  "acc_y": 374.601,
  "acc_z": -420.839,
  "angle": 7788752.34153,
  "dev": "A",
  "gyr_x": 64.4,
  "gyr_y": 11.83,
  "gyr_z": -32.41,
  "sample": 7788752,
  "time": 8.163
}, {
  "acc_x": -826.489,
  "acc_y": 365.39,
  "acc_z": -385.215,
  "angle": -1.0445278141968258e+161,
  "dev": "A",
  "gyr_x": 63.07,
  "gyr_y": 1.54,
  "gyr_z": -31.43,
  "sample": -1.0445277684098262e+161,
  "time": 8.181999999999999
}, {
  "acc_x": -980.819,
  "acc_y": -38.125,
  "acc_z": -223.199,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.32,
  "gyr_y": 12.18,
  "gyr_z": -25.9,
  "sample": 0,
  "time": 8.190000000000001
}, {
  "acc_x": -822.768,
  "acc_y": 379.359,
  "acc_z": -394.487,
  "angle": 0,
  "dev": "A",
  "gyr_x": 64.61,
  "gyr_y": -7.35,
  "gyr_z": -30.17,
  "sample": 0,
  "time": 8.201999999999998
}, {
  "acc_x": -977.891,
  "acc_y": 7.564,
  "acc_z": -277.916,
  "angle": 0,
  "dev": "B",
  "gyr_x": 39.76,
  "gyr_y": 11.27,
  "gyr_z": -29.19,
  "sample": 0,
  "time": 8.21
}, {
  "acc_x": -966.362,
  "acc_y": 106.872,
  "acc_z": -260.592,
  "angle": 0,
  "dev": "B",
  "gyr_x": 51.73,
  "gyr_y": 11.06,
  "gyr_z": -30.87,
  "sample": 0,
  "time": 8.229
}, {
  "acc_x": -805.81,
  "acc_y": 392.901,
  "acc_z": -340.502,
  "angle": 0,
  "dev": "A",
  "gyr_x": 71.54,
  "gyr_y": -16.17,
  "gyr_z": -27.51,
  "sample": -9.01811949398143e+83,
  "time": 8.222000000000001
}, {
  "acc_x": -831.918,
  "acc_y": 333.243,
  "acc_z": -312.747,
  "angle": 0,
  "dev": "A",
  "gyr_x": 69.23,
  "gyr_y": -16.73,
  "gyr_z": -25.55,
  "sample": -1.2086719742831836e+238,
  "time": 8.242
}, {
  "acc_x": -943.487,
  "acc_y": 111.63,
  "acc_z": -230.641,
  "angle": 1.254480005292779e+238,
  "dev": "B",
  "gyr_x": 53.69,
  "gyr_y": 9.38,
  "gyr_z": -34.65,
  "sample": 0,
  "time": 8.248999999999999
}, {
  "acc_x": -805.627,
  "acc_y": 305.671,
  "acc_z": -400.343,
  "angle": 0,
  "dev": "A",
  "gyr_x": 59.15,
  "gyr_y": -12.67,
  "gyr_z": -25.27,
  "sample": 0,
  "time": 8.261
}, {
  "acc_x": -956.236,
  "acc_y": 34.343,
  "acc_z": -233.325,
  "angle": 0,
  "dev": "B",
  "gyr_x": 50.54,
  "gyr_y": 10.08,
  "gyr_z": -39.48,
  "sample": 0,
  "time": 8.268999999999998
}, {
  "acc_x": -926.956,
  "acc_y": -103.029,
  "acc_z": -253.394,
  "angle": 0,
  "dev": "B",
  "gyr_x": 44.8,
  "gyr_y": 8.33,
  "gyr_z": -43.61,
  "sample": 1.0426501389873181e+161,
  "time": 8.288
}, {
  "acc_x": -774.578,
  "acc_y": 272.487,
  "acc_z": -415.715,
  "angle": -1.0445278141978448e+161,
  "dev": "A",
  "gyr_x": 53.34,
  "gyr_y": -7.28,
  "gyr_z": -25.55,
  "sample": -1.0445277684098268e+161,
  "time": 8.280000000000001
}, {
  "acc_x": -808.982,
  "acc_y": 249.856,
  "acc_z": -425.963,
  "angle": 7788752.34152,
  "dev": "A",
  "gyr_x": 50.82,
  "gyr_y": -3.57,
  "gyr_z": -27.51,
  "sample": 7788752,
  "time": 8.3
}, {
  "acc_x": -938.302,
  "acc_y": -128.222,
  "acc_z": -248.087,
  "angle": -1.2545582522052278e+238,
  "dev": "B",
  "gyr_x": 38.57,
  "gyr_y": 8.05,
  "gyr_z": -46.27,
  "sample": 0,
  "time": 8.306999999999999
}, {
  "acc_x": -961.299,
  "acc_y": -93.025,
  "acc_z": -211.609,
  "angle": 1.0826875083357631e+161,
  "dev": "B",
  "gyr_x": 35.7,
  "gyr_y": 8.54,
  "gyr_z": -48.3,
  "sample": 1.0826874624030786e+161,
  "time": 8.326
}, {
  "acc_x": -825.94,
  "acc_y": 262.91,
  "acc_z": -406.87,
  "angle": 0,
  "dev": "A",
  "gyr_x": 49.7,
  "gyr_y": -3.15,
  "gyr_z": -30.38,
  "sample": 0,
  "time": 8.318999999999999
}, {
  "acc_x": -880.474,
  "acc_y": 326.96,
  "acc_z": -385.276,
  "angle": 1.0826875083385282e+161,
  "dev": "A",
  "gyr_x": 47.6,
  "gyr_y": -1.61,
  "gyr_z": -31.92,
  "sample": 7788752,
  "time": 8.338000000000001
}, {
  "acc_x": -885.964,
  "acc_y": 346.419,
  "acc_z": -383.263,
  "angle": -8080756.3426,
  "dev": "A",
  "gyr_x": 43.75,
  "gyr_y": -0.98,
  "gyr_z": -31.43,
  "sample": -8080756,
  "time": 8.358999999999998
}, {
  "acc_x": -986.736,
  "acc_y": -35.563,
  "acc_z": -202.642,
  "angle": -1.0445278142012672e+161,
  "dev": "B",
  "gyr_x": 31.64,
  "gyr_y": 8.96,
  "gyr_z": -51.24,
  "sample": -1.0445277684098277e+161,
  "time": 8.346
}, {
  "acc_x": -1014.613,
  "acc_y": -29.829,
  "acc_z": -254.919,
  "angle": 1.0447337581276487e+161,
  "dev": "B",
  "gyr_x": 25.9,
  "gyr_y": 8.89,
  "gyr_z": -56.21,
  "sample": 1.0447337123396317e+161,
  "time": 8.364999999999998
}, {
  "acc_x": -880.169,
  "acc_y": 345.809,
  "acc_z": -390.522,
  "angle": 1.2544800052965152e+238,
  "dev": "A",
  "gyr_x": 42.35,
  "gyr_y": -2.52,
  "gyr_z": -29.12,
  "sample": 1.2544799521073724e+238,
  "time": 8.378
}, {
  "acc_x": -1031.571,
  "acc_y": -58.072,
  "acc_z": -257.176,
  "angle": -1.0445278142002183e+161,
  "dev": "B",
  "gyr_x": 22.89,
  "gyr_y": 8.75,
  "gyr_z": -61.6,
  "sample": -1.0445277684098279e+161,
  "time": 8.384999999999998
}, {
  "acc_x": -1027.362,
  "acc_y": -22.692,
  "acc_z": -239.547,
  "angle": -9.018119889412835e+83,
  "dev": "B",
  "gyr_x": 25.55,
  "gyr_y": 8.12,
  "gyr_z": -66.71,
  "sample": -9.018119493981444e+83,
  "time": 8.404
}, {
  "acc_x": -878.034,
  "acc_y": 378.2,
  "acc_z": -356.24,
  "angle": 0,
  "dev": "A",
  "gyr_x": 43.33,
  "gyr_y": -8.47,
  "gyr_z": -25.69,
  "sample": 0,
  "time": 8.396999999999998
}, {
  "acc_x": -874.13,
  "acc_y": 464.149,
  "acc_z": -332.755,
  "angle": -1.2545563891846645e+238,
  "dev": "A",
  "gyr_x": 44.45,
  "gyr_y": -15.96,
  "gyr_z": -21.77,
  "sample": 0,
  "time": 8.416999999999998
}, {
  "acc_x": -1049.444,
  "acc_y": 2.135,
  "acc_z": -226.249,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28,
  "gyr_y": 8.26,
  "gyr_z": -72.73,
  "sample": 0,
  "time": 8.424
}, {
  "acc_x": -1094.645,
  "acc_y": 2.562,
  "acc_z": -231.739,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.84,
  "gyr_y": 9.03,
  "gyr_z": -80.08,
  "sample": 0,
  "time": 8.443000000000001
}, {
  "acc_x": -915.732,
  "acc_y": 510.936,
  "acc_z": -310.856,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.63,
  "gyr_y": -22.33,
  "gyr_z": -17.92,
  "sample": 0,
  "time": 8.436
}, {
  "acc_x": -1160.708,
  "acc_y": 37.881,
  "acc_z": -207.156,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.01,
  "gyr_y": 9.94,
  "gyr_z": -88.62,
  "sample": 0,
  "time": 8.462
}, {
  "acc_x": -957.639,
  "acc_y": 602.741,
  "acc_z": -266.326,
  "angle": -1.0445278141978448e+161,
  "dev": "A",
  "gyr_x": 34.65,
  "gyr_y": -25.48,
  "gyr_z": -13.23,
  "sample": -1.0445277684098279e+161,
  "time": 8.454999999999998
}, {
  "acc_x": -988.078,
  "acc_y": 754.936,
  "acc_z": -235.216,
  "angle": -1.0429923520357556e+161,
  "dev": "A",
  "gyr_x": 24.71,
  "gyr_y": -30.38,
  "gyr_z": -7.98,
  "sample": -1.042992306245691e+161,
  "time": 8.475000000000001
}, {
  "acc_x": -1081.164,
  "acc_y": 792.085,
  "acc_z": -62.647,
  "angle": 0,
  "dev": "A",
  "gyr_x": 11.69,
  "gyr_y": -33.04,
  "gyr_z": -0.56,
  "sample": 0,
  "time": 8.495000000000001
}, {
  "acc_x": -1276.486,
  "acc_y": 115.107,
  "acc_z": -223.748,
  "angle": 1.0826875083377151e+161,
  "dev": "B",
  "gyr_x": 34.86,
  "gyr_y": 9.66,
  "gyr_z": -97.86,
  "sample": 1.0826874624030796e+161,
  "time": 8.480999999999998
}, {
  "acc_x": -1370.853,
  "acc_y": 85.888,
  "acc_z": -136.274,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.28,
  "gyr_y": 8.82,
  "gyr_z": -109.62,
  "sample": 0,
  "time": 8.501000000000001
}, {
  "acc_x": -1514.813,
  "acc_y": 322.202,
  "acc_z": -110.837,
  "angle": 9.350341289738433e+83,
  "dev": "B",
  "gyr_x": 43.75,
  "gyr_y": 8.12,
  "gyr_z": -121.31,
  "sample": -1.0445277684098288e+161,
  "time": 8.52
}, {
  "acc_x": -996.008,
  "acc_y": 870.348,
  "acc_z": 47.885,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.49,
  "gyr_y": -45.71,
  "gyr_z": 8.96,
  "sample": 0,
  "time": 8.514
}, {
  "acc_x": -1192.611,
  "acc_y": 735.416,
  "acc_z": 145.119,
  "angle": 1.0826875083353755e+161,
  "dev": "A",
  "gyr_x": -0.7,
  "gyr_y": -67.69,
  "gyr_z": 24.22,
  "sample": 1.0826874624030794e+161,
  "time": 8.533999999999999
}, {
  "acc_x": -1595.882,
  "acc_y": 571.509,
  "acc_z": 43.981,
  "angle": 0,
  "dev": "B",
  "gyr_x": 54.53,
  "gyr_y": 8.82,
  "gyr_z": -134.19,
  "sample": 0,
  "time": 8.54
}, {
  "acc_x": -1668.96,
  "acc_y": 398.452,
  "acc_z": 109.251,
  "angle": 0,
  "dev": "B",
  "gyr_x": 63.56,
  "gyr_y": 11.48,
  "gyr_z": -144.97,
  "sample": 0,
  "time": 8.559000000000001
}, {
  "acc_x": -1205.482,
  "acc_y": 548.512,
  "acc_z": 33.794,
  "angle": 1.0426501847707983e+161,
  "dev": "A",
  "gyr_x": -9.94,
  "gyr_y": -94.22,
  "gyr_z": 45.64,
  "sample": 1.0426501389873194e+161,
  "time": 8.553
}, {
  "acc_x": -1142.652,
  "acc_y": 463.356,
  "acc_z": -262.422,
  "angle": 0,
  "dev": "A",
  "gyr_x": -18.62,
  "gyr_y": -112.56,
  "gyr_z": 67.62,
  "sample": -1.083464042638382e+161,
  "time": 8.572
}, {
  "acc_x": -1539.396,
  "acc_y": 324.581,
  "acc_z": -255.529,
  "angle": -1.0429923520326888e+161,
  "dev": "B",
  "gyr_x": 85.89,
  "gyr_y": 18.41,
  "gyr_z": -146.58,
  "sample": -1.0429923062456921e+161,
  "time": 8.579
}, {
  "acc_x": -1257.21,
  "acc_y": 353.922,
  "acc_z": -612.501,
  "angle": 0,
  "dev": "A",
  "gyr_x": -19.32,
  "gyr_y": -110.11,
  "gyr_z": 88.41,
  "sample": 0,
  "time": 8.591999999999999
}, {
  "acc_x": -1430.999,
  "acc_y": 137.311,
  "acc_z": -686.738,
  "angle": -9.018119889442357e+83,
  "dev": "A",
  "gyr_x": -21.07,
  "gyr_y": -93.45,
  "gyr_z": 95.2,
  "sample": -9.018119493981451e+83,
  "time": 8.611
}, {
  "acc_x": -1281.61,
  "acc_y": -427.305,
  "acc_z": -541.375,
  "angle": -1.0429923520335179e+161,
  "dev": "B",
  "gyr_x": 64.33,
  "gyr_y": 33.74,
  "gyr_z": -143.78,
  "sample": -1.0429923062456923e+161,
  "time": 8.597999999999999
}, {
  "acc_x": -1064.084,
  "acc_y": -596.763,
  "acc_z": -437.553,
  "angle": -1.0429923520337377e+161,
  "dev": "B",
  "gyr_x": 21.7,
  "gyr_y": 37.38,
  "gyr_z": -137.69,
  "sample": -1.0429923062456924e+161,
  "time": 8.617
}, {
  "acc_x": -1380.735,
  "acc_y": 21.777,
  "acc_z": -555.344,
  "angle": 0,
  "dev": "A",
  "gyr_x": -42.98,
  "gyr_y": -77.77,
  "gyr_z": 86.73,
  "sample": 0,
  "time": 8.629999999999999
}, {
  "acc_x": -1246.413,
  "acc_y": -51.85,
  "acc_z": -387.045,
  "angle": 0,
  "dev": "A",
  "gyr_x": -65.38,
  "gyr_y": -73.99,
  "gyr_z": 78.47,
  "sample": 0,
  "time": 8.651
}, {
  "acc_x": -1179.618,
  "acc_y": -64.538,
  "acc_z": -289.262,
  "angle": 0,
  "dev": "A",
  "gyr_x": -70.42,
  "gyr_y": -74.13,
  "gyr_z": 74.83,
  "sample": 0,
  "time": 8.669999999999998
}, {
  "acc_x": -1116.239,
  "acc_y": 62.769,
  "acc_z": -346.358,
  "angle": 7788788.34152,
  "dev": "A",
  "gyr_x": -72.24,
  "gyr_y": -61.39,
  "gyr_z": 67.69,
  "sample": 7788788,
  "time": 8.690000000000001
}, {
  "acc_x": -694.424,
  "acc_y": -511.912,
  "acc_z": -402.356,
  "angle": 0,
  "dev": "B",
  "gyr_x": -10.85,
  "gyr_y": 29.12,
  "gyr_z": -112.21,
  "sample": 0,
  "time": 8.636
}, {
  "acc_x": -452.559,
  "acc_y": -816.546,
  "acc_z": -395.707,
  "angle": -9.360336462890836e+83,
  "dev": "B",
  "gyr_x": -28.77,
  "gyr_y": 14.7,
  "gyr_z": -72.38,
  "sample": -1.0429923062456926e+161,
  "time": 8.655999999999999
}, {
  "acc_x": -363.011,
  "acc_y": -1441.247,
  "acc_z": -519.781,
  "angle": 0,
  "dev": "B",
  "gyr_x": -32.48,
  "gyr_y": -0.98,
  "gyr_z": -35.56,
  "sample": 7788788,
  "time": 8.675999999999998
}, {
  "acc_x": -367.342,
  "acc_y": -549.549,
  "acc_z": -416.02,
  "angle": -9.360336462915544e+83,
  "dev": "B",
  "gyr_x": -15.26,
  "gyr_y": -7.63,
  "gyr_z": -13.93,
  "sample": 0,
  "time": 8.695
}, {
  "acc_x": -264.74,
  "acc_y": -217.953,
  "acc_z": 59.719,
  "angle": 0,
  "dev": "B",
  "gyr_x": 32.69,
  "gyr_y": -8.61,
  "gyr_z": 24.71,
  "sample": 0,
  "time": 8.713999999999999
}, {
  "acc_x": -1102.209,
  "acc_y": 73.322,
  "acc_z": -393.45,
  "angle": 0,
  "dev": "A",
  "gyr_x": -74.69,
  "gyr_y": -41.16,
  "gyr_z": 60.13,
  "sample": 0,
  "time": 8.709
}, {
  "acc_x": -235.094,
  "acc_y": -356.667,
  "acc_z": 129.747,
  "angle": 0,
  "dev": "B",
  "gyr_x": 23.17,
  "gyr_y": -22.33,
  "gyr_z": 70.07,
  "sample": 0,
  "time": 8.733999999999998
}, {
  "acc_x": -1029.68,
  "acc_y": 41.724,
  "acc_z": -368.44,
  "angle": -1.2086707852903865e+238,
  "dev": "A",
  "gyr_x": -82.32,
  "gyr_y": -33.46,
  "gyr_z": 52.22,
  "sample": 0,
  "time": 8.727999999999998
}, {
  "acc_x": -935.618,
  "acc_y": -100.467,
  "acc_z": -366.305,
  "angle": 0,
  "dev": "A",
  "gyr_x": -89.6,
  "gyr_y": -30.8,
  "gyr_z": 45.15,
  "sample": 0,
  "time": 8.748000000000001
}, {
  "acc_x": -289.262,
  "acc_y": -662.765,
  "acc_z": -132.126,
  "angle": 0,
  "dev": "B",
  "gyr_x": -40.53,
  "gyr_y": -19.95,
  "gyr_z": 108.08,
  "sample": 0,
  "time": 8.753
}, {
  "acc_x": -407.724,
  "acc_y": -751.215,
  "acc_z": -352.702,
  "angle": -9.350934145238658e+83,
  "dev": "B",
  "gyr_x": -73.15,
  "gyr_y": -19.39,
  "gyr_z": 139.02,
  "sample": 0,
  "time": 8.771999999999998
}, {
  "acc_x": -822.707,
  "acc_y": -129.503,
  "acc_z": -367.708,
  "angle": -9.360313304478389e+83,
  "dev": "A",
  "gyr_x": -76.44,
  "gyr_y": -30.31,
  "gyr_z": 42.91,
  "sample": -9.360312907779146e+83,
  "time": 8.767
}, {
  "acc_x": -548.878,
  "acc_y": -530.883,
  "acc_z": -294.02,
  "angle": 0,
  "dev": "B",
  "gyr_x": -63.63,
  "gyr_y": -26.32,
  "gyr_z": 159.32,
  "sample": 1.083393785724831e+161,
  "time": 8.791
}, {
  "acc_x": -761.097,
  "acc_y": -29.402,
  "acc_z": -412.238,
  "angle": 0,
  "dev": "A",
  "gyr_x": -45.5,
  "gyr_y": -26.32,
  "gyr_z": 45.85,
  "sample": 0,
  "time": 8.786999999999999
}, {
  "acc_x": -750.91,
  "acc_y": 14.945,
  "acc_z": -432.429,
  "angle": -1.0429923520337377e+161,
  "dev": "A",
  "gyr_x": -17.29,
  "gyr_y": -12.39,
  "gyr_z": 50.61,
  "sample": -1.0429923062456931e+161,
  "time": 8.806999999999999
}, {
  "acc_x": -550.647,
  "acc_y": -382.226,
  "acc_z": -217.099,
  "angle": -1.0429923520374379e+161,
  "dev": "B",
  "gyr_x": -44.73,
  "gyr_y": -43.47,
  "gyr_z": 173.6,
  "sample": 0,
  "time": 8.812000000000001
}, {
  "acc_x": -629.642,
  "acc_y": -380.152,
  "acc_z": -314.15,
  "angle": 1.0818626599916313e+161,
  "dev": "B",
  "gyr_x": -61.04,
  "gyr_y": -55.72,
  "gyr_z": 188.86,
  "sample": -1.2528237258065099e+238,
  "time": 8.831
}, {
  "acc_x": -778.421,
  "acc_y": -506.117,
  "acc_z": -416.142,
  "angle": 0,
  "dev": "B",
  "gyr_x": -82.25,
  "gyr_y": -67.06,
  "gyr_z": 202.65,
  "sample": 0,
  "time": 8.850000000000001
}, {
  "acc_x": -724.009,
  "acc_y": 122.305,
  "acc_z": -419.741,
  "angle": 0,
  "dev": "A",
  "gyr_x": 1.61,
  "gyr_y": 1.19,
  "gyr_z": 53.9,
  "sample": 0,
  "time": 8.826
}, {
  "acc_x": -683.505,
  "acc_y": 165.798,
  "acc_z": -390.644,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.79,
  "gyr_y": 14.35,
  "gyr_z": 53.06,
  "sample": 1.0426501389873213e+161,
  "time": 8.844999999999999
}, {
  "acc_x": -689.605,
  "acc_y": 150.609,
  "acc_z": -290.055,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.3,
  "gyr_y": 27.86,
  "gyr_z": 47.67,
  "sample": -7792344,
  "time": 8.864999999999998
}, {
  "acc_x": -734.989,
  "acc_y": 96.685,
  "acc_z": -239.791,
  "angle": 0,
  "dev": "A",
  "gyr_x": 3.78,
  "gyr_y": 37.73,
  "gyr_z": 37.94,
  "sample": 0,
  "time": 8.884
}, {
  "acc_x": -829.051,
  "acc_y": -545.889,
  "acc_z": -413.458,
  "angle": 0,
  "dev": "B",
  "gyr_x": -87.71,
  "gyr_y": -77.14,
  "gyr_z": 208.81,
  "sample": 0,
  "time": 8.869
}, {
  "acc_x": -861.259,
  "acc_y": -542.046,
  "acc_z": -383.69,
  "angle": 7785708.34153,
  "dev": "B",
  "gyr_x": -79.1,
  "gyr_y": -87.85,
  "gyr_z": 215.25,
  "sample": 0,
  "time": 8.889
}, {
  "acc_x": -721.386,
  "acc_y": 40.321,
  "acc_z": -215.269,
  "angle": 0,
  "dev": "A",
  "gyr_x": -14.35,
  "gyr_y": 42.49,
  "gyr_z": 22.26,
  "sample": -7792376,
  "time": 8.902999999999999
}, {
  "acc_x": -679.357,
  "acc_y": 2.562,
  "acc_z": -186.843,
  "angle": 0,
  "dev": "A",
  "gyr_x": -49.91,
  "gyr_y": 35,
  "gyr_z": -0.77,
  "sample": 0,
  "time": 8.924
}, {
  "acc_x": -697.718,
  "acc_y": -7.564,
  "acc_z": -121.024,
  "angle": 7785708.34153,
  "dev": "A",
  "gyr_x": -73.29,
  "gyr_y": 30.03,
  "gyr_z": -24.15,
  "sample": 7785708,
  "time": 8.943000000000001
}, {
  "acc_x": -770.491,
  "acc_y": 101.504,
  "acc_z": -69.784,
  "angle": 0,
  "dev": "A",
  "gyr_x": -80.71,
  "gyr_y": 32.97,
  "gyr_z": -43.89,
  "sample": 0,
  "time": 8.962
}, {
  "acc_x": -832.589,
  "acc_y": -542.839,
  "acc_z": -329.888,
  "angle": 0,
  "dev": "B",
  "gyr_x": -59.64,
  "gyr_y": -95.41,
  "gyr_z": 225.19,
  "sample": 0,
  "time": 8.908000000000001
}, {
  "acc_x": -826.184,
  "acc_y": 314.76,
  "acc_z": 23.424,
  "angle": 0,
  "dev": "A",
  "gyr_x": -85.05,
  "gyr_y": 35.07,
  "gyr_z": -56.63,
  "sample": 0,
  "time": 8.982
}, {
  "acc_x": -834.907,
  "acc_y": 393.694,
  "acc_z": 35.929,
  "angle": 0,
  "dev": "A",
  "gyr_x": -73.85,
  "gyr_y": 28.56,
  "gyr_z": -58.8,
  "sample": 0,
  "time": 9.001000000000001
}, {
  "acc_x": -907.741,
  "acc_y": 736.697,
  "acc_z": 109.434,
  "angle": 0,
  "dev": "A",
  "gyr_x": -25.83,
  "gyr_y": 22.75,
  "gyr_z": -44.87,
  "sample": 0,
  "time": 9.02
}, {
  "acc_x": -790.011,
  "acc_y": -521.55,
  "acc_z": -196.603,
  "angle": 1.0818631963038426e+161,
  "dev": "B",
  "gyr_x": -41.58,
  "gyr_y": -97.16,
  "gyr_z": 236.46,
  "sample": 1.0818631503715496e+161,
  "time": 8.927
}, {
  "acc_x": -1071.709,
  "acc_y": 1006.561,
  "acc_z": 354.532,
  "angle": -1.083333228367773e+161,
  "dev": "A",
  "gyr_x": 5.32,
  "gyr_y": 17.85,
  "gyr_z": -23.94,
  "sample": -1.0833331824329887e+161,
  "time": 9.04
}, {
  "acc_x": -896.334,
  "acc_y": -377.041,
  "acc_z": -108.946,
  "angle": 0,
  "dev": "B",
  "gyr_x": -37.17,
  "gyr_y": -85.26,
  "gyr_z": 247.8,
  "sample": -1.208986824952308e+238,
  "time": 8.946000000000002
}, {
  "acc_x": -1056.459,
  "acc_y": -361.059,
  "acc_z": -206.058,
  "angle": 0,
  "dev": "B",
  "gyr_x": -41.72,
  "gyr_y": -66.57,
  "gyr_z": 252,
  "sample": 7788788,
  "time": 8.966999999999999
}, {
  "acc_x": -1195.478,
  "acc_y": -308.599,
  "acc_z": -216.611,
  "angle": 0,
  "dev": "B",
  "gyr_x": -35.49,
  "gyr_y": -53.41,
  "gyr_z": 246.75,
  "sample": 0,
  "time": 8.986
}, {
  "acc_x": -1260.382,
  "acc_y": -249.246,
  "acc_z": -291.702,
  "angle": 0,
  "dev": "B",
  "gyr_x": -16.52,
  "gyr_y": -46.9,
  "gyr_z": 237.09,
  "sample": 0,
  "time": 9.004999999999999
}, {
  "acc_x": -1079.273,
  "acc_y": 1137.528,
  "acc_z": 298.107,
  "angle": 0,
  "dev": "A",
  "gyr_x": -37.87,
  "gyr_y": 14.98,
  "gyr_z": -4.76,
  "sample": 0,
  "time": 9.059000000000001
}, {
  "acc_x": -982.527,
  "acc_y": 885.354,
  "acc_z": 79.178,
  "angle": 8067716.34261,
  "dev": "A",
  "gyr_x": -71.75,
  "gyr_y": 6.58,
  "gyr_z": 13.51,
  "sample": 0,
  "time": 9.079
}, {
  "acc_x": -825.147,
  "acc_y": 497.699,
  "acc_z": 43.798,
  "angle": 0,
  "dev": "A",
  "gyr_x": -30.94,
  "gyr_y": 2.24,
  "gyr_z": 33.53,
  "sample": 0,
  "time": 9.099
}, {
  "acc_x": -1129.964,
  "acc_y": 76.677,
  "acc_z": -177.937,
  "angle": 0,
  "dev": "B",
  "gyr_x": 5.6,
  "gyr_y": -43.47,
  "gyr_z": 218.4,
  "sample": 0,
  "time": 9.024000000000001
}, {
  "acc_x": -944.768,
  "acc_y": 130.54,
  "acc_z": 29.524,
  "angle": 0,
  "dev": "B",
  "gyr_x": 16.52,
  "gyr_y": -34.37,
  "gyr_z": 182.49,
  "sample": 0,
  "time": 9.044
}, {
  "acc_x": -916.647,
  "acc_y": 48.556,
  "acc_z": -248.575,
  "angle": 0,
  "dev": "B",
  "gyr_x": 3.57,
  "gyr_y": -17.29,
  "gyr_z": 131.04,
  "sample": 0,
  "time": 9.062999999999999
}, {
  "acc_x": -856.44,
  "acc_y": 176.534,
  "acc_z": -185.867,
  "angle": 0,
  "dev": "B",
  "gyr_x": 16.03,
  "gyr_y": -2.73,
  "gyr_z": 69.3,
  "sample": 0,
  "time": 9.082
}, {
  "acc_x": -914.939,
  "acc_y": 70.76,
  "acc_z": -193.187,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.18,
  "gyr_y": 8.26,
  "gyr_z": 3.08,
  "sample": 0,
  "time": 9.102
}, {
  "acc_x": -917.989,
  "acc_y": -86.559,
  "acc_z": -207.278,
  "angle": -8075400.34259,
  "dev": "B",
  "gyr_x": 10.78,
  "gyr_y": 19.67,
  "gyr_z": -53.9,
  "sample": -8075400,
  "time": 9.122
}, {
  "acc_x": -802.028,
  "acc_y": 355.325,
  "acc_z": -115.9,
  "angle": 9.2192553813502e+83,
  "dev": "A",
  "gyr_x": 7.28,
  "gyr_y": 12.95,
  "gyr_z": 42.21,
  "sample": -8076468,
  "time": 9.117999999999999
}, {
  "acc_x": -928.176,
  "acc_y": 316.895,
  "acc_z": -326.289,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.23,
  "gyr_y": 46.9,
  "gyr_z": 36.05,
  "sample": 0,
  "time": 9.137
}, {
  "acc_x": -1028.094,
  "acc_y": 467.504,
  "acc_z": -227.286,
  "angle": 0,
  "dev": "B",
  "gyr_x": -8.47,
  "gyr_y": 37.94,
  "gyr_z": -92.26,
  "sample": 0,
  "time": 9.140999999999998
}, {
  "acc_x": -1251.72,
  "acc_y": 1113.25,
  "acc_z": 175.497,
  "angle": 0,
  "dev": "B",
  "gyr_x": -16.45,
  "gyr_y": 47.04,
  "gyr_z": -88.13,
  "sample": 0,
  "time": 9.16
}, {
  "acc_x": -1160.342,
  "acc_y": 497.638,
  "acc_z": 61.122,
  "angle": 0,
  "dev": "A",
  "gyr_x": 2.38,
  "gyr_y": 71.12,
  "gyr_z": 23.03,
  "sample": 0,
  "time": 9.157
}, {
  "acc_x": -1484.801,
  "acc_y": 559.98,
  "acc_z": 638.609,
  "angle": 0,
  "dev": "B",
  "gyr_x": -33.81,
  "gyr_y": 36.19,
  "gyr_z": -66.36,
  "sample": -1.2550357535844226e+238,
  "time": 9.178999999999998
}, {
  "acc_x": -1207.861,
  "acc_y": 1347.49,
  "acc_z": 379.115,
  "angle": 0,
  "dev": "A",
  "gyr_x": -44.24,
  "gyr_y": 66.5,
  "gyr_z": -5.46,
  "sample": -7792376,
  "time": 9.175999999999998
}, {
  "acc_x": -1289.052,
  "acc_y": 830.149,
  "acc_z": -366.915,
  "angle": -7793400.34153,
  "dev": "A",
  "gyr_x": -141.19,
  "gyr_y": 57.54,
  "gyr_z": -28.56,
  "sample": -7793400,
  "time": 9.196000000000002
}, {
  "acc_x": -1269.959,
  "acc_y": -168.665,
  "acc_z": -7.869,
  "angle": 1.2098662242233226e+238,
  "dev": "B",
  "gyr_x": -91.77,
  "gyr_y": 37.38,
  "gyr_z": -98.42,
  "sample": 1.209866171199789e+238,
  "time": 9.198999999999998
}, {
  "acc_x": -1100.989,
  "acc_y": -154.208,
  "acc_z": -98.942,
  "angle": 0,
  "dev": "B",
  "gyr_x": -141.89,
  "gyr_y": 44.31,
  "gyr_z": -118.37,
  "sample": 0,
  "time": 9.218
}, {
  "acc_x": -753.045,
  "acc_y": -149.206,
  "acc_z": -432.734,
  "angle": 0,
  "dev": "B",
  "gyr_x": -153.02,
  "gyr_y": 43.89,
  "gyr_z": -124.04,
  "sample": 0,
  "time": 9.238
}, {
  "acc_x": -858.697,
  "acc_y": -677.466,
  "acc_z": -118.096,
  "angle": 0,
  "dev": "A",
  "gyr_x": -62.65,
  "gyr_y": 74.62,
  "gyr_z": -21.21,
  "sample": 0,
  "time": 9.216000000000001
}, {
  "acc_x": -470.066,
  "acc_y": -49.715,
  "acc_z": -736.331,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.27,
  "gyr_y": 75.46,
  "gyr_z": -14,
  "sample": 0,
  "time": 9.235
}, {
  "acc_x": -507.703,
  "acc_y": 189.527,
  "acc_z": -763.903,
  "angle": 0,
  "dev": "A",
  "gyr_x": -23.38,
  "gyr_y": 63.7,
  "gyr_z": -35.91,
  "sample": 0,
  "time": 9.254999999999999
}, {
  "acc_x": -765.245,
  "acc_y": -471.53,
  "acc_z": -704.977,
  "angle": 0,
  "dev": "B",
  "gyr_x": -130.55,
  "gyr_y": 37.03,
  "gyr_z": -108.5,
  "sample": 0,
  "time": 9.257000000000001
}, {
  "acc_x": -882.609,
  "acc_y": -561.688,
  "acc_z": -790.743,
  "angle": -9.352143014642514e+83,
  "dev": "B",
  "gyr_x": -95.69,
  "gyr_y": 43.54,
  "gyr_z": -94.64,
  "sample": -9.352142617962594e+83,
  "time": 9.277000000000001
}, {
  "acc_x": -1047.37,
  "acc_y": -291.946,
  "acc_z": -620.431,
  "angle": -7787224.34151,
  "dev": "A",
  "gyr_x": -13.44,
  "gyr_y": 62.79,
  "gyr_z": -23.73,
  "sample": -7787256,
  "time": 9.274000000000001
}, {
  "acc_x": -1074.332,
  "acc_y": 195.322,
  "acc_z": -455.67,
  "angle": -8084832.34261,
  "dev": "A",
  "gyr_x": 40.11,
  "gyr_y": 59.71,
  "gyr_z": -8.75,
  "sample": -8084832,
  "time": 9.293
}, {
  "acc_x": -902.617,
  "acc_y": 287.859,
  "acc_z": -460.245,
  "angle": 0,
  "dev": "A",
  "gyr_x": 39.83,
  "gyr_y": 51.17,
  "gyr_z": -21.49,
  "sample": 1.2554344402305258e+238,
  "time": 9.312999999999999
}, {
  "acc_x": -809.897,
  "acc_y": 176.412,
  "acc_z": -467.748,
  "angle": 0,
  "dev": "A",
  "gyr_x": 30.38,
  "gyr_y": 46.34,
  "gyr_z": -30.52,
  "sample": 0,
  "time": 9.332
}, {
  "acc_x": -812.886,
  "acc_y": 292.434,
  "acc_z": -516.731,
  "angle": 0,
  "dev": "A",
  "gyr_x": 32.9,
  "gyr_y": 43.54,
  "gyr_z": -32.62,
  "sample": 0,
  "time": 9.352
}, {
  "acc_x": -939.461,
  "acc_y": -641.293,
  "acc_z": -321.714,
  "angle": 0,
  "dev": "B",
  "gyr_x": -4.41,
  "gyr_y": 51.52,
  "gyr_z": -71.89,
  "sample": 0,
  "time": 9.296
}, {
  "acc_x": -1112.152,
  "acc_y": -345.748,
  "acc_z": 20.923,
  "angle": 0,
  "dev": "B",
  "gyr_x": 83.09,
  "gyr_y": 35.21,
  "gyr_z": -48.16,
  "sample": -9.024029522216167e+83,
  "time": 9.315000000000001
}, {
  "acc_x": -1067.927,
  "acc_y": 188.734,
  "acc_z": 55.693,
  "angle": -7791296.34154,
  "dev": "B",
  "gyr_x": 106.05,
  "gyr_y": 25.34,
  "gyr_z": -39.55,
  "sample": -7791296,
  "time": 9.334
}, {
  "acc_x": -942.999,
  "acc_y": 67.649,
  "acc_z": -121.451,
  "angle": 0,
  "dev": "B",
  "gyr_x": 46.62,
  "gyr_y": 27.58,
  "gyr_z": -44.66,
  "sample": 0,
  "time": 9.354
}, {
  "acc_x": -978.135,
  "acc_y": -186.782,
  "acc_z": -416.935,
  "angle": 1.0451467186148498e+161,
  "dev": "B",
  "gyr_x": -27.3,
  "gyr_y": 33.74,
  "gyr_z": -48.65,
  "sample": 1.0451466728238804e+161,
  "time": 9.373000000000001
}, {
  "acc_x": -812.52,
  "acc_y": 210.633,
  "acc_z": -533.933,
  "angle": 0,
  "dev": "A",
  "gyr_x": 37.66,
  "gyr_y": 42.49,
  "gyr_z": -31.36,
  "sample": 0,
  "time": 9.372
}, {
  "acc_x": -981.551,
  "acc_y": -277.611,
  "acc_z": -493.612,
  "angle": 0,
  "dev": "B",
  "gyr_x": -22.12,
  "gyr_y": 27.79,
  "gyr_z": -42.42,
  "sample": 0,
  "time": 9.393
}, {
  "acc_x": -781.532,
  "acc_y": 240.157,
  "acc_z": -563.396,
  "angle": 0,
  "dev": "A",
  "gyr_x": 54.04,
  "gyr_y": 41.23,
  "gyr_z": -24.85,
  "sample": 0,
  "time": 9.390999999999998
}, {
  "acc_x": -786.717,
  "acc_y": 346.541,
  "acc_z": -505.263,
  "angle": -1.0449338026256516e+161,
  "dev": "A",
  "gyr_x": 73.36,
  "gyr_y": 37.8,
  "gyr_z": -18.2,
  "sample": -1.0449337568339527e+161,
  "time": 9.41
}, {
  "acc_x": -966.667,
  "acc_y": -180.987,
  "acc_z": -417.85,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.82,
  "gyr_y": 19.11,
  "gyr_z": -31.5,
  "sample": 0,
  "time": 9.411999999999999
}, {
  "acc_x": -985.333,
  "acc_y": 56.852,
  "acc_z": -266.326,
  "angle": -1.0441159263419251e+161,
  "dev": "B",
  "gyr_x": 70.98,
  "gyr_y": 13.79,
  "gyr_z": -22.26,
  "sample": -1.0441158805502268e+161,
  "time": 9.431999999999999
}, {
  "acc_x": -812.337,
  "acc_y": 376.309,
  "acc_z": -460.672,
  "angle": 9.359752870799902e+83,
  "dev": "A",
  "gyr_x": 79.31,
  "gyr_y": 34.3,
  "gyr_z": -17.85,
  "sample": 9.359752474067274e+83,
  "time": 9.43
}, {
  "acc_x": -986.614,
  "acc_y": 211.182,
  "acc_z": -82.106,
  "angle": 0,
  "dev": "B",
  "gyr_x": 74.76,
  "gyr_y": 8.26,
  "gyr_z": -19.74,
  "sample": 0,
  "time": 9.451
}, {
  "acc_x": -804.407,
  "acc_y": 380.518,
  "acc_z": -426.268,
  "angle": 0,
  "dev": "A",
  "gyr_x": 75.25,
  "gyr_y": 31.22,
  "gyr_z": -21.07,
  "sample": 0,
  "time": 9.448999999999998
}, {
  "acc_x": -817.644,
  "acc_y": 304.573,
  "acc_z": -391.62,
  "angle": 1.0835343454843366e+161,
  "dev": "A",
  "gyr_x": 67.41,
  "gyr_y": 26.04,
  "gyr_z": -25.55,
  "sample": 1.0835342995519406e+161,
  "time": 9.468
}, {
  "acc_x": -941.535,
  "acc_y": 125.111,
  "acc_z": -122.549,
  "angle": 1.0835343454879328e+161,
  "dev": "B",
  "gyr_x": 36.68,
  "gyr_y": 3.85,
  "gyr_z": -23.87,
  "sample": 1.0835342995519411e+161,
  "time": 9.469999999999999
}, {
  "acc_x": -929.945,
  "acc_y": -124.562,
  "acc_z": -309.819,
  "angle": 1.0835343454852536e+161,
  "dev": "B",
  "gyr_x": 0,
  "gyr_y": 9.24,
  "gyr_z": -26.95,
  "sample": 1.0835342995519412e+161,
  "time": 9.489
}, {
  "acc_x": -720.715,
  "acc_y": 308.477,
  "acc_z": -440.664,
  "angle": -1.2547128830146702e+238,
  "dev": "A",
  "gyr_x": 62.79,
  "gyr_y": 19.6,
  "gyr_z": -28.35,
  "sample": 8087392,
  "time": 9.489
}, {
  "acc_x": -953.247,
  "acc_y": -64.355,
  "acc_z": -326.899,
  "angle": 0,
  "dev": "B",
  "gyr_x": 12.53,
  "gyr_y": 8.82,
  "gyr_z": -23.8,
  "sample": 0,
  "time": 9.509
}, {
  "acc_x": -819.413,
  "acc_y": 334.158,
  "acc_z": -425.536,
  "angle": 7792872.34153,
  "dev": "A",
  "gyr_x": 66.99,
  "gyr_y": 14.21,
  "gyr_z": -25.83,
  "sample": 7792872,
  "time": 9.508
}, {
  "acc_x": -796.843,
  "acc_y": 409.859,
  "acc_z": -414.373,
  "angle": 7792872.34153,
  "dev": "A",
  "gyr_x": 72.8,
  "gyr_y": 5.46,
  "gyr_z": -21.07,
  "sample": 7792872,
  "time": 9.527000000000001
}, {
  "acc_x": -971.913,
  "acc_y": 121.329,
  "acc_z": -212.158,
  "angle": 0,
  "dev": "B",
  "gyr_x": 39.62,
  "gyr_y": 6.37,
  "gyr_z": -21.35,
  "sample": 0,
  "time": 9.529
}, {
  "acc_x": -952.881,
  "acc_y": 329.461,
  "acc_z": -324.276,
  "angle": 1.0450035232232291e+161,
  "dev": "B",
  "gyr_x": 45.5,
  "gyr_y": 5.88,
  "gyr_z": -23.03,
  "sample": 1.0450034774351898e+161,
  "time": 9.547999999999998
}, {
  "acc_x": -735.172,
  "acc_y": 470.554,
  "acc_z": -445.361,
  "angle": 0,
  "dev": "A",
  "gyr_x": 78.05,
  "gyr_y": -5.67,
  "gyr_z": -17.99,
  "sample": 0,
  "time": 9.547
}, {
  "acc_x": -779.092,
  "acc_y": 488.671,
  "acc_z": -402.661,
  "angle": -1.0446618922818113e+161,
  "dev": "A",
  "gyr_x": 79.17,
  "gyr_y": -13.09,
  "gyr_z": -17.57,
  "sample": -1.0446618464891345e+161,
  "time": 9.565999999999999
}, {
  "acc_x": -771.04,
  "acc_y": 444.202,
  "acc_z": -409.493,
  "angle": 0,
  "dev": "A",
  "gyr_x": 71.75,
  "gyr_y": -13.44,
  "gyr_z": -18.27,
  "sample": 0,
  "time": 9.585
}, {
  "acc_x": -803.675,
  "acc_y": 373.259,
  "acc_z": -397.293,
  "angle": 0,
  "dev": "A",
  "gyr_x": 59.01,
  "gyr_y": -10.85,
  "gyr_z": -18.97,
  "sample": 0,
  "time": 9.605
}, {
  "acc_x": -954.284,
  "acc_y": 171.471,
  "acc_z": -266.875,
  "angle": 0,
  "dev": "B",
  "gyr_x": 42.84,
  "gyr_y": 9.03,
  "gyr_z": -28.21,
  "sample": 0,
  "time": 9.567
}, {
  "acc_x": -950.258,
  "acc_y": 41.175,
  "acc_z": -258.457,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.73,
  "gyr_y": 10.57,
  "gyr_z": -32.27,
  "sample": 0,
  "time": 9.587
}, {
  "acc_x": -932.873,
  "acc_y": 177.693,
  "acc_z": -246.867,
  "angle": -9.354426434650194e+83,
  "dev": "B",
  "gyr_x": 38.92,
  "gyr_y": 8.82,
  "gyr_z": -35.21,
  "sample": -9.354426037962372e+83,
  "time": 9.605999999999998
}, {
  "acc_x": -947.147,
  "acc_y": 34.892,
  "acc_z": -276.94,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.49,
  "gyr_y": 11.55,
  "gyr_z": -39.76,
  "sample": 0,
  "time": 9.625
}, {
  "acc_x": -932.263,
  "acc_y": -26.474,
  "acc_z": -273.524,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.77,
  "gyr_y": 13.65,
  "gyr_z": -43.82,
  "sample": 0,
  "time": 9.643999999999998
}, {
  "acc_x": -791.719,
  "acc_y": 338.001,
  "acc_z": -409.493,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.64,
  "gyr_y": -6.72,
  "gyr_z": -21.14,
  "sample": 0,
  "time": 9.623999999999999
}, {
  "acc_x": -788.852,
  "acc_y": 291.58,
  "acc_z": -436.272,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.85,
  "gyr_y": -5.67,
  "gyr_z": -22.47,
  "sample": 0,
  "time": 9.645
}, {
  "acc_x": -931.592,
  "acc_y": -45.689,
  "acc_z": -247.904,
  "angle": 0,
  "dev": "B",
  "gyr_x": 27.44,
  "gyr_y": 15.54,
  "gyr_z": -46.06,
  "sample": 0,
  "time": 9.665
}, {
  "acc_x": -800.686,
  "acc_y": 254.187,
  "acc_z": -430.843,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.5,
  "gyr_y": -6.72,
  "gyr_z": -24.64,
  "sample": 0,
  "time": 9.664000000000001
}, {
  "acc_x": -811.91,
  "acc_y": 274.256,
  "acc_z": -431.88,
  "angle": 0,
  "dev": "A",
  "gyr_x": 47.6,
  "gyr_y": -8.19,
  "gyr_z": -25.13,
  "sample": 0,
  "time": 9.683
}, {
  "acc_x": -817.522,
  "acc_y": 322.812,
  "acc_z": -408.273,
  "angle": 0,
  "dev": "A",
  "gyr_x": 56.77,
  "gyr_y": -11.62,
  "gyr_z": -23.24,
  "sample": 0,
  "time": 9.703
}, {
  "acc_x": -935.313,
  "acc_y": -77.348,
  "acc_z": -257.603,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.64,
  "gyr_y": 15.61,
  "gyr_z": -47.95,
  "sample": -9.024029522216188e+83,
  "time": 9.684000000000001
}, {
  "acc_x": -956.785,
  "acc_y": -13.42,
  "acc_z": -302.377,
  "angle": -1.0452100034690084e+161,
  "dev": "B",
  "gyr_x": 25.06,
  "gyr_y": 15.12,
  "gyr_z": -49.98,
  "sample": -9.024029522216189e+83,
  "time": 9.703
}, {
  "acc_x": -968.558,
  "acc_y": 24.278,
  "acc_z": -252.967,
  "angle": 0,
  "dev": "B",
  "gyr_x": 27.23,
  "gyr_y": 14.21,
  "gyr_z": -53.48,
  "sample": -9.02402952221619e+83,
  "time": 9.722000000000001
}, {
  "acc_x": -803.492,
  "acc_y": 358.68,
  "acc_z": -388.265,
  "angle": 0,
  "dev": "A",
  "gyr_x": 66.36,
  "gyr_y": -16.87,
  "gyr_z": -20.93,
  "sample": 0,
  "time": 9.722000000000001
}, {
  "acc_x": -788.303,
  "acc_y": 381.311,
  "acc_z": -400.526,
  "angle": 0,
  "dev": "A",
  "gyr_x": 68.32,
  "gyr_y": -18.48,
  "gyr_z": -18.55,
  "sample": 0,
  "time": 9.741
}, {
  "acc_x": -839.055,
  "acc_y": 372.588,
  "acc_z": -389.058,
  "angle": 1.255110948654207e+238,
  "dev": "A",
  "gyr_x": 62.79,
  "gyr_y": -16.66,
  "gyr_z": -17.08,
  "sample": 1.2551108954600937e+238,
  "time": 9.761
}, {
  "acc_x": -955.809,
  "acc_y": 55.205,
  "acc_z": -275.415,
  "angle": 0,
  "dev": "B",
  "gyr_x": 25.76,
  "gyr_y": 14.28,
  "gyr_z": -58.24,
  "sample": -1.2548730496883536e+238,
  "time": 9.742
}, {
  "acc_x": -969.351,
  "acc_y": -5.978,
  "acc_z": -287.493,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.01,
  "gyr_y": 14.35,
  "gyr_z": -63.84,
  "sample": 0,
  "time": 9.761
}, {
  "acc_x": -985.882,
  "acc_y": -20.374,
  "acc_z": -280.722,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.71,
  "gyr_y": 15.05,
  "gyr_z": -69.02,
  "sample": 0,
  "time": 9.780000000000001
}, {
  "acc_x": -886.513,
  "acc_y": 337.452,
  "acc_z": -393.084,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.71,
  "gyr_y": -16.73,
  "gyr_z": -16.24,
  "sample": -1.0453467173181973e+161,
  "time": 9.780999999999999
}, {
  "acc_x": -935.069,
  "acc_y": 342.454,
  "acc_z": -398.879,
  "angle": 0,
  "dev": "A",
  "gyr_x": 33.32,
  "gyr_y": -13.23,
  "gyr_z": -14.28,
  "sample": -9.027623708666116e+83,
  "time": 9.8
}, {
  "acc_x": -1037.061,
  "acc_y": -54.656,
  "acc_z": -274.134,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.17,
  "gyr_y": 14.77,
  "gyr_z": -73.01,
  "sample": 0,
  "time": 9.799
}, {
  "acc_x": -1112.823,
  "acc_y": -185.196,
  "acc_z": -202.703,
  "angle": 27.73345,
  "dev": "B",
  "gyr_x": 34.23,
  "gyr_y": 14.14,
  "gyr_z": -76.79,
  "sample": 0,
  "time": 9.82
}, {
  "acc_x": -946.72,
  "acc_y": 402.966,
  "acc_z": -424.377,
  "angle": 0,
  "dev": "A",
  "gyr_x": 14.84,
  "gyr_y": -6.09,
  "gyr_z": -12.04,
  "sample": 0,
  "time": 9.82
}, {
  "acc_x": -1136.064,
  "acc_y": -100.772,
  "acc_z": -244.854,
  "angle": -8091968.34264,
  "dev": "B",
  "gyr_x": 36.54,
  "gyr_y": 15.05,
  "gyr_z": -81.69,
  "sample": 0,
  "time": 9.838999999999999
}, {
  "acc_x": -998.814,
  "acc_y": 521.428,
  "acc_z": -414.861,
  "angle": 0,
  "dev": "A",
  "gyr_x": 12.95,
  "gyr_y": -7.77,
  "gyr_z": -10.08,
  "sample": 0,
  "time": 9.838999999999999
}, {
  "acc_x": -1035.109,
  "acc_y": 627.202,
  "acc_z": -367.708,
  "angle": 1.0447337581326515e+161,
  "dev": "A",
  "gyr_x": 8.19,
  "gyr_y": -11.27,
  "gyr_z": -8.33,
  "sample": 1.0447337123396408e+161,
  "time": 9.858
}, {
  "acc_x": -1149.728,
  "acc_y": 635.132,
  "acc_z": -228.445,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.21,
  "gyr_y": -17.71,
  "gyr_z": -5.32,
  "sample": 0,
  "time": 9.878
}, {
  "acc_x": -1234.091,
  "acc_y": 670.756,
  "acc_z": -18.666,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.17,
  "gyr_y": -33.25,
  "gyr_z": 2.45,
  "sample": 0,
  "time": 9.896999999999998
}, {
  "acc_x": -1188.829,
  "acc_y": 600.057,
  "acc_z": 147.437,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.59,
  "gyr_y": -58.94,
  "gyr_z": 17.29,
  "sample": 0,
  "time": 9.916999999999998
}, {
  "acc_x": -1257.637,
  "acc_y": -76.982,
  "acc_z": -271.511,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.85,
  "gyr_y": 15.89,
  "gyr_z": -87.36,
  "sample": -9.027623708666124e+83,
  "time": 9.858
}, {
  "acc_x": -1294.176,
  "acc_y": -27.816,
  "acc_z": -237.595,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.64,
  "gyr_y": 14.35,
  "gyr_z": -94.64,
  "sample": 0,
  "time": 9.876999999999999
}, {
  "acc_x": -1419.409,
  "acc_y": -17.995,
  "acc_z": -187.331,
  "angle": 0,
  "dev": "B",
  "gyr_x": 41.3,
  "gyr_y": 14.21,
  "gyr_z": -102.13,
  "sample": 0,
  "time": 9.896999999999998
}, {
  "acc_x": -1532.32,
  "acc_y": 74.725,
  "acc_z": -70.516,
  "angle": 0,
  "dev": "B",
  "gyr_x": 51.59,
  "gyr_y": 15.82,
  "gyr_z": -109.2,
  "sample": 0,
  "time": 9.916
}, {
  "acc_x": -1574.166,
  "acc_y": 236.192,
  "acc_z": 19.154,
  "angle": 0,
  "dev": "B",
  "gyr_x": 71.89,
  "gyr_y": 20.86,
  "gyr_z": -116.2,
  "sample": 1.2563870653319667e+238,
  "time": 9.934999999999999
}, {
  "acc_x": -1147.288,
  "acc_y": 447.557,
  "acc_z": 88.999,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.55,
  "gyr_y": -83.3,
  "gyr_z": 34.02,
  "sample": 1.2563864443247292e+238,
  "time": 9.937000000000001
}, {
  "acc_x": -1067.195,
  "acc_y": 377.041,
  "acc_z": 60.329,
  "angle": 0,
  "dev": "A",
  "gyr_x": 5.88,
  "gyr_y": -105.56,
  "gyr_z": 51.52,
  "sample": 0,
  "time": 9.956
}, {
  "acc_x": -1040.233,
  "acc_y": 414.556,
  "acc_z": -174.277,
  "angle": 7799460.34156,
  "dev": "A",
  "gyr_x": 18.83,
  "gyr_y": -117.25,
  "gyr_z": 72.1,
  "sample": 0,
  "time": 9.975000000000001
}, {
  "acc_x": -1462.719,
  "acc_y": 535.519,
  "acc_z": 58.377,
  "angle": 7799428.34156,
  "dev": "B",
  "gyr_x": 104.65,
  "gyr_y": 25.9,
  "gyr_z": -119.7,
  "sample": 0,
  "time": 9.954999999999998
}, {
  "acc_x": -1322.175,
  "acc_y": 80.398,
  "acc_z": -244.427,
  "angle": 0,
  "dev": "B",
  "gyr_x": 112.91,
  "gyr_y": 38.08,
  "gyr_z": -123.13,
  "sample": -9.02762370866613e+83,
  "time": 9.975000000000001
}, {
  "acc_x": -1247.267,
  "acc_y": -426.146,
  "acc_z": -430.965,
  "angle": 0,
  "dev": "B",
  "gyr_x": 87.78,
  "gyr_y": 52.29,
  "gyr_z": -125.37,
  "sample": 0,
  "time": 9.994
}, {
  "acc_x": -1213.534,
  "acc_y": 278.404,
  "acc_z": -460.184,
  "angle": 0,
  "dev": "A",
  "gyr_x": 29.33,
  "gyr_y": -111.09,
  "gyr_z": 89.6,
  "sample": 0,
  "time": 9.995000000000001
}, {
  "acc_x": -1033.523,
  "acc_y": -452.925,
  "acc_z": -337.269,
  "angle": 0,
  "dev": "B",
  "gyr_x": 70.35,
  "gyr_y": 55.23,
  "gyr_z": -120.05,
  "sample": 1.0847747899416229e+161,
  "time": 10.012999999999998
}, {
  "acc_x": -791.841,
  "acc_y": -403.332,
  "acc_z": -212.829,
  "angle": 0,
  "dev": "B",
  "gyr_x": 66.57,
  "gyr_y": 50.47,
  "gyr_z": -93.94,
  "sample": 0,
  "time": 10.032
}, {
  "acc_x": -1316.929,
  "acc_y": 81.496,
  "acc_z": -503.921,
  "angle": 0,
  "dev": "A",
  "gyr_x": 20.72,
  "gyr_y": -93.52,
  "gyr_z": 93.38,
  "sample": 0,
  "time": 10.014
}, {
  "acc_x": -1293.017,
  "acc_y": 97.844,
  "acc_z": -436.455,
  "angle": 8091508.34263,
  "dev": "A",
  "gyr_x": -7.28,
  "gyr_y": -80.85,
  "gyr_z": 86.38,
  "sample": 8091508,
  "time": 10.033000000000001
}, {
  "acc_x": -575.474,
  "acc_y": -789.035,
  "acc_z": -365.512,
  "angle": 8091508.34261,
  "dev": "B",
  "gyr_x": 46.9,
  "gyr_y": 40.46,
  "gyr_z": -60.83,
  "sample": 8091508,
  "time": 10.052
}, {
  "acc_x": -1250.195,
  "acc_y": 107.604,
  "acc_z": -426.695,
  "angle": 0,
  "dev": "A",
  "gyr_x": -32.9,
  "gyr_y": -79.1,
  "gyr_z": 78.54,
  "sample": -1.2104207306623645e+238,
  "time": 10.053
}, {
  "acc_x": -1178.581,
  "acc_y": 162.626,
  "acc_z": -430.172,
  "angle": -9.031996413431879e+83,
  "dev": "A",
  "gyr_x": -47.81,
  "gyr_y": -78.89,
  "gyr_z": 70.91,
  "sample": -9.031996017955732e+83,
  "time": 10.073
}, {
  "acc_x": -1066.158,
  "acc_y": 274.134,
  "acc_z": -455.182,
  "angle": 1.2563821504722637e+238,
  "dev": "A",
  "gyr_x": -57.54,
  "gyr_y": -71.47,
  "gyr_z": 65.73,
  "sample": 0,
  "time": 10.093
}, {
  "acc_x": -441.945,
  "acc_y": -1395.558,
  "acc_z": -663.497,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.15,
  "gyr_y": 30.31,
  "gyr_z": -34.51,
  "sample": 0,
  "time": 10.071000000000002
}, {
  "acc_x": -590.785,
  "acc_y": -278.526,
  "acc_z": -355.569,
  "angle": 0,
  "dev": "B",
  "gyr_x": 45.01,
  "gyr_y": 16.1,
  "gyr_z": -5.32,
  "sample": 0,
  "time": 10.091000000000001
}, {
  "acc_x": -357.155,
  "acc_y": 45.628,
  "acc_z": 328.546,
  "angle": 0,
  "dev": "B",
  "gyr_x": 95.69,
  "gyr_y": -1.61,
  "gyr_z": 38.29,
  "sample": 0,
  "time": 10.11
}, {
  "acc_x": -1015.406,
  "acc_y": 193.187,
  "acc_z": -413.763,
  "angle": 1.0444613114763042e+161,
  "dev": "A",
  "gyr_x": -66.43,
  "gyr_y": -58.24,
  "gyr_z": 63.63,
  "sample": 1.044461265682506e+161,
  "time": 10.111999999999998
}, {
  "acc_x": -961.665,
  "acc_y": -12.932,
  "acc_z": -304.695,
  "angle": -1.0452105397849778e+161,
  "dev": "A",
  "gyr_x": -81.83,
  "gyr_y": -53.76,
  "gyr_z": 58.66,
  "sample": -1.0452104939896313e+161,
  "time": 10.131
}, {
  "acc_x": -264.74,
  "acc_y": -278.404,
  "acc_z": 205.753,
  "angle": 0,
  "dev": "B",
  "gyr_x": 36.12,
  "gyr_y": -9.17,
  "gyr_z": 72.45,
  "sample": 0,
  "time": 10.129999999999999
}, {
  "acc_x": -350.201,
  "acc_y": -676.856,
  "acc_z": -101.87,
  "angle": 0,
  "dev": "B",
  "gyr_x": -50.4,
  "gyr_y": 1.82,
  "gyr_z": 105.35,
  "sample": 0,
  "time": 10.149000000000001
}, {
  "acc_x": -869.006,
  "acc_y": -121.329,
  "acc_z": -272.609,
  "angle": 0,
  "dev": "A",
  "gyr_x": -94.57,
  "gyr_y": -50.75,
  "gyr_z": 50.05,
  "sample": 0,
  "time": 10.151
}, {
  "acc_x": -802.577,
  "acc_y": -104.859,
  "acc_z": -325.435,
  "angle": 0,
  "dev": "A",
  "gyr_x": -80.85,
  "gyr_y": -40.04,
  "gyr_z": 46.2,
  "sample": -7791296,
  "time": 10.169999999999998
}, {
  "acc_x": -754.021,
  "acc_y": -95.77,
  "acc_z": -356.972,
  "angle": 0,
  "dev": "A",
  "gyr_x": -41.58,
  "gyr_y": -30.52,
  "gyr_z": 48.37,
  "sample": 0,
  "time": 10.189
}, {
  "acc_x": -488.122,
  "acc_y": -652.212,
  "acc_z": -203.252,
  "angle": -7791296.34152,
  "dev": "B",
  "gyr_x": -87.43,
  "gyr_y": 0.14,
  "gyr_z": 132.44,
  "sample": -7791296,
  "time": 10.168
}, {
  "acc_x": -508.191,
  "acc_y": -407.541,
  "acc_z": -103.639,
  "angle": 0,
  "dev": "B",
  "gyr_x": -81.9,
  "gyr_y": -13.51,
  "gyr_z": 150.43,
  "sample": 0,
  "time": 10.187000000000001
}, {
  "acc_x": -492.636,
  "acc_y": -347.639,
  "acc_z": -16.226,
  "angle": 0,
  "dev": "B",
  "gyr_x": -79.59,
  "gyr_y": -31.85,
  "gyr_z": 168.91,
  "sample": 0,
  "time": 10.207
}, {
  "acc_x": -575.291,
  "acc_y": -468.907,
  "acc_z": -253.76,
  "angle": -9.363870437475133e+83,
  "dev": "B",
  "gyr_x": -101.99,
  "gyr_y": -39.62,
  "gyr_z": 190.96,
  "sample": -1.2548730496883572e+238,
  "time": 10.225999999999999
}, {
  "acc_x": -689.483,
  "acc_y": -58.438,
  "acc_z": -387.96,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.59,
  "gyr_y": -21.98,
  "gyr_z": 50.96,
  "sample": -1.2542402433139348e+238,
  "time": 10.21
}, {
  "acc_x": -646.234,
  "acc_y": 23.18,
  "acc_z": -335.744,
  "angle": 0,
  "dev": "A",
  "gyr_x": 20.44,
  "gyr_y": -15.68,
  "gyr_z": 48.02,
  "sample": 0,
  "time": 10.229
}, {
  "acc_x": -647.21,
  "acc_y": 114.314,
  "acc_z": -282.125,
  "angle": 1.2546340150930041e+238,
  "dev": "A",
  "gyr_x": 23.59,
  "gyr_y": -3.08,
  "gyr_z": 40.95,
  "sample": -1.2089961400608709e+238,
  "time": 10.248000000000001
}, {
  "acc_x": -729.56,
  "acc_y": -616.649,
  "acc_z": -370.27,
  "angle": 0,
  "dev": "B",
  "gyr_x": -111.86,
  "gyr_y": -50.68,
  "gyr_z": 212.1,
  "sample": 0,
  "time": 10.245999999999999
}, {
  "acc_x": -756.522,
  "acc_y": -696.986,
  "acc_z": -341.722,
  "angle": -8082796.34258,
  "dev": "B",
  "gyr_x": -84.21,
  "gyr_y": -69.86,
  "gyr_z": 227.15,
  "sample": -9.363860777393465e+83,
  "time": 10.265
}, {
  "acc_x": -644.343,
  "acc_y": 84.18,
  "acc_z": -266.509,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.66,
  "gyr_y": 17.64,
  "gyr_z": 30.94,
  "sample": 0,
  "time": 10.268
}, {
  "acc_x": -788.791,
  "acc_y": -621.773,
  "acc_z": -270.108,
  "angle": 0,
  "dev": "B",
  "gyr_x": -41.93,
  "gyr_y": -88.9,
  "gyr_z": 239.82,
  "sample": 0,
  "time": 10.285
}, {
  "acc_x": -614.148,
  "acc_y": 47.092,
  "acc_z": -260.226,
  "angle": 0,
  "dev": "A",
  "gyr_x": 24.15,
  "gyr_y": 30.73,
  "gyr_z": 17.15,
  "sample": 0,
  "time": 10.286999999999999
}, {
  "acc_x": -597.678,
  "acc_y": 35.136,
  "acc_z": -221.613,
  "angle": 1.2563821504624478e+238,
  "dev": "A",
  "gyr_x": 14.98,
  "gyr_y": 31.08,
  "gyr_z": -2.87,
  "sample": -8082756,
  "time": 10.306000000000001
}, {
  "acc_x": -782.264,
  "acc_y": -442.616,
  "acc_z": -275.415,
  "angle": 0,
  "dev": "B",
  "gyr_x": -3.85,
  "gyr_y": -103.53,
  "gyr_z": 255.5,
  "sample": 0,
  "time": 10.303999999999998
}, {
  "acc_x": -931.165,
  "acc_y": -226.676,
  "acc_z": -121.085,
  "angle": 0,
  "dev": "B",
  "gyr_x": 14.14,
  "gyr_y": -107.8,
  "gyr_z": 270.97,
  "sample": 0,
  "time": 10.323
}, {
  "acc_x": -637.328,
  "acc_y": 11.834,
  "acc_z": -108.763,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.83,
  "gyr_y": 29.05,
  "gyr_z": -26.67,
  "sample": 0,
  "time": 10.326
}, {
  "acc_x": -1146.495,
  "acc_y": -207.034,
  "acc_z": 71.919,
  "angle": 0,
  "dev": "B",
  "gyr_x": -3.71,
  "gyr_y": -98.63,
  "gyr_z": 277.06,
  "sample": 0,
  "time": 10.342000000000002
}, {
  "acc_x": -1352.919,
  "acc_y": -135.908,
  "acc_z": -147.864,
  "angle": 8095540.34216,
  "dev": "B",
  "gyr_x": -51.59,
  "gyr_y": -82.6,
  "gyr_z": 268.52,
  "sample": 8095540,
  "time": 10.362000000000002
}, {
  "acc_x": -755.241,
  "acc_y": 278.587,
  "acc_z": -18.361,
  "angle": 0,
  "dev": "A",
  "gyr_x": -31.99,
  "gyr_y": 37.66,
  "gyr_z": -51.17,
  "sample": 0,
  "time": 10.346
}, {
  "acc_x": -853.878,
  "acc_y": 523.441,
  "acc_z": 64.599,
  "angle": 0,
  "dev": "A",
  "gyr_x": -74.62,
  "gyr_y": 33.95,
  "gyr_z": -73.99,
  "sample": 0,
  "time": 10.365000000000002
}, {
  "acc_x": -946.842,
  "acc_y": 774.822,
  "acc_z": 306.83,
  "angle": 0,
  "dev": "A",
  "gyr_x": -97.86,
  "gyr_y": 24.92,
  "gyr_z": -83.44,
  "sample": 0,
  "time": 10.385000000000002
}, {
  "acc_x": -1065.731,
  "acc_y": 1143.445,
  "acc_z": 495.381,
  "angle": 0,
  "dev": "A",
  "gyr_x": -65.8,
  "gyr_y": 3.08,
  "gyr_z": -69.44,
  "sample": 0,
  "time": 10.404
}, {
  "acc_x": -1049.017,
  "acc_y": 1317.966,
  "acc_z": 484.95,
  "angle": 0,
  "dev": "A",
  "gyr_x": -50.12,
  "gyr_y": -2.73,
  "gyr_z": -43.05,
  "sample": 0,
  "time": 10.423000000000002
}, {
  "acc_x": -1434.415,
  "acc_y": -167.689,
  "acc_z": -142.191,
  "angle": 0,
  "dev": "B",
  "gyr_x": -69.58,
  "gyr_y": -81.41,
  "gyr_z": 249.9,
  "sample": 0,
  "time": 10.382000000000001
}, {
  "acc_x": -1190.903,
  "acc_y": -37.149,
  "acc_z": -14.64,
  "angle": 0,
  "dev": "B",
  "gyr_x": -44.8,
  "gyr_y": -80.22,
  "gyr_z": 223.16,
  "sample": 0,
  "time": 10.401
}, {
  "acc_x": -923.845,
  "acc_y": 51.911,
  "acc_z": -48.251,
  "angle": -8082796.34258,
  "dev": "B",
  "gyr_x": -31.99,
  "gyr_y": -64.89,
  "gyr_z": 180.67,
  "sample": -8082796,
  "time": 10.420000000000002
}, {
  "acc_x": -846.619,
  "acc_y": 189.771,
  "acc_z": -331.291,
  "angle": 0,
  "dev": "B",
  "gyr_x": -25.13,
  "gyr_y": -39.97,
  "gyr_z": 120.75,
  "sample": 0,
  "time": 10.440000000000001
}, {
  "acc_x": -848.144,
  "acc_y": 128.71,
  "acc_z": -267.058,
  "angle": -8082796.34263,
  "dev": "B",
  "gyr_x": -9.1,
  "gyr_y": -19.74,
  "gyr_z": 45.92,
  "sample": -8082796,
  "time": 10.459
}, {
  "acc_x": -904.02,
  "acc_y": 5.551,
  "acc_z": -216.672,
  "angle": 0,
  "dev": "B",
  "gyr_x": -2.94,
  "gyr_y": -3.08,
  "gyr_z": -27.02,
  "sample": 0,
  "time": 10.478000000000002
}, {
  "acc_x": -1092.51,
  "acc_y": 1004.182,
  "acc_z": 280.417,
  "angle": 8081244.34259,
  "dev": "A",
  "gyr_x": -85.12,
  "gyr_y": 8.75,
  "gyr_z": -17.43,
  "sample": 8081244,
  "time": 10.443000000000001
}, {
  "acc_x": -964.959,
  "acc_y": 494.954,
  "acc_z": 114.924,
  "angle": -8082796.34258,
  "dev": "A",
  "gyr_x": -64.05,
  "gyr_y": 7.63,
  "gyr_z": 3.36,
  "sample": -8082796,
  "time": 10.462
}, {
  "acc_x": -911.706,
  "acc_y": 278.587,
  "acc_z": -97.966,
  "angle": 8095540.34259,
  "dev": "A",
  "gyr_x": -35.21,
  "gyr_y": 24.08,
  "gyr_z": 20.65,
  "sample": 8095540,
  "time": 10.481000000000002
}, {
  "acc_x": -1016.26,
  "acc_y": 191.296,
  "acc_z": -382.958,
  "angle": 8081244.34261,
  "dev": "A",
  "gyr_x": -11.69,
  "gyr_y": 48.3,
  "gyr_z": 29.26,
  "sample": 8081244,
  "time": 10.501999999999999
}, {
  "acc_x": -1470.222,
  "acc_y": 427.427,
  "acc_z": 177.022,
  "angle": 8095540.3426,
  "dev": "A",
  "gyr_x": 12.6,
  "gyr_y": 66.92,
  "gyr_z": 30.24,
  "sample": 0,
  "time": 10.521
}, {
  "acc_x": -954.894,
  "acc_y": 1704.218,
  "acc_z": 211.426,
  "angle": -7791296.34152,
  "dev": "A",
  "gyr_x": -17.08,
  "gyr_y": 54.6,
  "gyr_z": 20.58,
  "sample": -7791296,
  "time": 10.541
}, {
  "acc_x": -1140.639,
  "acc_y": 103.517,
  "acc_z": -325.069,
  "angle": 0,
  "dev": "A",
  "gyr_x": -108.29,
  "gyr_y": 70.77,
  "gyr_z": 7.63,
  "sample": 0,
  "time": 10.560000000000002
}, {
  "acc_x": -611.22,
  "acc_y": -1293.383,
  "acc_z": -523.38,
  "angle": 0,
  "dev": "A",
  "gyr_x": -11.97,
  "gyr_y": 56.7,
  "gyr_z": 11.9,
  "sample": 0,
  "time": 10.579
}, {
  "acc_x": -817.705,
  "acc_y": 6.1,
  "acc_z": -606.767,
  "angle": 0,
  "dev": "B",
  "gyr_x": -23.38,
  "gyr_y": 21.84,
  "gyr_z": -85.61,
  "sample": 0,
  "time": 10.497
}, {
  "acc_x": -1583.804,
  "acc_y": 998.448,
  "acc_z": -147.315,
  "angle": 1.0439073008504712e+161,
  "dev": "B",
  "gyr_x": -49.07,
  "gyr_y": 55.02,
  "gyr_z": -114.45,
  "sample": 1.0439072550588439e+161,
  "time": 10.518
}, {
  "acc_x": -1380.064,
  "acc_y": 1031.632,
  "acc_z": 347.029,
  "angle": 9.350341289789006e+83,
  "dev": "B",
  "gyr_x": 40.18,
  "gyr_y": 43.68,
  "gyr_z": -77.7,
  "sample": -9.352105564494108e+83,
  "time": 10.536999999999999
}, {
  "acc_x": -1435.086,
  "acc_y": -227.103,
  "acc_z": 180.438,
  "angle": 0,
  "dev": "B",
  "gyr_x": -62.37,
  "gyr_y": 41.51,
  "gyr_z": -108.78,
  "sample": 0,
  "time": 10.556000000000001
}, {
  "acc_x": -862.845,
  "acc_y": -677.771,
  "acc_z": -233.691,
  "angle": 0,
  "dev": "B",
  "gyr_x": -148.89,
  "gyr_y": 57.61,
  "gyr_z": -140.21,
  "sample": 0,
  "time": 10.575
}, {
  "acc_x": -611.891,
  "acc_y": -505.019,
  "acc_z": -371.673,
  "angle": -1.0828913070159106e+161,
  "dev": "B",
  "gyr_x": -118.09,
  "gyr_y": 50.61,
  "gyr_z": -139.93,
  "sample": 1.0838131819568912e+161,
  "time": 10.594999999999999
}, {
  "acc_x": -497.028,
  "acc_y": 339.465,
  "acc_z": -674.355,
  "angle": 8081244.3426,
  "dev": "A",
  "gyr_x": -1.05,
  "gyr_y": 42.14,
  "gyr_z": -7.07,
  "sample": 8081244,
  "time": 10.599
}, {
  "acc_x": -812.886,
  "acc_y": -705.099,
  "acc_z": -557.845,
  "angle": 9.359729712312175e+83,
  "dev": "B",
  "gyr_x": -70.7,
  "gyr_y": 55.65,
  "gyr_z": -114.8,
  "sample": 9.359729315649497e+83,
  "time": 10.614
}, {
  "acc_x": -931.958,
  "acc_y": -387.472,
  "acc_z": -763.72,
  "angle": 9.359706553968314e+83,
  "dev": "B",
  "gyr_x": -39.41,
  "gyr_y": 60.48,
  "gyr_z": -94.78,
  "sample": 1.254633340894909e+238,
  "time": 10.633
}, {
  "acc_x": -976.183,
  "acc_y": -640.012,
  "acc_z": -318.115,
  "angle": 9.359729712337487e+83,
  "dev": "B",
  "gyr_x": 43.12,
  "gyr_y": 33.46,
  "gyr_z": -69.23,
  "sample": 9.359729315649499e+83,
  "time": 10.652000000000001
}, {
  "acc_x": -828.136,
  "acc_y": -47.153,
  "acc_z": -819.047,
  "angle": 1.08381322788869e+161,
  "dev": "A",
  "gyr_x": 2.03,
  "gyr_y": 50.12,
  "gyr_z": -32.55,
  "sample": 1.0838131819568908e+161,
  "time": 10.618000000000002
}, {
  "acc_x": -1164.795,
  "acc_y": -171.044,
  "acc_z": 100.223,
  "angle": 0,
  "dev": "B",
  "gyr_x": 91.42,
  "gyr_y": 19.46,
  "gyr_z": -56.35,
  "sample": 0,
  "time": 10.673000000000002
}, {
  "acc_x": -947.269,
  "acc_y": 239.12,
  "acc_z": -118.767,
  "angle": 1.0838132278912653e+161,
  "dev": "B",
  "gyr_x": 87.92,
  "gyr_y": 20.37,
  "gyr_z": -56.7,
  "sample": 1.0838131819568918e+161,
  "time": 10.692
}, {
  "acc_x": -921.527,
  "acc_y": -104.859,
  "acc_z": -566.019,
  "angle": 1.0838132278889837e+161,
  "dev": "A",
  "gyr_x": 28.49,
  "gyr_y": 55.65,
  "gyr_z": -16.31,
  "sample": 1.0838131819568909e+161,
  "time": 10.638000000000002
}, {
  "acc_x": -994.178,
  "acc_y": 447.801,
  "acc_z": -464.088,
  "angle": 0,
  "dev": "A",
  "gyr_x": 49.35,
  "gyr_y": 53.41,
  "gyr_z": -15.54,
  "sample": 8067716,
  "time": 10.658000000000001
}, {
  "acc_x": -887.977,
  "acc_y": 152.317,
  "acc_z": -480.07,
  "angle": 0,
  "dev": "A",
  "gyr_x": 43.19,
  "gyr_y": 42.21,
  "gyr_z": -25.13,
  "sample": 0,
  "time": 10.677
}, {
  "acc_x": -804.285,
  "acc_y": 231.617,
  "acc_z": -506.117,
  "angle": 0,
  "dev": "A",
  "gyr_x": 37.59,
  "gyr_y": 38.29,
  "gyr_z": -31.15,
  "sample": 0,
  "time": 10.696000000000002
}, {
  "acc_x": -929.152,
  "acc_y": -177.205,
  "acc_z": -334.28,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.54,
  "gyr_y": 28.07,
  "gyr_z": -55.51,
  "sample": 0,
  "time": 10.711000000000002
}, {
  "acc_x": -839.665,
  "acc_y": 257.969,
  "acc_z": -536.007,
  "angle": 9.359706553928646e+83,
  "dev": "A",
  "gyr_x": 45.92,
  "gyr_y": 40.32,
  "gyr_z": -33.6,
  "sample": 9.359706157231651e+83,
  "time": 10.716000000000001
}, {
  "acc_x": -873.215,
  "acc_y": 241.926,
  "acc_z": -528.443,
  "angle": 0,
  "dev": "A",
  "gyr_x": 50.82,
  "gyr_y": 41.3,
  "gyr_z": -35.7,
  "sample": 0,
  "time": 10.735
}, {
  "acc_x": -855.037,
  "acc_y": 328.851,
  "acc_z": -569.862,
  "angle": 8095540.34263,
  "dev": "A",
  "gyr_x": 62.86,
  "gyr_y": 40.74,
  "gyr_z": -34.51,
  "sample": 8095540,
  "time": 10.754000000000001
}, {
  "acc_x": -998.753,
  "acc_y": -414.556,
  "acc_z": -372.954,
  "angle": 0,
  "dev": "B",
  "gyr_x": 10.36,
  "gyr_y": 27.09,
  "gyr_z": -46.76,
  "sample": 0,
  "time": 10.73
}, {
  "acc_x": -1059.204,
  "acc_y": -291.153,
  "acc_z": -328.363,
  "angle": 9.359706553928646e+83,
  "dev": "B",
  "gyr_x": 34.37,
  "gyr_y": 22.61,
  "gyr_z": -38.29,
  "sample": 1.0439072550588454e+161,
  "time": 10.75
}, {
  "acc_x": -1056.398,
  "acc_y": 20.618,
  "acc_z": -274.439,
  "angle": 9.359729712334726e+83,
  "dev": "B",
  "gyr_x": 57.4,
  "gyr_y": 19.6,
  "gyr_z": -34.93,
  "sample": 1.25463334089491e+238,
  "time": 10.769000000000002
}, {
  "acc_x": -1004.182,
  "acc_y": 37.454,
  "acc_z": -265.594,
  "angle": 0,
  "dev": "B",
  "gyr_x": 53.55,
  "gyr_y": 15.19,
  "gyr_z": -33.25,
  "sample": 0,
  "time": 10.788
}, {
  "acc_x": -975.573,
  "acc_y": -318.786,
  "acc_z": -311.649,
  "angle": -1.2568137504921074e+238,
  "dev": "B",
  "gyr_x": 30.66,
  "gyr_y": 11.48,
  "gyr_z": -31.71,
  "sample": 9.364472159624668e+83,
  "time": 10.808
}, {
  "acc_x": -838.689,
  "acc_y": 293.044,
  "acc_z": -579.5,
  "angle": -1.256813750487506e+238,
  "dev": "A",
  "gyr_x": 72.38,
  "gyr_y": 36.05,
  "gyr_z": -29.96,
  "sample": -1.2568136973037366e+238,
  "time": 10.775000000000002
}, {
  "acc_x": -850.767,
  "acc_y": 279.746,
  "acc_z": -485.316,
  "angle": -8076476.34261,
  "dev": "A",
  "gyr_x": 75.81,
  "gyr_y": 29.75,
  "gyr_z": -29.05,
  "sample": -8076476,
  "time": 10.794
}, {
  "acc_x": -774.578,
  "acc_y": 301.096,
  "acc_z": -477.02,
  "angle": -1.044938093120531e+161,
  "dev": "A",
  "gyr_x": 75.25,
  "gyr_y": 22.33,
  "gyr_z": -32.76,
  "sample": -1.0449380473324993e+161,
  "time": 10.813000000000002
}, {
  "acc_x": -970.205,
  "acc_y": -101.26,
  "acc_z": -296.765,
  "angle": -8076476.34263,
  "dev": "B",
  "gyr_x": 42.63,
  "gyr_y": 9.87,
  "gyr_z": -26.81,
  "sample": -8076476,
  "time": 10.828
}, {
  "acc_x": -942.267,
  "acc_y": 187.575,
  "acc_z": -259.006,
  "angle": 7785708.34153,
  "dev": "B",
  "gyr_x": 53.97,
  "gyr_y": 8.47,
  "gyr_z": -24.29,
  "sample": 7785708,
  "time": 10.847000000000001
}, {
  "acc_x": -949.465,
  "acc_y": -63.623,
  "acc_z": -257.786,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.85,
  "gyr_y": 6.37,
  "gyr_z": -26.39,
  "sample": -9.352133354595543e+83,
  "time": 10.866
}, {
  "acc_x": -777.628,
  "acc_y": 429.318,
  "acc_z": -462.258,
  "angle": 7785708.34152,
  "dev": "A",
  "gyr_x": 75.39,
  "gyr_y": 17.29,
  "gyr_z": -35.28,
  "sample": 7785708,
  "time": 10.833000000000002
}, {
  "acc_x": -781.593,
  "acc_y": 401.685,
  "acc_z": -405.467,
  "angle": -9.35213375133335e+83,
  "dev": "A",
  "gyr_x": 64.47,
  "gyr_y": 12.53,
  "gyr_z": -37.94,
  "sample": -9.352133354595538e+83,
  "time": 10.852
}, {
  "acc_x": -785.253,
  "acc_y": 297.802,
  "acc_z": -417.972,
  "angle": -1.252823778927421e+238,
  "dev": "A",
  "gyr_x": 51.59,
  "gyr_y": 9.1,
  "gyr_z": -41.23,
  "sample": 0,
  "time": 10.871000000000002
}, {
  "acc_x": -798.856,
  "acc_y": 340.746,
  "acc_z": -427.549,
  "angle": 1.2452934452370172e+238,
  "dev": "A",
  "gyr_x": 49.77,
  "gyr_y": 8.89,
  "gyr_z": -42.07,
  "sample": 1.2452933920516293e+238,
  "time": 10.891000000000002
}, {
  "acc_x": -796.477,
  "acc_y": 327.143,
  "acc_z": -434.564,
  "angle": -9.352133751112425e+83,
  "dev": "A",
  "gyr_x": 54.18,
  "gyr_y": 6.23,
  "gyr_z": -41.72,
  "sample": -9.352133354595541e+83,
  "time": 10.91
}, {
  "acc_x": -922.015,
  "acc_y": -78.812,
  "acc_z": -287.798,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.7,
  "gyr_y": 3.15,
  "gyr_z": -28.49,
  "sample": 0,
  "time": 10.885000000000002
}, {
  "acc_x": -933.544,
  "acc_y": -2.135,
  "acc_z": -265.899,
  "angle": -1.0408004435971148e+161,
  "dev": "B",
  "gyr_x": 29.33,
  "gyr_y": 1.47,
  "gyr_z": -28.98,
  "sample": -1.0408003978053201e+161,
  "time": 10.905000000000001
}, {
  "acc_x": -932.08,
  "acc_y": -19.825,
  "acc_z": -230.031,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.98,
  "gyr_y": 0.07,
  "gyr_z": -30.87,
  "sample": 0,
  "time": 10.924
}, {
  "acc_x": -804.224,
  "acc_y": 261.568,
  "acc_z": -411.506,
  "angle": 0,
  "dev": "A",
  "gyr_x": 53.34,
  "gyr_y": 1.96,
  "gyr_z": -41.93,
  "sample": 0,
  "time": 10.93
}, {
  "acc_x": -849.669,
  "acc_y": 245.464,
  "acc_z": -442.86,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.64,
  "gyr_y": 0.49,
  "gyr_z": -42.91,
  "sample": 0,
  "time": 10.95
}, {
  "acc_x": -870.714,
  "acc_y": 210.45,
  "acc_z": -411.323,
  "angle": 0,
  "dev": "A",
  "gyr_x": 47.04,
  "gyr_y": 1.82,
  "gyr_z": -44.8,
  "sample": 0,
  "time": 10.969000000000001
}, {
  "acc_x": -951.783,
  "acc_y": -87.657,
  "acc_z": -243.268,
  "angle": -1.0408004435759748e+161,
  "dev": "B",
  "gyr_x": 22.82,
  "gyr_y": 0.14,
  "gyr_z": -33.67,
  "sample": 1.0439072550588467e+161,
  "time": 10.943999999999999
}, {
  "acc_x": -961.604,
  "acc_y": -104.737,
  "acc_z": -234.179,
  "angle": -1.0408004435967272e+161,
  "dev": "B",
  "gyr_x": 22.4,
  "gyr_y": -0.28,
  "gyr_z": -35.7,
  "sample": 1.0439072550588468e+161,
  "time": 10.963000000000001
}, {
  "acc_x": -971.486,
  "acc_y": -51.85,
  "acc_z": -242.658,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.64,
  "gyr_y": 1.54,
  "gyr_z": -37.03,
  "sample": 0,
  "time": 10.983
}, {
  "acc_x": -862.479,
  "acc_y": 240.462,
  "acc_z": -385.52,
  "angle": 0,
  "dev": "A",
  "gyr_x": 40.25,
  "gyr_y": 4.48,
  "gyr_z": -45.01,
  "sample": 0,
  "time": 10.989
}, {
  "acc_x": -878.583,
  "acc_y": 306.403,
  "acc_z": -368.501,
  "angle": 1.2438663706098433e+238,
  "dev": "A",
  "gyr_x": 45.22,
  "gyr_y": 1.89,
  "gyr_z": -43.19,
  "sample": 1.2438663174211873e+238,
  "time": 11.008
}, {
  "acc_x": -844.972,
  "acc_y": 411.018,
  "acc_z": -349.286,
  "angle": 0,
  "dev": "A",
  "gyr_x": 51.45,
  "gyr_y": -4.27,
  "gyr_z": -40.46,
  "sample": 0,
  "time": 11.027000000000001
}, {
  "acc_x": -966.606,
  "acc_y": 2.135,
  "acc_z": -227.957,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.92,
  "gyr_y": 3.15,
  "gyr_z": -39.27,
  "sample": 0,
  "time": 11.001999999999999
}, {
  "acc_x": -975.268,
  "acc_y": -39.406,
  "acc_z": -260.348,
  "angle": 1.0439073008492425e+161,
  "dev": "B",
  "gyr_x": 21.91,
  "gyr_y": 4.48,
  "gyr_z": -42.7,
  "sample": 1.0439072550588472e+161,
  "time": 11.021
}, {
  "acc_x": -973.194,
  "acc_y": 75.762,
  "acc_z": -254.98,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.36,
  "gyr_y": 3.5,
  "gyr_z": -46.48,
  "sample": 0,
  "time": 11.04
}, {
  "acc_x": -822.768,
  "acc_y": 479.216,
  "acc_z": -295.789,
  "angle": -1.040800443582554e+161,
  "dev": "A",
  "gyr_x": 51.38,
  "gyr_y": -8.26,
  "gyr_z": -36.47,
  "sample": 1.0439072550588468e+161,
  "time": 11.047
}, {
  "acc_x": -993.202,
  "acc_y": 175.436,
  "acc_z": -238.388,
  "angle": 7740324.34142,
  "dev": "B",
  "gyr_x": 26.6,
  "gyr_y": 2.8,
  "gyr_z": -52.71,
  "sample": 7740324,
  "time": 11.060000000000002
}, {
  "acc_x": -997.655,
  "acc_y": 187.026,
  "acc_z": -267.668,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.19,
  "gyr_y": 2.31,
  "gyr_z": -63.49,
  "sample": 0,
  "time": 11.079
}, {
  "acc_x": -817.705,
  "acc_y": 551.867,
  "acc_z": -283.101,
  "angle": -1.0408004435762705e+161,
  "dev": "A",
  "gyr_x": 46.41,
  "gyr_y": -7.84,
  "gyr_z": -29.47,
  "sample": 1.0439072550588469e+161,
  "time": 11.067
}, {
  "acc_x": -879.864,
  "acc_y": 491.904,
  "acc_z": -303.597,
  "angle": -8.931887204624676e+83,
  "dev": "A",
  "gyr_x": 35.77,
  "gyr_y": -3.08,
  "gyr_z": -20.79,
  "sample": 0,
  "time": 11.086000000000002
}, {
  "acc_x": -1036.817,
  "acc_y": 149.511,
  "acc_z": -225.029,
  "angle": -8042032.34235,
  "dev": "B",
  "gyr_x": 16.94,
  "gyr_y": 2.66,
  "gyr_z": -74.55,
  "sample": -8042032,
  "time": 11.099
}, {
  "acc_x": -904.142,
  "acc_y": 466.894,
  "acc_z": -313.845,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.87,
  "gyr_y": -4.13,
  "gyr_z": -13.44,
  "sample": 0,
  "time": 11.106000000000002
}, {
  "acc_x": -1067.378,
  "acc_y": 75.335,
  "acc_z": -184.708,
  "angle": 0,
  "dev": "B",
  "gyr_x": 15.26,
  "gyr_y": 3.15,
  "gyr_z": -84.28,
  "sample": -1.0844294048093547e+161,
  "time": 11.118000000000002
}, {
  "acc_x": -1103.307,
  "acc_y": -10.98,
  "acc_z": -186.904,
  "angle": 1.2438663705802221e+238,
  "dev": "B",
  "gyr_x": 15.61,
  "gyr_y": 4.62,
  "gyr_z": -93.17,
  "sample": 1.243866317421189e+238,
  "time": 11.138000000000002
}, {
  "acc_x": -1173.518,
  "acc_y": -50.935,
  "acc_z": -190.686,
  "angle": -8.931887204570515e+83,
  "dev": "B",
  "gyr_x": 17.99,
  "gyr_y": 4.83,
  "gyr_z": -101.22,
  "sample": 7739288,
  "time": 11.157
}, {
  "acc_x": -920.673,
  "acc_y": 409.188,
  "acc_z": -310.368,
  "angle": 0,
  "dev": "A",
  "gyr_x": 14.84,
  "gyr_y": -11.2,
  "gyr_z": -7.28,
  "sample": 0,
  "time": 11.125
}, {
  "acc_x": -933.361,
  "acc_y": 465.613,
  "acc_z": -334.951,
  "angle": 7740324.34138,
  "dev": "A",
  "gyr_x": 9.94,
  "gyr_y": -17.57,
  "gyr_z": -3.36,
  "sample": 7740324,
  "time": 11.144000000000002
}, {
  "acc_x": -1278.682,
  "acc_y": -79.117,
  "acc_z": -238.083,
  "angle": 1.2438663705853463e+238,
  "dev": "B",
  "gyr_x": 19.18,
  "gyr_y": 3.78,
  "gyr_z": -108.92,
  "sample": 1.2438663174211892e+238,
  "time": 11.176000000000002
}, {
  "acc_x": -1398.425,
  "acc_y": 82.594,
  "acc_z": -187.026,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.12,
  "gyr_y": 1.26,
  "gyr_z": -116.9,
  "sample": 0,
  "time": 11.195
}, {
  "acc_x": -1000.705,
  "acc_y": 642.147,
  "acc_z": -379.725,
  "angle": 0,
  "dev": "A",
  "gyr_x": 14.49,
  "gyr_y": -24.71,
  "gyr_z": -1.54,
  "sample": 0,
  "time": 11.164000000000001
}, {
  "acc_x": -982.039,
  "acc_y": 779.58,
  "acc_z": -271.389,
  "angle": 1.2438663705863434e+238,
  "dev": "A",
  "gyr_x": 16.1,
  "gyr_y": -31.36,
  "gyr_z": 0,
  "sample": 1.2438663174211886e+238,
  "time": 11.183
}, {
  "acc_x": -1075.552,
  "acc_y": 822.463,
  "acc_z": -78.08,
  "angle": 0,
  "dev": "A",
  "gyr_x": 0.84,
  "gyr_y": -37.94,
  "gyr_z": 2.73,
  "sample": 0,
  "time": 11.203
}, {
  "acc_x": -1480.775,
  "acc_y": 349.408,
  "acc_z": -152.5,
  "angle": -8.93188720474896e+83,
  "dev": "B",
  "gyr_x": 24.15,
  "gyr_y": 0.21,
  "gyr_z": -126,
  "sample": 7739288,
  "time": 11.215
}, {
  "acc_x": -1587.647,
  "acc_y": 526.491,
  "acc_z": -8.601,
  "angle": 0,
  "dev": "B",
  "gyr_x": 18.83,
  "gyr_y": 1.33,
  "gyr_z": -136.78,
  "sample": 0,
  "time": 11.235
}, {
  "acc_x": -1527.074,
  "acc_y": 234.606,
  "acc_z": 15.982,
  "angle": -1.2453822492367627e+238,
  "dev": "B",
  "gyr_x": 24.36,
  "gyr_y": 8.33,
  "gyr_z": -143.64,
  "sample": -1.2453821960865122e+238,
  "time": 11.254000000000001
}, {
  "acc_x": -1384.395,
  "acc_y": 81.618,
  "acc_z": -360.266,
  "angle": -1.0844294507108078e+161,
  "dev": "B",
  "gyr_x": 51.73,
  "gyr_y": 19.88,
  "gyr_z": -141.96,
  "sample": -1.0844294048093557e+161,
  "time": 11.273
}, {
  "acc_x": -1178.215,
  "acc_y": -389.607,
  "acc_z": -435.723,
  "angle": -9.352092065959592e+83,
  "dev": "B",
  "gyr_x": 59.57,
  "gyr_y": 31.36,
  "gyr_z": -137.97,
  "sample": 0,
  "time": 11.293
}, {
  "acc_x": -1254.221,
  "acc_y": 706.746,
  "acc_z": -4.27,
  "angle": 0,
  "dev": "A",
  "gyr_x": -21.14,
  "gyr_y": -52.57,
  "gyr_z": 14.84,
  "sample": 0,
  "time": 11.222999999999999
}, {
  "acc_x": -1202.31,
  "acc_y": 504.043,
  "acc_z": 101.199,
  "angle": 0,
  "dev": "A",
  "gyr_x": -43.05,
  "gyr_y": -80.36,
  "gyr_z": 32.41,
  "sample": 0,
  "time": 11.242
}, {
  "acc_x": -1052.738,
  "acc_y": 421.388,
  "acc_z": -135.481,
  "angle": -1.2453822492801049e+238,
  "dev": "A",
  "gyr_x": -46.27,
  "gyr_y": -106.12,
  "gyr_z": 47.39,
  "sample": -1.2453821960865116e+238,
  "time": 11.261
}, {
  "acc_x": -1097.512,
  "acc_y": 348.798,
  "acc_z": -441.762,
  "angle": 0,
  "dev": "A",
  "gyr_x": -25.55,
  "gyr_y": -109.76,
  "gyr_z": 66.92,
  "sample": 0,
  "time": 11.281000000000002
}, {
  "acc_x": -1294.969,
  "acc_y": 162.687,
  "acc_z": -574.376,
  "angle": 0,
  "dev": "A",
  "gyr_x": -14.14,
  "gyr_y": -96.74,
  "gyr_z": 83.09,
  "sample": 0,
  "time": 11.3
}, {
  "acc_x": -990.945,
  "acc_y": -371.185,
  "acc_z": -337.513,
  "angle": 7792868.34138,
  "dev": "B",
  "gyr_x": 29.68,
  "gyr_y": 31.71,
  "gyr_z": -127.89,
  "sample": 7792868,
  "time": 11.312000000000001
}, {
  "acc_x": -1361.703,
  "acc_y": 26.047,
  "acc_z": -455.243,
  "angle": -1.0844294507007303e+161,
  "dev": "A",
  "gyr_x": -24.85,
  "gyr_y": -80.15,
  "gyr_z": 84.21,
  "sample": -1.0844294048093554e+161,
  "time": 11.318999999999999
}, {
  "acc_x": -1248.365,
  "acc_y": -36.112,
  "acc_z": -378.993,
  "angle": 0,
  "dev": "A",
  "gyr_x": -44.87,
  "gyr_y": -74.41,
  "gyr_z": 76.51,
  "sample": 0,
  "time": 11.34
}, {
  "acc_x": -1219.817,
  "acc_y": 8.54,
  "acc_z": -377.346,
  "angle": 0,
  "dev": "A",
  "gyr_x": -52.92,
  "gyr_y": -74.06,
  "gyr_z": 72.52,
  "sample": 0,
  "time": 11.359000000000002
}, {
  "acc_x": -714.066,
  "acc_y": -513.132,
  "acc_z": -359.351,
  "angle": -1.2453822492484733e+238,
  "dev": "B",
  "gyr_x": -14.35,
  "gyr_y": 27.44,
  "gyr_z": -104.86,
  "sample": -1.2453821960865128e+238,
  "time": 11.331
}, {
  "acc_x": -536.617,
  "acc_y": -1022.726,
  "acc_z": -275.354,
  "angle": -1.0844294507483187e+161,
  "dev": "B",
  "gyr_x": -39.76,
  "gyr_y": 17.78,
  "gyr_z": -75.46,
  "sample": -1.0844294048093562e+161,
  "time": 11.350000000000001
}, {
  "acc_x": -493.124,
  "acc_y": -1187.06,
  "acc_z": -631.96,
  "angle": 0,
  "dev": "B",
  "gyr_x": -23.52,
  "gyr_y": 7.49,
  "gyr_z": -42.07,
  "sample": -1.2453821960865131e+238,
  "time": 11.371000000000002
}, {
  "acc_x": -1135.271,
  "acc_y": 117.181,
  "acc_z": -434.625,
  "angle": 0,
  "dev": "A",
  "gyr_x": -58.1,
  "gyr_y": -66.29,
  "gyr_z": 65.59,
  "sample": 0,
  "time": 11.378
}, {
  "acc_x": -476.105,
  "acc_y": -383.446,
  "acc_z": -266.326,
  "angle": 0,
  "dev": "B",
  "gyr_x": 9.59,
  "gyr_y": 1.68,
  "gyr_z": -10.92,
  "sample": 0,
  "time": 11.39
}, {
  "acc_x": -286.273,
  "acc_y": -284.626,
  "acc_z": 52.338,
  "angle": -1.250806747462972e+238,
  "dev": "B",
  "gyr_x": 55.51,
  "gyr_y": -14.14,
  "gyr_z": 29.33,
  "sample": -1.250806694301012e+238,
  "time": 11.408999999999999
}, {
  "acc_x": -1091.717,
  "acc_y": 205.265,
  "acc_z": -482.632,
  "angle": -1.0844294507007003e+161,
  "dev": "A",
  "gyr_x": -65.1,
  "gyr_y": -49.84,
  "gyr_z": 57.26,
  "sample": -1.084429404809356e+161,
  "time": 11.398
}, {
  "acc_x": -1020.347,
  "acc_y": 197.152,
  "acc_z": -446.032,
  "angle": 0,
  "dev": "A",
  "gyr_x": -82.88,
  "gyr_y": -39.48,
  "gyr_z": 50.26,
  "sample": 0,
  "time": 11.417000000000002
}, {
  "acc_x": -237.107,
  "acc_y": -451.949,
  "acc_z": -44.042,
  "angle": 0,
  "dev": "B",
  "gyr_x": 14.07,
  "gyr_y": -20.51,
  "gyr_z": 65.38,
  "sample": 0,
  "time": 11.428
}, {
  "acc_x": -916.891,
  "acc_y": 26.596,
  "acc_z": -374.418,
  "angle": 0,
  "dev": "A",
  "gyr_x": -100.66,
  "gyr_y": -32.76,
  "gyr_z": 42.7,
  "sample": 0,
  "time": 11.436
}, {
  "acc_x": -292.8,
  "acc_y": -683.2,
  "acc_z": -243.39,
  "angle": -8.96109923302175e+83,
  "dev": "B",
  "gyr_x": -43.4,
  "gyr_y": -19.74,
  "gyr_z": 102.06,
  "sample": -8.961098837557589e+83,
  "time": 11.448
}, {
  "acc_x": -450.729,
  "acc_y": -619.333,
  "acc_z": -270.169,
  "angle": 0,
  "dev": "B",
  "gyr_x": -55.58,
  "gyr_y": -23.66,
  "gyr_z": 134.47,
  "sample": 0,
  "time": 11.467000000000002
}, {
  "acc_x": -841.495,
  "acc_y": -65.331,
  "acc_z": -419.131,
  "angle": 0,
  "dev": "A",
  "gyr_x": -102.34,
  "gyr_y": -25.55,
  "gyr_z": 37.38,
  "sample": 0,
  "time": 11.456
}, {
  "acc_x": -807.945,
  "acc_y": -42.883,
  "acc_z": -414.922,
  "angle": -1.0844294507301916e+161,
  "dev": "A",
  "gyr_x": -80.85,
  "gyr_y": -17.29,
  "gyr_z": 37.52,
  "sample": -1.2550314065337806e+238,
  "time": 11.475000000000001
}, {
  "acc_x": -517.585,
  "acc_y": -444.263,
  "acc_z": -218.99,
  "angle": 0,
  "dev": "B",
  "gyr_x": -46.34,
  "gyr_y": -32.13,
  "gyr_z": 155.89,
  "sample": 0,
  "time": 11.486
}, {
  "acc_x": -753.289,
  "acc_y": -53.924,
  "acc_z": -394.426,
  "angle": 0,
  "dev": "A",
  "gyr_x": -50.89,
  "gyr_y": -7.84,
  "gyr_z": 41.51,
  "sample": 0,
  "time": 11.496000000000002
}, {
  "acc_x": -552.782,
  "acc_y": -382.165,
  "acc_z": -206.729,
  "angle": -8.961099232785796e+83,
  "dev": "B",
  "gyr_x": -43.54,
  "gyr_y": -42.21,
  "gyr_z": 175.77,
  "sample": 1.0439045734972643e+161,
  "time": 11.504999999999999
}, {
  "acc_x": -608.597,
  "acc_y": -396.988,
  "acc_z": -267.607,
  "angle": -8076476.3424,
  "dev": "B",
  "gyr_x": -58.38,
  "gyr_y": -51.87,
  "gyr_z": 194.6,
  "sample": -8076476,
  "time": 11.526
}, {
  "acc_x": -680.76,
  "acc_y": 4.636,
  "acc_z": -405.162,
  "angle": 8017984.3424,
  "dev": "A",
  "gyr_x": -24.15,
  "gyr_y": 0.63,
  "gyr_z": 45.71,
  "sample": 8017984,
  "time": 11.515
}, {
  "acc_x": -634.888,
  "acc_y": 51.911,
  "acc_z": -345.26,
  "angle": 0,
  "dev": "A",
  "gyr_x": -5.11,
  "gyr_y": 7.7,
  "gyr_z": 46.41,
  "sample": 0,
  "time": 11.533999999999999
}, {
  "acc_x": -655.262,
  "acc_y": 79.971,
  "acc_z": -278.404,
  "angle": -8076476.3424,
  "dev": "A",
  "gyr_x": 8.26,
  "gyr_y": 15.12,
  "gyr_z": 42.77,
  "sample": -8076476,
  "time": 11.554000000000002
}, {
  "acc_x": -752.13,
  "acc_y": -401.685,
  "acc_z": -281.637,
  "angle": 8017984.3426,
  "dev": "B",
  "gyr_x": -69.09,
  "gyr_y": -58.38,
  "gyr_z": 210.21,
  "sample": 8017984,
  "time": 11.545000000000002
}, {
  "acc_x": -823.805,
  "acc_y": -347.09,
  "acc_z": -302.316,
  "angle": 8017984.34235,
  "dev": "B",
  "gyr_x": -77.35,
  "gyr_y": -64.75,
  "gyr_z": 219.45,
  "sample": 8017984,
  "time": 11.564
}, {
  "acc_x": -896.456,
  "acc_y": -452.681,
  "acc_z": -253.76,
  "angle": -1.0828880891306153e+161,
  "dev": "B",
  "gyr_x": -87.08,
  "gyr_y": -72.73,
  "gyr_z": 225.61,
  "sample": -1.255031406533782e+238,
  "time": 11.583000000000002
}, {
  "acc_x": -682.956,
  "acc_y": 109.861,
  "acc_z": -191.235,
  "angle": 0,
  "dev": "A",
  "gyr_x": 13.3,
  "gyr_y": 26.32,
  "gyr_z": 35.14,
  "sample": 0,
  "time": 11.573
}, {
  "acc_x": -694.668,
  "acc_y": 137.372,
  "acc_z": -175.497,
  "angle": 0,
  "dev": "A",
  "gyr_x": -5.39,
  "gyr_y": 32.34,
  "gyr_z": 20.72,
  "sample": 0,
  "time": 11.592000000000002
}, {
  "acc_x": -912.865,
  "acc_y": -498.065,
  "acc_z": -309.941,
  "angle": -8.961099232843305e+83,
  "dev": "B",
  "gyr_x": -91.63,
  "gyr_y": -76.79,
  "gyr_z": 229.67,
  "sample": 1.0448720809174896e+161,
  "time": 11.603000000000002
}, {
  "acc_x": -885.232,
  "acc_y": -376.126,
  "acc_z": -158.112,
  "angle": -8.961099233019869e+83,
  "dev": "B",
  "gyr_x": -86.31,
  "gyr_y": -79.45,
  "gyr_z": 234.99,
  "sample": -8.931886809284809e+83,
  "time": 11.622
}, {
  "acc_x": -688.69,
  "acc_y": 95.526,
  "acc_z": -209.962,
  "angle": 0,
  "dev": "A",
  "gyr_x": -34.02,
  "gyr_y": 34.93,
  "gyr_z": 1.61,
  "sample": 0,
  "time": 11.612000000000002
}, {
  "acc_x": -686.494,
  "acc_y": 3.111,
  "acc_z": -192.028,
  "angle": 0,
  "dev": "A",
  "gyr_x": -62.09,
  "gyr_y": 35.42,
  "gyr_z": -20.09,
  "sample": 0,
  "time": 11.632000000000001
}, {
  "acc_x": -1033.828,
  "acc_y": -333.06,
  "acc_z": -144.936,
  "angle": -8076476.34242,
  "dev": "B",
  "gyr_x": -84.35,
  "gyr_y": -75.67,
  "gyr_z": 242.48,
  "sample": -8076476,
  "time": 11.641000000000002
}, {
  "acc_x": -780.129,
  "acc_y": 95.587,
  "acc_z": -123.281,
  "angle": 0,
  "dev": "A",
  "gyr_x": -79.66,
  "gyr_y": 40.88,
  "gyr_z": -40.18,
  "sample": 0,
  "time": 11.651
}, {
  "acc_x": -1193.831,
  "acc_y": -317.749,
  "acc_z": -226.432,
  "angle": 1.2033239129654077e+238,
  "dev": "B",
  "gyr_x": -87.22,
  "gyr_y": -66.22,
  "gyr_z": 243.25,
  "sample": 1.2033238599588521e+238,
  "time": 11.661000000000001
}, {
  "acc_x": -1290.516,
  "acc_y": -330.559,
  "acc_z": -275.293,
  "angle": 0,
  "dev": "B",
  "gyr_x": -74.69,
  "gyr_y": -60.97,
  "gyr_z": 239.75,
  "sample": 0,
  "time": 11.681000000000001
}, {
  "acc_x": -870.348,
  "acc_y": 323.788,
  "acc_z": 104.371,
  "angle": 0,
  "dev": "A",
  "gyr_x": -88.83,
  "gyr_y": 41.79,
  "gyr_z": -53.69,
  "sample": -1.255031406533782e+238,
  "time": 11.671
}, {
  "acc_x": -966.118,
  "acc_y": 549.671,
  "acc_z": 232.288,
  "angle": 0,
  "dev": "A",
  "gyr_x": -90.23,
  "gyr_y": 24.43,
  "gyr_z": -62.02,
  "sample": 0,
  "time": 11.690000000000001
}, {
  "acc_x": -1223.843,
  "acc_y": -203.008,
  "acc_z": -110.837,
  "angle": 8095540.34244,
  "dev": "B",
  "gyr_x": -52.57,
  "gyr_y": -56.07,
  "gyr_z": 228.27,
  "sample": 8095540,
  "time": 11.7
}, {
  "acc_x": -998.265,
  "acc_y": 831.857,
  "acc_z": 181.109,
  "angle": 0,
  "dev": "A",
  "gyr_x": -87.08,
  "gyr_y": 19.81,
  "gyr_z": -57.75,
  "sample": 0,
  "time": 11.709
}, {
  "acc_x": -1041.941,
  "acc_y": 16.104,
  "acc_z": -26.352,
  "angle": 0,
  "dev": "B",
  "gyr_x": -31.15,
  "gyr_y": -45.85,
  "gyr_z": 202.3,
  "sample": 0,
  "time": 11.719000000000001
}, {
  "acc_x": -957.334,
  "acc_y": 66.795,
  "acc_z": -172.447,
  "angle": 0,
  "dev": "B",
  "gyr_x": -24.85,
  "gyr_y": -27.65,
  "gyr_z": 158.48,
  "sample": 0,
  "time": 11.738
}, {
  "acc_x": -1008.086,
  "acc_y": 1016.565,
  "acc_z": 351.726,
  "angle": 0,
  "dev": "A",
  "gyr_x": -63.28,
  "gyr_y": 13.09,
  "gyr_z": -31.43,
  "sample": 0,
  "time": 11.729
}, {
  "acc_x": -1076.528,
  "acc_y": 1050.908,
  "acc_z": 277.001,
  "angle": 0,
  "dev": "A",
  "gyr_x": -59.01,
  "gyr_y": 11.48,
  "gyr_z": -3.99,
  "sample": 0,
  "time": 11.748000000000001
}, {
  "acc_x": -855.586,
  "acc_y": 156.648,
  "acc_z": -261.141,
  "angle": 0,
  "dev": "B",
  "gyr_x": -17.57,
  "gyr_y": -12.32,
  "gyr_z": 97.02,
  "sample": 0,
  "time": 11.758
}, {
  "acc_x": -931.165,
  "acc_y": 641.781,
  "acc_z": 161.711,
  "angle": -1.2568137504772158e+238,
  "dev": "A",
  "gyr_x": -54.67,
  "gyr_y": 8.54,
  "gyr_z": 17.64,
  "sample": -1.256813697303744e+238,
  "time": 11.768
}, {
  "acc_x": -855.525,
  "acc_y": 355.203,
  "acc_z": -87.84,
  "angle": -1.256813750467865e+238,
  "dev": "A",
  "gyr_x": -23.03,
  "gyr_y": 18.9,
  "gyr_z": 31.99,
  "sample": -1.2568136973037441e+238,
  "time": 11.788
}, {
  "acc_x": -1047.553,
  "acc_y": 432.368,
  "acc_z": -298.412,
  "angle": -7796472.34245,
  "dev": "A",
  "gyr_x": 4.2,
  "gyr_y": 41.23,
  "gyr_z": 38.29,
  "sample": -7796472,
  "time": 11.807000000000002
}, {
  "acc_x": -880.047,
  "acc_y": 24.583,
  "acc_z": -162.565,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.04,
  "gyr_y": 1.19,
  "gyr_z": 26.11,
  "sample": 0,
  "time": 11.777000000000001
}, {
  "acc_x": -1033.279,
  "acc_y": 70.333,
  "acc_z": -333.426,
  "angle": -1.2550314596990049e+238,
  "dev": "B",
  "gyr_x": -15.68,
  "gyr_y": 15.89,
  "gyr_z": -39.48,
  "sample": 9.277063027301258e+83,
  "time": 11.797
}, {
  "acc_x": -885.354,
  "acc_y": -26.962,
  "acc_z": -600.179,
  "angle": 0,
  "dev": "B",
  "gyr_x": -41.79,
  "gyr_y": 33.04,
  "gyr_z": -90.44,
  "sample": 0,
  "time": 11.815999999999999
}, {
  "acc_x": -1318.393,
  "acc_y": 202.825,
  "acc_z": -116.144,
  "angle": -1.256813750478199e+238,
  "dev": "A",
  "gyr_x": 10.36,
  "gyr_y": 59.5,
  "gyr_z": 38.01,
  "sample": 0,
  "time": 11.826
}, {
  "acc_x": -1359.812,
  "acc_y": 962.153,
  "acc_z": 667.34,
  "angle": -1.0395679978710545e+161,
  "dev": "A",
  "gyr_x": 6.72,
  "gyr_y": 54.32,
  "gyr_z": 26.88,
  "sample": -1.0395679521004053e+161,
  "time": 11.846
}, {
  "acc_x": -1067.561,
  "acc_y": 1325.652,
  "acc_z": -428.891,
  "angle": 0,
  "dev": "A",
  "gyr_x": -97.16,
  "gyr_y": 45.85,
  "gyr_z": 2.24,
  "sample": 0,
  "time": 11.865000000000002
}, {
  "acc_x": -1754.055,
  "acc_y": 850.584,
  "acc_z": 722.972,
  "angle": 0,
  "dev": "B",
  "gyr_x": -33.6,
  "gyr_y": 59.64,
  "gyr_z": -98.35,
  "sample": 0,
  "time": 11.836000000000002
}, {
  "acc_x": -1333.948,
  "acc_y": 374.54,
  "acc_z": 176.29,
  "angle": 0,
  "dev": "B",
  "gyr_x": 60.97,
  "gyr_y": 28.98,
  "gyr_z": -63.35,
  "sample": 0,
  "time": 11.855
}, {
  "acc_x": -819.962,
  "acc_y": -735.965,
  "acc_z": -228.75,
  "angle": 0,
  "dev": "A",
  "gyr_x": -32.06,
  "gyr_y": 70.42,
  "gyr_z": 1.05,
  "sample": 0,
  "time": 11.884
}, {
  "acc_x": -1298.568,
  "acc_y": -131.394,
  "acc_z": 167.567,
  "angle": 0,
  "dev": "B",
  "gyr_x": -55.93,
  "gyr_y": 41.37,
  "gyr_z": -105.28,
  "sample": 0,
  "time": 11.874000000000002
}, {
  "acc_x": -837.225,
  "acc_y": -258.579,
  "acc_z": -342.881,
  "angle": -1.0395679978929776e+161,
  "dev": "B",
  "gyr_x": -98.42,
  "gyr_y": 48.86,
  "gyr_z": -121.38,
  "sample": -1.0395679521004062e+161,
  "time": 11.894000000000002
}, {
  "acc_x": -761.524,
  "acc_y": -279.807,
  "acc_z": -371.551,
  "angle": -7790312.34113,
  "dev": "B",
  "gyr_x": -105.91,
  "gyr_y": 43.19,
  "gyr_z": -120.33,
  "sample": -7790312,
  "time": 11.913
}, {
  "acc_x": -500.993,
  "acc_y": -32.696,
  "acc_z": -601.216,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.58,
  "gyr_y": 59.43,
  "gyr_z": -6.51,
  "sample": 0,
  "time": 11.904
}, {
  "acc_x": -629.947,
  "acc_y": 345.565,
  "acc_z": -774.151,
  "angle": 0,
  "dev": "A",
  "gyr_x": -26.46,
  "gyr_y": 56.07,
  "gyr_z": -38.71,
  "sample": 0,
  "time": 11.924
}, {
  "acc_x": -978.44,
  "acc_y": -249.551,
  "acc_z": -537.715,
  "angle": 0,
  "dev": "A",
  "gyr_x": -15.75,
  "gyr_y": 62.37,
  "gyr_z": -35.14,
  "sample": 0,
  "time": 11.943999999999999
}, {
  "acc_x": -1008.818,
  "acc_y": 170.617,
  "acc_z": -467.321,
  "angle": 0,
  "dev": "A",
  "gyr_x": 21.21,
  "gyr_y": 58.31,
  "gyr_z": -20.79,
  "sample": 0,
  "time": 11.963000000000001
}, {
  "acc_x": -887.611,
  "acc_y": 259.128,
  "acc_z": -425.475,
  "angle": -1.201353456995252e+238,
  "dev": "A",
  "gyr_x": 31.5,
  "gyr_y": 50.05,
  "gyr_z": -24.99,
  "sample": 0,
  "time": 11.982
}, {
  "acc_x": -865.651,
  "acc_y": -467.077,
  "acc_z": -586.454,
  "angle": -1.0395679978907959e+161,
  "dev": "B",
  "gyr_x": -102.97,
  "gyr_y": 44.94,
  "gyr_z": -104.93,
  "sample": -1.0395679521004064e+161,
  "time": 11.932000000000002
}, {
  "acc_x": -898.591,
  "acc_y": -480.192,
  "acc_z": -651.297,
  "angle": -1.0392939422988896e+161,
  "dev": "B",
  "gyr_x": -94.57,
  "gyr_y": 47.11,
  "gyr_z": -92.68,
  "sample": -1.0392938965063185e+161,
  "time": 11.952000000000002
}, {
  "acc_x": -997.35,
  "acc_y": -599.508,
  "acc_z": -323.3,
  "angle": 0,
  "dev": "B",
  "gyr_x": -14.49,
  "gyr_y": 39.48,
  "gyr_z": -70.42,
  "sample": 0,
  "time": 11.971
}, {
  "acc_x": -1058.411,
  "acc_y": -226.615,
  "acc_z": -33.733,
  "angle": 0,
  "dev": "B",
  "gyr_x": 61.04,
  "gyr_y": 28.21,
  "gyr_z": -52.22,
  "sample": 8095540,
  "time": 11.991
}, {
  "acc_x": -1014.308,
  "acc_y": 238.51,
  "acc_z": -22.265,
  "angle": 0,
  "dev": "B",
  "gyr_x": 80.78,
  "gyr_y": 24.57,
  "gyr_z": -45.78,
  "sample": 0,
  "time": 12.010000000000002
}, {
  "acc_x": -822.158,
  "acc_y": 219.844,
  "acc_z": -439.322,
  "angle": -1.2408271611569414e+238,
  "dev": "A",
  "gyr_x": 29.96,
  "gyr_y": 42.98,
  "gyr_z": -28.98,
  "sample": -8082756,
  "time": 12.001999999999999
}, {
  "acc_x": -805.871,
  "acc_y": 327.57,
  "acc_z": -465.613,
  "angle": 0,
  "dev": "A",
  "gyr_x": 35.35,
  "gyr_y": 38.29,
  "gyr_z": -29.4,
  "sample": 0,
  "time": 12.021
}, {
  "acc_x": -936.167,
  "acc_y": 132.675,
  "acc_z": -213.256,
  "angle": -1.2408271611627342e+238,
  "dev": "B",
  "gyr_x": 28.84,
  "gyr_y": 25.83,
  "gyr_z": -49.63,
  "sample": -8082756,
  "time": 12.029
}, {
  "acc_x": -970.022,
  "acc_y": -213.805,
  "acc_z": -397.842,
  "angle": -9.312250323813634e+83,
  "dev": "B",
  "gyr_x": -22.12,
  "gyr_y": 28.91,
  "gyr_z": -48.65,
  "sample": -1.0395679521004071e+161,
  "time": 12.048000000000002
}, {
  "acc_x": -1012.844,
  "acc_y": -291.58,
  "acc_z": -427.427,
  "angle": -1.2013534570191637e+238,
  "dev": "B",
  "gyr_x": -10.43,
  "gyr_y": 23.59,
  "gyr_z": -42.07,
  "sample": -1.2013534039961071e+238,
  "time": 12.068000000000001
}, {
  "acc_x": -807.213,
  "acc_y": 311.588,
  "acc_z": -497.15,
  "angle": 1.2015881977544812e+238,
  "dev": "A",
  "gyr_x": 40.11,
  "gyr_y": 38.5,
  "gyr_z": -28.21,
  "sample": 0,
  "time": 12.04
}, {
  "acc_x": -799.1,
  "acc_y": 326.228,
  "acc_z": -541.924,
  "angle": 0,
  "dev": "A",
  "gyr_x": 44.1,
  "gyr_y": 39.06,
  "gyr_z": -27.65,
  "sample": -1.2408271080037073e+238,
  "time": 12.061
}, {
  "acc_x": -800.93,
  "acc_y": 305.488,
  "acc_z": -526.308,
  "angle": -1.2408271611688556e+238,
  "dev": "A",
  "gyr_x": 51.94,
  "gyr_y": 38.22,
  "gyr_z": -25.9,
  "sample": 1.2015881447316624e+238,
  "time": 12.080000000000002
}, {
  "acc_x": -993.995,
  "acc_y": -118.889,
  "acc_z": -340.441,
  "angle": 0,
  "dev": "B",
  "gyr_x": 32.13,
  "gyr_y": 15.4,
  "gyr_z": -35.7,
  "sample": 0,
  "time": 12.088000000000001
}, {
  "acc_x": -835.822,
  "acc_y": 291.336,
  "acc_z": -462.441,
  "angle": 0,
  "dev": "A",
  "gyr_x": 58.66,
  "gyr_y": 34.86,
  "gyr_z": -26.25,
  "sample": 0,
  "time": 12.099
}, {
  "acc_x": -987.529,
  "acc_y": 18.971,
  "acc_z": -169.458,
  "angle": 0,
  "dev": "B",
  "gyr_x": 58.73,
  "gyr_y": 10.57,
  "gyr_z": -30.59,
  "sample": 0,
  "time": 12.107
}, {
  "acc_x": -842.349,
  "acc_y": 270.474,
  "acc_z": -447.313,
  "angle": -1.2013534569958905e+238,
  "dev": "A",
  "gyr_x": 61.67,
  "gyr_y": 30.66,
  "gyr_z": -28.07,
  "sample": 0,
  "time": 12.119
}, {
  "acc_x": -818.864,
  "acc_y": 266.753,
  "acc_z": -451.095,
  "angle": 0,
  "dev": "A",
  "gyr_x": 62.3,
  "gyr_y": 27.72,
  "gyr_z": -29.61,
  "sample": 0,
  "time": 12.138000000000002
}, {
  "acc_x": -970.937,
  "acc_y": 9.577,
  "acc_z": -165.249,
  "angle": 0,
  "dev": "B",
  "gyr_x": 48.3,
  "gyr_y": 9.03,
  "gyr_z": -28.56,
  "sample": -1.2013534039961075e+238,
  "time": 12.126999999999999
}, {
  "acc_x": -966.545,
  "acc_y": -70.272,
  "acc_z": -248.148,
  "angle": -1.2013534570193742e+238,
  "dev": "B",
  "gyr_x": 26.11,
  "gyr_y": 9.73,
  "gyr_z": -28.07,
  "sample": -1.2013534039961077e+238,
  "time": 12.146
}, {
  "acc_x": -761.829,
  "acc_y": 338.489,
  "acc_z": -443.592,
  "angle": 7792868.34154,
  "dev": "A",
  "gyr_x": 63.14,
  "gyr_y": 23.94,
  "gyr_z": -29.96,
  "sample": 7792868,
  "time": 12.157
}, {
  "acc_x": -785.436,
  "acc_y": 371.185,
  "acc_z": -452.01,
  "angle": -1.2013534569570341e+238,
  "dev": "A",
  "gyr_x": 63.77,
  "gyr_y": 20.51,
  "gyr_z": -30.03,
  "sample": 9.028174879011017e+83,
  "time": 12.177
}, {
  "acc_x": -769.393,
  "acc_y": 400.587,
  "acc_z": -434.503,
  "angle": 0,
  "dev": "A",
  "gyr_x": 62.72,
  "gyr_y": 17.01,
  "gyr_z": -29.54,
  "sample": 0,
  "time": 12.197
}, {
  "acc_x": -772.138,
  "acc_y": 396.744,
  "acc_z": -432.368,
  "angle": 0,
  "dev": "A",
  "gyr_x": 57.33,
  "gyr_y": 11.55,
  "gyr_z": -29.68,
  "sample": 0,
  "time": 12.216000000000001
}, {
  "acc_x": -952.088,
  "acc_y": -100.711,
  "acc_z": -293.41,
  "angle": -1.2013534570191637e+238,
  "dev": "B",
  "gyr_x": 22.19,
  "gyr_y": 9.17,
  "gyr_z": -25.97,
  "sample": -1.2013534039961078e+238,
  "time": 12.165
}, {
  "acc_x": -829.722,
  "acc_y": 375.577,
  "acc_z": -425.963,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.57,
  "gyr_y": 9.66,
  "gyr_z": -31.22,
  "sample": 0,
  "time": 12.236
}, {
  "acc_x": -934.276,
  "acc_y": 15.372,
  "acc_z": -253.638,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.79,
  "gyr_y": 7.56,
  "gyr_z": -23.87,
  "sample": 0,
  "time": 12.184000000000001
}, {
  "acc_x": -956.846,
  "acc_y": 141.215,
  "acc_z": -218.197,
  "angle": 0,
  "dev": "B",
  "gyr_x": 42.35,
  "gyr_y": 7.91,
  "gyr_z": -23.73,
  "sample": 0,
  "time": 12.204
}, {
  "acc_x": -955.26,
  "acc_y": 42.517,
  "acc_z": -278.343,
  "angle": 1.0410112143377735e+161,
  "dev": "B",
  "gyr_x": 38.22,
  "gyr_y": 13.51,
  "gyr_z": -25.48,
  "sample": 1.0410111685459873e+161,
  "time": 12.224
}, {
  "acc_x": -963.068,
  "acc_y": -46.177,
  "acc_z": -292.556,
  "angle": 0,
  "dev": "B",
  "gyr_x": 33.95,
  "gyr_y": 16.45,
  "gyr_z": -28.07,
  "sample": -1.2013534039961084e+238,
  "time": 12.243000000000002
}, {
  "acc_x": -989.847,
  "acc_y": 42.029,
  "acc_z": -204.777,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.42,
  "gyr_y": 13.23,
  "gyr_z": -29.75,
  "sample": 0,
  "time": 12.262
}, {
  "acc_x": -971.364,
  "acc_y": 98.576,
  "acc_z": -184.464,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.66,
  "gyr_y": 10.22,
  "gyr_z": -32.2,
  "sample": 0,
  "time": 12.282
}, {
  "acc_x": -960.14,
  "acc_y": 88.938,
  "acc_z": -219.417,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.45,
  "gyr_y": 10.92,
  "gyr_z": -36.68,
  "sample": 0,
  "time": 12.301000000000002
}, {
  "acc_x": -843.935,
  "acc_y": 378.017,
  "acc_z": -369.172,
  "angle": -1.2013534570192516e+238,
  "dev": "A",
  "gyr_x": 52.71,
  "gyr_y": 7.56,
  "gyr_z": -32.48,
  "sample": -1.2013534039961078e+238,
  "time": 12.254999999999999
}, {
  "acc_x": -834.175,
  "acc_y": 385.581,
  "acc_z": -362.462,
  "angle": 8095540.34227,
  "dev": "A",
  "gyr_x": 50.33,
  "gyr_y": 4.69,
  "gyr_z": -31.92,
  "sample": 8095540,
  "time": 12.274000000000001
}, {
  "acc_x": -833.87,
  "acc_y": 383.141,
  "acc_z": -371.795,
  "angle": 8095540.34258,
  "dev": "A",
  "gyr_x": 48.09,
  "gyr_y": 0.21,
  "gyr_z": -30.24,
  "sample": 0,
  "time": 12.294
}, {
  "acc_x": -834.053,
  "acc_y": 381.555,
  "acc_z": -373.137,
  "angle": 0,
  "dev": "A",
  "gyr_x": 46.48,
  "gyr_y": -2.94,
  "gyr_z": -28.7,
  "sample": -1.2504812865088719e+238,
  "time": 12.313000000000002
}, {
  "acc_x": -966.423,
  "acc_y": 32.635,
  "acc_z": -264.496,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.82,
  "gyr_y": 11.69,
  "gyr_z": -41.58,
  "sample": 0,
  "time": 12.32
}, {
  "acc_x": -975.39,
  "acc_y": 57.462,
  "acc_z": -267.302,
  "angle": -7794368.34142,
  "dev": "B",
  "gyr_x": 24.5,
  "gyr_y": 10.85,
  "gyr_z": -44.87,
  "sample": 0,
  "time": 12.339000000000002
}, {
  "acc_x": -956.175,
  "acc_y": 10.248,
  "acc_z": -210.511,
  "angle": 8095540.34153,
  "dev": "B",
  "gyr_x": 27.65,
  "gyr_y": 10.78,
  "gyr_z": -48.58,
  "sample": 8095540,
  "time": 12.359000000000002
}, {
  "acc_x": -834.297,
  "acc_y": 386.496,
  "acc_z": -384.971,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.42,
  "gyr_y": -4.13,
  "gyr_z": -26.11,
  "sample": 0,
  "time": 12.332
}, {
  "acc_x": -806.42,
  "acc_y": 354.044,
  "acc_z": -399.123,
  "angle": 0,
  "dev": "A",
  "gyr_x": 39.55,
  "gyr_y": -5.32,
  "gyr_z": -24.78,
  "sample": -1.2013534039961086e+238,
  "time": 12.353000000000002
}, {
  "acc_x": -965.203,
  "acc_y": -19.886,
  "acc_z": -274.988,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.88,
  "gyr_y": 11.83,
  "gyr_z": -53.83,
  "sample": 0,
  "time": 12.379000000000001
}, {
  "acc_x": -965.325,
  "acc_y": 19.398,
  "acc_z": -294.203,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.78,
  "gyr_y": 11.62,
  "gyr_z": -58.66,
  "sample": 0,
  "time": 12.398
}, {
  "acc_x": -803.797,
  "acc_y": 314.089,
  "acc_z": -381.921,
  "angle": 8095540.34235,
  "dev": "A",
  "gyr_x": 40.95,
  "gyr_y": -6.37,
  "gyr_z": -24.22,
  "sample": 8095540,
  "time": 12.372
}, {
  "acc_x": -815.692,
  "acc_y": 341.844,
  "acc_z": -409.981,
  "angle": 0,
  "dev": "A",
  "gyr_x": 46.62,
  "gyr_y": -8.47,
  "gyr_z": -23.1,
  "sample": 0,
  "time": 12.392
}, {
  "acc_x": -802.516,
  "acc_y": 357.155,
  "acc_z": -436.211,
  "angle": 0,
  "dev": "A",
  "gyr_x": 47.88,
  "gyr_y": -10.5,
  "gyr_z": -21.28,
  "sample": 0,
  "time": 12.411000000000001
}, {
  "acc_x": -969.778,
  "acc_y": -1.952,
  "acc_z": -261.385,
  "angle": 0,
  "dev": "B",
  "gyr_x": 36.61,
  "gyr_y": 12.39,
  "gyr_z": -62.86,
  "sample": 0,
  "time": 12.417000000000002
}, {
  "acc_x": -845.216,
  "acc_y": 281.881,
  "acc_z": -445.544,
  "angle": 8024164.34235,
  "dev": "A",
  "gyr_x": 42.63,
  "gyr_y": -12.53,
  "gyr_z": -20.3,
  "sample": 8024164,
  "time": 12.43
}, {
  "acc_x": -972.767,
  "acc_y": -111.935,
  "acc_z": -295.057,
  "angle": -1.2013534570193279e+238,
  "dev": "B",
  "gyr_x": 33.67,
  "gyr_y": 11.48,
  "gyr_z": -67.48,
  "sample": -1.2013534039961099e+238,
  "time": 12.437000000000001
}, {
  "acc_x": -1012.966,
  "acc_y": -88.694,
  "acc_z": -290.116,
  "angle": -1.2013534570199664e+238,
  "dev": "B",
  "gyr_x": 34.72,
  "gyr_y": 12.46,
  "gyr_z": -70.35,
  "sample": -1.20135340399611e+238,
  "time": 12.456
}, {
  "acc_x": -893.711,
  "acc_y": 272.853,
  "acc_z": -403.027,
  "angle": -9.033154334313813e+83,
  "dev": "A",
  "gyr_x": 34.86,
  "gyr_y": -13.37,
  "gyr_z": -20.23,
  "sample": -9.033153938848237e+83,
  "time": 12.45
}, {
  "acc_x": -925.858,
  "acc_y": 289.384,
  "acc_z": -392.352,
  "angle": -8082756.34244,
  "dev": "A",
  "gyr_x": 31.64,
  "gyr_y": -12.95,
  "gyr_z": -18.97,
  "sample": -8082756,
  "time": 12.469000000000001
}, {
  "acc_x": -1042.307,
  "acc_y": -139.141,
  "acc_z": -204.96,
  "angle": -8082756.34257,
  "dev": "B",
  "gyr_x": 36.82,
  "gyr_y": 11.62,
  "gyr_z": -72.8,
  "sample": -8082756,
  "time": 12.475000000000001
}, {
  "acc_x": -987.041,
  "acc_y": 423.218,
  "acc_z": -369.843,
  "angle": 0,
  "dev": "A",
  "gyr_x": 33.18,
  "gyr_y": -16.66,
  "gyr_z": -18.48,
  "sample": 0,
  "time": 12.489
}, {
  "acc_x": -1108.492,
  "acc_y": -186.172,
  "acc_z": -190.076,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.63,
  "gyr_y": 11.06,
  "gyr_z": -76.86,
  "sample": 0,
  "time": 12.494
}, {
  "acc_x": -1221.281,
  "acc_y": -51.606,
  "acc_z": -223.565,
  "angle": -1.2504813396591152e+238,
  "dev": "B",
  "gyr_x": 37.24,
  "gyr_y": 10.43,
  "gyr_z": -81.9,
  "sample": -8034864,
  "time": 12.515
}, {
  "acc_x": -1028.704,
  "acc_y": 590.175,
  "acc_z": -317.017,
  "angle": 0,
  "dev": "A",
  "gyr_x": 36.75,
  "gyr_y": -24.08,
  "gyr_z": -17.36,
  "sample": 0,
  "time": 12.509
}, {
  "acc_x": -1014.735,
  "acc_y": 673.867,
  "acc_z": -275.293,
  "angle": 0,
  "dev": "A",
  "gyr_x": 29.89,
  "gyr_y": -28.98,
  "gyr_z": -14.28,
  "sample": 0,
  "time": 12.528000000000002
}, {
  "acc_x": -1281.915,
  "acc_y": 71.614,
  "acc_z": -172.081,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.35,
  "gyr_y": 8.82,
  "gyr_z": -90.02,
  "sample": 0,
  "time": 12.533999999999999
}, {
  "acc_x": -1350.235,
  "acc_y": 186.294,
  "acc_z": -205.326,
  "angle": 1.244022243390998e+238,
  "dev": "B",
  "gyr_x": 35.84,
  "gyr_y": 8.89,
  "gyr_z": -100.24,
  "sample": 0,
  "time": 12.553
}, {
  "acc_x": -1462.231,
  "acc_y": 238.815,
  "acc_z": -142.069,
  "angle": 0,
  "dev": "B",
  "gyr_x": 36.19,
  "gyr_y": 8.47,
  "gyr_z": -112.07,
  "sample": 0,
  "time": 12.572
}, {
  "acc_x": -1020.53,
  "acc_y": 749.751,
  "acc_z": -140.3,
  "angle": -7738768.34153,
  "dev": "A",
  "gyr_x": 8.12,
  "gyr_y": -28.77,
  "gyr_z": -8.05,
  "sample": -7738768,
  "time": 12.547
}, {
  "acc_x": -1165.466,
  "acc_y": 838.872,
  "acc_z": -17.995,
  "angle": -8033808.34237,
  "dev": "A",
  "gyr_x": 4.27,
  "gyr_y": -41.79,
  "gyr_z": 3.85,
  "sample": -8033808,
  "time": 12.567
}, {
  "acc_x": -1161.074,
  "acc_y": 751.276,
  "acc_z": 106.445,
  "angle": 0,
  "dev": "A",
  "gyr_x": -3.92,
  "gyr_y": -66.08,
  "gyr_z": 20.65,
  "sample": 0,
  "time": 12.586000000000002
}, {
  "acc_x": -1163.209,
  "acc_y": 439.688,
  "acc_z": 18.117,
  "angle": -7738768.34154,
  "dev": "A",
  "gyr_x": -13.79,
  "gyr_y": -92.54,
  "gyr_z": 36.96,
  "sample": -7738768,
  "time": 12.605
}, {
  "acc_x": -1099.22,
  "acc_y": 366.305,
  "acc_z": -76.677,
  "angle": 0,
  "dev": "A",
  "gyr_x": -10.36,
  "gyr_y": -108.78,
  "gyr_z": 57.12,
  "sample": 0,
  "time": 12.626000000000001
}, {
  "acc_x": -1104.527,
  "acc_y": 334.158,
  "acc_z": -380.152,
  "angle": 1.2547954769490354e+238,
  "dev": "A",
  "gyr_x": 2.66,
  "gyr_y": -112.42,
  "gyr_z": 78.61,
  "sample": 1.2547954237837596e+238,
  "time": 12.645
}, {
  "acc_x": -1606.008,
  "acc_y": 172.691,
  "acc_z": -76.311,
  "angle": 0,
  "dev": "B",
  "gyr_x": 38.01,
  "gyr_y": 7.98,
  "gyr_z": -124.74,
  "sample": 0,
  "time": 12.592000000000002
}, {
  "acc_x": -1284.355,
  "acc_y": 102.724,
  "acc_z": -532.042,
  "angle": 1.2547954769691345e+238,
  "dev": "A",
  "gyr_x": 11.41,
  "gyr_y": -102.34,
  "gyr_z": 90.58,
  "sample": 1.2547954237837597e+238,
  "time": 12.664000000000001
}, {
  "acc_x": -1597.346,
  "acc_y": 586.759,
  "acc_z": 22.631,
  "angle": -8033808.34245,
  "dev": "B",
  "gyr_x": 62.86,
  "gyr_y": 9.59,
  "gyr_z": -132.23,
  "sample": -8033808,
  "time": 12.611
}, {
  "acc_x": -1343.281,
  "acc_y": 328.546,
  "acc_z": -245.281,
  "angle": 0,
  "dev": "B",
  "gyr_x": 78.26,
  "gyr_y": 19.95,
  "gyr_z": -135.45,
  "sample": 0,
  "time": 12.629999999999999
}, {
  "acc_x": -1250.012,
  "acc_y": -409.859,
  "acc_z": -429.379,
  "angle": 0,
  "dev": "B",
  "gyr_x": 55.79,
  "gyr_y": 35.21,
  "gyr_z": -134.61,
  "sample": 0,
  "time": 12.650000000000002
}, {
  "acc_x": -1019.493,
  "acc_y": -582.428,
  "acc_z": -416.02,
  "angle": -9.349734538942298e+83,
  "dev": "B",
  "gyr_x": 35.14,
  "gyr_y": 39.97,
  "gyr_z": -131.11,
  "sample": -8034828,
  "time": 12.670000000000002
}, {
  "acc_x": -798.856,
  "acc_y": -453.108,
  "acc_z": -269.864,
  "angle": -7738768.34155,
  "dev": "B",
  "gyr_x": 41.3,
  "gyr_y": 33.88,
  "gyr_z": -107.8,
  "sample": -7738768,
  "time": 12.689
}, {
  "acc_x": -1243.363,
  "acc_y": 24.034,
  "acc_z": -464.637,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.07,
  "gyr_y": -89.04,
  "gyr_z": 88.27,
  "sample": 0,
  "time": 12.684000000000001
}, {
  "acc_x": -583.831,
  "acc_y": -570.777,
  "acc_z": -291.275,
  "angle": -8033808.34227,
  "dev": "B",
  "gyr_x": 49.56,
  "gyr_y": 21.77,
  "gyr_z": -69.65,
  "sample": -8033808,
  "time": 12.708000000000002
}, {
  "acc_x": -1193.77,
  "acc_y": 138.836,
  "acc_z": -376.675,
  "angle": 0,
  "dev": "A",
  "gyr_x": -21.56,
  "gyr_y": -80.43,
  "gyr_z": 79.45,
  "sample": 0,
  "time": 12.703
}, {
  "acc_x": -395.585,
  "acc_y": -1328.031,
  "acc_z": -440.054,
  "angle": 1.2440278324754845e+238,
  "dev": "B",
  "gyr_x": 36.19,
  "gyr_y": 12.88,
  "gyr_z": -37.52,
  "sample": 1.2440277793028e+238,
  "time": 12.727
}, {
  "acc_x": -1182.485,
  "acc_y": 160.979,
  "acc_z": -347.151,
  "angle": 0,
  "dev": "A",
  "gyr_x": -42.21,
  "gyr_y": -76.58,
  "gyr_z": 70.63,
  "sample": 0,
  "time": 12.722000000000001
}, {
  "acc_x": -1107.15,
  "acc_y": 216.245,
  "acc_z": -424.743,
  "angle": -7801016.3415,
  "dev": "A",
  "gyr_x": -63.91,
  "gyr_y": -69.79,
  "gyr_z": 58.52,
  "sample": -7801016,
  "time": 12.742
}, {
  "acc_x": -1089.277,
  "acc_y": 221.369,
  "acc_z": -496.113,
  "angle": 0,
  "dev": "A",
  "gyr_x": -83.09,
  "gyr_y": -52.92,
  "gyr_z": 50.96,
  "sample": 0,
  "time": 12.762
}, {
  "acc_x": -1030.107,
  "acc_y": 39.162,
  "acc_z": -447.984,
  "angle": -8034828.34251,
  "dev": "A",
  "gyr_x": -96.04,
  "gyr_y": -43.75,
  "gyr_z": 46.97,
  "sample": -8034828,
  "time": 12.781000000000002
}, {
  "acc_x": -938.485,
  "acc_y": -96.319,
  "acc_z": -331.352,
  "angle": 0,
  "dev": "A",
  "gyr_x": -94.64,
  "gyr_y": -41.02,
  "gyr_z": 44.1,
  "sample": -7738804,
  "time": 12.801000000000002
}, {
  "acc_x": -502.518,
  "acc_y": -656.238,
  "acc_z": -660.569,
  "angle": 1.2440278324895779e+238,
  "dev": "B",
  "gyr_x": 32.48,
  "gyr_y": 15.33,
  "gyr_z": -13.51,
  "sample": 8012864,
  "time": 12.747
}, {
  "acc_x": -417.24,
  "acc_y": 23.546,
  "acc_z": 83.021,
  "angle": 0,
  "dev": "B",
  "gyr_x": 90.3,
  "gyr_y": -0.49,
  "gyr_z": 26.53,
  "sample": 0,
  "time": 12.766000000000002
}, {
  "acc_x": -297.924,
  "acc_y": -48.068,
  "acc_z": 301.035,
  "angle": 0,
  "dev": "B",
  "gyr_x": 80.43,
  "gyr_y": -15.96,
  "gyr_z": 69.37,
  "sample": 1.2053974031229373e+238,
  "time": 12.785
}, {
  "acc_x": -358.375,
  "acc_y": -471.896,
  "acc_z": 11.529,
  "angle": 0,
  "dev": "B",
  "gyr_x": -21,
  "gyr_y": -8.33,
  "gyr_z": 102.48,
  "sample": 0,
  "time": 12.805
}, {
  "acc_x": -503.86,
  "acc_y": -688.141,
  "acc_z": -252.113,
  "angle": 0,
  "dev": "B",
  "gyr_x": -86.8,
  "gyr_y": -4.34,
  "gyr_z": 133,
  "sample": 0,
  "time": 12.825
}, {
  "acc_x": -857.965,
  "acc_y": -115.717,
  "acc_z": -305.61,
  "angle": -7794368.3415,
  "dev": "A",
  "gyr_x": -88.62,
  "gyr_y": -35.77,
  "gyr_z": 41.65,
  "sample": -7794368,
  "time": 12.82
}, {
  "acc_x": -629.032,
  "acc_y": -444.934,
  "acc_z": -206.607,
  "angle": -7738768.34156,
  "dev": "B",
  "gyr_x": -102.83,
  "gyr_y": -10.43,
  "gyr_z": 149.8,
  "sample": -7738768,
  "time": 12.844000000000001
}, {
  "acc_x": -830.149,
  "acc_y": -77.226,
  "acc_z": -376.797,
  "angle": -1.076358486639192e+161,
  "dev": "A",
  "gyr_x": -67.2,
  "gyr_y": -23.52,
  "gyr_z": 42.91,
  "sample": -1.0763584407478569e+161,
  "time": 12.84
}, {
  "acc_x": -789.218,
  "acc_y": -82.228,
  "acc_z": -458.293,
  "angle": 0,
  "dev": "A",
  "gyr_x": -27.51,
  "gyr_y": -12.74,
  "gyr_z": 48.93,
  "sample": 0,
  "time": 12.859000000000002
}, {
  "acc_x": -591.334,
  "acc_y": -342.271,
  "acc_z": -88.267,
  "angle": 1.2440278324911557e+238,
  "dev": "B",
  "gyr_x": -96.74,
  "gyr_y": -29.54,
  "gyr_z": 163.8,
  "sample": 0,
  "time": 12.863
}, {
  "acc_x": -647.454,
  "acc_y": -438.712,
  "acc_z": -271.023,
  "angle": 0,
  "dev": "B",
  "gyr_x": -120.05,
  "gyr_y": -42.63,
  "gyr_z": 181.65,
  "sample": 0,
  "time": 12.882000000000001
}, {
  "acc_x": -723.399,
  "acc_y": -70.638,
  "acc_z": -448.533,
  "angle": -7738768.34155,
  "dev": "A",
  "gyr_x": 10.5,
  "gyr_y": -8.4,
  "gyr_z": 55.16,
  "sample": -7738768,
  "time": 12.878
}, {
  "acc_x": -805.139,
  "acc_y": -677.283,
  "acc_z": -464.454,
  "angle": 0,
  "dev": "B",
  "gyr_x": -140.07,
  "gyr_y": -53.76,
  "gyr_z": 203.56,
  "sample": 0,
  "time": 12.902000000000001
}, {
  "acc_x": -799.466,
  "acc_y": -719.068,
  "acc_z": -426.573,
  "angle": -1.044804015044688e+161,
  "dev": "B",
  "gyr_x": -116.34,
  "gyr_y": -71.05,
  "gyr_z": 216.79,
  "sample": -1.044803969253214e+161,
  "time": 12.921
}, {
  "acc_x": -796.843,
  "acc_y": -697.962,
  "acc_z": -313.174,
  "angle": -7738768.34156,
  "dev": "B",
  "gyr_x": -63,
  "gyr_y": -91.98,
  "gyr_z": 230.37,
  "sample": -7738768,
  "time": 12.940999999999999
}, {
  "acc_x": -740.54,
  "acc_y": -546.865,
  "acc_z": -326.655,
  "angle": 1.0777941947123303e+161,
  "dev": "B",
  "gyr_x": -20.51,
  "gyr_y": -105.21,
  "gyr_z": 249.06,
  "sample": 1.0777941488209966e+161,
  "time": 12.96
}, {
  "acc_x": -822.219,
  "acc_y": -365.695,
  "acc_z": -86.01,
  "angle": 0,
  "dev": "B",
  "gyr_x": 11.76,
  "gyr_y": -103.46,
  "gyr_z": 270.41,
  "sample": 0,
  "time": 12.98
}, {
  "acc_x": -1039.745,
  "acc_y": -150.304,
  "acc_z": 148.047,
  "angle": 0,
  "dev": "B",
  "gyr_x": 6.79,
  "gyr_y": -85.61,
  "gyr_z": 279.09,
  "sample": 0,
  "time": 12.999000000000002
}, {
  "acc_x": -655.933,
  "acc_y": 51.301,
  "acc_z": -350.018,
  "angle": -7794368.34154,
  "dev": "A",
  "gyr_x": 31.15,
  "gyr_y": -2.17,
  "gyr_z": 53.83,
  "sample": -7794368,
  "time": 12.898
}, {
  "acc_x": -683.566,
  "acc_y": 141.459,
  "acc_z": -271.633,
  "angle": -7794368.34153,
  "dev": "A",
  "gyr_x": 33.74,
  "gyr_y": 11.9,
  "gyr_z": 46.06,
  "sample": 12565871717255030,
  "time": 12.918
}, {
  "acc_x": -683.261,
  "acc_y": 98.393,
  "acc_z": -240.34,
  "angle": 0,
  "dev": "A",
  "gyr_x": 26.74,
  "gyr_y": 28.49,
  "gyr_z": 33.67,
  "sample": 0,
  "time": 12.937000000000001
}, {
  "acc_x": -594.933,
  "acc_y": 30.805,
  "acc_z": -238.388,
  "angle": 1.2477085423550479e+238,
  "dev": "A",
  "gyr_x": -0.14,
  "gyr_y": 32.9,
  "gyr_z": 12.18,
  "sample": 1.2477084891960276e+238,
  "time": 12.957
}, {
  "acc_x": -644.343,
  "acc_y": -72.834,
  "acc_z": -163.48,
  "angle": 0,
  "dev": "A",
  "gyr_x": -35.28,
  "gyr_y": 28,
  "gyr_z": -13.86,
  "sample": 0,
  "time": 12.975999999999999
}, {
  "acc_x": -760.792,
  "acc_y": 60.573,
  "acc_z": 111.813,
  "angle": -1.0459581591313242e+161,
  "dev": "A",
  "gyr_x": -59.92,
  "gyr_y": 26.81,
  "gyr_z": -39.9,
  "sample": -1.0459581133598233e+161,
  "time": 12.995000000000001
}, {
  "acc_x": -1324.005,
  "acc_y": -238.632,
  "acc_z": -182.695,
  "angle": 0,
  "dev": "B",
  "gyr_x": -49.63,
  "gyr_y": -60.62,
  "gyr_z": 264.04,
  "sample": 0,
  "time": 13.018
}, {
  "acc_x": -828.258,
  "acc_y": 382.226,
  "acc_z": 184.342,
  "angle": -7738768.34133,
  "dev": "A",
  "gyr_x": -97.65,
  "gyr_y": 29.82,
  "gyr_z": -63.28,
  "sample": -7738768,
  "time": 13.015
}, {
  "acc_x": -886.879,
  "acc_y": 647.759,
  "acc_z": 37.942,
  "angle": -7794368.34153,
  "dev": "A",
  "gyr_x": -133.63,
  "gyr_y": 37.66,
  "gyr_z": -74.06,
  "sample": -7794368,
  "time": 13.033999999999999
}, {
  "acc_x": -1375.733,
  "acc_y": -307.501,
  "acc_z": -272.06,
  "angle": 0,
  "dev": "B",
  "gyr_x": -67.55,
  "gyr_y": -60.2,
  "gyr_z": 239.33,
  "sample": 0,
  "time": 13.036999999999999
}, {
  "acc_x": -1165.527,
  "acc_y": 118.157,
  "acc_z": 9.028,
  "angle": 0,
  "dev": "B",
  "gyr_x": -35.77,
  "gyr_y": -64.96,
  "gyr_z": 207.34,
  "sample": 0,
  "time": 13.057000000000002
}, {
  "acc_x": -946.293,
  "acc_y": 928.237,
  "acc_z": 206.912,
  "angle": -8033808.34239,
  "dev": "A",
  "gyr_x": -94.5,
  "gyr_y": 24.43,
  "gyr_z": -56,
  "sample": -8033808,
  "time": 13.054000000000002
}, {
  "acc_x": -966.911,
  "acc_y": 37.149,
  "acc_z": -61.915,
  "angle": -1.083745116183986e+161,
  "dev": "B",
  "gyr_x": -44.59,
  "gyr_y": -53.41,
  "gyr_z": 159.74,
  "sample": -1.083745070292623e+161,
  "time": 13.077000000000002
}, {
  "acc_x": -1002.84,
  "acc_y": 1053.714,
  "acc_z": 325.313,
  "angle": 8012864.34258,
  "dev": "A",
  "gyr_x": -20.16,
  "gyr_y": 2.52,
  "gyr_z": -25.55,
  "sample": 8012864,
  "time": 13.074000000000002
}, {
  "acc_x": -1056.642,
  "acc_y": 823.622,
  "acc_z": 158.051,
  "angle": -7794368.34142,
  "dev": "A",
  "gyr_x": -40.46,
  "gyr_y": 12.74,
  "gyr_z": -6.93,
  "sample": -7794368,
  "time": 13.093
}, {
  "acc_x": -926.834,
  "acc_y": -160.674,
  "acc_z": -374.723,
  "angle": -8033808.34257,
  "dev": "B",
  "gyr_x": -77.35,
  "gyr_y": -28.14,
  "gyr_z": 97.58,
  "sample": -8033808,
  "time": 13.096
}, {
  "acc_x": -843.63,
  "acc_y": -274.378,
  "acc_z": -481.9,
  "angle": 8012864.34249,
  "dev": "B",
  "gyr_x": -52.36,
  "gyr_y": -11.62,
  "gyr_z": 38.5,
  "sample": -8033808,
  "time": 13.115000000000002
}, {
  "acc_x": -968.192,
  "acc_y": 588.04,
  "acc_z": 121.207,
  "angle": 0,
  "dev": "A",
  "gyr_x": -56.63,
  "gyr_y": 9.17,
  "gyr_z": 4.62,
  "sample": 0,
  "time": 13.112000000000002
}, {
  "acc_x": -954.528,
  "acc_y": 514.108,
  "acc_z": 29.524,
  "angle": -7738768.34153,
  "dev": "A",
  "gyr_x": -27.09,
  "gyr_y": 22.47,
  "gyr_z": 17.5,
  "sample": 0,
  "time": 13.132000000000001
}, {
  "acc_x": -939.644,
  "acc_y": -51.484,
  "acc_z": -346.724,
  "angle": 0,
  "dev": "B",
  "gyr_x": 0.49,
  "gyr_y": 3.15,
  "gyr_z": -10.29,
  "sample": 0,
  "time": 13.135000000000002
}, {
  "acc_x": -1178.276,
  "acc_y": 398.269,
  "acc_z": -182.573,
  "angle": 8012864.34241,
  "dev": "A",
  "gyr_x": -13.51,
  "gyr_y": 43.33,
  "gyr_z": 32.41,
  "sample": 8012864,
  "time": 13.151
}, {
  "acc_x": -1061.949,
  "acc_y": 153.537,
  "acc_z": -553.392,
  "angle": 0,
  "dev": "B",
  "gyr_x": 11.2,
  "gyr_y": 23.17,
  "gyr_z": -60.34,
  "sample": 0,
  "time": 13.154
}, {
  "acc_x": -1697.63,
  "acc_y": 1170.834,
  "acc_z": 825.208,
  "angle": 9.278239871684454e+83,
  "dev": "B",
  "gyr_x": -8.47,
  "gyr_y": 54.04,
  "gyr_z": -100.24,
  "sample": -1.2515506609708557e+238,
  "time": 13.173000000000002
}, {
  "acc_x": -1499.807,
  "acc_y": 360.571,
  "acc_z": 116.083,
  "angle": 0,
  "dev": "A",
  "gyr_x": -2.94,
  "gyr_y": 58.52,
  "gyr_z": 33.39,
  "sample": 0,
  "time": 13.170000000000002
}, {
  "acc_x": -748.226,
  "acc_y": 1121.119,
  "acc_z": 157.258,
  "angle": 8012864.34244,
  "dev": "A",
  "gyr_x": -16.94,
  "gyr_y": 41.23,
  "gyr_z": 22.82,
  "sample": 8012864,
  "time": 13.190999999999999
}, {
  "acc_x": -1274.961,
  "acc_y": 399.611,
  "acc_z": 72.651,
  "angle": 0,
  "dev": "B",
  "gyr_x": 54.25,
  "gyr_y": 28.98,
  "gyr_z": -76.79,
  "sample": 0,
  "time": 13.192
}, {
  "acc_x": -1146.068,
  "acc_y": -199.531,
  "acc_z": -67.161,
  "angle": -1.2457002048156808e+238,
  "dev": "B",
  "gyr_x": -118.3,
  "gyr_y": 47.39,
  "gyr_z": -114.8,
  "sample": 8012864,
  "time": 13.212
}, {
  "acc_x": -1023.702,
  "acc_y": 350.506,
  "acc_z": -369.538,
  "angle": 0,
  "dev": "A",
  "gyr_x": -51.45,
  "gyr_y": 58.31,
  "gyr_z": 7.56,
  "sample": 0,
  "time": 13.21
}, {
  "acc_x": -706.563,
  "acc_y": -435.052,
  "acc_z": -538.447,
  "angle": 0,
  "dev": "B",
  "gyr_x": -148.54,
  "gyr_y": 53.97,
  "gyr_z": -126.35,
  "sample": 0,
  "time": 13.232
}, {
  "acc_x": -560.224,
  "acc_y": -745.359,
  "acc_z": -547.048,
  "angle": 1.2440278324526717e+238,
  "dev": "A",
  "gyr_x": 6.23,
  "gyr_y": 63.07,
  "gyr_z": 5.25,
  "sample": 1.2440277793028031e+238,
  "time": 13.229
}, {
  "acc_x": -598.288,
  "acc_y": 433.466,
  "acc_z": -712.541,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.54,
  "gyr_y": 54.32,
  "gyr_z": -19.46,
  "sample": 0,
  "time": 13.249000000000002
}, {
  "acc_x": -790.926,
  "acc_y": -479.338,
  "acc_z": -608.963,
  "angle": 0,
  "dev": "B",
  "gyr_x": -98.77,
  "gyr_y": 43.12,
  "gyr_z": -113.4,
  "sample": 0,
  "time": 13.251000000000001
}, {
  "acc_x": -945.683,
  "acc_y": -560.041,
  "acc_z": -495.686,
  "angle": 0,
  "dev": "B",
  "gyr_x": -61.53,
  "gyr_y": 44.52,
  "gyr_z": -93.73,
  "sample": 0,
  "time": 13.27
}, {
  "acc_x": -942.633,
  "acc_y": 7.076,
  "acc_z": -648.552,
  "angle": 1.2440278324911557e+238,
  "dev": "A",
  "gyr_x": -15.54,
  "gyr_y": 62.02,
  "gyr_z": -35.84,
  "sample": 1.2440277793028034e+238,
  "time": 13.268
}, {
  "acc_x": -974.414,
  "acc_y": -375.15,
  "acc_z": -382.775,
  "angle": 0,
  "dev": "B",
  "gyr_x": -43.96,
  "gyr_y": 48.23,
  "gyr_z": -81.69,
  "sample": 0,
  "time": 13.29
}, {
  "acc_x": -968.802,
  "acc_y": -22.997,
  "acc_z": -390.339,
  "angle": 0,
  "dev": "A",
  "gyr_x": 9.66,
  "gyr_y": 61.95,
  "gyr_z": -27.51,
  "sample": 0,
  "time": 13.288
}, {
  "acc_x": -949.526,
  "acc_y": 275.476,
  "acc_z": -397.598,
  "angle": 0,
  "dev": "A",
  "gyr_x": 12.39,
  "gyr_y": 55.58,
  "gyr_z": -31.5,
  "sample": 0,
  "time": 13.307000000000002
}, {
  "acc_x": -971.486,
  "acc_y": -488.976,
  "acc_z": -137.86,
  "angle": 1.2440278324914425e+238,
  "dev": "B",
  "gyr_x": 21.7,
  "gyr_y": 41.02,
  "gyr_z": -64.89,
  "sample": -1.2101089850294554e+238,
  "time": 13.309000000000001
}, {
  "acc_x": -1057.801,
  "acc_y": -117.486,
  "acc_z": -82.106,
  "angle": 0,
  "dev": "B",
  "gyr_x": 56,
  "gyr_y": 32.13,
  "gyr_z": -54.6,
  "sample": 0,
  "time": 13.328
}, {
  "acc_x": -846.131,
  "acc_y": 142.496,
  "acc_z": -476.41,
  "angle": 1.2440278324534005e+238,
  "dev": "A",
  "gyr_x": 19.53,
  "gyr_y": 47.67,
  "gyr_z": -32.62,
  "sample": 1.2440277793028038e+238,
  "time": 13.326
}, {
  "acc_x": -1002.413,
  "acc_y": 154.635,
  "acc_z": -162.26,
  "angle": 0,
  "dev": "B",
  "gyr_x": 50.54,
  "gyr_y": 29.54,
  "gyr_z": -51.52,
  "sample": 0,
  "time": 13.347000000000001
}, {
  "acc_x": -794.586,
  "acc_y": 305.061,
  "acc_z": -487.878,
  "angle": 0,
  "dev": "A",
  "gyr_x": 29.54,
  "gyr_y": 42.28,
  "gyr_z": -31.15,
  "sample": 0,
  "time": 13.347000000000001
}, {
  "acc_x": -765.245,
  "acc_y": 366.61,
  "acc_z": -528.87,
  "angle": 0,
  "dev": "A",
  "gyr_x": 40.88,
  "gyr_y": 42.14,
  "gyr_z": -29.47,
  "sample": 0,
  "time": 13.366
}, {
  "acc_x": -915.244,
  "acc_y": -65.453,
  "acc_z": -388.57,
  "angle": 0,
  "dev": "B",
  "gyr_x": 16.1,
  "gyr_y": 28.98,
  "gyr_z": -51.52,
  "sample": 0,
  "time": 13.368000000000002
}, {
  "acc_x": -1011.441,
  "acc_y": -266.265,
  "acc_z": -423.34,
  "angle": 1.2440278324658814e+238,
  "dev": "B",
  "gyr_x": 6.79,
  "gyr_y": 28.42,
  "gyr_z": -45.29,
  "sample": 1.244027779302805e+238,
  "time": 13.387
}, {
  "acc_x": -1020.103,
  "acc_y": -163.236,
  "acc_z": -326.472,
  "angle": 0,
  "dev": "B",
  "gyr_x": 24.99,
  "gyr_y": 21.42,
  "gyr_z": -40.67,
  "sample": 0,
  "time": 13.406000000000002
}, {
  "acc_x": -804.102,
  "acc_y": 324.947,
  "acc_z": -530.09,
  "angle": 1.2440278324887335e+238,
  "dev": "A",
  "gyr_x": 44.1,
  "gyr_y": 42.49,
  "gyr_z": -28.63,
  "sample": 1.2440277793028043e+238,
  "time": 13.385000000000002
}, {
  "acc_x": -825.94,
  "acc_y": 301.34,
  "acc_z": -495.869,
  "angle": 0,
  "dev": "A",
  "gyr_x": 46.69,
  "gyr_y": 42.42,
  "gyr_z": -28.49,
  "sample": 0,
  "time": 13.405000000000001
}, {
  "acc_x": -852.902,
  "acc_y": 275.476,
  "acc_z": -458.537,
  "angle": 0,
  "dev": "A",
  "gyr_x": 51.45,
  "gyr_y": 40.18,
  "gyr_z": -29.12,
  "sample": 0,
  "time": 13.424
}, {
  "acc_x": -858.453,
  "acc_y": 256.261,
  "acc_z": -423.645,
  "angle": 0,
  "dev": "A",
  "gyr_x": 53.9,
  "gyr_y": 36.54,
  "gyr_z": -32.2,
  "sample": 0,
  "time": 13.443000000000001
}, {
  "acc_x": -999.79,
  "acc_y": -90.402,
  "acc_z": -257.176,
  "angle": 0,
  "dev": "B",
  "gyr_x": 41.79,
  "gyr_y": 15.26,
  "gyr_z": -37.24,
  "sample": 0,
  "time": 13.425
}, {
  "acc_x": -958.005,
  "acc_y": -6.649,
  "acc_z": -132.98,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.11,
  "gyr_y": 11.27,
  "gyr_z": -34.37,
  "sample": 0,
  "time": 13.445
}, {
  "acc_x": -965.264,
  "acc_y": -76.738,
  "acc_z": -183.122,
  "angle": -8013424.34244,
  "dev": "B",
  "gyr_x": 27.23,
  "gyr_y": 9.59,
  "gyr_z": -31.78,
  "sample": -8013424,
  "time": 13.464000000000002
}, {
  "acc_x": -936.35,
  "acc_y": -103.334,
  "acc_z": -304.512,
  "angle": -7794368.34143,
  "dev": "B",
  "gyr_x": 16.94,
  "gyr_y": 11.06,
  "gyr_z": -29.61,
  "sample": -7794368,
  "time": 13.483
}, {
  "acc_x": -824.903,
  "acc_y": 282.796,
  "acc_z": -427.915,
  "angle": -1.0795393550351392e+161,
  "dev": "A",
  "gyr_x": 54.39,
  "gyr_y": 34.3,
  "gyr_z": -35.21,
  "sample": -1.0795393091011605e+161,
  "time": 13.463000000000001
}, {
  "acc_x": -809.897,
  "acc_y": 303.231,
  "acc_z": -439.688,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.92,
  "gyr_y": 31.29,
  "gyr_z": -36.61,
  "sample": 0,
  "time": 13.483
}, {
  "acc_x": -960.689,
  "acc_y": -67.405,
  "acc_z": -269.01,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.12,
  "gyr_y": 11.48,
  "gyr_z": -26.95,
  "sample": 0,
  "time": 13.503
}, {
  "acc_x": -805.261,
  "acc_y": 322.446,
  "acc_z": -452.681,
  "angle": 0,
  "dev": "A",
  "gyr_x": 51.59,
  "gyr_y": 27.23,
  "gyr_z": -35.77,
  "sample": 0,
  "time": 13.501999999999999
}, {
  "acc_x": -846.741,
  "acc_y": 302.682,
  "acc_z": -414.739,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.22,
  "gyr_y": 20.44,
  "gyr_z": -33.6,
  "sample": 0,
  "time": 13.522000000000002
}, {
  "acc_x": -970.388,
  "acc_y": -17.629,
  "acc_z": -243.146,
  "angle": 0,
  "dev": "B",
  "gyr_x": 37.66,
  "gyr_y": 9.94,
  "gyr_z": -24.57,
  "sample": 0,
  "time": 13.523
}, {
  "acc_x": -975.756,
  "acc_y": -18.422,
  "acc_z": -217.038,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.49,
  "gyr_y": 9.31,
  "gyr_z": -25.06,
  "sample": 0,
  "time": 13.542000000000002
}, {
  "acc_x": -806.481,
  "acc_y": 361.181,
  "acc_z": -423.462,
  "angle": 0,
  "dev": "A",
  "gyr_x": 56.98,
  "gyr_y": 12.18,
  "gyr_z": -30.38,
  "sample": 0,
  "time": 13.541
}, {
  "acc_x": -961.116,
  "acc_y": 7.686,
  "acc_z": -290.116,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.7,
  "gyr_y": 9.1,
  "gyr_z": -27.58,
  "sample": 0,
  "time": 13.561
}, {
  "acc_x": -822.89,
  "acc_y": 376.492,
  "acc_z": -424.377,
  "angle": -1.2013503519522312e+238,
  "dev": "A",
  "gyr_x": 61.67,
  "gyr_y": 3.5,
  "gyr_z": -28.91,
  "sample": -1.2013502989599329e+238,
  "time": 13.560000000000002
}, {
  "acc_x": -796.294,
  "acc_y": 388.265,
  "acc_z": -426.634,
  "angle": -7794368.34153,
  "dev": "A",
  "gyr_x": 63.7,
  "gyr_y": -1.19,
  "gyr_z": -30.1,
  "sample": -1.2111696653901166e+238,
  "time": 13.580000000000002
}, {
  "acc_x": -810.202,
  "acc_y": 339.709,
  "acc_z": -391.559,
  "angle": 0,
  "dev": "A",
  "gyr_x": 62.02,
  "gyr_y": -2.66,
  "gyr_z": -31.99,
  "sample": 0,
  "time": 13.599
}, {
  "acc_x": -965.813,
  "acc_y": -39.65,
  "acc_z": -272.06,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28,
  "gyr_y": 8.96,
  "gyr_z": -30.24,
  "sample": 0,
  "time": 13.580000000000002
}, {
  "acc_x": -969.656,
  "acc_y": 2.684,
  "acc_z": -259.982,
  "angle": 8081232.34235,
  "dev": "B",
  "gyr_x": 31.85,
  "gyr_y": 8.75,
  "gyr_z": -31.92,
  "sample": 8081232,
  "time": 13.600000000000001
}, {
  "acc_x": -961.665,
  "acc_y": 5.49,
  "acc_z": -237.9,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.3,
  "gyr_y": 8.61,
  "gyr_z": -33.88,
  "sample": 0,
  "time": 13.619
}, {
  "acc_x": -810.69,
  "acc_y": 313.113,
  "acc_z": -380.579,
  "angle": -1.2013503519785766e+238,
  "dev": "A",
  "gyr_x": 55.79,
  "gyr_y": -2.45,
  "gyr_z": -34.51,
  "sample": -1.2013502989599333e+238,
  "time": 13.619
}, {
  "acc_x": -809.653,
  "acc_y": 303.475,
  "acc_z": -368.989,
  "angle": 0,
  "dev": "A",
  "gyr_x": 52.99,
  "gyr_y": -2.31,
  "gyr_z": -36.19,
  "sample": 0,
  "time": 13.639
}, {
  "acc_x": -946.537,
  "acc_y": -30.866,
  "acc_z": -218.624,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.57,
  "gyr_y": 5.6,
  "gyr_z": -37.1,
  "sample": 0,
  "time": 13.638000000000002
}, {
  "acc_x": -929.64,
  "acc_y": 11.895,
  "acc_z": -234.667,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.77,
  "gyr_y": 4.9,
  "gyr_z": -40.18,
  "sample": 0,
  "time": 13.658000000000001
}, {
  "acc_x": -823.134,
  "acc_y": 312.076,
  "acc_z": -384.971,
  "angle": 8.987712886819439e+83,
  "dev": "A",
  "gyr_x": 49.77,
  "gyr_y": 0.28,
  "gyr_z": -35.63,
  "sample": 8.987712491348012e+83,
  "time": 13.658000000000001
}, {
  "acc_x": -968.802,
  "acc_y": -58.194,
  "acc_z": -255.651,
  "angle": 0,
  "dev": "B",
  "gyr_x": 27.44,
  "gyr_y": 5.53,
  "gyr_z": -43.12,
  "sample": 0,
  "time": 13.678
}, {
  "acc_x": -807.884,
  "acc_y": 303.17,
  "acc_z": -416.691,
  "angle": 8081232.34244,
  "dev": "A",
  "gyr_x": 44.8,
  "gyr_y": 1.89,
  "gyr_z": -34.58,
  "sample": 8081232,
  "time": 13.677
}, {
  "acc_x": -967.582,
  "acc_y": 1.159,
  "acc_z": -251.503,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.95,
  "gyr_y": 7,
  "gyr_z": -46.76,
  "sample": 0,
  "time": 13.697
}, {
  "acc_x": -972.706,
  "acc_y": -1.159,
  "acc_z": -264.496,
  "angle": -8034868.34263,
  "dev": "B",
  "gyr_x": 24.08,
  "gyr_y": 8.68,
  "gyr_z": -51.31,
  "sample": -8034868,
  "time": 13.716000000000001
}, {
  "acc_x": -805.688,
  "acc_y": 360.022,
  "acc_z": -420.656,
  "angle": 0,
  "dev": "A",
  "gyr_x": 43.61,
  "gyr_y": 1.19,
  "gyr_z": -34.16,
  "sample": 0,
  "time": 13.697
}, {
  "acc_x": -833.992,
  "acc_y": 361.791,
  "acc_z": -402.539,
  "angle": 0,
  "dev": "A",
  "gyr_x": 48.58,
  "gyr_y": -1.4,
  "gyr_z": -32.06,
  "sample": 0,
  "time": 13.716000000000001
}, {
  "acc_x": -992.348,
  "acc_y": 12.871,
  "acc_z": -289.933,
  "angle": 0,
  "dev": "B",
  "gyr_x": 20.58,
  "gyr_y": 8.68,
  "gyr_z": -57.33,
  "sample": 0,
  "time": 13.735
}, {
  "acc_x": -854.305,
  "acc_y": 400.953,
  "acc_z": -422.181,
  "angle": -8013424.3426,
  "dev": "A",
  "gyr_x": 49.42,
  "gyr_y": -4.2,
  "gyr_z": -29.12,
  "sample": 19.40599,
  "time": 13.735
}, {
  "acc_x": -875.289,
  "acc_y": 395.097,
  "acc_z": -418.399,
  "angle": 8.987712886819439e+83,
  "dev": "A",
  "gyr_x": 45.57,
  "gyr_y": -6.37,
  "gyr_z": -25.55,
  "sample": 8.987712491348017e+83,
  "time": 13.754999999999999
}, {
  "acc_x": -1019.737,
  "acc_y": 19.886,
  "acc_z": -291.153,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.14,
  "gyr_y": 8.61,
  "gyr_z": -63,
  "sample": 8.987712491348022e+83,
  "time": 13.754999999999999
}, {
  "acc_x": -930.555,
  "acc_y": 358.558,
  "acc_z": -390.827,
  "angle": -8013424.34245,
  "dev": "A",
  "gyr_x": 40.11,
  "gyr_y": -9.59,
  "gyr_z": -21.35,
  "sample": -8013424,
  "time": 13.775000000000002
}, {
  "acc_x": -1042.429,
  "acc_y": -25.986,
  "acc_z": -297.863,
  "angle": -8013424.3426,
  "dev": "B",
  "gyr_x": 22.4,
  "gyr_y": 7.42,
  "gyr_z": -68.95,
  "sample": -8013424,
  "time": 13.774000000000001
}, {
  "acc_x": -1095.621,
  "acc_y": -53.436,
  "acc_z": -237.168,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.32,
  "gyr_y": 7.98,
  "gyr_z": -74.27,
  "sample": 0,
  "time": 13.794
}, {
  "acc_x": -1126.304,
  "acc_y": -58.804,
  "acc_z": -208.376,
  "angle": -7794368.3415,
  "dev": "B",
  "gyr_x": 32.13,
  "gyr_y": 8.54,
  "gyr_z": -80.15,
  "sample": -7794368,
  "time": 13.813000000000002
}, {
  "acc_x": -1217.56,
  "acc_y": 40.382,
  "acc_z": -217.16,
  "angle": 0,
  "dev": "B",
  "gyr_x": 35.07,
  "gyr_y": 8.4,
  "gyr_z": -87.43,
  "sample": 0,
  "time": 13.833000000000002
}, {
  "acc_x": -936.899,
  "acc_y": 407.114,
  "acc_z": -351.604,
  "angle": 0,
  "dev": "A",
  "gyr_x": 34.51,
  "gyr_y": -13.86,
  "gyr_z": -17.36,
  "sample": 0,
  "time": 13.795000000000002
}, {
  "acc_x": -952.942,
  "acc_y": 528.931,
  "acc_z": -331.535,
  "angle": 0,
  "dev": "A",
  "gyr_x": 33.81,
  "gyr_y": -19.04,
  "gyr_z": -14.56,
  "sample": 0,
  "time": 13.814
}, {
  "acc_x": -1068.232,
  "acc_y": 608.963,
  "acc_z": -300.181,
  "angle": 0,
  "dev": "A",
  "gyr_x": 33.88,
  "gyr_y": -22.47,
  "gyr_z": -10.78,
  "sample": 0,
  "time": 13.833000000000002
}, {
  "acc_x": -1014.247,
  "acc_y": 692.228,
  "acc_z": -276.94,
  "angle": 8.987712886829861e+83,
  "dev": "A",
  "gyr_x": 15.47,
  "gyr_y": -25.69,
  "gyr_z": -7.07,
  "sample": 0,
  "time": 13.853000000000002
}, {
  "acc_x": -1073.722,
  "acc_y": 773.724,
  "acc_z": -128.1,
  "angle": 8.987712886801443e+83,
  "dev": "A",
  "gyr_x": 0.98,
  "gyr_y": -34.44,
  "gyr_z": -0.84,
  "sample": 8.987712491348023e+83,
  "time": 13.872
}, {
  "acc_x": -1117.337,
  "acc_y": 706.746,
  "acc_z": 53.619,
  "angle": 0,
  "dev": "A",
  "gyr_x": -5.18,
  "gyr_y": -51.03,
  "gyr_z": 13.37,
  "sample": 0,
  "time": 13.891000000000002
}, {
  "acc_x": -1292.712,
  "acc_y": -6.771,
  "acc_z": -150.304,
  "angle": -7794368.34153,
  "dev": "B",
  "gyr_x": 31.92,
  "gyr_y": 7,
  "gyr_z": -97.02,
  "sample": -7794368,
  "time": 13.852
}, {
  "acc_x": -1356.518,
  "acc_y": 122.976,
  "acc_z": -151.829,
  "angle": 8081232.34244,
  "dev": "B",
  "gyr_x": 35.63,
  "gyr_y": 7.14,
  "gyr_z": -106.26,
  "sample": 8081232,
  "time": 13.871000000000002
}, {
  "acc_x": -1474.37,
  "acc_y": 257.542,
  "acc_z": -141.825,
  "angle": 9.03137576781105e+83,
  "dev": "B",
  "gyr_x": 38.5,
  "gyr_y": 8.33,
  "gyr_z": -116.41,
  "sample": 9.031375372357637e+83,
  "time": 13.89
}, {
  "acc_x": -1511.824,
  "acc_y": 264.252,
  "acc_z": -37.637,
  "angle": -7794368.34153,
  "dev": "B",
  "gyr_x": 40.18,
  "gyr_y": 8.89,
  "gyr_z": -128.8,
  "sample": -7794368,
  "time": 13.91
}, {
  "acc_x": -1501.027,
  "acc_y": 460.977,
  "acc_z": 39.955,
  "angle": 1.0836700325025735e+161,
  "dev": "B",
  "gyr_x": 62.16,
  "gyr_y": 13.58,
  "gyr_z": -134.75,
  "sample": 0,
  "time": 13.93
}, {
  "acc_x": -1203.713,
  "acc_y": 496.174,
  "acc_z": 54.839,
  "angle": 8081232.34259,
  "dev": "A",
  "gyr_x": -13.58,
  "gyr_y": -72.17,
  "gyr_z": 30.87,
  "sample": 8081232,
  "time": 13.911999999999999
}, {
  "acc_x": -1120.143,
  "acc_y": 333.365,
  "acc_z": -9.821,
  "angle": 0,
  "dev": "A",
  "gyr_x": -15.68,
  "gyr_y": -96.88,
  "gyr_z": 49.07,
  "sample": 0,
  "time": 13.931000000000001
}, {
  "acc_x": -1060.119,
  "acc_y": 343.369,
  "acc_z": -228.445,
  "angle": 0,
  "dev": "A",
  "gyr_x": -11.48,
  "gyr_y": -107.45,
  "gyr_z": 70.56,
  "sample": 0,
  "time": 13.95
}, {
  "acc_x": -1133.319,
  "acc_y": 259.921,
  "acc_z": -489.403,
  "angle": 0,
  "dev": "A",
  "gyr_x": 6.86,
  "gyr_y": -107.31,
  "gyr_z": 88.97,
  "sample": -7755340,
  "time": 13.969999999999999
}, {
  "acc_x": -1350.601,
  "acc_y": 281.027,
  "acc_z": -267.18,
  "angle": 0,
  "dev": "B",
  "gyr_x": 80.57,
  "gyr_y": 24.57,
  "gyr_z": -136.29,
  "sample": 0,
  "time": 13.949000000000002
}, {
  "acc_x": -1219.39,
  "acc_y": -417.85,
  "acc_z": -449.448,
  "angle": -7790312.34147,
  "dev": "B",
  "gyr_x": 62.72,
  "gyr_y": 37.17,
  "gyr_z": -136.36,
  "sample": -7790312,
  "time": 13.968
}, {
  "acc_x": -1026.752,
  "acc_y": -556.32,
  "acc_z": -347.334,
  "angle": 1.2015844716804252e+238,
  "dev": "B",
  "gyr_x": 44.94,
  "gyr_y": 36.96,
  "gyr_z": -130.41,
  "sample": 1.2477128362466944e+238,
  "time": 13.988
}, {
  "acc_x": -1301.923,
  "acc_y": 76.494,
  "acc_z": -524.783,
  "angle": -8034868.34259,
  "dev": "A",
  "gyr_x": 6.02,
  "gyr_y": -94.08,
  "gyr_z": 95.06,
  "sample": -8034868,
  "time": 13.989
}, {
  "acc_x": -767.563,
  "acc_y": -381.311,
  "acc_z": -261.08,
  "angle": -7790312.34154,
  "dev": "B",
  "gyr_x": 39.27,
  "gyr_y": 29.68,
  "gyr_z": -106.68,
  "sample": -7790312,
  "time": 14.007000000000001
}, {
  "acc_x": -1303.326,
  "acc_y": 17.446,
  "acc_z": -436.089,
  "angle": 1.2477128894346034e+238,
  "dev": "A",
  "gyr_x": -19.67,
  "gyr_y": -82.88,
  "gyr_z": 89.18,
  "sample": 1.2477128362466939e+238,
  "time": 14.008
}, {
  "acc_x": -1236.104,
  "acc_y": 18.666,
  "acc_z": -371.307,
  "angle": 0,
  "dev": "A",
  "gyr_x": -37.66,
  "gyr_y": -79.31,
  "gyr_z": 80.99,
  "sample": 0,
  "time": 14.028000000000002
}, {
  "acc_x": -533.811,
  "acc_y": -626.348,
  "acc_z": -256.261,
  "angle": -9.01457665133401e+83,
  "dev": "B",
  "gyr_x": 24.85,
  "gyr_y": 18.97,
  "gyr_z": -72.31,
  "sample": 0,
  "time": 14.026
}, {
  "acc_x": -417.362,
  "acc_y": -1389.214,
  "acc_z": -484.584,
  "angle": 0,
  "dev": "B",
  "gyr_x": 7.84,
  "gyr_y": 16.45,
  "gyr_z": -38.85,
  "sample": 0,
  "time": 14.045000000000002
}, {
  "acc_x": -1219.512,
  "acc_y": 51.667,
  "acc_z": -353.678,
  "angle": -7790312.34153,
  "dev": "A",
  "gyr_x": -46.55,
  "gyr_y": -75.32,
  "gyr_z": 73.15,
  "sample": -7790312,
  "time": 14.048000000000002
}, {
  "acc_x": -505.141,
  "acc_y": -620.98,
  "acc_z": -438.041,
  "angle": 8081232.34244,
  "dev": "B",
  "gyr_x": 14.14,
  "gyr_y": 18.76,
  "gyr_z": -9.87,
  "sample": 8081232,
  "time": 14.065000000000001
}, {
  "acc_x": -1141.554,
  "acc_y": 128.283,
  "acc_z": -421.754,
  "angle": 0,
  "dev": "A",
  "gyr_x": -57.61,
  "gyr_y": -63.49,
  "gyr_z": 65.73,
  "sample": 0,
  "time": 14.067
}, {
  "acc_x": -1066.829,
  "acc_y": 130.174,
  "acc_z": -411.201,
  "angle": 0,
  "dev": "A",
  "gyr_x": -68.6,
  "gyr_y": -47.53,
  "gyr_z": 58.8,
  "sample": 0,
  "time": 14.087
}, {
  "acc_x": -328.302,
  "acc_y": -163.419,
  "acc_z": 115.29,
  "angle": 0,
  "dev": "B",
  "gyr_x": 69.3,
  "gyr_y": 3.57,
  "gyr_z": 30.31,
  "sample": 0,
  "time": 14.085
}, {
  "acc_x": -244.183,
  "acc_y": -250.71,
  "acc_z": 215.33,
  "angle": 1.2477128894346034e+238,
  "dev": "B",
  "gyr_x": 47.46,
  "gyr_y": -6.51,
  "gyr_z": 70.14,
  "sample": 1.2477128362466953e+238,
  "time": 14.104
}, {
  "acc_x": -993.324,
  "acc_y": -74.969,
  "acc_z": -346.48,
  "angle": 0,
  "dev": "A",
  "gyr_x": -82.46,
  "gyr_y": -41.16,
  "gyr_z": 52.29,
  "sample": 0,
  "time": 14.106000000000002
}, {
  "acc_x": -916.098,
  "acc_y": -172.264,
  "acc_z": -289.872,
  "angle": -7792336.34155,
  "dev": "A",
  "gyr_x": -84.42,
  "gyr_y": -37.73,
  "gyr_z": 45.01,
  "sample": -7792336,
  "time": 14.125
}, {
  "acc_x": -857.538,
  "acc_y": -121.695,
  "acc_z": -317.871,
  "angle": 0,
  "dev": "A",
  "gyr_x": -69.86,
  "gyr_y": -31.78,
  "gyr_z": 41.23,
  "sample": 0,
  "time": 14.145
}, {
  "acc_x": -270.962,
  "acc_y": -608.475,
  "acc_z": 3.355,
  "angle": 0,
  "dev": "B",
  "gyr_x": -32.48,
  "gyr_y": 2.45,
  "gyr_z": 104.02,
  "sample": 0,
  "time": 14.123000000000001
}, {
  "acc_x": -409.371,
  "acc_y": -702.659,
  "acc_z": -229.055,
  "angle": 0,
  "dev": "B",
  "gyr_x": -82.88,
  "gyr_y": 5.74,
  "gyr_z": 135.8,
  "sample": 0,
  "time": 14.143
}, {
  "acc_x": -599.264,
  "acc_y": -501.237,
  "acc_z": -151.341,
  "angle": 0,
  "dev": "B",
  "gyr_x": -87.01,
  "gyr_y": 0.7,
  "gyr_z": 159.67,
  "sample": 0,
  "time": 14.161999999999999
}, {
  "acc_x": -628.788,
  "acc_y": -439.871,
  "acc_z": -74.847,
  "angle": 1.2098624981803661e+238,
  "dev": "B",
  "gyr_x": -72.73,
  "gyr_y": -15.54,
  "gyr_z": 177.73,
  "sample": 0,
  "time": 14.181000000000001
}, {
  "acc_x": -634.522,
  "acc_y": -464.637,
  "acc_z": -238.571,
  "angle": 1.2098624981818467e+238,
  "dev": "B",
  "gyr_x": -87.85,
  "gyr_y": -26.67,
  "gyr_z": 192.85,
  "sample": 1.2098624451564047e+238,
  "time": 14.2
}, {
  "acc_x": -809.958,
  "acc_y": -113.765,
  "acc_z": -364.109,
  "angle": 0,
  "dev": "A",
  "gyr_x": -38.64,
  "gyr_y": -22.33,
  "gyr_z": 43.19,
  "sample": 0,
  "time": 14.164000000000001
}, {
  "acc_x": -745.542,
  "acc_y": -62.342,
  "acc_z": -391.315,
  "angle": -1.2500056480862768e+238,
  "dev": "A",
  "gyr_x": 2.24,
  "gyr_y": -13.93,
  "gyr_z": 48.16,
  "sample": -1.2500055949654048e+238,
  "time": 14.184000000000001
}, {
  "acc_x": -696.498,
  "acc_y": 30.317,
  "acc_z": -338.428,
  "angle": -1.2500050271148055e+238,
  "dev": "A",
  "gyr_x": 29.19,
  "gyr_y": -7.56,
  "gyr_z": 51.1,
  "sample": -1.250004973958168e+238,
  "time": 14.204
}, {
  "acc_x": -787.083,
  "acc_y": -602.802,
  "acc_z": -351.726,
  "angle": -9.312250323572384e+83,
  "dev": "B",
  "gyr_x": -93.66,
  "gyr_y": -39.41,
  "gyr_z": 210.98,
  "sample": -9.312249927378829e+83,
  "time": 14.221
}, {
  "acc_x": -644.709,
  "acc_y": 124.257,
  "acc_z": -300.974,
  "angle": -7790312.34153,
  "dev": "A",
  "gyr_x": 33.88,
  "gyr_y": 1.19,
  "gyr_z": 49.35,
  "sample": -7790312,
  "time": 14.222999999999999
}, {
  "acc_x": -658.678,
  "acc_y": 157.746,
  "acc_z": -262.666,
  "angle": 0,
  "dev": "A",
  "gyr_x": 34.02,
  "gyr_y": 17.78,
  "gyr_z": 42.98,
  "sample": 0,
  "time": 14.243000000000002
}, {
  "acc_x": -823.805,
  "acc_y": -635.193,
  "acc_z": -405.223,
  "angle": 0,
  "dev": "B",
  "gyr_x": -70.49,
  "gyr_y": -56.63,
  "gyr_z": 223.02,
  "sample": 0,
  "time": 14.240000000000002
}, {
  "acc_x": -799.283,
  "acc_y": -598.227,
  "acc_z": -332.572,
  "angle": -9.014576651521875e+83,
  "dev": "B",
  "gyr_x": -27.44,
  "gyr_y": -76.09,
  "gyr_z": 236.18,
  "sample": -9.014576256051108e+83,
  "time": 14.259
}, {
  "acc_x": -651.053,
  "acc_y": 118.462,
  "acc_z": -279.563,
  "angle": 0,
  "dev": "A",
  "gyr_x": 24.64,
  "gyr_y": 32.41,
  "gyr_z": 30.8,
  "sample": -1.2086719742832283e+238,
  "time": 14.262
}, {
  "acc_x": -752.008,
  "acc_y": -420.107,
  "acc_z": -243.695,
  "angle": -9.014576651532918e+83,
  "dev": "B",
  "gyr_x": 7.07,
  "gyr_y": -85.61,
  "gyr_z": 251.93,
  "sample": -9.014576256051109e+83,
  "time": 14.278000000000002
}, {
  "acc_x": -603.473,
  "acc_y": 34.099,
  "acc_z": -263.703,
  "angle": 0,
  "dev": "A",
  "gyr_x": 5.6,
  "gyr_y": 35.49,
  "gyr_z": 11.76,
  "sample": 0,
  "time": 14.281000000000002
}, {
  "acc_x": -857.538,
  "acc_y": -278.526,
  "acc_z": -72.102,
  "angle": 0,
  "dev": "B",
  "gyr_x": 13.58,
  "gyr_y": -81.9,
  "gyr_z": 265.16,
  "sample": 0,
  "time": 14.298000000000002
}, {
  "acc_x": -1045.113,
  "acc_y": -246.928,
  "acc_z": -3.416,
  "angle": 0,
  "dev": "B",
  "gyr_x": -5.04,
  "gyr_y": -69.09,
  "gyr_z": 269.64,
  "sample": 0,
  "time": 14.317
}, {
  "acc_x": -632.082,
  "acc_y": 18.3,
  "acc_z": -153.171,
  "angle": 1.0840867471398008e+161,
  "dev": "A",
  "gyr_x": -11.27,
  "gyr_y": 35.42,
  "gyr_z": -10.22,
  "sample": 1.0840867012386852e+161,
  "time": 14.301000000000002
}, {
  "acc_x": -733.464,
  "acc_y": 164.761,
  "acc_z": -42.517,
  "angle": 0,
  "dev": "A",
  "gyr_x": -34.37,
  "gyr_y": 37.1,
  "gyr_z": -32.76,
  "sample": 0,
  "time": 14.32
}, {
  "acc_x": -1234.823,
  "acc_y": -216.428,
  "acc_z": -150.243,
  "angle": -9.01457665152826e+83,
  "dev": "B",
  "gyr_x": -29.61,
  "gyr_y": -56.28,
  "gyr_z": 263.48,
  "sample": -9.014576256051112e+83,
  "time": 14.336000000000002
}, {
  "acc_x": -777.14,
  "acc_y": 451.583,
  "acc_z": 13.786,
  "angle": 1.2097097304000837e+238,
  "dev": "A",
  "gyr_x": -73.85,
  "gyr_y": 28.56,
  "gyr_z": -52.5,
  "sample": 1.2097096773761226e+238,
  "time": 14.34
}, {
  "acc_x": -839.909,
  "acc_y": 709.918,
  "acc_z": 51.362,
  "angle": 0,
  "dev": "A",
  "gyr_x": -102.34,
  "gyr_y": 22.4,
  "gyr_z": -60.27,
  "sample": 0,
  "time": 14.36
}, {
  "acc_x": -1324.371,
  "acc_y": -85.339,
  "acc_z": -134.993,
  "angle": -9.014576651395763e+83,
  "dev": "B",
  "gyr_x": -34.16,
  "gyr_y": -54.11,
  "gyr_z": 245.21,
  "sample": -9.014576256051113e+83,
  "time": 14.356000000000002
}, {
  "acc_x": -957.7,
  "acc_y": 1000.522,
  "acc_z": 206.668,
  "angle": 0,
  "dev": "A",
  "gyr_x": -78.61,
  "gyr_y": 11.55,
  "gyr_z": -49.77,
  "sample": 0,
  "time": 14.379000000000001
}, {
  "acc_x": -1070.489,
  "acc_y": 986.309,
  "acc_z": 402.051,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.26,
  "gyr_y": -2.1,
  "gyr_z": -27.37,
  "sample": -1.2548798807679937e+238,
  "time": 14.398
}, {
  "acc_x": -1076.284,
  "acc_y": 863.638,
  "acc_z": 298.534,
  "angle": 0,
  "dev": "A",
  "gyr_x": -56.56,
  "gyr_y": 2.31,
  "gyr_z": -10.01,
  "sample": 0,
  "time": 14.418
}, {
  "acc_x": -946.842,
  "acc_y": 645.258,
  "acc_z": 82.655,
  "angle": 1.0825459218583437e+161,
  "dev": "A",
  "gyr_x": -93.17,
  "gyr_y": 1.61,
  "gyr_z": -2.52,
  "sample": 9.278234843244481e+83,
  "time": 14.437000000000001
}, {
  "acc_x": -1344.135,
  "acc_y": 11.59,
  "acc_z": -58.377,
  "angle": 9.028193801090072e+83,
  "dev": "B",
  "gyr_x": -25.97,
  "gyr_y": -54.25,
  "gyr_z": 215.25,
  "sample": 9.028193405745423e+83,
  "time": 14.376000000000001
}, {
  "acc_x": -983.32,
  "acc_y": 188.917,
  "acc_z": -3.416,
  "angle": -7790312.34137,
  "dev": "B",
  "gyr_x": -49.84,
  "gyr_y": -49.63,
  "gyr_z": 171.01,
  "sample": -7790312,
  "time": 14.395
}, {
  "acc_x": -833.626,
  "acc_y": -233.508,
  "acc_z": -170.068,
  "angle": 1.044178674884208e+161,
  "dev": "B",
  "gyr_x": -58.66,
  "gyr_y": -40.6,
  "gyr_z": 118.02,
  "sample": 1.044178629091371e+161,
  "time": 14.414000000000001
}, {
  "acc_x": -898.713,
  "acc_y": -148.901,
  "acc_z": -309.575,
  "angle": -7790312.34154,
  "dev": "B",
  "gyr_x": -37.24,
  "gyr_y": -17.43,
  "gyr_z": 63.42,
  "sample": -7790312,
  "time": 14.433
}, {
  "acc_x": -894.016,
  "acc_y": 44.408,
  "acc_z": -299.815,
  "angle": 9.031352609416962e+83,
  "dev": "B",
  "gyr_x": 5.39,
  "gyr_y": -2.94,
  "gyr_z": 9.31,
  "sample": 9.031352213939821e+83,
  "time": 14.453
}, {
  "acc_x": -1060.18,
  "acc_y": 80.215,
  "acc_z": -435.662,
  "angle": -1.2101077960394725e+238,
  "dev": "B",
  "gyr_x": 8.68,
  "gyr_y": 6.72,
  "gyr_z": -43.54,
  "sample": -1.2101077430149903e+238,
  "time": 14.472000000000001
}, {
  "acc_x": -898.591,
  "acc_y": 373.808,
  "acc_z": -72.102,
  "angle": 0,
  "dev": "A",
  "gyr_x": -52.5,
  "gyr_y": 17.01,
  "gyr_z": 14.7,
  "sample": 0,
  "time": 14.456
}, {
  "acc_x": -1054.629,
  "acc_y": 363.255,
  "acc_z": -184.342,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.19,
  "gyr_y": 34.3,
  "gyr_z": 27.58,
  "sample": 0,
  "time": 14.477
}, {
  "acc_x": -1114.104,
  "acc_y": 103.212,
  "acc_z": -832.467,
  "angle": 0,
  "dev": "B",
  "gyr_x": -18.55,
  "gyr_y": 26.88,
  "gyr_z": -89.6,
  "sample": 0,
  "time": 14.491
}, {
  "acc_x": -1461.682,
  "acc_y": 213.744,
  "acc_z": -248.819,
  "angle": -8085880.34237,
  "dev": "A",
  "gyr_x": 16.38,
  "gyr_y": 44.31,
  "gyr_z": 31.92,
  "sample": -8085880,
  "time": 14.496000000000002
}, {
  "acc_x": -1667.801,
  "acc_y": 1281.488,
  "acc_z": 1068.842,
  "angle": 9.031352609284466e+83,
  "dev": "B",
  "gyr_x": 34.37,
  "gyr_y": 41.16,
  "gyr_z": -86.94,
  "sample": 9.031352213939824e+83,
  "time": 14.511
}, {
  "acc_x": -1147.593,
  "acc_y": 782.752,
  "acc_z": 455.975,
  "angle": 0,
  "dev": "A",
  "gyr_x": 20.72,
  "gyr_y": 51.17,
  "gyr_z": 26.32,
  "sample": 0,
  "time": 14.515
}, {
  "acc_x": -984.235,
  "acc_y": 1143.14,
  "acc_z": -225.456,
  "angle": 9.369192241878967e+83,
  "dev": "A",
  "gyr_x": -31.5,
  "gyr_y": 46.9,
  "gyr_z": 6.09,
  "sample": -1.2479481979894905e+238,
  "time": 14.535
}, {
  "acc_x": -1256.539,
  "acc_y": 266.997,
  "acc_z": 19.703,
  "angle": -9.014576651533833e+83,
  "dev": "B",
  "gyr_x": 76.02,
  "gyr_y": 15.96,
  "gyr_z": -70.63,
  "sample": -9.014576256051123e+83,
  "time": 14.531000000000002
}, {
  "acc_x": -1167.296,
  "acc_y": -627.507,
  "acc_z": 120.963,
  "angle": 0,
  "dev": "B",
  "gyr_x": -116.41,
  "gyr_y": 45.5,
  "gyr_z": -115.08,
  "sample": 0,
  "time": 14.55
}, {
  "acc_x": -901.275,
  "acc_y": -992.104,
  "acc_z": -341.661,
  "angle": 0,
  "dev": "A",
  "gyr_x": -4.76,
  "gyr_y": 56.14,
  "gyr_z": -4.41,
  "sample": 0,
  "time": 14.554000000000002
}, {
  "acc_x": -724.314,
  "acc_y": -579.134,
  "acc_z": -463.173,
  "angle": 8.974646907343167e+83,
  "dev": "B",
  "gyr_x": -115.85,
  "gyr_y": 44.03,
  "gyr_z": -126.7,
  "sample": 8.974646511998529e+83,
  "time": 14.568999999999999
}, {
  "acc_x": -898.713,
  "acc_y": -550.342,
  "acc_z": -346.419,
  "angle": 9.028193801216184e+83,
  "dev": "B",
  "gyr_x": -48.09,
  "gyr_y": 35.77,
  "gyr_z": -109.69,
  "sample": 9.028193405745434e+83,
  "time": 14.588000000000001
}, {
  "acc_x": -649.894,
  "acc_y": 84.363,
  "acc_z": -571.57,
  "angle": -1.0716089048080172e+161,
  "dev": "A",
  "gyr_x": 8.75,
  "gyr_y": 35.49,
  "gyr_z": -8.75,
  "sample": -9.370988938407148e+83,
  "time": 14.573
}, {
  "acc_x": -641.171,
  "acc_y": 84.79,
  "acc_z": -860.405,
  "angle": 0,
  "dev": "A",
  "gyr_x": 18.41,
  "gyr_y": 32.27,
  "gyr_z": -31.85,
  "sample": -7790312,
  "time": 14.593
}, {
  "acc_x": -856.013,
  "acc_y": -443.714,
  "acc_z": -966.301,
  "angle": 0,
  "dev": "B",
  "gyr_x": -26.95,
  "gyr_y": 37.38,
  "gyr_z": -88.62,
  "sample": 0,
  "time": 14.608
}, {
  "acc_x": -825.574,
  "acc_y": -86.803,
  "acc_z": -556.442,
  "angle": 1.2477128894119595e+238,
  "dev": "A",
  "gyr_x": 35.91,
  "gyr_y": 46.2,
  "gyr_z": -28.63,
  "sample": 1.2477128362466983e+238,
  "time": 14.613
}, {
  "acc_x": -986.98,
  "acc_y": 257.542,
  "acc_z": -469.395,
  "angle": -1.0716089047708659e+161,
  "dev": "A",
  "gyr_x": 45.85,
  "gyr_y": 44.59,
  "gyr_z": -25.62,
  "sample": -1.0716088588667656e+161,
  "time": 14.632000000000001
}, {
  "acc_x": -957.395,
  "acc_y": -547.719,
  "acc_z": -303.902,
  "angle": 1.0742373714722935e+161,
  "dev": "B",
  "gyr_x": 30.8,
  "gyr_y": 35.49,
  "gyr_z": -69.37,
  "sample": 1.0742373255333521e+161,
  "time": 14.626999999999999
}, {
  "acc_x": -1056.52,
  "acc_y": -36.051,
  "acc_z": 7.564,
  "angle": -7792336.34153,
  "dev": "B",
  "gyr_x": 82.53,
  "gyr_y": 14.63,
  "gyr_z": -56.56,
  "sample": -7792336,
  "time": 14.647000000000002
}, {
  "acc_x": -906.033,
  "acc_y": 257.969,
  "acc_z": -465.735,
  "angle": -9.34973453896704e+83,
  "dev": "A",
  "gyr_x": 47.18,
  "gyr_y": 34.72,
  "gyr_z": -30.31,
  "sample": -9.349734142506751e+83,
  "time": 14.652000000000001
}, {
  "acc_x": -1031.327,
  "acc_y": 192.821,
  "acc_z": -70.394,
  "angle": 0,
  "dev": "B",
  "gyr_x": 80.57,
  "gyr_y": 15.68,
  "gyr_z": -52.64,
  "sample": 0,
  "time": 14.666
}, {
  "acc_x": -775.31,
  "acc_y": 272.243,
  "acc_z": -514.901,
  "angle": 0,
  "dev": "A",
  "gyr_x": 44.38,
  "gyr_y": 33.04,
  "gyr_z": -31.78,
  "sample": 0,
  "time": 14.671
}, {
  "acc_x": -708.759,
  "acc_y": 414.983,
  "acc_z": -588.101,
  "angle": -1.2101046910061612e+238,
  "dev": "A",
  "gyr_x": 50.05,
  "gyr_y": 35.07,
  "gyr_z": -30.59,
  "sample": 1.2090756289872296e+238,
  "time": 14.690999999999999
}, {
  "acc_x": -918.721,
  "acc_y": 43.371,
  "acc_z": -324.215,
  "angle": 0,
  "dev": "B",
  "gyr_x": 21.98,
  "gyr_y": 22.96,
  "gyr_z": -55.02,
  "sample": 0,
  "time": 14.686
}, {
  "acc_x": -962.275,
  "acc_y": -229.848,
  "acc_z": -519.476,
  "angle": 0,
  "dev": "B",
  "gyr_x": -8.47,
  "gyr_y": 23.03,
  "gyr_z": -50.68,
  "sample": 0,
  "time": 14.705000000000002
}, {
  "acc_x": -761.158,
  "acc_y": 407.48,
  "acc_z": -592.432,
  "angle": -1.2101046909703076e+238,
  "dev": "A",
  "gyr_x": 51.52,
  "gyr_y": 37.17,
  "gyr_z": -30.8,
  "sample": 1.2090756289872298e+238,
  "time": 14.71
}, {
  "acc_x": -999.546,
  "acc_y": -181.353,
  "acc_z": -454.145,
  "angle": -9.370989335163544e+83,
  "dev": "B",
  "gyr_x": 8.54,
  "gyr_y": 16.66,
  "gyr_z": -45.01,
  "sample": 0,
  "time": 14.724
}, {
  "acc_x": -811.91,
  "acc_y": 300.73,
  "acc_z": -552.599,
  "angle": 0,
  "dev": "A",
  "gyr_x": 48.51,
  "gyr_y": 38.85,
  "gyr_z": -31.99,
  "sample": 0,
  "time": 14.729
}, {
  "acc_x": -812.947,
  "acc_y": 268.095,
  "acc_z": -524.417,
  "angle": -1.0716089047428431e+161,
  "dev": "A",
  "gyr_x": 51.45,
  "gyr_y": 39.2,
  "gyr_z": -30.87,
  "sample": 0,
  "time": 14.749000000000002
}, {
  "acc_x": -1017.419,
  "acc_y": -29.28,
  "acc_z": -280.478,
  "angle": 8.974646907227201e+83,
  "dev": "B",
  "gyr_x": 37.8,
  "gyr_y": 10.64,
  "gyr_z": -40.81,
  "sample": 8.974646511998539e+83,
  "time": 14.743000000000002
}, {
  "acc_x": -965.02,
  "acc_y": 28.548,
  "acc_z": -214.964,
  "angle": -1.0716089048095696e+161,
  "dev": "B",
  "gyr_x": 35.49,
  "gyr_y": 7,
  "gyr_z": -39.06,
  "sample": -1.071608858866767e+161,
  "time": 14.763000000000002
}, {
  "acc_x": -795.745,
  "acc_y": 234.85,
  "acc_z": -510.631,
  "angle": -1.0830570275305098e+161,
  "dev": "A",
  "gyr_x": 55.51,
  "gyr_y": 36.61,
  "gyr_z": -31.08,
  "sample": -1.0830569815896686e+161,
  "time": 14.769000000000002
}, {
  "acc_x": -932.751,
  "acc_y": -78.812,
  "acc_z": -297.436,
  "angle": 0,
  "dev": "B",
  "gyr_x": 13.16,
  "gyr_y": 4.83,
  "gyr_z": -37.73,
  "sample": 0,
  "time": 14.783000000000001
}, {
  "acc_x": -937.021,
  "acc_y": -190.442,
  "acc_z": -317.505,
  "angle": -1.0830570275266238e+161,
  "dev": "B",
  "gyr_x": 3.5,
  "gyr_y": 4.06,
  "gyr_z": -34.93,
  "sample": 0,
  "time": 14.802
}, {
  "acc_x": -786.9,
  "acc_y": 260.653,
  "acc_z": -494.71,
  "angle": 0,
  "dev": "A",
  "gyr_x": 56.63,
  "gyr_y": 34.51,
  "gyr_z": -33.6,
  "sample": 9.02819340574544e+83,
  "time": 14.788
}, {
  "acc_x": -762.317,
  "acc_y": 261.324,
  "acc_z": -443.531,
  "angle": -1.0830570275240166e+161,
  "dev": "A",
  "gyr_x": 54.25,
  "gyr_y": 33.6,
  "gyr_z": -36.05,
  "sample": -1.0830569815896689e+161,
  "time": 14.808
}, {
  "acc_x": -822.524,
  "acc_y": 323.3,
  "acc_z": -416.569,
  "angle": 0,
  "dev": "A",
  "gyr_x": 49.21,
  "gyr_y": 30.45,
  "gyr_z": -38.5,
  "sample": 0,
  "time": 14.827000000000002
}, {
  "acc_x": -920.49,
  "acc_y": -63.318,
  "acc_z": -254.98,
  "angle": 9.028193801228141e+83,
  "dev": "B",
  "gyr_x": 14,
  "gyr_y": 1.61,
  "gyr_z": -30.38,
  "sample": 9.028193405745447e+83,
  "time": 14.821000000000002
}, {
  "acc_x": -950.868,
  "acc_y": 42.822,
  "acc_z": -178.425,
  "angle": -1.0830570275266238e+161,
  "dev": "B",
  "gyr_x": 14.63,
  "gyr_y": -1.26,
  "gyr_z": -27.16,
  "sample": -1.0830569815896697e+161,
  "time": 14.841000000000001
}, {
  "acc_x": -934.581,
  "acc_y": 62.769,
  "acc_z": -237.168,
  "angle": 1.0742368351599763e+161,
  "dev": "B",
  "gyr_x": 5.95,
  "gyr_y": 0,
  "gyr_z": -27.23,
  "sample": 1.0742367892210364e+161,
  "time": 14.86
}, {
  "acc_x": -965.386,
  "acc_y": -15.494,
  "acc_z": -237.839,
  "angle": 0,
  "dev": "B",
  "gyr_x": 9.24,
  "gyr_y": 6.09,
  "gyr_z": -28.84,
  "sample": 0,
  "time": 14.879000000000001
}, {
  "acc_x": -979.721,
  "acc_y": 38.857,
  "acc_z": -239.791,
  "angle": 0,
  "dev": "B",
  "gyr_x": 17.01,
  "gyr_y": 7.07,
  "gyr_z": -30.8,
  "sample": 0,
  "time": 14.898
}, {
  "acc_x": -973.438,
  "acc_y": 106.75,
  "acc_z": -186.721,
  "angle": 0,
  "dev": "B",
  "gyr_x": 22.4,
  "gyr_y": 6.72,
  "gyr_z": -33.6,
  "sample": 0,
  "time": 14.918
}, {
  "acc_x": -827.892,
  "acc_y": 337.94,
  "acc_z": -390.888,
  "angle": -1.2111697184132505e+238,
  "dev": "A",
  "gyr_x": 45.85,
  "gyr_y": 23.03,
  "gyr_z": -38.99,
  "sample": -1.211169665390126e+238,
  "time": 14.846
}, {
  "acc_x": -833.138,
  "acc_y": 348.859,
  "acc_z": -388.448,
  "angle": -1.2101046910040814e+238,
  "dev": "A",
  "gyr_x": 42.77,
  "gyr_y": 13.93,
  "gyr_z": -38.22,
  "sample": -1.2101046379788078e+238,
  "time": 14.866
}, {
  "acc_x": -834.48,
  "acc_y": 388.692,
  "acc_z": -386.496,
  "angle": -1.2111697183966146e+238,
  "dev": "A",
  "gyr_x": 45.5,
  "gyr_y": 7.84,
  "gyr_z": -36.05,
  "sample": -1.2111696653901263e+238,
  "time": 14.885000000000002
}, {
  "acc_x": -841.251,
  "acc_y": 371.673,
  "acc_z": -329.705,
  "angle": 9.02819380121765e+83,
  "dev": "A",
  "gyr_x": 51.66,
  "gyr_y": 1.89,
  "gyr_z": -33.11,
  "sample": 9.028193405745446e+83,
  "time": 14.905000000000001
}, {
  "acc_x": -852.597,
  "acc_y": 332.572,
  "acc_z": -340.868,
  "angle": -1.045348372044314e+161,
  "dev": "A",
  "gyr_x": 55.72,
  "gyr_y": -3.01,
  "gyr_z": -31.01,
  "sample": -1.0453483262551819e+161,
  "time": 14.925
}, {
  "acc_x": -970.51,
  "acc_y": 84.119,
  "acc_z": -262.056,
  "angle": -1.0830570275309194e+161,
  "dev": "B",
  "gyr_x": 21.14,
  "gyr_y": 7,
  "gyr_z": -38.5,
  "sample": 0,
  "time": 14.938000000000002
}, {
  "acc_x": -828.014,
  "acc_y": 350.323,
  "acc_z": -354.959,
  "angle": 0,
  "dev": "A",
  "gyr_x": 57.68,
  "gyr_y": -5.53,
  "gyr_z": -27.86,
  "sample": 0,
  "time": 14.943999999999999
}, {
  "acc_x": -949.16,
  "acc_y": 68.869,
  "acc_z": -248.148,
  "angle": 8.974646907281414e+83,
  "dev": "B",
  "gyr_x": 27.09,
  "gyr_y": 7.91,
  "gyr_z": -42.7,
  "sample": 1.074236789221037e+161,
  "time": 14.957
}, {
  "acc_x": -949.099,
  "acc_y": 3.538,
  "acc_z": -227.469,
  "angle": 0,
  "dev": "B",
  "gyr_x": 28.49,
  "gyr_y": 9.45,
  "gyr_z": -46.13,
  "sample": 0,
  "time": 14.975999999999999
}, {
  "acc_x": -963.983,
  "acc_y": 9.577,
  "acc_z": -190.564,
  "angle": -1.0830570275120051e+161,
  "dev": "B",
  "gyr_x": 25.2,
  "gyr_y": 10.22,
  "gyr_z": -50.54,
  "sample": -1.0830569815896707e+161,
  "time": 14.996000000000002
}, {
  "acc_x": -815.936,
  "acc_y": 350.628,
  "acc_z": -387.045,
  "angle": 1.0454218468370247e+161,
  "dev": "A",
  "gyr_x": 56.77,
  "gyr_y": -6.16,
  "gyr_z": -25.41,
  "sample": 1.0454218010426382e+161,
  "time": 14.963000000000001
}, {
  "acc_x": -828.136,
  "acc_y": 350.323,
  "acc_z": -386.069,
  "angle": 8.974646907435409e+83,
  "dev": "A",
  "gyr_x": 52.22,
  "gyr_y": -5.67,
  "gyr_z": -24.85,
  "sample": 0,
  "time": 14.983
}, {
  "acc_x": -827.526,
  "acc_y": 373.442,
  "acc_z": -354.532,
  "angle": 0,
  "dev": "A",
  "gyr_x": 45.08,
  "gyr_y": -7.7,
  "gyr_z": -27.09,
  "sample": -1.2101046379788089e+238,
  "time": 15.001999999999999
}, {
  "acc_x": -798.307,
  "acc_y": 418.277,
  "acc_z": -386.069,
  "angle": -1.2101046910029617e+238,
  "dev": "A",
  "gyr_x": 41.86,
  "gyr_y": -10.08,
  "gyr_z": -28.7,
  "sample": -1.210104637978809e+238,
  "time": 15.021
}, {
  "acc_x": -830.454,
  "acc_y": 376.126,
  "acc_z": -354.776,
  "angle": 0,
  "dev": "A",
  "gyr_x": 36.82,
  "gyr_y": -10.29,
  "gyr_z": -28.07,
  "sample": -1.0453483262551826e+161,
  "time": 15.042000000000002
}, {
  "acc_x": -960.872,
  "acc_y": -3.721,
  "acc_z": -240.157,
  "angle": -9.031991781617056e+83,
  "dev": "B",
  "gyr_x": 21.56,
  "gyr_y": 11.48,
  "gyr_z": -55.37,
  "sample": -1.0453483262551831e+161,
  "time": 15.015
}, {
  "acc_x": -954.65,
  "acc_y": 33.184,
  "acc_z": -262.117,
  "angle": -1.2101046909703076e+238,
  "dev": "B",
  "gyr_x": 22.4,
  "gyr_y": 10.78,
  "gyr_z": -59.71,
  "sample": 0,
  "time": 15.033999999999999
}, {
  "acc_x": -835.639,
  "acc_y": 371.063,
  "acc_z": -383.751,
  "angle": 8.974646907338992e+83,
  "dev": "A",
  "gyr_x": 30.24,
  "gyr_y": -8.89,
  "gyr_z": -25.97,
  "sample": 8.97464651199855e+83,
  "time": 15.061
}, {
  "acc_x": -845.399,
  "acc_y": 364.048,
  "acc_z": -434.32,
  "angle": 1.0742368351638383e+161,
  "dev": "A",
  "gyr_x": 30.73,
  "gyr_y": -10.71,
  "gyr_z": -21.91,
  "sample": 0,
  "time": 15.080000000000002
}, {
  "acc_x": -993.934,
  "acc_y": 0.488,
  "acc_z": -243.39,
  "angle": 0,
  "dev": "B",
  "gyr_x": 20.65,
  "gyr_y": 8.61,
  "gyr_z": -64.75,
  "sample": 0,
  "time": 15.053
}, {
  "acc_x": -988.2,
  "acc_y": -16.897,
  "acc_z": -279.563,
  "angle": 7794940.34142,
  "dev": "B",
  "gyr_x": 20.86,
  "gyr_y": 9.66,
  "gyr_z": -71.26,
  "sample": 7794940,
  "time": 15.074000000000002
}, {
  "acc_x": -1018.029,
  "acc_y": 21.228,
  "acc_z": -282.857,
  "angle": -1.2101046910020548e+238,
  "dev": "B",
  "gyr_x": 25.41,
  "gyr_y": 11.13,
  "gyr_z": -77.42,
  "sample": 1.0457494878684475e+161,
  "time": 15.093
}, {
  "acc_x": -927.566,
  "acc_y": 310.978,
  "acc_z": -371.734,
  "angle": -1.0830570274966331e+161,
  "dev": "A",
  "gyr_x": 21.35,
  "gyr_y": -7.7,
  "gyr_z": -16.59,
  "sample": -1.0830569815896707e+161,
  "time": 15.100000000000001
}, {
  "acc_x": -1088.667,
  "acc_y": -144.387,
  "acc_z": -243.695,
  "angle": 0,
  "dev": "B",
  "gyr_x": 27.93,
  "gyr_y": 10.29,
  "gyr_z": -83.44,
  "sample": 0,
  "time": 15.112000000000002
}, {
  "acc_x": -1077.443,
  "acc_y": -165.005,
  "acc_z": -237.961,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.72,
  "gyr_y": 9.87,
  "gyr_z": -88.13,
  "sample": 0,
  "time": 15.131
}, {
  "acc_x": -923.54,
  "acc_y": 344.589,
  "acc_z": -389.119,
  "angle": -1.0453483720324784e+161,
  "dev": "A",
  "gyr_x": 16.59,
  "gyr_y": -11.34,
  "gyr_z": -12.67,
  "sample": -1.0453483262551831e+161,
  "time": 15.119
}, {
  "acc_x": -943.792,
  "acc_y": 448.716,
  "acc_z": -375.516,
  "angle": 0,
  "dev": "A",
  "gyr_x": 24.71,
  "gyr_y": -18.2,
  "gyr_z": -11.34,
  "sample": 0,
  "time": 15.139
}, {
  "acc_x": -1161.745,
  "acc_y": -146.522,
  "acc_z": -250.1,
  "angle": 0,
  "dev": "B",
  "gyr_x": 41.86,
  "gyr_y": 10.22,
  "gyr_z": -92.47,
  "sample": 0,
  "time": 15.151
}, {
  "acc_x": -1048.224,
  "acc_y": 643.794,
  "acc_z": -285.663,
  "angle": 1.0742368351531015e+161,
  "dev": "A",
  "gyr_x": 38.22,
  "gyr_y": -26.18,
  "gyr_z": -10.01,
  "sample": 1.0742367892210377e+161,
  "time": 15.158000000000001
}, {
  "acc_x": -1000.766,
  "acc_y": 832.589,
  "acc_z": -182.756,
  "angle": -1.0830570275309194e+161,
  "dev": "A",
  "gyr_x": 36.33,
  "gyr_y": -37.59,
  "gyr_z": -6.44,
  "sample": -1.0830569815896712e+161,
  "time": 15.177
}, {
  "acc_x": -1099.342,
  "acc_y": 866.749,
  "acc_z": -6.649,
  "angle": 0,
  "dev": "A",
  "gyr_x": 13.93,
  "gyr_y": -47.11,
  "gyr_z": 1.19,
  "sample": 0,
  "time": 15.198
}, {
  "acc_x": -1273.863,
  "acc_y": -22.997,
  "acc_z": -193.065,
  "angle": -1.0830570274657453e+161,
  "dev": "B",
  "gyr_x": 42.21,
  "gyr_y": 8.82,
  "gyr_z": -99.05,
  "sample": -1.0830569815896719e+161,
  "time": 15.170000000000002
}, {
  "acc_x": -1418.555,
  "acc_y": 109.739,
  "acc_z": -155.611,
  "angle": 8095496.34261,
  "dev": "B",
  "gyr_x": 39.97,
  "gyr_y": 8.05,
  "gyr_z": -108.36,
  "sample": 8095496,
  "time": 15.189
}, {
  "acc_x": -1563.857,
  "acc_y": 476.349,
  "acc_z": -70.333,
  "angle": 0,
  "dev": "B",
  "gyr_x": 40.74,
  "gyr_y": 7.77,
  "gyr_z": -120.19,
  "sample": 1.0825458759513827e+161,
  "time": 15.208000000000002
}, {
  "acc_x": -1255.014,
  "acc_y": 616.832,
  "acc_z": 135.603,
  "angle": -8074376.34264,
  "dev": "A",
  "gyr_x": -16.87,
  "gyr_y": -57.82,
  "gyr_z": 18.69,
  "sample": -8074376,
  "time": 15.217000000000002
}, {
  "acc_x": -1581.486,
  "acc_y": 419.863,
  "acc_z": 85.095,
  "angle": 7794940.34147,
  "dev": "B",
  "gyr_x": 33.6,
  "gyr_y": 10.36,
  "gyr_z": -135.8,
  "sample": 7794940,
  "time": 15.229
}, {
  "acc_x": -1640.961,
  "acc_y": 193.553,
  "acc_z": 50.264,
  "angle": 9.03135260928029e+83,
  "dev": "B",
  "gyr_x": 47.46,
  "gyr_y": 18.2,
  "gyr_z": -143.78,
  "sample": 1.082545875951383e+161,
  "time": 15.248000000000001
}, {
  "acc_x": -1203.713,
  "acc_y": 513.193,
  "acc_z": 136.945,
  "angle": 0,
  "dev": "A",
  "gyr_x": -29.82,
  "gyr_y": -86.1,
  "gyr_z": 37.8,
  "sample": 0,
  "time": 15.236
}, {
  "acc_x": -1077.87,
  "acc_y": 382.897,
  "acc_z": -107.238,
  "angle": 9.36329147706751e+83,
  "dev": "A",
  "gyr_x": -21.84,
  "gyr_y": -111.02,
  "gyr_z": 55.44,
  "sample": 9.363291080314689e+83,
  "time": 15.256
}, {
  "acc_x": -1432.768,
  "acc_y": 226.371,
  "acc_z": -365.817,
  "angle": 9.031352609431318e+83,
  "dev": "B",
  "gyr_x": 77.7,
  "gyr_y": 25.62,
  "gyr_z": -144.83,
  "sample": 0,
  "time": 15.267
}, {
  "acc_x": -1106.479,
  "acc_y": 318.176,
  "acc_z": -351.482,
  "angle": 1.0825459218857271e+161,
  "dev": "A",
  "gyr_x": -0.56,
  "gyr_y": -111.86,
  "gyr_z": 76.93,
  "sample": 1.0825458759513825e+161,
  "time": 15.275000000000002
}, {
  "acc_x": -1200.724,
  "acc_y": -224.724,
  "acc_z": -295.85,
  "angle": 8.974646907490019e+83,
  "dev": "B",
  "gyr_x": 69.58,
  "gyr_y": 31.36,
  "gyr_z": -142.73,
  "sample": 1.0457494878684487e+161,
  "time": 15.286000000000001
}, {
  "acc_x": -908.229,
  "acc_y": -201.544,
  "acc_z": -380.335,
  "angle": 0,
  "dev": "B",
  "gyr_x": 11.2,
  "gyr_y": 31.36,
  "gyr_z": -135.8,
  "sample": 0,
  "time": 15.306000000000001
}, {
  "acc_x": -638.731,
  "acc_y": -579.012,
  "acc_z": -294.569,
  "angle": -1.2564635024181511e+238,
  "dev": "B",
  "gyr_x": -46.06,
  "gyr_y": 30.1,
  "gyr_z": -117.53,
  "sample": -1.2564634492221481e+238,
  "time": 15.325
}, {
  "acc_x": -1357.921,
  "acc_y": 139.202,
  "acc_z": -470.798,
  "angle": 8.974646907469279e+83,
  "dev": "A",
  "gyr_x": 7.28,
  "gyr_y": -99.75,
  "gyr_z": 90.93,
  "sample": 8.974646511998563e+83,
  "time": 15.294
}, {
  "acc_x": -1450.153,
  "acc_y": -74.237,
  "acc_z": -426.207,
  "angle": 0,
  "dev": "A",
  "gyr_x": -7.77,
  "gyr_y": -87.92,
  "gyr_z": 88.76,
  "sample": 0,
  "time": 15.314
}, {
  "acc_x": -1324.249,
  "acc_y": -91.927,
  "acc_z": -331.596,
  "angle": 1.0825459218941823e+161,
  "dev": "A",
  "gyr_x": -20.23,
  "gyr_y": -89.81,
  "gyr_z": 81.06,
  "sample": 1.0825458759513828e+161,
  "time": 15.334
}, {
  "acc_x": -1275.876,
  "acc_y": 62.281,
  "acc_z": -261.019,
  "angle": 0,
  "dev": "A",
  "gyr_x": -22.75,
  "gyr_y": -91.28,
  "gyr_z": 77.14,
  "sample": 0,
  "time": 15.353000000000002
}, {
  "acc_x": -527.345,
  "acc_y": -1139.541,
  "acc_z": -208.498,
  "angle": 8.974646907463068e+83,
  "dev": "B",
  "gyr_x": -69.23,
  "gyr_y": 28.7,
  "gyr_z": -84.21,
  "sample": 8.974646511998572e+83,
  "time": 15.344000000000001
}, {
  "acc_x": -397.842,
  "acc_y": -1511.824,
  "acc_z": -593.164,
  "angle": 0,
  "dev": "B",
  "gyr_x": -63.7,
  "gyr_y": 32.55,
  "gyr_z": -43.4,
  "sample": -1.0830569815896731e+161,
  "time": 15.364
}, {
  "acc_x": -494.893,
  "acc_y": -615.063,
  "acc_z": -382.714,
  "angle": -8074376.34265,
  "dev": "B",
  "gyr_x": -20.79,
  "gyr_y": 44.38,
  "gyr_z": -13.44,
  "sample": -8074376,
  "time": 15.384
}, {
  "acc_x": -271.938,
  "acc_y": -369.965,
  "acc_z": 12.078,
  "angle": 0,
  "dev": "B",
  "gyr_x": 65.38,
  "gyr_y": 18.9,
  "gyr_z": 30.8,
  "sample": 0,
  "time": 15.403000000000002
}, {
  "acc_x": -1229.15,
  "acc_y": 112.057,
  "acc_z": -275.415,
  "angle": 8.974646907232153e+83,
  "dev": "A",
  "gyr_x": -38.36,
  "gyr_y": -82.18,
  "gyr_z": 67.27,
  "sample": 8.974646511998568e+83,
  "time": 15.373000000000001
}, {
  "acc_x": -1180.045,
  "acc_y": 89.304,
  "acc_z": -358.985,
  "angle": 0,
  "dev": "A",
  "gyr_x": -57.4,
  "gyr_y": -65.94,
  "gyr_z": 56.84,
  "sample": 0,
  "time": 15.392
}, {
  "acc_x": -1082.262,
  "acc_y": 16.287,
  "acc_z": -373.747,
  "angle": 0,
  "dev": "A",
  "gyr_x": -67.2,
  "gyr_y": -56.21,
  "gyr_z": 49.21,
  "sample": 0,
  "time": 15.411000000000001
}, {
  "acc_x": -199.043,
  "acc_y": -539.24,
  "acc_z": -34.953,
  "angle": 0,
  "dev": "B",
  "gyr_x": 57.68,
  "gyr_y": 0.98,
  "gyr_z": 70.7,
  "sample": 0,
  "time": 15.422
}, {
  "acc_x": -936.899,
  "acc_y": -136.518,
  "acc_z": -323.056,
  "angle": 9.031352609168499e+83,
  "dev": "A",
  "gyr_x": -65.24,
  "gyr_y": -53.41,
  "gyr_z": 43.54,
  "sample": 9.031352213939869e+83,
  "time": 15.431000000000001
}, {
  "acc_x": -208.864,
  "acc_y": -655.811,
  "acc_z": -222.955,
  "angle": 1.0426496484678773e+161,
  "dev": "B",
  "gyr_x": 11.41,
  "gyr_y": -1.89,
  "gyr_z": 108.78,
  "sample": 1.042649602675047e+161,
  "time": 15.440999999999999
}, {
  "acc_x": -316.285,
  "acc_y": -595.97,
  "acc_z": -321.409,
  "angle": 8.974646907486585e+83,
  "dev": "B",
  "gyr_x": 0.63,
  "gyr_y": -5.11,
  "gyr_z": 145.11,
  "sample": 8.974646511998578e+83,
  "time": 15.461000000000002
}, {
  "acc_x": -856.013,
  "acc_y": -161.345,
  "acc_z": -333.914,
  "angle": 0,
  "dev": "A",
  "gyr_x": -54.18,
  "gyr_y": -50.26,
  "gyr_z": 40.39,
  "sample": 0,
  "time": 15.45
}, {
  "acc_x": -806.542,
  "acc_y": -143.838,
  "acc_z": -354.044,
  "angle": 0,
  "dev": "A",
  "gyr_x": -32.69,
  "gyr_y": -42.84,
  "gyr_z": 42.98,
  "sample": 0,
  "time": 15.469999999999999
}, {
  "acc_x": -416.752,
  "acc_y": -412.787,
  "acc_z": -214.049,
  "angle": 9.031352609173451e+83,
  "dev": "B",
  "gyr_x": 7.7,
  "gyr_y": -12.95,
  "gyr_z": 171.22,
  "sample": 9.031352213939878e+83,
  "time": 15.48
}, {
  "acc_x": -720.288,
  "acc_y": -66.856,
  "acc_z": -368.928,
  "angle": 0,
  "dev": "A",
  "gyr_x": -1.68,
  "gyr_y": -30.17,
  "gyr_z": 49.28,
  "sample": 0,
  "time": 15.490000000000002
}, {
  "acc_x": -458.11,
  "acc_y": -314.028,
  "acc_z": -110.715,
  "angle": 9.031352609405281e+83,
  "dev": "B",
  "gyr_x": 9.73,
  "gyr_y": -23.45,
  "gyr_z": 192.64,
  "sample": 9.031352213939879e+83,
  "time": 15.5
}, {
  "acc_x": -496.601,
  "acc_y": -331.718,
  "acc_z": -166.225,
  "angle": 0,
  "dev": "B",
  "gyr_x": -9.66,
  "gyr_y": -30.8,
  "gyr_z": 212.52,
  "sample": 0,
  "time": 15.519000000000002
}, {
  "acc_x": -668.682,
  "acc_y": -5.368,
  "acc_z": -383.385,
  "angle": 0,
  "dev": "A",
  "gyr_x": 22.4,
  "gyr_y": -13.3,
  "gyr_z": 52.29,
  "sample": 0,
  "time": 15.509
}, {
  "acc_x": -634.705,
  "acc_y": 37.393,
  "acc_z": -390.949,
  "angle": -1.0830570275265e+161,
  "dev": "A",
  "gyr_x": 36.19,
  "gyr_y": -0.07,
  "gyr_z": 49.56,
  "sample": -1.0830569815896735e+161,
  "time": 15.528000000000002
}, {
  "acc_x": -680.699,
  "acc_y": -439.017,
  "acc_z": -270.169,
  "angle": -1.0830570275237269e+161,
  "dev": "B",
  "gyr_x": -32.48,
  "gyr_y": -35.56,
  "gyr_z": 229.74,
  "sample": -1.0830569815896742e+161,
  "time": 15.539000000000001
}, {
  "acc_x": -625.128,
  "acc_y": 84.363,
  "acc_z": -367.83,
  "angle": 9.031352609416962e+83,
  "dev": "A",
  "gyr_x": 45.99,
  "gyr_y": 13.3,
  "gyr_z": 44.8,
  "sample": 9.031352213939876e+83,
  "time": 15.548000000000002
}, {
  "acc_x": -757.925,
  "acc_y": -482.51,
  "acc_z": -345.626,
  "angle": 0,
  "dev": "B",
  "gyr_x": -46.06,
  "gyr_y": -43.54,
  "gyr_z": 240.66,
  "sample": 0,
  "time": 15.558
}, {
  "acc_x": -813.923,
  "acc_y": -445.666,
  "acc_z": -321.775,
  "angle": 1.0850478188520815e+161,
  "dev": "B",
  "gyr_x": -41.58,
  "gyr_y": -55.09,
  "gyr_z": 248.43,
  "sample": 0,
  "time": 15.577000000000002
}, {
  "acc_x": -619.638,
  "acc_y": 92.659,
  "acc_z": -285.785,
  "angle": 1.0850478188201208e+161,
  "dev": "A",
  "gyr_x": 47.95,
  "gyr_y": 27.44,
  "gyr_z": 37.1,
  "sample": 1.0850477729111116e+161,
  "time": 15.567
}, {
  "acc_x": -607.865,
  "acc_y": 118.889,
  "acc_z": -270.901,
  "angle": 0,
  "dev": "A",
  "gyr_x": 40.6,
  "gyr_y": 36.4,
  "gyr_z": 24.43,
  "sample": 0,
  "time": 15.587
}, {
  "acc_x": -858.575,
  "acc_y": -473.726,
  "acc_z": -412.482,
  "angle": 0,
  "dev": "B",
  "gyr_x": -29.4,
  "gyr_y": -66.99,
  "gyr_z": 259.91,
  "sample": 0,
  "time": 15.596
}, {
  "acc_x": -597.373,
  "acc_y": 129.564,
  "acc_z": -315.126,
  "angle": 0,
  "dev": "A",
  "gyr_x": 21.07,
  "gyr_y": 45.01,
  "gyr_z": 7.42,
  "sample": 0,
  "time": 15.607
}, {
  "acc_x": -937.997,
  "acc_y": -410.469,
  "acc_z": -346.724,
  "angle": 1.205396214099978e+238,
  "dev": "B",
  "gyr_x": -10.43,
  "gyr_y": -77.91,
  "gyr_z": 272.51,
  "sample": 1.2053961611084846e+238,
  "time": 15.616
}, {
  "acc_x": -1080.676,
  "acc_y": -327.509,
  "acc_z": -182.329,
  "angle": -8074376.34237,
  "dev": "B",
  "gyr_x": 15.47,
  "gyr_y": -79.66,
  "gyr_z": 286.72,
  "sample": -8074376,
  "time": 15.635000000000002
}, {
  "acc_x": -619.455,
  "acc_y": 118.035,
  "acc_z": -269.559,
  "angle": -8074376.34265,
  "dev": "A",
  "gyr_x": -7.91,
  "gyr_y": 55.37,
  "gyr_z": -10.01,
  "sample": -8074376,
  "time": 15.626000000000001
}, {
  "acc_x": -721.325,
  "acc_y": 307.013,
  "acc_z": -48.861,
  "angle": 1.0850478188319705e+161,
  "dev": "A",
  "gyr_x": -36.4,
  "gyr_y": 59.43,
  "gyr_z": -25.83,
  "sample": 1.0850477729111121e+161,
  "time": 15.646
}, {
  "acc_x": -1235.921,
  "acc_y": -215.025,
  "acc_z": -198.067,
  "angle": 0,
  "dev": "B",
  "gyr_x": 26.11,
  "gyr_y": -67.06,
  "gyr_z": 292.11,
  "sample": 0,
  "time": 15.655000000000001
}, {
  "acc_x": -888.221,
  "acc_y": 559.431,
  "acc_z": -23.302,
  "angle": -8074376.34251,
  "dev": "A",
  "gyr_x": -70.42,
  "gyr_y": 54.11,
  "gyr_z": -42.42,
  "sample": -8074376,
  "time": 15.665
}, {
  "acc_x": -1294.176,
  "acc_y": -98.942,
  "acc_z": -200.507,
  "angle": 9.031352609405281e+83,
  "dev": "B",
  "gyr_x": 27.37,
  "gyr_y": -56.14,
  "gyr_z": 282.1,
  "sample": 9.031352213939889e+83,
  "time": 15.675
}, {
  "acc_x": -892.796,
  "acc_y": 892.247,
  "acc_z": 45.689,
  "angle": -8074376.34265,
  "dev": "A",
  "gyr_x": -97.09,
  "gyr_y": 35.49,
  "gyr_z": -48.86,
  "sample": -8074376,
  "time": 15.684000000000001
}, {
  "acc_x": -905.789,
  "acc_y": 1090.619,
  "acc_z": 379.176,
  "angle": -8074376.34264,
  "dev": "A",
  "gyr_x": -45.22,
  "gyr_y": 2.45,
  "gyr_z": -18.41,
  "sample": -8074376,
  "time": 15.704
}, {
  "acc_x": -1245.986,
  "acc_y": 224.541,
  "acc_z": -13.237,
  "angle": 1.0745066001926623e+161,
  "dev": "B",
  "gyr_x": 38.92,
  "gyr_y": -49.56,
  "gyr_z": 258.09,
  "sample": 1.0745065543165922e+161,
  "time": 15.693999999999999
}, {
  "acc_x": -976.549,
  "acc_y": 386.923,
  "acc_z": 204.594,
  "angle": -8079692.34264,
  "dev": "B",
  "gyr_x": 27.23,
  "gyr_y": -39.69,
  "gyr_z": 213.99,
  "sample": 9.031352213939891e+83,
  "time": 15.713000000000001
}, {
  "acc_x": -875.167,
  "acc_y": 61.427,
  "acc_z": -120.048,
  "angle": 0,
  "dev": "B",
  "gyr_x": -14.56,
  "gyr_y": -21.63,
  "gyr_z": 151.9,
  "sample": 0,
  "time": 15.732
}, {
  "acc_x": -1009.306,
  "acc_y": 1227.259,
  "acc_z": 620.431,
  "angle": 0,
  "dev": "A",
  "gyr_x": -9.31,
  "gyr_y": -0.42,
  "gyr_z": 7.14,
  "sample": 0,
  "time": 15.722999999999999
}, {
  "acc_x": -1076.833,
  "acc_y": 974.414,
  "acc_z": 289.14,
  "angle": 0,
  "dev": "A",
  "gyr_x": -76.09,
  "gyr_y": 8.47,
  "gyr_z": 8.89,
  "sample": 0,
  "time": 15.742
}, {
  "acc_x": -865.163,
  "acc_y": 126.758,
  "acc_z": -168.97,
  "angle": 9.031352609404366e+83,
  "dev": "B",
  "gyr_x": -32.34,
  "gyr_y": -7,
  "gyr_z": 80.22,
  "sample": 9.031352213939893e+83,
  "time": 15.751000000000001
}, {
  "acc_x": -917.867,
  "acc_y": 549.549,
  "acc_z": 77.287,
  "angle": 0,
  "dev": "A",
  "gyr_x": -86.59,
  "gyr_y": 15.89,
  "gyr_z": 15.12,
  "sample": 0,
  "time": 15.763000000000002
}, {
  "acc_x": -928.176,
  "acc_y": 5.368,
  "acc_z": -144.143,
  "angle": 0,
  "dev": "B",
  "gyr_x": -22.26,
  "gyr_y": 3.01,
  "gyr_z": 8.05,
  "sample": 0,
  "time": 15.771
}, {
  "acc_x": -872.544,
  "acc_y": -94.916,
  "acc_z": -116.083,
  "angle": 1.0825459218929696e+161,
  "dev": "B",
  "gyr_x": -38.15,
  "gyr_y": 13.02,
  "gyr_z": -57.05,
  "sample": 1.0825458759513864e+161,
  "time": 15.791
}, {
  "acc_x": -742.004,
  "acc_y": 375.76,
  "acc_z": -50.264,
  "angle": 9.031352609416962e+83,
  "dev": "A",
  "gyr_x": -50.82,
  "gyr_y": 28.77,
  "gyr_z": 31.5,
  "sample": 9.031352213939889e+83,
  "time": 15.782
}, {
  "acc_x": -713.273,
  "acc_y": 166.103,
  "acc_z": -239.364,
  "angle": -1.2049944224535441e+238,
  "dev": "A",
  "gyr_x": -19.11,
  "gyr_y": 38.57,
  "gyr_z": 36.12,
  "sample": 0,
  "time": 15.801000000000002
}, {
  "acc_x": -910.486,
  "acc_y": -159.088,
  "acc_z": -353.556,
  "angle": 9.031352609416962e+83,
  "dev": "B",
  "gyr_x": -67.06,
  "gyr_y": 26.04,
  "gyr_z": -107.52,
  "sample": 8018004,
  "time": 15.810000000000002
}, {
  "acc_x": -831.857,
  "acc_y": -10.797,
  "acc_z": -633.058,
  "angle": 0,
  "dev": "A",
  "gyr_x": -6.65,
  "gyr_y": 61.67,
  "gyr_z": 18.27,
  "sample": 0,
  "time": 15.821000000000002
}, {
  "acc_x": -970.327,
  "acc_y": 756.156,
  "acc_z": -333.121,
  "angle": 0,
  "dev": "B",
  "gyr_x": -73.29,
  "gyr_y": 46.34,
  "gyr_z": -121.66,
  "sample": 0,
  "time": 15.829
}, {
  "acc_x": -1669.875,
  "acc_y": 648.186,
  "acc_z": 338.733,
  "angle": 0,
  "dev": "B",
  "gyr_x": -31.22,
  "gyr_y": 37.87,
  "gyr_z": -70.21,
  "sample": 12565871717255342,
  "time": 15.849
}, {
  "acc_x": -1140.578,
  "acc_y": 802.943,
  "acc_z": 0.61,
  "angle": 1.0825459218882106e+161,
  "dev": "A",
  "gyr_x": 11.34,
  "gyr_y": 84.84,
  "gyr_z": -4.2,
  "sample": 1.0825458759513861e+161,
  "time": 15.84
}, {
  "acc_x": -1740.513,
  "acc_y": 1635.288,
  "acc_z": 560.407,
  "angle": 0,
  "dev": "A",
  "gyr_x": -38.01,
  "gyr_y": 45.99,
  "gyr_z": -31.29,
  "sample": 0,
  "time": 15.859000000000002
}, {
  "acc_x": -1378.905,
  "acc_y": 259.433,
  "acc_z": 10.309,
  "angle": -8074376.34251,
  "dev": "B",
  "gyr_x": -36.54,
  "gyr_y": 31.99,
  "gyr_z": -66.64,
  "sample": -8074376,
  "time": 15.868000000000002
}, {
  "acc_x": -1487.363,
  "acc_y": 41.907,
  "acc_z": -253.272,
  "angle": 0,
  "dev": "A",
  "gyr_x": -88.76,
  "gyr_y": 55.16,
  "gyr_z": -37.66,
  "sample": 0,
  "time": 15.879000000000001
}, {
  "acc_x": -1384.395,
  "acc_y": -295.179,
  "acc_z": 192.577,
  "angle": -1.256463502418003e+238,
  "dev": "B",
  "gyr_x": -85.12,
  "gyr_y": 40.81,
  "gyr_z": -107.38,
  "sample": -1.2564634492221523e+238,
  "time": 15.887
}, {
  "acc_x": -1040.721,
  "acc_y": -23.058,
  "acc_z": -168.116,
  "angle": -1.2564628813876341e+238,
  "dev": "B",
  "gyr_x": -121.59,
  "gyr_y": 42.7,
  "gyr_z": -126.84,
  "sample": -1.2564628282149155e+238,
  "time": 15.906000000000002
}, {
  "acc_x": -665.083,
  "acc_y": -327.448,
  "acc_z": -478.057,
  "angle": 1.2098624981578541e+238,
  "dev": "A",
  "gyr_x": -22.26,
  "gyr_y": 59.22,
  "gyr_z": -11.97,
  "sample": 1.2098624451564166e+238,
  "time": 15.899000000000001
}, {
  "acc_x": -339.648,
  "acc_y": 165.554,
  "acc_z": -632.57,
  "angle": 1.2098624981805628e+238,
  "dev": "A",
  "gyr_x": 0.42,
  "gyr_y": 38.99,
  "gyr_z": -20.51,
  "sample": 0,
  "time": 15.918
}, {
  "acc_x": -738.588,
  "acc_y": -438.041,
  "acc_z": -595.299,
  "angle": 0,
  "dev": "B",
  "gyr_x": -133.7,
  "gyr_y": 39.97,
  "gyr_z": -129.29,
  "sample": 0,
  "time": 15.927
}, {
  "acc_x": -583.709,
  "acc_y": -124.745,
  "acc_z": -895.358,
  "angle": 8018008.34262,
  "dev": "A",
  "gyr_x": -20.09,
  "gyr_y": 37.38,
  "gyr_z": -32.69,
  "sample": 8018008,
  "time": 15.938000000000002
}, {
  "acc_x": -629.703,
  "acc_y": -501.42,
  "acc_z": -1130.818,
  "angle": -1.0853787235536206e+161,
  "dev": "B",
  "gyr_x": -117.04,
  "gyr_y": 34.3,
  "gyr_z": -115.85,
  "sample": -1.0853786776108257e+161,
  "time": 15.946000000000002
}, {
  "acc_x": -957.151,
  "acc_y": -831.491,
  "acc_z": -700.646,
  "angle": 0,
  "dev": "B",
  "gyr_x": -27.86,
  "gyr_y": 39.76,
  "gyr_z": -86.73,
  "sample": 8018008,
  "time": 15.965
}, {
  "acc_x": -919.148,
  "acc_y": 81.435,
  "acc_z": -741.028,
  "angle": 0,
  "dev": "A",
  "gyr_x": 26.04,
  "gyr_y": 48.79,
  "gyr_z": -10.99,
  "sample": 0,
  "time": 15.957
}, {
  "acc_x": -992.287,
  "acc_y": 327.692,
  "acc_z": -501.725,
  "angle": 0,
  "dev": "A",
  "gyr_x": 37.1,
  "gyr_y": 42.07,
  "gyr_z": -15.47,
  "sample": 0,
  "time": 15.975999999999999
}, {
  "acc_x": -1104.893,
  "acc_y": -218.807,
  "acc_z": 14.823,
  "angle": -8074376.34262,
  "dev": "B",
  "gyr_x": 61.53,
  "gyr_y": 15.75,
  "gyr_z": -64.33,
  "sample": -8074376,
  "time": 15.985
}, {
  "acc_x": -980.026,
  "acc_y": 306.403,
  "acc_z": 64.233,
  "angle": -8074376.34264,
  "dev": "B",
  "gyr_x": 86.31,
  "gyr_y": 6.93,
  "gyr_z": -57.61,
  "sample": -8074376,
  "time": 16.004
}, {
  "acc_x": -880.23,
  "acc_y": 246.074,
  "acc_z": -409.31,
  "angle": 1.0745066002235501e+161,
  "dev": "A",
  "gyr_x": 26.18,
  "gyr_y": 42.77,
  "gyr_z": -29.61,
  "sample": 1.0745065543165935e+161,
  "time": 15.996000000000002
}, {
  "acc_x": -948.489,
  "acc_y": -113.704,
  "acc_z": -219.234,
  "angle": -1.0763584866894597e+161,
  "dev": "B",
  "gyr_x": 10.29,
  "gyr_y": 20.16,
  "gyr_z": -57.82,
  "sample": -1.076358440747878e+161,
  "time": 16.023
}, {
  "acc_x": -854.671,
  "acc_y": 209.779,
  "acc_z": -469.822,
  "angle": 0,
  "dev": "A",
  "gyr_x": 23.87,
  "gyr_y": 45.92,
  "gyr_z": -38.01,
  "sample": 0,
  "time": 16.015
}, {
  "acc_x": -973.621,
  "acc_y": -359.29,
  "acc_z": -401.685,
  "angle": 0,
  "dev": "B",
  "gyr_x": -32.76,
  "gyr_y": 24.08,
  "gyr_z": -54.46,
  "sample": 0,
  "time": 16.042
}, {
  "acc_x": -1015.65,
  "acc_y": -379.237,
  "acc_z": -427.244,
  "angle": 0,
  "dev": "B",
  "gyr_x": -0.49,
  "gyr_y": 19.81,
  "gyr_z": -44.17,
  "sample": 0,
  "time": 16.063000000000002
}, {
  "acc_x": -864.065,
  "acc_y": 131.394,
  "acc_z": -486.78,
  "angle": -1.0763584866847006e+161,
  "dev": "A",
  "gyr_x": 25.34,
  "gyr_y": 46.41,
  "gyr_z": -42.35,
  "sample": -1.0763584407478774e+161,
  "time": 16.035
}, {
  "acc_x": -834.541,
  "acc_y": 110.837,
  "acc_z": -567.91,
  "angle": 0,
  "dev": "A",
  "gyr_x": 36.4,
  "gyr_y": 47.46,
  "gyr_z": -39.27,
  "sample": 0,
  "time": 16.055
}, {
  "acc_x": -987.834,
  "acc_y": -52.216,
  "acc_z": -373.808,
  "angle": 0,
  "dev": "B",
  "gyr_x": 49.63,
  "gyr_y": 14.42,
  "gyr_z": -35.84,
  "sample": 0,
  "time": 16.082
}, {
  "acc_x": -812.703,
  "acc_y": 282.918,
  "acc_z": -568.154,
  "angle": 0,
  "dev": "A",
  "gyr_x": 62.3,
  "gyr_y": 42.84,
  "gyr_z": -29.4,
  "sample": 0,
  "time": 16.074
}, {
  "acc_x": -793.488,
  "acc_y": 354.41,
  "acc_z": -546.682,
  "angle": -1.0763584866855138e+161,
  "dev": "A",
  "gyr_x": 77.7,
  "gyr_y": 34.86,
  "gyr_z": -22.26,
  "sample": -1.0763584407478778e+161,
  "time": 16.094
}, {
  "acc_x": -984.296,
  "acc_y": 144.997,
  "acc_z": -242.597,
  "angle": 0,
  "dev": "B",
  "gyr_x": 71.96,
  "gyr_y": 9.31,
  "gyr_z": -30.52,
  "sample": 0,
  "time": 16.101
}, {
  "acc_x": -955.138,
  "acc_y": 104.249,
  "acc_z": -260.531,
  "angle": 0,
  "dev": "B",
  "gyr_x": 50.47,
  "gyr_y": 8.26,
  "gyr_z": -31.08,
  "sample": 0,
  "time": 16.12
}, {
  "acc_x": -765.977,
  "acc_y": 380.579,
  "acc_z": -508.252,
  "angle": -1.0763584866855138e+161,
  "dev": "A",
  "gyr_x": 80.5,
  "gyr_y": 30.17,
  "gyr_z": -19.81,
  "sample": -1.0763584407478779e+161,
  "time": 16.113
}, {
  "acc_x": -771.528,
  "acc_y": 387.594,
  "acc_z": -497.15,
  "angle": 0,
  "dev": "A",
  "gyr_x": 76.86,
  "gyr_y": 23.31,
  "gyr_z": -22.05,
  "sample": 0,
  "time": 16.132
}, {
  "acc_x": -946.903,
  "acc_y": -162.626,
  "acc_z": -374.174,
  "angle": 0,
  "dev": "B",
  "gyr_x": 23.03,
  "gyr_y": 8.26,
  "gyr_z": -31.5,
  "sample": 0,
  "time": 16.14
}, {
  "acc_x": -791.048,
  "acc_y": 364.902,
  "acc_z": -485.804,
  "angle": 0,
  "dev": "A",
  "gyr_x": 72.73,
  "gyr_y": 16.03,
  "gyr_z": -24.92,
  "sample": 0,
  "time": 16.152
}, {
  "acc_x": -933.056,
  "acc_y": 0.793,
  "acc_z": -304.329,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.16,
  "gyr_y": 6.86,
  "gyr_z": -28.42,
  "sample": 0,
  "time": 16.159
}, {
  "acc_x": -918.904,
  "acc_y": 127.612,
  "acc_z": -298.656,
  "angle": 1.074506600258176e+161,
  "dev": "B",
  "gyr_x": 50.19,
  "gyr_y": 9.73,
  "gyr_z": -26.88,
  "sample": 1.0745065543165954e+161,
  "time": 16.178
}, {
  "acc_x": -757.986,
  "acc_y": 407.358,
  "acc_z": -472.079,
  "angle": 0,
  "dev": "A",
  "gyr_x": 69.79,
  "gyr_y": 8.75,
  "gyr_z": -26.11,
  "sample": 0,
  "time": 16.171
}, {
  "acc_x": -768.783,
  "acc_y": 391.62,
  "acc_z": -474.153,
  "angle": 0,
  "dev": "A",
  "gyr_x": 68.11,
  "gyr_y": 2.73,
  "gyr_z": -25.34,
  "sample": 0,
  "time": 16.191
}, {
  "acc_x": -956.907,
  "acc_y": 50.386,
  "acc_z": -285.114,
  "angle": -1.0777287646611126e+161,
  "dev": "B",
  "gyr_x": 51.66,
  "gyr_y": 15.47,
  "gyr_z": -28,
  "sample": 0,
  "time": 16.197
}, {
  "acc_x": -784.46,
  "acc_y": 337.147,
  "acc_z": -465.979,
  "angle": 0,
  "dev": "A",
  "gyr_x": 66.64,
  "gyr_y": -3.43,
  "gyr_z": -25.34,
  "sample": 1.2508861832273728e+238,
  "time": 16.211000000000002
}, {
  "acc_x": -926.956,
  "acc_y": -19.032,
  "acc_z": -337.33,
  "angle": 0,
  "dev": "B",
  "gyr_x": 47.95,
  "gyr_y": 15.61,
  "gyr_z": -30.24,
  "sample": 0,
  "time": 16.218
}, {
  "acc_x": -942.877,
  "acc_y": 31.659,
  "acc_z": -268.827,
  "angle": -1.0763584866702057e+161,
  "dev": "B",
  "gyr_x": 47.81,
  "gyr_y": 14.35,
  "gyr_z": -31.99,
  "sample": -1.0763584407478794e+161,
  "time": 16.237000000000002
}, {
  "acc_x": -765.428,
  "acc_y": 322.385,
  "acc_z": -449.265,
  "angle": 0,
  "dev": "A",
  "gyr_x": 67.27,
  "gyr_y": -7.56,
  "gyr_z": -25.9,
  "sample": 9.350340893054442e+83,
  "time": 16.23
}, {
  "acc_x": -814.716,
  "acc_y": 303.292,
  "acc_z": -459.147,
  "angle": -1.2564635023430108e+238,
  "dev": "A",
  "gyr_x": 69.65,
  "gyr_y": -7.98,
  "gyr_z": -25.34,
  "sample": -1.2564634492221542e+238,
  "time": 16.249000000000002
}, {
  "acc_x": -817.4,
  "acc_y": 238.754,
  "acc_z": -416.569,
  "angle": 0,
  "dev": "A",
  "gyr_x": 63.77,
  "gyr_y": -5.88,
  "gyr_z": -26.46,
  "sample": 0,
  "time": 16.269000000000002
}, {
  "acc_x": -937.509,
  "acc_y": 28.304,
  "acc_z": -279.929,
  "angle": 9.343236287189107e+83,
  "dev": "B",
  "gyr_x": 45.15,
  "gyr_y": 13.23,
  "gyr_z": -33.88,
  "sample": 9.343235890458848e+83,
  "time": 16.256
}, {
  "acc_x": -940.498,
  "acc_y": -108.092,
  "acc_z": -279.319,
  "angle": 9.343236287228551e+83,
  "dev": "B",
  "gyr_x": 33.11,
  "gyr_y": 10.01,
  "gyr_z": -36.75,
  "sample": 9.343235890458849e+83,
  "time": 16.275000000000002
}, {
  "acc_x": -935.801,
  "acc_y": -46.116,
  "acc_z": -277.794,
  "angle": 0,
  "dev": "B",
  "gyr_x": 33.18,
  "gyr_y": 8.61,
  "gyr_z": -38.57,
  "sample": -1.0777292550306371e+161,
  "time": 16.295
}, {
  "acc_x": -817.4,
  "acc_y": 278.465,
  "acc_z": -436.882,
  "angle": 0,
  "dev": "A",
  "gyr_x": 63.42,
  "gyr_y": -4.41,
  "gyr_z": -27.09,
  "sample": 0,
  "time": 16.288
}, {
  "acc_x": -784.094,
  "acc_y": 334.646,
  "acc_z": -400.526,
  "angle": -1.0763584866702057e+161,
  "dev": "A",
  "gyr_x": 61.74,
  "gyr_y": -4.27,
  "gyr_z": -26.88,
  "sample": -1.0763584407478792e+161,
  "time": 16.307000000000002
}, {
  "acc_x": -922.259,
  "acc_y": -7.076,
  "acc_z": -278.648,
  "angle": -9.373629394801088e+83,
  "dev": "B",
  "gyr_x": 38.01,
  "gyr_y": 9.45,
  "gyr_z": -39.27,
  "sample": -8037908,
  "time": 16.314
}, {
  "acc_x": -809.226,
  "acc_y": 360.266,
  "acc_z": -357.399,
  "angle": 0,
  "dev": "A",
  "gyr_x": 59.36,
  "gyr_y": -4.83,
  "gyr_z": -26.81,
  "sample": 0,
  "time": 16.328
}, {
  "acc_x": -937.753,
  "acc_y": 49.227,
  "acc_z": -272.182,
  "angle": -9.373629394794618e+83,
  "dev": "B",
  "gyr_x": 35.35,
  "gyr_y": 11.48,
  "gyr_z": -42.28,
  "sample": -9.373628998041863e+83,
  "time": 16.333000000000002
}, {
  "acc_x": -946.232,
  "acc_y": 35.258,
  "acc_z": -296.094,
  "angle": -1.0777293009682711e+161,
  "dev": "B",
  "gyr_x": 30.17,
  "gyr_y": 12.39,
  "gyr_z": -47.04,
  "sample": -1.0777292550306375e+161,
  "time": 16.353
}, {
  "acc_x": -831.613,
  "acc_y": 389.302,
  "acc_z": -407.053,
  "angle": 0,
  "dev": "A",
  "gyr_x": 55.09,
  "gyr_y": -4.97,
  "gyr_z": -24.71,
  "sample": 0,
  "time": 16.347
}, {
  "acc_x": -835.334,
  "acc_y": 386.252,
  "acc_z": -368.745,
  "angle": 8086352.34261,
  "dev": "A",
  "gyr_x": 50.82,
  "gyr_y": -4.9,
  "gyr_z": -21.49,
  "sample": 8086352,
  "time": 16.366
}, {
  "acc_x": -968.314,
  "acc_y": 58.133,
  "acc_z": -311.954,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.01,
  "gyr_y": 12.39,
  "gyr_z": -52.22,
  "sample": 0,
  "time": 16.373
}, {
  "acc_x": -966.972,
  "acc_y": 83.204,
  "acc_z": -286.761,
  "angle": -1.2564628814062665e+238,
  "dev": "B",
  "gyr_x": 35,
  "gyr_y": 9.73,
  "gyr_z": -57.4,
  "sample": 0,
  "time": 16.392
}, {
  "acc_x": -846.558,
  "acc_y": 400.526,
  "acc_z": -379.481,
  "angle": -1.079539355043972e+161,
  "dev": "A",
  "gyr_x": 51.73,
  "gyr_y": -6.02,
  "gyr_z": -17.15,
  "sample": -1.0795393091011792e+161,
  "time": 16.386
}, {
  "acc_x": -971.181,
  "acc_y": 26.535,
  "acc_z": -244.061,
  "angle": -7798964.34154,
  "dev": "B",
  "gyr_x": 32.55,
  "gyr_y": 11.34,
  "gyr_z": -63.63,
  "sample": -7798964,
  "time": 16.411
}, {
  "acc_x": -816.851,
  "acc_y": 367.342,
  "acc_z": -326.472,
  "angle": 0,
  "dev": "A",
  "gyr_x": 42.63,
  "gyr_y": -6.37,
  "gyr_z": -11.83,
  "sample": 0,
  "time": 16.405
}, {
  "acc_x": -841.434,
  "acc_y": 343.735,
  "acc_z": -333.914,
  "angle": -1.0777293009529631e+161,
  "dev": "A",
  "gyr_x": 35.91,
  "gyr_y": -7.84,
  "gyr_z": -6.72,
  "sample": -1.0777292550306372e+161,
  "time": 16.424
}, {
  "acc_x": -881.633,
  "acc_y": 337.147,
  "acc_z": -384.422,
  "angle": -1.0758082302531197e+161,
  "dev": "A",
  "gyr_x": 34.51,
  "gyr_y": -10.78,
  "gyr_z": -2.52,
  "sample": -1.0758081843104352e+161,
  "time": 16.444
}, {
  "acc_x": -977.83,
  "acc_y": 26.291,
  "acc_z": -256.566,
  "angle": 0,
  "dev": "B",
  "gyr_x": 31.01,
  "gyr_y": 13.86,
  "gyr_z": -70.21,
  "sample": -1.2564628282149194e+238,
  "time": 16.43
}, {
  "acc_x": -1004.121,
  "acc_y": -130.601,
  "acc_z": -266.082,
  "angle": -1.0795393549772455e+161,
  "dev": "B",
  "gyr_x": 28.56,
  "gyr_y": 15.33,
  "gyr_z": -77.07,
  "sample": -1.0795393091011804e+161,
  "time": 16.45
}, {
  "acc_x": -1078.114,
  "acc_y": -143.106,
  "acc_z": -251.198,
  "angle": -1.2528237789987117e+238,
  "dev": "B",
  "gyr_x": 30.73,
  "gyr_y": 16.31,
  "gyr_z": -82.46,
  "sample": -7798964,
  "time": 16.469
}, {
  "acc_x": -900.482,
  "acc_y": 429.379,
  "acc_z": -386.252,
  "angle": -1.0777293009716017e+161,
  "dev": "A",
  "gyr_x": 36.26,
  "gyr_y": -15.75,
  "gyr_z": -1.33,
  "sample": -1.0777292550306375e+161,
  "time": 16.464000000000002
}, {
  "acc_x": -1164.002,
  "acc_y": -80.459,
  "acc_z": -246.562,
  "angle": 30.19072,
  "dev": "B",
  "gyr_x": 33.25,
  "gyr_y": 17.92,
  "gyr_z": -87.71,
  "sample": -7798964,
  "time": 16.488
}, {
  "acc_x": -1245.742,
  "acc_y": -127.734,
  "acc_z": -232.288,
  "angle": -1.0777293009529631e+161,
  "dev": "B",
  "gyr_x": 30.73,
  "gyr_y": 19.53,
  "gyr_z": -94.08,
  "sample": -1.0777292550306385e+161,
  "time": 16.508
}, {
  "acc_x": -978.257,
  "acc_y": 476.959,
  "acc_z": -375.638,
  "angle": 0,
  "dev": "A",
  "gyr_x": 32.41,
  "gyr_y": -14.14,
  "gyr_z": -0.77,
  "sample": 0,
  "time": 16.483
}, {
  "acc_x": -978.745,
  "acc_y": 630.313,
  "acc_z": -375.455,
  "angle": -1.2040430393659669e+238,
  "dev": "A",
  "gyr_x": 30.31,
  "gyr_y": -16.8,
  "gyr_z": 0.49,
  "sample": -1.2040429863392411e+238,
  "time": 16.503
}, {
  "acc_x": -1092.998,
  "acc_y": 688.568,
  "acc_z": -229.665,
  "angle": -1.0758082302513995e+161,
  "dev": "A",
  "gyr_x": 28.7,
  "gyr_y": -27.79,
  "gyr_z": 2.1,
  "sample": -1.0758081843104357e+161,
  "time": 16.522000000000002
}, {
  "acc_x": -1335.29,
  "acc_y": 67.649,
  "acc_z": -168.055,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.52,
  "gyr_y": 17.71,
  "gyr_z": -101.36,
  "sample": -1.2485896984652448e+238,
  "time": 16.528000000000002
}, {
  "acc_x": -1284.111,
  "acc_y": 661.301,
  "acc_z": 4.209,
  "angle": 0,
  "dev": "A",
  "gyr_x": 5.67,
  "gyr_y": -43.61,
  "gyr_z": 9.66,
  "sample": 1.0847737173170298e+161,
  "time": 16.542
}, {
  "acc_x": -1295.579,
  "acc_y": 566.995,
  "acc_z": 183.61,
  "angle": 0,
  "dev": "A",
  "gyr_x": -19.81,
  "gyr_y": -66.57,
  "gyr_z": 24.5,
  "sample": 0,
  "time": 16.561
}, {
  "acc_x": -1181.265,
  "acc_y": 355.508,
  "acc_z": 133.895,
  "angle": 0,
  "dev": "A",
  "gyr_x": -21.28,
  "gyr_y": -95.27,
  "gyr_z": 41.3,
  "sample": 0,
  "time": 16.580000000000002
}, {
  "acc_x": -1066.707,
  "acc_y": 283.467,
  "acc_z": -80.764,
  "angle": -9.027610209105494e+83,
  "dev": "A",
  "gyr_x": 2.31,
  "gyr_y": -118.3,
  "gyr_z": 59.43,
  "sample": -9.027609813615784e+83,
  "time": 16.601
}, {
  "acc_x": -1152.717,
  "acc_y": 235.216,
  "acc_z": -381.311,
  "angle": 0,
  "dev": "A",
  "gyr_x": 26.32,
  "gyr_y": -122.71,
  "gyr_z": 78.4,
  "sample": 0,
  "time": 16.62
}, {
  "acc_x": -1331.508,
  "acc_y": 120.353,
  "acc_z": -517.402,
  "angle": 0,
  "dev": "A",
  "gyr_x": 31.43,
  "gyr_y": -111.23,
  "gyr_z": 88.62,
  "sample": 0,
  "time": 16.639
}, {
  "acc_x": -1467.05,
  "acc_y": 113.948,
  "acc_z": -46.726,
  "angle": 0,
  "dev": "B",
  "gyr_x": 30.17,
  "gyr_y": 15.33,
  "gyr_z": -110.39,
  "sample": 0,
  "time": 16.547
}, {
  "acc_x": -1621.075,
  "acc_y": 90.768,
  "acc_z": 40.687,
  "angle": 0,
  "dev": "B",
  "gyr_x": 41.02,
  "gyr_y": 19.32,
  "gyr_z": -118.93,
  "sample": 0,
  "time": 16.566
}, {
  "acc_x": -1639.924,
  "acc_y": 182.573,
  "acc_z": 100.589,
  "angle": 1.2456188530182371e+238,
  "dev": "B",
  "gyr_x": 77.49,
  "gyr_y": 29.61,
  "gyr_z": -121.66,
  "sample": 0,
  "time": 16.585
}, {
  "acc_x": -1280.329,
  "acc_y": 61.488,
  "acc_z": -488.793,
  "angle": -1.2504887917869499e+238,
  "dev": "A",
  "gyr_x": 18.69,
  "gyr_y": -102.13,
  "gyr_z": 85.4,
  "sample": -1.2504887385957472e+238,
  "time": 16.659
}, {
  "acc_x": -1311.317,
  "acc_y": 120.231,
  "acc_z": -218.807,
  "angle": 0,
  "dev": "B",
  "gyr_x": 110.25,
  "gyr_y": 38.71,
  "gyr_z": -123.27,
  "sample": 0,
  "time": 16.605
}, {
  "acc_x": -1176.69,
  "acc_y": -268.766,
  "acc_z": -421.144,
  "angle": 0,
  "dev": "B",
  "gyr_x": 96.39,
  "gyr_y": 48.72,
  "gyr_z": -125.09,
  "sample": 0,
  "time": 16.624000000000002
}, {
  "acc_x": -1243.058,
  "acc_y": 128.344,
  "acc_z": -466.223,
  "angle": 0,
  "dev": "A",
  "gyr_x": -7.77,
  "gyr_y": -96.67,
  "gyr_z": 78.12,
  "sample": -7792376,
  "time": 16.678
}, {
  "acc_x": -1248.243,
  "acc_y": 104.432,
  "acc_z": -455.914,
  "angle": -1.256462881379773e+238,
  "dev": "A",
  "gyr_x": -38.29,
  "gyr_y": -90.23,
  "gyr_z": 71.68,
  "sample": -1.2564628282149206e+238,
  "time": 16.697
}, {
  "acc_x": -975.451,
  "acc_y": -397.11,
  "acc_z": -366.061,
  "angle": 0,
  "dev": "B",
  "gyr_x": 55.79,
  "gyr_y": 52.99,
  "gyr_z": -122.57,
  "sample": 0,
  "time": 16.644000000000002
}, {
  "acc_x": -820.206,
  "acc_y": -506.3,
  "acc_z": -268.217,
  "angle": 0,
  "dev": "B",
  "gyr_x": 34.02,
  "gyr_y": 49,
  "gyr_z": -99.33,
  "sample": 0,
  "time": 16.663
}, {
  "acc_x": -672.525,
  "acc_y": -762.561,
  "acc_z": -326.899,
  "angle": 0,
  "dev": "B",
  "gyr_x": 29.26,
  "gyr_y": 36.19,
  "gyr_z": -63.56,
  "sample": 0,
  "time": 16.683
}, {
  "acc_x": -517.524,
  "acc_y": -1122.034,
  "acc_z": -429.928,
  "angle": 0,
  "dev": "B",
  "gyr_x": 17.71,
  "gyr_y": 23.03,
  "gyr_z": -31.01,
  "sample": 0,
  "time": 16.702
}, {
  "acc_x": -1176.08,
  "acc_y": 137.372,
  "acc_z": -448.106,
  "angle": -7761476.34154,
  "dev": "A",
  "gyr_x": -57.19,
  "gyr_y": -87.36,
  "gyr_z": 61.39,
  "sample": -7761476,
  "time": 16.717000000000002
}, {
  "acc_x": -412.787,
  "acc_y": -910.608,
  "acc_z": -669.78,
  "angle": 0,
  "dev": "B",
  "gyr_x": 19.6,
  "gyr_y": 15.96,
  "gyr_z": -8.12,
  "sample": 0,
  "time": 16.721
}, {
  "acc_x": -1087.386,
  "acc_y": 189.1,
  "acc_z": -480.07,
  "angle": -1.075808230188525e+161,
  "dev": "A",
  "gyr_x": -66.57,
  "gyr_y": -77.14,
  "gyr_z": 55.72,
  "sample": -1.0758081843104371e+161,
  "time": 16.736
}, {
  "acc_x": -995.459,
  "acc_y": 96.929,
  "acc_z": -454.633,
  "angle": 0,
  "dev": "A",
  "gyr_x": -72.38,
  "gyr_y": -61.18,
  "gyr_z": 53.41,
  "sample": -8075400,
  "time": 16.756
}, {
  "acc_x": -935.008,
  "acc_y": 42.029,
  "acc_z": -357.887,
  "angle": -7792376.34139,
  "dev": "A",
  "gyr_x": -70.7,
  "gyr_y": -49.63,
  "gyr_z": 49.63,
  "sample": -1.2564628282149212e+238,
  "time": 16.776
}, {
  "acc_x": -351.97,
  "acc_y": -275.659,
  "acc_z": -212.097,
  "angle": -1.256462881379773e+238,
  "dev": "B",
  "gyr_x": 49.91,
  "gyr_y": 15.19,
  "gyr_z": 19.95,
  "sample": -1.2564628282149218e+238,
  "time": 16.740000000000002
}, {
  "acc_x": -236.924,
  "acc_y": -292.678,
  "acc_z": 94.916,
  "angle": -1.2108536259027467e+238,
  "dev": "B",
  "gyr_x": 69.72,
  "gyr_y": -4.27,
  "gyr_z": 63.35,
  "sample": -1.2108535727065486e+238,
  "time": 16.76
}, {
  "acc_x": -314.821,
  "acc_y": -513.559,
  "acc_z": -65.026,
  "angle": -1.0777293009733219e+161,
  "dev": "B",
  "gyr_x": 17.22,
  "gyr_y": -11.06,
  "gyr_z": 102.27,
  "sample": 0,
  "time": 16.78
}, {
  "acc_x": -427.915,
  "acc_y": -674.05,
  "acc_z": -251.32,
  "angle": -9.031959359816713e+83,
  "dev": "B",
  "gyr_x": -35.56,
  "gyr_y": -14,
  "gyr_z": 136.43,
  "sample": -9.031958964487555e+83,
  "time": 16.799
}, {
  "acc_x": -870.897,
  "acc_y": 57.767,
  "acc_z": -320.677,
  "angle": 0,
  "dev": "A",
  "gyr_x": -66.78,
  "gyr_y": -39.55,
  "gyr_z": 46.27,
  "sample": 0,
  "time": 16.795
}, {
  "acc_x": -804.163,
  "acc_y": -28.304,
  "acc_z": -338.977,
  "angle": -9.03080143892434e+83,
  "dev": "A",
  "gyr_x": -61.04,
  "gyr_y": -31.08,
  "gyr_z": 42.56,
  "sample": -9.030801043595176e+83,
  "time": 16.814
}, {
  "acc_x": -597.068,
  "acc_y": -523.441,
  "acc_z": -264.252,
  "angle": 0,
  "dev": "B",
  "gyr_x": -44.94,
  "gyr_y": -23.38,
  "gyr_z": 155.12,
  "sample": 0,
  "time": 16.818
}, {
  "acc_x": -649.345,
  "acc_y": -358.253,
  "acc_z": -97.051,
  "angle": 0,
  "dev": "B",
  "gyr_x": -40.25,
  "gyr_y": -36.54,
  "gyr_z": 168.35,
  "sample": 0,
  "time": 16.838
}, {
  "acc_x": -794.281,
  "acc_y": -15.86,
  "acc_z": -371.307,
  "angle": 0,
  "dev": "A",
  "gyr_x": -34.93,
  "gyr_y": -18.76,
  "gyr_z": 45.36,
  "sample": 0,
  "time": 16.834
}, {
  "acc_x": -760.609,
  "acc_y": 12.627,
  "acc_z": -346.785,
  "angle": 0,
  "dev": "A",
  "gyr_x": -7.21,
  "gyr_y": -9.03,
  "gyr_z": 47.95,
  "sample": 0,
  "time": 16.853
}, {
  "acc_x": -747.006,
  "acc_y": 40.626,
  "acc_z": -287.554,
  "angle": -1.2564628813357739e+238,
  "dev": "A",
  "gyr_x": -0.07,
  "gyr_y": -6.93,
  "gyr_z": 47.25,
  "sample": -1.2564628282149219e+238,
  "time": 16.872
}, {
  "acc_x": -622.932,
  "acc_y": -334.585,
  "acc_z": -135.054,
  "angle": 0,
  "dev": "B",
  "gyr_x": -52.15,
  "gyr_y": -49.98,
  "gyr_z": 183.96,
  "sample": 0,
  "time": 16.857
}, {
  "acc_x": -742.858,
  "acc_y": -489.403,
  "acc_z": -193.98,
  "angle": -1.2099413660963573e+238,
  "dev": "B",
  "gyr_x": -72.24,
  "gyr_y": -55.93,
  "gyr_z": 203.7,
  "sample": -1.2108535727065495e+238,
  "time": 16.876
}, {
  "acc_x": -724.802,
  "acc_y": 45.445,
  "acc_z": -201.727,
  "angle": 0,
  "dev": "A",
  "gyr_x": -0.49,
  "gyr_y": -2.31,
  "gyr_z": 40.25,
  "sample": 0,
  "time": 16.893
}, {
  "acc_x": -689.239,
  "acc_y": -16.592,
  "acc_z": -196.115,
  "angle": 0,
  "dev": "A",
  "gyr_x": -6.16,
  "gyr_y": 6.16,
  "gyr_z": 30.1,
  "sample": 0,
  "time": 16.912
}, {
  "acc_x": -799.649,
  "acc_y": -659.227,
  "acc_z": -292.129,
  "angle": -1.2108536257330472e+238,
  "dev": "B",
  "gyr_x": -75.46,
  "gyr_y": -67.34,
  "gyr_z": 219.66,
  "sample": -1.2108535727065496e+238,
  "time": 16.895
}, {
  "acc_x": -779.885,
  "acc_y": -612.562,
  "acc_z": -198.128,
  "angle": -7761476.34153,
  "dev": "B",
  "gyr_x": -43.75,
  "gyr_y": -79.73,
  "gyr_z": 234.22,
  "sample": -7761476,
  "time": 16.915
}, {
  "acc_x": -771.528,
  "acc_y": -505.873,
  "acc_z": -216.123,
  "angle": 0,
  "dev": "B",
  "gyr_x": -6.02,
  "gyr_y": -88.55,
  "gyr_z": 251.3,
  "sample": 0,
  "time": 16.935000000000002
}, {
  "acc_x": -808.921,
  "acc_y": -352.336,
  "acc_z": -169.092,
  "angle": 1.2562268986610903e+238,
  "dev": "B",
  "gyr_x": 15.68,
  "gyr_y": -85.4,
  "gyr_z": 269.71,
  "sample": 1.2562268454648936e+238,
  "time": 16.954
}, {
  "acc_x": -632.875,
  "acc_y": -14.518,
  "acc_z": -209.23,
  "angle": -1.2108536257316152e+238,
  "dev": "A",
  "gyr_x": -9.17,
  "gyr_y": 11.41,
  "gyr_z": 15.26,
  "sample": -1.210853572706549e+238,
  "time": 16.931
}, {
  "acc_x": -598.898,
  "acc_y": 12.932,
  "acc_z": -134.566,
  "angle": 0,
  "dev": "A",
  "gyr_x": -6.65,
  "gyr_y": 9.24,
  "gyr_z": -1.89,
  "sample": 0,
  "time": 16.951
}, {
  "acc_x": -988.322,
  "acc_y": -250.466,
  "acc_z": 4.819,
  "angle": 0,
  "dev": "B",
  "gyr_x": 16.17,
  "gyr_y": -75.11,
  "gyr_z": 282.73,
  "sample": 0,
  "time": 16.973
}, {
  "acc_x": -1176.324,
  "acc_y": -227.896,
  "acc_z": -205.997,
  "angle": 0,
  "dev": "B",
  "gyr_x": -16.03,
  "gyr_y": -59.57,
  "gyr_z": 273.63,
  "sample": 0,
  "time": 16.993000000000002
}, {
  "acc_x": -1255.319,
  "acc_y": -240.706,
  "acc_z": -220.698,
  "angle": 0,
  "dev": "B",
  "gyr_x": -31.36,
  "gyr_y": -59.43,
  "gyr_z": 254.03,
  "sample": 0,
  "time": 17.012
}, {
  "acc_x": -675.819,
  "acc_y": 42.517,
  "acc_z": -13.725,
  "angle": 0,
  "dev": "A",
  "gyr_x": -5.18,
  "gyr_y": 14.14,
  "gyr_z": -17.71,
  "sample": 0,
  "time": 16.97
}];
},{}],"src/nflow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nflow = void 0;

var _module_bundle = require("./module_bundle.js");

var _sm_utils = require("./module_resources/sm_utils.js");

var _dev = require("./dev.js");

var _sample_walk = _interopRequireDefault(require("./module_resources/sample_walk.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defines object that will be attached to window 
var nflow = {}; //give it modules

exports.nflow = nflow;
nflow.mods = _module_bundle.mods;
nflow.smu = _sm_utils.smu;
nflow.dev = _dev.dev; //load sample data 

nflow.resources = {
  sample_walk: _sample_walk.default //define global data params 

};
nflow.SKIP_PAYLOAD = "nflow_skip_payload_0000001"; //could alternatively use uuid
//add it to window 

window.nflow = nflow; //export it for use
},{"./module_bundle.js":"src/module_bundle.js","./module_resources/sm_utils.js":"src/module_resources/sm_utils.js","./dev.js":"src/dev.js","./module_resources/sample_walk.json":"src/module_resources/sample_walk.json"}],"src/module_resources/state_machine_elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sme = void 0;

var _logger = require("../core_modules/logger.js");

var _utils = require("./utils.js");

//Fri Oct  5 19:31:23 PDT 2018
// filefor collecting definitions of Sensors and transitioners
_logger.logger.register("sme");

var sme = {
  sensors: {
    dev_a: {},
    dev_b: {}
  },
  transitioners: {} //extract a specific field from the data objects 
  //i.e. [{:acc_x :acc_y... } , ... ] => [ acc_x, acc_x ... ] 

};
exports.sme = sme;

sme.sensors.field = function (field) {
  return function (sm) {
    return _utils.util.last(sm.buffer)[field];
  };
}; //field diff will take the  diff of a particular field in the data object 


sme.sensors.field_diff = function (field) {
  return function (d) {
    d = d.buffer;
    var l = d.length;
    return d[l - 1][field] - d[l - 2][field];
  };
};

sme.is_dev_b = function (d) {
  return d.dev == "B";
};

sme.is_dev_a = function (d) {
  return d.dev == "A";
};

sme.sensors.dev_b.field = function (field) {
  //return sme.generic_filter(sme.is_dev_b , d=>d[field] ) 
  return function (d) {
    var buf = d.buffer;

    var d = _utils.util.last(buf);

    if (d.dev == "B") {
      return d[field];
    } else {
      _utils.util.debug("filter miss");

      return false;
    }
  };
};

sme.transitioners.test_turn_on = {
  "detector": function detector(state_machine) {
    return !state_machine.STATE.is_on;
  },
  "applicator": function applicator(state_machine) {
    state_machine.STATE.is_on = true;

    if (state_machine.debug_mode) {
      _logger.logger.sme("TURNED ON");
    }
  },
  "group": "switch"
};
sme.transitioners.test_turn_off = {
  "detector": function detector(state_machine) {
    return state_machine.STATE.is_on;
  },
  "applicator": function applicator(state_machine) {
    state_machine.STATE.is_on = false;

    if (state_machine.debug_mode) {
      _logger.logger.sme("TURNED OFF");
    }
  },
  "group": "switch"
};
},{"../core_modules/logger.js":"src/core_modules/logger.js","./utils.js":"src/module_resources/utils.js"}],"src/wrtsm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrtsm = void 0;

var _module_bundle = require("./module_bundle.js");

var _sm_utils = require("./module_resources/sm_utils.js");

var _dev = require("./dev.js");

// defines object that will be attached to window 
var wrtsm = {}; //give it modules

exports.wrtsm = wrtsm;
wrtsm.mods = _module_bundle.mods;
wrtsm.smu = _sm_utils.smu;
wrtsm.dev = _dev.dev; //add it to window 

window.wrtsm = wrtsm; //export it for use
},{"./module_bundle.js":"src/module_bundle.js","./module_resources/sm_utils.js":"src/module_resources/sm_utils.js","./dev.js":"src/dev.js"}],"src/scripts/rose_gait_workflows.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = void 0;

var _utils = _interopRequireDefault(require("../module_resources/utils.js"));

var _state_machine_elements = require("../module_resources/state_machine_elements.js");

var _wrtsm = require("../wrtsm.js");

var _logger = require("../core_modules/logger.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

1; //Fri Oct  5 18:28:58 PDT 2018
// workflows for RoseGait  

_logger.logger.register("rg");

var flow = {};
exports.flow = flow;

flow.test_storage_persist = function (name) {
  //1. create web_socket object 
  ws = new _wrtsm.wrtsm.mods.web_socket("ws://localhost:1234"); //2. create data_storage object 

  ds = new _wrtsm.wrtsm.mods.data_storage(name); //3. create pipe manager object and connect 1 & 2 

  pm = new _wrtsm.wrtsm.mods.pipe_manager();
  pm.connect(ws, ds); //4. Enable saving on the data_storage object every 5s  

  ds.start_saving(5); //5. connect the websocket (which should automatically start receiving data) 

  ws.connect(); //6. Stop streaming after 20s 

  setTimeout(function () {
    ws.stop_stream();
    ds.stop_saving();
    console.log("Streaming and saving stopped.");
  }, 21 * 1000);
};

flow.test_storage_replay = function () {
  //1. create data_storage object & load session 
  ds = new _wrtsm.wrtsm.mods.data_storage("eugene_walk_rev");
  ds.load_session(); //2. create raw_analyzer object 

  ra = new _wrtsm.wrtsm.mods.raw_analyzer(); //3. create pipe manager object and connect 1 & 2 

  pm = new _wrtsm.wrtsm.mods.pipe_manager();
  pm.connect(ds, ra); //4. start the stream ! 

  ds.start_stream();
  return [ds, ra];
};

flow.test_state_machine = function (n) {
  _logger.logger.rg("Creating state machine with size: " + n);

  var sm = new _wrtsm.wrtsm.mods.state_machine({
    buffer_size: n,
    gui_mode: false
  });
  sm.initialize({
    "is_on": false
  });

  _logger.logger.rg("Adding sensors");

  sm.add_sensor({
    id: "acc_x",
    f: _state_machine_elements.sme.sensors.field("acc_x"),
    graph: "g1"
  });
  sm.add_sensor({
    id: "acc_x_diff",
    f: _state_machine_elements.sme.sensors.field_diff("acc_x"),
    graph: "g1"
  });

  _logger.logger.rg("Adding transitioners");

  sm.add_transitioner("test_turn_on", _state_machine_elements.sme.transitioners.test_turn_on);
  sm.add_transitioner("test_turn_off", _state_machine_elements.sme.transitioners.test_turn_off); // ok so at this point everything should be initialized and we should be able 
  // to start profiling and inspecing the state machine 

  _logger.logger.rg("Returning sm");

  return sm;
};

flow.test_state_machine_gui = function (d) {
  var n = 200;

  _logger.logger.rg("Creating state machine with size: " + n);

  var sm = new _wrtsm.wrtsm.mods.state_machine({
    buffer_size: n,
    gui_mode: true
  });
  sm.initialize({
    "is_on": false
  });

  _logger.logger.rg("Adding sensors");

  sm.add_sensor({
    id: "acc_x",
    f: _state_machine_elements.sme.sensors.field("acc_x"),
    graph: "g1"
  });
  sm.add_sensor({
    id: "acc_x_diff",
    f: _state_machine_elements.sme.sensors.field_diff("acc_x"),
    graph: "g1"
  });

  _logger.logger.rg("Adding transitioners");

  sm.add_transitioner("test_turn_on", _state_machine_elements.sme.transitioners.test_turn_on);
  sm.add_transitioner("test_turn_off", _state_machine_elements.sme.transitioners.test_turn_off); // ok so at this point everything should be initialized and we should be able 
  // to start profiling and inspecing the state machine 

  sm.init_gui("wrtsm", d);

  _logger.logger.rg("Returning sm");

  return sm;
};

flow.playback_gui = function (d) {
  var n = 200;

  _logger.logger.rg("Creating state machine with size: " + n);

  var sm = new _wrtsm.wrtsm.mods.state_machine({
    buffer_size: n,
    gui_mode: true,
    debug_mode: false
  });

  _logger.logger.rg("Adding sensors");

  sm.add_sensor({
    id: "dev_b_gyr_z",
    f: _state_machine_elements.sme.sensors.dev_b.field("gyr_z")
  }); //sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x")})

  sm.add_sensor({
    id: "acc_y",
    f: _state_machine_elements.sme.sensors.field("acc_y")
  });
  sm.add_sensor({
    id: "gyr_z",
    f: _state_machine_elements.sme.sensors.field("gyr_z")
  });

  _logger.logger.rg("Adding transitioners");

  sm.add_transitioner("test_turn_on", _state_machine_elements.sme.transitioners.test_turn_on);
  sm.add_transitioner("test_turn_off", _state_machine_elements.sme.transitioners.test_turn_off); // ok so at this point state machine should be initialized 

  _logger.logger.rg("Calling sm.init_gui");

  sm.init_gui("wrtsm", d); //will load the file from storage 

  var ds = new _wrtsm.wrtsm.mods.data_storage("eugene_walk_rev");
  ds.load_session(); //and then create a pipe manager to connect the stored data file to the state machine 

  var pm = new _wrtsm.wrtsm.mods.pipe_manager();
  pm.connect(ds, sm); //return them and can call ds.start_stream() for continuous simulation 
  //OR ds.stream_single_packet() to step one sample

  return [ds, pm, sm];
};

flow.graph_dances = function () {
  var d = {
    g1: ["acc_x", "acc_y"] //, "gyr_z"] }  
    //[sm,d] = test_state_machine_gui({ g1 : ["acc_x"] , g2 : [ "acc_y"] }) 

  };
  var sm = flow.test_state_machine_gui(d); //[sm,d] = test_state_machine_gui({ g1 : ["acc_x",  "acc_y"] , g2 : [  "gyr_z"] })
  //util.app_render(test_div_array(1,2)) 

  var line_dance = function line_dance() {
    sm.ui.handle_sensor_buffer(200 + speed * counter, {
      acc_x: 0.5 * counter,
      acc_y: -0.5 * counter
    });
  };

  var sine_rate = 2 / 100;
  var sine_rate_2 = 5 / 100;
  var sine_rate_3 = 7 / 100;

  var sine_dance_0 = function sine_dance_0() {
    sm.ui.handle_sensor_buffer(200 + speed * counter, {
      acc_x: Math.sin(sine_rate * counter),
      acc_y: -Math.sin(sine_rate_2 * counter)
    });
  };

  var sine_dance_1 = function sine_dance_1() {
    sm.ui.handle_sensor_buffer(200 + speed * counter, {
      acc_x: Math.sin(sine_rate * counter),
      acc_y: -Math.sin(sine_rate_2 * counter),
      gyr_z: Math.sin(sine_rate_3 * counter)
    });
  };

  var speed = 20;
  var counter = 0;
  var a = setInterval(function () {
    sine_dance_0();
    counter++;
  }, 50);

  var stop = function stop() {
    clearInterval(a);
  };

  return [sm, a, stop];
}; // [0,1,2,3,4] 
//  [1,1,1,1] 


flow.graph_sm_test = function () {
  //now we will loop and do the perf 
  var num = 200;
  var interval = 1;
  var start = 2;
  var sizes = Array(num).fill(0);
  var results = Array(num).fill(0);

  for (var i = 0; i < num; i++) {
    var size = start + i * interval;
    sizes[i] = size; //create the sm 

    var sm = test_state_machine(size); //define the perf function 

    var test_cycle = function () {
      sm.run_debug_cycle();
    }.bind(sm); //now we perf it 


    results[i] = _utils.default.perf(test_cycle);
  } //at this point results should be full . 


  _logger.logger.rg("Graphing results... ");

  bar_graph("Perf", "size", "time", sizes, results);

  _logger.logger.rg("hmm.. ?");
}; // want to be able to play back data 

/* 
A brief historical aside: 
at first I recorded the data withuot converting the Strings inside the objects to numbers 
To solve, I loaded the recorded file, then mapped the conversion accross the loaded buffer 
Then I made a new wrtsm.mods.data storage object with _rev extension, and connecnted d1 to d2. 
Then I started d2.save and d1.stream 
voila 
 */


flow.EW = function () {
  d = new _wrtsm.wrtsm.mods.data_storage("eugene_walk_rev");
  d.load_session(); //at this pt data is accesible in d.loaded_sesssion 

  return d;
};
},{"../module_resources/utils.js":"src/module_resources/utils.js","../module_resources/state_machine_elements.js":"src/module_resources/state_machine_elements.js","../wrtsm.js":"src/wrtsm.js","../core_modules/logger.js":"src/core_modules/logger.js"}],"src/module_resources/sounds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beep = beep;
var sounds = {};
sounds.ctx = new AudioContext();

sounds.osc = function (type, freq, gainVal) {
  var osc, gain;
  osc = sounds.ctx.createOscillator();
  osc.frequency.value = freq;
  gain = sounds.ctx.createGain();
  osc.type = type;
  gain.connect(sounds.ctx.destination);
  gain.gain.value = gainVal;
  osc.connect(gain);
  osc.start();
  return osc;
};

var beep_time = 150;
var beep_dic = {
  0: 300,
  1: 350,
  2: 400,
  3: 450,
  4: 500
};

function beep(n) {
  var f = beep_dic[n];
  var s = sounds.osc("sine", f, 1);
  setTimeout(function () {
    s.stop();
  }, beep_time);
}
},{}],"src/module_resources/script_loader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load_script = load_script;
exports.load_css = load_css;

function load_script(url, cb) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    //IE 
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;

        if (cb) {
          cb();
        }
      }
    };
  } else {
    //Others
    script.onload = function () {
      if (cb) {
        cb();
      }
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function load_css(url, cb) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = 'stylesheet';

  if (link.readyState) {
    //IE 
    link.onreadystatechange = function () {
      if (link.readyState == "loaded" || link.readyState == "complete") {
        link.onreadystatechange = null;

        if (cb) {
          cb();
        }
      }
    };
  } else {
    //Others
    link.onload = function () {
      if (cb) {
        cb();
      }
    };
  }

  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
},{}],"src/module_resources/bokeh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_el = get_el;
exports._make_bar_plot = _make_bar_plot;
exports._make_line_plot = _make_line_plot;
exports.set_bokeh_default_container = set_bokeh_default_container;
exports.get_bokeh_default_container = get_bokeh_default_container;
exports.bokeh_plot = bokeh_plot;
exports.bar_plot = bar_plot;
exports.line_plot = line_plot;
exports.go = go;

var util = _interopRequireWildcard(require("./utils.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function get_el(id) {
  return document.getElementById(id);
}

function _make_bar_plot(opts) {
  var x = opts.x,
      y = opts.y,
      width = opts.width,
      title = opts.title;
  var source = new Bokeh.ColumnDataSource({
    data: {
      x: x,
      top: y
    }
  }); //make plot 

  var p = Bokeh.Plotting.figure({
    title: title || "bokeh plot"
  }); // add a Vbar glyph

  var vbar = new Bokeh.VBar({
    x: {
      field: "x"
    },
    top: {
      field: "top"
    },
    bottom: 0,
    fill_color: "#f46d43",
    width: width || 0.5
  });
  p.add_glyph(vbar, source);
  return {
    plot: p,
    source: source
  };
}

function _make_line_plot(opts) {
  var x = opts.x,
      y = opts.y,
      title = opts.title;
  var source = new Bokeh.ColumnDataSource({
    data: {
      x: x,
      y: y
    }
  }); //make plot 

  var p = Bokeh.Plotting.figure({
    title: title || "bokeh plot"
  }); // add a Vbar glyph

  var l = new Bokeh.Line({
    x: {
      field: "x"
    },
    y: {
      field: "y"
    },
    line_color: "#f46d43"
  });
  var c = new Bokeh.Circle({
    x: {
      field: "x"
    },
    y: {
      field: "y"
    },
    fill_color: "#f46d43",
    size: 2
  });
  p.add_glyph(l, source);
  p.add_glyph(c, source);
  return {
    plot: p,
    source: source
  };
}

function set_bokeh_default_container(el) {
  if (typeof el == "string") {
    el = document.getElementById(el);
  }

  window.bokeh_default_container = el;
}

function get_bokeh_default_container() {
  return window.bokeh_default_container || document.getElementById("nflow");
}

var plot_dict = {
  "bar": _make_bar_plot,
  "line": _make_line_plot
};

function bokeh_plot(plot, container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  Bokeh.Plotting.show(plot, container);
}

function plot(opts, kind) {
  if (opts.x == undefined) {
    opts.x = util.range(0, opts.y.length);
  }

  var plot_maker = plot_dict[kind];

  var _plot_maker = plot_maker(opts),
      plot = _plot_maker.plot,
      source = _plot_maker.source;

  var container = opts.container || get_bokeh_default_container();
  bokeh_plot(plot, container);
  return {
    plot: plot,
    source: source
  };
}

function bar_plot(opts) {
  return plot(opts, "bar");
}

function line_plot(opts) {
  return plot(opts, "line");
}

function go() {
  var p1 = bar_plot();
  Bokeh.Plotting.show(p1, get_el("nflow"));
}
/* 
   TODO : build legit javascript interface for graphing ! :) 
   consider incorporating into util somehow/making it a global file ! 
   */
},{"./utils.js":"src/module_resources/utils.js"}],"src/scripts/gait_detector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gait_detector = gait_detector;

var _state_machine_elements = require("../module_resources/state_machine_elements.js");

var _logger = require("../core_modules/logger.js");

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var bokeh = _interopRequireWildcard(require("../module_resources/bokeh.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var mods = nflow.mods;
var ui = nflow.mods.ui;

function gait_detector(opts) {
  var verb = true;
  var mi_detect = 10;
  var num_cycles = 3;
  var num_dec = 15; // will use state machine api 
  //will define states  

  var states = {
    'pre_mi': 0,
    'monotonically_increasing': 1,
    'monotonically_decreasing_pre_0': 2,
    'monotonically_decreasing_post_0': 3,
    'hs': 4,
    'pre_to': 5,
    'to': 6 //define init state 

  };
  var init = states.pre_mi;
  var new_opts = util.merge(opts, {
    init: init
  }); //make state machine 

  var sm = new nflow.mods.state_machine(new_opts); //initialize params 

  sm.num_cycles = 0; // will only use gyr_z 

  sm.add_sensor({
    id: "gyr_z",
    f: function f(sm) {
      var d = util.last(sm.buffer);
      return d['gyr_z'];
    }
  }); // will define the state machine transitioners 

  var p_mi = {
    "detector": function detector(sm) {
      if (sm.STATE != states.monotonically_increasing) {
        var last_N = sm.get_sensor_last_N("gyr_z", mi_detect); //console.log(last_N)

        return util.array_and(util.diff(last_N).map(function (x) {
          return x > 0;
        })) && util.last(last_N) > 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.monotonically_increasing;
      sm.num_cycles += 1;

      if (sm.num_cycles == 1) {
        sm.cycles_start_index = sm.data_counter;
      }

      if (verb) {
        console.log("MI");
        console.log("Cycle: " + sm.num_cycles);
      }

      if (false) {
        //if (sm.num_cycles == num_cycles) { 
        sm.cycles_end_index = sm.data_counter;
        console.log("WALKING!!!");
        console.log("Analysis period: ");
        console.log([sm.cycles_start_index, sm.cycles_end_index].toString()); //extract from buffer

        var num_to_get = sm.cycles_end_index - sm.cycles_start_index;
        window.data = sm.buffer.slice(-num_to_get);
        nflow.bokeh.line_plot({
          y: window.data.map(function (e) {
            return e.gyr_z;
          })
        });
      }
    },
    "group": "gait" // - 

  };
  var mi_md = {
    "detector": function detector(sm) {
      if (sm.STATE == states.monotonically_increasing) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);
        return last_2[1] - last_2[0] < 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.monotonically_decreasing_pre_0;

      if (verb) {
        console.log("MD");
      }
    },
    "group": "gait" // -

  };
  var md_mdp0 = {
    "detector": function detector(sm) {
      if (sm.STATE == states.monotonically_decreasing_pre_0) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);
        return last_2[1] - last_2[0] < 0 && last_2[1] < 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.monotonically_decreasing_post_0;

      if (verb) {
        console.log("MDp0");
      }
    },
    "group": "gait"
  };
  var md_0 = {
    "detector": function detector(sm) {
      if (sm.STATE == states.monotonically_decreasing_pre_0) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);
        return last_2[1] - last_2[0] > 0 && last_2[1] > 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.pre_0;

      if (verb) {
        console.log("md_0!");
      }

      sm.num_cycles = 0;
    },
    "group": "gait"
  };
  var mdp0_hs = {
    "detector": function detector(sm) {
      if (sm.STATE == states.monotonically_decreasing_post_0) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);
        return last_2[1] - last_2[0] > 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.hs;
      sm.num_dec = 0;
      nflow.beep(1);

      if (verb) {
        console.log("HS");
      }
    },
    "group": "gait"
  };
  var hs_pto = {
    "detector": function detector(sm) {
      if (sm.STATE == states.hs) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);

        if (last_2[1] - last_2[0] < 0) {
          sm.num_dec += 1;
        }

        return sm.num_dec >= num_dec;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.pto;

      if (verb) {
        console.log("pto");
      }
    },
    "group": "gait"
  };
  var pto_to = {
    "detector": function detector(sm) {
      if (sm.STATE == states.pto) {
        var last_2 = sm.get_sensor_last_N("gyr_z", 2);
        return last_2[1] - last_2[0] > 0;
      } else {
        return false;
      }
    },
    "applicator": function applicator(sm) {
      sm.STATE = states.to;
      nflow.beep(3);

      if (verb) {
        console.log("to");
      }
    },
    "group": "gait" //now we add the transitioners 

  };
  sm.add_transitioner("p_mi", p_mi);
  sm.add_transitioner("mi_md", mi_md);
  sm.add_transitioner("md_mdp0", md_mdp0);
  sm.add_transitioner("md_0", md_0);
  sm.add_transitioner("mdp0_hs", mdp0_hs);
  sm.add_transitioner("hs_pto", hs_pto);
  sm.add_transitioner("pto_to", pto_to);
  var d = {
    main: ["gyr_z"]
  };

  if (opts.gui_mode) {
    sm.init_gui("nflow", d);
  }

  return sm;
}
},{"../module_resources/state_machine_elements.js":"src/module_resources/state_machine_elements.js","../core_modules/logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js","../module_resources/bokeh.js":"src/module_resources/bokeh.js"}],"src/scripts/dev.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sm_ds_test = sm_ds_test;
exports.test_sim_tf = test_sim_tf;
exports.test_ED = test_ED;
exports.test_base = test_base;
exports.dev_x1 = dev_x1;
exports.tut_1 = tut_1;
exports.tut_2 = tut_2;
exports.tut_3 = tut_3;
exports.tut_4 = tut_4;
exports.eugene_node = eugene_node;
exports.get_std = get_std;
exports.avg_abs_diff = avg_abs_diff;
exports.get_density = get_density;
exports.get_diff = get_diff;
exports.num_decs = num_decs;
exports.gait_dev = gait_dev;

var _state_machine_elements = require("../module_resources/state_machine_elements.js");

var _logger = require("../core_modules/logger.js");

var util = _interopRequireWildcard(require("../module_resources/utils.js"));

var _gait_detector = require("./gait_detector.js");

var bokeh = _interopRequireWildcard(require("../module_resources/bokeh.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_logger.logger.register("dev");

window.addEventListener("nflow_ready", nflow_init);
var mods = nflow.mods;
var ui = nflow.mods.ui; // look at dev_old.js for workflows from previous versions 

function sm_ds_test() {
  var n = 200;

  _logger.logger.dev("Creating state machine with size: " + n);

  var sm = new nflow.mods.state_machine({
    buffer_size: n,
    gui_mode: true,
    debug_mode: false
  });

  _logger.logger.dev("Adding sensors");

  sm.add_sensor({
    id: "gyr_z",
    f: _state_machine_elements.sme.sensors.dev_b.field("gyr_z")
  });

  _logger.logger.dev("Calling sm.init_gui");

  sm.init_gui("nflow", {
    main: ["gyr_z"]
  }); //will load the file from storage 

  var ds = new nflow.mods.data_storage("eugene_walk_rev");
  ds.enable_stream(); //and then connect

  ds.connect(sm); //and start stream 

  ds.start_stream();
  window.ds = ds;
  window.sm = sm;
}

function test_sim_tf() {
  var sim = new mods.simulator({
    mode: "sin",
    rate: 0.005
  });
  var tf = new mods.transformer(function (d) {
    return {
      y: d['val'] + 10
    };
  });
  var ui = new mods.ui_object_grapher({
    container: "nflow",
    x_len: 200
  });
  var l = new mods.logger_node(); //sim.connect(tf).connect(l).connect(ui)

  sim.connect(tf).connect(ui);
  sim.start_stream(50);
  window.sim = sim;
  window.tf = tf;
  window.ui = ui;
}

function test_ED() {
  var sim = new mods.simulator({
    mode: "burst"
  });
  var l = new mods.logger_node();
  var ed = new mods.event_detector(); //let ui  = new mods.ui_object_grapher({container: "nflow" , x_len : 100 }) 
  //sim.connect(l).connect(ed)

  sim.connect(ed).connect(l, {
    output_port: "events"
  });
  sim.start_stream(30);
  window.sim = sim;
}

function test_base() {
  var n1 = new mods.base_node();
  var n2 = new mods.base_node();
  n1.connect(n2);
  return {
    n1: n1,
    n2: n2
  };
}

function dev_x1() {
  var d = new nflow.mods.data_storage("eugene_walk_rev");
  var l = new nflow.mods.logger_node();
  d.connect(l);
  d.start_stream();
  window.d = d;
  window.l = l;
}

function tut_1() {
  //1. Get the sample data from nflow lib
  var sample_walk = nflow.resources.sample_walk; //2. Create a data_storage node with session_id 'sample_walk' which will hold the data

  var walk_simulator = new nflow.mods.data_storage("sample_walk");
  walk_simulator.set_session(sample_walk); //3. Create logger node 

  var logger_node = new nflow.mods.logger_node(); //4. Connect the data_storage node to the logger node 

  walk_simulator.connect(logger_node); //5. Start streaming data and stop after 1 s 

  walk_simulator.start_stream();
  setTimeout(function () {
    walk_simulator.stop_stream();
  }, 1000);
}

function tut_2() {
  //1. Get the sample data from nflow lib
  var sample_walk = nflow.resources.sample_walk; //2. Create a data_storage node with session_id 'sample_walk' which will hold the data

  var walk_simulator = new nflow.mods.data_storage("sample_walk");
  walk_simulator.set_session(sample_walk); //3. Create logger node 

  var logger_node = new nflow.mods.logger_node(); //4. Create our transformer 

  var transformer = new nflow.mods.transformer(function (payload) {
    if (payload.dev == 'B') {
      return {
        gyr_z: payload.gyr_z,
        dev: payload.dev
      };
    } else {
      return nflow.SKIP_PAYLOAD;
    }
  }); //5. Connect the nodes together! 

  walk_simulator.connect(transformer).connect(logger_node); //6. Start streaming data and stop after 1 second

  walk_simulator.start_stream();
  setTimeout(function () {
    walk_simulator.stop_stream();
  }, 1000);
}

function tut_3() {
  //1. Get the sample data from nflow lib
  var sample_walk = nflow.resources.sample_walk; //2. Create a data_storage node with session_id 'sample_walk' which will hold the data

  var walk_simulator = new nflow.mods.data_storage("sample_walk");
  walk_simulator.set_session(sample_walk); //3. Create grapher 

  var grapher = new nflow.mods.ui_object_grapher({
    container: "nflow",
    exclude: ["dev"]
  }); //4. Create our transformer 

  var transformer = new nflow.mods.transformer(function (payload) {
    if (payload.dev == 'B') {
      return {
        gyr_z: payload.gyr_z,
        dev: payload.dev
      };
    } else {
      return nflow.SKIP_PAYLOAD;
    }
  }); //5. Connect the nodes together! 

  walk_simulator.connect(transformer).connect(grapher); //6. Start streaming data and stop after 10 second

  walk_simulator.start_stream();
  setTimeout(function () {
    walk_simulator.stop_stream();
  }, 10000);
}

function tut_4() {
  //1. Get the sample data from nflow lib
  var sample_walk = nflow.resources.sample_walk; //2. Create a data_storage node with session_id 'sample_walk' which will hold the data

  var walk_simulator = new nflow.mods.data_storage("sample_walk");
  walk_simulator.set_session(sample_walk); //3. Create grapher 

  var grapher = new nflow.mods.ui_object_grapher({
    container: "nflow"
  }); //4. Create our transformer 

  var _get_dev_b = new nflow.mods.transformer(function (payload) {
    if (payload.dev == 'B') {
      return {
        val: payload.gyr_z,
        dev: payload.dev
      };
    } else {
      return nflow.SKIP_PAYLOAD;
    }
  }); // create another transformer that gets the diff 


  var _get_dy = new nflow.mods.transformer(function (payload) {
    if (!this.last_val) {
      this.last_val = 0;
    }

    var result = payload.val - this.last_val;
    this.last_val = payload.val;
    return {
      val: result
    };
  });

  var _get_dy2 = new nflow.mods.transformer(function (payload) {
    if (!this.last_val) {
      this.last_val = 0;
    }

    var result = payload.val - this.last_val;
    this.last_val = payload.val;
    return {
      val: result
    };
  });

  var logger_node = new nflow.mods.logger_node(); //5. Connect the nodes together! 

  walk_simulator.connect(_get_dev_b).connect(grapher); //walk_simulator.connect(_get_dev_b).connect(_get_dy).connect(logger_node) 
  //walk_simulator.connect(_get_dev_b).connect(_get_dy)
  //.connect(new nflow.mods.transformer(e=>e)).connect(grapher)
  //6. Start streaming data and stop after 10 second

  walk_simulator.start_stream(); //setTimeout( function() { walk_simulator.stop_stream() } , 1000)

  setTimeout(function () {
    walk_simulator.stop_stream();
  }, 10000);
}
/* 
   Notes -- for real time GENERALIZED (i.e. no param) gait detection... 
   0. pre-allocate buffer to hold data 
   1. wait until gyr_z = 0 
   2. detect monotonic increase to MAX
   3. detect monotonic decrease until 0
   4. detect monotonic decrease until MIN  ~> record t stamp ~> start appending to buffer
   5. Repeat 1-4 until N=3? t stamps are recorded ~> check for periodicity 
   --  if periodic: 
   ------ walking = TRUE 
   ------ params = get_params_from_buffer(buffer)  [find std_dev minimum]
   6. If NOT periodic OR any steps fail to happen or fail to happen in order: 
   ------ go back to 0. 
   
*/


function nflow_init() {
  gait_dev();
}

function eugene_node() {
  var ds = new nflow.mods.data_storage("eugene_walk_rev");
  return ds;
}

function get_std(d, n) {
  var x = util.get_series(d, 'time');
  var gyr = util.get_series(d, 'gyr_z');
  var y = util.loop_fn(gyr, util.std, n);
  bokeh.line_plot({
    x: x,
    y: y
  });
}

function avg_abs_diff(coll) {
  var lv = util.last(coll);
  var tmp = coll.slice(0, -1).map(function (e) {
    return Math.abs(e - lv);
  });
  return util.multiply(tmp);
}

function get_density(d, n) {
  var x = util.get_series(d, 'time');
  var gyr = util.get_series(d, 'gyr_z');
  var y = util.loop_fn(gyr, util.arr_range, n);
  bokeh.line_plot({
    x: x,
    y: y
  });
}

function get_diff(d, n) {
  var x = util.get_series(d, 'time');
  var gyr = util.get_series(d, 'gyr_z');
  var y = util.loop_fn(gyr, function (arr) {
    return util.first(util.diff(arr.slice(-2)));
  }, n);
  bokeh.line_plot({
    x: x,
    y: y
  });
}

function num_decs(d, n) {
  var x = util.get_series(d, 'time');
  var gyr = util.get_series(d, 'gyr_z');

  var f = function f(arr) {
    var d = util.diff(arr);
    var num = d.filter(function (x) {
      return x <= 0;
    }).length;
    return num;
  };

  var y = util.loop_fn(gyr, f, n);
  bokeh.line_plot({
    x: x,
    y: y
  });
}

function gait_dev() {
  var gd = (0, _gait_detector.gait_detector)({
    buffer_size: 300,
    debug_mode: false,
    gui_mode: true
  });
  var en = eugene_node();

  var _dev_b = new nflow.mods.transformer(function (payload) {
    if (payload.dev == 'B') {
      return payload;
    } else {
      return nflow.SKIP_PAYLOAD;
    }
  });

  var ln = new nflow.mods.logger_node();
  en.connect(_dev_b).connect(gd);
  window.gd = gd;
  window.en = en;
}
},{"../module_resources/state_machine_elements.js":"src/module_resources/state_machine_elements.js","../core_modules/logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js","./gait_detector.js":"src/scripts/gait_detector.js","../module_resources/bokeh.js":"src/module_resources/bokeh.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _nflow = require("./nflow.js");

var _rose_gait_workflows = require("./scripts/rose_gait_workflows.js");

var util = _interopRequireWildcard(require("./module_resources/utils.js"));

var _sounds = require("./module_resources/sounds.js");

var _logger = require("./core_modules/logger.js");

var _script_loader = require("./module_resources/script_loader.js");

var dev = _interopRequireWildcard(require("./scripts/dev.js"));

var bokeh = _interopRequireWildcard(require("./module_resources/bokeh.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//The main program 1

/* - - - - - - - */
console.log(":: nflow initializing ::");
// set debug 
util.set_debug(false); //make logger 

_logger.logger.register("nflow");
/* additions to global context */


_nflow.nflow.flow = _rose_gait_workflows.flow;
_nflow.nflow.util = util;
_nflow.nflow.beep = _sounds.beep;
_nflow.nflow.dev = dev;
_nflow.nflow.bokeh = bokeh;
/* additions to window */

window.util = util;
window.mods = _nflow.nflow.mod;
window.dev = dev; // HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 

if (window.Bokeh) {
  _logger.logger.nflow("Bokeh was detected already. If you experience any errors, please make sure that the following resources are included in your html for proper functionality:");

  console.log("<link rel=\"stylesheet\" href=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css\" type=\"text/css\" />");
  console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js\"></script>");
  console.log("<script type=\"text/javascript\" src=\"https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js\"></script>");
} else {
  //will dynamically load the above resources: 
  //define callback 
  var load_api = function load_api() {
    _logger.logger.nflow("bokeh-0.12.5.js loaded");

    window.ls = _script_loader.load_script;
    (0, _script_loader.load_script)("https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js", function () {
      console.log("[nflow]:: bokeh-api-0.12.5.min.js loaded"); //we will bubble an event that says nflow is ready ! 

      var event = new Event('nflow_ready');
      window.dispatchEvent(event);
    });
  };

  _logger.logger.nflow("Loading Bokeh functionality:");

  (0, _script_loader.load_script)("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js", load_api);
  (0, _script_loader.load_css)("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css", function () {
    console.log("[nflow]:: bokeh-0.12.5.min.css loaded");
  });
} // HANDLE BOKEH LOADING (load the content from cdn if Bokeh is not defined in the window) ======================================== > 


_nflow.nflow.load_time = new Date().getTime(); //var d = {"misc" : ["dev_b_gyr_z"] } 
//setTimeout( function() { window.d = flow.playback_gui(d) ; window.d[0].start_stream()  } , 1000)
},{"./nflow.js":"src/nflow.js","./scripts/rose_gait_workflows.js":"src/scripts/rose_gait_workflows.js","./module_resources/utils.js":"src/module_resources/utils.js","./module_resources/sounds.js":"src/module_resources/sounds.js","./core_modules/logger.js":"src/core_modules/logger.js","./module_resources/script_loader.js":"src/module_resources/script_loader.js","./scripts/dev.js":"src/scripts/dev.js","./module_resources/bokeh.js":"src/module_resources/bokeh.js"}],"../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49401" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map