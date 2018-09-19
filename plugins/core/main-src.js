// Gets compiled into main.js

import StreamManager from './streams/StreamManager.js'

Wimp.init();

const parentWimp = new Wimp(window.parent);

parentWimp.request("registerUrl", {
    data: {
        url: "wallet",
        page: "core/wallet/index.html",
        title: "Wallet",
        icon: "credit-card",
        menus: [],
        parent: false
    }
}, response => {
    //console.log(response);
});

parentWimp.request("registerTopMenuModal", {
    data: {
        icon: "send",
        page: "core/wallet/send-money.html",
        text: "Send Karma"
    }
}, response => {
    //console.log(response);
});

const streams = new StreamManager(parentWimp)

/* ====================================
Core streams
==================================== */






// const streamScript = document.createElement("script");
// streamScript.type = "text/javascript";
// // streamScript.type = "module" // In the future :)
// streamScript.async = false;
// streamScript.src = "/plugins/core/addressStream.js";
// document.body.appendChild(streamScript);
