//console.log(App.loaderIframes);
// Fetched plugins function
function pluginLoader(plugins){

    for(let i=0; i<plugins.length;i++){

        const frame = document.createElement("iframe");
        frame.className += "pluginJSFrame";
        frame.sandbox = "allow-scripts allow-same-origin";

        const insertedFrame = document.body.appendChild(frame);

        const helperScript = insertedFrame.contentWindow.document.createElement("script");
        helperScript.type = "text/javascript";
        helperScript.async = false; // Defaults to true, can cause the next script to execute before the helpers have loaded
        helperScript.src = "/client/js/helpers.js";
        
        
        
        const pluginScript = insertedFrame.contentWindow.document.createElement("script");
        pluginScript.type = "text/javascript";
        pluginScript.async = false; // Same as helperScript.saync = false;
        //console.log( window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) + 1) + "/plugins/");
        pluginScript.src = window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) +1) + "/plugins/" + plugins[i] + "/main.js";

        insertedFrame.contentWindow.document.body.appendChild(helperScript);
        insertedFrame.contentWindow.document.body.appendChild(pluginScript);
        
        App.push("loaderIframes", insertedFrame);
        
    }

    // Send all plugins loaded message
    /*var script = document.createElement("script");
            script.innerHTML = "Burst.request({request:'pluginsLoaded')";
            document.body.appendChild(script);*/
}

// Fetch plugin list
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){

    if (xhttp.readyState == 4 && xhttp.status == 200) {

        const response = JSON.parse(xhttp.responseText);

        pluginLoader(response);
    }
};
xhttp.open("GET", "/getPlugins", true);
xhttp.send();