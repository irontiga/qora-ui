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
        path: '/plugins/{path*}',
        handler: function (request, reply) {
            return reply.file("./plugins/" + request.params.path).header('Access-Control-Allow-Origin', '*');
        }
    },
    /*{
        method: 'GET',
        path: '/plugins/{param*}',
        handler: {
            directory: {
                path: './plugins',
                redirectToSlash: true,
                index: true
            }
        }
    },*/
    {
        method: 'GET',
        path: '/plugins/404',
        handler: function(request, reply){
            return reply.file('./client/404.html');
            // Error code isn't needed...unecessary error to handle
            //return reply.file('./client/404.html').code(404);
        }
    }
];

module.exports = routes;