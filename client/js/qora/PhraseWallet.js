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

export default class PhraseWallet {
    constructor(type, phraseOrSeed) {
        if (type == "passphrase") {
            this.passphrase = phraseOrSeed;
        } else {
            this.generationSeed = phraseOrSeed;
        }
    }

    set passphrase(passphrase) {
        this._passphrase = passphrase;
        //this.seedFromPhrase(passphrase);

        // Convert the phrase to a seed...maybe here...maybe elsewhere
        this._byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(this._passphrase)));
        // Is this needed?
        this._base58BaseSeed = Base58.encode(this._byteSeed);

        this._addresses = [];

        this.genAddress(0);
    }

    set generationSeed(seed) {
        this._byteSeed = Base58.decode(seed);
        this._base58BaseSeed = seed;

        this._addresses = [];

        this.genAddress(0);
    }

    get address() {
        // if nonce is 0...
        return this._addresses[0];
    }

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

        addrSeed = new SHA256.digest(SHA256.digest(addrSeed));

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
            privateKey: addrKeyPair.secretKey,
            publicKey: addrKeyPair.publicKey,
            seed: addrSeed,
            nonce: nonce
        }
        return this._addresses[nonce];
    }
}