class UnconfirmedTransactionWatcher {
    constructor (parentWimp) {
        this._parentWimp = parentWimp
        this.reset() // Sets defaults
    }

    reset() {
        this._addresses = {}
        this._addressUnconfirmedTransactions = {}
        this._unconfirmedTransactionStreams = {}
    }

    // Adds an address to watch
    addAddress(address) {
        console.log("Added address", address)
        const addr = address.address
        this._addresses[addr] = address
        this._addressUnconfirmedTransactions[addr] = []

        this._unconfirmedTransactionStreams[addr] = this._parentWimp.createStream(`unconfirmedOfAddress/${addr}`, (req, res) => {
            // res(this._addresses[address.address])
            res(this._addressUnconfirmedTransactions[addr])
        })

        // this.updateAddress(address.address)
    }

    check() {
        this._addressTransactionCheck()
            .then(() => setTimeout(() => this.check(), 2000))
            .catch(() => setTimeout(() => this.check(), 2000))
    }

    async _addressTransactionCheck(){
        console.log("Checking for unconfirmed transactions")
        return Promise.all(Object.keys(this.address).map(addr => {
            return this._parentWimp.request("qoraApiCall", {
                data: {
                    type: "api",
                    url: `transactions/unconfirmedof/${addr}`
                }
            }).then(unconfirmedTransactions => {
                if(unconfirmedTransactions.length > 0)
                this._unconfirmedTransactionStreams[addr].emit(unconfirmedTransactions)
            })
        }))
    }
}

export default UnconfirmedTransactionWatcher