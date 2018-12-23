// bundles all the modules into one object for easy access 
// Mon Oct 22 22:16:23 PDT 2018

import web_socket from "./core_modules/web_socket.js" 
import data_storage from "./core_modules/data_storage.js" 
import pipe_manager from "./core_modules/pipe_manager.js" 
import raw_analyzer from "./core_modules/raw_analyzer.js" 
import state_machine from "./core_modules/state_machine.js" 
import transformer from "./core_modules/transformer.js" 
import logger_node from "./core_modules/logger_node.js" 
import simulator from "./core_modules/simulator.js" 
import ui from "./core_modules/ui.js" 
import event_detector from "./core_modules/event_detector.js" 
import base_node  from "./core_modules/base_node.js" 
import web_socket_tmp  from "./core_modules/web_socket_tmp.js" 



export var mods = { web_socket, data_storage , pipe_manager , raw_analyzer, state_machine, ui, transformer, simulator, logger_node, event_detector ,base_node , web_socket_tmp } 

