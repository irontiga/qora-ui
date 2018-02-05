class StreamHandler extends CommunicatorBase{
    constructor(){
        super();
        
        this._streams = {};
    }
    
    message(source, data){
        switch(data.type){
            case "create":
                // Append to streams

                break;
            case "emit":
                // Emit a message to everyone in the stream.clients

                break;
            case "connect":
                // New client connection

                break;
        }
    }

    _create(source, data){

    }

    _emit(source, data){

    }

    _connect(source, data){

    }
}


