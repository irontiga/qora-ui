messageHandler is the base class. It's extended by default by qoraMessageHandler. qoraMessageHandler adds all of the specifics, e.g. the "sendMoney" call. messageHandler has all the builtins - it handles the communication through messages and streams (soon). 

For developers:
helpers.js contains the ParentHelper class. This class is designed to create a communcation wrapper between the iframe and the main window (where passphrase and qora node information is stored).

Usage: 

parentWindow = new ParentHelper() // initialize

parentWindow.request(request, data, callback) // Send a request to the parent window
    request: The request you're trying to complete... e.g. "sendMoney", if you are trying to send money (intense right)
    data: Object - data to be sent. What you send depends on the request
    callback(response): An optional callback function. If left undefined the function will return a promise with the same response.

parentWindow.chageUrl(url) // Used for navigation