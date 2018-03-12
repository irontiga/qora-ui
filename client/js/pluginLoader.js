//console.log(App.loaderIframes);
// Fetched plugins function
function pluginLoader(plugins) {
    // plugins = ["ats", "wallet", "transactions"] etc.
    for (let i = 0; i < plugins.length; i++) {

        const frame = document.createElement("iframe");
        frame.className += "pluginJSFrame";
        frame.sandbox = "allow-scripts allow-same-origin";

        const insertedFrame = document.body.appendChild(frame);

//        const parentCommunicator = insertedFrame.contentWindow.document.createElement("script");
//        parentCommunicator.type = "text/javascript";
//        parentCommunicator.async = false; // Defaults to true, can cause the next script to execute before the helpers have loaded
//        parentCommunicator.src = "/client/js/ParentCommunicator.js";
        
        const frameWimp = insertedFrame.contentWindow.document.createElement("script");
        frameWimp.type = "text/javascript";
        frameWimp.async = false; // Defaults to true, can cause the next script to execute before the helpers have loaded
        frameWimp.src = "/client/js/wimp.min.js";

        // const helperScript = insertedFrame.contentWindow.document.createElement("script");
        // helperScript.type = "text/javascript";
        // helperScript.async = false; // Defaults to true, can cause the next script to execute before the helpers have loaded
        // helperScript.src = "/client/js/resources/helpers.js";

        // const streamHelperScript = insertedFrame.contentWindow.document.createElement("script");
        // streamHelperScript.type = "text/javascript";
        // streamHelperScript.async = false; // Defaults to true, can cause the next script to execute before the helpers have loaded
        // streamHelperScript.src = "/client/js/resources/StreamHelper.js";

        const pluginScript = insertedFrame.contentWindow.document.createElement("script");
        pluginScript.type = "text/javascript";
        pluginScript.async = false; // Same as helperScript.saync = false;
        //console.log( window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) + 1) + "/plugins/");
        pluginScript.src = window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) + 1) + "/plugins/" + plugins[i] + "/main.js";

        //insertedFrame.contentWindow.document.body.appendChild(helperScript);
        //insertedFrame.contentWindow.document.body.appendChild(streamHelperScript);
//        insertedFrame.contentWindow.document.body.appendChild(parentCommunicator);
        insertedFrame.contentWindow.document.body.appendChild(frameWimp);
        insertedFrame.contentWindow.document.body.appendChild(pluginScript);
        
        Wimp.registerTarget(plugins[i], insertedFrame.contentWindow);

        //App.push("loaderIframes", insertedFrame);

    }
    
    Wimp.registerTarget("all-plugin-loaders", plugins);
    
    App.wimps.pluginLoader = createParentWimp("all-plugin-loaders");
    // Can be called now as the plugins have been loaded, and show-plugin is not being shown yet so it does not matter
    Wimp.init();
    

    // Send all plugins loaded message
    /*var script = document.createElement("script");
            script.innerHTML = "Burst.request({request:'pluginsLoaded')";
            document.body.appendChild(script);*/
}

// Fetch plugin list
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {

    if (xhttp.readyState == 4 && xhttp.status == 200) {

        const response = JSON.parse(xhttp.responseText);

        pluginLoader(response);
    }
};
xhttp.open("GET", "/getPlugins", true);
xhttp.send();