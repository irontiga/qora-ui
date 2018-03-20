import MainApp from "./main-app.js"
import pluginLoader from "./pluginLoader.js"
import Wimp from "./wimp/wimp.js"

Wimp.proxy = true

// For debug
window.Wimp = Wimp

window.customElements.define(MainApp.is, MainApp)

window.App = document.querySelector("main-app")

// Fetch plugin list
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        const response = JSON.parse(xhttp.responseText)
        pluginLoader(response);
    }
};
xhttp.open("GET", "/getPlugins", true)
xhttp.send()