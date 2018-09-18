//var parentWindow = new ParentCommunicator();
//window.addEventListener("message", parentWindow.listener.bind(parentWindow));
//
//parentWindow.request("registerUrl", {
//	url: "multi-wallet",
//	page: "multi-wallet/index.html",
//	title: "Multi Wallet",
//	menus: [],
//	parent: false
//},
//	function (response) {
//		//console.log(response);	
//	}
//);


Wimp.init();

const parentWimp = new Wimp(window.parent);



// parentWimp.request("registerUrl", {
// 	data: {
//         url: "multi-wallet",
//         page: "multi-wallet/index.html",
//         title: "Multi Wallet",
//         icon: "view-list",
//         menus: [],
//         parent: false
//     }
// }, response => {
// 		//console.log(response);	
// 	}
// );

