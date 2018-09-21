import { ERROR_CODES } from "../../../src/qora/constants.js"
import { resolve } from "path";

class SendMoneyPage extends Polymer.Element {
    static get is() {
        return "send-money-page";
    }
    static get properties() {
        return {
            addresses: {
                type: Array,
                value: []
            },
            // fee: {
            //     type: Number,
            //     value: 1
            // },
            amount: {
                type: Number
            },
            errorMessage: {
                type: String,
                value: ""
            },
            sendMoneyLoading: {
                type: Boolean,
                value: false
            },
            data: {
                type: Object,
                value: {}
            },
            addressesInfo: {
                type: Object,
                value: {}
            },
            selectedAddress: {
                type: Object,
                value: {}
            },
            selectedAddressInfo: {
                type: Object,
                value: {},
                computed: "_getSelectedAddressInfo(addressesInfo, selectedAddress)"
            },
            addressesUnconfirmedTransactions: {
                type: Object,
                value: {}
            },
            addressInfoStreams: {
                type: Object,
                value: {}
            },
            unconfirmedTransactionStreams: {
                type: Object,
                value: {}
            },
            maxWidth: {
                type: String,
                value: "600"
            }
        }
    }

    static get observers() {
        return [
            // "_setSelectedAddressInfo(selectedAddress.*, addressesInfo)"
            "_usdKeyUp(usdAmount)",
            "_kmxKeyUp(amount)"
        ]
    }

    constructor() {
        super();
    }

    _floor(num) {
        return Math.floor(num);
    }

    _checkAmount() {
        this.validAmount = this.amount <= this.selectedAddress.balance
        // if (this.amount > this.selectedAddress.balance - this.fee || this.amount <= 0) {
        //     this.validAmount = true;
        // }
        // else {
        //     this.validAmount = false;
        // }
    }

    textColor(color) {
        return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
    }

    async _sendMoney(e) {
        const amount = this.amount * Math.pow(10, 8);
        let recipient = this.recipient;
        // var fee = this.fee

        // Check for valid...^

        this.sendMoneyLoading = true;

        console.log(this.selectedAddress)

        let lastRef = await this.parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: `addresses/lastreference/${this.selectedAddress.address}/unconfirmed`
            }
        })
        lastRef = lastRef.data

        let recipientAsNameInfo = await this.parentWimp.request("qoraApiCall", {
            data: {
                type: "api",
                url: `names/${recipient}`
            }
        }).catch(err => {
            return JSON.stringify({
                
            })
        })
        console.log(recipientAsNameInfo)

        if(recipientAsNameInfo.success){
            recipientAsNameInfo = JSON.parse(recipientAsNameInfo.data)
            recipient = recipientAsNameInfo.value
        }

        this.parentWimp.request("createTransaction", {
            data: {
                type: 2,
                nonce: this.selectedAddress.nonce,
                params: {
                    recipient,
                    amount,
                    lastReference: lastRef
                    // ,
                    // fee
                }
            }
        }).then(response => {
            const responseData = JSON.parse(response.data)
            console.log("Yay: ", response)
            if(!responseData.reference) {
                throw(`Error! ${ERROR_CODES[responseData]}. Error code ${responseData}`)
            }
            this.successMessage = response.data
        }).catch(err => {
            console.log(err)
            this.errorMessage = err
        })
    }
    _usdKeyUp(){
        this.amount = this.usdAmount / this.BTCUSD
    }
    _kmxKeyUp(){
        this.usdAmount = this.amount * this.BTCUSD
    }


    updateBTCPrice(){
        this._getBTCPrice().then(data => {
            console.log(data)
            this.BTCUSD = data.USD.last
        }, err=> {})
    }

    _getBTCPrice(){
        return new Promise((resolve,reject)=> {
            var xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    // Typical action to be performed when the document is ready:
                    // document.getElementById("demo").innerHTML = xhttp.responseText
                    console.log("RESPONSESESESSESESS", xhttp)
                    if (!(this.status == 200)) {
                        reject()
                    }
                    resolve(JSON.parse(xhttp.responseText))
                }
            };
            xhttp.open("GET", "https://blockchain.info/ticker", true);
            xhttp.send();
        })
    }

    _getSelectedAddressInfo(addressesInfo, selectedAddress) {
        return this.addressesInfo[selectedAddress.address]
    }

    kmxToUSD (kmx, price) {
        return kmx * price
    }

    ready() {
        super.ready();

        this.coreWimp = new Wimp("core", window.parent)

        this.parentWimp = new Wimp(window.parent)

        this.parentWimp.ready(() => {
            this.parentWimp.listen("Selected address", selectedAddress => {
                console.log(selectedAddress)
                this.selectedAddress = {}
                this.selectedAddress = selectedAddress
                const addr = selectedAddress.address

                this.coreWimp.ready(() => {
                    if (!this.addressInfoStreams[addr]) {
                        this.addressInfoStreams[addr] = this.coreWimp.listen(`address/${addr}`, addrInfo => {
                            console.log("Send money page received", addrInfo)
                            this.set(`addressesInfo.${addr}`, addrInfo)
                            // Ahh....actually if no balance....no last reference and so you can't send money
                            addrInfo.balance = addrInfo.balance || {
                                total: {
                                    0: 0,
                                    1: 0
                                }
                            }
                            const addressesInfoStore = this.addressesInfo
                            this.addressesInfo = {}
                            this.addressesInfo = addressesInfoStore
                        })
                    }
                       if (!this.unconfirmedTransactionStreams[addr]){
                           this.unconfirmedTransactionStreams[addr] = this.coreWimp.listen(`unconfirmedOfAddress/${addr}`, unconfirmedTransactions => {
                               this.addressesUnconfirmedTransactions[addr] = unconfirmedTransactions
                           })
                       }

                })
            })
        })

        this.updateBTCPrice()

        setInterval(()=> this.updateBTCPrice(), 10000)

        Wimp.init();
    }
}

window.customElements.define(SendMoneyPage.is, SendMoneyPage);