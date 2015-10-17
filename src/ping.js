var _ = require("lodash");

module.exports = Ping;

function Ping(args) {
	_.merge(this, _.extend({
		ms: "",
		timestamp: ""
	}, args));
}
