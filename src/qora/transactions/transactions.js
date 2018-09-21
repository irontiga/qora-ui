import PaymentTransaction from "./PaymentTransaction.js"
import MessageTransaction from "./MessageTransaction.js"
import RegisterNameTransaction from './RegisterNameTransaction.js'

const transactions = {
    2: PaymentTransaction,
    3: RegisterNameTransaction,
    17: MessageTransaction
}

export default transactions