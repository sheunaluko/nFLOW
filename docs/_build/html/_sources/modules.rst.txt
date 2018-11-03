.. _modules:


*******
Modules 
*******

.. _web-socket:

Web Socket
==========

Defined in :file:`web_socket.js` and consists of a javascript class which handles accessing an incoming raw data stream. 

.. autoclass:: web_socket
   :members: 

.. _pipe-manager:

Pipe Manager
============

Defined in :file:`pipe_manager.js`. 

.. autoclass:: pipe_manager
   :members: 


.. _raw-analyzer:


Raw Analyzer
============

Defined in :file:`raw_analyzer.js`. 

.. autoclass:: raw_analyzer 
   :members: 



.. _data-storage:

Data Storage
============

Defined in :file:`data_storage.js`. 

.. autoclass:: data_storage
   :members: 
      

.. _state-machine-utils:    

State Machine 
=============

Defined in :file:`state_machine.js`. This class encapsulates functionality for configuration and implementation of a state machine detection detection system. 

Broadly, the architecture consists of a `buffer` which holds the last `buffer_size` streaming values received. Each time a new data packet is received it is appended to the buffer and the oldest value is dropped. 

Below are definitions of key components of the architecture: 

=====================  ============================================================================
Component              Description
=====================  ============================================================================
Sensor                 A function which takes  a `buffer` and returns scalar (plottable) value. 
Detector               A function which takes a `buffer` and returns a boolean. 
Applicator             A function which modifies the state of the state machine in a particular way 
Transitioner           A dictionary that consists of a paired `detector` and `applicator` 
=====================  ============================================================================


Sensors 
------- 

Sensors enable three important features:

* Computation of derived data values in realtime 
* Use of said values to easily create Detectors by combining a Sensor and a comparison operation 
* Declarative style specification of graphing derived values in realtime (i.e specify which Sensors should be graphed) 
  
For example, a Sensor which calculates the diff of an incoming signal would look like the following::
  
  function derivative(buffer) { 
     var len = buffer.length 
     return buffer[len-1] - buffer[len-2]   //returns the diff of the last two values 
  } 
      

  
Performance
-----------

The limiting factor for application perfomance is the web_socket data stream sample rate. The `Muvr <https://getmuvr.com/>`_ prototype currently streams at 50hz, or one sample approximately every 20ms. 

One `cycle` of the state machine consists of::
  
  1. Receipt of new data packet 
  2. Update of buffer
  3. Calculation and update of all defined Sensors
  4. Sequential application of all Transitioners
   
In addition, the UI, including realtime streaming graphs, must be updated within this time window of 20ms as well before a new sample arrives. 

Considering the above, we have the following simple formula to ensure proper realtime performance::
  
  state_machine_cycle_time + ui_update_time < 20ms 



.. _gait-trainer:

Gait Trainer
============

Defined in :file:`gait_trainer.js`. 

.. autoclass:: gait_trainer  
   :members: 


