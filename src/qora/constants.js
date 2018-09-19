"use strict";
const TX_TYPES = {
    1: "Genesis",
    2: "Payment",
    
    3: "Name registration",
    4: "Name update",
    5: "Sell name",
    6: "Cancel sell name",
    7: "Buy name",
    
    8: "Create poll",
    9: "Vote in poll",
    
    10: "Arbitrary",
    
    11: "Issue asset",
    12: "Transfer asset",
    13: "Create asset order",
    14: "Cancel asset order",
    15: "Multi-payment transaction",
    
    16: "Deploy AT",
    
    17: "Message",

    18: "Delegation",
    19: "Supernode",
    20: "Airdrop"
}

const QORA_DECIMALS = 100000000

const PROXY_URL = "/proxy/" // Proxy for api calls

//const ADDRESS_VERSION = 58;  // Q for Qora
const ADDRESS_VERSION = 46;  // K for Karma

// Used as a salt for all qora addresses. Salts used for storing your private keys in local storage will be randomly generated
const STATIC_SALT = new Uint8Array([54, 190, 201, 206, 65, 29, 123, 129, 147, 231, 180, 166, 171, 45, 95, 165, 78, 200, 208, 194, 44, 207, 221, 146, 45, 238, 68, 68, 69, 102, 62, 6])
const BCRYPT_ROUNDS = 10 // Remember that the total work spent on key derivation is BCRYPT_ROUNDS * KDF_THREADS
const BCRYPT_VERSION = "2a"
const STATIC_BCRYPT_SALT = `$${BCRYPT_VERSION}$${BCRYPT_ROUNDS}$IxVE941tXVUD4cW0TNVm.O`
const PBKDF2_ROUNDS = Math.pow(2,17)

const KDF_THREADS = 16 // 16 Threads seems like a good number :)

export { TX_TYPES, QORA_DECIMALS, PROXY_URL, STATIC_SALT, PBKDF2_ROUNDS, ADDRESS_VERSION, KDF_THREADS, STATIC_BCRYPT_SALT }

//const TX_TYPES =  {
//    GENESIS_TRANSACTION: 1,
//    PAYMENT_TRANSACTION: 2,
//
//    REGISTER_NAME_TRANSACTION: 3,
//    UPDATE_NAME_TRANSACTION: 4,
//    SELL_NAME_TRANSACTION: 5,
//    CANCEL_SELL_NAME_TRANSACTION: 6,
//    BUY_NAME_TRANSACTION: 7,
//
//    CREATE_POLL_TRANSACTION: 8,
//    VOTE_ON_POLL_TRANSACTION: 9,
//
//    ARBITRARY_TRANSACTION: 10,
//
//    ISSUE_ASSET_TRANSACTION: 11,
//    TRANSFER_ASSET_TRANSACTION: 12,
//    CREATE_ORDER_TRANSACTION: 13,
//    CANCEL_ORDER_TRANSACTION: 14,
//    MULTI_PAYMENT_TRANSACTION: 15,
//
//    DEPLOY_AT_TRANSACTION: 16,
//
//    MESSAGE_TRANSACTION: 17
//};