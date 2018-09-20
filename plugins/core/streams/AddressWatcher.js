const transactionTests = []
const blockTests = []

const DEFAULT_ADDRESS_INFO = {}


transactionTests.push((tx, addr) => {
    return tx.recipient === addr || tx.sender === addr
})


blockTests.push((block, addr) => {
    return block.generator === addr
})

class AddressWatcher {
    constructor (parentWimp, addresses) {
        addresses = addresses || []
        this._parentWimp = parentWimp
        this.reset()

        addresses.forEach(addr => this.addAddress(addr))
    }

    reset () {
        this._addresses = {}
        this._addressStreams = {}
    }

    // Adds an address to watch
    addAddress (address) {
        const addr = address.address
        this._addresses[addr] = address

        this._addressStreams[addr] = this._parentWimp.createStream(`address/${addr}`, (req, res) => {
            res(this._addresses[addr])
        })

        this.updateAddress(addr)
    }

    // Moved to inside of block test
    // testTransaction (transaction) {
        
    // }

    testBlock (block) {
        const pendingUpdateAddresses = []

        // blockTests.forEach(fn => {

        // })
// transactionTests.forEach(fn => {

        block.transactions.forEach(transaction => {
            console.log(this)
            // fn(transaction, Object.keys(this._addresses))
            for (const addr of Object.keys(this._addresses)) {
                const addrChanged = transactionTests.some(fn => {
                    return fn(transaction, addr)
                })
                if (!addrChanged) return

                if (!(addr in pendingUpdateAddresses)) pendingUpdateAddresses.push(addr)
                /**
                 * In the future transactions are potentially stored from here...and address is updated excluding transactions...and also somehow manage tx pages...
                 * Probably will just make wallet etc. listen for address change and then do the api call itself. If tx. page is on, say, page 3...and there's a new transaction...
                 * it will refresh, changing the "page" to have 1 extra transaction at the top and losing 1 at the bottom (pushed to next page)
                 */
            }
        })

        pendingUpdateAddresses.forEach(addr => this.updateAddress(addr))
    }

    async updateAddress(addr) {
        console.log("UPPPDDAAATTTINGGG AADDDRRR", addr)
        const addressRequest = await this._parentWimp.request("qoraApiCall", {
            data: {
                type: "explorer",
                data: {
                    addr: addr,
                    txOnPage: 10
                }
            }
        })
        console.log("response: ",addressRequest)

        const addressInfo = addressRequest.success ? addressRequest.data : DEFAULT_ADDRESS_INFO
        addressInfo.transactions = []

        for (let i = addressInfo.start; i >= addressInfo.end; i--) {
            addressInfo.transactions.push(addressInfo[i])
            delete addressInfo[i]
        }

        if(!this._addresses[addr]) return

        this._addresses[addr] = addressInfo
        this._addressStreams[addr].emit(addressInfo)
    }
}

export default AddressWatcher
