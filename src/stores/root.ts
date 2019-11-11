import Common from './common'
import User from './user'
import MyOrders from './orders/myOrders'
import OrderLists from './orders/orderLists'
class Root {
  common: Common
  user: User
  myOrders: MyOrders
  orderLists: OrderLists
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.myOrders = new MyOrders()
    this.orderLists = new OrderLists()
  }
}

export default new Root()
