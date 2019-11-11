import Common from './common'
import User from './user'
import Orders from './orders'
class Root {
  common: Common
  user: User
  orders: Orders
  constructor() {
    this.common = new Common()
    this.user = new User()
    this.orders = new Orders()
  }
}

export default new Root()
