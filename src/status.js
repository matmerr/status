var config = require("./config");
var express = require("express");
var io = require("socket.io");
var http = require("http");
var version = require("../package.json").version;

module.exports = start;

var sockets;

function start() {
	var app = express().use(express.static("client"));
	var srv = http.createServer(app);

	srv.listen(
		config("port"),
		config("host")
	);

	sockets = io(srv);
	sockets.on("connect", function(s) {
		init(s);
	});

	console.log("");
	console.log("status@" + version);
	console.log("");
	console.log("Config:");
	console.log("  host " + config("host"));
	console.log("  port " + config("port"));
	console.log("");
	console.log("Server started!");
	console.log("Press ctrl-c to stop");
	console.log("");
}

function init(socket) {
	console.log("Client connected");
}
