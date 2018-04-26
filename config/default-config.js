const config = {
    primary: {
        domain: "127.0.0.1",
        port: 9080, // Port to access the Qora UI from
        directory: "./src/", // Core Qora-lite code.,
        page404: "./src/404.html",
        protocol: "http"
    },
    plugins: {
        domain: "127.0.0.1",
        port: 9081, // Port for plugins to be loaded from. User will never interact with this port
        directory: "./plugins", // Where the plugin folders are stored,
        default: "wallet"
    },
    icon: "./src/img/icon.png",
    addressColors: [
        "#3f51b5",
        "#212121",
        "#009688",
        "#d32f2f",
        "#795548",
        "#004d40",
        "#006064",
        "#9c27b0",
        "#2196f3",
        "#d81b60"
    ],
    addressCount: 1,
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
    pollingInterval: 3000   // How long between checking for new unconfirmed transactions and new blocks (in milliseconds). 
                            // Might be better increased over a weaker or metered connection, or perhaps lowered when using a local node
}

module.exports = config