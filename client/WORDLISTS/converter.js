const fs = require('fs')

fs.readFile("diceware.wordlist.asc", function (err, data) {
    if (err) {
        throw err; 
    }
    data = data.toString();
    
    console.log(data.split("\n"))
    
    const result = data.split("\n").map(line => {
        return line.substring(6)
    })
    
    console.log(result)
    
    fs.writeFile("wordlist.js", "export const WORDLIST = " + JSON.stringify(result), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
});