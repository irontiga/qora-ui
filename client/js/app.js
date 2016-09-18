Polymer({
	is: 'fractal-app',
	properties: {
		plugins: {
			type: Array,
			value: [],
			notify: true
		},
		urls : {
			type: Array,
			value: []/*,
			notify: true*/
		},
        routeData: {
            type: Object
        },
		route: {
			type: Object
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
        }
	},
	
	_messageHandler : pluginMessageHandler,
	
	_checkActiveRoute : function(item, route){
		if(route.path == "/fractal" + item.url){
			return false;
		}
		else{
			return true;
		}
	},
	
	_checkPageNotFound : function(urls, route){
		var noPage = false;
		for(var i=0; i < urls.length; i++){
			if("/fractal" + urls[i].url == route.path){
				noPage=true;
			}
		}
		return noPage;
	},
	
	_joinPluginUrl : function(url, hash){
		return "/plugins/" + url + "#" + hash;
	},
	
	_genIframeUrl : function(url){
		return "/fractal/" + url;
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
	
	ready: function(){
		console.log(this);
		window.addEventListener("message", this._messageHandler.bind(this), false);
	}
    
    
    
    
    
});


/*
var menuOptions = [
	{
		toggle: {
			type: "text",
			content: "Balance: 10 000 Fragments"
		},
		action: {
			type: "none"
		}
	},
	{
		toggle: {
			type: "icon",
			content: "add"
		},
		action: {
			type: "dropdown",
			content: [
				{
					toggle: {
						type: "text",
						content: "Send Fragments"
					},
					action: {
						type: "message",
						message: "sendMoney"
					}
				},
				{
					toggle: {
						type: "text",
						content: "Send Asset"
					},
					action: {
						type: "message",
						message: "sendAsset"
					}
				}
			]
		}
	}
];*/