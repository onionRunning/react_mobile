import Common from './common'
import MobileInfo from './details/mobileInfo'
import User from './user'
import Role from './role'
import Black from './orders/blacks'
import MyOrders from './orders/myOrders'
import OrderLists from './orders/orderLists'
import Lendigns from './lendings'
import Repayments from './repayments'
import UserDetail from './details/userDetail'
import CheckRepeat from './details/checkRepeat'
import Approval from './details/approval'
import Details from './details'

class Root {
  common: Common
  user: User
  role: Role
  myOrders: MyOrders
  blacks: Black
  orderLists: OrderLists
  lendings: Lendigns
  repayments: Repayments
  approval: Approval
  details: Details
  userDetail: UserDetail
  checkRepeat: CheckRepeat
  mobiles: MobileInfo
  constructor() {
    this.mobiles = new MobileInfo()
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
    this.approval = new Approval()
    this.details = new Details()
  }
}

export default new Root()
