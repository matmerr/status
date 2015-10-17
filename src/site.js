var _ = require("lodash");

module.exports = Site;

function Site(args) {
	_.merge(this, _.extend({
		name: "",
		url: "",
		pings: []
	}, args));
}
