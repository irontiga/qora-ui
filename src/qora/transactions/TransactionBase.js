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
        this.fee = 0;
        this.timestamp = Date.now();
        this.tests = [
            () => {
                if(!(1 <= this._type && this._type <= Object.keys(TX_TYPES).length)){
                    return "Invalid type: " + this.type
                }
                return true
            },
            () => {
                if(this._fee < 0){
                    return "Invalid fee: " + this._fee / QORA_DECIMALS;
                }
                return true
            },
            () => {
                if(!(new Date(this._timestamp)).getTime() > 0){
                    return "Invalid timestamp: " + this._timestamp
                }
                return true
            },
            () => {
                if(!(this._lastReference instanceof Uint8Array && this._lastReference.byteLength == 64)){
                    return "Invalid last reference: " + this._lastReference
                }
                return true
            },
            () => {
                if(!(this._keyPair)){
                    return "keyPair must be specified"
                }
                if(!(this._keyPair.publicKey instanceof Uint8Array && this._keyPair.publicKey.byteLength === 32)){
                    return "Invalid publicKey"
                }
                if(!(this._keyPair.privateKey instanceof Uint8Array && this._keyPair.privateKey.byteLength === 64)){
                    return "Invalid privateKey"
                }
                return true
            }
        ]
    }
    
    set keyPair(keyPair){
        this._keyPair = keyPair;
    }
    set type(type){
        this.typeText = TX_TYPES[type]
        //this._type = TX_TYPES[type];
        this._type = type;
        this._typeBytes = this.constructor.utils.int32ToBytes(this._type);
    }
    set fee(fee){
        this._fee = fee * QORA_DECIMALS;
        this._feeBytes = this.constructor.utils.int64ToBytes(this._fee);
    }
    set timestamp(timestamp){
        this._timestamp = timestamp;
        this._timestampBytes = this.constructor.utils.int64ToBytes(this._timestamp);
    }
    set lastReference(lastReference){ // Always Base58 encoded. Accepts Uint8Array or Base58 string.
        // lastReference could be a string or an Uint8Array
        this._lastReference = lastReference instanceof Uint8Array ? lastReference : this.constructor.Base58.decode(lastReference);
    }
    get params(){
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
        return this._signedBytes
    }
    
    validParams(){
        let finalResult = {
            valid: true
        }
        // const valid = 
        this.tests.some(test => {
            const result = test()
            if(result !== true){
                finalResult = {
                    valid: false,
                    message: result
                }
                return true // exists the loop
            }
        })
        return finalResult
    }
    
    generateBase(){
        const isValid = this.validParams();
        if(!isValid.valid){
            console.log("EERRORRR HEEEEERRREEE")
            console.log(isValid)
            throw new Error(isValid.message)
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
        console.log(this._keyPair)
        if(!this._base){
            this.generateBase();
        }
        this._signature = this.constructor.nacl.sign.detached(this._base, this._keyPair.privateKey);
        
        this._signedBytes = this.constructor.utils.appendBuffer(this._base, this._signature);
        
        return this._signature;
    }
}