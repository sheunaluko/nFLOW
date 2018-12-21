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
})({"src/dev_tmp.js":[function(require,module,exports) {
var flow = {};
var logger = {};

logger.rg = function (d) {
  console.log("[dev]: " + d);
};

logger.sme = function (d) {
  console.log("[sme]: " + d);
};

flow.playback_gui = function (d, debug) {
  var n = 200;
  logger.rg("Creating state machine with size: " + n);
  var sm = new wrtsm.mods.state_machine({
    buffer_size: n,
    gui_mode: true,
    debug_mode: debug
  });
  logger.rg("Adding sensors");
  sm.add_sensor({
    id: "dev_b",
    f: sme.sensors.dev_b
  });
  sm.add_sensor({
    id: "dev_b_gyr_z",
    f: sme.sensors.dev_b_field("gyr_z"),
    level: 1
  });
  sm.add_sensor({
    id: "dev_b_gyr_z_diff",
    f: sme.sensors.dev_b_gyr_z_diff,
    level: 2
  });
  sm.add_sensor({
    id: "dev_b_gyr_z_std",
    f: sme.sensors.bgz_std(20),
    level: 1
  }); //sm.add_sensor({id:"dev_b_gyr_z" , f:sme.sensors.dev_b.field("gyr_z") , level : 3})
  //sm.add_sensor({id: "acc_x_diff" ,f: sme.sensors.field_diff("acc_x")})
  //sm.add_sensor({id: "b_ay" ,f: sme.sensors.dev_b_field("acc_y"), level : 1})
  //sm.add_sensor({id: "b_ax" ,f: sme.sensors.dev_b_field("acc_x"), level : 1})
  //sm.add_sensor({id: "b_az" ,f: sme.sensors.dev_b_field("acc_z"), level : 1})

  logger.rg("Adding transitioners");
  /*
  sm.add_transitioner("test_turn_on", sme.transitioners.test_turn_on )
  sm.add_transitioner("test_turn_off", sme.transitioners.test_turn_off )
  */

  sm.add_transitioner("pd", sme.transitioners.positive_descending);
  sm.add_transitioner("hs", sme.transitioners.hs);
  sm.add_transitioner("pre_to", sme.transitioners.pre_to);
  sm.add_transitioner("to", sme.transitioners.to); // ok so at this point state machine should be initialized 

  logger.rg("Calling sm.init_gui");
  sm.init_gui("wrtsm", d); //will load the file from storage 

  var ds = new wrtsm.mods.data_storage("eugene_walk_rev");
  ds.load_session(); //and then create a pipe manager to connect the stored data file to the state machine 

  var pm = new wrtsm.mods.pipe_manager();
  pm.connect(ds, sm); //return them and can call ds.start_stream() for continuous simulation 
  //OR ds.stream_single_packet() to step one sample

  return [ds, pm, sm];
};

flow.t1 = function () {
  //var d = { misc : [ "dev_b_gyr_z" , "dev_b_gyr_z_diff"  ] } 
  var d = {
    main: ["dev_b_gyr_z"],
    add: ["dev_b_gyr_z_diff"],
    foo: ["dev_b_gyr_z_std"] //var d = { main : ["dev_b_gyr_z" , "b_ax", "b_ay", "b_az" ] }
    //var d = { main : ["dev_b_gyr_z" , "b_ay" ]} 
    //var d = { main : [ "dev_b_gyr_z_diff" ] } // "bgzv10" ] }

  };
  window.d = flow.playback_gui(d, false);
  window.d[0].start_stream(1);
  window.ds = window.d[0];
  window.sm = window.d[2];
};

var sme = {
  sensors: {
    dev_a: {},
    dev_b: {}
  },
  transitioners: {}
};
var beep = wrtsm.beep; // THE FILTERS HAVE ACCESS TO THE ENTIRE STATE MACHINE OBJECT !!!!
//extract a specific field from the data objects 
//i.e. [{:acc_x :acc_y... } , ... ] => [ acc_x, acc_x ... ] 

sme.sensors.field = function (field) {
  return function (d) {
    var buffer = d.buffer;
    return util.last(buffer)[field];
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

sme.sensors.dev_b = function (sm) {
  var d = util.last(sm.buffer);

  if (sme.is_dev_b(d)) {
    return d;
  } else {
    return false;
  }
};

sme.sensors.dev_b_field = function (field) {
  return function (sm) {
    var d = sm.get_sensor_last_1("dev_b");

    if (d) {
      return d[field];
    } else {
      return false;
    }
  };
};

sme.sensors.dev_b_gyr_z_diff = function (sm) {
  var d = sm.get_sensor_last_N("dev_b_gyr_z", 2);

  if (d) {
    return d[1] - d[0];
  } else return false;
};

sme.sensors.bgzv = function (N) {
  return function (sm) {
    var buff = sm.get_sensor_last_N("dev_b", N);

    if (buff) {
      var val = util.variance(buff.map(function (e) {
        return e.gyr_z;
      })) / 30;
      return val;
    } else {
      return false;
    }
  };
};

sme.sensors.bgz_std = function (N) {
  return function (sm) {
    var buff = sm.get_sensor_last_N("dev_b", N);

    if (buff) {
      var val = util.std(buff.map(function (e) {
        return e.gyr_z;
      }));
      return val;
    } else {
      return false;
    }
  };
}; // sme.sensors.dev_b_old.field = function(field) { 
//     //return sme.generic_filter(sme.is_dev_b , d=>d[field] ) 
//     return function(d) {
// 	var buf = d.buffer 
// 	var d = util.last(buf) 
// 	if (d.dev == "B") { 
// 	    return d[field]
// 	} else { 
// 	    util.debug("filter miss")
// 	    return false }
//     }
// }
/// ---------------------------------------- > TRANSITIONERS 


function gait_state(sm) {
  return sm.STATE.gait_state;
}

var params = {
  gyr_z: {
    pd_thresh: 190
  },
  gyr_z_std: {
    pre_to_thresh: 15
  }
};
sme.transitioners.positive_descending = {
  "detector": function detector(sm) {
    // gyr_z is > thresh AND gyr_z derivative is negative AND state is not pd
    var gstate = gait_state(sm);
    var gyr_z = sm.get_sensor_last_1("dev_b_gyr_z");
    var diff = sm.get_sensor_last_1("dev_b_gyr_z_diff");

    if (gyr_z && gstate != 'pd' && gyr_z > params.gyr_z.pd_thresh && diff < 0) {
      return true;
    } else {
      return false;
    }
  },
  "applicator": function applicator(sm) {
    sm.STATE.gait_state = 'pd'; //if (true) { sm.log("PD") ; beep(0) }
  },
  "group": "gait"
};
sme.transitioners.hs = {
  "detector": function detector(sm) {
    // state = pd && diff >= 0 && 
    var gstate = gait_state(sm);
    var diff = sm.get_sensor_last_1("dev_b_gyr_z_diff");

    if (diff && gstate == 'pd' && diff >= 0) {
      return true;
    } else {
      return false;
    }
  },
  "applicator": function applicator(sm) {
    sm.STATE.gait_state = 'hs';

    if (true) {
      sm.log("hs");
      beep(0);
    }
  },
  "group": "gait"
};
sme.transitioners.pre_to = {
  "detector": function detector(sm) {
    // state = pd && diff >= 0 && 
    var gstate = gait_state(sm);
    var gyr_z_std = sm.get_sensor_last_1("dev_b_gyr_z_std");

    if (gyr_z_std && gstate == 'hs' && gyr_z_std <= params.gyr_z_std.pre_to_thresh) {
      return true;
    } else {
      return false;
    }
  },
  "applicator": function applicator(sm) {
    sm.STATE.gait_state = 'pre_to'; //if (true) { sm.log("pre_to") ; beep(2) }
  },
  "group": "gait"
};
sme.transitioners.to = {
  "detector": function detector(sm) {
    // state = pd && diff >= 0 && 
    var gstate = gait_state(sm);
    var diff = sm.get_sensor_last_1("dev_b_gyr_z_diff");

    if (diff && gstate == 'pre_to' && diff >= 0) {
      return true;
    } else {
      return false;
    }
  },
  "applicator": function applicator(sm) {
    sm.STATE.gait_state = 'to';

    if (true) {
      sm.log("to");
      beep(3);
    }
  },
  "group": "gait" // ------------------------------------------------------------------------------------------

};
sme.transitioners.test_turn_on = {
  "detector": function detector(state_machine) {
    return !state_machine.STATE.is_on;
  },
  "applicator": function applicator(state_machine) {
    state_machine.STATE.is_on = true;

    if (state_machine.debug_mode) {
      logger.sme("TURNED ON");
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
      logger.sme("TURNED OFF");
    }
  },
  "group": "switch"
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
},{}]},{},["../../.nvm/versions/node/v11.4.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/dev_tmp.js"], null)
//# sourceMappingURL=/dev_tmp.b4aa1fa2.map