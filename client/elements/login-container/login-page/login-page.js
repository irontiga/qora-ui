import PhraseWallet from "../../../js/qora/PhraseWallet.js"
//import SHA256 from "../../../js/qora/deps/sha256.js" // To convert passphrase into a seed
//import bcrypt from "../../../crypto/bcrypt.js"
//sha256 with pbkdf2
//import { default as sha256, pbkdf2 } from "../../../crypto/sha256.js"
import utils from "../../../js/qora/deps/utils.js"
//import aesjs from "../../../crypto/aesjs.js"
import { STATIC_SALT, PBKDF2_ROUNDS } from "../../../js/qora/constants.js"
import Base58 from "../../../js/qora/deps/Base58.js"
import * as asmCrypto from "asmcrypto.js/asmcrypto.all.js"
const getRandomValues = (window.crypto || window.msCrytpo) ? crypto.getRandomValues.bind(window.crypto) : asmCrypto.getRandomValues
//window.asmCrypto = asmCrypto
console.log(Base58.decode("QToMu5HUe4qXWWtWaZevW7DzKJeEDWHQb2"))
class LoginPage extends Polymer.Element {
    static get is() {
        return "login-page";
    }

    static get properties() {
        return {
            loggedIn : {
                type : Boolean,
                notify: true,
                value: false
            },
            addressCount: {
                type: Object
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
                value: [],
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
            },
            addresses : {
                type: Array,
                value: [],
                notify: true
            },
            addressColors: {
                type: Array
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
            tabs.select(this.encryptedSeedsExist ? "existingSeed" : "passphrase");
            tabs.notifyResize();
        }, 1)
    }
    
    logOut(){
        this.seed = ""
        this.wallet = {}
        this.loggedIn = false
        this.generationSeed = ""
        this.passphrase = ""
        this.password = ""
        this.name = ""
        this.unlockSeedPassword = ""
        this.rememberMe = false
        this.errorMessage = ""
        this.loading = false
    }

    _encryptedSeedsExist(){
        return this.encryptedSeeds.length != 0
    }
    
    _deleteEncryptedSeed(e){
        console.log(e.model.item)
        console.log(e.model.index)
        this.splice("encryptedSeeds", e.model.index, 1)
    }

    _equals(a, b){
        return a == b
    }

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
    _loginClick(){
        setTimeout(() => {
            this._loginClickHandler()
        }, 1)
    }
    _loginClickHandler() {
        
        switch(this.loginType){
            case "passphrase":
                const passphrase = this.passphrase
                if (passphrase == undefined || passphrase.length == 0 ) return
                
                const passphraseSeed = asmCrypto.PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(passphrase), STATIC_SALT, PBKDF2_ROUNDS, 64);
                
                this.login(new PhraseWallet(passphraseSeed, 2))
                
                if(this.rememberMe){
                    this._remember(passphraseSeed, 2)
                }
                
                break;
            case "seed":
                const seedBytes = Base58.decode(this.generationSeed)
                this.login(new PhraseWallet(seedBytes, 1))
                
                if(this.rememberMe){
                    this._remember(seedBytes, 1)
                }
                
                break;
            case "existingSeed":
                
                const encryptedSeedBytes = Base58.decode( this.selectedEncryptedSeed.encryptedSeed )
                
                const key = asmCrypto.PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(this.unlockSeedPassword), Base58.decode(this.selectedEncryptedSeed.salt), PBKDF2_ROUNDS, 64)
                const encryptionKey = key.slice(0, 32)
                const macKey = key.slice(32, 63)
                
                const mac = asmCrypto.HMAC_SHA512.bytes(encryptedSeedBytes, macKey)
                if (Base58.encode(mac) != this.selectedEncryptedSeed.mac){
                    this.errorMessage = "Incorrect password"
                    return
                }
                
                const decryptedBytes = asmCrypto.AES_CBC.decrypt(encryptedSeedBytes, encryptionKey, true, Base58.decode(this.selectedEncryptedSeed.iv))
                console.log(this.selectedEncryptedSeed)
                this.login(new PhraseWallet(decryptedBytes), this.selectedEncryptedSeed.version)
                
                break;
        }
        
    }
    
    _remember(seed, version){
        let iv = new Uint8Array(16)
        getRandomValues(iv)
        let salt = new Uint8Array(32)
        getRandomValues(salt)

        const key = asmCrypto.PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(this.password), salt, PBKDF2_ROUNDS, 64) // 512bit key to be split in two for mac/encryption
        const encryptionKey = key.slice(0, 32)
        const macKey = key.slice(32, 63)
//        const aesCbc = new aesjs.ModeOfOperation.cbc(password, iv);
//        const encryptedSeed = aesCbc.encrypt(seed)
//        console.log(encryptedSeed)
        const encryptedSeed = asmCrypto.AES_CBC.encrypt(seed, encryptionKey, true, iv)
        const mac = asmCrypto.HMAC_SHA512.bytes(encryptedSeed, macKey)

        // Store everything base58 encoded for consistency...except for the name. That's pointless
        this.push("encryptedSeeds", {
            name: this.name,
            encryptedSeed: Base58.encode(encryptedSeed),
            salt: Base58.encode(salt),
            iv: Base58.encode(iv),
            version: version,
            mac: Base58.encode(mac)
        })
        
        

    }
    
    login(wallet){
        // Seed has already gone thorough pbkdf2 and is threrefor 32bytes OR is is a qora generation seed 32 bytes (44chars but base58)
        this.loading = true;
        
        this.wallet = wallet;
        console.log(this.wallet)
        
        for (let i = 0; i < this.addressCount.cnt; i++) {
            this.wallet.genAddress(i);
        }
        
        this.addresses = []
        this.addresses = this.wallet.addresses.map(address =>  {
            address.color = this.addressColors[address.nonce % this.addressColors.length]
            
            const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(address.color)
            const rgb = hexSplit.map(color => {
                return parseInt(color, 16)/255
            }).map(color => {
                return color <= 0.03928 ? color / 12.92 : Math.pow( ( color + 0.055 ) / 1.055, 2.4)
            })
            const luminance = 0.2126 * rgb[1] + 0.7152 * rgb[2] + 0.0722 * rgb[3]

            address.textColor = luminance > 0.179 ? "dark" : "light"


            return address;
            /*
        return {
            address: address,
            color: this.addressColors[index % this.addressColors.length],
            index: index
        }*/
        });
         
        this.loading = false
        this.loggedIn = true
        console.log(this.loggedIn)
    }

}

customElements.define(LoginPage.is, LoginPage);
