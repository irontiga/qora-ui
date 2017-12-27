// Copyright 2017 @ irontiga and vbcs (original developer)
// Rewrite all vbcs's code into a nice, neat class
// Dependencies:
// sha256.js
// Base58.js
// nacl-fast.js
// rpiemd160.js


// Utils...helper functions
class PhraseWalletUtils{
    constructor(){
        
    }
    
    _int32ToBytes (word) {
        var byteArray = [];
        for (var b = 0; b < 32; b += 8) {
            byteArray.push((word >>> (24 - b % 32)) & 0xFF);
        }
        return byteArray;
    }
    
    _stringtoUTF8Array(message) {
        if (typeof message == 'string') {
            var s =  unescape(encodeURIComponent(message)); // UTF-8
            message = new Uint8Array(s.length);
            for (var i = 0; i < s.length; i++) {
                message[i] = s.charCodeAt(i) & 0xff;
            }
        }
        return message;
    }
    
    _appendBuffer (buffer1, buffer2) {
        buffer1 = new Uint8Array(buffer1);
        buffer2 = new Uint8Array(buffer2);
        let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(buffer1, 0);
        tmp.set(buffer2, buffer1.byteLength);
        return tmp;
    }
    
    // Add networking here...instead of that silly qoraHelper.js

}
// The real Qora stuff
class PhraseWallet extends PhraseWalletUtils {
    // By default will create itself based on a passphrase. Can be changed to being based off a seed
    constructor(type, phraseOrSeed) {
        super();
        if(type == "passphrase"){
            this.passphrase = phraseOrSeed;
        }
        else{
            this.generationSeed = phraseOrSeed;
        }
    }
    
    set passphrase(passphrase){
        this._passphrase = passphrase;
        //this.seedFromPhrase(passphrase);
        
        // Convert the phrase to a seed...maybe here...maybe elsewhere
        this._byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(this._passphrase)));
        // Is this needed?
        this._base58BaseSeed = Base58.encode(this._byteSeed);
        
        this._addresses = [];
        
        this.genAddress(0);
    }
    
    set generationSeed(seed){
        this._byteSeed = Base58.decode(seed);;
        this._base58BaseSeed = seed;
        
        this._addresses = [];

        this.genAddress(0);
    }
    
    get address(){
        // if nonce is 0...
        return this._addresses[0];
    }
    
    getAddress(nonce){
        return this._addresses[nonce];
    }
    
    get addresses(){
        return this._addresses;
    }
    
    get addressIDs(){
        // only return IDs
        return this._addresses.map(addr => {
            return addr.address;
        })
    }
    
    addressExists(nonce){
        if(this.addresses[nonce] != undefined){
            return true;
        }
        return false;
    }
    
    // Some string, and amount of times to sha256 on it
    _repeatSHA256(passphrase, hashes){
        let hash;
        for(let i=0; i<hashes;i++){
            hash = SHA256.digest(passphrase);
        }
        return hash;
    }
    
    genAddress(nonce){
        // Check if nonce index is available in array
        if(nonce >= this._addresses.length){
            this._addresses.length = nonce+1;
        }
        // Don't regenerate the address if it's already generated
        if(this.addressExists(nonce)){
            return this.addresses[nonce];
        }
        
        const ADDRESS_VERSION = 58;  // Q for Qora
        
        const nonceBytes = this._int32ToBytes(nonce);
        
        let addrSeed = new Uint8Array();
        
        addrSeed = this._appendBuffer(addrSeed, nonceBytes);
        addrSeed = this._appendBuffer(addrSeed, this._byteSeed);
        addrSeed = this._appendBuffer(addrSeed, nonceBytes);
        
        addrSeed = new SHA256.digest(SHA256.digest(addrSeed));
        
        const addrKeyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(addrSeed));
        
        const publicKeyHash = new RIPEMD160().digest(SHA256.digest(addrKeyPair.publicKey));
        
        let address = new Uint8Array();

        address = this._appendBuffer(address, [ADDRESS_VERSION]);
        address = this._appendBuffer(address, publicKeyHash);

        const checkSum = SHA256.digest(SHA256.digest(address));

        address = this._appendBuffer(address, checkSum.subarray(0, 4));
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