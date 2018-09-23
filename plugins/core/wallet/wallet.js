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

    17: "Message",

    18: "Delegation",
    19: "Supernode",
    20: "Airdrop"
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
                // computed: "_getSelectedAddressInfo(addressesInfo, selectedAddress)"
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
            // "_addressObserver(selectedAddress.address)"
            "_getSelectedAddressInfo(addressesInfo, selectedAddress)"
        ]
    }

    constructor() {
        super();
    }

    _getAllTransactions(transactions, addressesUnconfirmedTransactions) {
        // console.log("UPDATING TRANSACTIONS")
        const unconfirmedTransactions = addressesUnconfirmedTransactions[this.selectedAddress.address]
        // console.log(transactions, unconfirmedTransactions)
        if(!(transactions && unconfirmedTransactions)) return []
        return [].concat(unconfirmedTransactions, transactions)
    }

    _getSelectedAddressInfo(addressesInfo, selectedAddress) {
        console.log("========SETTING SELECTED ADDR INFO", addressesInfo[selectedAddress.address])
        // return addressesInfo[selectedAddress.address]
        this.selectedAddressInfo = addressesInfo[selectedAddress.address]
        this.loading = false
    }

    ready(){
        super.ready();

        this.coreWimp = new Wimp("core", window.parent);

        this.parentWimp = new Wimp(window.parent);
        
        this.parentWimp.ready().then(() => {
            
            this.parentWimp.listen("Selected address", selectedAddress => {
                
                this.selectedAddress = {}
                this.selectedAddress = selectedAddress
                const addr = selectedAddress.address

                this.coreWimp.ready()
                .then(() => {
                    
                    if (!this.addressInfoStreams[addr]) {
                        console.log('AND DIDN\'T FIND AN EXISTING ADDRESS STREAM')
                        this.addressInfoStreams[addr] = this.coreWimp.listen(`address/${addr}`, addrInfo => {
                            console.log(addrInfo)

                            this.loading = false
                            
                            addrInfo.nativeBalance = addrInfo.nativeBalance || { total: {} }
                            addrInfo.nativeBalance.total["0"] = addrInfo.nativeBalance.total["0"] || 0
                            
                            
                            this.set(`addressesInfo.${addr}`, addrInfo)
                            const addressesInfoStore = this.addressesInfo
                            this.addressesInfo = {}
                            this.addressesInfo = addressesInfoStore
                        })
                    }
                    if (!this.unconfirmedTransactionStreams[addr]) {
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
        // return isNaN(num) ? 0 : (num + "").split(".")[1]
        return num % 1 > 0 ? (num + "").split(".")[1] : "0"
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
    
    // _addressObserver(address){
    //     if(!address || this.lastAddress == address){
    //         return
    //     }
    //     console.log("UPDATING")
    //     this._updateAccount(address);
    //     this.lastAddress = address
    // }
    
    _format(num){
        return num.toLocaleString()
    }
    
    textColor(color){
        return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
    }
    _unconfirmedClass(unconfirmed) {
        return unconfirmed ? "unconfirmed" : ""
    }
    // _updateAccount(addr){
    //     console.log("UPDATING ACCOUNT")
    //     this.loading = true;
    //     this.parentWimp.request("qoraApiCall",{
    //         data: {
    //             type: "explorer",
    //             data: {
    //                 addr: addr,
    //                 txOnPage: 10
    //             }
    //         }
    //     }, response => {
    //         const address = this.selectedAddress;
    //         console.log(response);
    //         if (!response.success) {
    //             address.balance = 0
    //             address.transactions = []
    //             address.info = {}
    //         } else{
    //             address.balance = parseFloat(response.data.balance.total[0]);
    //             address.info = response.data;
    //         }

    //         // let biggestKey = 0;
    //         // let txKeys = 0;
    //         // // Find the highest number for most recent tx.
    //         // const keys = Object.keys(address.info);
    //         // keys.forEach(key => {
    //         //     // Make sure it's a numero
    //         //     if (!isNaN(key)) {
    //         //         txKeys++;
    //         //         key = parseInt(key)
    //         //         if (key > biggestKey) {
    //         //             biggestKey = key;
    //         //         }
    //         //     }
    //         // })
    //         // let i = biggestKey;
    //         // address.transactions = []
    //         // // Because the keys could be 30-40, rather than 0-10
    //         // for (; i > biggestKey - txKeys; i -= 1) {
    //         //     //console.log(i);
    //         //     address.transactions.push(this.selectedAddress.info[i]);
    //         //     delete address.info[i]
    //         // }
    //         for (let i = address.info.start;i<address.info.end;i--){
    //             address.transactions.push(this.selectedAddress.info[i]);
    //             delete address.info[i]
    //         }
    //         this.selectedAddress = {}
    //         this.selectedAddress = address
    //         this.loading = false;
    //         console.log(this.selectedAddress);
    //     })
    // }
}

window.customElements.define(WalletApp.is, WalletApp);