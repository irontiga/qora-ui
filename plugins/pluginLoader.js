"use strict"
import Wimp from "../src/modules/wimp/wimp.js"

window.Wimp = Wimp

const pluginScript = document.createElement("script");
pluginScript.async = false;
const hash = window.location.hash
pluginScript.src = hash.slice(1);

document.body.appendChild(pluginScript);
