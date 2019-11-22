import Common from './common'
import MobileInfo from './details/mobileInfo'
import User from './user'
import Role from './role'
import Black from './orders/blacks'
import MyOrders from './orders/myOrders'
import OrderLists from './orders/orderLists'
import Lendigns from './lendings'
import Repayments from './repayments'
import UserDetail from './details/userInfo'
import CheckRepeat from './details/checkRepeat'
import LoanInfo from './details/loanInfo'
import SMSRecord from './details/smsRecord'
import StatusRecord from './details/statusRecord'
import Approval from './details/approval'

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
  loanInfo: LoanInfo
  smsRecord: SMSRecord
  statusRecord: StatusRecord
  approval: Approval
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
    this.loanInfo = new LoanInfo()
    this.smsRecord = new SMSRecord()
    this.approval = new Approval()
    this.statusRecord = new StatusRecord()
  }
}

export default new Root()
