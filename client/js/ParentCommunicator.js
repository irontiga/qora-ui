// My nice wee private scope...
(function () {

})





class ParentCommunicator {
    constructor(plugins) {
        this._listenerTypes = {};

        plugins = plugins || [RequestHandler, BuiltInRequestHandler, StreamHandler];

        const pluginInstances = plugins.map(function (plugin) {
            return new plugin(this);
        }.bind(this));

        pluginInstances.forEach(function (plugin) {
            if (!plugin.publicMethods) {
                return;
            }
            plugin.publicMethods.forEach(function (method) {
                if (this[method] != undefined) {
                    return console.error("'" + method + "' is already defined!")
                }
                this[method] = plugin[method].bind(plugin);
            }.bind(this));
        }.bind(this))
    }

    registerListenerType(type, listener, listenerThis) {
        this._listenerTypes[type] = listener;
    }

    // Passes the event on to the correct listener
    listener(event) {
        const data = JSON.parse(event.data);
        //console.log(event);
        //console.log(data);
        //console.log(this);
        //console.log(this._listenerTypes);
        // Calls a stream listener or a normal listener etc.
        //console.log(data.requestType);
        //console.log(this._listenerTypes[data.requestType]);
        if(this._listenerTypes[data.requestType]){
            this._listenerTypes[data.requestType](event);
        }
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

class RequestHandler {
    constructor(parent) {
        this._parent = parent;
        parent.registerListenerType("request", this.listener.bind(this));

        this._pendingRequests = {};
    }

    listener(event) {
        const data = JSON.parse(event.data);

        const id = data.requestID;
        //console.log(event);

        //console.log(data)

        if (this._pendingRequests[id]) {
            // call callback
            this._pendingRequests[id](data);

            //console.log(pendingRequests);

            delete this._pendingRequests[id];
        }
    }

    get publicMethods() {
        return ["request", "changeUrl"]
    }

    request(request, data, callback) {
        const requestID = Math.random().toString(36).substr(2, 10);
        const messageRequest = JSON.stringify({
            requestType: "request",
            request: request,
            requestID: requestID,
            data: data
        });

        window.parent.postMessage(messageRequest, '*');
        if (callback) {
            this._pendingRequests[requestID] = callback;
        }
        else {
            return new Promise(function (resolve, reject) {
                this._pendingRequests[requestID] = resolve;
            }.bind(this));
        }

        //this._pendingRequests[requestID] = callback;


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

class BuiltInRequestHandler {
    constructor(parent) {
        this._parent = parent;
        parent.registerListenerType("built-in", this.listener.bind(this));
        this._modal = {
            height: "300px",
            width: "300px"
        }
    }

    listener() {

    }

    get publicMethods() {
        return ["modalDimensions"]
    }
    // Nah...
    get publicGetters() {
        return [];
    }
    get publicSetters() {
        return [];
    }

    modalDimensions(dimensions) {
        this._modal.height = dimensions.height || this._modal.height;
        this._modal.width = dimensions.width || this._modal.width;
    }


}

class StreamHandler {
    constructor(parent) {
        this._parent = parent;
        this._streams = {};
        parent.registerListenerType("stream", this.listener.bind(this))
    }

    get publicMethods() {
        return ["createStream", "openStream"]
    }

    listener(event) {
        const data = JSON.parse(event.data);

    }

    createStream(id, options) {
        if (!id) {
            throw "id not defined";
        }
        this._streams[options.id] = new Stream(options);

        return this._streams[options.id];
    }

    openStream(identifier, callback) {

    }

    syncStream(app, identifier) {
        // Made this should be like "on" but rather a variable binding...mmm
        // app is a reference to the polymer app...probably just "this"
        // Use open stream and then app.set(...) or whatever to mirror the variable
    }
}

// Should kinda mimmick socket.io...just kidding, too complex
class Stream {
    constuctor(options) {
        this.private = options.private || true;
        if (!options.id) {
            throw "id must be specified!";
        }
        this.id = options.id;
        //this._listener = options.listener || function () { };
        this._listeners = {};
    }

    /*
    set listener(listener) {
        this._listener = listener;
    }*/

    listener() {
        // Pass an event on to this._listeners' function
    }

    // Event can be "connection" or any other event defined by the server/client
    on(event, cb) {
        this._listeners[event] = cb;
    }

    emit(data) {
        /*this._messageParent({
            data: data,
            requestType: "stream",
            id: this.id
        });
        */
    }
}