const parentWindow = new ParentHelper();

class WalletApp extends Polymer.Element {
    static get is(){ return 'multi-wallet' }

    static get properties() {
        return {
            addresses: {
                type: Array,
                value: []
            },
            fee: {
                type:Number,
                value: 1
            },
            amount: {
                type: Number
            },
            sendMoneyError: {
                type: String,
                value: ""
            },
            sendMoneyLoading: {
                type: Boolean,
                value: false
            }
        }
    }

    constructor() {
        super();
    }

    _arrayItem(arr, i){
        return arr[i];
    }

    _checkAmount(){
        if(this.amount > this.selectedAddress.balance - this.fee || this.amount <= 0){
            this.validAmount = true;
        }
        else{
            this.validAmount = false;
        }
    }

    toggle(event) {
        var id = event.currentTarget.getAttribute('ident');
        var collapse = this.shadowRoot.querySelector('iron-collapse[ident="' + id + '"]');
        collapse.toggle();
    }

    _sendMoneyDialog(e){
        this.$.sendMoneyDialog.open()
    }

    _sendMoney(e){
        var address = this.selectedAddress;
        var amount = this.amount;
        var recipient = this.recipient;
        var fee = this.fee;

        // Check for valid...^
        
        this.sendMoneyLoading = true;
        parentWindow.request("sendMoney", {
            // Why is it index not nonce?
            nonce: address.nonce,
            //address: address.address,
            amount: amount,
            recipient: recipient,
            fee: fee
        }, function(response){
            console.log(response);
            this.sendMoneyLoading = false;
            if(!response.success){
                this.sendMoneyError = response.errorText;
            }
            else{
                this.$.sendMoneyDialog.close();
                this.addressUpdate();
            }
        }.bind(this));

        //this.$.sendMoneyDialog.close();
    }

    _getTransactions(address){
        let biggestKey = 0;
        let txKeys = 0;
        // Find the highest number for most recent tx.
        const keys = Object.keys(address);
        keys.forEach(val => {
            // Make sure it's a numero
            if(!isNaN(val)){
                txKeys++;
                val = parseInt(val)
                if(val > biggestKey){
                    biggestKey = val;
                }
            }
        })
        let i = biggestKey;
        const transactions = [];
        for(;i>biggestKey-txKeys; i-=1){
            //console.log(i);
            transactions.push(address[i]);
        }
        //console.log(transactions);
        return transactions; 
    }
    
    _floor(num){
        return Math.floor(num);
    }
    _decimals(num){
        const decimals = num - this._floor(num)
        //console.log(decimals);
        // decimals.toString().length - 2
        return decimals * Math.pow(10, decimals.toString().length - 2);
    }
    _log(thing){
        console.log(thing);
    }

    connectedCallback() {
        super.connectedCallback();
        //console.log('wallet-app element created!');
    }
    
    addressUpdate(){
        
        Promise.all(this.addressStore.map((address) => {
            return new Promise((resolve, reject) => {
                return parentWindow.request("qoraApiCall", {
                    method: "GET",
                    type: "explorer",
                    data: {
                        addr: address.address,
                        txOnPage: 20
                    }
                }, response => {
                    resolve(response);
                })
            }).then((response, error) => {
                // Check for errors...probably an unused account
                //console.log(response);
                if(response.error){
                    address.balance = 0;
                    address.info = {};
                }
                else{
                    address.balance = response.balance.total[0];
                    address.info = response;
                }
                return address;
            })
        }))
            
            .then(function(addresses, err){
            // Sort em real nice
            //console.log(addresses);
            addresses.sort(function(a, b){
                return a.nonce - b.nonce
            });

            // And spread the love to the wor....app
            this.addresses = [];
            this.addresses = addresses;
            this.selectedAddress = this.addresses[0];
        }.bind(this))
            .catch(err => {
            console.error(err);
        })
    }

    ready(){
        super.ready();
        //console.log("hey");
        // Fetch the addresssses
        parentWindow.request("getQoraAddresses", {}, function(addresses){
            //console.log("================ HEYY ============");
            //console.log(JSON.stringify(addresses));
            //console.log(addresses);

            this.addressStore = addresses;
            // Nope, need to wait till balances are loaded
            //this.selectedAddress = this.addresses[0];
            
            // Now fetch all the addres infoooos
            this.addressUpdate();
            // And update every....30 seconds?
            setInterval(this.addressUpdate.bind(this), 30000)
        }.bind(this))
    }
}

window.customElements.define(WalletApp.is, WalletApp);
