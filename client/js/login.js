let addressUpdateTimeout;

function login(passphrase, passInput){
    this.passInput = passInput;
    // Show loading...and disable the input
    // console.log(passInput)
    passInput.disabled = true;
    this.set('loginpage.loading', true);
    // Clear any error messages...don't want to be confusing anyone
    this.set('loginpage.errorMessage', "");

    
    const addresses = doBrain(passphrase, this.addressCount);
    //console.log("AADDDRRRESSSSES QORA")
    //console.log(addresses)

    //console.log(this.addressColors);

    this.addresses = addresses.map(function(address, index){
        return {
            address: address,
            color: this.addressColors[index % this.addressColors.length],
            index: index
        }
    }.bind(this));
    
    this.loginpage.loggedin = true;
    this.passphrase = passphrase;

    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
}


function logout(){
    this.addresses = [];
    clearTimeout(addressUpdateTimeout);
    this.loginpage.loggedin = false;
    this.loginpage.loading = false;
    this.loginpage.errorMessage = "";
    this.passphrase = "";
    this.passInput.disabled = false;
    this.addresse = [];

    const loginpage = this.loginpage;
    this.loginpage = {};
    this.loginpage = loginpage;
}