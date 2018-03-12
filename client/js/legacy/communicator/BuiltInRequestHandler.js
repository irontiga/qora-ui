class BuiltInRequestHandler extends CommunicatorBase {
    constructor(app) {
        super(app);
        this.modal = {
            height: "300px",
            width: "300px"
        }
    }
    // URL hashes, resizing for modals

    message(source, message) {
        const data = message.data;

        const request = "_" + message.request;

        //console.log(this._sendGenerator, source, message.requestID);
        const send = this._sendGenerator(source, message.requestID, "request");
        // console.log(source);
        if (this[request] == undefined) {

            return send({
                success: false,
                requestType: "request",
                error: {
                    message: "Unrecognized request '" + message.request + "'"
                }
            });
        }

        this[request](data, send);
    }
}