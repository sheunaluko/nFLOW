.. _introduction-page:


************
Introduction
************

.. _explainer:

What is WRTSM? 
==================


Web Realtime State Machine, or WRTSM, is a javascript library built for protyping and implementing real time detection and feedback systems. Data is piped in realtime via websockets into a configurable state machine, which allows visualization of both raw and derived data features. Both raw data and derived features trigger state transitions through arbitrarily defined "detectors" and "applicators", which allows for the implementation of various feedback and detection systems. 

.. _architecture:

Software Architecture 
======================

Broadly, WRTSM consists of the following submodules::
  
  web_socket    (establishes and manages connection to raw data stream) 
  pipe_manager  (controls flow of data stream between modules) 
  raw_analyzer  (validates data stream integrity and generates statistics)
  data_storage  (implements data persistence, replay, and download) 
  state_machine (prototypes and implments realtime detection or feedback systems)
   
Use the navigation bar to the left to learn more about each of these components, or proceed to :doc:`getting_started`.
  
