import BlockChecker from './BlockChecker.js'
import AddressWatcher from './AddressWatcher.js'

class StreamManager {
    constructor (parentWimp) {
        this._parentWimp = parentWimp

        this._blockCheck = new BlockChecker(parentWimp)
        this._addressWatcher = new AddressWatcher(parentWimp)

        parentWimp.on('login', async () => {
            const addressesResponse = await parentWimp.request("getQoraAddresses")
            this.update(addressesResponse.data)
        })
        
        this._blockCheck.addNewBlockFunction(this._addressWatcher.testBlock)
    }

    update(addresses) {
        this._addressWatcher.reset()
        addresses.forEach(addr => this._addressWatcher.addAddress(addr))
    }
}

export default StreamManager