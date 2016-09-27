function BurstCalls(){
    this.apiCall = function(options, callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                
                var parsedResponse = JSON.parse(xhttp.responseText);

                callback(parsedResponse);
            }
        };
        xhttp.open("GET", "/api/" + JSON.stringify(options), true);
        xhttp.send();
    };
    
    this.sendMoney = function(options, passphrase, callback){
        var message = false;
        if(options.message !== ""){
            message = true;
        }
        // *** type: 0 (payment), subtype: 0(ordinary payment) *** //
        var txBytes = localSign.transaction(0, 0, options.recipient, options.amount, passphrase, message);

        if(message){
            txBytes = localSign.addMessage(txBytes, options);
        }

        var signedBytes = localSign.sign(txBytes, passphrase);
        signedBytes = converters.byteArrayToHexString(signedBytes);
        
        this.apiCall({
            requestType: "broadcastTransaction",
            transactionBytes: signedBytes
        }, callback);
    };
}