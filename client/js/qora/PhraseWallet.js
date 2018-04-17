/*
Copyright 2017 @ irontiga and vbcs (original developer)
Rewrite all vbcs's code into a nice, neat class
*/
"use strict";
import Base58 from "./deps/Base58.js"
import RIPEMD160 from "./deps/ripemd160.js"
import SHA256 from "./deps/sha256.js"
import nacl from "./deps/nacl-fast.js"
import utils from "./deps/utils.js"
import { STATIC_SALT, PBKDF2_ROUNDS } from "./constants.js"
import { pbkdf2 } from "../../crypto/sha256.js"

export default class PhraseWallet {
    constructor(seed, walletVersion) {
        // walletVersion 1 = Original Java wallet version with double sha etc.
        // walletVersion 2 = "new" Qora ui seed generation
        this._walletVersion = walletVersion || 2;
        this.seed = seed; 
    }
    /*
    seed is a byte array
    */
    set seed(seed){
        this._byteSeed = seed
        this._base58Seed = Base58.encode(seed)
        
        this._addresses = [];

        this.genAddress(0);
    }

//    set passphrase(passphrase) {
//        this._passphrase = passphrase;
//        //this.seedFromPhrase(passphrase);
//
//        // Convert the phrase to a seed...maybe here...maybe elsewhere
//        this._byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(this._passphrase)));
//        // Is this needed?
//        this._base58BaseSeed = Base58.encode(this._byteSeed);
//
//        this._addresses = [];
//
//        this.genAddress(0);
//    }
//
//    set generationSeed(seed) {
//        this._byteSeed = Base58.decode(seed);
//        this._base58BaseSeed = seed;
//
//        this._addresses = [];
//
//        this.genAddress(0);
//    }

    getAddress(nonce) {
        return this._addresses[nonce];
    }

    get addresses() {
        return this._addresses;
    }

    get addressIDs() {
        // only return IDs
        return this._addresses.map(addr => {
            return addr.address;
        })
    }
    
    get seed(){
        return this._byteSeed;
    }

    addressExists(nonce) {
        return this._addresses[nonce] != undefined;
    }

    // Some string, and amount of times to sha256 it
    _repeatSHA256(passphrase, hashes) {
        let hash;
        for (let i = 0; i < hashes; i++) {
            hash = SHA256.digest(passphrase);
        }
        return hash;
    }

    genAddress(nonce) {
        // Check if nonce index is available in array
        if (nonce >= this._addresses.length) {
            this._addresses.length = nonce + 1;
        }
        // Don't regenerate the address if it's already generated
        if (this.addressExists(nonce)) {
            return this.addresses[nonce];
        }

        const ADDRESS_VERSION = 58;  // Q for Qora

        const nonceBytes = utils.int32ToBytes(nonce);

        let addrSeed = new Uint8Array();

        addrSeed = utils.appendBuffer(addrSeed, nonceBytes);
        addrSeed = utils.appendBuffer(addrSeed, this._byteSeed);
        addrSeed = utils.appendBuffer(addrSeed, nonceBytes);
        
        // Questionable advantage to sha256d...sha256(sha256(x) + x) does not increase collisions the way sha256d does. Really nitpicky though. Not that this seed is computed from the original seed (which went through (pbkdf2) so does it's generation does not need to be computationally expenise
        if(this._walletVersion == 1){
            addrSeed = new SHA256.digest(SHA256.digest(addrSeed))
        } else {
            addrSeed = new SHA256.digest(utils.appendBuffer(SHA256.digest(addrSeed), addrSeed))
        }
        

        const addrKeyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(addrSeed));

        const publicKeyHash = new RIPEMD160().digest(SHA256.digest(addrKeyPair.publicKey));
        
        let address = new Uint8Array();

        address = utils.appendBuffer(address, [ADDRESS_VERSION]);
        address = utils.appendBuffer(address, publicKeyHash);

        const checkSum = SHA256.digest(SHA256.digest(address));

        address = utils.appendBuffer(address, checkSum.subarray(0, 4));
        // Turn it into a string
        address = Base58.encode(address);

        this._addresses[nonce] = {
            address: address,
            keyPair: {
                publicKey: addrKeyPair.publicKey,
                privateKey: addrKeyPair.secretKey
            },
            seed: addrSeed,
            nonce: nonce
        }
        return this._addresses[nonce];
    }
}