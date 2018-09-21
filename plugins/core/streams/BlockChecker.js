// // DW about logging in before checking blocks
// blockCheck()

const BLOCK_CHECK_INTERVAL = 3000
const BLOCK_CHECK_TIMEOUT = 3000 

class BlockChecker {
    constructor (parentWimp) {
        this._parentWimp = parentWimp
        this._eachNewBlockFunctions = []
        this._lastBlock = {
            height: -1
        }
        
        this._blockStream = parentWimp.createStream("New block", (req, res) => {
            res(this._lastBlock)
        })
    }

    check () {
        const c = this._check()
        // console.log(c)
        // CHANGE TO Promise.prototype.finally
        c.then(() => {
            setTimeout(() => this.check(), BLOCK_CHECK_INTERVAL)
        })
        c.catch(() => {
            setTimeout(() => this.check(), BLOCK_CHECK_INTERVAL)
        })
    }

    async _check () {
        console.log("checking block")
        let timeout = setTimeout(() => {
            throw new Error("Block check timed out")
        }, BLOCK_CHECK_TIMEOUT)

        const latestBlock = await this._parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: "blocks/last"
            }
        })
        clearTimeout(timeout)

        const parsedBlock = JSON.parse(latestBlock.data)
        if (parsedBlock.height > this._lastBlock.height) {
            console.log("NNEEEWWW BLLOOCCCKKK")
            this._lastBlock = parsedBlock
            this._blockStream.emit(this._lastBlock)
            this._eachNewBlockFunctions.forEach(fn => fn(this._lastBlock))
        }
        return
    }

    addNewBlockFunction (fn) {
        this._eachNewBlockFunctions.push(fn)
    }

}

export default BlockChecker