// See docs below code
// Author: irontiga
// License: GPL-V3.0

function FractalHelper(){
	var pendingRequests = {};
	
	window.addEventListener("message", function(event){
		
		var data = event.data;
		
		var id = data.requestID;
		
		pendingRequests[id](data);
		
		console.log(pendingRequests[id](data););
		
		delete pendingRequests[id];
		
	});
	
	this.request = function(data, callback){
		data.requestID = Math.random().toString(36).substr(2, 8);
		window.parent.postMessage(data, '*');
		pendingRequests[data.requestID] = callback;
	}
	
	this.changeUrl = function(url){
		// Update the url, and therefor the active plugin
		window.location.replace(url);
	};
	
}

//var Fractal = new FractalHelper();


// // // // // //
// D  O  C  S  //
// // // // // //

/*

registerUrl

returns
	success/error
	urlID // required to change/remove a url, it's menu items, and it's page 

*/

/*
	this.registerUrl = function(params, callback){
		postMessage({
			request : "registerUrl",
			url : params.url,
			page: params.page,
			title: params.title,
			menus: params.menus
		});
	};

	this.addMenuLink = function(params, callback){
		if(params.childOf){
			postMessage({
				name: params.name,
				url: params.url,
				childOf: params.childOf
			});
		}
		else{
			postMessage({
				name: params.name,
				url: params.url
			});
		}
	};
	*/