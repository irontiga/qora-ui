"use strict";
import TransactionBase from "./TransactionBase.js"
import { QORA_DECIMALS } from "../constants.js"

export default class PaymentTransaction extends TransactionBase {
    constructor() {
        super();
        this.type = 3
        this.tests.push(
            () => {
                if (!this._amount >= 0) {
                    return "Invalid amount " + this._amount / QORA_DECIMALS
                }
                return true
            },
            () => {
                if (!(this._recipient instanceof Uint8Array && this._recipient.length == 25)) {
                    return "Invalid recipient " + Base58.encode(this._recipient)
                }
                return true
            }
        )
    }

    set recipient(recipient) {// Always Base58 encoded. Accepts Uint8Array or Base58 string.
        this._recipient = recipient instanceof Uint8Array ? recipient : this.constructor.Base58.decode(recipient);
    }
    set amount(amount) {
        this._amount = amount * QORA_DECIMALS;
        this._amountBytes = this.constructor.utils.int64ToBytes(amount);
    }
    get params() {
        const params = super.params;
        params.push(
            this._recipient,
            this._amountBytes,
            this._feeBytes
        )
        return params;
    }
}