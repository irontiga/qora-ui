// // DW about logging in before checking blocks
// blockCheck()

const BLOCK_CHECK_INTERVAL = 3000
const BLOCK_CHECK_TIMEOUT = 3000 

class BlockChecker {
    constructor (parentWimp) {
        this._eachNewBlockFunctions = []
        this._lastBlock = {
            height: -1
        }
        
        this.blockStream = parentWimp.createStream("New block", (req, res) => {
            res(this._lastBlock)
        })
    }

    check () {
        this._check()
            .finally(() => {
                setTimeout(() => {
                    this.check()
                }, BLOCK_CHECK_INTERVAL)
        })
    }

    async _check () {
        let timeout = setTimeout(() => {
            throw new Error("Block check timed out")
        }, BLOCK_CHECK_TIMEOUT)

        const latestBlock = await parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: "blocks/last"
            }
        })
        clearTimeout(timeout)

        const parsedBlock = JSON.parse(latestBlock.data)
        if (parsedBlock.height > this._lastBlock.height) {
            this._lastBlock = parsedBlock
            this._blockStream.emit(lastBlock)
            this._eachNewBlockFunctions.forEach(fn => fn(lastBlock))
        }
        return
    }

    addNewBlockFunction (fn) {
        this._eachNewBlockFunctions.push(fn)
    }

}

export default BlockChecker