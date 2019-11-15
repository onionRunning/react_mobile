import Common from './common'
import User from './user'
import Role from './role'
import Black from './orders/blacks'
import MyOrders from './orders/myOrders'
import OrderLists from './orders/orderLists'
import Lendigns from './lendings'
import Repayments from './repayments'
import UserDetail from './userDetail'
import CheckRepeat from './checkRepeat'

class Root {
  common: Common
  user: User
  role: Role
  myOrders: MyOrders
  blacks: Black
  orderLists: OrderLists
  lendings: Lendigns
  repayments: Repayments
  userDetail: UserDetail
  checkRepeat: CheckRepeat
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.role = new Role()
    this.blacks = new Black()
    this.myOrders = new MyOrders()
    this.orderLists = new OrderLists()
    this.lendings = new Lendigns()
    this.repayments = new Repayments()
    this.userDetail = new UserDetail()
    this.checkRepeat = new CheckRepeat()
  }
}

export default new Root()
