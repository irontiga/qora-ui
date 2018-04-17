import { WORDLIST } from "../../../wordlist.js"

class CreateAccountPage extends Polymer.Element {
    static get is() {
        return "create-account-page";
    }
    static get properties() {
        return {
            generatedPassphrase: {
                type: String,
                value: ""
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
        this.generatedPassphrase = this.generatePassphrase()
    }
    generatePassphrase(){
        const randNumArray = new Uint16Array(12)
        
        this.crypto.getRandomValues(randNumArray)
        
        let generatedPassphrase = "";

        randNumArray.forEach(num => {
            generatedPassphrase += " " + WORDLIST[num % WORDLIST.length]
        })

        return generatedPassphrase;
    }
    _regeneratePassphrase(){
        this.generatedPassphrase = this.generatePassphrase()
    }
    login(){
        this.$.container.style.opacity = 0;
        setTimeout(() => {
            this.$.container.style.display = "none"
        }, 500)
        console.log(this.$.container)
    }
}

customElements.define(CreateAccountPage.is, CreateAccountPage)