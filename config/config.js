// Note that qoraNode.explorer.url could be set to 127.0.0.1 even if it's being served to a remote client, as api requests are proxied through this node server

const config = {
    primary: {
        domain: "192.168.178.35"
    },
    plugins: {
        domain: "192.168.178.35"
    },
    qoraNode: {
        explorer: {
            // url: "http://127.0.0.1:9090", // Qora
            url: "http://159.89.132.89:4940", // Karma
            tail: "/index/blockexplorer.json"
        },
        api: {
            // url: "http://127.0.0.1:9085", // Qora
            url: "http://159.89.132.89:4930", // Karma
            tail: "/"
        }
    },
}

module.exports = config