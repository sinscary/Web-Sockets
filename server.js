var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){//it lets to listen for events
	console.log('User connected via socket.io');

	socket.on('message', function(message){ //io emits messages to all users including sender while socket.broadcast emits to all except user
		console.log('message recieved: '+message.text);

		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	socket.emit('message', { 
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});	
}); 

http.listen(PORT, function(){
	console.log('Server started');
});