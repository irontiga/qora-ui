class StreamHelper{
    constructor(parent) {
        this._parent = parent;
        this._openStreams = [];
    }

    publicMethods() {
        return [
            "createStream",
            "openStream",
            "syncStream"
        ]
    }

    name() {
        return "StreamHelper"
    }

    createStream(identifier) {
        return new Stream(identifier, this);
    }

    openStream(identifier, callback) {
        
    }

    syncStream(app, identifier) {
        // app is a reference to the polymer app...probably just "this"
        // Use open stream and then app.set(...) or whatever to mirror the variable
    }
}


class Stream {
    constructor(identifier, parentThis) {
        this._identifier = identifier;
        this._parent = parentThis;
        this._parent.request("stream", {
            type: "create",
            identifier: identifier
        }, function (response) {
            //console.log(response);
        })
    }

    getClients() {
        
    }

    // Optional callback...for success/error I guess...we'll assume it doesn't fail for now
    send(data, callback) {
        this._parent.request("stream", {
            type: "send",
            identifier: this._identifier,
            data: data
        }, callback)
    }
}