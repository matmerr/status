var config = require("./config");
var express = require("express");
var io = require("socket.io");
var http = require("http");
var version = require("../package.json").version;
var Monitor = require("./monitor");

module.exports = start;

var sockets;
var monitor;

function start() {
	var app = express().use(express.static("client"));
	var server = http.createServer(app);

	server.listen(
		config.get("port"),
		config.get("host")
	);

	monitor = new Monitor();

	sockets = io(server);
	sockets.on("connect", function(s) {
		init(s);
	});
	
	console.log("");
	console.log("status@" + version);
	console.log("");
	console.log("Config:");
	console.log("  host " + config.get("host"));
	console.log("  port " + config.get("port"));
	console.log("");
	console.log("Server started!");
	console.log("Press ctrl-c to stop");
	console.log("");
}

function init(socket) {
	console.log("Client connected");
}
