var parentWindow = new ParentHelper();

parentWindow.request("registerUrl", {
		url: "multi-wallet",
		page: "multi-wallet/index.html",
		title: "Multi Wallet",
		menus: [],
		parent : false
	},
	function(response){
		//console.log(response);	
	}
);