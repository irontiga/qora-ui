//let addressUpdateTimeout;

// this is bound to Polymer in app.js
import PhraseWallet from "./qora/PhraseWallet.js";

export { login, logout }

function login(phraseOrSeed, pin, loginType, passInput) {
    this.passInput = passInput;
    // Show loading...and disable the input
    // console.log(passInput)
    passInput.disabled = true;
    this.set('loginpage.loading', true);
    // Clear any error messages...don't want to be confusing anyone
    this.set('loginpage.errorMessage', "");

    //console.log(loginType);

    this.loginType = loginType;
    
    switch(loginType){
        case 0: 
            this.wallet = new PhraseWallet("passphrase", phraseOrSeed + pin);
            this.passphrase = phraseOrSeed;
            break;
        case 1:
            this.wallet = new PhraseWallet("seed", phraseOrSeed);
            this.generationSeed = phraseOrSeed;
            break;
        default: 
            this.set('loginpage.errorMessage', "Not implemented");
            return;
    }

    // And for now...we'll generate the first n addresses
    for (let i = 0; i < this.addressCount.cnt; i++) {
        this.wallet.genAddress(i);
    }


    //const addresses = doBrain(passphrase, this.addressCount);

    //console.log("AADDDRRRESSSSES QORA")
    // Let's definitely not do that...
    //console.log(this.wallet.addresses)

    //console.log(this.addressColors);

    this.addresses = this.wallet.addresses.map(function (address) {
        address.color = this.addressColors[address.nonce % this.addressColors.length];
        return address;
        /*
        return {
            address: address,
            color: this.addressColors[index % this.addressColors.length],
            index: index
        }*/
    }.bind(this));

    this.loginpage.loggedin = true;

    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
    
    Object.keys(this.wimps).forEach(thisWimp => {
        this.wimps[thisWimp].request("login", {expectResponse: false});
    })
}


function logout() {
    this.addresses = [];
    this.loginpage.loggedin = false;
    this.loginpage.loading = false;
    this.loginpage.errorMessage = "";
    this.passphrase = "";
    this.generationSeed = "";
    this.pin = "";
    this.passInput.disabled = false;
    this.addresse = [];

    // MAKE THIS WORK
    this.passInput.$.input.focus();

    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
}