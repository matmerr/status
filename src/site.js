var _ = require("lodash");
var Ping = require("./ping");

module.exports = Site;

var id = 0;

function Site(args) {
	_.merge(this, _.extend({
		id: id++,
		name: "",
		url: "",
		pings: [],
		sockets: null
	}, args));
}

Site.prototype.addPing = function(args) {
	var max = 1440;
	var ping = new Ping({
		ms: args.ms,
		timestamp: args.timestamp
	});

	this.pings.push(ping);
	this.emit(ping);

	if (this.pings.length > max) {
		this.pings.splice(0, this.pings.length - max);
	}
};

Site.prototype.emit = function(ping) {
	console.log(ping);
	this.sockets.emit(
		"ping",
		_.extend(
			{id: this.id},
			ping
		)
	);
};
