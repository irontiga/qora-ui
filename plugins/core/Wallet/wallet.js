const TX_TYPES = {
    1: "Genesis",
    2: "Payment",

    3: "Name registration",
    4: "Name update",
    5: "Sell name",
    6: "Cancel sell name",
    7: "Buy name",

    8: "Create poll",
    9: "Vote in poll",

    10: "Arbitrary",

    11: "Issue asset",
    12: "Transfer asset",
    13: "Create asset order",
    14: "Cancel asset order",
    15: "Multi-payment transaction",

    16: "Deploy AT",

    17: "Message"
}

class WalletApp extends Polymer.Element {
    static get is() {
        return "wallet-app";
    }
    static get properties(){
        return {
            address: {
                type: Object,
                value: {}
            },
            lastAddress: {
                type: String,
                value: ""
            },
            transactions: {
                type: Array,
                value: []
            },
            lastBlock: {
                type:Object,
                value: {
                    height:0
                }
            }
        }
    }
    static get observers(){
        return [
            "_addressObserver(address.address)"
        ]
    }

    constructor() {
        super();
    }

    ready(){
        super.ready();

        this.coreWimp = new Wimp("core", window.parent);

        this.parentWimp = new Wimp(window.parent);
        
        this.parentWimp.ready().then(() => {
            console.log("==========READYYY")
            this.parentWimp.listen("Selected address", address => {
                console.log(address)
                this.address = address
            })
        })
        
        this.coreWimp.listen("New block", block => {
            this.lastBlock = block;
        })
        
        Wimp.init();
    }
    isEmptyArray(arr){
        if(!arr){return true}
        return arr.length == 0
    }
    timestampToISO(timestamp){
        return new Date(timestamp).toISOString();
    }
    floor(num){
        num = parseFloat(num)
        return isNaN(num) ? 0 : this._format(Math.floor(num))
    }
    decimals(num){
        num = parseFloat(num) // So that conversion to string can get rid of insignificant zeros
        return isNaN(num) ? 0 : (num + "").split(".")[1]
    }
    
    sendOrRecieve(tx){
        return tx.sender == this.address.address
    }
    
    senderOrRecipient(tx){
        return this.sendOrRecieve(tx) ? tx.recipient : tx.sender
    }
    
    txColor(tx){
        return this.sendOrRecieve(tx) ? "red" : "green"
    }
    getTxType(type){
        return TX_TYPES[type]
    }
    subtract(num1, num2){
        return num1 - num2;
    }
    getConfirmations(height, lastBlockHeight){
        return lastBlockHeight - height + 1
    }
    
    _addressObserver(address){
        if(!address || this.lastAddress == address){
            return
        }
        console.log("UPDATING")
        this._updateAccount(address);
        this.lastAddress = address
    }
    
    _format(num){
        return num.toLocaleString()
    }
    
    textColor(color){
        return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
    }
    
    _updateAccount(addr){
        this.loading = true;
        this.parentWimp.request("qoraApiCall",{
            data: {
                type: "explorer",
                data: {
                    addr: addr,
                    txOnPage: 10
                }
            }
        }, response => {
            const address = this.address;
            console.log(response);
            if (!response.success) {
                address.balance = 0
                address.transactions = []
                address.info = {}
            } else{
                address.balance = parseFloat(response.data.balance.total[0]);
                address.info = response.data;
            }

            let biggestKey = 0;
            let txKeys = 0;
            // Find the highest number for most recent tx.
            const keys = Object.keys(this.address.info);
            keys.forEach(key => {
                // Make sure it's a numero
                if (!isNaN(key)) {
                    txKeys++;
                    key = parseInt(key)
                    if (key > biggestKey) {
                        biggestKey = key;
                    }
                }
            })
            let i = biggestKey;
            address.transactions = []
            // Because the keys could be 30-40, rather than 0-10
            for (; i > biggestKey - txKeys; i -= 1) {
                //console.log(i);
                address.transactions.push(this.address.info[i]);
                delete address.info[i]
            }
            this.address = {}
            this.address = address
            this.loading = false;
            console.log(this.address);
        })
    }
}

window.customElements.define(WalletApp.is, WalletApp);