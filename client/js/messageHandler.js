function pluginMessageHandler(event){
	
	var data = event.data;
	
	var response = {};
	
	switch(data.request){
		case "registerUrl":
			response = {
				success : true
			}
			break;
		case "addMenuItem":
			response = {
				success : true
			}
			break;
		default:
			response = {
				error : true,
				errorMessage : "Unrecognized request"
			}
	}
	
	response.requestID = data.requestID;
	
	var frame = document.getElementById("plugin-js-loader").contentWindow;
	
	frame.postMessage(response, "*");
};