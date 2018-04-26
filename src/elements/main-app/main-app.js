import MainApp from "./main-app-element.js"
//import pluginLoader from "../../modules/pluginLoader.js"
import Wimp from "../../modules/wimp/wimp.js"

Wimp.proxy = true

// For debug
window.Wimp = Wimp

window.customElements.define(MainApp.is, MainApp)

window.App = document.querySelector("main-app#main-qora-app")

// Fetch plugin list
// var xhttp = new XMLHttpRequest()
// xhttp.onreadystatechange = () => {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//         const response = JSON.parse(xhttp.responseText)
//         pluginLoader(response);
//     }
// };
// xhttp.open("GET", "/getPlugins", true)
// xhttp.send()