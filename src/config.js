var config = require("../config.json");

module.exports = {
	get: get
};

function get(key) {
	var val = config[key];
	if (val !== undefined) {
		return val;
	} else {
		throw new Exception("Missing '" + key + "' config value.");
	}
}
