.. _server-implementation:

*********************
Server Implementation
*********************

.. _intro-text: 

The :ref:`web-socket` class establishes a connection with a remote websocket server and must communicate with it using a predefined protocol, described here. It does so by sending data packets, each of which is a javascript object containing fields `type` and `data`, for example::
  
  {type: "control", data : "stop"}

  
Below is a table describing the appropriate server responses to various messages from the :ref:`web-socket` class.
  
==========  =======  ======================================
Msg Type    Data     Server Response
==========  =======  ======================================
Control     Start    Starts forwarding data packets 
Control     Stop     Stops  forwarding data packets 
Register    ID       Saves CLIENT connection for forwarding 
==========  =======  ======================================

Currently, the websocket server is implemented in :file:`websocket_server.js`, and run via nodejs. It accepts two incoming connections, one from the Muvr device to obtain the raw data, and the other from the client to which it will forward data. In order to distinguish the two a registration is performed by the browser (i.e. client) after it connects. When the server receives a data packet it can relay it to the client using the registered connection.

This architecture may be updated in the future, as the nature of the data source and development requirements change. Stay tuned! 
