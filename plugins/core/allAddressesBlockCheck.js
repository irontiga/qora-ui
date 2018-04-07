function allAddressesBlockCheck(addresses, block, parentWimp){
    const addressIDs = addresses.map(addr => addr.address)
    const addressesToCheck = [];

    if(block.generator in addressIDs){
        addressToCheck.push(block.generator);
        addressIDs.splice(indexOf(block.generator), 1)
    }
    block.transactions.some(tx => {
        if(tx.recipient in addressIDs){
            addressesToCheck.push(tx.recipient);
            addressIDs.splice(indexOf(tx.recipient), 1)
        }
        if(tx.sender in addressIDs){
            addressesToCheck.push(tx.sender);
            addressIDs.splice(indexOf(tx.sender), 1)
        }
        return addressIDs.length == 0
    })
    addressesToCheck.forEach(address => addressCheck(address, parentWimp))
}

function addressCheck(address){
    return
}

export default allAddressesBlockCheck