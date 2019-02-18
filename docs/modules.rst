.. _modules:


*******
Modules 
*******

In the spirit of modular software, and since nFLOW consists of a network of :file:`nodes` piping and analyzing signals in realtime, the :file:`base_node` class was created to collect shared :file:`node` attributes into an inheritable structure. It is described below.  Most of the classes described below inherit from :file:`base_node`, though some may override certain methods.

.. _base-node:

Base Node
=========

Defined in :file:`base_node.js`. The base class from which all node instances inherit. 

.. autoclass:: base_node
   :members: 

.. _web-socket:

Web Socket
==========

Inherits from :file:`base_node`. Defined in :file:`web_socket.js` and consists of a javascript class which handles accessing an incoming raw data stream. 

.. autoclass:: web_socket
   :members: 

.. _data-storage:

Data Storage
============

Inherits from :file:`base_node`. Defined in :file:`data_storage.js`. 

.. autoclass:: data_storage
   :members: 
      
      
.. _transformer-node:

Transformer
===========

Inherits from :file:`base_node`. Defined in :file:`transformer.js`. 

.. autoclass:: transformer
   :members: 
            
.. _event-detector: 
      
Event Detector
==============

Inherits from :file:`base_node`. Defined in :file:`event_detector.js`. 

.. autoclass:: event_detector 
   :members:
   
.. _logger-node: 
	       
Logger
======

Inherits from :file:`base_node`. Defined in :file:`logger_node.js`. 

.. autoclass:: logger_node
   :members:

.. _simulator-node: 
	       
Simulator
=========

Inherits from :file:`base_node`. Defined in :file:`simulator.js`. 

.. autoclass:: simulator
   :members:   
   
.. _state-machine-utils:    

State Machine 
=============

Inherits from :file:`base_node`. Defined in :file:`state_machine.js`. This class encapsulates functionality for configuration and implementation of a state machine detection system. 

Broadly, the architecture consists of a `buffer` which holds the last `buffer_size` streaming values received. Each time a new data packet is received it is appended to the buffer and the oldest value is dropped. 

Below are definitions of key components of the architecture: 

=====================  =========================================================================================
Component              Description
=====================  =========================================================================================
Sensor                 A function which takes  a `state_machine` and returns a scalar (plottable) value OR false 
Detector               A function which takes a `state_machine` and returns a boolean. 
Applicator             A function which takes a  `state_machine`  and modifies its state in a particular way 
Transitioner           A dictionary that consists of a paired `detector` and `applicator` 
=====================  =========================================================================================


Sensors 
------- 

Sensors enable three important features:

* Computation of derived data values in realtime 
* Use of said values to easily create Detectors by combining a Sensor and a comparison operation 
* Declarative style specification of graphing derived values in realtime (i.e specify which Sensors should be graphed) 
  
For example, a Sensor which calculates the diff of an incoming voltage signal would look like the following::
  
  function diff(state_machine) { 
     var buffer = state_machine.buffer 
     var len = buffer.length 
     
     //in general, the buffer consists of data objects, which have fields of interest
     //for example, if we are interested in the voltage measurement for each data packet... 
     var voltages = buffer.map( e => e['voltage'] ) 
     
     return voltages[len-1] - voltages[len-2]   //returns the diff of the last two values 
  } 

  
  


