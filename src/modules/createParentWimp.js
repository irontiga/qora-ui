// Enire page page of routes really 

import Wimp from "./wimp/wimp.js"
import QoraAPI from "../qora/QoraAPI.js"
import { TX_TYPES } from "../qora/constants.js"
import toast from "./toast.js"

// Creates and returns a wimp with the api routes already listening

export default function createParentWimp(target){
    const mainWimp = new Wimp(target);

    mainWimp.on("hello", (req, res) => {
        console.info("Someone said hi!")
        res("Hello from Qora! :)");
    })


    mainWimp.on("pluginsLoaded", (req, res) => {
        App.pluginsLoaded = true;
        res();
    });

    mainWimp.on("registerUrl", (req, res) => {
        console.log(req)
        let parent = false;
        if (req.parent) { parent = true; }

        App.push("urls", {
            url: req.url,
            title: req.title,
            menus: req.menus,
            icon: req.icon,
            page: req.page,
            parent: parent
        });

        // Dirty updating url array https://www.polymer-project.org/1.0/docs/devguide/model-data#array-mutation
        // let allUrls = App.urls;
        App.urls.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
            // Throw some sort of error if they're the same...can't have two menus with the same name, too confusing.
        })
        // App.urls = [];
        App.urls = App.urls;
        //App.set('urls')
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
        toast(req, res)
    })


    mainWimp.on("qoraApiCall", (req, res) => {
        QoraAPI.request[req.type](req).then(res).catch(res.error);
    })

    mainWimp.on("getQoraAddresses", (req,res) => {
        console.log(App.addresses)
        const addressIDS = App.addresses.map(address => {
            return {
                address: address.address,
                color: address.color,
                nonce: address.nonce,
                textColor: address.textColor
            }
        });
        res(addressIDS);
    })

    mainWimp.on("getQoraAddress", (req, res) => {
        App.wallet.genAddress(req.nonce);
        res();
    })
    
    mainWimp.on("createTransaction", (req, res) => {
        /*
        req = {
            type: "PAYMENT_TRANSACTION,
            params: {
                recipient: "QUJIiUGHIHSDhyuiHJGFYUD",
                amount: 100
            },
            nonce: 2 // Nonce
        }
        */
        if(App.transactionRequest.open){
            return res.error("Transaction request already pending");
        }
        
        req.accept = () => {
            console.log("ACCEPTER");
            console.log(App.wallet.getAddress(req.nonce))
            const txBytes = QoraAPI.createTransaction(
                req.type, 
                App.wallet.getAddress(req.nonce).keyPair, 
                req.params
            )
            
            QoraAPI.processTransaction(txBytes).then((response) => {
                App.transactionRequest = {};
                res(response);
            }).catch(err => {
                App.transactionRequest = {};
                return res.error(err);
            });
        }
        req.reject = () => {
            App.transactionRequest = {};
            return res.error("User rejected transaction");
        }
        req.typeText = TX_TYPES[req.type]
        
        App.transactionRequest = req;
        App.$.transactionRequestDialog.open()
        
    })

    mainWimp.on("createAT", (req, res) => {
        console.log("Created...not");
        res();
    })

    mainWimp.on("open-dialog", (req, res) => {
        App._openTopMenuModal({
            model: {
                item: req
            }
        });
    })

    return mainWimp;
}


