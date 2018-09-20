import BlockChecker from './BlockChecker.js'
import AddressWatcher from './AddressWatcher.js'
import UnconfirmedTransactionWatcher from './UnconfirmedTransactionWatcher.js'

class StreamManager {
    constructor (parentWimp) {
        this._parentWimp = parentWimp

        this._blockCheck = new BlockChecker(parentWimp)
        this._addressWatcher = new AddressWatcher(parentWimp)
        this._unconfirmedTransactionWatcher = new UnconfirmedTransactionWatcher(parentWimp)

        parentWimp.on('login', async () => {
            const addressesResponse = await parentWimp.request("getQoraAddresses")
            this.updateAddresses(addressesResponse.data)
        })
        
        this._blockCheck.addNewBlockFunction(this._addressWatcher.testBlock.bind(this._addressWatcher))

        this._blockCheck.check()
        this._unconfirmedTransactionWatcher.check()
    }

    updateAddresses(addresses) {
        this._addressWatcher.reset()
        addresses.forEach(addr => this._addressWatcher.addAddress(addr))
        this._unconfirmedTransactionWatcher.reset()
        addresses.forEach(addr => this._unconfirmedTransactionWatcher.addAddress(addr))
    }
}

export default StreamManager