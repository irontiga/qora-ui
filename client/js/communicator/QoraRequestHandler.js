class QoraRequestHandler extends RequestHandler {
    constructor(){
        super()
    }

    _hello(data, send){
        console.log("Hi");
        send("Hello");
    }

    // THIS QORA STUFF NEEDS TO COME IN HEREEEE
    _qoraApiCall(data, send){
        Qora.apiCall(data, this.app.qoraNode, send);
    }

    _getQoraAddresses(data, send){
        const addressIDS = this.app.addresses.map(function(address){
            let response = {
                address: address.address,
                color: address.color,
                nonce: address.nonce
            }
            return response;
        });
        send({
            data: addressIDS
        });
    }

    _getQoraAddress(data, send){
        return this.wallet.genAddress(data.nonce);
        send();
    }

    // Use nonces instead of addresses
    _sendMoney(data, send){
        if(this.app.sendMoneyPrompt.open){
            send({
                success: false,
                error: {
                    message: "There is already a send money request pending."
                }
            })
        }

        data.sender = this.app.addresses[data.nonce];
        // Last referene at senderAddress[highest tx number].reference;

        this.app.sendMoneyPrompt = {};
        this.app.sendMoneyPrompt = {
            open: true,
            address: data.address,
            recipient : data.recipient,
            amount: data.amount,
            fee: data.fee,
            accept : function(){
                this.app.sendMoneyPrompt = {open:false};
                Qora.sendMoney(data, this.app.qoraNode, send);
            }.bind(this),
            reject: function(){
                this.app.sendMoneyPrompt = {open:false};
                return send({
                    success: false,
                    error: {
                        message : "User rejected transaction"
                    }
                });
            }.bind(this)
        };
        this.app.$.sendMoneyConfirmDialog.open();
    }

    _createAT(data, send){
        console.log("Created...not");
        send();
    }
}