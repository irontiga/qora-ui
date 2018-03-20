"use strict";
import { TX_TYPES, QORA_DECIMALS } from "../constants.js"
import nacl from "../deps/nacl-fast.js"
import Base58 from "../deps/Base58.js"
import utils from "../deps/utils.js"

export default class TransactionBase{
    static get utils(){
        return utils;
    }
    static get nacl(){
        return nacl;
    }
    static get Base58(){
        return Base58;
    }
    
    constructor(){
        // Defaults
        this.fee = 1;
        this.timestamp = Date.now();
    }
    
    set keyPair(keyPair){
        this._keyPair = keyPair;
    }
    set type(type){
        this._type = TX_TYPES[type];
        this._typeBytes = this.contructor.utils.int32ToBytes(this._type);
    }
    set fee(fee){
        this._fee = fee * QORA_DECIMALS;
        this._feeBytes = this.contructor.utils.int64ToBytes(this._fee * QORA_DECIMALS);
    }
    set timestamp(timestamp){
        this._timestamp = timestamp;
        this._timestampBytes = this.contructor.utils.int64ToBytes(this._timestamp);
    }
    set lastReference(lastReference){ // Always Base58 encoded. Accepts Uint8Array or Base58 string.
        // lastReference could be a string or an Uint8Array
        this._lastReference = lastReference instanceof Uint8Array ? lastReference : this.constructor.Base58.decode(lastReference);
    }
    get _params(){
        return [
            this._typeBytes,
            this._timestampBytes,
            this._lastReference,
            this._keyPair.publicKey
        ]
    }
    get signedBytes(){
        if(!this._signedBytes){
            this.sign();
        }
        return this._signedBytes;
    }
    
    validParams(){
        if(!(
            this._fee >= 1 &&
            (new Date(this._timestamp)).getTime() > 0 &&
            1 <= this._type <= 17 &&
            this._lastReference instanceof Uint8Array && this._lastReference.byteLength == 64
        )){
            return false;
        }
        // Probably pointless
        // \/ \/ \/ \/ \/ \/ //
        if (this instanceof TransactionBase) {
            return true;
        }
    }
    
    generateBase(){
        if(!this.validParams()){
            throw "Invalid parameters"
        }
        
        let result = new Uint8Array();

        this.params.forEach(item => {
            result = this.constructor.utils.appendBuffer(result, item);
        })

        this._base = result;
        return result;
    }
    
    sign(){
        // Can't sign if keypair was not specified
        if(!this._keyPair){
            throw "keyPair not defined";
        }
        if(!this._base){
            this.generateBase();
        }
        this._signature = this.constructor.nacl.sign.detached(this._base, this._keyPair.privateKey);
        
        this._signedBytes = this.constructor.utils.appendBuffer(this._base,this._signature);
        
        return this._signature;
    }
}