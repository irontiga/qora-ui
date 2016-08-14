// See docs below code
// Author: irontiga
// License: GPL-V3.0

function BurstHelper(){
	
	// Handler for responses
	var pendingRequests = {};
	window.addEventListener("message", function(event){
		
		var data = event.data;
		
		var id = data.requestID;
		
		//console.log(data)
		
		if(pendingRequests[id]){

			pendingRequests[id](data);

			//console.log(pendingRequests);

			delete pendingRequests[id];	
		}
		
	});
	
	this.request = function(data, callback){
		
		data.requestID = Math.random().toString(36).substr(2, 8);
		
		window.parent.postMessage(data, '*');
		
		
		pendingRequests[data.requestID] = callback;
		
		//console.log(pendingRequests);
	};
	
	this.changeUrl = function(url){
		// Update the url, and therefor the active plugin
		window.location.replace(url);
	};
	
}

//var Fractal = new BurstHelper();


// // // // // //
// D  O  C  S  //
// // // // // //

/*

registerUrl

returns
	success/error
	urlID // required to change/remove a url and/or it's page 

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


// // // // // // //
// PLUGIN  LOADER //
// // // // // // //

function pluginLoader(plugins){
    
	for(var i=0; i<plugins.length;i++){
        
		var script = document.createElement("script");
        
		script.setAttribute('type', 'text/javascript');
		script.setAttribute("src", "/plugins/" + plugins[i] + "/main.js");
        
		document.body.appendChild(script);
	}
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
    
	if (xhttp.readyState == 4 && xhttp.status == 200) {
        
		var response = JSON.parse(xhttp.responseText);
		
        pluginLoader(response);
	}
};

xhttp.open("GET", "/getPlugins", true);
xhttp.send();