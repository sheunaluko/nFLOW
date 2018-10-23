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
exports.util = void 0;

var _logger = require("../core_modules/logger.js");

//Tue Oct  2 18:06:09 PDT 2018
//General JS utils file 
//would like to try creating soft?hard? links so that the utils files can be shared 
var global_debug = true;
var util = {};
exports.util = util;

util.set_debug = function (b) {
  global_debug = b;
};

util.bug = function (tag) {
  if (global_debug) {
    console.log("<- " + tag + " ->");

    for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
      console.log(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }

    console.log("<- " + tag + " ->");
  }
};

_logger.logger.register("bug");

util.debug = function (msg) {
  if (global_debug) {
    _logger.logger.bug(msg);
  }
};

util.avg = function (arr) {
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

util.take = function (coll, num) {
  var ret = Array(num).fill(0);

  for (var i = 0; i < num; i++) {
    ret[i] = coll[i];
  }

  return ret;
};

util.arr_mult = function (arr, x) {
  return arr.map(function (y) {
    return y / x;
  });
};

util.perf = function (f) {
  var num_times = 20000;
  var results = Array(num_times).fill(0);

  for (i = 0; i < num_times; i++) {
    var t0 = performance.now();
    var result = f();
    var t1 = performance.now();
    results[i] = t1 - t0;
  }

  return avg(results);
};

util.range = function (a, b) {
  var len = b - a;
  var ret = Array(len).fill(0);

  for (var i = 0; i < len; i++) {
    ret[i] = a + i;
  }

  return ret;
};

util.first = function (d) {
  return d[0];
};

util.last = function (d) {
  return d[d.length - 1];
};

util.zip = function (xs, ys) {
  return xs.map(function (x, i) {
    return [x, ys[i]];
  });
};

util.dict_2_vec = function (d) {
  var ret = [];

  for (var k in d) {
    ret.push([k, d[k]]);
  }

  return ret;
};

util.number_or_self = function (d) {
  var val = Number(d);

  if (isNaN(val)) {
    return d;
  } else {
    return val;
  }
};

util.d_map = function (d, f) {
  for (var k in d) {
    d[k] = f(d[k]);
  }

  return d;
};

util.dict_vals_2_num = function (d) {
  return util.d_map(d, number_or_self);
};

util.diff = function (d) {
  var r = Array(d.length - 1).fill(0);

  for (var i = 1; i < d.length; i++) {
    r[i - 1] = d[i] - d[i - 1];
  }

  return r;
};

util.max = function (d) {
  var curr_max = d[0];

  for (var i = 1; i < d.length; i++) {
    if (d[i] > curr_max) {
      curr_max = d[i];
    }
  }

  return curr_max;
};

util.min = function (d) {
  var curr_min = d[0];

  for (var i = 1; i < d.length; i++) {
    if (d[i] < curr_min) {
      curr_min = d[i];
    }
  }

  return curr_min;
}; // define ui utilities now ------------> 


util.dom = function (s) {
  return document.createElement(s);
};

util.set_inner_html = function (d, thang) {
  if (thang instanceof HTMLElement) {
    d.appendChild(thang);
  } else {
    d.innerHTML = thang;
  }
};

util.flex_row = function (num, id_base, f) {
  var container, i;
  container = util.dom("div");
  container.className = "flex-row"; // see styles.css   

  for (i = 0; i < num; i++) {
    var d = util.dom("div");
    var html = f(i, d);

    if (html) {
      util.set_inner_html(d, html);
    }

    container.appendChild(d);
  }

  return container;
};
/* 
 * Create a flexbox of divs [m,n] in shape 
 * @param {Function} f - accepts row, column, and HTMLelement. Can either mutate the el or return an new el (which will be appended to div at spot r,c) or return String (which will be set to innerHTML) 
 */


util.make_div_array = function (m, n, id_base, f) {
  var container, i;
  container = util.dom("div");
  container.className = "flex-column"; // see styles.css  

  container.id = id_base;
  container.style = "width: 100% ; height : 100% "; // now we will add in the child elements 

  for (i = 0; i < m; i++) {
    //f is a function which takes a row and column and element 
    //build a function that takes just a col with row hard coded 
    //and returns f(r,col)
    var fn = function fn(col, el) {
      return f(i, col, el);
    };

    var new_id_base = id_base + "_" + i + ",";
    var row = util.flex_row(n, new_id_base, fn);
    container.appendChild(row);
  }

  return container;
};

util.id_from_loc = function (m, n, c) {
  return c * m + n; // intersing that this function needs arg c, which is (static) number of cols 
};

util.test_div_array = function (m, n) {
  var f = function f(r, c, el) {
    return util.id_from_loc(r, c, n).toString();
  };

  return util.make_div_array(m, n, "foo", f);
};

util.app_clear = function () {
  var app = document.getElementById("app");

  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
};

util.app_render = function (el) {
  util.app_clear();
  var app = document.getElementById("app");
  app.appendChild(el);
};

var colors = ["black", "blue", "red", "green", "yellow", "orange"];

util.get_colors = function (num) {
  return util.take(colors, num);
}; ///   extensions 
// Array.prototype.first = function(arr) { 
//     return arr[0] 
// }
},{"../core_modules/logger.js":"src/core_modules/logger.js"}],"src/core_modules/web_socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

var _utils = _interopRequireDefault(require("../module_resources/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Manages the websocket connection to an incoming data stream.
 *
 * @param {String} url - The websocket url to connect to, e.g. ws://localhost:1234
 */
var web_socket =
/*#__PURE__*/
function () {
  function web_socket(url) {
    _classCallCheck(this, web_socket);

    this.url = url;
    this.connection = null;
    this.log = (0, _logger.makeLogger)("WS");

    this.default_handler = function (data) {
      this.log("No data handler has been defined!");
    };

    this.data_handler = this.default_handler;
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
        //this.log("Received msg: " + event.data) 
        this.data_handler(_utils.default.dict_vals_2_num(JSON.parse(event.data))); //parse json and convert nums
      }.bind(this)); //bind is necessary for web_socket class vs WebSocket instance! 

      this.connection = conn;
    }
    /** 
     * Start accepting incoming raw data objects.
     */

  }, {
    key: "start_stream",
    value: function start_stream() {
      this.send_json({
        type: "control",
        data: "start"
      });
    }
    /** 
     * Stop accepting incoming raw data objects.
     */

  }, {
    key: "stop_stream",
    value: function stop_stream() {
      this.send_json({
        type: "control",
        data: "stop"
      });
    }
    /** 
     * Sets the data_handler attribute, which determines what the socket does to incomin data.
     * @param {Function} func - Function which accepts ONE raw data object {..} and processes it.
     */

  }, {
    key: "set_data_handler",
    value: function set_data_handler(func) {
      this.data_handler = func;
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
}();

exports.default = web_socket;
},{"./logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js"}],"src/core_modules/data_storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

var _utils = _interopRequireDefault(require("../module_resources/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 
 * 
 */
var data_storage =
/*#__PURE__*/
function () {
  /**
   * Manages data persistence and replay/simulation. Uses browser based local storage. 
   * @param {String} name - Session identifier, use null for default time string
   */
  function data_storage(name) {
    _classCallCheck(this, data_storage);

    this.session_id = name || new Date().toISOString();
    this.data_history = [];
    this.part_counter = 1;
    this.save_interval_id = null;
    this.loaded_session = null;
    this.log = (0, _logger.makeLogger)("DS");

    this.default_handler = function (data) {
      this.log("No data handler has been defined!");
    };

    this.data_handler = this.default_handler;
    this.stream_index = 0;
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
     * Main data handler. Will append the incoming data to the data_history array 
     * @param {Object} obj - The data obj to add 
     */

  }, {
    key: "process_data",
    value: function process_data(obj) {
      this.data_history.push(obj);
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
      this.diffs = _utils.default.diff(this.loaded_session.map(function (d) {
        return d["time"];
      }));
      this.log("Session loaded: " + this.session_id);
    }
    /** 
     * Set the data_handler for data replay/simulation 
     * @param {Function} f - The data handler function  
     */

  }, {
    key: "set_data_handler",
    value: function set_data_handler(f) {
      this.data_handler = f;
    }
    /** 
     * Start streaming the session that was previously loaded from localStorage 
     */

  }, {
    key: "start_stream",
    value: function start_stream() {
      this.stream_index = 0;
      this.streaming = true;
      this.start_stream_loop();
    }
    /** 
     * Stream single packet
     */

  }, {
    key: "stream_single_packet",
    value: function stream_single_packet() {
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

        this.data_handler(val);

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

          setTimeout(function () {
            this.start_stream_loop();
          }.bind(this), delay);
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
        var t_1 = _utils.default.first(this.loaded_session)["time"]; //now we subtract t_1 from all time points 


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
  }]);

  return data_storage;
}(); // define some helpers 


exports.default = data_storage;

function get_session_part_names(id) {
  return Object.keys(localStorage).filter(function (s) {
    return s.includes(id);
  }).sort();
}

function get_session(id) {
  var parts_names = get_session_part_names(id); // part names are sorted already 

  tmp = parts_names.map(function (name) {
    return JSON.parse(localStorage.getItem(name));
  });
  var merged = [].concat.apply([], tmp);
  return merged;
}
},{"./logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js"}],"src/core_modules/pipe_manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Manages the flow of streaming data between various modules of RoseGait
 * e.g. pipe_manager.connect(web_socket, data_storage) 
 */
var pipe_manager =
/*#__PURE__*/
function () {
  function pipe_manager() {
    _classCallCheck(this, pipe_manager);

    this.log = (0, _logger.makeLogger)("PM");
  }
  /**
   * Connects a streaming output data source to a streaming input source. 
   * @param {Object} from - data source (emits data). Must implement method `set_data_handler` 
   * and have member default_handler
   * @param {Object} to -   data sink   (consumes data). Must implement method `process_data` 
   */


  _createClass(pipe_manager, [{
    key: "connect",
    value: function connect(from, to) {
      from.set_data_handler(function (d) {
        to.process_data(d);
      }.bind(to));
    }
    /**
     * Disconnects a streaming output data source from a streaming input source. 
     * @param {Object} from - data source (emits data). Must implement method `set_data_handler` 
     * and have member default_handler
     * @param {Object} to -   data sink   (consumes data). Must implement method `process_data` 
     */

  }, {
    key: "disconnect",
    value: function disconnect(from, to) {
      from.set_data_handler(from.default_handler);
    }
  }]);

  return pipe_manager;
}();

exports.default = pipe_manager;
},{"./logger.js":"src/core_modules/logger.js"}],"src/core_modules/raw_analyzer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

var _utils = _interopRequireDefault(require("../module_resources/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 
 * 
 */
var raw_analyzer =
/*#__PURE__*/
function () {
  /**
   * Provides insights and attributes about raw data stream. 
   * e.g. checks for dropped samples 
   */
  function raw_analyzer() {
    _classCallCheck(this, raw_analyzer);

    this.data_history = [];
    this.log = (0, _logger.makeLogger)("RA");
  }
  /**
   * Processes a data packet 
   * @param {Object} obj - Data object to process 
   */


  _createClass(raw_analyzer, [{
    key: "process_data",
    value: function process_data(obj) {
      this.data_history.push(obj);
      this.log("Received data!");
    }
    /**
     * Produce report (logged to console for now) 
     */

  }, {
    key: "produce_report",
    value: function produce_report() {
      var data_buffer = this.data_history;
      var report = get_report(data_buffer);
      this.log("Printing report: ");
      this.log(JSON.stringify(report));
      return report;
    }
    /**
     * (UNSTABLE ) Show ditribution for field  
     */

  }, {
    key: "dist_field",
    value: function dist_field(f) {
      //clear_plot_div() 
      var data = this.data_history.map(function (e) {
        return e[f];
      });
      g_hist(data, "Distribution for: " + f);
    }
    /**
     * (UNSTABLE) Show time series for field 
     */

  }, {
    key: "line_field",
    value: function line_field(f) {
      var data = this.data_history.map(function (e) {
        return e[f];
      });
      g_line(data, "Time series for: " + f);
    }
  }]);

  return raw_analyzer;
}();

exports.default = raw_analyzer;

function get_field_average(obj_array, f) {
  return utils.avg(obj_array.map(function (obj) {
    return obj[f];
  }));
}

function get_report(data_buffer) {
  return {
    'len': data_buffer.length,
    'acc_x_avg': get_field_average(data_buffer, "acc_x"),
    'acc_y_avg': get_field_average(data_buffer, "acc_y"),
    'acc_z_avg': get_field_average(data_buffer, "acc_z"),
    'gyr_x_avg': get_field_average(data_buffer, "gyr_x"),
    'gyr_y_avg': get_field_average(data_buffer, "gyr_y"),
    'gyr_z_avg': get_field_average(data_buffer, "gyr_z")
  };
}
},{"./logger.js":"src/core_modules/logger.js","../module_resources/utils.js":"src/module_resources/utils.js"}],"src/module_resources/global_params.js":[function(require,module,exports) {
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
exports.default = void 0;

var _global_params = require("../module_resources/global_params.js");

var _utils = require("../module_resources/utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var plt = Bokeh.Plotting;

function make_y_series(len) {
  return Array(len).fill(0);
}

function make_x_series(len) {
  return _utils.util.range(-len, 0).map(function (x) {
    return x / 100;
  }); // the /100 is hax for now for streaming
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

  var tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save"; // WOW ! -- how lucky to find sizing_mode : stretch_both lmao 
  // https://github.com/bokeh/bokeh/issues/4958

  var p = plt.figure({
    title: title,
    tools: tools,
    sizing_mode: 'stretch_both'
  }); //add the multiline 

  var glyph = p.multi_line({
    field: "xs"
  }, {
    field: "ys"
  }, {
    source: source,
    line_color: _utils.util.get_colors(series_len)
  }); //NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > NEXT STEP -- > 
  //Need to call plt.show(p , HTMLelement) 

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
    //NOTE* if one of the y values is !FALSE! , then the assumption is that 
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
    this.series_vector = series_vector;
    var multi_opts = {
      x_len: _global_params.params.global_x_len,
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
      plt.show(this.multi_line_graph, el);
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
   * @param {String} id - graph id 
   * @param {Vector} series_vector - Ids for series which will be graphed on this graph 
   */


  _createClass(ui, [{
    key: "add_graph",
    value: function add_graph(id, series_vector) {
      var graph = new Graph({
        series_vector: series_vector,
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
    value: function init() {
      // logic for displaying all of the added graphs 
      // should make a panel view of sorts and initialize with empty values 
      var graph_array = _utils.util.dict_2_vec(this.graphs);

      this.graph_array = graph_array; // for now will put two graphs side by side 

      var n_cols = 2;
      var n_rows = Math.ceil(Object.keys(this.graphs).length / 2); // some hax  

      if (graph_array.length == 1) {
        n_cols = n_rows = 1;
      }

      _utils.util.bug("n_row", n_rows); // make a grid of divs 


      var app_el = _utils.util.make_div_array(n_rows, n_cols, "rgui", function (r, c, el) {
        //get the graph index
        var index = _utils.util.id_from_loc(r, c, n_cols); // debug - console.log( [index, graph_array] )


        if (index < graph_array.length) {
          //get the graph info using destructuring 
          var _graph_array$index = _slicedToArray(graph_array[index], 2),
              id = _graph_array$index[0],
              graph = _graph_array$index[1];

          graph.render_into_element(el);
        } else {
          return "";
        }
      }); //render the app 


      _utils.util.app_render(app_el);
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
  }]);

  return ui;
}();

exports.default = ui;
},{"../module_resources/global_params.js":"src/module_resources/global_params.js","../module_resources/utils.js":"src/module_resources/utils.js"}],"src/core_modules/state_machine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger.js");

var _ui = _interopRequireDefault(require("./ui.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 
 * 
 */
var state_machine =
/*#__PURE__*/
function () {
  /**
   * 
   * 
   */
  function state_machine(opts) {
    _classCallCheck(this, state_machine);

    var buffer_size = opts.buffer_size,
        gui_mode = opts.gui_mode,
        debug_mode = opts.debug_mode;
    this.log = (0, _logger.makeLogger)("SM");
    this.buffer_size = buffer_size;
    this.sensor_buffer_size = buffer_size;
    this.buffer = Array(buffer_size).fill(default_data_obj);
    this.sensors = {};
    this.transitioners = {};
    this.transitioner_groups = {};
    this.STATE = {};
    this.gui_mode = gui_mode;
    this.debug_mode = debug_mode || false;

    if (gui_mode) {
      //create the sensor_gui buffer 
      this.sensors_gui_buffer = {};
      this.ui_mapping = null; //also create a ui object  

      this.ui = new _ui.default(null);
    }
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
    /** 
     * Adds a sensor to the state machine. 
     * @param {Object} opts - contains id, f (function) , graph (if gui_mode). Graph should be id of the graph that the sensor should be graphed on 
     */

  }, {
    key: "add_sensor",
    value: function add_sensor(opts) {
      var id, f;
      id = opts.id;
      f = opts.f; //register the sensor 

      this.sensors[id] = {}; //add the function 

      this.sensors[id]["function"] = f; //and then allocate a buffer for the sensor values 

      this.sensors[id]["buffer"] = Array(this.sensor_buffer_size).fill(NaN);

      if (this.debug_mode) {
        this.log("Added sensor: " + id);
      }
    }
    /** 
     * 
     * Init gui 
     * @param {Object} ui_mapping - Dictionary where keys are graph ids and vals are vectors of the sensors which could be graphed on that graph. E.g { graph-1 : ["acc_x", "acc_z" ] , etc} 
     */

  }, {
    key: "init_gui",
    value: function init_gui(ui_mapping) {
      this.ui_mapping = ui_mapping; //loop through the graphs 

      for (var graph in this.ui_mapping) {
        var sensors = this.ui_mapping[graph];
        this.ui.add_graph(graph, sensors); // initializes a graph 
      } //after all the graphs have been added then we call init 


      this.ui.init();
    }
    /** 
     * Runs the sensor function with the state machine buffer as input 
     * then updates the corresponding sensor's buffer.
     * @param {String} id - Sensor id to run   
     */

  }, {
    key: "run_sensor",
    value: function run_sensor(id) {
      var buffer = this.buffer; //get the sensor function

      var f = this.sensors[id]["function"]; //run the sensor on the current buffer 

      var val = f(buffer);
      /*
        sensors 
        only append the value if it exists 
        this allows the ability for sensors to act simultaneously as data filters 
        by introspecting on the data_packet somehow and deciding to reject it from 
        their buffer. 
        This however also allows for the possibility that the sensor buffers are no longer
        synced in time.. not sure if this is a potential source of confusion in the future 
       
      */

      if (val) {
        //append the new value to the sensors buffer 
        this.sensors[id]["buffer"].push(val);
        this.sensors[id]["buffer"].shift();
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
      return this.sensors[id]["buffer"].slice(this.buffer_size - num);
    }
    /** 
     * Utility function for retrieving the last value of a sensor's buffer
     * Used to make it easier to write Detectors 
     * @param {String} id - Sensor id 
     */

  }, {
    key: "get_sensor_last_N",
    value: function (_get_sensor_last_N) {
      function get_sensor_last_N(_x) {
        return _get_sensor_last_N.apply(this, arguments);
      }

      get_sensor_last_N.toString = function () {
        return _get_sensor_last_N.toString();
      };

      return get_sensor_last_N;
    }(function (id) {
      return get_sensor_last_N(id, 1);
    })
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
     * Processes a data object, running one cycle of the state machine. 
     * @param {Object} obj - Data object to process 
     */

  }, {
    key: "process_data",
    value: function process_data(obj) {
      //1. update the data buffer  
      this.update_buffer_with_data_object(obj); //2. now we need to update all of the sensors 

      for (var sensor_id in this.sensors) {
        var val = this.run_sensor(sensor_id);

        if (this.gui_mode) {
          this.sensors_gui_buffer[sensor_id] = val;
        }
      } //3. now we run all the transitioners (which rely on most up to date Sensor values) 


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
}();

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
},{"./logger.js":"src/core_modules/logger.js","./ui.js":"src/core_modules/ui.js"}],"src/module_bundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mods = void 0;

var _web_socket = _interopRequireDefault(require("./core_modules/web_socket.js"));

var _data_storage = _interopRequireDefault(require("./core_modules/data_storage.js"));

var _pipe_manager = _interopRequireDefault(require("./core_modules/pipe_manager.js"));

var _raw_analyzer = _interopRequireDefault(require("./core_modules/raw_analyzer.js"));

var _state_machine = _interopRequireDefault(require("./core_modules/state_machine.js"));

var _ui = _interopRequireDefault(require("./core_modules/ui.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bundles all the modules into one object for easy access 
// Mon Oct 22 22:16:23 PDT 2018
var mods = {
  web_socket: _web_socket.default,
  data_storage: _data_storage.default,
  pipe_manager: _pipe_manager.default,
  raw_analyzer: _raw_analyzer.default,
  state_machine: _state_machine.default,
  ui: _ui.default
};
exports.mods = mods;
},{"./core_modules/web_socket.js":"src/core_modules/web_socket.js","./core_modules/data_storage.js":"src/core_modules/data_storage.js","./core_modules/pipe_manager.js":"src/core_modules/pipe_manager.js","./core_modules/raw_analyzer.js":"src/core_modules/raw_analyzer.js","./core_modules/state_machine.js":"src/core_modules/state_machine.js","./core_modules/ui.js":"src/core_modules/ui.js"}],"src/wrtsm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrtsm = void 0;

var _module_bundle = require("./module_bundle.js");

// defines object that will be attached to window 
var wrtsm = {}; //give it the module bundle 

exports.wrtsm = wrtsm;
wrtsm.mods = _module_bundle.mods; //add it to window 

window.wrtsm = wrtsm; //export it for use
},{"./module_bundle.js":"src/module_bundle.js"}],"src/module_resources/state_machine_elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sme = void 0;

var _logger = require("../core_modules/logger.js");

var _utils = _interopRequireDefault(require("./utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return function (d) {
    return _utils.default.last(d)[field];
  };
}; //field diff will take the  diff of a particular field in the data object 


sme.sensors.field_diff = function (field) {
  return function (d) {
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
  return function (buf) {
    d = _utils.default.last(buf);

    if (d.dev == "B") {
      return d[field];
    } else {
      _utils.default.debug("filter miss");

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
},{"../core_modules/logger.js":"src/core_modules/logger.js","./utils.js":"src/module_resources/utils.js"}],"src/scripts/rose_gait_workflows.js":[function(require,module,exports) {
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

  sm.init_gui(d);

  _logger.logger.rg("Returning sm");

  return sm;
};

flow.playback_gui = function (d) {
  n = 200;

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

  sm.init_gui(d); //will load the file from storage 

  var ds = new _wrtsm.wrtsm.mods.data_storage("eugene_walk_rev");
  ds.load_session(); //and then create a pipe manager to connect the stored data file to the state machine 

  pm = new _wrtsm.wrtsm.mods.pipe_manager();
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
},{"../module_resources/utils.js":"src/module_resources/utils.js","../module_resources/state_machine_elements.js":"src/module_resources/state_machine_elements.js","../wrtsm.js":"src/wrtsm.js","../core_modules/logger.js":"src/core_modules/logger.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _wrtsm = require("./wrtsm.js");

var _rose_gait_workflows = require("./scripts/rose_gait_workflows.js");

//The main program 
//import global wrtsm object 

/* additions to global context */
_wrtsm.wrtsm.flow = _rose_gait_workflows.flow;
/* - - - - - - - */

console.log(":: " + new Date() + " ::");
console.log(":: wrtsm initialized ::");
},{"./wrtsm.js":"src/wrtsm.js","./scripts/rose_gait_workflows.js":"src/scripts/rose_gait_workflows.js"}],"../../.nvm/versions/node/v10.0.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51353" + '/');

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
},{}]},{},["../../.nvm/versions/node/v10.0.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map