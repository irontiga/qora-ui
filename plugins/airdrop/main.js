

Wimp.init()

const parentWimp = new Wimp(window.parent)

parentWimp.request("registerUrl", {
    data: {
        url: "airdrop",
        page: "airdrop/index.html",
        title: "Airdrop",
        icon: "icons:system-update-alt",
        menus: [],
        parent: false
    }
}, response => {
    //console.log(response);
})
