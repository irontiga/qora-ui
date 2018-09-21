import Sha256 from '../../src/qora/deps/sha256.js'

class AirdropApp extends Polymer.Element {
    static get is() {
        return "airdrop-app";
    }
    static get properties() {
        return {
            message: {
                type: String,
                value: ""
            },
            showProgress: {
                type: Boolean,
                value: false
            },
            errorMessage: {
                type: String,
                value: ""
            },
            hasClaimedAirdrop: {
                value: false,
                type: Boolean
            }
        }
    }
    static get observers() {
        return [

        ]
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        this.coreWimp = new Wimp("core", window.parent);

        this.parentWimp = new Wimp(window.parent);

        this.parentWimp.ready().then(() => {
            // console.log("==========READYYY")
            this.parentWimp.listen("Selected address", selectedAddress => {
                // console.log(address)
                // this.address = address
                this.selectedAddress = {}
                this.selectedAddress = selectedAddress
                const addr = selectedAddress.address

                this.coreWimp.ready(() => { })

            })
        })

        this.coreWimp.ready().then(() => this.coreWimp.listen("New block", block => {
            // console.log("---- BLOCK ----" ,block)
            this.lastBlock = block;
        }))

        Wimp.init();
    }

    _openClaimDialog() {
        this.$.claimDialog.open()
    }

    _checkCode(code) {
        const hoursFromEpoch = Math.floor((Date.now() - 1535760000000) / 1000 / 60 / 60)

        const hash = new Sha256.digest("" + hoursFromEpoch)
        // const hash = new Sha256.digest("" + 363)
        let lastNumbers = hash[0] + ""
        while(lastNumbers.length < 3) lastNumbers = "0" + lastNumbers
        
        let total = 0;
        lastNumbers.split("").forEach(char => {
            total = total + parseInt(char)
        })
        const firstNumber = (10 - (total % 10)) % 10
        const finalNumber = firstNumber + "" + lastNumbers
        console.log(finalNumber)
        return code === finalNumber
    }

    _claim(e) {
        const _this = this
        this.showProgress = true
        if (this.hasClaimedAirdrop) {
            this.showProgress = false;
            this.errorMessage = "Sorry, you have already claimed the airdrop."
        }

        console.log(this.code)
        if (!this._checkCode(this.code)) {
            this.showProgress = false;
            this.errorMessage = "Incorrect code"
            console.log(this.errorMessage)
            return
        }
        
        this.message = "Requesting airdrop info..."

        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                // Typical action to be performed when the document is ready:
                // document.getElementById("demo").innerHTML = xhttp.responseText
                console.log("RESPONSESESESSESESS", xhttp)
                if (!(this.status == 200)){
                    _this.showProgress = false
                    _this.errorMessage = xhttp.statusText
                    return
                }
                _this.message = "Checking response"
                if (xhttp.responseText === "NO") {
                    _this.errorMessage = "You have already claimed the airdrop"
                    _this.showProgress = false
                    return
                }
                _this.message = "Parsing response..."
                try {
                    const response = JSON.parse(xhttp.responseText)
                    _this.showProgress = false;
                    _this.successMessage = `Success! ${xhttp.responseText}`
                    _this.$.claimDialog.refit()
                }
                catch (e) {
                    _this.showProgress = false
                    _this.errorMessage = e
                }
                _this.errorMessage = ""
            }
        };
        xhttp.open("GET", `http://159.89.132.89:4999/airdrop/${this.selectedAddress.address}`, true);
        xhttp.send();
    }
}

window.customElements.define(AirdropApp.is, AirdropApp)