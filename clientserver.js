var dgram = require("dgram");

//	Create a udp4 server
//
var server = dgram.createSocket("udp4");

//	Messages are handled here
//
server.on("message", function(msg, info) {
	console.log("server got: " + msg + " from " +
	info.address + ":" + info.port);
});

//	Server listening on localhost, port 41234.
//	Callback is fired once socket is listening.
//
server.bind(41234, function() {

	var address = server.address();
	console.log("server listening " + address.address + ":" + address.port);

	//	Create a client, and send a message
	//
	var client = dgram.createSocket("udp4");
	
	var message = new Buffer("UDP says Hello!");

	client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
		client.close();
	});
});

//	Optionally, you may want to handle the "listening" event, which 
//	functions like the #bind callback, above:
//
//	server.bind(41234) <- no callback
//
//	server.on("listening", function() {
//		var address = server.address();
//		console.log("server listening " + address.address + ":" + address.port);
//	});
//