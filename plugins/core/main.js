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

// WalletStream.send("Testing 123 this is from the wallet stream");


// Interval updates to send new balance whenever it changes
// Increased efficiency can be had if it only sends updates balances...not all balances as it does now.
function addressUpdate(addresses){
    Promise.all(addresses.map((address) => {
        return new Promise((resolve, reject) => {
            return parentWindow.request("qoraApiCall", {
                method: "GET",
                type: "explorer",
                data: {
                    addr: address.address,
                    txOnPage: 20
                }
            }, response => {
                resolve(response);
            })
        }).then((response, error) => {
            // Check for errors...probably an unused account
            //console.log(response);
            if(response.error){
                address.balance = 0;
                address.info = {};
            }
            else{
                address.balance = response.balance.total[0];
                address.info = response;
            }
            return address;
        })
    }))

        .then(function(addresses, err){
        // Sort em real nice
        //console.log(addresses);
        addresses.sort(function(a, b){
            return a.nonce - b.nonce
        });

        // And spread the love to the wor....app
        /*this.addresses = [];
        this.addresses = addresses;
        this.selectedAddress = this.addresses[0];*/
        
        WalletStream.send(addresses);
        
    }.bind(this))
        .catch(err => {
        console.error(err);
    })
}