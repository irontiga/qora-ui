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
			value: [],
			notify: true
		},
		route: {
			type: Object
		},
		data: {
			type: Object
		},
        activeUrl: {
            type: Object,
            computed: "_getActiveUrl(routeData.activePlugin, urls)",
            notify: true
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
    
    _getActiveUrl :  function(activeUrl, urls){
        var activePlugin = {
            url: "404",
            title: "404",
            menus:[],
            page: "/404",
            parent: false
        };
        
        console.log(urls);
        
        for(var i=0;i<urls.length;i++){
            if(activeUrl == urls[i].url){
                activePlugin = urls[i];
            }
        }
        
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