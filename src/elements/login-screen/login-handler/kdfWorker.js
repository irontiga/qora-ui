import utils from "../../../qora/deps/utils.js"
import { STATIC_SALT, STATIC_BCRYPT_SALT } from "../../../qora/constants.js" 
// import { HmacSha512, AES_CBC, Sha512, base64_to_bytes, bytes_to_base64 } from "asmcrypto.js"
import { Sha512, bytes_to_base64 } from "asmcrypto.js"
import bcrypt from 'bcryptjs'

// let busy = false

onmessage = async function (e) {
    console.log('Message received from main script')

    // if (busy) return postMessage({
    //     success: false,
    //     error: 'busy'
    // })

    const data = e.data,
    salt = data.salt, // No errors if none supplied
    nonce = data.nonce,
    key = data.key,
    id = data.id

    const result = await kdf(key, salt, nonce)
    console.log("sending back", result)
    postMessage({
        id,
        nonce,
        key,
        salt,
        result
    })
}

async function kdf (key, salt, nonce) {
    console.log(1)
    const combinedBytes = utils.appendBuffer(salt, utils.stringtoUTF8Array(STATIC_SALT + key + nonce))
    console.log(2)
    const sha512Hash = new Sha512().process(combinedBytes).finish().result
    console.log(3)
    const sha512HashBase64 = bytes_to_base64(sha512Hash)
    console.log(4)
    
    return bcrypt.hashSync(sha512HashBase64.substring(0, 72), STATIC_BCRYPT_SALT)
}

// console.log("STATIC_SALT BASE58", Base58.encode(STATIC_SALT))
// console.log("STATIC_SALT BASE64", bytes_to_base64(STATIC_SALT))
// console.log("STATIC_BCRYPT_SALT BASE64", STATIC_BCRYPT_SALT)
// salt = new Uint8Array(salt) // No errors if none supplied
// const nonces = Array.from(Array(KDF_THREADS).keys())
// const seedParts = nonces.map(nonce => {
//     const combinedBytes = utils.appendBuffer(salt, utils.stringtoUTF8Array(STATIC_SALT + key + nonce))
//     // const sha512Hash = new Sha512().process(utils.stringtoUTF8Array(STATIC_SALT + key + nonce)).finish().result
//     const sha512Hash = new Sha512().process(combinedBytes).finish().result
//     const sha512HashBase64 = bytes_to_base64(sha512Hash)
//     // console.log(sha512Hash, sha512HashBase64)
//     // const sha512Hash = Sha512.base64(STATIC_SALT + key + nonce) // base64, no 00xF starting bytes
//     // Truncate sha512 output to 72 characters
//     return bcrypt.hashSync(sha512HashBase64.substring(0, 72), STATIC_BCRYPT_SALT)
// })
// return new Sha512().process(utils.stringtoUTF8Array(STATIC_SALT + seedParts.reduce((a, c) => a + c))).finish().result