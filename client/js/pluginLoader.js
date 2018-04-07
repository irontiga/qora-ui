"use strict"

import Wimp from "./wimp/wimp.js"
import createParentWimp from "./wimp/createParentWimp.js"
import QORA_CONFIG from "../../config.js"

export default function pluginLoader(plugins){
    plugins.forEach(plugin => {
        const frame = document.createElement("iframe")
        frame.className += "pluginJSFrame"
        frame.sandbox = "allow-scripts allow-same-origin"
        // Why not support http/https
        frame.src = window.location.protocol + "//" + window.location.hostname + ":" + QORA_CONFIG.server.plugins.port + "/plugins/pluginLoader.html#" + plugin + "/main.js"
        
        const insertedFrame = window.document.body.appendChild(frame);
        
        Wimp.registerTarget(plugin, insertedFrame.contentWindow);
    })
    
    Wimp.registerTarget("all-plugin-loaders", plugins);

    App.wimps.pluginLoader = createParentWimp("all-plugin-loaders");
    // Can be called now as the plugins have been loaded, and show-plugin is not being shown yet so it does not matter
    Wimp.init();
}