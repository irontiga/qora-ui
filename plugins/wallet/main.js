Burst.request(
	{
		request: "registerUrl",
		url: "wallet",
		page: "wallet/index.html",
		title: "Wallet",
		menus: [],
		parent : false
	},
	function(response){
		console.log(response);	
	}
);