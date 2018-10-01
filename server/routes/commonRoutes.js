const config = require("../../config/config-loader.js")

const routes = [
    {
        method: 'GET',
        path: '/src/{param*}',
        handler: {
            directory: {
                path: './src',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/node_modules/{param*}',
        handler: {
            directory: {
                path: './node_modules',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/bower_components/{param*}',
        handler: {
            directory: {
                path: './bower_components',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/getConfig',
        handler: (request, h) => {
            const response = {
                config
            }
            delete response.config.tls
            return JSON.stringify( response )
        }
    }
]

module.exports = routes