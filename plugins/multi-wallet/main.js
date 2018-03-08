var parentWindow = new ParentCommunicator();
window.addEventListener("message", parentWindow.listener.bind(parentWindow));

parentWindow.request("registerUrl", {
	url: "multi-wallet",
	page: "multi-wallet/index.html",
	title: "Multi Wallet",
	menus: [],
	parent: false
},
	function (response) {
		//console.log(response);	
	}
);