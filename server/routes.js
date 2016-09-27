var http = require("http");
var config = require("./config.js");

var routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			console.log(request.params);
			return reply.redirect('/burst/')
		}
	},
	{
		method: 'GET',
		path: '/burst/{path*}',
		handler: function(request, reply){
			console.log(request.params);
			return reply.file('./client/index.html');
		}
	},
	{
		method: 'GET',
		path: '/client/{param*}',
		handler: {
			directory: {
				path: './client',
				redirectToSlash: true,
				index: true
			}
		}
	},
	{
		method: 'GET',
		path: '/plugins/{param*}',
		handler: {
			directory: {
				path: './plugins',
				redirectToSlash: true,
				index: true
			}
		}
	},
	{
		method: 'GET',
		path: '/getPlugins',
		handler: function(request, reply){
			var pluginList = require("./pluginList.js");
			return reply(pluginList.plugins);
		}
	},
    {
        method: 'GET',
        path: "/api/{requestJSON*}",
        handler: function(request, reply){
            var parsed = JSON.parse(request.params.requestJSON);
            console.log(parsed);
            
            var urlParams = Object.keys(parsed).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(parsed[k]);
            }).join('&');
            
            var options = {
                host: config.wallet.host,
                port: config.wallet.port,
                path: '/burst?' + urlParams,
                method: 'POST'
            };

            http.request(options, function(res){
                //console.log(res);   
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log(chunk);
                    reply(chunk);
                });
            }).end();
        }
    }
];

module.exports = routes;