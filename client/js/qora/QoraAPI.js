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
        }
    }
    
    return QoraAPI;
}())

export default QoraAPI