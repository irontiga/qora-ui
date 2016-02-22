Polymer({
	is: 'fractal-app',
	properties: {
		activeUrl: {
			type: Object,
			value: {
				page: "/plugins/wallet/index.html"
			},
			notify: true
		},
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
		launchUrl : {
			type: String,
			value : window.location.pathname.replace("/fractal",""),
			notify:true
		}
	},
	
	messageHandler : pluginMessageHandler,
	
	activateUrl : function(event){
		var href = event.model.item.url;
		history.pushState({}, '', "/fractal" + href);
		window.dispatchEvent(new Event('popstate'));
	},
	
	getUrl : function(){
		var href =  window.location.pathname.replace("/fractal","");
		console.log(href);
		return href;
	},
	
	popstateHanlder : function(event){
		var href = this.getUrl();
		console.log(href);
		var urls = this.urls;
		if(href=="/"){
			//this.activateUrl(urls[0].url);
		}
		else{
			for(var i=0;i < urls.length;i++){
				if(urls[i].url == href){
				   this.activeUrl = urls[i];
				}
			}
		}
		//this.activateUrl(urls[0].url);
	},
	
	
	ready: function(){
		
		var location = window.location;
		
		var path = location.pathname.replace('/fractal','');
		
		console.log(path);
		
		window.addEventListener("message", this.messageHandler.bind(this), false);
		
		window.addEventListener('popstate', this.popstateHanlder.bind(this));
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