import Common from './common'
import User from './user'
import Lendigns from './lendings'
import Repayments from './repayments'

class Root {
  common: Common
  user: User
  lendings: Lendigns
  repayments: Repayments
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.lendings = new Lendigns()
    this.repayments = new Repayments()
  }
}

export default new Root()
