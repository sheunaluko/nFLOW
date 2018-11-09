// bundles all the modules into one object for easy access 
// Mon Oct 22 22:16:23 PDT 2018

import web_socket from "./core_modules/web_socket.js" 
import data_storage from "./core_modules/data_storage.js" 
import pipe_manager from "./core_modules/pipe_manager.js" 
import raw_analyzer from "./core_modules/raw_analyzer.js" 
import state_machine from "./core_modules/state_machine.js" 
import transformer from "./core_modules/transformer.js" 
import simulator from "./core_modules/simulator.js" 
import ui from "./core_modules/ui.js" 

export var mods = { web_socket, data_storage , pipe_manager , raw_analyzer, state_machine, ui, transformer, simulator }

