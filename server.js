
 // Starting the Redis-Server ...
var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("redis-server", puts);

 // Server Setting .. 
var express = require('express');
var server  = require('express').createServer();
server.listen(2013);
//server.use(express.static(__dirname));
var io     = require('socket.io').listen(server);
var MemoryStore = express.session.MemoryStore;
console.log("express::::::::::::::::::::" +MemoryStore);
//Store using Redis ..

var redis  = require('socket.io/node_modules/redis');
var RedisStore = require('socket.io/lib/stores/redis');
var pub = redis.createClient(6379,"192.168.2.8");
var sub = redis.createClient(6379,"192.168.2.8");
var store = redis.createClient(6379,"192.168.2.8");
var db = redis.createClient(6379,"192.168.2.8");
io.set('store', new RedisStore({redisPub:pub, redisSub:sub, redisClient:store}));
var redisDb = redis.createClient(6379,"192.168.2.8");


server.get('/', function (req, res) {
	console.log(__dirname.toString());
        console.log("Server started successfully!!");
	res.sendfile(__dirname + '/index.html');

});


server.use(express.static(__dirname));

console.log("http://192.168.2.8:2013");


io.sockets.on('connection', function (socket){
        var x=Math.floor((Math.random()*socket.id));
//	console.log(x);

console.log("express.sid is " +typeof(express.sid));
socket.emit("id",x);
        console.log(socket.id);
        
	socket.join("resizer");
        socket.on('get_position', function (height,width,pHeight, pWidth,val) {
	        console.log("Height: " +height);
        	console.log("width:" +width);
//                db.set("rh",height,redis.print);
                db.getset("rh",height,redis.print);
                db.persist("rh",redis.print);
//                db.set("rw",width,redis.print);
                db.getset("rw",width,redis.print);
                db.persist("rw",redis.print);
                 var x=Math.floor((Math.random()*socket.id));
                 console.log("Random value: " +x);
		socket.broadcast.emit("changeSize",height,width, pHeight, pWidth,val,x);
        });
        socket.on('pos',function(top,left){
            socket.broadcast.emit("c",top,left);

        });
        socket.on('disconnect',function(){
console.log("disconnected");

});

});
