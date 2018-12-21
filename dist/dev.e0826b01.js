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
})({"src/scripts/dev.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//window.addEventListener("wrtsm_ready" , wrtsm_init) 
var util = wrtsm.util;
var tf = wrtsm.mods.transformer;
var state_machine = wrtsm.mods.state_machine;
var mods = wrtsm.mods;
var pm = new mods.pipe_manager();

function wrtsm_init() {
  // - 
  var t0 = util.now(); //define transformers 

  var bin = new tf(function (d) {
    if (d > 0) {
      return 1;
    } else {
      return -1;
    }
  });
  var add_time = new tf(function (d) {
    return {
      val: d,
      time: util.now() - t0
    };
  }); // create objects

  var sim = new wrtsm.mods.simulator({
    mode: "sin"
  });
  var sm = new wrtsm.mods.state_machine({
    gui_mode: true
  });
  var pm = new wrtsm.mods.pipe_manager(); //configure the state machine 

  sm.add_sensor({
    id: "val",
    f: wrtsm.smu.sensors.field("val")
  }); // wire stuff up 

  pm.connect(sim, bin).connect(add_time).connect(sm); // init gui 

  sm.init_gui("wrtsm", {
    g1: ["val"]
  }); //start the stream at rate of 20ms

  sim.start_stream(400);
} // for rosegait init, we have to accomplish a coup of things 
// 1. create a websocket object and connect to the websocket_server (on localhost:1234  by default) 
// 2. Create the desired pipeline for analysis and vizualization of the desired data 
// 3. Wrap the two above things into a function that is run AFTER the following two things 
//  - a) The websocket_server is started via node websocket_server.js 
//  - b) The ios app has connected to websocket_server by entering its url ( IP:1234 ) 


function rose_gait_test_connection() {
  //1. create web socket object
  ws = new mods.web_socket("ws://localhost:1234"); //2. create a logger node  

  ln = new mods.logger_node(); //3. connect them with pipe manager 

  pm = new mods.pipe_manager();
  pm.connect(ws, ln); //4. launch the web socket connection and we should get streaming data provided 
  //that 3a and 3b have been satisfied 

  ws.connect(); //5. return objects for manipulation 

  return {
    ws: ws,
    ln: ln,
    pm: pm
  };
}

function rose_gait_init() {// TODO --> creation of satte machine and definition of relevant parameters, etc.. 
  // also TODO -> modify index.js to make use of menuX ! 
  //2. create state machine and define sensors 
  //let sm_buffer = 200 
  //let sm        = state_machine({buffer_size : sm_buffer , gui_mode: true}) 
}

var test_matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]; // FOR ARBITRARY GRAPHING -----------------------------------------------                                                   

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
      x_len = opts.x_len;
  var graph_ui = new mods.ui();
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
    x_len: 1000
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
      x_len = opts.x_len;
  var grapher = {};
  grapher.init = true;
  grapher.graph_ui = null;

  grapher.process_data = function (o) {
    if (grapher.init) {
      grapher.graph_ui = make_graph_for_obj({
        o: o,
        container: container,
        x_len: x_len
      });
      grapher.init = false;
    } else {
      var t = util.now(); //console.log(o)

      graph_object(t, o, grapher.graph_ui);
    }
  };

  return grapher;
} //PROBLEM  !! when removing time attr from node then NO GREAPH! 


function get_sim_node(opts) {
  // - 
  var t0 = util.now(); //define a transformer

  var node = new tf(function (d) {
    var packet = {
      val: d,
      time: util.now() - t0 //console.log(packet) 

    };
    return packet;
  }); // create objects

  var sim = new wrtsm.mods.simulator(opts);
  var pm = new wrtsm.mods.pipe_manager(); // wire stuff up 

  pm.connect(sim, node);
  return {
    sim: sim,
    node: node
  };
}

function wrap_sim(s) {
  var pm = new mods.pipe_manager();
  var t0 = util.now(); //define a transformer

  var t = new tf(function (d) {
    var packet = {
      val: d,
      time: util.now() - t0
    };
    return packet;
  });
  pm.connect(s, t);
  return {
    'start_stream': function () {
      s.start_stream();
    }.bind(s),
    'set_data_handler': function (f) {
      t.set_data_handler(f);
    }.bind(t)
  };
}

function dev_0() {
  var w = document.getElementById("wrtsm");

  var _get_sim_node = get_sim_node({
    mode: "rand"
  }),
      sim = _get_sim_node.sim,
      node = _get_sim_node.node;

  var grapher = get_object_grapher(w);
  node.set_data_handler(grapher.handler);
  sim.start_stream();
  return {
    sim: sim,
    node: node,
    grapher: grapher
  };
}

function dev_1() {
  var sim = wrap_sim(new mods.simulator({
    mode: "rand",
    offset: 10,
    multiplier: 1
  }));
  var grapher = get_object_grapher(document.getElementById("wrtsm"));
  var ln = new mods.logger_node();
  var ED = new mods.event_detector();
  pm.connect(sim, ED).connect(grapher);
  sim.start_stream();
  return {
    sim: sim,
    grapher: grapher,
    ED: ED
  };
}

function dev_2() {
  var sim = new mods.simulator({
    mode: "burst"
  });
  var grapher = get_object_grapher({
    container: document.getElementById("wrtsm"),
    x_len: 1000
  });
  var ln = new mods.logger_node();
  var ED = new mods.event_detector({
    baseline_buffer_size: 5
  });
  pm.connect(sim, ED).connect(grapher); //pm.connect(sim,grapher)
  //pm.connect(sim,ln)
  //pm.connect(sim,ED).connect(ln)

  sim.start_stream(); //return {sim, grapher, ED}
  //an example of how to graph an event -- 
  //wrtsm.mods.ui.multi_line_graph("wrtsm", { ys : [ ED.events[1545375031336].map(e=>e.y) ] } )

  return {
    sim: sim,
    ED: ED
  };
}

var test_data = {
  x: 10,
  y: 20
};
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
},{}]},{},["../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts/dev.js"], null)
//# sourceMappingURL=/dev.e0826b01.map