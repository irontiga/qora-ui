// import { WORDLIST } from "../../../wordlist.js"

class CreateAccountPage extends Polymer.Element {
    static get is () {
        return "create-account-page";
    }
    static get properties () {
        return {
            generatedPassphrase: {
                type: String,
                value: ""
            },
            passphraseInputType: {
                type: String,
                value: "password"
            },
            passphraseVisibilityIcon: {
                type: String,
                value: "icons:visibility-off"
            },
            loginHandler: {
                type: Object
            }
        }
    }

    constructor () {
        super()
        this.crypto = window.crypto || window.msCrytpo
    }

    connectedCallback () {
        super.connectedCallback()
    }

    ready () {
        super.ready()
        // this.generatedPassphrase = this.generatePassphrase()
    }

    _regeneratePassphrase () {
        this.generatedPassphrase = this.generatePassphrase()
    }

    togglePassphraseVisibility () {
        this.passphraseInputType = this.passphraseInputType === "password" ? "text" : "password";
        this.passphraseVisibilityIcon = this.passphraseInputType === "password" ? "icons:visibility-off" : "icons:visibility"
    }

    _createClick (e) {
        this.login()
    }

    async login () {
        const passphrase = this.passphrase
        if (passphrase == undefined || passphrase.length == 0) throw new Error('No passphrase')

        const seed = await this.loginHandler.kdf(passphrase)
        const walletVersion = 2
        
        const wallet = this.loginHandler.newWallet(seed, walletVersion)
        this.loginHandler.login(wallet)

        if (this.rememberMe && this.loginType !== 'existingSeed') {
            // this._remember(passphraseSeed, 2)
            this.loginHandler.saveSeed(seed, walletVersion, this.name, this.password)
        }
    }
}

customElements.define(CreateAccountPage.is, CreateAccountPage)



    // login(){
    //     this.$.container.style.opacity = 0;
    //     setTimeout(() => {
    //         this.$.container.style.display = "none"
    //     }, 500)
    //     console.log(this.$.container)
    // }

        // generatePassphrase(){
    //     const randNumArray = new Uint16Array(12)

    //     this.crypto.getRandomValues(randNumArray)

    //     let generatedPassphrase = "";

    //     randNumArray.forEach(num => {
    //         generatedPassphrase += " " + WORDLIST[num % WORDLIST.length]
    //     })

    //     return generatedPassphrase;
    // }
    