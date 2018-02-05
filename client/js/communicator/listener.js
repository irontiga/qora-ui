const appStreamHandler = new StreamHandler();
const appRequestHandler = new QoraRequestHandler();
const appBuiltInRequestHandler= new BuiltInRequestHandler();



window.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    const source = event.source;

    switch(data.requestType){
        case "stream":
            // Websocket connections and related calls
            appStream.message(source, data);
            break;
        case "built-in":
            // Stuff like modal iframe heigh adjustment - pretty much a request response where the frame has supplied the data, rather than the core app
            appBuiltInRequestHandler.message(source, data);
            break;
        case "request":
            // Supplying data to and handling reqests from iframes
            appRequestHandler.message(source, data);
            break;
        default:
            appRequestHandler._sendGenerator(source, data.requestID)({
                success: false,
                error: {
                    message: "Unrecognized requestType '" + data.requestType + "'"
                }
            })
    }
}, false);