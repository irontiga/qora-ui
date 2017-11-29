let addressUpdateTimeout;

function login(passphrase, pin, passInput){
    this.passInput = passInput;
    // Show loading...and disable the input
    // console.log(passInput)
    passInput.disabled = true;
    this.set('loginpage.loading', true);
    // Clear any error messages...don't want to be confusing anyone
    this.set('loginpage.errorMessage', "");
    
    this.wallet = new PhraseWallet(passphrase + pin);
    
    // And for now...we'll generate the first n addresses
    for(let i=0;i<this.addressCount;i++){
        this.wallet.genAddress(i);
    }
    
    
    //const addresses = doBrain(passphrase, this.addressCount);
    
    //console.log("AADDDRRRESSSSES QORA")
    console.log(this.wallet.addresses)

    //console.log(this.addressColors);

    this.addresses = this.wallet.addresses.map(function(address){
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
    this.passphrase = passphrase;

    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
}


function logout(){
    this.addresses = [];
    this.loginpage.loggedin = false;
    this.loginpage.loading = false;
    this.loginpage.errorMessage = "";
    this.passphrase = "";
    this.pin = "";
    this.passInput.disabled = false;
    this.addresse = [];
    
    // MAKE THIS WORK
    this.passInput.$.input.focus();
    
    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
}