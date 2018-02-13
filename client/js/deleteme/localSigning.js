function localSigning(){
    var _hash = {
        init: SHA256_init,
        update: SHA256_write,
        getBytes: SHA256_finalize
    };

    this.simpleHash = function(message) {
        _hash.init();
        _hash.update(message);
        return _hash.getBytes();
    };

    this.byteArrayToBigInteger = function(byteArray, startIndex) {
        var value = new BigInteger("0", 10);
        var temp1, temp2;
        for (var i = byteArray.length - 1; i >= 0; i--) {
            temp1 = value.multiply(new BigInteger("256", 10));
            temp2 = temp1.add(new BigInteger(byteArray[i].toString(10), 10));
            value = temp2;
        }

        return value;
    };

    this.getPublicKey = function(secretPhrase) {

        var secretPhraseBytes = converters.stringToByteArray(secretPhrase);
        var digest = this.simpleHash(secretPhraseBytes);
        return curve25519.keygen(digest).p;
    }

    this.getAccountIdFromPublicKey = function(publicKey, RSFormat) {
        var hex = converters.hexStringToByteArray(publicKey);

        _hash.init();
        _hash.update(hex);

        var account = _hash.getBytes();

        account = converters.byteArrayToHexString(account);

        var slice = (converters.hexStringToByteArray(account)).slice(0, 8);

        var accountId = this.byteArrayToBigInteger(slice).toString();

        if (RSFormat) {
            var address = new BurstAddress();

            if (address.set(accountId)) {
                return address.toString();
            } else {
                return "";
            }
        } else {
            return accountId;
        }
    };

    this.areByteArraysEqual = function(bytes1, bytes2) {
        if (bytes1.length !== bytes2.length){
            return false;
        }

        for (var i = 0; i < bytes1.length; ++i) {
            if (bytes1[i] !== bytes2[i]){
                return false;
            }
        }

        return true;
    };

    this.verifyBytes = function(signature, message, publicKey) {
        var signatureBytes = signature;
        var messageBytes = message;
        var publicKeyBytes = publicKey;
        var v = signatureBytes.slice(0, 32);
        var h = signatureBytes.slice(32);
        var y = curve25519.verify(v, h, publicKeyBytes);

        var m = this.simpleHash(messageBytes);

        _hash.init();
        _hash.update(m);
        _hash.update(y);
        var h2 = _hash.getBytes();

        return this.areByteArraysEqual(h, h2);
    };

    this.signBytes = function(message, secretPhrase) {
        var messageBytes = message;
        var secretPhraseBytes = converters.stringToByteArray(secretPhrase);

        var digest = this.simpleHash(secretPhraseBytes);
        var s = curve25519.keygen(digest).s;

        var m = this.simpleHash(messageBytes);

        _hash.init();
        _hash.update(m);
        _hash.update(s);
        var x = _hash.getBytes();

        var y = curve25519.keygen(x).p;

        _hash.init();
        _hash.update(m);
        _hash.update(y);
        var h = _hash.getBytes();

        var v = curve25519.sign(h, x, s);

        return (v.concat(h));
    };

    this.toByteArray = function(e) {
        for (var a = [0, 0, 0, 0], t = 0; t < a.length; t++) {
            var r = 255 & e;
            a[t] = r, e = (e - r) / 256
        }
        return a;
    };

    this.createToken = function(e, a) {
        var t = converters.stringToHexString(e),
            r = converters.hexStringToByteArray(t),
            n = [];
        n = r.concat(this.getPublicKey(a));
        var s = Math.round(+new Date / 1e3),
            y = s - 1407722400,
            o = this.toByteArray(y);
        n = n.concat(o);
        var c = [];
        c = this.getPublicKey(a).concat(o);
        var u = this.signBytes(n, a);
        c = c.concat(u);
        for (var i = "", J = 0; 100 > J; J += 5) {
            var p = [];
            p[0] = 255 & c[J], p[1] = 255 & c[J + 1], p[2] = 255 & c[J + 2], p[3] = 255 & c[J + 3], p[4] = 255 & c[J + 4];
            var g = this.byteArrayToBigInteger(p);
            32 > g ? i += "0000000" : 1024 > g ? i += "000000" : 32768 > g ? i += "00000" : 1048576 > g ? i += "0000" : 33554432 > g ? i += "000" : 1073741824 > g ? i += "00" : 34359738368 > g && (i += "0"), i += g.toString(32);
        }
        return i;
    };

    this.parseToken = function(e, a) {
        for (var t = converters.stringToByteArray(a), r = [], n = 0, s = 0; n < e.length; n += 8, s += 5) {
            var y = new BigInteger(e.substring(n, n + 8), 32),
                o = converters.hexStringToByteArray(y.toRadix(16));
            r[s] = o[4], r[s + 1] = o[3], r[s + 2] = o[2], r[s + 3] = o[1], r[s + 4] = o[0];
        }
        160 != n && new Error("tokenString parsed to invalid size");
        var c = [];
        c = r.slice(0, 32);
        var u = [r[32], r[33], r[34], r[35]],
            i = toIntVal(u),
            J = r.slice(36, 100),
            p = t.concat(r.slice(0, 36)),
            g = this.verifyBytes(J, p, c),
            d = {};
        return d.isValid = g, d.timestamp = i, d.publicKey = converters.byteArrayToHexString(c), d.accountRS = this.publicKeyToAccountId(d.publicKey, !0), d;
    };
    
    this.passphrase = function() {
        var str = "";
        var random = new Uint32Array(12);
        crypto.getRandomValues(random);
        for (var a = 0; a < 12; a++) {
            if (a != 0) str += " ";
            str += words[random[a] % words.length];
        }
        return str;
    }

    this.pad = function(length, val) {
        var array = [];
        for (var i = 0; i < length; i++) {
            array[i] = val;
        }
        return array;
    }

    this.wordBytes = function(word) {
        return [(word % 256), Math.floor(word / 256)];
    }

    this.transaction = function(type, subtype, recip, amt, passphrase, message) {
        // what to do... ok so lets generate the tx bytes

        var bytes = [];
        bytes.push(type);
        bytes.push((1 << 4) + subtype);
        var timestamp = Math.floor(Date.now() / 1000) - 1407722400;
        bytes = bytes.concat(converters.int32ToBytes(timestamp));
        bytes.push(160);
        bytes.push(5); // deadline
        bytes = bytes.concat(this.getPublicKey(passphrase));

        var rec = new BurstAddress();
        rec.set(recip);
        var recipient = (new BigInteger(rec.account_id())).toByteArray().reverse();
        if (recipient.length == 9) recipient = recipient.slice(0, 8);
        while (recipient.length != 8) recipient.push(0);
        bytes = bytes.concat(recipient);

        var amount = ((new BigInteger(String(parseInt(amt * 100000000))))).toByteArray().reverse();
        if (amount.length == 9) amount = amount.slice(0, 8);
        while (amount.length != 8) amount.push(0);
        bytes = bytes.concat(amount);

        var fee = (converters.int32ToBytes(100000000))
        while (fee.length != 8) fee.push(0);
        bytes = bytes.concat(fee);

        bytes = bytes.concat(this.pad(32, 0)); // ref full hash
        bytes = bytes.concat(this.pad(64, 0));

        // message things here
        if (!message) {
            bytes = bytes.concat(this.pad(16));
        } else {
            bytes.push(1);
            bytes = bytes.concat(this.pad(15));
        }
        return bytes;
    }

    this.addMessage = function(bytes, message) {
        bytes.push(1); // version
        bytes = bytes.concat(this.wordBytes(message.length));
        bytes.push(0);
        bytes.push(128);
        bytes = bytes.concat(converters.stringToByteArray(message));
        return bytes;
    }

    this.sign = function(bytes, passphrase) {
        bytes = converters.hexStringToByteArray(converters.byteArrayToHexString(bytes)); // fix signs
        var sig = this.signBytes(bytes, passphrase);

        return bytes.slice(0, 96).concat(sig).concat(bytes.slice(96 + 64));
    }
}