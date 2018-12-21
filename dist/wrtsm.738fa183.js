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
})({"dist/wrtsm.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "nr01": [function (require, module, exports) {
    "use strict";

    function e(e) {
      return function () {
        for (var r = arguments.length, o = new Array(r), t = 0; t < r; t++) {
          o[t] = arguments[t];
        }

        console.log("[" + e + "]:: " + o.join());
      };
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.makeLogger = e, exports.logger = void 0;
    var r = {};
    exports.logger = r, r.register = function (o) {
      r[o] = e(o);
    };
  }, {}],
  "vsUZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.util = void 0;

    var r = require("../core_modules/logger.js"),
        n = !0,
        t = {};

    function e(r) {
      return t.std(r) / t.avg(r);
    }

    function o(r) {
      for (var n = r[0].length, t = Array(n).fill(null), o = 0; o < n; o++) {
        var i = r.map(function (r) {
          return r[o];
        });
        t[o] = e(i);
      }

      return t;
    }

    exports.util = t, t.set_debug = function (r) {
      n = r;
    }, t.bug = function (r) {
      if (n) {
        console.log("<- " + r + " ->");

        for (var t = 0; t < (arguments.length <= 1 ? 0 : arguments.length - 1); t++) {
          console.log(t + 1 < 1 || arguments.length <= t + 1 ? void 0 : arguments[t + 1]);
        }

        console.log("<- " + r + " ->");
      }
    }, r.logger.register("bug"), t.debug = function (t) {
      n && r.logger.bug(t);
    }, t.and = function () {
      for (var r = !0, n = 0; n < arguments.length; n++) {
        r = r && (n < 0 || arguments.length <= n ? void 0 : arguments[n]);
      }

      return !!r;
    }, t.apply = function (r, n) {
      return r.apply(null, n);
    }, t.avg = function (r) {
      for (var n = 0, t = 0; t < r.length; t++) {
        n += r[t];
      }

      return n / r.length;
    }, t.rms = function (r) {
      for (var n = 0, t = 0; t < r.length; t++) {
        n += r[t] * r[t];
      }

      return Math.sqrt(n / r.length);
    }, t.variance = function (r) {
      for (var n = t.avg(r), e = 0, o = 0; o < r.length; o++) {
        e += Math.pow(r[o] - n, 2);
      }

      return e / r.length;
    }, t.std = function (r) {
      return Math.sqrt(t.variance(r));
    }, t.take = function (r, n) {
      for (var t = Array(n).fill(0), e = 0; e < n; e++) {
        t[e] = r[e];
      }

      return t;
    }, t.arr_mult = function (r, n) {
      return r.map(function (r) {
        return r / n;
      });
    }, t.perf = function (r) {
      var n = Array(2e4).fill(0);

      for (i = 0; i < 2e4; i++) {
        var t = performance.now(),
            e = (r(), performance.now());
        n[i] = e - t;
      }

      return avg(n);
    }, t.range = function (r, n) {
      for (var t = n - r, e = Array(t).fill(0), o = 0; o < t; o++) {
        e[o] = r + o;
      }

      return e;
    }, t.first = function (r) {
      return r[0];
    }, t.last = function (r) {
      return r[r.length - 1];
    }, t.zip_map = function (r, n) {
      for (var t = {}, e = 0; e < r.length; e++) {
        t[r[e]] = n[e];
      }

      return t;
    }, t.zip = function (r, n) {
      return r.map(function (r, t) {
        return [r, n[t]];
      });
    }, t.dict_2_vec = function (r) {
      var n = [];

      for (var t in r) {
        n.push([t, r[t]]);
      }

      return n;
    }, t.number_or_self = function (r) {
      var n = Number(r);
      return isNaN(n) ? r : n;
    }, t.d_map = function (r, n) {
      for (var t in r) {
        r[t] = n(r[t]);
      }

      return r;
    }, t.dict_vals_2_num = function (r) {
      return t.d_map(r, t.number_or_self);
    }, t.diff = function (r) {
      for (var n = Array(r.length - 1).fill(0), t = 1; t < r.length; t++) {
        n[t - 1] = r[t] - r[t - 1];
      }

      return n;
    }, t.max = function (r) {
      for (var n = r[0], t = 1; t < r.length; t++) {
        r[t] > n && (n = r[t]);
      }

      return n;
    }, t.min = function (r) {
      for (var n = r[0], t = 1; t < r.length; t++) {
        r[t] < n && (n = r[t]);
      }

      return n;
    }, t.cycle_array = function (r, n) {
      return r.push(n), r.shift(), r;
    }, t.std_percent_diff = function (r) {
      for (var n = Array(r.length - 1).fill(NaN), e = 0; e < n.length; e++) {
        n[e] = (r[e + 1] - r[e]) / r[e];
      }

      return t.std(n);
    }, t.array_percent_diff = function (r, n) {
      for (var t = Array(n.length).fill(0), e = 0; e < t.length; e++) {
        t[e] = (n[e] - r[e]) / r[e];
      }

      return t;
    }, t.array_log_diff = function (r, n) {
      for (var t = Array(n.length).fill(0), e = 0; e < t.length; e++) {
        t[e] = Math.log(n[e]) - Math.log(r[e]);
      }

      return t;
    }, t.log_diff_half_buff = function (r) {
      var n = Math.ceil(r.length / 2),
          e = t.take(r, n),
          o = r.slice(-(r.length - n));
      return Math.log(t.avg(o)) - Math.log(t.avg(e));
    }, t.spd_matrix = function (r) {
      for (var n = r[0].length, e = Array(n).fill(null), o = 0; o < n; o++) {
        var i = r.map(function (r) {
          return r[o];
        });
        e[o] = t.std_percent_diff(i);
      }

      return e;
    }, t.matrix_map = function (r, n) {
      for (var t = r[0].length, e = Array(t).fill(null), o = 0; o < t; o++) {
        var i = r.map(function (r) {
          return r[o];
        });
        e[o] = n(i);
      }

      return e;
    }, t.matrix_mapper = function (r) {
      return function (n) {
        return t.matrix_map(n, r);
      };
    }, t.cv = e, t.cv_matrix = o, t.dom = function (r) {
      return document.createElement(r);
    }, t.set_inner_html = function (r, n) {
      n instanceof HTMLElement ? r.appendChild(n) : r.innerHTML = n;
    }, t.flex_row = function (r, n, e) {
      var o, i;

      for ((o = t.dom("div")).style = "display : flex ; flex-wrap : nowrap ; flex-direction : row ; flex-grow : 1 ", i = 0; i < r; i++) {
        var a = t.dom("div");
        a.style = "flex-grow : 1";
        var u = e(i, a);
        u && t.set_inner_html(a, u), o.appendChild(a);
      }

      return o;
    }, t.make_div_array = function (r, n, e, o) {
      var i, a;

      for ((i = t.dom("div")).id = e, i.style = "width: 100% ; height : 100% ; display : flex ; flex-wrap : nowrap ; flex-direction : column ", a = 0; a < r; a++) {
        var u = e + "_" + a + ",",
            f = t.flex_row(n, u, function (r, n) {
          return o(a, r, n);
        });
        i.appendChild(f);
      }

      return i;
    }, t.id_from_loc = function (r, n, t) {
      return t * r + n;
    }, t.test_div_array = function (r, n) {
      return t.make_div_array(r, n, "foo", function (r, e, o) {
        return t.id_from_loc(r, e, n).toString();
      });
    }, t.app_clear = function () {
      for (var r = document.getElementById("app"); r.firstChild;) {
        r.removeChild(r.firstChild);
      }
    }, t.app_render = function (r) {
      t.app_clear(), document.getElementById("app").appendChild(r);
    };
    var a = ["black", "blue", "red", "green", "yellow", "orange"];
    t.get_colors = function (r) {
      return t.take(a, r);
    }, t.now = function () {
      return new Date().getTime();
    };
  }, {
    "../core_modules/logger.js": "nr01"
  }],
  "J97u": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = require("../module_resources/utils.js");

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
      }
    }

    function a(e, t, n) {
      return t && s(e.prototype, t), n && s(e, n), e;
    }

    var i = function () {
      function s(t) {
        n(this, s), this.url = t, this.connection = null, this.log = (0, e.makeLogger)("WS"), this.default_handler = function (e) {
          this.log("No data handler has been defined!");
        }, this.data_handler = this.default_handler;
      }

      return a(s, [{
        key: "connect",
        value: function value() {
          var e = new WebSocket(this.url);
          e.addEventListener("open", function (e) {
            this.log("Connection to " + this.url + " successful. Registering client with server."), this.send_json({
              type: "register",
              data: "client"
            }), this.send_json({
              type: "control",
              data: "start"
            });
          }.bind(this)), e.addEventListener("message", function (e) {
            this.data_handler(t.util.dict_vals_2_num(JSON.parse(e.data)));
          }.bind(this)), this.connection = e;
        }
      }, {
        key: "start_stream",
        value: function value() {
          this.send_json({
            type: "control",
            data: "start"
          });
        }
      }, {
        key: "stop_stream",
        value: function value() {
          this.send_json({
            type: "control",
            data: "stop"
          });
        }
      }, {
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }, {
        key: "send_json",
        value: function value(e) {
          this.connection.send(JSON.stringify(e));
        }
      }]), s;
    }();

    exports.default = i;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "WeAO": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = require("../module_resources/utils.js");

    function s(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, t) {
      for (var s = 0; s < t.length; s++) {
        var i = t[s];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
      }
    }

    function a(e, t, s) {
      return t && i(e.prototype, t), s && i(e, s), e;
    }

    var n = function () {
      function i(t) {
        s(this, i), this.session_id = t || new Date().toISOString(), this.data_history = [], this.part_counter = 1, this.save_interval_id = null, this.loaded_session = null, this.playback_speed_multiplier = 1, this.log = (0, e.makeLogger)("DS"), this.default_handler = function (e) {
          this.log("No data handler has been defined!");
        }, this.data_handler = this.default_handler, this.stream_index = 0;
      }

      return a(i, [{
        key: "flush_data",
        value: function value() {
          var e = JSON.stringify(this.data_history);
          name = this.session_id + "_part" + this.part_counter.toString(), this.data_history = [], localStorage.setItem(name, e), this.part_counter += 1, this.log("Saved data chunk: " + name);
        }
      }, {
        key: "start_saving",
        value: function value(e) {
          this.save_interval_id = setInterval(function () {
            this.flush_data();
          }.bind(this), 1e3 * e), this.log("Saving started for session: " + this.session_id);
        }
      }, {
        key: "stop_saving",
        value: function value() {
          clearInterval(this.save_interval_id), this.log("Saving stopped for session: " + this.session_id);
        }
      }, {
        key: "process_data",
        value: function value(e) {
          this.data_history.push(e);
        }
      }, {
        key: "load_session",
        value: function value() {
          this.log("Loading session..."), this.loaded_session = r(this.session_id), this.stream_index = 0, this.buffer_size = this.loaded_session.length, this.streaming = !1, this.zero_time_axis(), this.diffs = t.util.diff(this.loaded_session.map(function (e) {
            return e.time;
          })), this.log("Session loaded: " + this.session_id);
        }
      }, {
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }, {
        key: "start_stream",
        value: function value(e) {
          this.stream_index = 0, this.streaming = !0, this.playback_speed_multiplier = e || 1, this.start_stream_loop();
        }
      }, {
        key: "stream_single_packet",
        value: function value() {
          if (this.stream_index < this.buffer_size) {
            var e = this.loaded_session[this.stream_index];
            return this.data_handler(e), this.stream_index += 1, e;
          }

          this.stop_stream();
        }
      }, {
        key: "start_stream_loop",
        value: function value() {
          if (this.streaming) {
            var e = this.loaded_session[this.stream_index];
            if (this.data_handler(e), this.stream_index == this.buffer_size - 1) this.stop_stream();else {
              var t = this.diffs[this.stream_index];
              this.stream_index += 1;
              var s = this.playback_speed_multiplier;
              setTimeout(function () {
                this.start_stream_loop();
              }.bind(this), t * s);
            }
          }
        }
      }, {
        key: "zero_time_axis",
        value: function value() {
          if (this.log("Zeroing time axis"), !this.loaded_session.length) throw "Session must be loaded!";
          var e = t.util.first(this.loaded_session).time;
          this.loaded_session.map(function (t) {
            return t.time = t.time - e, t;
          }), this.log("Done");
        }
      }, {
        key: "stop_stream",
        value: function value() {
          this.streaming = !1, this.stream_index = 0, this.log("Stream finished.");
        }
      }, {
        key: "to_csv",
        value: function value(e) {
          this.log("Creating csv file for: " + this.session_id);
          var t = "data:text/csv;charset=utf-8,",
              s = Object.keys(this.loaded_session[0]).sort();
          t += s.join(",") + "\n";

          for (var i = 0; i < this.loaded_session.length; i++) {
            var a = this.loaded_session[i];

            if ("B" == a.dev) {
              for (var n = [], o = 0; o < s.length; o++) {
                var r = s[o];
                a[r];
                n.push(a[r]);
              }

              t += n.join(",") + "\n";
            }
          }

          var l = encodeURI(t),
              d = document.createElement("a");
          d.setAttribute("href", l), d.setAttribute("download", (e || this.session_id) + ".csv"), d.click();
        }
      }, {
        key: "to_json",
        value: function value(e) {
          this.log("Creating json file for: " + this.session_id);
          var t = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.loaded_session)),
              s = document.createElement("a");
          s.setAttribute("href", t), s.setAttribute("download", (e || this.session_id) + ".json"), s.click();
        }
      }, {
        key: "load_json",
        value: function value() {
          var e = d();
          return e.click(), e;
        }
      }]), i;
    }();

    function o(e) {
      return Object.keys(localStorage).filter(function (t) {
        return t.includes(e);
      }).sort();
    }

    function r(e) {
      var s = o(e).map(function (e) {
        return JSON.parse(localStorage.getItem(e));
      });
      return [].concat.apply([], s).map(t.util.dict_vals_2_num);
    }

    function l(e) {
      var t = e.target.files[0],
          s = t.name.replace(".json", ""),
          i = new FileReader();
      i.onloadend = function (e) {
        e.target.readyState == FileReader.DONE ? (localStorage.setItem(s, e.target.result), console.log("[DS]:: Saved item to local storage: " + s)) : (console.log("[DS]:: error reading.. "), console.log(e));
      }, i.readAsText(t);
    }

    function d() {
      var e = document.createElement("input");
      return e.type = "file", e.addEventListener("change", l), e;
    }

    exports.default = n;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "3Dyt": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js");

    function n(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function t(e, n) {
      for (var t = 0; t < n.length; t++) {
        var r = n[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function r(e, n, r) {
      return n && t(e.prototype, n), r && t(e, r), e;
    }

    var a = function () {
      function t() {
        n(this, t), this.log = (0, e.makeLogger)("PM");
      }

      return r(t, [{
        key: "connect",
        value: function value(e, n) {
          e.set_data_handler(function (e) {
            n.process_data(e);
          }.bind(n));
          var r = new t();
          return {
            connect: function connect(e) {
              return r.connect(n, e);
            }
          };
        }
      }, {
        key: "disconnect",
        value: function value(e, n) {
          e.set_data_handler(e.default_handler);
        }
      }]), t;
    }();

    exports.default = a;
  }, {
    "./logger.js": "nr01"
  }],
  "nz+y": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = r(require("../module_resources/utils.js"));

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function a(e, t, r) {
      return t && i(e.prototype, t), r && i(e, r), e;
    }

    var o = function () {
      function t() {
        n(this, t), this.data_history = [], this.log = (0, e.makeLogger)("RA");
      }

      return a(t, [{
        key: "process_data",
        value: function value(e) {
          this.data_history.push(e), this.log("Received data!");
        }
      }, {
        key: "produce_report",
        value: function value() {
          var e = s(this.data_history);
          return this.log("Printing report: "), this.log(JSON.stringify(e)), e;
        }
      }, {
        key: "dist_field",
        value: function value(e) {
          var t = this.data_history.map(function (t) {
            return t[e];
          });
          g_hist(t, "Distribution for: " + e);
        }
      }, {
        key: "line_field",
        value: function value(e) {
          var t = this.data_history.map(function (t) {
            return t[e];
          });
          g_line(t, "Time series for: " + e);
        }
      }]), t;
    }();

    function u(e, t) {
      return utils.avg(e.map(function (e) {
        return e[t];
      }));
    }

    function s(e) {
      return {
        len: e.length,
        acc_x_avg: u(e, "acc_x"),
        acc_y_avg: u(e, "acc_y"),
        acc_z_avg: u(e, "acc_z"),
        gyr_x_avg: u(e, "gyr_x"),
        gyr_y_avg: u(e, "gyr_y"),
        gyr_z_avg: u(e, "gyr_z")
      };
    }

    exports.default = o;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "nzSf": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.params = void 0;
    var e = {
      global_x_len: 200
    };
    exports.params = e;
  }, {}],
  "LHvS": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("../module_resources/global_params.js"),
        t = require("../module_resources/utils.js");

    function r(e, t) {
      return o(e) || i(e, t) || n();
    }

    function n() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function i(e, t) {
      var r = [],
          n = !0,
          i = !1,
          o = void 0;

      try {
        for (var l, a = e[Symbol.iterator](); !(n = (l = a.next()).done) && (r.push(l.value), !t || r.length !== t); n = !0) {
          ;
        }
      } catch (s) {
        i = !0, o = s;
      } finally {
        try {
          n || null == a.return || a.return();
        } finally {
          if (i) throw o;
        }
      }

      return r;
    }

    function o(e) {
      if (Array.isArray(e)) return e;
    }

    function l(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function a(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function s(e, t, r) {
      return t && a(e.prototype, t), r && a(e, r), e;
    }

    function u(e) {
      return Array(e).fill(0);
    }

    function h(e) {
      return t.util.range(-e, 0).map(function (e) {
        return e / 100;
      });
    }

    function f(e, r) {
      var n = r.xs,
          i = r.ys,
          o = r.title;

      if (!n) {
        n = [];

        for (var l = 0; l < i.length; l++) {
          n.push(t.util.range(0, i[0].length));
        }
      }

      var a = new Bokeh.ColumnDataSource({
        data: {
          xs: n,
          ys: i
        }
      }),
          s = Bokeh.Plotting.figure({
        title: o,
        sizing_mode: "stretch_both"
      }),
          u = s.multi_line({
        field: "xs"
      }, {
        field: "ys"
      }, {
        source: a,
        line_color: t.util.get_colors(n.length)
      });
      s.add_tools(new Bokeh.HoverTool({
        tooltips: [["x", "$x"], ["y", "$y"]],
        line_policy: "next"
      }));
      var h = e;

      for ("string" == typeof e && (h = document.getElementById(e)); h.firstChild;) {
        h.removeChild(h.firstChild);
      }

      return Bokeh.Plotting.show(s, h), {
        plot: s,
        glyph: u,
        source: a
      };
    }

    function c(e) {
      for (var r = e.x_len, n = e.series_array, i = e.title, o = n.length, l = [], a = [], s = 0; s < o; s++) {
        l.push(h(r)), a.push(u(r));
      }

      var f = new Bokeh.ColumnDataSource({
        data: {
          xs: l,
          ys: a
        }
      }),
          c = Bokeh.Plotting.figure({
        title: i,
        sizing_mode: "stretch_both"
      }),
          _ = c.multi_line({
        field: "xs"
      }, {
        field: "ys"
      }, {
        source: f,
        line_color: t.util.get_colors(o)
      });

      return c.add_tools(new Bokeh.HoverTool({
        tooltips: [["x", "$x"], ["y", "$y"]],
        line_policy: "next"
      })), {
        plot: c,
        glyph: _,
        source: f
      };
    }

    var _ = function _(e, t, r) {
      for (var n = e.data, i = n.xs, o = n.ys, l = 0; l < o.length; l++) {
        r[l] && (i[l].push(t), i[l].shift(), o[l].push(r[l]), o[l].shift());
      }

      return n.xs = i, n.ys = o, e.setv("data", n, {
        silent: !0
      }), e.trigger("stream");
    },
        g = function () {
      function t(r) {
        l(this, t);
        var n = r.series_vector,
            i = r.title;
        this.parent = null, this.opts = r, this.series_vector = n, console.log("Graph with Len : " + r.x_len);
        var o = c({
          x_len: r.x_len || e.params.global_x_len,
          title: i,
          series_array: n
        }),
            a = o.plot,
            s = o.glyph,
            u = o.source;
        a.background_fill_color = "#e5efff", a.background_fill_alpha = .2, a.border_fill_color = "#e5efff", a.border_fill_alpha = .2, this.multi_line_graph = a, this.source = u, this.glyph = s;
      }

      return s(t, [{
        key: "get_data_source",
        value: function value() {
          return this.source;
        }
      }, {
        key: "render_into_element",
        value: function value(e) {
          Bokeh.Plotting.show(this.multi_line_graph, e);
        }
      }]), t;
    }(),
        d = function () {
      function e(t) {
        l(this, e), this.graphs = {}, this.parent = t, this.last_series_buffer = {};
      }

      return s(e, [{
        key: "add_graph",
        value: function value(e) {
          var t = e.id,
              r = e.series_vector,
              n = e.x_len,
              i = new g({
            series_vector: r,
            x_len: n,
            title: t + ": " + r.join(", ")
          });
          this.graphs[t] = i;
        }
      }, {
        key: "init",
        value: function value(e) {
          var n = t.util.dict_2_vec(this.graphs);
          this.graph_array = n;
          var i = 2,
              o = Math.ceil(Object.keys(this.graphs).length / 2);
          1 == n.length && (i = o = 1), t.util.bug("n_row", o);
          var l = t.util.make_div_array(o, i, "rgui", function (e, o, l) {
            var a = t.util.id_from_loc(e, o, i);
            if (!(a < n.length)) return "";
            var s = r(n[a], 2);
            s[0];
            s[1].render_into_element(l);
          });
          "string" == typeof e && (e = document.getElementById(e)), y(e, l);
        }
      }, {
        key: "stream_to_graph",
        value: function value(e, t, r) {
          _(this.graphs[e].get_data_source(), t, r);
        }
      }, {
        key: "handle_sensor_buffer",
        value: function value(e, t) {
          for (var r in this.graphs) {
            var n, i, o, l;

            for (n = this.graphs[r].series_vector, i = Array(n.length).fill(0), o = 0; o < n.length; o++) {
              l = t[n[o]], i[o] = l;
            }

            _(this.graphs[r].get_data_source(), e, i);
          }
        }
      }], [{
        key: "multi_line_graph",
        value: function value(e, t) {
          f(e, t);
        }
      }]), e;
    }();

    exports.default = d;

    var p = null,
        v = function v() {
      for (; p.firstChild;) {
        p.removeChild(p.firstChild);
      }
    },
        y = function y(e, t) {
      p ? v() : (e.appendChild(t), p = e);
    };
  }, {
    "../module_resources/global_params.js": "nzSf",
    "../module_resources/utils.js": "vsUZ"
  }],
  "H751": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var s = require("./logger.js"),
        e = i(require("./ui.js")),
        t = require("../module_resources/utils.js");

    function i(s) {
      return s && s.__esModule ? s : {
        default: s
      };
    }

    function r(s, e) {
      if (!(s instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function n(s, e) {
      for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
      }
    }

    function o(s, e, t) {
      return e && n(s.prototype, e), t && n(s, t), s;
    }

    var u = function () {
      function i(t) {
        r(this, i);
        var n = t.buffer_size,
            o = t.gui_mode,
            u = t.debug_mode,
            _ = t.init;
        this.log = (0, s.makeLogger)("SM"), this.buffer_size = n || 200, this.sensor_buffer_size = n, this.buffer = Array(n).fill(a), this.sensors = {}, this.transitioners = {}, this.transitioner_groups = {}, this.STATE = _ || {}, this.gui_mode = o, this.debug_mode = u || !1, o && (this.sensors_gui_buffer = {}, this.ui_mapping = null, this.ui = new e.default(null));
      }

      return o(i, [{
        key: "initialize",
        value: function value(s) {
          this.STATE = s;
        }
      }, {
        key: "update_buffer_with_data_object",
        value: function value(s) {
          this.buffer.push(s), this.buffer.shift();
        }
      }, {
        key: "set_sensor_order",
        value: function value() {
          this.sensor_order = t.util.dict_2_vec(this.sensors).sort(function (s, e) {
            return s[1].level > e[1].level ? 1 : -1;
          }).map(function (s) {
            return s[0];
          });
        }
      }, {
        key: "add_sensor",
        value: function value(s) {
          var e, t, i;
          e = s.id, t = s.f, i = s.level, this.sensors[e] = {}, this.sensors[e].function = t, this.sensors[e].buffer = Array(this.sensor_buffer_size).fill(NaN), this.sensors[e].level = i || 0, this.sensors[e].last_skipped = !1, this.debug_mode && this.log("Added sensor: " + e), this.set_sensor_order();
        }
      }, {
        key: "init_gui",
        value: function value(s, e) {
          for (var t in this.ui_mapping = e, this.ui_mapping) {
            var i = {
              id: t,
              series_vector: this.ui_mapping[t]
            };
            this.ui.add_graph(i);
          }

          this.ui.init(s);
        }
      }, {
        key: "run_sensor",
        value: function value(s) {
          var e = (0, this.sensors[s].function)(this);
          return e ? (this.sensors[s].buffer.push(e), this.sensors[s].buffer.shift(), this.sensors[s].last_skipped = !1) : this.sensors[s].last_skipped = !0, e;
        }
      }, {
        key: "get_sensor_last_N",
        value: function value(s, e) {
          return !this.sensors[s].last_skipped && this.sensors[s].buffer.slice(this.buffer_size - e);
        }
      }, {
        key: "get_sensor_last_1",
        value: function value(s) {
          return !this.sensors[s].last_skipped && t.util.first(this.get_sensor_last_N(s, 1));
        }
      }, {
        key: "add_transitioner",
        value: function value(s, e) {
          if (!e.detector || !e.applicator) throw "Transitioner object does not contain both detector and applicator!";
          this.transitioners[s] = e, e.group && (this.transitioner_groups[e.group] = !0), this.debug_mode && this.log("Added transitioner: " + s);
        }
      }, {
        key: "run_transitioner",
        value: function value(s) {
          var e = this.transitioners[s],
              t = e.group,
              i = this.transitioner_groups[t];

          if (0 != i) {
            var r = e.detector,
                n = e.applicator;
            r(this) ? (this.debug_mode && this.log(":match: => " + s), n(this), i && (this.transitioner_groups[t] = !1)) : this.debug_mode && this.log(":fail: => " + s);
          }
        }
      }, {
        key: "run_sensors",
        value: function value() {
          for (var s = 0; s < this.sensor_order.length; s++) {
            var e = this.sensor_order[s],
                t = this.run_sensor(e);
            this.debug_mode && (this.log("Ran sensor: " + e + " with result: "), this.log(t)), this.gui_mode && (this.sensors_gui_buffer[e] = t);
          }
        }
      }, {
        key: "process_data",
        value: function value(s) {
          for (var e in this.update_buffer_with_data_object(s), this.run_sensors(), this.transitioners) {
            this.run_transitioner(e);
          }

          for (var t in this.transitioner_groups) {
            this.transitioner_groups[t] = !0;
          }

          this.gui_mode && this.ui.handle_sensor_buffer(s.time, this.sensors_gui_buffer);
        }
      }, {
        key: "run_debug_cycle",
        value: function value() {
          this.process_data(f());
        }
      }]), i;
    }();

    exports.default = u;
    var a = {
      acc_x: 0,
      acc_y: 0,
      acc_z: 0,
      gyr_x: 0,
      gyr_y: 0,
      gyr_z: 0,
      sample: 0,
      time: 0,
      dev: "B"
    },
        _ = Math.random,
        h = 0;

    function f() {
      return {
        acc_x: _(),
        acc_y: _(),
        acc_z: _(),
        gyr_x: _(),
        gyr_y: _(),
        gyr_z: _(),
        sample: h++,
        dev: "B"
      };
    }
  }, {
    "./logger.js": "nr01",
    "./ui.js": "LHvS",
    "../module_resources/utils.js": "vsUZ"
  }],
  "l9K8": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = require("../module_resources/utils.js");

    function a(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      for (var a = 0; a < t.length; a++) {
        var r = t[a];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function n(e, t, a) {
      return t && r(e.prototype, t), a && r(e, a), e;
    }

    var i = function () {
      function t(r) {
        a(this, t), this.f = r, this.log = (0, e.makeLogger)("TF"), this.default_handler = function (e) {
          this.log("No data handler has been defined!");
        }, this.data_handler = this.default_handler;
      }

      return n(t, [{
        key: "set_transformer",
        value: function value(e) {
          this.f = e;
        }
      }, {
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }, {
        key: "process_data",
        value: function value(e) {
          this.data_handler(this.f(e));
        }
      }]), t;
    }();

    exports.default = i;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "X0tH": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = r(require("../module_resources/utils.js"));

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function a(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function o(e, t, r) {
      return t && a(e.prototype, t), r && a(e, r), e;
    }

    var u = function () {
      function t() {
        n(this, t), this.log = (0, e.makeLogger)("LN"), this.default_handler = function (e) {
          return null;
        }, this.data_handler = this.default_handler;
      }

      return o(t, [{
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }, {
        key: "process_data",
        value: function value(e) {
          this.data_handler(e), console.log(e);
        }
      }]), t;
    }();

    exports.default = u;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "5mo+": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = a(require("../module_resources/utils.js"));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      for (var a = 0; a < t.length; a++) {
        var r = t[a];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function s(e, t, a) {
      return t && n(e.prototype, t), a && n(e, a), e;
    }

    var i = function () {
      function t(a) {
        r(this, t), this.opts = a, this.log = (0, e.makeLogger)("SIM"), this.mode = a.mode, this.default_handler = function (e) {
          return null;
        }, this.data_handler = this.default_handler, this.stream_interval = null;
      }

      return s(t, [{
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }, {
        key: "start_stream",
        value: function value(e) {
          this.stream_interval = setInterval(this.send_val.bind(this), e);
        }
      }, {
        key: "stop_stream",
        value: function value() {
          clearInterval(this.stream_interval);
        }
      }, {
        key: "send_val",
        value: function value() {
          var e;

          switch (this.opts.mode) {
            case "sin":
              e = Math.sin(new Date().getTime() * this.opts.rate);
              break;

            case "rand":
              e = (this.opts.multiplier || 1) * Math.random() + (this.opts.offset || 0);
              break;

            case "burst":
              e = !(new Date().getSeconds() % 5) ? {
                x: Math.random() + 5,
                y: Math.random() + 20
              } : {
                x: Math.random() + 5,
                y: Math.random() + 10
              };
          }

          this.data_handler(e);
        }
      }]), t;
    }();

    exports.default = i;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "VcOp": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var e = require("./logger.js"),
        t = require("../module_resources/utils.js");

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function r(e, t, i) {
      return t && n(e.prototype, t), i && n(e, i), e;
    }

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    var a = t.util.rms;

    function o(e, t) {
      for (var i in e) {
        e[i] = t(e[i]);
      }

      return e;
    }

    function u(e) {
      return "object" == s(e) ? Array.isArray(e) ? a(e) : o(e, u) : e;
    }

    var l = u;

    function h(e) {
      return o(e, u);
    }

    var c = {
      acc: [1, 2, 3, 4, 5],
      gyr: {
        foo: 2,
        bar: [1, 2, 3, 4, 5]
      },
      happy: 1
    };

    function _(e) {
      var t = [];

      for (var i in e) {
        "object" == s(e[i]) ? t.push(_(e[i])) : t.push(e[i]);
      }

      return [].concat.apply([], t);
    }

    function f(e) {
      return _(e);
    }

    var d = function () {
      function n(t) {
        i(this, n);
        t = t || {};
        this.opts = t, this.log = (0, e.makeLogger)("ED"), this.state = "awaiting_baseline", this.baseline_counter = 0, this.baseline_number = t.baseline_number || 60, this.current_event = [], this.events = {}, this.detection_params = {
          upper: null,
          lower: null
        }, this.init_detection_params(t.detection_thresh || 30), this.last_linearized = null, this.history_buffer_size = t.history_buffer_size || 50, this.init_history_buffer(), this.default_handler = function (e) {
          this.log("No data handler has been defined!");
        }, this.data_handler = this.default_handler;
      }

      return r(n, [{
        key: "init_detection_params",
        value: function value(e) {
          this.detection_params.upper = Math.log((e + 100) / 100), this.detection_params.lower = Math.log((100 - e) / 100);
        }
      }, {
        key: "in_range",
        value: function value(e) {
          return e >= this.detection_params.lower && e <= this.detection_params.upper;
        }
      }, {
        key: "detect",
        value: function value(e) {
          return !t.util.apply(t.util.and, e.map(this.in_range, this));
        }
      }, {
        key: "check_baseline",
        value: function value(e) {
          return e ? (this.baseline_counter = 0, !1) : (this.baseline_counter += 1, this.baseline_counter > this.baseline_number && (this.baseline_counter = 0, !0));
        }
      }, {
        key: "process_data",
        value: function value(e) {
          var i = f(l(e));

          if (this.last_linearized) {
            var n = t.util.array_log_diff(this.last_linearized, i),
                r = this.detect(n);

            switch (this.state) {
              case "awaiting_baseline":
                this.check_baseline(r) && (this.log("Baseline established"), this.state = "baseline_established");
                break;

              case "baseline_established":
                this.add_to_history(e), r && (this.log("Detected event..."), this.state = "processing_event", this.init_event());
                break;

              case "processing_event":
                this.current_event.push(e), this.check_baseline(r) && (this.log("Event ended"), this.state = "baseline_established", this.flush_event());
            }

            this.data_handler(n);
          } else this.last_linearized = i;
        }
      }, {
        key: "init_event",
        value: function value() {
          this.current_event = [];

          for (var e = 0; e < this.history_buffer.length; e++) {
            this.current_event.push(this.history_buffer[e]);
          }

          return null;
        }
      }, {
        key: "flush_event",
        value: function value() {
          this.events[new Date().getTime()] = this.current_event, this.log("Flushed event"), this.current_event = [];
        }
      }, {
        key: "add_to_history",
        value: function value(e) {
          t.util.cycle_array(this.history_buffer, e);
        }
      }, {
        key: "init_history_buffer",
        value: function value() {
          this.history_buffer = Array(this.history_buffer_size).fill(0);
        }
      }, {
        key: "set_data_handler",
        value: function value(e) {
          this.data_handler = e;
        }
      }]), n;
    }();

    exports.default = d;
  }, {
    "./logger.js": "nr01",
    "../module_resources/utils.js": "vsUZ"
  }],
  "z2x1": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.mods = void 0;

    var e = i(require("./core_modules/web_socket.js")),
        r = i(require("./core_modules/data_storage.js")),
        o = i(require("./core_modules/pipe_manager.js")),
        u = i(require("./core_modules/raw_analyzer.js")),
        t = i(require("./core_modules/state_machine.js")),
        s = i(require("./core_modules/transformer.js")),
        a = i(require("./core_modules/logger_node.js")),
        d = i(require("./core_modules/simulator.js")),
        l = i(require("./core_modules/ui.js")),
        _ = i(require("./core_modules/event_detector.js"));

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var m = {
      web_socket: e.default,
      data_storage: r.default,
      pipe_manager: o.default,
      raw_analyzer: u.default,
      state_machine: t.default,
      ui: l.default,
      transformer: s.default,
      simulator: d.default,
      logger_node: a.default,
      event_detector: _.default
    };
    exports.mods = m;
  }, {
    "./core_modules/web_socket.js": "J97u",
    "./core_modules/data_storage.js": "WeAO",
    "./core_modules/pipe_manager.js": "3Dyt",
    "./core_modules/raw_analyzer.js": "nz+y",
    "./core_modules/state_machine.js": "H751",
    "./core_modules/transformer.js": "l9K8",
    "./core_modules/logger_node.js": "X0tH",
    "./core_modules/simulator.js": "5mo+",
    "./core_modules/ui.js": "LHvS",
    "./core_modules/event_detector.js": "VcOp"
  }],
  "s1VG": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.smu = void 0;

    var e = require("./utils.js"),
        r = {
      sensors: {},
      transformers: {}
    };

    exports.smu = r, r.sensors.field = function (r) {
      return function (s) {
        var t = s.buffer;
        return e.util.last(t)[r];
      };
    };
  }, {
    "./utils.js": "vsUZ"
  }],
  "/vRa": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.dev = void 0;

    var e = require("./module_resources/utils.js"),
        s = {
      vars: {}
    };

    exports.dev = s, s.msg = "Used for shipping development objects and functions with wrtsm";
  }, {
    "./module_resources/utils.js": "vsUZ"
  }],
  "hs2p": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.wrtsm = void 0;

    var e = require("./module_bundle.js"),
        s = require("./module_resources/sm_utils.js"),
        r = require("./dev.js"),
        u = {};

    exports.wrtsm = u, u.mods = e.mods, u.smu = s.smu, u.dev = r.dev, window.wrtsm = u;
  }, {
    "./module_bundle.js": "z2x1",
    "./module_resources/sm_utils.js": "s1VG",
    "./dev.js": "/vRa"
  }],
  "6Nr1": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.sme = void 0;

    var e = require("../core_modules/logger.js"),
        r = require("./utils.js");

    e.logger.register("sme");
    var t = {
      sensors: {
        dev_a: {},
        dev_b: {}
      },
      transitioners: {}
    };
    exports.sme = t, t.sensors.field = function (e) {
      return function (t) {
        return t = t.buffer, r.util.last(buffer)[e];
      };
    }, t.sensors.field_diff = function (e) {
      return function (r) {
        var t = (r = r.buffer).length;
        return r[t - 1][e] - r[t - 2][e];
      };
    }, t.is_dev_b = function (e) {
      return "B" == e.dev;
    }, t.is_dev_a = function (e) {
      return "A" == e.dev;
    }, t.sensors.dev_b.field = function (e) {
      return function (t) {
        var n = t.buffer;
        return "B" == (t = r.util.last(n)).dev ? t[e] : (r.util.debug("filter miss"), !1);
      };
    }, t.transitioners.test_turn_on = {
      detector: function detector(e) {
        return !e.STATE.is_on;
      },
      applicator: function applicator(r) {
        r.STATE.is_on = !0, r.debug_mode && e.logger.sme("TURNED ON");
      },
      group: "switch"
    }, t.transitioners.test_turn_off = {
      detector: function detector(e) {
        return e.STATE.is_on;
      },
      applicator: function applicator(r) {
        r.STATE.is_on = !1, r.debug_mode && e.logger.sme("TURNED OFF");
      },
      group: "switch"
    };
  }, {
    "../core_modules/logger.js": "nr01",
    "./utils.js": "vsUZ"
  }],
  "BSty": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.flow = void 0;

    var e = n(require("../module_resources/utils.js")),
        s = require("../module_resources/state_machine_elements.js"),
        r = require("../wrtsm.js"),
        t = require("../core_modules/logger.js");

    function n(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.logger.register("rg");
    var i = {};
    exports.flow = i, i.test_storage_persist = function (e) {
      ws = new r.wrtsm.mods.web_socket("ws://localhost:1234"), ds = new r.wrtsm.mods.data_storage(e), pm = new r.wrtsm.mods.pipe_manager(), pm.connect(ws, ds), ds.start_saving(5), ws.connect(), setTimeout(function () {
        ws.stop_stream(), ds.stop_saving(), console.log("Streaming and saving stopped.");
      }, 21e3);
    }, i.test_storage_replay = function () {
      return ds = new r.wrtsm.mods.data_storage("eugene_walk_rev"), ds.load_session(), ra = new r.wrtsm.mods.raw_analyzer(), pm = new r.wrtsm.mods.pipe_manager(), pm.connect(ds, ra), ds.start_stream(), [ds, ra];
    }, i.test_state_machine = function (e) {
      t.logger.rg("Creating state machine with size: " + e);
      var n = new r.wrtsm.mods.state_machine({
        buffer_size: e,
        gui_mode: !1
      });
      return n.initialize({
        is_on: !1
      }), t.logger.rg("Adding sensors"), n.add_sensor({
        id: "acc_x",
        f: s.sme.sensors.field("acc_x"),
        graph: "g1"
      }), n.add_sensor({
        id: "acc_x_diff",
        f: s.sme.sensors.field_diff("acc_x"),
        graph: "g1"
      }), t.logger.rg("Adding transitioners"), n.add_transitioner("test_turn_on", s.sme.transitioners.test_turn_on), n.add_transitioner("test_turn_off", s.sme.transitioners.test_turn_off), t.logger.rg("Returning sm"), n;
    }, i.test_state_machine_gui = function (e) {
      t.logger.rg("Creating state machine with size: 200");
      var n = new r.wrtsm.mods.state_machine({
        buffer_size: 200,
        gui_mode: !0
      });
      return n.initialize({
        is_on: !1
      }), t.logger.rg("Adding sensors"), n.add_sensor({
        id: "acc_x",
        f: s.sme.sensors.field("acc_x"),
        graph: "g1"
      }), n.add_sensor({
        id: "acc_x_diff",
        f: s.sme.sensors.field_diff("acc_x"),
        graph: "g1"
      }), t.logger.rg("Adding transitioners"), n.add_transitioner("test_turn_on", s.sme.transitioners.test_turn_on), n.add_transitioner("test_turn_off", s.sme.transitioners.test_turn_off), n.init_gui("wrtsm", e), t.logger.rg("Returning sm"), n;
    }, i.playback_gui = function (e) {
      t.logger.rg("Creating state machine with size: 200");
      var n = new r.wrtsm.mods.state_machine({
        buffer_size: 200,
        gui_mode: !0,
        debug_mode: !1
      });
      t.logger.rg("Adding sensors"), n.add_sensor({
        id: "dev_b_gyr_z",
        f: s.sme.sensors.dev_b.field("gyr_z")
      }), n.add_sensor({
        id: "acc_y",
        f: s.sme.sensors.field("acc_y")
      }), n.add_sensor({
        id: "gyr_z",
        f: s.sme.sensors.field("gyr_z")
      }), t.logger.rg("Adding transitioners"), n.add_transitioner("test_turn_on", s.sme.transitioners.test_turn_on), n.add_transitioner("test_turn_off", s.sme.transitioners.test_turn_off), t.logger.rg("Calling sm.init_gui"), n.init_gui("wrtsm", e);
      var i = new r.wrtsm.mods.data_storage("eugene_walk_rev");
      i.load_session();
      var a = new r.wrtsm.mods.pipe_manager();
      return a.connect(i, n), [i, a, n];
    }, i.graph_dances = function () {
      var e = i.test_state_machine_gui({
        g1: ["acc_x", "acc_y"]
      }),
          s = 20,
          r = 0,
          t = setInterval(function () {
        e.ui.handle_sensor_buffer(200 + s * r, {
          acc_x: Math.sin(.02 * r),
          acc_y: -Math.sin(.05 * r)
        }), r++;
      }, 50);
      return [e, t, function () {
        clearInterval(t);
      }];
    }, i.graph_sm_test = function () {
      for (var s = Array(200).fill(0), r = Array(200).fill(0), n = 0; n < 200; n++) {
        var i = 2 + 1 * n;
        s[n] = i;

        var a = test_state_machine(i),
            o = function () {
          a.run_debug_cycle();
        }.bind(a);

        r[n] = e.default.perf(o);
      }

      t.logger.rg("Graphing results... "), bar_graph("Perf", "size", "time", s, r), t.logger.rg("hmm.. ?");
    }, i.EW = function () {
      return d = new r.wrtsm.mods.data_storage("eugene_walk_rev"), d.load_session(), d;
    };
  }, {
    "../module_resources/utils.js": "vsUZ",
    "../module_resources/state_machine_elements.js": "6Nr1",
    "../wrtsm.js": "hs2p",
    "../core_modules/logger.js": "nr01"
  }],
  "oq4E": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.beep = c;
    var e = {};
    e.ctx = new AudioContext(), e.osc = function (t, n, c) {
      var o, r;
      return (o = e.ctx.createOscillator()).frequency.value = n, r = e.ctx.createGain(), o.type = t, r.connect(e.ctx.destination), r.gain.value = c, o.connect(r), o.start(), o;
    };
    var t = 150,
        n = {
      0: 300,
      1: 350,
      2: 400,
      3: 450,
      4: 500
    };

    function c(c) {
      var o = n[c],
          r = e.osc("sine", o, 1);
      setTimeout(function () {
        r.stop();
      }, t);
    }
  }, {}],
  "SoZb": [function (require, module, exports) {
    "use strict";

    function e(e, t) {
      var a = document.createElement("script");
      a.type = "text/javascript", a.readyState ? a.onreadystatechange = function () {
        "loaded" != a.readyState && "complete" != a.readyState || (a.onreadystatechange = null, t && t());
      } : a.onload = function () {
        t && t();
      }, a.src = e, document.getElementsByTagName("head")[0].appendChild(a);
    }

    function t(e, t) {
      var a = document.createElement("link");
      a.type = "text/css", a.rel = "stylesheet", a.readyState ? a.onreadystatechange = function () {
        "loaded" != a.readyState && "complete" != a.readyState || (a.onreadystatechange = null, t && t());
      } : a.onload = function () {
        t && t();
      }, a.href = e, document.getElementsByTagName("head")[0].appendChild(a);
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.load_script = e, exports.load_css = t;
  }, {}],
  "Focm": [function (require, module, exports) {
    "use strict";

    var e = require("./wrtsm.js"),
        s = require("./scripts/rose_gait_workflows.js"),
        o = require("./module_resources/utils.js"),
        r = require("./module_resources/sounds.js"),
        t = require("./core_modules/logger.js"),
        i = require("./module_resources/script_loader.js");

    if (console.log(":: wrtsm initializing ::"), o.util.set_debug(!1), t.logger.register("wrtsm"), e.wrtsm.flow = s.flow, e.wrtsm.util = o.util, e.wrtsm.beep = r.beep, window.Bokeh) t.logger.wrtsm("Bokeh was detected already. If you experience any errors, please make sure that the following resources are included in your html for proper functionality:"), console.log('<link rel="stylesheet" href="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css" type="text/css" />'), console.log('<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js"><\/script>'), console.log('<script type="text/javascript" src="https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js"><\/script>');else {
      var l = function l() {
        t.logger.wrtsm("bokeh-0.12.5.js loaded"), window.ls = i.load_script, (0, i.load_script)("https://cdn.pydata.org/bokeh/release/bokeh-api-0.12.5.min.js", function () {
          console.log("[wrtsm]:: bokeh-api-0.12.5.min.js loaded");
          var e = new Event("wrtsm_ready");
          window.dispatchEvent(e);
        });
      };

      t.logger.wrtsm("Loading Bokeh functionality:"), (0, i.load_script)("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.js", l), (0, i.load_css)("https://cdn.pydata.org/bokeh/release/bokeh-0.12.5.min.css", function () {
        console.log("[wrtsm]:: bokeh-0.12.5.min.css loaded");
      });
    }
    e.wrtsm.load_time = new Date().getTime();
  }, {
    "./wrtsm.js": "hs2p",
    "./scripts/rose_gait_workflows.js": "BSty",
    "./module_resources/utils.js": "vsUZ",
    "./module_resources/sounds.js": "oq4E",
    "./core_modules/logger.js": "nr01",
    "./module_resources/script_loader.js": "SoZb"
  }]
}, {}, ["Focm"], null);
},{}],"../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49502" + '/');

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
},{}]},{},["../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/wrtsm.js"], null)
//# sourceMappingURL=/wrtsm.738fa183.map