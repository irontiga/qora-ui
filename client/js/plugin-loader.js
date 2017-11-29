// Fetched plugins function
function pluginLoader(plugins){

    for(var i=0; i<plugins.length;i++){

        const frame = document.createElement("iframe");
        frame.className += "pluginJSFrame";

        const insertedFrame = document.body.appendChild(frame);

        const helperScript = insertedFrame.contentWindow.document.createElement("script");
        helperScript.type = "text/javascript";
        helperScript.src = "/client/js/helpers.js";

        /*var helperActivatorScript = document.createElement("script");
                helperActivatorScript.setAttribute("type", "text/javascript");
                helperActivatorScript.text = "var Burst = new parentHelper();";*/

        const pluginScript = insertedFrame.contentWindow.document.createElement("script");
        pluginScript.type = "text/javascript";
        console.log( window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) + 1) + "/plugins/");
        pluginScript.src = window.location.protocol + "//" + window.location.hostname + ":" + (parseInt(window.location.port) +1) + "/plugins/" + plugins[i] + "/main.js";

        insertedFrame.contentWindow.document.body.appendChild(helperScript);
        /*insertedFrame.contentWindow.document.body.appendChild(helperActivatorScript);*/
        insertedFrame.contentWindow.document.body.appendChild(pluginScript);
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