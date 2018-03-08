//const App = document.querySelector("main-app"); (in app.js)
const appStreamHandler = new StreamHandler(App);
const appRequestHandler = new QoraRequestHandler(App);
const appBuiltInRequestHandler = new BuiltInRequestHandler(App);


window.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    const source = event.source;
    //console.log(data);
    switch (data.requestType) {
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