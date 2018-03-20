"use strict";
import TransactionBase from "./TransactionBase.js"
import QORA_DECIMALS from "../constants.js"

export default class MessageTransaction extends TransactionBase{
    constructor(){
        super();
        this.type = "MESSAGE_TRANSACTION";
        this._key = this.constructor.utils.int64ToBytes(0);
        this._encrypted = new Uint8Array(1); // Defaults to false
        this._text = new Uint8Array(1); // Defaults to false
    }

    set recipient(recipient){
        this._recipient = recipient instanceof Uint8Array ? recipient : this.constructor.Base58.decode(recipient);
    }
    set amount(amount){
        this._amount = amount * QORA_DECIMALS;
        this._amountBytes = this.constructor.utils.int64ToBytes(amount);
    }
    set message(message /* UTF8 String */){
        // ...yes? no?
        this.messageText = message;
        
        // Not sure about encoding here...
        //this._message = message instanceof Uint8Array ? message : this.constructor.Base58.decode(message);
        this._message = this.constructor.utils.stringtoUTF8Array(message);
        this._messageLength = this.constructor.utils.int64ToBytes(this._message.length);
    }
    set isEncrypted(isEncrypted){
        this._isEncrypted[0] = isEncrypted;
    }
    set isText(isText){
        this._isText[0] = isText;
    }
    get _params(){
        const params = super.params;
        params.push(
            this._recipient,
            this._key,
            this._amountBytes,
            this._messageLength,
            this._message,
            this._isEncrypted,
            this._isText,
            this._feeBytes
        )
        return params;
    }
    validParams(){
        // Checks fee, timestamp, lastReferene, and type
        super.validParams();
        if(!(
            this._amount >= 0 &&
            this._recipient instanceof Uint8Array && this._recipient.length == 25
        )){
            return false;
        }
        return true;
    }
}

//"use strict";
//function generateSignatureMessageTransaction(keyPair, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted) => {
//    const data = generateMessageTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted);
//    return nacl.sign.detached(data, keyPair.privateKey);
//}
//
//function generateMessageTransaction(keyPair, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted, signature) => {
//    return appendBuffer(generateMessageTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted),
//                        signature);
//}
//function generateMessageTransactionBase(publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted) => {
//    txType = TYPES.MESSAGE_TRANSACTION;
//
//    const typeBytes = int32ToBytes(txType);
//    const timestampBytes = int64ToBytes(timestamp);
//    const amountBytes = int64ToBytes(amount * 100000000);
//    const feeBytes = int64ToBytes(fee * 100000000);
//    const messageLength = int32ToBytes(message.length);
//    const key = int64ToBytes(0);
//
//    isTextB = new Uint8Array(1);
//    isTextB[0] = isText;
//
//    isEncryptedB = new Uint8Array(1);
//    isEncryptedB[0] = isEncrypted;
//
//    let data = new Uint8Array();
//
//    data = appendBuffer(data, typeBytes);
//    data = appendBuffer(data, timestampBytes);
//    data = appendBuffer(data, lastReference);
//    data = appendBuffer(data, publicKey);
//    data = appendBuffer(data, recipient);
//    data = appendBuffer(data, key);
//    data = appendBuffer(data, amountBytes);
//    data = appendBuffer(data, messageLength);
//    data = appendBuffer(data, message);
//    data = appendBuffer(data, isEncryptedB);
//    data = appendBuffer(data, isTextB);
//    data = appendBuffer(data, feeBytes);
//
//    return data;
//}