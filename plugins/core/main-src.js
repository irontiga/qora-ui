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

parentWimp.request("registerUrl", {
    data: {
        url: "send-money",
        page: "core/send-money-page/index.html",
        title: "Send money",
        icon: "send",
        menus: [],
        parent: false
    }
}, response => {
    //console.log(response);
});

// Changing to a whole page for sending...better for mobile, and otherwise i'd need to fix wimp proxies....which sounds like a nightmare
// parentWimp.request("registerTopMenuModal", {
//     data: {
//         icon: "send",
//         page: "core/wallet/send-money.html",
//         text: "Send KMX"
//     }
// }, response => {
//     //console.log(response);
// });

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
