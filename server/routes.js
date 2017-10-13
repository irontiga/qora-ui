const http = require("http");
const https = require("https");
const config = require("./config.js");

const routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			console.log(request.params);
			return reply.redirect('/qora/')
		}
	},
	{
		method: 'GET',
		path: '/qora/{path*}',
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
        path: '/getPlugins',
        handler: function(request, reply){
            var pluginList = require("./pluginList.js");
            return reply(pluginList.plugins);
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
        path: '/plugins/404',
        handler: function(request, reply){
            return reply.file('./client/404.html');
        }
    },
    {
        method: '*',
        path: "/proxy/{url*}",
        handler: {
            proxy: {
                mapUri: function(request, callback) {
                    // http://127.0.0.1:3000/qoraProxy/explorer/addr=Qewuihwefuiehwfiuwe
                    // protocol :// path:port / blockexplorer.json?addr=Qwqfdweqfdwefwef
                    //console.log(request.url);
                    // 7...that's the length of '/proxy/'
                    console.log(request.url.href.slice(7))
                    //let url = remote.url + "/" + request.url.href.replace('/' + remote.path + '/', '');
                    //callback(null, url);
                    callback(null, request.url.href.slice(7));
                },
                passThrough: true,
                xforward: true
            }
        }
    },
    // DELETEEEEEEEE...soon
    {
        method: 'GET',
        path: "/api/{requestJSON*}",
        handler: function(request, reply){
            var parsed = JSON.parse(request.params.requestJSON);
            console.log(parsed);
            
            // Converts JSON to a query string
            var urlParams = Object.keys(parsed).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(parsed[k]);
            }).join('&');
            
            var options = {
                host: config.wallet.host,
                port: config.wallet.port,
                path: '/burst?' + urlParams,
                method: 'POST'
            };
            
            function burstRequest(res){
                //console.log(res);   
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log(chunk);
                    reply(chunk);
                });
            }
            http.request(options, burstRequest).end();
            /*if(config.wallet.protocol == "https"){
                https.request(options, burstRequest).end();
            }
            else{
                http.request(options, burstRequest).end();
            }*/
        }
    }
];

module.exports = routes;