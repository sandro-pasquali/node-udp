var dgram = require('dgram');

var host = '0.0.0.0';

var client = dgram.createSocket('udp4');
var socket = dgram.createSocket('udp4');

var multicastAddress 	= '239.1.2.3'
var multicastPort 		= 5554
var cnt 				= 1;
var sender;

socket.bind(multicastPort, '0.0.0.0', function() {
    socket.setBroadcast(true)
    socket.setMulticastTTL(128);
    socket.addMembership(multicastAddress);
});

socket.on("message", function(data, info) {
	console.log("Server received message: ", info.address, " : ", data.toString());
});

(sender = function() {
	var msg = new Buffer("This is message #" + cnt);
	socket.send(
		msg,
		0,
		msg.length,
		multicastPort,
		multicastAddress,
		function(err) {
			if(err) {
				throw err;
			}
			
			console.log("Message sent");
		}
	);
	
	++cnt;
	
	setTimeout(sender, 1000);
	
})();

client.on('listening', function() {
    var address = this.address();
    console.log('Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true)
    client.setMulticastTTL(128);
    client.addMembership('239.1.2.3', host);
});

client.on('message', function(message, remote) {
    console.log('Client received message from ' + remote.address + ':' + remote.port);
    console.log('The message is: ' + message);
});

client.bind(multicastPort, host);
