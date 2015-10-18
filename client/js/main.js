var socket = io();

socket.on("init", function(data) {
	console.log(data);
});

socket.on("ping", function(data) {
	console.log(data);
});
