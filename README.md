SynConfig
=========

It is a syncing server, in turn it is just an library written with javascript/ socket.io/ redis store.

What it will do?

Synconfig, will sync the application functionally between multiple devices based on login authentication, with the help of pub/sub in redis and socket.io. Socket.io will create a bandwidth, through that bandwidth the clients will talk with the server, then the redis will help to create a seperate channel for each clients and we can subscribe it, afte these we can share the data changed between devices, so the communication will ne nXn. Synconfig is inclusive of SocketServer, Provider, and some client libraries. The role of each is detailed further,


Roles of SocketServer

    a. Establishing the connection with the application through the client library

    b. Receiving data through SynConfig protocol with some hierarchy

    c. Handling user-defined events coming from the client library

    d. Creating individual Data-store for all clients with time-stamp, but creates only one Data-store in case of group

    e. Publishing data in proper channel, and hand over the handler to provider.


Roles of Provider

    a.Subscribe the channels published by SocketServer

    b. Provide the data to clients on need.


Roles of Client Library

    a. Creating socket between the Socketserver and application
    b. Emiting user-defined events to the SocketServer with some hierarchical data about application

    c. Parsing the data sent back by the Socketserver.


About Hierarchy used [Application:Groups:Login:Client-id]

Application -->    It is either ROR app/ node.js app/ or some other app, which have separate client library

Groups       -->    An appplication will have many groups, if possible feature seperation will also be included

Login         -->    Every group will have a group-id or individual-id

Clients       -->    ipad, iphone, andriod, pc/laptop type of clients are possible.

 Why redis-store ?

    The difference is that when using the default MemoryStore, any message that we emit in a provider will only be sent to clients connected to the same provider, since there is no IPC between the providers. Using the RedisStore, the message will be published to a redis server, which all your provider are subscribing to. Thus, the message will be picked up and broadcast by all providers, and all connected clients, and the application is capable to scale.
