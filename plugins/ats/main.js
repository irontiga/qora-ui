Burst.request(
    {
        request: "registerUrl",
        url: "ats",
        page: "ats/index.html",
        title: "Automated transactions",
        menus: [{
            title: "Crowd funds",
            url: "/ats/crowdfunds"
        }],
        parent : false
    },
    function(response){
        console.log(response);
    }
);