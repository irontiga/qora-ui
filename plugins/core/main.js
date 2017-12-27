var parentWindow = new ParentHelper();

parentWindow.request("registerUrl", {
    url: "wallet",
    page: "core/wallet/index.html",
    title: "Wallet",
    menus: [],
    parent : false
}, function(response){
    //console.log(response);
});

parentWindow.request("registerTopMenuModal", {
    icon: "send",
    page: "core/wallet/send-money.html",
    text: "Send Qora"
}, function(response){
    //console.log(response);
});

// Now for the balance stream...
const WalletStream = parentWindow.createStream("core-wallet", {
    // empty options...
})

WalletStream.send("Testing 123 this is from the wallet stream");