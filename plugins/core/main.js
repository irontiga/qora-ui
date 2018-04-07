// var parentWindow = new ParentHelper();
// parentWindow.install(StreamHelper);

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
        text: "Send Qora"
    }
}, response => {
    //console.log(response);
});

/* ====================================
Core streams
==================================== */

const streamScript = document.createElement("script");
streamScript.type = "text/javascript";
streamScript.async = false;
streamScript.src = "/plugins/core/addressStream.js";
document.body.appendChild(streamScript);
