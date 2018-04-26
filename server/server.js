const serverFactory = require("./serverFactory.js")

const primaryRoutes = require('./routes/primaryRoutes.js')
const pluginRoutes = require('./routes/pluginRoutes.js')

//const QORA_CONFIG = require("../config.js")
const config = require("../config/config-loader.js")


primaryServer = new serverFactory(primaryRoutes, config.primary.domain, config.primary.port)
primaryServer.startServer()
    .then(server => {
    console.log(`Primary server started at ${server.info.uri} and listening on ${server.info.address}`)
})
    .catch(e => {
    console.error(e)
})


pluginServer = new serverFactory(pluginRoutes, config.plugins.domain, config.plugins.port)
pluginServer.startServer()
    .then(server => {
    console.log(`Plugin server started at ${server.info.uri} and listening on ${server.info.address}`)
})
    .catch(e => {
    console.error(e)
})