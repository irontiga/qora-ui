class UnconfirmedTransactionWatcher {
    constructor (parentWimp) {
        this._parentWimp = parentWimp
        this._unconfirmedTransactionStreams = {}
        this.reset() // Sets defaults
    }

    reset() {
        this._addresses = {}
        this._addressesUnconfirmedTransactions = {}
    }

    // Adds an address to watch
    addAddress(address) {
        console.log("Added address", address)
        const addr = address.address
        this._addresses[addr] = address
        this._addressesUnconfirmedTransactions[addr] = []

        if(this._unconfirmedTransactionStreams[addr]) return 
        console.log("CREATING A STRTRREEAAAMMMM")
        this._unconfirmedTransactionStreams[addr] = this._parentWimp.createStream(`unconfirmedOfAddress/${addr}`, (req, res) => {
            // res(this._addresses[address.address])
            res(this._addressesUnconfirmedTransactions[addr])
        })

        // this.updateAddress(address.address)
    }

    check() {
        const c = this._addressTransactionCheck()
            .then(() => setTimeout(() => this.check(), 10000))
            .catch(() => setTimeout(() => this.check(), 10000))
            console.log(c)
    }

    async _addressTransactionCheck(){
        console.log("Checking for unconfirmed transactions")
        console.log(this._addresses, Object.keys(this._addresses))
        return Promise.all(Object.keys(this._addresses).map(addr => {
            console.log(`checking ${addr}`)
            return this._parentWimp.request("qoraApiCall", {
                data: {
                    type: "api",
                    url: `transactions/unconfirmedof/${addr}`
                }
            }).then(unconfirmedTransactions => {
                unconfirmedTransactions = JSON.parse(unconfirmedTransactions.data)
                console.log(unconfirmedTransactions, unconfirmedTransactions.length)
                if(unconfirmedTransactions.length === 0) {
                    return
                }
                this._unconfirmedTransactionStreams[addr].emit(unconfirmedTransactions)
                console.log(this._unconfirmedTransactionStreams[addr])
                return
            })
        }))
    }
}

export default UnconfirmedTransactionWatcher