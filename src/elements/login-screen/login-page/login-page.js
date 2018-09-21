import PhraseWallet from "../../../qora/PhraseWallet.js"
import utils from "../../../qora/deps/utils.js"
import { STATIC_SALT, PBKDF2_ROUNDS, KDF_THREADS } from "../../../qora/constants.js"
import Base58 from "../../../qora/deps/Base58.js"
import bcryptjs from 'bcryptjs'
import { PBKDF2_HMAC_SHA512, HMAC_SHA512, getRandomValues as asmGetRandomValues, AES_CBC, SHA512 } from "asmcrypto.js/dist_es5/entry-export_all.js"
// const getRandomValues = window.crypto ? crypto.getRandomValues.bind(window.crypto) : asmGetRandomValues - asm no longer has rand number

class LoginPage extends Polymer.Element {
    static get is() {
        return "login-page";
    }

    static get properties() {
        return {
            loggedIn : {
                type : Boolean,
                notify: true,
                observer: "loggedInObserver"
            },
            config: {
                type: Object,
                notify: true
            },
            // addressCount: {
            //     type: Object
            // },
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
                value: [],
                type: Array
            },
            encryptedSeedsExist: {
                computed: "_encryptedSeedsExist(encryptedSeeds.*)"
            },
            loginTypes: {
                type: Object,
                value: {
                    existingSeed: 0,
                    passphrase : 1,
                    seed: 2
                }
            },
            addresses : {
                type: Array,
                value: [],
                notify: true
            }
        }
    }

    constructor() {
        super()
        // const opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    }

    connectedCallback() {
        super.connectedCallback()
    }
    
    ready() {
        super.ready();

        setTimeout(() => {
            const tabs = this.shadowRoot.querySelector("#loginTabs");
            tabs.select(this.loginHandler.encryptedSeedsExist ? "existingSeed" : "passphrase");
            tabs.notifyResize();
        }, 1)

        console.log(this.loginHandler)
        setTimeout(() => console.log(this.loginHandler), 1)
    }
    
    logOut(){
        this.loggedIn = false // Triggers loggedInObserver
    }

    loggedInObserver (loggedIn) {
        console.log(loggedIn)
        if (loggedIn) {
            /**
             * LOGGED IN
             */

        } else {
            /**
             * LOGGED OUT
             */
            this.wallet = {}
            this.generationSeed = ""
            this.passphrase = ""
            this.password = ""
            this.name = ""
            this.unlockSeedPassword = ""
            this.rememberMe = false
            this.errorMessage = ""
            // this.seed = ""
            this.loading = false
        }
    }
    
    _deleteEncryptedSeed(e){
        this.splice("encryptedSeeds", e.model.index, 1)
        // this.loginHandler.deleteEncryptedSeed(e.model.index)
    }

    _equals(a, b){
        return a == b
    }
    
    // Animation fade in/out
    _loginTypeChange(newPage, oldPage){
        if(!this.shadowRoot.querySelector("#loginTypePages") || !newPage){
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
    
    // _loginClick(){
    //     setTimeout(() => this._loginClickHandler(), 1)
    // }

    //_loginClickHandler() {
    async _loginClick() {
        this.loading = true;

        let seed, walletVersion
        
        try {
            switch (this.loginType) {
                case "passphrase":
                    const passphrase = this.passphrase
                    if (passphrase == undefined || passphrase.length == 0) throw new Error('No passphrase')

                    seed = await this.loginHandler.kdf(passphrase)
                    walletVersion = 2
                    break;
                case "seed":
                    seed = Base58.decode(this.generationSeed)
                    walletVersion = 1
                    break;
                case "existingSeed":
                    seed = await this.loginHandler.decryptEncryptedSeed(this.selectedEncryptedSeed, this.unlockSeedPassword)
                    walletVersion = this.selectedEncryptedSeed.version
                    break;
            }

            const wallet = this.loginHandler.newWallet(seed, walletVersion)
            this.loginHandler.login(wallet)

            if (this.rememberMe && this.loginType !== 'existingSeed') {
                // this._remember(passphraseSeed, 2)
                const saveSeedData = await this.loginHandler.generateSaveSeedData(seed, walletVersion, this.name, this.password)
                console.log("================================================= SSSSSSSSAAAAAAAVVVVVVVVIIIIIIIINNNNNNNNGGGGGGGGGG ============================", saveSeedData)
                this.push("encryptedSeeds", saveSeedData)
                wallet.savedSeedData = savedSeedData
                wallet.hasBeenSaved = true
                this.loading = false;
                // this.loginHandler.saveSeed(seed, walletVersion, this.name, this.password)
            }
        }
        catch (e) {
            this.errorMessage = e
            this.loading = false
            throw e // Rejects promise
        }
    }
    
    // _remember(seed, version){
    //     let iv = new Uint8Array(16)
    //     getRandomValues(iv)
    //     let salt = new Uint8Array(32)
    //     getRandomValues(salt)

    //     const key = PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(this.password), salt, PBKDF2_ROUNDS, 64) // 512bit key to be split in two for mac/encryption
    //     const encryptionKey = key.slice(0, 32)
    //     const macKey = key.slice(32, 63)
        
    //     const encryptedSeed = AES_CBC.encrypt(seed, encryptionKey, false, iv)
    //     const mac = HMAC_SHA512.bytes(encryptedSeed, macKey)

    //     // Store everything base58 encoded for consistency...except for the name. That'd be pointless
    //     this.push("encryptedSeeds", {
    //         name: this.name,
    //         encryptedSeed: Base58.encode(encryptedSeed),
    //         salt: Base58.encode(salt),
    //         iv: Base58.encode(iv),
    //         version: version,
    //         mac: Base58.encode(mac),
    //         pbkdf2Rounds: PBKDF2_ROUNDS // Store it so that this number can be increased at any time
    //     })
    // }
    
    // login(wallet){
    //     // Seed has already gone thorough pbkdf2 and is threrefor 32bytes OR is is a qora generation seed 32 bytes (44chars but base58)
        
    //     this.wallet = wallet;
    //     console.log(this.wallet)
        
    //     for (let i = 0; i < this.config.addressCount; i++) {
    //         this.wallet.genAddress(i);
    //     }
        
    //     this.addresses = []
    //     this.addresses = this.wallet.addresses.map(address =>  {
    //         address.color = this.config.addressColors[address.nonce % this.config.addressColors.length]
            
    //         const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(address.color)
    //         const rgb = hexSplit.map(color => {
    //             return parseInt(color, 16)/255
    //         }).map(color => {
    //             return color <= 0.03928 ? color / 12.92 : Math.pow( ( color + 0.055 ) / 1.055, 2.4)
    //         })
    //         const luminance = 0.2126 * rgb[1] + 0.7152 * rgb[2] + 0.0722 * rgb[3]

    //         address.textColor = luminance > 0.179 ? "dark" : "light"


    //         return address;
    //         /*
    //     return {
    //         address: address,
    //         color: this.addressColors[index % this.addressColors.length],
    //         index: index
    //     }*/
    //     });
         
    //     this.loading = false
    //     this.loggedIn = true
    //     console.log(this.loggedIn)
    // }

    _encryptedSeedsExist(){
        return this.encryptedSeeds.length != 0
    }

}

customElements.define(LoginPage.is, LoginPage);


/*

proposed
    const key1 = PBKDF2_HMAC_SHA512.bytes(passphrase, salt1, Math.pow(2,17), 16)
    const key2 = PBKDF2_HMAC_SHA512.bytes(passphrase, salt2, Math.pow(2,17), 16)
    const key3 = PBKDF2_HMAC_SHA512.bytes(passphrase, salt3, Math.pow(2,17), 16)
    const key4 = PBKDF2_HMAC_SHA512.bytes(passphrase, salt4, Math.pow(2,17), 16)
    const key = new Uint8Array(64)
    key.set(key1)
    key.set(16, key2)
    key.set(32, key3)
    key.set(48, key4)

*/