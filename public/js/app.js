var socket = io();

socket.on('connect', function(){
	console.log("connected to server");
});

socket.on('message', function(message){
	console.log('New Message');
	console.log(message.text);

	jQuery('.messages').append('<p>' + message.text + '</p>');

});

// Handels submitting of new message

var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
	
});