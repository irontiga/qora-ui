import transactions from "./transactions/transactions.js"
import request from "./request.js"

const QoraAPI = (function(){
    
    const QoraAPI = {
        transactions: transactions,
        processTransaction: (bytes) => {
            return request({
                url: "/transactions/process",
                type: "POST",
                data: bytes
            })
        },
        request: {
            api: options => {
                options.type = "api"
                return request(options)
            },
            explorer: options => {
                options.type = "explorer"
                return request(options)
            },
            _request: request
        },
        createTransaction: (type, keyPair, params) => {
            const tx = new transactions[type]
            Object.keys(params).forEach(param => {
                tx[param] = params[param]
            })
            tx.keyPair = keyPair
            return tx.signedBytes
        }
    }
    
    return QoraAPI
}())

export default QoraAPI