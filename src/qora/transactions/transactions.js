import PaymentTransaction from "./PaymentTransaction.js"
import MessageTransaction from "./MessageTransaction.js"

const transactions = {
    2: PaymentTransaction,
    17: MessageTransaction
}

export default transactions