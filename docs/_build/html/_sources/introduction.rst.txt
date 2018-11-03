.. _introduction-page:


************
Introduction
************

.. _explainer:

What is RoseGait? 
==================

RoseGait is a browser based software suite for developing and deploying real time `gait training` systems. It is being developed by Dr. Jessica Rose, the Director of `Stanford's Motion and Gait Analysis Laboratory <https://www.stanfordchildrens.org/en/service/motion-gait-analysis-laboratory>`_, in collaboration with `Muvr <https://getmuvr.com/>`_.

.. _architecture:

Software Architecture 
======================

Broadly, RoseGait consists of the following submodules::
  
  web_socket   (establishes and manages connection to raw data stream) 
  pipe_manager (controls flow of data stream between modules) 
  raw_analyzer (validates data stream integrity and generates statistics)
  data_storage (implements data persistence, replay, and download) 
  gait_trainer (implements gait event detection and feedback) 
   
Use the navigation bar to the left to learn more about each of these components, or proceed to :doc:`getting_started`.
  
