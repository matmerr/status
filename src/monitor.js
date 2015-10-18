var _ = require("lodash");
var request = require("request");
var sites = require("../sites.json").sites;
var Ping = require("./ping");
var Site = require("./site");

module.exports = Monitor;

function Monitor(sockets) {
	var self = this;

	this.sites = [];
	this.sockets = sockets;
	
	sites.forEach(function(site) {
		self.addSite(site);
	});
}

Monitor.prototype.start = function() {
	var self = this;
	this.sites.forEach(function(site) {
		ping(site);
	});
};

Monitor.prototype.addSite = function(args) {
	var site = new Site({
		name: args.name,
		url: args.url,
		sockets: this.sockets
	});

	this.sites.push(site);

	ping(site);
};

Monitor.prototype.toJSON = function() {
	var json = {
		sites: []
	};
	
	this.sites.forEach(function(site) {
		json.sites.push(_.omit(site, "sockets"));
	});
	
	return json;
};

function ping(site, last) {
	var delay = 0;
	
	if (last) {
		delay = 1000 * 5;
		delay = delay - (time() - last);
		if (delay < 0) {
			delay = 0;
		}
	}

	setTimeout(function() {
		var start = time();
		var url = site.url;

		request(url, function(err, res) {
			var ms = time(start);
			site.addPing({
				ms: ms,
				timestamp: time()
			});
		});

		ping(site, start);
	}, delay);
}

function time(start) {
	var t = new Date().getTime();
	if (start) {
		return t - start;
	} else {
		return t;
	}
}
