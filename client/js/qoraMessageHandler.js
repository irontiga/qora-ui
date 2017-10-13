class QoraHandler extends messageHandler {
    constructor(){
        super()
    }

    hello(){
        console.log("Hi");
    }

    getAccountInfo(data, finish){
        const account = this.app.account;
        account.success = true;
        finish(account);
    }

    // THIS QORA STUFF NEEDS TO COME IN HEREEEE
    qoraApiCall(data, finish){
        Qora.apiCall(data, this.app.qoraNode, finish);
    }

    getQoraAddresses(data, finish){
        const addressIDS = this.app.addresses.map(function(address, index){
            let response = {
                address: address.address.address,
                color: address.color,
                index: index,
                info: address.info
            }
            if(address.info.error){
                response.balance = 0
            }
            else{
                response.balance = address.info.balance.total["0"]
            }
            return response;
        })
        finish(addressIDS);
    }
    sendMoney(data, finish){
        if(this.app.sendMoneyPrompt.open){
            finish({
                success: false,
                errorMessage: "Send money request already pending."
            })
        }
        console.log(data);

        // Find the address info
        let i = 0;
        while(data.address != this.app.addresses[i].address.address){
            i++;
        }
        data.sender = this.app.addresses[i];
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
                Qora.sendMoney(data, this.app.qoraNode, finish);
            }.bind(this),
            reject: function(){
                this.app.sendMoneyPrompt = {open:false};
                finish({
                    success: false,
                    errorMessage : "User rejected transaction"
                });
            }.bind(this)
        };
        this.app.$.sendMoneyConfirmDialog.open();
    }

    createAT(data, finish){
        console.log("Created...not");
        finish();
    }
}

window.addEventListener('WebComponentsReady', function(){
    //window.customElements.define(MainApp.is, MainApp);
});
const handler = new QoraHandler();


//App._registerMessageHandler(QoraHandler);