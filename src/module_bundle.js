// bundles all the modules into one object 
// Mon Oct 22 22:16:23 PDT 2018

import base_node  from "./core_modules/base_node.js" 
import data_storage from "./core_modules/data_storage.js" 
import web_socket from "./core_modules/web_socket.js" 
import logger_node from "./core_modules/logger_node.js" 
import ui from "./core_modules/ui.js" 
import {ui_object_grapher} from "./core_modules/ui.js"
import transformer from "./core_modules/transformer.js" 
import simulator from "./core_modules/simulator.js" 
import state_machine from "./core_modules/state_machine.js" 
import event_detector from "./core_modules/event_detector.js" 

export var mods = { web_socket, data_storage , state_machine, ui, transformer, simulator, logger_node, event_detector ,base_node, ui_object_grapher }

