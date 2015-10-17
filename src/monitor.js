var request = require("request");
var sites = require("../sites.json").sites;
var Site = require("./site");

module.exports = Monitor;

function Monitor(socket) {
	var self = this;

	this.sites = [];
	
	sites.forEach(function(site) {
		self.init(site);
	});

	this.start();
}

Monitor.prototype = {
	init: init,
	ping: ping,
	start: start
};

function init(options) {
	this.sites.push(new Site(options));
}

function ping(site) {
	var start = time();
	request(site.url, function(err, res) {
		time(start);
	});
}

function start() {
	var self = this;
	this.sites.forEach(function(site) {
		self.ping(site);
	});
}

function time(start) {
	var t = new Date().getTime();
	if (start) {
		return t - start;
	} else {
		return t;
	}
}
