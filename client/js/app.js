Polymer({
	is: 'burst-app',
	properties: {
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
            type: Object
        },
		route: {
			type: Object
		},
        loginpage: {
            type: Object,
            value: {
                loggedin : false,
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
        account: {
            type: Object,
            value: {}
        },
        sendMoneyPrompt: {
            type: Object,
            value: {
                open: false
            }
        }
	},
	
	_messageHandler : pluginMessageHandler,
	
	_checkActiveRoute : function(item, route){
		if(route.path == "/burst" + item.url){
			return false;
		}
		else{
			return true;
		}
	},
	
	_checkPageNotFound : function(urls, route){
		var noPage = false;
		for(var i=0; i < urls.length; i++){
			if("/burst" + urls[i].url == route.path){
				noPage=true;
			}
		}
		return noPage;
	},

	_joinPluginUrl : function(url, hash){
		return "/plugins/" + url + "#" + hash;
	},
	
	_genIframeUrl : function(url){
		return "/burst/" + url;
	},
    
    _getActiveUrl :  function(routeData, urls){
        var activeUrl = routeData.currentPluginUrl; 
        
        var activePlugin = {
            url: "404",
            title: "404",
            menus:[],
            page: "404",
            parent: false
        };
        
        console.log("Get active urls...");
        console.log(urls);
        console.log(routeData);
        
        for(var i=0;i<urls.length;i++){
            if(activeUrl == urls[i].url){
                activePlugin = urls[i];
            }
        }
        
        console.log(activePlugin);
        return activePlugin;
    },
    _accountInfo : function(callback){
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
    },
	
    _acceptSendMoney : function(e){
        var data = this.sendMoneyPrompt;
        //console.log(data);
        //console.log(this.passphrase);
        data.accept(data);
    },
    _cancelSendMoney : function(e){
        var data = this.sendMoneyPrompt;
        this.sendMoneyPrompt = {
            open: false
        };
        data.reject();
    },
    
	ready: function(){
		console.log(this);
		window.addEventListener("message", this._messageHandler.bind(this), false);
        
        this.loginpage.login = function(passphrase){
            this.loginpage.loggedin = true;
            this.passphrase = passphrase;

            function loop(){
                setTimeout(function(){
                    this._accountInfo(loop.bind(this));
                }.bind(this), 10000);
            }
            this._accountInfo(loop.bind(this));
            
            var loginpage = this.loginpage;
            this.loginpage = {};
            this.loginpage = loginpage;
            
        }.bind(this);
	}
});

