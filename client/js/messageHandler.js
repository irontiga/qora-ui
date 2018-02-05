class MessageHandler {
    constructor(){
        // Reference to this from the polymer function in app.js
        this.app = App;
        
        // Could be moved to left up to QoraMessageHandler, which would allow it's extension
        this.startStream(StreamHandler);
        
        window.addEventListener("message", this._listener.bind(this), false);
    }
    
    _listener(event){
        const message = JSON.parse(event.data);
        const source = event.source;
        
        switch(message.request){
            case "stream":
                // The special case of it being a stream...ie replicate a  websocket instead of a http request
                this.Stream[message.data.type](message, source);
                break;
            // Things like iframe resize, hash urls, etc.
            case "builtin":
                break;
            case "message"
            default:
                this._message(message, source)
        }
    }
    
    startStream(StreamClass){
        this.Stream = new StreamClass(this.send);
    }
    
    sendGenerator(message, source){
        /*
        -------------
        DOCUMENTATION
        -------------
        response = {
            data: { blah blah data },
            success: true/false
            error: {
                message: "If success is false include a message"
            }
            type: "message/stream"
        }
        */
        return function(response){
            // If no response supplied assume success
            response = response || { success: true };
            // No type means message
            response.type = response.type || "message";
            // If success is not defined, also assume success
            if(!("success" in response)){
                response.success = true;
            }
            //
            response.requestID = message.requestID;
            
            source.postMessage(JSON.stringify(response), "*");
        }
    }
    
    _message(message, source){
        
        const data = message.data;
        
        const send = this.sendGenerator(message, source);
        
        if(this[message.request] == undefined){
            
            return send({
                success: false,
                error: {
                    message : "Unrecognized request '" + message.request + "'"
                }
            });
        }
        
        this[message.request](data, send);
    }
    
    // Default UI Builder functions/messages whatever
    pluginsLoaded(data, send){
        this.app.pluginsLoaded = true;
        send();
    }
    
    registerUrl(data, send){
        let parent = false;
        if(data.parent){parent = true;}
        
        this.app.push("urls",{
            url :  data.url,
            title : data.title,
            menus : data.menus,
            page : data.page,
            parent: parent
        });
        
        // Dirty updating url array https://www.polymer-project.org/1.0/docs/devguide/model-data#array-mutation
        let allUrls = this.app.urls;
        allUrls.sort((a, b) => {
            if(a.title > b.title){
                return 1;
            }
            if(a.title < b.title){
                return -1;
            }
            return 0;
            // Throw some sort of error if they're the same...can't have two menus with the same name, too confusing.
        })
        this.app.urls = [];
        this.app.urls = allUrls;
        
        //console.log(this.app);
        //console.log(this.app.urls);
        send();
    }
    
    addMenuItem(data, send){
        send();
    }
    
    
    
    registerTopMenuModal(data, send){
        /* 
        -----------------
        DOCUMENTAION
        -----------------
        data = {
            icon: "",
            frameUrl: "/frame/url",
            text: ""
        }
        */
        this.app.push("topMenuItems", data);
        send();
    }
    
    // Nice n simple toast
    toast(data, send){
        // We'll get there...
        // Needs to handle storage as per md spec... if two toasts are triggered a split second apart...the later toast will have to wait for the first to be dismissed/auto dismiss itself before being displayed
        // Ahh, it needs a queue
    }
}

// Is called by messageHandler
class StreamHandler{
    constructor(){
        this._streams = {};
    }
    
    create(message, source){
        const id = message.data.identifier;
        this._streams[id] = {
            identifier: id,
            source: source,
            options: {
                // Defaults to being a private stream (no other iframes can send data on it's behalf)
                private: message.data.private !== undefined ? message.data.private : true
            },
            clients: {}
        };
        
        console.log("Stream '" + id + "' created :)")
        
        return this._send(source);
    }
    
    // Hidden send method
    _send(source, response){
        // If no response supplied assume success
        response = response || { success: true };
        // No type means message
        response.type = response.type || "stream";
        // If success is not defined, also assume success
        response.success = response.success || true;

        source.postMessage(JSON.stringify(response), "*");
    }
    
    send(message, source){
        const id = message.data.identifier;
        const stream = this._streams[id];
        
        if(!(id in this._streams)){ 
            return this._send
            return source.postMessage(JSON.stringify({
                type: "stream",
                succes: false,
                error: {
                    message: "Stream does not exist"
                }
            }), "*");
        }
        
        if(source !== stream.source && stream.private){
            return source.postMessage(JSON.stringify({
                type: "stream",
                succes: false,
                error: {
                    message: "Stream is private. Only it's creator can send through it."
                }
            }), "*");
        }
        
        
    }
    
    open(){
        // Stream connection from new client...WHOOP
    }
}

