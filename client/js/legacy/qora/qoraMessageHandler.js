class QoraHandler extends MessageHandler {
    constructor(){
        super()
    }

    hello(){
        console.log("Hi");
    }

    // THIS QORA STUFF NEEDS TO COME IN HEREEEE
    qoraApiCall(data, send){
        Qora.apiCall(data, this.app.qoraNode, send);
    }

    getQoraAddresses(data, send){
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
    
    getQoraAddress(data, send){
        return this.wallet.genAddress(data.nonce);
        send();
    }
    
    // Use nonces instead of addresses
    sendMoney(data, send){
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

    createAT(data, send){
        console.log("Created...not");
        send();
    }
}

window.addEventListener('WebComponentsReady', function(){
    //window.customElements.define(MainApp.is, MainApp);
});
const handler = new QoraHandler();


//App._registerMessageHandler(QoraHandler);