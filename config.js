// Can't use ES6 modules, node doesn't support it yet
module.exports = {
    server: {
        client: {
            port: 3000
        },
        plugins: {
            port: 3001
        }
    },
    qoraNode: {
        explorer: {
            url: "http://127.0.0.1:9090",
            tail: "/index/blockexplorer.json"
        },
        api: {
            url: "http://127.0.0.1:9085",
            tail: "/"
        }
    },
    // 3 seconds between checking for a new block/new unconfirmed transactions
    longPollInterval: 3000
}