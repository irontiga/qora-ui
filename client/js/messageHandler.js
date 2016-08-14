function pluginMessageHandler(event){
	
	var data = event.data;
	
	var response = {};
	
	console.log(this.urls);
	
	switch(data.request){
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
				errorMessage : "Unrecognized request '" + data.request + "'"
			}
	}
	
	response.requestID = data.requestID;
	
	var frame = document.getElementById("plugin-js-loader").contentWindow;
	
	frame.postMessage(response, "*");
};