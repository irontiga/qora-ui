// var parentWindow = new ParentHelper();
// parentWindow.install(StreamHelper);


Wimp.init();

const parentWimp = new Wimp(window.parent);

parentWimp.request("registerUrl", {
    data: {
        url: "wallet",
        page: "core/wallet/index.html",
        title: "Wallet",
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

let balances = [];

const balanceStream = parentWimp.createStream("balances", (req, res) => {
    res(balances);
});


const addressUpdate = (addresses) => {
    Promise.all(addresses.map(address => {
        return parentWimp.request("qoraApiCall", {
            data: {
                method: "GET",
                type: "explorer",
                data: {
                    addr: address.address,
                    txOnPage: 20
                }
            }
        })
            .then(response => {
            if (!response.success) {
                address.balance = 0;
                address.info = {};
            }
            else {
                address.balance = response.data.balance.total[0];
                address.info = response.data;
            }
            return address;
        })
    }))
        .then((allBalances, err) => {
        // Sort em real nice
        balances.sort((a, b) => {
            return a.nonce - b.nonce
        });
        balances = allBalances;
        balanceStream.emit(balances);
    })
        .catch(err => {
        console.error(err);
    })
}

let addressInterval;

parentWimp.on("login", () => {
    if(addressInterval){
        clearInterval(addressInterval);
    }
    parentWimp.request("getQoraAddresses", response => {
        addressUpdate(response.data);
        
        addressInterval = setInterval(() => {
            addressUpdate(response.data);
        }, 5000)
        
    })
})

//// Now for the balance stream...
//const WalletStream = parentWindow.createStream("core-wallet", {
//    // empty options...
//})



//const parentWindow = new ParentCommunicator();
//window.addEventListener("message", parentWindow.listener.bind(parentWindow));
//
//parentWindow.request("registerUrl", {
//    url: "wallet",
//    page: "core/wallet/index.html",
//    title: "Wallet",
//    menus: [],
//    parent: false
//}, function (response) {
//    //console.log(response);
//});
//
//parentWindow.request("registerTopMenuModal", {
//    icon: "send",
//    page: "core/wallet/send-money.html",
//    text: "Send Qora"
//}, function (response) {
//    //console.log(response);
//});
//
//// Now for the balance stream...
//const WalletStream = parentWindow.createStream("core-wallet", {
//    // empty options...
//})

// WalletStream.send("Testing 123 this is from the wallet stream");


// Interval updates to send new balance whenever it changes
// Increased efficiency can be had if it only sends updates balances...not all balances as it does now.
//function addressUpdate(addresses) {
//    Promise.all(addresses.map((address) => {
//        return new Promise((resolve, reject) => {
//            return parentWindow.request("qoraApiCall", {
//                method: "GET",
//                type: "explorer",
//                data: {
//                    addr: address.address,
//                    txOnPage: 20
//                }
//            }, response => {
//                resolve(response);
//            })
//        }).then((response, error) => {
//            // Check for errors...probably an unused account
//            //console.log(response);
//            if (response.error) {
//                address.balance = 0;
//                address.info = {};
//            }
//            else {
//                address.balance = response.balance.total[0];
//                address.info = response;
//            }
//            return address;
//        })
//    }))
//
//        .then(function (addresses, err) {
//            // Sort em real nice
//            //console.log(addresses);
//            addresses.sort(function (a, b) {
//                return a.nonce - b.nonce
//            });
//
//            // And spread the love to the wor....app
//            /*this.addresses = [];
//            this.addresses = addresses;
//            this.selectedAddress = this.addresses[0];*/
//
//            WalletStream.send(addresses);
//
//        }.bind(this))
//        .catch(err => {
//            console.error(err);
//        })
//}