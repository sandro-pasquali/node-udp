var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

var host				= '0.0.0.0';
var multicastAddress 	= '230.1.2.3';
var multicastPort 		= 5554;

socket.bind(multicastPort, host);

socket.on("listening", function() {
	console.log('server listening');
    this.setBroadcast(true)
    this.setMulticastTTL(64);
    this.addMembership(multicastAddress, host);
});

var cnt = 1;
var sender;

(sender = function() {
	var msg = new Buffer("This is message #" + cnt);
	socket.send(
		msg,
		0,
		msg.length,
		multicastPort,
		multicastAddress
	);
	
	++cnt;
	
	setTimeout(sender, 1000);
	
})();

dgram.createSocket('udp4')
.on('message', function(message, remote) {
    console.log('Client1 received message ' + message + ' from ' + remote.address + ':' + remote.port);
})
.bind(multicastPort, multicastAddress);

dgram.createSocket('udp4')
.on('message', function(message, remote) {
    console.log('Client2 received message ' + message + ' from ' + remote.address + ':' + remote.port);
})
.bind(multicastPort, multicastAddress);
