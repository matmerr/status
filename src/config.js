var config = require("../config.json");

module.exports = function(key) {
	var val = config[key];
	if (val !== undefined) {
		return val;
	} else {
		throw new Exception("Missing '" + key + "' config value.");
	}
}
