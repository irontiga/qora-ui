class RequestHandler extends CommunicatorBase {
    constructor(){
        super()
    }
    
    message(source, message){

        const data = message.data;
        
        const request = "_" + message.request;

        //console.log(this._sendGenerator, source, message.requestID);
        const send = this._sendGenerator(source, message.requestID);

        if(this[request] == undefined){

            return send({
                success: false,
                error: {
                    message : "Unrecognized request '" + message.request + "'"
                }
            });
        }
        
        this[request](data, send);
    }

    // Default UI Builder functions/messages whatever
    _pluginsLoaded(data, send){
        this.app.pluginsLoaded = true;
        send();
    }

    _registerUrl(data, send){
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

    _addMenuItem(data, send){
        send();
    }
    
    _registerTopMenuModal(data, send){
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
    _toast(data, send){
        // We'll get there...
        // Needs to handle storage as per md spec... if two toasts are triggered a split second apart...the later toast will have to wait for the first to be dismissed/auto dismiss itself before being displayed
        // Ahh, it needs a queue
    }
}
