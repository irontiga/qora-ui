// See docs below code
// Author: irontiga
// License: GPL-V3.0


// REWRITE ES6 CLASS WHOOOOP
class ParentHelper{
    constructor(){
        // Handler for responses
        this._pendingRequests = {};
        window.addEventListener("message", function(event){

            //console.log(event);

            var data = JSON.parse(event.data);

            var id = data.requestID;

            //console.log(data)

            if(this._pendingRequests[id]){

                // call callback
                this._pendingRequests[id](data.data);

                //console.log(pendingRequests);

                delete this._pendingRequests[id];	
            }

        }.bind(this));
    }
    
    request(request, data, callback){
        var requestID = Math.random().toString(36).substr(2, 10);
        var messageRequest = JSON.stringify({
            request: request,
            requestID : requestID,
            data: data
        });

        window.parent.postMessage(messageRequest, '*');


        this._pendingRequests[requestID] = callback;
    }
    
    changeUrl(url){
        // Update the url, and therefore the active plugin
        window.location.replace(url);
    }
    
    // Create a stream
    // identifier - required for other clients to connect
    // options....object...fun
    // returns an "class"? idk, but u can then use stream.send(data) to... send...data. Funny that. // Stream.getClients, could be a nice one to have
    createStream(identifier, options){
        return new Stream(identifier, this);
    }
    
    // Connect to another plugin's stream
    openStream(){}
    
    // Special polymer only function to connect to a stream and sync a var with all responses
    syncStream(){}
}

class Stream{
    constructor(identifier, parentThis){
        this.identifier = identifier;
        this.parent = parentThis;
        
    }
    // Optional callback...for success/error i guess...we'll assume it doesn't fail for now
    send(data, callback){
        this.parent.request("stream", {
            
        }, callback)
    }
}

/* OLD version...not as classy
function parentHelper(){
	
	// Handler for responses
	var pendingRequests = {};
	window.addEventListener("message", function(event){
		
        //console.log(event);
        
		var data = JSON.parse(event.data);
		
		var id = data.requestID;
		
		//console.log(data)
		
		if(pendingRequests[id]){

            // call callback
			pendingRequests[id](data.data);

			//console.log(pendingRequests);

			delete pendingRequests[id];	
		}
		
	});
	
	this.request = function(request, data, callback){
		
		var requestID = Math.random().toString(36).substr(2, 10);
        var messageRequest = JSON.stringify({
            request: request,
            requestID : requestID,
            data: data
        });
        
		window.parent.postMessage(messageRequest, '*');
		
		
        pendingRequests[requestID] = callback;
		
		//console.log(pendingRequests);
	};
	
	this.changeUrl = function(url){
		// Update the url, and therefor the active plugin
		window.location.replace(url);
	};
	
}*/

//var Burst = new parentHelper();


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

/*

// Fetched plugins function
function pluginLoader(plugins){
    
	for(var i=0; i<plugins.length;i++){
        
		var script = document.createElement("script");
        
		script.setAttribute('type', 'text/javascript');
		script.setAttribute("src", "/plugins/" + plugins[i] + "/main.js");
        
		document.body.appendChild(script);
	}
    
    // Send all plugins loaded message
    var script = document.createElement("script");
    script.innerHTML = "Burst.request({request:'pluginsLoaded')";
    document.body.appendChild(script);
}


// Fetch plugin list
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    
	if (xhttp.readyState == 4 && xhttp.status == 200) {
        
		var response = JSON.parse(xhttp.responseText);
		
        pluginLoader(response);
	}
};
xhttp.open("GET", "/getPlugins", true);
xhttp.send();

*/