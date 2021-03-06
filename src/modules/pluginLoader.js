"use strict"

import Wimp from "./wimp/wimp.js"
import parentWimpAPI from "./parentWimpAPI.js"
// import config from "../../config.js"

// Called from an instance of MainApp
export default function pluginLoader(plugins, config){
    // console.log(config)
    plugins.forEach(plugin => {
        const frame = document.createElement("iframe")
        frame.className += "pluginJSFrame"
        frame.sandbox = "allow-scripts allow-same-origin"
        // Why not support http/https
        frame.src = window.location.protocol + "//" + window.location.hostname + ":" + config.plugins.port + "/plugins/pluginLoader.html#" + plugin + "/main.js"
        
        const insertedFrame = window.document.body.appendChild(frame)
        
        Wimp.registerTarget(plugin, insertedFrame.contentWindow)
    })
    
    Wimp.registerTarget("all-plugin-loaders", plugins)
    
    this.wimps.pluginLoader = parentWimpAPI("all-plugin-loaders")
    // Can be called now as the plugins have been loaded, and show-plugin is not being shown yet so it does not matter
    Wimp.init()
}