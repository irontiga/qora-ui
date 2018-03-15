// const parentWindow = new ParentHelper();
//const parentWindow = new ParentCommunicator();
//window.addEventListener("message", event => parentWindow.listener(event));

class WalletApp extends Polymer.Element {
    static get is() { return 'multi-wallet' }

    static get properties() {
        return {
            addresses: {
                type: Array,
                value: []
            }
        }
    }

    constructor() {
        super();
    }

    _arrayItem(arr, i) {
        return arr[i];
    }

    toggle(event) {
        var id = event.currentTarget.getAttribute('ident');
        var collapse = this.shadowRoot.querySelector('iron-collapse[ident="' + id + '"]');
        collapse.toggle();
    }


    _getTransactions(address) {
        let biggestKey = 0;
        let txKeys = 0;
        // Find the highest number for most recent tx.
        const keys = Object.keys(address);
        keys.forEach(val => {
            // Make sure it's a numero
            if (!isNaN(val)) {
                txKeys++;
                val = parseInt(val)
                if (val > biggestKey) {
                    biggestKey = val;
                }
            }
        })
        let i = biggestKey;
        const transactions = [];
        for (; i > biggestKey - txKeys; i -= 1) {
            //console.log(i);
            transactions.push(address[i]);
        }
        //console.log(transactions);
        return transactions;
    }

    _floor(num) {
        return Math.floor(num);
    }
    
    _decimals(num) {
        const decimals = num - this._floor(num)
        //console.log(decimals);
        // decimals.toString().length - 2
        return decimals * Math.pow(10, decimals.toString().length - 2);
    }
    _log(thing) {
        console.log(thing);
    }

    connectedCallback() {
        super.connectedCallback();
        //console.log('wallet-app element created!');
    }

    ready() {
        super.ready();
        
        Wimp.init();
        
        this.parentWimp = new Wimp(window.parent);
        
        this.coreWimp = new Wimp("core", window.parent);
        
        this.coreWimp.ready(() => {
            this.coreWimp.listen("balances", balances => {
                this.addresses = balances
            });
        })
    }
}

window.customElements.define(WalletApp.is, WalletApp);
