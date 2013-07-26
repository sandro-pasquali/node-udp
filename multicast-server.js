var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var testMessage = "[hello world] pid: " + process.pid;
var multicastAddress = '239.1.2.3'
var multicastPort = 5554

socket.bind(multicastPort, '0.0.0.0', function() {
	socket.addMembership(multicastAddress);
});

socket.on("message", function ( data, rinfo ) {
  console.log("Message received from ", rinfo.address, " : ", data.toString());
});

setInterval(function () {
  socket.send(new Buffer(testMessage), 
      0, 
      testMessage.length, 
      multicastPort, 
      multicastAddress, 
      function (err) {
        if (err) console.log(err);

        console.log("Message sent");
      }
  );
}, 1000);

var PORT = 5554;
var HOST = '0.0.0.0';
var client = dgram.createSocket('udp4');

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true)
    client.setMulticastTTL(128); 
    client.addMembership('239.1.2.3', HOST);
});

client.on('message', function (message, remote) {   
    console.log('A: Epic Command Received. Preparing Relay.');
    console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + message);
});

client.bind(PORT, HOST);