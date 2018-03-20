/*
options = {
    type: "explorer/api"
    node: {
        explorer: {
            url: "",
            tail: ""
        },
        api: {
            url: "",
            tail: ""
        }
    },
    url: "",
    data: {}
}

*/

import { PROXY_URL } from "./constants.js"
// REQUIRES window.App.qoraNode (main-app.js, defined in app.js)

export default function request(options){
    options.url = options.url || "";
    
    options.node = window.App.qoraNode
    
    const node = options.node[options.type];
    const url = PROXY_URL + node.url + node.tail + options.url;
    
    console.log(url);

    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            // Check the request is complete:
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    let response = xhttp.responseText;
                    if (options.type == "explorer") {
                        
                        response = JSON.parse(response);
                        
                        if (response.error) { return reject(response.error) }
                        
                        response.success = true;
                    }
                    
                    resolve(response);
                
                } else {
                    console.error(xhttp.statusText);
                    reject(xhttp.statusText);
                }

            };
        }

        // If it's get then convert data into a query string...
        if (options.method == "GET") {
            let params = "?";
            // Let's not make errors if there is no data
            options.data = options.data || {};

            params += Object.keys(options.data).map(key => {
                return encodeURIComponent(key) + "=" + encodeURIComponent(options.data[key]);
            }).join('&');

            xhttp.open(options.method, url + params, true);
            xhttp.send();
        }
        // Otherwise it's post, so send it as data. Doesn't even have to be an object
        else {
            xhttp.open(options.method, url, true);
            xhttp.setRequestHeader("Accept", "application/json")
            xhttp.send(options.data);
        }
    })
}