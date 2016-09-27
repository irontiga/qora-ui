function pluginMessageHandler(event){
    
    //console.log(this.urls);
    
    //console.log("event");
    //console.log(event)
	var message = JSON.parse(event.data);
    var data = message.data;
	//console.log("Message: ");
    //console.log(message);
    
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
            if(data.parent){
				parent = true;
			}
			
			this.push("urls",{
                url :  data.url,
                title : data.title,
                menus : data.menus,
                page : data.page,
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
            BurstCall.apiCall(data, finish);
        case "sendMoney":
            this.sendMoneyPrompt = {
                open: true,
                recipient : data.recipient,
                recipientRS : data.recipientRS,
                amount: data.amount,
                message: data.message,
                accept : function(){
                    BurstCall.sendMoney(data, this.passphrase, finish);
                },
                reject: function(){
                    finish({
                        error : "Rejected!",
                        errorDescription : "User rejected transaction"
                    });
                }
            };
            break;
        case "createAT":
            console.log("Created...not");
            break;
		default:
			finish({
				error : "Unrecognized request",
                errorDescription : "Unrecognized request '" + message.request + "'"
			});
	}
};