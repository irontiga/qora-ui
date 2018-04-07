let addresses = []
let lastBlock = {
    height: -1
}
const newBlockFunctions = []
const addressTransactionStreams = []

parentWimp.on("login", () => {
    addresses = []
    addressTransactionStreams.splice(0, addressTransactionStreams.length)
    
    parentWimp.request("getQoraAddresses", response => {
        //addresses = response.data
        response.data.forEach(address => addressCheck(address))
        
        response.data.forEach(address => {
            const addressTransactions = []
            addressTransactionStreams[address.nonce] = parentWimp.createStream("transactions/" + address.address, (req, res) => {
                res(addressTransactions)
            })
            
            parentWimp.request("qoraApiCall", {
                data: {
                    method: "GET",
                    type: "api",
                    url: ""
                }
            })
        })
        //console.log(addresses)
    })
})


const addressInfoStream = parentWimp.createStream("Address info", (req, res) => {
    res(addresses)
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
                console.log(responseBlock)
                lastBlock = responseBlock
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

function addressCheck(address){
    parentWimp.request("qoraApiCall", {
        data: {
            type: "explorer",
            data: {
                addr: address.address,
                //txOnPage: 10
                txOnPage: 0
            }
        }
    }).then(response => {
        // Address doesn't exist yet, just return basic info
        if (!response.success) {
            address.balance = 0
            address.transactions = []
            address.info = {}
        } else{
            address.balance = response.data.balance.total[0];
            address.info = response.data;

//            let biggestKey = 0;
//            let txKeys = 0;
//            // Find the highest number for most recent tx.
//            const keys = Object.keys(address.info);
//            keys.forEach(key => {
//                // Make sure it's a numero
//                if (!isNaN(key)) {
//                    txKeys++;
//                    key = parseInt(key)
//                    if (key > biggestKey) {
//                        biggestKey = key;
//                    }
//                }
//            })
//            let i = biggestKey;
//            address.transactions = [];
//            // Because the keys could be 30-40, rather than 0-10
//            for (; i > biggestKey - txKeys; i -= 1) {
//                //console.log(i);
//                address.transactions.push(address.info[i]);
//                delete address.info[i]
//            }
            // Don't include transactions with account. Rather do that in a seperate stream
        }
        addresses[address.nonce] = address
        addressInfoStream.emit([
            address
        ])
    })
}

//
//
//function addressCheck(address){
//    parentWimp.request("qoraApiCall", {
//        data: {
//            method: "GET",
//            type: "explorer",
//            data: {
//                addr: address.address,
//                txOnPage: 20
//            }
//        }
//    })
//}
//
//
//
//
//
//
//
//let balances = [];
//
//const balanceStream = parentWimp.createStream("balances", (req, res) => {
//    res(balances);
//});
//
//
//
//
//
//
//const addressUpdate = (addresses) => {
//    Promise.all(addresses.map(address => {
//        return parentWimp.request("qoraApiCall", {
//            data: {
//                method: "GET",
//                type: "explorer",
//                data: {
//                    addr: address.address,
//                    txOnPage: 20
//                }
//            }
//        })
//            .then(response => {
//            if (!response.success) {
//                address.balance = 0;
//                address.info = {};
//            }
//            else {
//                address.balance = response.data.balance.total[0];
//                address.info = response.data;
//
//                let biggestKey = 0;
//                let txKeys = 0;
//                // Find the highest number for most recent tx.
//                const keys = Object.keys(address.info);
//                keys.forEach(val => {
//                    // Make sure it's a numero
//                    if (!isNaN(val)) {
//                        txKeys++;
//                        val = parseInt(val)
//                        if (val > biggestKey) {
//                            biggestKey = val;
//                        }
//                    }
//                })
//                let i = biggestKey;
//                address.transactions = [];
//                for (; i > biggestKey - txKeys; i -= 1) {
//                    //console.log(i);
//                    address.transactions.push(address.info[i]);
//                    delete address.info[i]
//                }
//            }
//            return address;
//        })
//    }))
//        .then((allBalances, err) => {
//        // Sort em real nice
//        balances.sort((a, b) => {
//            return a.nonce - b.nonce
//        });
//        balances = allBalances;
//        balanceStream.emit(balances);
//    })
//        .catch(err => {
//        console.error(err);
//    })
//}

