Wimp.init();

const parentWimp = new Wimp(window.parent);

parentWimp.request("registerUrl", {
    data: {
        url: "delegate",
        page: "delegation-app/index.html",
        title: "Delegate",
        icon: "cloud-upload",
        menus: [],
        parent: false
    }
}, response => {
    //console.log(response);
});