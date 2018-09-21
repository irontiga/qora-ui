class DelegationApp extends Polymer.Element {
    static get is() {
        return "delegation-app";
    }
    static get properties() {
        return {
            progressMessage: {
                type: String,
                value: ""
            },
            showProgress: {
                type: Boolean,
                value: false
            },
            errorMessage: {
                type: String,
                value: ""
            },
            successMessage: {
                type: String,
                value: ""
            },
            superNodes: {
                type: Array,
                value: [
                    
                ]
            }
        }
    }
    static get observers() {
        return []
    }

    constructor() {
        super();
    }

    _delegateClick(e){
        this.showProgress = true
        this.progressMessage = "Setting up data..."
        const nodeAddress = e.model.item.address

        // this.parentWimp.request(data: {
        //     type: "api",
        //     url: `addresses/lastreference/${this.selectedAddress.address}/unconfirmed`
        // })
        this._delegate(nodeAddress)
        .then((response) =>{
            this.successMessage = `Success! ${response.data}`
            this.showProgress = false
        }, err => {
            this.errorMessage = `Error! ${err}`
            this.showProgress = false
        })
    }

    async _delegate(address) {
        this.progressMessage = "Fetching last ref..."
        let lastRef = await this.parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: `addresses/lastreference/${this.selectedAddress.address}/unconfirmed`
            }
        })
        lastRef = lastRef.data
        if(lastRef === "false"){
            throw("Address must have a transaction before it can delegate. Try claiming airdrop")
        }
        console.log(lastRef)
        this.progressMessage = "Requesting transaction..."
        
        return await this.parentWimp.request("createTransaction", {
            data: {
                type: 18,
                nonce: this.selectedAddress.nonce,
                params: {
                    superNodeAddress: address,
                    lastReference: lastRef
                    // ,
                    // fee
                }
            }
        })
    }

    _checkCurrentSuperNode() {
        const address = this.selectedAddress.address
        this.parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: `supernodes/of/${address}`
            }
        }).then(response => {
            console.log(response)
            this.currentSuperNode = response.data
        })
    }

    ready() {
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

                this._checkCurrentSuperNode()
                clearInterval(this.checkCurrentSuperNodeInterval)
                this.checkCurrentSuperNodeInterval = setInterval(this._checkCurrentSuperNode.bind(this), 10000)

                this.coreWimp.ready(() => { })

            })

            this.parentWimp.request("qoraApiCall", {
                data: {
                    type: "api",
                    url: `supernodes`
                }
            }).then(response => {
                console.log(response)
                this.superNodes = JSON.parse(response.data)
            })

        })
        

        Wimp.init();
    }
}

window.customElements.define(DelegationApp.is, DelegationApp)