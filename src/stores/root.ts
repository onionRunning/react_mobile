import Common from './common'
import User from './user'
import Lendigns from './lendings'
import Repayments from './repayments'
import Orders from './orders'
import UserDetail from './details/userDetail'

class Root {
  common: Common
  user: User
  orders: Orders
  lendings: Lendigns
  repayments: Repayments
  userDetail: UserDetail
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.orders = new Orders()
    this.lendings = new Lendigns()
    this.repayments = new Repayments()
    this.userDetail = new UserDetail()
  }
}

export default new Root()
