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
            // address: {
            //     type: Object,
            //     value: {}
            // },
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
            },

            addressesInfo: {
                type: Object,
                value: {}
            },
            selectedAddress: {
                type: Object,
                value: {}
            },
            selectedAddressInfo: {
                type: Object,
                value: {},
                computed: "_getSelectedAddressInfo(addressesInfo, selectedAddress)"
            },
            selectedAddressTransactions: {
                value: [],
                computed: "_getAllTransactions(selectedAddressInfo.transactions, addressesUnconfirmedTransactions)"
            },
            addressesUnconfirmedTransactions: {
                type: Object,
                value: {}
            },
            addressInfoStreams: {
                type: Object,
                value: {}
            },
            unconfirmedTransactionStreams: {
                type: Object,
                value: {}
            },
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

    _getAllTransactions(transactions, unconfirmedTransactions) {
        // console.log("UPDATING TRANSACTIONS")
        unconfirmedTransactions = unconfirmedTransactions[this.selectedAddress.address]
        // console.log(transactions, unconfirmedTransactions)
        if(!(transactions && unconfirmedTransactions)) return []
        return [].concat(unconfirmedTransactions, transactions)
    }

    _getSelectedAddressInfo(addressesInfo, selectedAddress) {
        return this.addressesInfo[selectedAddress.address]
    }

    ready(){
        super.ready();

        this.coreWimp = new Wimp("core", window.parent);

        this.parentWimp = new Wimp(window.parent);
        
        this.parentWimp.ready().then(() => {
            // console.log("==========READYYY")
            this.parentWimp.listen("Selected address", selectedAddress => {
                // console.log(address)
                // this.address = address
                this.selectedAddress = {}
                this.selectedAddress = selectedAddress
                const addr = selectedAddress.address

                console.log("SELECTED AN ADDRESSS>>>>", selectedAddress)

                this.coreWimp.ready()
                .then(() => {
                    console.log("READY EVENT FIRED")
                    console.log(this.addressInfoStreams[addr])
                    if (!(addr in this.addressInfoStreams)) {
                        console.log('AND DIDN\'T FIND AN EXISTING ADDRESS STREAM')
                        this.addressInfoStreams[addr] = this.coreWimp.listen(`address/${addr}`, addrInfo => {
                            this.loading = false
                            this.set(`addressesInfo.${addr}`, addrInfo)

                            const addressesInfoStore = this.addressesInfo
                            this.addressesInfo = {}
                            this.addressesInfo = addressesInfoStore
                        })
                    }
                    if (!(addr in this.unconfirmedTransactionStreams)) {
                        console.log('AND DIDN\'T FIND AN EXISTING UNCONFIRMED TX STREAM')
                        this.addressesUnconfirmedTransactions[addr] = []

                        this.unconfirmedTransactionStreams[addr] = this.coreWimp.listen(`unconfirmedOfAddress/${addr}`, unconfirmedTransactions => {

                            unconfirmedTransactions = unconfirmedTransactions.map(tx => {
                                return { 
                                    transaction: tx,
                                    unconfirmed: true
                                }
                            })

                            console.log("RECEIVED UNCONFIRMED TX INFO", unconfirmedTransactions)
                            
                            this.addressesUnconfirmedTransactions[addr] = unconfirmedTransactions
                            const addressesUnconfirmedTransactionsStore = this.addressesUnconfirmedTransactions
                            this.addressesUnconfirmedTransactions = {}
                            this.addressesUnconfirmedTransactions = addressesUnconfirmedTransactionsStore
                        })
                    }

                })
            })
        })

        // setInterval(() => {
        //     this.parentWimp.request("toast", {
        //         data: {
        //             text: "**QMLGFLi9Y5VWiu2AMJeyn4fWW6HeWurYyG** received **15** Qora from **QMLGFLi9Y5VWiu2AMJeyn4fWW6HeWurYyG**",
        //             action: false
        //         }
        //     }, res => {
        //         console.log(res)
        //     })
        // }, 3000)
        
        this.coreWimp.ready().then(() => this.coreWimp.listen("New block", block => {
            // console.log("---- BLOCK ----" ,block)
            this.lastBlock = block;
        }))
        
        Wimp.init();
    }
    isEmptyArray(arr){
        if(!arr){return true}
        return arr.length == 0
    }
    timestampToISO(timestamp){
        // console.log(timestamp)
        // console.log(this.selectedAddressTransactions)
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
        return tx.sender == this.selectedAddress.address
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
    _unconfirmedClass(unconfirmed) {
        return unconfirmed ? "unconfirmed" : ""
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