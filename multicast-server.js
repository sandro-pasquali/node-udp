var PORT = 8088;
var news = [
   "Borussia Dortmund wins German championship",
   "Tornado warning for the Bay Area",
   "More rain for the weekend",
   "Android tablets take over the world",
   "iPad2 sold out",
   "Nation's rappers down to last two samples"
];

var dgram = require('dgram'); 
var server = dgram.createSocket("udp4"); 
server.bind(PORT, "68.67.148.72");

server.on("listening", function() {

	server.setBroadcast(true)
	server.setMulticastTTL(128);
	server.addMembership('localhost'); 

	function broadcastNew() {
		var message = new Buffer(news[Math.floor(Math.random()*news.length)]);
		server.send(message, 0, message.length, PORT, "68.67.148.72");
		console.log("Sent " + message + " to the wire...");
		//server.close();
	}
	
	setInterval(broadcastNew, 3000);
});

