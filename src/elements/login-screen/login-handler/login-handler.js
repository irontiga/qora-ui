import PhraseWallet from "../../../qora/PhraseWallet.js"
import utils from "../../../qora/deps/utils.js"
import { STATIC_SALT, KDF_THREADS, STATIC_BCRYPT_SALT } from "../../../qora/constants.js"
import Base58 from "../../../qora/deps/Base58.js"
import bcrypt from 'bcryptjs'
// import * as asmCrypto from "asmcrypto.js/asmcrypto.all.js"
// import { PBKDF2_HMAC_SHA512, HMAC_SHA512, getRandomValues as asmGetRandomValues, AES_CBC } from "asmcrypto.js/asmcrypto.all.js"
import { HmacSha512, AES_CBC, Sha512, base64_to_bytes, bytes_to_base64 } from "asmcrypto.js/dist_es5/entry-export_all.js"
window.Sha512 = Sha512
const getRandomValues = window.crypto ? window.crypto.getRandomValues.bind(window.crypto) : window.msCrypto.getRandomValues.bind(window.msCrypto)

// const sha512Test = new Sha512()
// sha512Test.process(utils.stringtoUTF8Array("abcsdfsdafsdfsdfsdfsddsfsdfsd"))
// sha512Test.finish()
// console.log(sha512Test)

// if (!window.crypto.getRandomValues) {alert('Browser does not support window.crypto. Please download Google Chrome in order to use this wallet')}

class LoginHandler extends Polymer.Element {
    static get is() {
        return "login-handler";
    }

    static get properties() {
        return {
            loggedIn: {
                type: Boolean,
                notify: true,
                value: false
            },
            loading: {
                notify: true
            },
            config: {
                type: Object,
                notify: true
            },
            // addressCount: {
            //     type: Object
            // },
            wallet: {
                type: Object,
                notify: true
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
                    passphrase: 1,
                    seed: 2
                }
            },
            addresses: {
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
    }

    _encryptedSeedsExist() {
        return this.encryptedSeeds.length != 0
    }

    deleteEncryptedSeed(index) {
        this.splice("encryptedSeeds", index, 1)
    }

    // WILL CHANGE TO BEING MULTI-THREADED (USING WEB WORKERS)
    async kdf (key, salt) {
        console.log("STATIC_SALT BASE58", Base58.encode(STATIC_SALT))
        console.log("STATIC_SALT BASE64", bytes_to_base64(STATIC_SALT))
        console.log("STATIC_BCRYPT_SALT BASE64", STATIC_BCRYPT_SALT)
        salt = new Uint8Array(salt) // No errors if none supplied
        const nonces = Array.from(Array(KDF_THREADS).keys())
        const seedParts = nonces.map(nonce => {
            const combinedBytes = utils.appendBuffer(salt, utils.stringtoUTF8Array(STATIC_SALT + key + nonce))
            // const sha512Hash = new Sha512().process(utils.stringtoUTF8Array(STATIC_SALT + key + nonce)).finish().result
            const sha512Hash = new Sha512().process(combinedBytes).finish().result
            const sha512HashBase64 = bytes_to_base64(sha512Hash)
            // console.log(sha512Hash, sha512HashBase64)
            // const sha512Hash = Sha512.base64(STATIC_SALT + key + nonce) // base64, no 00xF starting bytes
            // Truncate sha512 output to 72 characters
            return bcrypt.hashSync(sha512HashBase64.substring(0, 72), STATIC_BCRYPT_SALT)
        })
        return new Sha512().process(utils.stringtoUTF8Array(STATIC_SALT + seedParts.reduce((a, c) => a + c))).finish().result
    }

    async logOut () {
        this.wallet = {}
        this.loggedIn = false
        this.loading = false
    }

    async decryptEncryptedSeed (encryptedSeed, password) {
        const encryptedSeedBytes = Base58.decode(encryptedSeed.encryptedSeed)
        const salt = Base58.decode(encryptedSeed.salt)
        const iv = Base58.decode(encryptedSeed.iv)

        // const key = PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(this.unlockSeedPassword), salt, this.selectedEncryptedSeed.pbkdf2Rounds, 64)
        const key = await this.kdf(password, salt)
        const encryptionKey = key.slice(0, 32)
        const macKey = key.slice(32, 63)

        const mac = new HmacSha512(macKey).process(encryptedSeedBytes).finish().result
        // const mac = HmacSha512.bytes(encryptedSeedBytes, macKey)
        if (Base58.encode(mac) != encryptedSeed.mac) {
            throw new Error('Incorrect password')
        }

        const decryptedBytes = AES_CBC.decrypt(encryptedSeedBytes, encryptionKey, false, iv)
        return decryptedBytes
    }

    async generateSaveSeedData(seed, version, name, password) {
        let iv = new Uint8Array(16)
        getRandomValues(iv)
        let salt = new Uint8Array(32)
        getRandomValues(salt)

        // const key = PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(password), salt, PBKDF2_ROUNDS, 64) // 512bit key to be split in two for mac/encryption
        const key = await this.kdf(password, salt)
        const encryptionKey = key.slice(0, 32)
        const macKey = key.slice(32, 63)

        const encryptedSeed = AES_CBC.encrypt(seed, encryptionKey, false, iv)
        // const mac = HmacSha512.bytes(encryptedSeed, macKey)
        const mac = new HmacSha512(macKey).process(encryptedSeed).finish().result

        return {
            name: name,
            encryptedSeed: Base58.encode(encryptedSeed),
            salt: Base58.encode(salt),
            iv: Base58.encode(iv),
            version: version,
            mac: Base58.encode(mac),
            KDF_THREADS
            // pbkdf2Rounds: PBKDF2_ROUNDS // Store it so that this number can be increased at any time
        }
    }

    async saveSeed (seed, version, name, password) {
        const saveSeedData = await this.generateSaveSeedData(seed, version, name, password)
        this.push("encryptedSeeds", saveSeedData)
    }

    async login (wallet) {
        this.wallet = wallet

        for (let i = 0; i < this.config.addressCount; i++) {
            console.log("CCCONNNFFFIIGGG", this.config)
            this.wallet.genAddress(i);
        }

        this.addresses = []
        this.addresses = this.wallet.addresses.map(address => {
            address.color = this.config.addressColors[address.nonce % this.config.addressColors.length]
            
            const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(address.color)
            const rgb = hexSplit.map(color => {
                return parseInt(color, 16) / 255
            }).map(color => {
                return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
            })
            const luminance = 0.2126 * rgb[1] + 0.7152 * rgb[2] + 0.0722 * rgb[3]

            address.textColor = luminance > 0.179 ? "dark" : "light"

            return address;
        })

        this.loading = false
        this.loggedIn = true
        
        return
    }

    newWallet (seed, version) {
        return new PhraseWallet(seed, version)
    }

}

customElements.define(LoginHandler.is, LoginHandler);


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