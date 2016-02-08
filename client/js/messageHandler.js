function pluginMessageHandler(event){
	var data = event.data;
	
	console.log(data);
	
	this.hello = "Stuff";
	
	var response = {};
	
	switch(data.request){
		case "registerUrl":
			console.log("Success");
			response = {
				success : true
			}
			break;
		case "addMenuItem":
			console.log("MenuItem");
			response = {
				error: true,
				errorMessage : "Successs actually"
			}
			break;
		default:
			console.log("Error");
			response = {
				error : true,
				errorMessage : "Unrecognized request"
			}
	}
	
	//sender.postMessage(response, "*");
};