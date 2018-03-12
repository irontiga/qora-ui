class StreamHandler extends CommunicatorBase{
    constructor(){
        super();
        
        this._streams = {};
        /*
        "identifier":{
            clients: [source, source, ...],
            source: source
        },
        identifier...
        */
    }
    
    message(source, data){
        switch(data.type){
            case "create":
                // Append to streams
                this._create(source, data);
                break;
            case "emit":
                // Emit a message to everyone in the stream.clients
                this._emit(source, data);
                break;
            case "connect":
                // New client connection
                this._connect(source, data);
                break;
        }
    }

    _create(source, data){
        console.log(data);
    }

    _emit(source, data){

    }

    _connect(source, data){

    }
}


