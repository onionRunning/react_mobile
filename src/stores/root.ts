import Common from './common'
import User from './user'
import MyOrders from './orders/myOrders'
import OrderLists from './orders/orderLists'
import Lendigns from './lendings'
import Repayments from './repayments'

class Root {
  common: Common
  user: User
  myOrders: MyOrders
  orderLists: OrderLists
  lendings: Lendigns
  repayments: Repayments
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.myOrders = new MyOrders()
    this.orderLists = new OrderLists()
    this.lendings = new Lendigns()
    this.repayments = new Repayments()
  }
}

export default new Root()
