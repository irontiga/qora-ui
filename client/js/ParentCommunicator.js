window.addEventListener("message", function(evemt){
    const data = JSON.parse(event.data);
    const id = data.requestID;
    const requestType = data.requestType;
    
    switch(requestType){
        case "stream":
            break;
        case "request":
            break;
        case"built-in":
            break;
    }
});

class ParentCommunicatorWrapper{
    constructor(){
        this._requestHandler = new RequestHandler();
        this._builtInRequestHandler = new BuiltInRequestHandler();
        this._streamHandler = new StreamHandler();
    }
    
    cbToPromiseWrapper(action, cb){
        // Wrapper to return a promise in absence of a callback
        if(cb){
            return action(cb);
        }
        return new Promise((resolve, reject) => {
            return action(resolve);
        });
    }
    
    request(req, data, cb){
        return this.cbTrPromiseWrapper(cb => this._requestHandler.request(req, data, cb), cb);
    }
    
    createStream(options){
        return this._streamHandler.createStream(options);
    }
}

class ParentCommunicatorBase{
    constructor(){
        
    }
    
    messageParent(options, cb){
        options.data = options.data || {};
        options.requestType = options.requestType || "request";
        options.requestID = Math.random().toString(36).substr(2, 10);
        
        window.parent.postMessage(JSON.stringify(options), '*');
    }
}

class RequestHandler extends ParentCommunicatorBase{
    constructor(){
        super();
    }
    
    request(req, data, cb){
        return cb(req + "HEEE GANG GANG");
    }
}

class BuiltInRequestHandler extends ParentCommunicatorBase{
    constructor(){
        super();
    }
}

class StreamHandler extends ParentCommunicatorBase{
    constructor(){
        super();
        this._streams = {};
    }
    
    createStream(options){
        if(!options.identifier){
            throw "identifier not defined";
        }
        this._streams[options.identifier] = new Stream(options);
        
        return this._streams[options.identifier];
    }
}

class Stream{
    constuctor(options){
        this.private = options.private || true;
        this.id = options.id;
    }
    
    emit(data){
        this.parentMessage({
            data: data,
            requestType: "stream",
            id: this.id
        });
    }
}

const parentApi = new ParentCommunicatorWrapper();

/*  -----------
    == Tests ==
    ----------- */

parentApi.request("Test", {g: "c"}, response => {
    console.log(response);
});

parentApi.request("Test", {g: "c"}).then(response => {
    console.log("Promise: " + response);
});

const gangStream = parentApi.createStream({
    id: "gang-gang",
    private: true
})