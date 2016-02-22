var routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			console.log(request.params);
			return reply.redirect('/fractal/')
		}
	},
	{
		method: 'GET',
		path: '/fractal/{path*}',
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
	}
];

module.exports = routes;