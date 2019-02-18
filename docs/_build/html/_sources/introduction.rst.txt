.. _introduction-page:


************
Introduction
************

.. _explainer:

What is nFLOW? 
==================


nFLOW (Node Flow) is a javascript library that was built for protyping and implementing real time detection and feedback systems. Data is piped in realtime via websockets into a configurable state machine, which allows visualization of both raw and derived data features. Both raw data and derived features trigger state transitions through arbitrarily defined "detectors" and "applicators", which allows for the implementation of various feedback and detection systems. 


.. _architecture:

Software Architecture 
======================

Broadly, nFLOW consists of the following submodules::
  
  base_node      (base class for defining inheritable attributes of nflow "nodes")
  logger_node    (logs the output that is piped to it - often used for debugging and inspection)
  transformer    (applies a transformer function to a data stream)
  web_socket     (establishes and manages connection to socket data streams)
  data_storage   (implements data persistence, replay, and download) 
  simulator      (generates signals and can be used for testing and development) 
  state_machine  (prototypes and implments realtime detection or feedback systems)
  ui             (defines classes for realtime signal graphing)
  event_detector (detects and outputs "events" from arbitrary input signals)
  
   
Use the navigation bar to the left to learn more about each of these components, or proceed to :doc:`getting_started`.
  
