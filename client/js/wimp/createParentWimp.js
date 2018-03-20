// Enire page page of routes really 

import Wimp from "./wimp.js"
import QoraAPI from "../qora/QoraAPI.js"
import { TX_TYPES } from "../qora/constants.js"

export default function createParentWimp(target){
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
        //Qora.apiCall(req, App.qoraNode, res);
        QoraAPI.request[req.type](req).then(res).catch(res.error);
    })

    mainWimp.on("getQoraAddresses", (req,res) => {
        const addressIDS = App.addresses.map(address => {
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

//    mainWimp.on("sendMoney", (req, res) => {
//        if (App.sendMoneyPrompt.open) {
//            res.error("There is already a send money request pending.");
//        }
//
//        req.sender = App.addresses[req.nonce];
//        // Last referene at senderAddress[highest tx number].reference;
//
//        App.sendMoneyPrompt = {};
//        App.sendMoneyPrompt = {
//            open: true,
//            address: App.addresses[req.nonce].address,
//            recipient: req.recipient,
//            amount: req.amount,
//            fee: req.fee,
//            accept: () => {
//                console.log(App.addresses);
//                App.sendMoneyPrompt = { open: false };
////                Qora.sendMoney(req, App.qoraNode, res);
//                const tx = new QoraAPI.transactions.PaymentTransaction();
//                tx.keyPair = {
//                    publicKey: App.addresses[req.nonce].publicKey,
//                    privateKey: App.addresses[req.nonce].privateKey
//                }
//                
//            },
//            reject: () => {
//                App.sendMoneyPrompt = { open: false };
//                return res.error("User rejected transaction");
//            }
//        };
//        App.$.sendMoneyConfirmDialog.open();
//    })

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


