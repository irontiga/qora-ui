const parentWindow = new ParentHelper();

class WalletApp extends Polymer.Element {
    static get is(){ return 'wallet-app' }

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
            address: address.address,
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
                return a.index - b.index
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
            console.log(addresses);

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

/*window.addEventListener('WebComponentsReady', function(){

});*/

/*
"help":{
    "Unconfirmed Transactions":"blockexplorer.json?unconfirmed",
        "Block":"blockexplorer.json?block={block}",
            "Blocks List":"blockexplorer.json?blocks[&start={height}]",
                "Assets List":"blockexplorer.json?assets",
                    "Assets List Lite":"blockexplorer.json?assetsLite",
                        "Asset":"blockexplorer.json?asset={asset}",
                            "Asset Trade":"blockexplorer.json?asset={assetHave}&asset={assetWant}",
                                "Polls List":"blockexplorer.json?polls",
                                    "Poll":"blockexplorer.json?poll={poll}",
                                        "AT TX":"blockexplorer.json?atTx={atTx}",
                                            "Trade":"blockexplorer.json?trade={initiatorSignature}/{targetSignature}",
                                                "Transaction":"blockexplorer.json?tx={txSignature}",
                                                    "Name":"blockexplorer.json?name={name}",
                                                        "Name (additional)":"blockexplorer.json?name={name}&start={offset}&allOnOnePage",
                                                            "Address":"blockexplorer.json?addr={address}",
                                                                "Address (additional)":"blockexplorer.json?addr={address}&start={offset}&allOnOnePage&withoutBlocks&showWithout={1,2,blocks}&showOnly={type}",
                                                                    "Top Richest":"blockexplorer.json?top={limit}&asset={asset}",
                                                                        "Address All Not Zero":"blockexplorer.json?top=allnotzero",
                                                                            "Address All Addresses":"blockexplorer.json?top=all",
                                                                                "AT List":"blockexplorer.json?aTs",
                                                                                    "Names List":"blockexplorer.json?names",
                                                                                        "BlogPosts of Address":"blockexplorer.json?blogposts={addr}",
                                                                                            "Search":"blockexplorer.json?q={text}",
                                                                                                "Balance":"blockexplorer.json?balance={address}[&balance=address2...]"
}
*/

/*
const addressUpdate = function(firstCall, interval){

    Promise.all(this.addresses.map((address) => {
        return Qora.apiCall({
            type: "explorer",
            url: "",
            data: {
                addr: address.address.address
            },
            method: "GET"
        }, this.qoraNode)
            .then((response, error) => {
            address.info = response;
            //console.log(response);
            return address;
        })
    })).then(function(addresses, err){
        // Sort em real nice
        addresses.sort(function(a, b){
            return a.index - b.index
        });

        // And spread the love to the wor....app
        this.addresses = [];
        this.addresses = addresses;
        //console.log(this.addresses);

        // Log her in....Now that the addresses are loaded.
        if(firstCall){
            this.loginpage.loggedin = true;
            this.passphrase = passphrase;

            const loginpage = this.loginpage;
            this.loginpage = {};
            this.loginpage = loginpage;
        }
    }.bind(this))
        .then(function(){
        addressUpdateTimeout = setTimeout(function(){ return addressUpdate(false, interval);}, interval)
    })
        .catch(function(err){
        if(firstCall){
            passInput.disabled = false;
            this.set('loginpage.loading', false);
            this.set('loginpage.errorMessage', err);
            //console.log("ERRRRROR");
        }
        else{
            addressUpdateTimeout = setTimeout(function(){ return addressUpdate(false, interval);}, interval)
        }
    }.bind(this))
}.bind(this)

addressUpdateTimeout = setTimeout(function(){addressUpdate(true, 10000)}.bind(this), 0);*/