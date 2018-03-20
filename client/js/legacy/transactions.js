(function(){
    function generateSignaturePaymentTransaction(keyPair, lastReference, recipient, amount, fee, timestamp) => {
        const data = generatePaymentTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp);
        return nacl.sign.detached(data, keyPair.privateKey);
    }

    function generatePaymentTransaction(keyPair, lastReference, recipient, amount, fee, timestamp, signature) => {
        return Utils.appendBuffer(generatePaymentTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp),signature);
    }

    function generatePaymentTransactionBase(publicKey, lastReference, recipient, amount, fee, timestamp) => {
        const txType = TransactionTypes.PAYMENT_TRANSACTION;
        const typeBytes = Utils.int32ToBytes(txType);
        const timestampBytes = Utils.int64ToBytes(timestamp);
        const amountBytes = Utils.int64ToBytes(amount * 100000000);
        const feeBytes = Utils.int64ToBytes(fee * 100000000);

        var data = new Uint8Array();

        data = Utils.appendBuffer(data, typeBytes);
        data = Utils.appendBuffer(data, timestampBytes);
        data = Utils.appendBuffer(data, lastReference);
        data = Utils.appendBuffer(data, publicKey);
        data = Utils.appendBuffer(data, recipient);
        data = Utils.appendBuffer(data, amountBytes);
        data = Utils.appendBuffer(data, feeBytes);

        return data;
    }

    function generateSignatureMessageTransaction(keyPair, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted) => {
        const data = generateMessageTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted);
        return nacl.sign.detached(data, keyPair.privateKey);
    }

    function generateMessageTransaction(keyPair, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted, signature) => {
        return appendBuffer(generateMessageTransactionBase(keyPair.publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted),
                            signature);
    }
    function generateMessageTransactionBase(publicKey, lastReference, recipient, amount, fee, timestamp, message, isText, isEncrypted) => {
        txType = TYPES.MESSAGE_TRANSACTION;

        const typeBytes = int32ToBytes(txType);
        const timestampBytes = int64ToBytes(timestamp);
        const amountBytes = int64ToBytes(amount * 100000000);
        const feeBytes = int64ToBytes(fee * 100000000);
        const messageLength = int32ToBytes(message.length);
        const key = int64ToBytes(0);

        isTextB = new Uint8Array(1);
        isTextB[0] = isText;

        isEncryptedB = new Uint8Array(1);
        isEncryptedB[0] = isEncrypted;

        var data = new Uint8Array();

        data = appendBuffer(data, typeBytes);
        data = appendBuffer(data, timestampBytes);
        data = appendBuffer(data, lastReference);
        data = appendBuffer(data, publicKey);
        data = appendBuffer(data, recipient);
        data = appendBuffer(data, key);
        data = appendBuffer(data, amountBytes);
        data = appendBuffer(data, messageLength);
        data = appendBuffer(data, message);
        data = appendBuffer(data, isEncryptedB);
        data = appendBuffer(data, isTextB);
        data = appendBuffer(data, feeBytes);

        return data;
    }


    function generateSignatureArbitraryTransactionV3(keyPair, lastReference, service, arbitraryData, fee, timestamp) => {
        const data = generateArbitraryTransactionV3Base(keyPair.publicKey, lastReference, service, arbitraryData, fee, timestamp);
        return nacl.sign.detached(data, keyPair.privateKey);
    }

    function generateArbitraryTransactionV3(keyPair, lastReference, service, arbitraryData, fee, timestamp, signature) => {
        return appendBuffer(generateArbitraryTransactionV3Base(keyPair.publicKey, lastReference, service, arbitraryData, fee, timestamp),
                            signature);
    }

    function generateArbitraryTransactionV3Base(publicKey, lastReference, service, arbitraryData, fee, timestamp) => {
        const txType = TYPES.ARBITRARY_TRANSACTION;
        const typeBytes = int32ToBytes(txType);
        const timestampBytes = int64ToBytes(timestamp);
        const feeBytes = int64ToBytes(fee * 100000000);
        const serviceBytes = int32ToBytes(service);
        const dataSizeBytes = int32ToBytes(arbitraryData.length);
        const paymentsLengthBytes = int32ToBytes(0);  // Support payments - not yet.

        var data = new Uint8Array();

        data = appendBuffer(data, typeBytes);
        data = appendBuffer(data, timestampBytes);
        data = appendBuffer(data, lastReference);
        data = appendBuffer(data, publicKey);
        data = appendBuffer(data, paymentsLengthBytes);
        // Here it is necessary to insert the payments, if there are
        data = appendBuffer(data, serviceBytes);
        data = appendBuffer(data, dataSizeBytes);
        data = appendBuffer(data, arbitraryData);
        data = appendBuffer(data, feeBytes);

        return data;
    }


    function generateSignatureRegisterNameTransaction(keyPair, lastReference, owner, name, value, fee, timestamp) => {
        const data = generateRegisterNameTransactionBase(keyPair.publicKey, lastReference, owner, name, value, fee, timestamp);
        return nacl.sign.detached(data, keyPair.privateKey);
    }

    function generateRegisterNameTransaction(keyPair, lastReference, owner, name, value, fee, timestamp, signature) => {
        return appendBuffer( generateRegisterNameTransactionBase(keyPair.publicKey, lastReference, owner, name, value, fee, timestamp),
                            signature );
    }
    
    function generateRegisterNameTransactionBase(publicKey, lastReference, owner, name, value, fee, timestamp) => {
        const txType = TYPES.REGISTER_NAME_TRANSACTION;
        const typeBytes = int32ToBytes(txType);
        const timestampBytes = int64ToBytes(timestamp);
        const feeBytes = int64ToBytes(fee * 100000000);
        const nameSizeBytes = int32ToBytes(name.length);
        const valueSizeBytes = int32ToBytes(value.length);

        var data = new Uint8Array();

        data = appendBuffer(data, typeBytes);
        data = appendBuffer(data, timestampBytes);
        data = appendBuffer(data, lastReference);
        data = appendBuffer(data, publicKey);
        data = appendBuffer(data, owner);
        data = appendBuffer(data, nameSizeBytes);
        data = appendBuffer(data, name);
        data = appendBuffer(data, valueSizeBytes);
        data = appendBuffer(data, value);
        data = appendBuffer(data, feeBytes);

        return data;
    }
}())

