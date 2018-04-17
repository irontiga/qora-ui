import {login, logout} from "./login.js"
import Wimp from "./wimp/wimp.js"
import createParentWimp from "./wimp/createParentWimp.js"
import QoraAPI from "./qora/QoraAPI.js"
import QORA_CONFIG from "../../config.js"

export default class MainApp extends Polymer.Element {
    static get is() {
        return "main-app";
    }
    static get properties() {
        return {
            plugins: {
                type: Array,
                value: [],
                notify: true
            },
            urls: {
                type: Array,
                value: []
            },
            topMenuItems: {
                type: Array,
                value: []
            },
            selectedModal: {
                type: Object,
                value: {
                    // This way browser won't throw an error at the default url
                    page: "404"
                }
            },
            routeData: {
                type: Object,
                value: {}
            },
            route: {
                type: Object
            },
            loggedIn: {
                type: Boolean,
                value: false,
                observer: "_loginObserver"
            },
            data: {
                type: Object
            },
            activeUrl: {
                type: Object,
                computed: "_getActiveUrl(routeData, urls)",
                notify: true
            },
            pluginsLoaded: {
                type: Boolean,
                value: false,
                notify: true
            },
            passphrase: {
                type: String,
                value: ""
            },
            pin: {
                type: Number
            },
            qoraNode: {
                type: Object,
                value: QORA_CONFIG.qoraNode
            },
            
            addressCount: {
                type: Object
            },
            // Qora
            addresses: {
                type: Object,
                value: []
            },
            sendMoneyPrompt: {
                type: Object,
                value: {
                    open: false
                }
            },
            addressColors: {
                type: Array
            },
            selectedAddress: {
                type: Object,
                value: {
                    address: "",
                    color:"#000",
                    nonce: 0
                }
            },
            currentPluginFrame: {
                type: Object
            },
            loaderIframes: {
                type: Array,
                value: []
            },
            selectedModal: {
                type: Object,
                value: {
                    
                }
            },
            transactionRequest: {
                type: Object,
                value: {
                
                }
            }
        }
    }

    static get observers(){
        return  [
            '_addressChanged(selectedAddress)'
        ]

    }
    
    constructor() {
        super();
        this.wimps = {}
        this.streams = {}
    }
    
//    // All my beautiful functions now
//    _checkActiveRoute(item, route) {
//        if (route.path == "/qora" + item.url) {
//            return false;
//        }
//        else {
//            return true;
//        }
//    }

//    _checkPageNotFound(urls, route) {
//        var noPage = false;
//        for (var i = 0; i < urls.length; i++) {
//            if ("/qora" + urls[i].url == route.path) {
//                noPage = true;
//            }
//        }
//        return noPage;
//    }

    _joinPluginUrl(url, hash) {
        return "/plugins/" + url + "#" + hash;
    }

    _genIframeUrl(url) {
        return "/qora/" + url;
    }

    _getActiveUrl(routeData, urls) {
        //console.log(routeData);
        const activeUrl = routeData.currentPluginUrl;
        let activePlugin = {
            url: "404",
            title: "404",
            menus: [],
            page: "404",
            parent: false
        };

        //console.log("Get active urls...");
        //console.log(urls);
        //console.log(routeData);

        for (let i = 0; i < urls.length; i++) {
            //console.log(urls[i]);
            //console.log(activeUrl);
            if (activeUrl == urls[i].url) {
                activePlugin = urls[i];
            }
        }

        //console.log(activePlugin);
        return activePlugin;
    }

    _acceptSendMoney(e) {
        const data = this.sendMoneyPrompt;
        //console.log(data);
        //console.log(this.passphrase);
        data.accept(data);
    }
    _rejectSendMoney(e) {
        const data = this.sendMoneyPrompt;
        this.sendMoneyPrompt = {
            open: false
        };
        data.reject()
    }
    
    getOpenSettings(){
        return this.openSettings.bind(this)
    }
    
    openSettings(){
        this.$.settingsDialog.open();
    }
    
    acceptTransactionRequest(e) {
        this.transactionRequest.accept();

    }
    rejectTransactionRequest(e) {
        this.transactionRequest.reject();
    }
    
    _toggleDrawer(e) {
        this.$.appdrawer.toggle();
    }

    _registerMessageHandler(handlerClass) {
        console.log("NO WAYYYYY");

    }

    connectedCallback() {
        super.connectedCallback();
        //console.log('main-app element created!');
    }

    _openTopMenuModal(e) {
        const prev = this.selectedModal.page;
        this.selectedModal = e.model.item;
        
        if(prev){
            console.log("resseting")
            const reset = true;
            this.wimps.modal.readyCheck(reset);
        }
        
        this.$.topMenuDialog.toggle();
    }
    
    textColor(color){
        console.log(color)
        return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
    }
    
    objectKeys(obj){
        if(!obj){
            return []
        }
        return Object.keys(obj).map(key => {
            return {
                key: key,
                value: obj[key]
            }
        })
    }
    
    logOut(){
        this.$["login-container"].logOut()
    }

    ready() {
        super.ready();
        // -----------------------
        // LOGIN FUNCTION
        // -----------------------
//        this.loginpage.login = (...args) => {
//            try {
//                login.bind(this)(...args);
//            } catch(e) {
//                this.set('loginpage.errorMessage', e);
//                this.set('loginpage.loading', false);
//                console.error(e);
//            }
//        }
//        this._logout = logout.bind(this);
        
        Wimp.registerTarget("plugin-frame", this.currentPluginFrame.contentWindow);
        
        this.wimps.activePlugin = createParentWimp("plugin-frame");
        this.wimps.activePlugin.hashSync();
        
        
        Wimp.registerTarget("modal-frame", this.modalFrame.contentWindow);
        
        this.wimps.modal = createParentWimp("modal-frame");
        
        // Doesn't really need to be defined before Wimp.init() because the modal can't be opened initially
        this.wimps.modal.on("modalFrameSize", (req, res) => {
            this.modalFrameSize = {
                height: req.height,
                width: req.width
            }
            this.$.topMenuDialog.center();
        })
        
        // Should be called whenever the modal is opened
        this.wimps.modal.ready(() => {
            this.wimps.modal.request("opened", {
                expectResponse: false,
                data: this.selectedModal.data
            });
        })
        
        // Clicking inside the iframe will blur the window and close the menu
        window.addEventListener("blur", e =>{
            this.$.accountMenu.close()
        })
        
//        this.streams.selectedAddress = [
//            this.wimps.activePlugin.createStream("Selected address", (req, res) => {
//                res(this.selectedAddress)
//            })
//        ]
            
            
        this.streams.selectedAddress = Object.values(this.wimps).map(w => {
            return w.createStream("Selected address", (req, res) => {
                if(!this.selectedAddress){
                    return
                }
                res({
                    address: this.selectedAddress.address,
                    color: this.selectedAddress.color,
                    nonce: this.selectedAddress.nonce,
                    textColor: this.selectedAddress.textColor
                });
            })
        })
        
        
    }

    _addressChanged(selectedAddress){
        if(!selectedAddress){
            return
        }
        console.log(selectedAddress)
        
        this.updateStyles({
            "--active-menu-item-color" : selectedAddress.color
        });
        
        this.streams.selectedAddress.forEach(w => {
            w.emit({
                address: selectedAddress.address,
                color: selectedAddress.color,
                nonce: selectedAddress.nonce,
                textColor: this.selectedAddress.textColor
            })
        })
    }
    
    _loginObserver(){
        
        if(this.loggedIn != this.lastLoginState || this.loggedIn){
            this.selectedAddress = this.addresses[0]
            Object.keys(this.wimps).forEach(thisWimp => {
                this.wimps[thisWimp].request("login", {expectResponse: false});
            })
        }
        this.lastLoginState = this.loggedIn;
    }

}
