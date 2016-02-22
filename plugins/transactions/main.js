Fractal.request(
	{
		request: "registerUrl",
		url: "/transactions/",
		page: "/plugins/transactions/index.html",
		title: "Transactions",
		menus: {},
		parent : false
	},
	function(response){
		console.log(response);

	}
);