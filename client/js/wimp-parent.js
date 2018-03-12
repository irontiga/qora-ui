// Enire page page of routes really 
// allPlguins = new Wimp("all main.js frames and veiw iframes")

(function(){
    const createParentWimp = (target) => {
        const mainWimp = new Wimp(target);
        
        mainWimp.on("hello", (req, res) => {
            console.log("Someone said hi!")
            res("Hello");
        })
        
        
        mainWimp.on("pluginsLoaded", (req, res) => {
            App.pluginsLoaded = true;
            res();
        });
        
        mainWimp.on("registerUrl", (req, res) => {
            let parent = false;
            if (req.parent) { parent = true; }

            App.push("urls", {
                url: req.url,
                title: req.title,
                menus: req.menus,
                page: req.page,
                parent: parent
            });

            // Dirty updating url array https://www.polymer-project.org/1.0/docs/devguide/model-data#array-mutation
            let allUrls = App.urls;
            allUrls.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
                // Throw some sort of error if they're the same...can't have two menus with the same name, too confusing.
            })
            App.urls = [];
            App.urls = allUrls;

            //console.log(this.app);
            //console.log(this.app.urls);
            res();
        });
        
        mainWimp.on("addMenuItem", (req, res) => {
            res();
        })
        
        mainWimp.on("registerTopMenuModal", (req, res) =>  {
            /* 
        -----------------
        DOCUMENTAION
        -----------------
        req = {
            icon: "",
            frameUrl: "/frame/url",
            text: ""
        }
        */
            App.push("topMenuItems", req);
            res();
        })
        
        mainWimp.on("toast", (req,res) => {
            // We'll get there...
            // Needs to handle storage as per md spec... if two toasts are triggered a split second apart...the later toast will have to wait for the first to be dismissed/auto dismiss itself before being displayed
            // Ahh, it needs a queue
        })
            
            
        mainWimp.on("qoraApiCall", (req, res) => {
            // App = main-app/app.js
            Qora.apiCall(req, App.qoraNode, res);
        })
        
        mainWimp.on("getQoraAddresses", (req,res) => {
            const addressIDS = App.addresses.map(function (address) {
                let response = {
                    address: address.address,
                    color: address.color,
                    nonce: address.nonce
                }
                return response;
            });
            //console.log(addressIDS);
            res(addressIDS);
        })
        
        mainWimp.on("getQoraAddress", (req, res) => {
            this.wallet.genAddress(req.nonce);
            res();
        })
        
        mainWimp.on("sendMoney", (req, res) => {
            if (App.sendMoneyPrompt.open) {
                res.error("There is already a send money request pending.");
            }

            req.sender = App.addresses[req.nonce];
            // Last referene at senderAddress[highest tx number].reference;

            App.sendMoneyPrompt = {};
            App.sendMoneyPrompt = {
                open: true,
                address: req.address,
                recipient: req.recipient,
                amount: req.amount,
                fee: req.fee,
                accept: () => {
                    App.sendMoneyPrompt = { open: false };
                    Qora.sendMoney(req, App.qoraNode, res);
                },
                reject: () => {
                    App.sendMoneyPrompt = { open: false };
                    return res.error("User rejected transaction");
                }
            };
            App.$.sendMoneyConfirmDialog.open();
        })
        
        mainWimp.on("createAT", (req, res) => {
            console.log("Created...not");
            res();
        })
        
        return mainWimp;
    }
    
    window.createParentWimp = createParentWimp;
}())

