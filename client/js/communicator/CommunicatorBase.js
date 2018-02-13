class CommunicatorBase{
    constructor(app){
        // Reference to polymer in main-app.html
        this.app = app;
    }
    
    _sendGenerator(source, requestID){
        return (response) => {
            // If no response supplied assume success
            response = response || { success: true };
            // No type means message
            response.type = response.type || "message";
            // If success is not defined, also assume success
            if(!("success" in response)){
                response.success = true;
            }
            // No request ID means we make one
            response.requestID = requestID || Math.random().toString(36).substr(2, 10);
            
            source.postMessage(JSON.stringify(response), "*");
        }

    }
    
    
}