function pluginMessageHandler(event){
    
    //console.log(this.urls);
    
    console.log("event");
    console.log(event)
	var message = JSON.parse(event.data);
	console.log("Message: ");
    console.log(message);
    
	var response = {
        requestID: message.requestID
    };
    
    function finish(responseData){
        if(typeof(responseData) == "undefined"){
            responseData = {
                success : true
            };
        }
        response.data = responseData;
        event.source.postMessage(JSON.stringify(response), "*");
    }
    
	switch(message.request){
        case "pluginsLoaded":
            this.pluginsLoaded = true;
            finish();
            break;
		case "registerUrl":
			var parent = false;
            if(message.data.parent){
				parent = true;
			}
			
			this.push("urls",{
                url :  message.data.url,
                title : message.data.title,
                menus : message.data.menus,
                page : message.data.page,
				parent: parent
			});
            
            // ----
            // Dirty updating url array https://www.polymer-project.org/1.0/docs/devguide/model-data#array-mutation
            var allUrls = this.urls;
            this.urls = [];
            this.urls = allUrls;
            // ----
			
			finish();
			break;
		case "addMenuItem":
			finish();
			break;
        case "burstApiCall":
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    //var parsedResponse = JSON.parse(xhttp.responseText);

                    //finish(parsedResponse);
                    finish(xhttp.responseText);
                    console.log("WOOOOCHOOOO");
                    console.log(xhttp.responseText);
                }
            };
            
            var parsedOptions = Object.keys(message.data.options).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(message.data.options[k]);
            }).join('&')
            xhttp.open("GET", "/api/" + JSON.stringify(message), true);
            xhttp.send();
            break;
		default:
			finish({
				error : true,
                errorMessage : "Unrecognized request '" + message.request + "'"
			});
	}
};