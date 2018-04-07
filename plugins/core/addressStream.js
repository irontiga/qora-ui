const addresses = []
const addressTransactions = []
const unconfirmedTransactions = []
const selectedAddress = {
    info: {
        address: "",
        color: "",
        nonce: "",
        //... Everything from the api call
    },
    transactions: [],
    lastreference: "",
    unconfirmedTransactions: []
}

let lastBlock = {
    height: -1
}
const newBlockFunctions = []
const addressTransactionStreams = []

parentWimp.on("login", () => {
    // Reset everything
    addresses.splice(0, addresses.length)
    addressTransactionStreams.splice(0, addressTransactionStreams.length)

    parentWimp.request("getQoraAddresses", response => {
        //addresses = response.data
        response.data.forEach(address => addressCheck(address, true))
        
        response.data.forEach(address => {
            addressTransactionStreams[address.nonce] = parentWimp.createStream("transactions/" + address.nonce, (req, res) => {
                res(addressTransactions[address.nonce])
            })
        })
        //console.log(addresses)
    })
})

parentWimp.listen("Selected address", address => {
    console.log(address)
    //selectedAddress.address = address
})

const newBlockStream = parentWimp.createStream("New block", (req, res) => {
    res(lastBlock)
})

parentWimp.on("Address lastreference", (req, res) => {
    // Returns the selected address's last reference
})

// Streams the currently selected address's info
const addressInfoStream = parentWimp.createStream("Address info", (req, res) => {
    res(addresses)
})

const addressTransactionStream = parentWimp.createStream("Address transactions", (req, res) => {
    
})



// DW about logging in before checking blocks
blockCheck()

function blockCheck(){
    return parentWimp.request("qoraApiCall", {
        data: {
            type: "api",
            url: "blocks/last"
        }
    }).then(response => {
        // If the JSON doesn't parse due to an error we don't want to stop polling
        try{
            const responseBlock = JSON.parse(response.data)
            if(responseBlock.height > lastBlock.height){
                lastBlock = responseBlock;
                newBlockStream.emit(lastBlock);
                newBlockFunctions.forEach(fn => fn(lastBlock))
            }
        }
        catch(e){
            console.error(e)
        }
        // Check for a new block every three seconds
        setTimeout(blockCheck, 3000)
    })
}

newBlockFunctions.push((block) => {
    // Copy addresses into an object
    const addressIDs = {}

    addresses.forEach(addr => {
        addressIDs[addr.address] = addr
    })
    
    if(block.assetTrades){
        // Fetch all trades in this block
        parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: "blocks/trades",
                data: {
                    addresses: Object.keys(addressIDs)
                }
            }
        })
    }

    const addressesToCheck = [];

    if(block.generator in addressIDs){
        addressToCheck.push(addressIDs[block.generator])
        delete addressIDs[block.generator]
    }
    block.transactions.some(tx => {
        if(tx.recipient in addressIDs){
            addressesToCheck.push(addressIDs[tx.recipient])
            delete addressIDs[tx.recipient]
        }
        if(tx.sender in addressIDs){
            addressesToCheck.push(addressIDs[tx.sender])
            delete addressIDs[tx.sender]
        }
        // Ends the loop if all the addresses are going to be checked
        return Object.keys(addressIDs).length == 0
    })
    addressesToCheck.forEach(address => addressCheck(address))
})

function addressCheck(address, firstCheck){
    
    parentWimp.request("qoraApiCall", {
        data: {
            type: "explorer",
            data: {
                addr: address.address,
                txOnPage: firstCheck ? 10 : 0
            }
        }
    }).then(response => {
        // Address doesn't exist yet, just return basic info
        if (!response.success) {
            address.balance = 0
            addressTransactions[address.nonce] = []
            address.info = {}
        } else{
            address.balance = response.data.balance.total[0];
            address.info = response.data;
        }
        
        if(firstCheck) {
            let biggestKey = 0;
            let txKeys = 0;
            // Find the highest number for most recent tx.
            const keys = Object.keys(address.info);
            keys.forEach(key => {
                // Make sure it's a numero
                if (!isNaN(key)) {
                    txKeys++;
                    key = parseInt(key)
                    if (key > biggestKey) {
                        biggestKey = key;
                    }
                }
            })
            let i = biggestKey;
            addressTransactions[address.nonce] = addressTransactions[address.nonce] || []
            addressTransactions[address.nonce].transactions = [];
            // Because the keys could be 30-40, rather than 0-10
            for (; i > biggestKey - txKeys; i -= 1) {
                //console.log(i);
                addressTransactions[address.nonce].transactions.push(address.info[i]);
                delete address.info[i]
            }
        }
        
        addresses[address.nonce] = address
        addressInfoStream.emit([
            address
        ])
    })
}