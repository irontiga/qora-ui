Polymer({
	is: 'fractal-app',
	properties: {
		activePlugin: {
			type: Object,
			value: {
				url: "/plugins/wallet/index.html"
			},
			notify: true
		},
		plugins: {
			type: Array,
			value: [],
			notify: true
		}
	},
	
	messageHandler : pluginMessageHandler,
	
	activateUrl : function(){
		
	},
	
	ready: function(){
		
		var location = window.location;
		
		var path = location.pathname.replace('/fractal','');
		
		console.log(path);
		
		this.hello = "World";
		
		var that = this;
		window.addEventListener("message", that.messageHandler, false);
	}
});

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
];