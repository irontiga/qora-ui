Fractal.request(
	{
		request: "registerUrl",
		url: "/wallet",
		page: "/plugins/wallet/index.html",
		title: "Wallet",
		menus: {},
		parent : false
	},
	function(response){
		console.log(response);	
	}
);