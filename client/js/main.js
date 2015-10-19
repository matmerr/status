$(function() {
	var socket = io();
	var sites = $("#sites");

	socket.on("init", function(data) {
		sites.html("");
		data.sites.forEach(
			function(site) {
				sites.append(render("#site", {
					id: site.id,
					name: site.name,
					url: site.url,
					ping: site.pings.pop().ping
				}));
			}
		);
	});

	socket.on("ping", function(data) {
		console.log(data);
		$("#site-" + data.id)
			.find(".ping")
			.html(data.ping + "ms");
	});

	var cache = {};
	function render(id, data) {
		var html = $(id).html();
		if (html) {
			return (cache[id] = cache[id] || Handlebars.compile(html))(data);
		} else {
			return "";
		}
	}
});
