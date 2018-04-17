import PhraseWallet from "../../js/qora/PhraseWallet.js"
import SHA256 from "../../js/qora/deps/sha256.js" // To convert passphrase into a seed

class LoginPage extends Polymer.Element {
    static get is() {
        return "login-page";
    }

    static get properties() {
        return {
            loggedIn : {
                type : Boolean,
                value : false,
                notify: true
            },
            rememberMe: {
                type: Boolean,
                value: false
            },
            wallet: {
                type: Object,
                notify: true
            },
            overridePassphrase: {
                type: String,
                value: ""
            },
            loginType: {
                type: String,
                value: "passphrase",
                observer: "_loginTypeChange"
            },
            openSettings: {
                type: Function
            },
            encryptedSeeds: {
                value: [], // { name: "Main account", encryptedSeed: "a7667fgaf7Fadf7Afas76d5fafas567tfdas5d"}
                type: Array
            },
            encryptedSeedsExist(){
                computed: "_encryptedSeedsExist(encryptedSeeds)"
            },
            loginTypes: {
                type: Object,
                value: {
                    existingSeed: 0,
                    passphrase : 1,
                    seed: 2
                }
            }
        }
    }

    constructor() {
        super()
    }

    connectedCallback() {
        super.connectedCallback()
    }


    logOut(){
        this.seed = ""
        this.wallet = {}
        this.loggedIn = false
        this.generationSeed = ""
        this.passphrase = ""
        this.password = ""
        this.loading = false
    }

    _encryptedSeedsExist(){
        return this.encryptedSeeds > 0
    }

    _equals(a, b){
        return a == b
    }

    _loginTypeChange(newPage, oldPage){
        if(!this.shadowRoot.querySelector("#loginTypePages")){
            return
        }
        const pages = this.shadowRoot.querySelector("#loginTypePages").children

        // Run the animation on the newly selected page
        const newIndex = this.loginTypes[newPage]
        if (!pages[newIndex].className.includes('animated')) {
            pages[newIndex].className += ' animated';
        }

        if (typeof oldPage !== 'undefined') {
            const oldIndex = this.loginTypes[oldPage]
            // Stop the animation of hidden pages
            pages[oldIndex].className = pages[oldIndex].className.split(' animated').join('');
        }
    }

    _showAdvanced() {
        this.shadowRoot.querySelector("#advanced").toggle();
    }

    _loginKeyDown(e) {
        if (e.keyCode === 13) {
            this._loginClick();
        }
    }
    _loginClick() {
        switch(this.loginType){
            case "passphrase":
                const passphrase = this.passphrase
                if (
                    passphrase == undefined ||
                    passphrase.length == 0 
                ) { return }

                const seed = SHA256.digest(SHA256.digest(this.passphrase))

                case "seed":
                if(!seed){
                    const seed = this.generationSeed
                    }
                this.login(seed)

                break;
            case "existingSeed":

                break;
        }

        // Passphrase
        if (this.loginType === "passphrase") {

            //this.loginpage.login(this.passphrase, this.pin, this.loginType, this.shadowRoot.querySelector('#passphrase'));

            const seed = SHA256.digest(SHA256.digest(this.passphrase))
            this.login(seed)
        }

        // Generation seed...
        if (this.loginType === "seed") {
            // Add error handling
            //this.loginpage.login(this.generationSeed, this.pin, this.loginType, this.shadowRoot.querySelector('#generationSeed'));

            this.login(this.generationSeed);
        }

        if(this.rememberMe){

        }

    }
    _newAccountClick(e) {
        this.shadowRoot.querySelector("#newAccountDialog").open();
    }
    ready() {
        super.ready();

        setTimeout(() => {
            //this.loginType = 0;
            const tabs = this.shadowRoot.querySelector("#loginTabs");
            tabs.select(this.encryptedSeedsExist ? "existingSeed" : "passphrase");
            tabs.notifyResize();
        }, 1)
    }


    login(seed){
        this.loading = true;
        this.wallet = new PhraseWallet(seed);

        if(this.rememberMe){
            const encryptedSeed = "";

            this.encryptedSeeds.push({
                name: this.name,
                encryptedSeed: encryptedSeed
            })
        }
        this.loading = false;
    }

}

customElements.define(LoginPage.is, LoginPage);
