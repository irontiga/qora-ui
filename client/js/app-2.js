class MainApp extends Polymer.Element {
    static get is() {
        return "main-app";
    }
    constructor() {
        super();
    }
    static get properties() {
        return {
            plugins: {
                type: Array,
                value: [],
                notify: true
            },
            urls : {
                type: Array,
                value: []
            },
            routeData: {
                type: Object,
                value:{}
            },
            route: {
                type: Object
            },
            loginpage: {
                type: Object,
                value: {
                    loggedin : false,
                    loading: false
                }
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
                notify:true
            },
            passphrase: {
                type: String,
                value: ""
            },
            qoraNode: {
                type: Object,
                value: {
                    explorer: {
                        url: "http://127.0.0.1:9090",
                        tail: "/index/blockexplorer.json"
                    },
                    api: {
                        url: "http://127.0.0.1:9085",
                        tail: "/"
                    }
                }
            },
            // Burst
            account: {
                type: Object,
                value: {}
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
                type:Array,
                value: ["#4caf50",
                        "#3f51b5",
                        "#e91e63",
                        "#2196f3",
                        "#f44336",
                        "#ff9800",
                        "#795548",
                        "#9c27b0",
                        "#18ffff",
                        "#ffeb3b"]
            },
            addressCount: {
                type: Number,
                value: 1
            }
        }
    }
        
    // All my beautiful functions now
    _checkActiveRoute(item, route){
        if(route.path == "/qora" + item.url){
            return false;
        }
        else{
            return true;
        }
    }
    
    _checkPageNotFound(urls, route){
        var noPage = false;
        for(var i=0; i < urls.length; i++){
            if("/qora" + urls[i].url == route.path){
                noPage=true;
            }
        }
        return noPage;
    }

    _joinPluginUrl(url, hash){
        return "/plugins/" + url + "#" + hash;
    }

    _genIframeUrl(url){
        return "/qora/" + url;
    }
    
    _getActiveUrl(routeData, urls){
        //console.log(routeData);
        var activeUrl = routeData.currentPluginUrl;
        var activePlugin = {
            url: "404",
            title: "404",
            menus:[],
            page: "404",
            parent: false
        };

        //console.log("Get active urls...");
        //console.log(urls);
        //console.log(routeData);
        
        for(var i=0;i<urls.length;i++){
            //console.log(urls[i]);
            //console.log(activeUrl);
            if(activeUrl == urls[i].url){
                activePlugin = urls[i];
            }
        }
        
        //console.log(activePlugin);
        return activePlugin;
    }

    // CONVERTING TO QORA BABY
    _accountInfo(callback){
        if(typeof(this.account.account) == 'undefined'){
            this.account.publicKey = converters.byteArrayToHexString(localSign.getPublicKey(this.passphrase));
            this.account.account = localSign.getAccountIdFromPublicKey(this.account.publicKey, false);
        }
        BurstCall.apiCall({
            requestType: "getAccount",
            account: this.account.account
        }, function(response){
            if(response.errorCode == 5){
                this.account.accountRS = localSign.getAccountIdFromPublicKey(this.account.publicKey, true);
                this.account.balanceNQT = 0;
            }
            else{
                this.account = response;
            }
            
            this.account.balance = this.account.balanceNQT / 100000000;
            this.account.balance = this.account.balance.toLocaleString('en-US');
            
            var account = this.account;
            this.account = {};
            this.account = account;
            
            callback();
                
        }.bind(this));
    }
    
    _acceptSendMoney(e){
        var data = this.sendMoneyPrompt;
        //console.log(data);
        //console.log(this.passphrase);
        data.accept(data);
    }
    _rejectSendMoney(e){
        var data = this.sendMoneyPrompt;
        this.sendMoneyPrompt = {
            open: false
        };
        data.reject();
    }
        
    _toggleDrawer(e){
        this.$.appdrawer.toggle();
    }
        
    _registerMessageHandler(handlerClass){
        console.log("NO WAYYYYY");
        
    }
    
    connectedCallback() {
        super.connectedCallback();
        //console.log('main-app element created!');
    }

    ready(){
        super.ready();
        //console.log("FIREEE");
        //console.log(this);
        //console.log(this.$.appdrawer);
        //window.addEventListener("message", this._messageHandler.bind(this), false);
        
        // -----------------------
        // LOGIN FUNCTION
        // -----------------------
        this.loginpage.login = login.bind(this);
        this._logout = logout.bind(this);
    }
        
}

window.customElements.define(MainApp.is, MainApp);

const App = document.querySelector("main-app");