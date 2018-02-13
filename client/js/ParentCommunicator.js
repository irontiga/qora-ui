

class ParentCommunicatorWrapper{
    constructor(plugins) {
        this._listenerTypes = {};

        this._pendingRequests = {};

        plugins = plugins || ["RequestHandler", "BuiltInRequestHandler", "StreamHandler"];

        const pluginInstances = plugins.map(function(plugin){
            return new window[plugin](this);
        }.bind(this));

        pluginInstances.forEach(function (plugin) {
            if (!plugin.publicMethods) {
                return;
            }
            plugin.publicMethods.forEach(function (method){
                if (this[method] != undefined) {
                    return console.error("'" + method + "' is already defined!")
                }
                this[method] = plugin[method];
            }.bind(this));
        }.bind(this))
    }

    registerListenerType(type, listener) {
        this._listenerTypes[type] = listener;
    }

    // Passes the event on to the correct listener
    listener(event) {
        event.data = JSON.parse(event.data);

        // Calls a stream listener or a normal listener etc.
        this.listenerTypes[event.data.requestType](event);
        /*
        switch (requestType) {
            case "stream":
                break;
            case "request":
                break;
            case "built-in":
                break;
        }
        */
    }

    cbToPromiseWrapper(action, cb) {
        // Wrapper to return a promise in absence of a callback
        if (cb) {
            return action(cb);
        }
        return new Promise((resolve, reject) => {
            return action(resolve);
        });
    }

    // From ParentCommunicatorBase
    /* Not needed. Each class can handle this their own way.
   _ messageParent(options, cb) {
        options.data = options.data || {};
        options.requestType = options.requestType || "request";
        options.requestID = Math.random().toString(36).substr(2, 10);
        window.parent.postMessage(JSON.stringify(options), '*');
    }
    */
}

class RequestHandler{
    constructor(parent) {
        this._parent = parent;
        parent.registerRequestType("request", this.listener)
    }

    listener(event) {
        
    }

    get publicMethods() {
        return ["request", "changeUrl"]
    }
    
    request(request, data, callback) {
        var requestID = Math.random().toString(36).substr(2, 10);
        var messageRequest = JSON.stringify({
            requestType: "request",
            request: request,
            requestID: requestID,
            data: data
        });

        window.parent.postMessage(messageRequest, '*');


        this._pendingRequests[requestID] = callback;
    }

    changeUrl(url) {
        // Update the url, and therefore the active plugin
        window.location.replace(url);
    }

    activateHashUrl() {
        this.request("hashListener", {}, function () {

        })
    }
}

class BuiltInRequestHandler{
    constructor(parent) {
        this._parent = parent;
        parent.registerListenerType("built-in", this.listener)
    }

    listener(event) {
        var data = JSON.parse(event.data);

        var id = data.requestID;

        //console.log(data)

        if (this._pendingRequests[id]) {

            // call callback
            this._pendingRequests[id](data);

            //console.log(pendingRequests);

            delete this._pendingRequests[id];
        }
    }

    get publicMethods() {
        return []
    }
}

class StreamHandler{
    constructor(parent) {
        this._parent = parent;
        this._streams = {};
        parent.registerListenerType("stream", this.listener)
    }

    get publicMethods() {
        return ["createStream", "openStream"]
    }

    listener(event) {
        
    }
    
    createStream(options){
        if(!options.identifier){
            throw "identifier not defined";
        }
        this._streams[options.identifier] = new Stream(options);
        
        return this._streams[options.identifier];
    }

    openStream() {
        
    }
}

class Stream{
    constuctor(options){
        this.private = options.private || true;
        this.id = options.id;
    }
    
    emit(data){
        /*this._messageParent({
            data: data,
            requestType: "stream",
            id: this.id
        });
        */
    }
}

const parentApi = new ParentCommunicatorWrapper();

window.addEventListener("message", parentApi.listener);

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