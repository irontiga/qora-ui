// import { WORDLIST } from "../../../wordlist.js"

class CreateAccountPage extends Polymer.Element {
    static get is() {
        return "create-account-page";
    }
    static get properties() {
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
            }
        }
    }
    constructor() {
        super()
        this.crypto = window.crypto || window.msCrytpo
    }
    connectedCallback() {
        super.connectedCallback()
    }
    ready() {
        super.ready()
        // this.generatedPassphrase = this.generatePassphrase()
    }

    _regeneratePassphrase(){
        this.generatedPassphrase = this.generatePassphrase()
    }
    togglePassphraseVisibility() {
        this.passphraseInputType = this.passphraseInputType === "password" ? "text" : "password";
        this.passphraseVisibilityIcon = this.passphraseInputType === "password" ? "icons:visibility-off" : "icons:visibility"
    }


    create(){
        const passphrase = this.passphrase
        if (passphrase == undefined || passphrase.length == 0) {
            this.loading = false
            return
        }

        // Let's change to Sha512(Bcrypt(Sha512(Passphrase + nonce)) * 8)
        // const passphraseSeed = PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(passphrase), STATIC_SALT, PBKDF2_ROUNDS, 64);
        const nonces = Array.from(Array(KDF_THREADS).keys())
        seedPieces = nonces.map(nonce => {
            return SHA512(nonce + passphrase + nonce)
        })
        console.log(passphraseSeed)
        this.login(new PhraseWallet(passphraseSeed, 2))

        if (this.rememberMe) {
            this._remember(passphraseSeed, 2)
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
    