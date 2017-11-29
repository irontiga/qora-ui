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
