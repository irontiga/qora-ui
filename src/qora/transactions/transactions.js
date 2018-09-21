import PaymentTransaction from "./PaymentTransaction.js"
import MessageTransaction from "./MessageTransaction.js"
import RegisterNameTransaction from './RegisterNameTransaction.js'
import DelegationTransaction from './DelegationTransaction.js'

const transactions = {
    2: PaymentTransaction,
    3: RegisterNameTransaction,
    17: MessageTransaction,
    18: DelegationTransaction
}

export default transactions