import { observable, action } from 'mobx'
import api from 'api/index'
// import { LendingItem } from 'api/response'
import { CancelLoanReq, LendingsPayload, UpdateAutoReq } from 'api/params'
import { Callback } from 'global/type'
// import Message from 'components/Message'

class Lendings {
  // 自动放款按钮状态
  @observable autoStatus: boolean = false

  @observable lendingList: any = []

  @observable page: number = 1
  @observable total_count: number = 0
  @observable page_count: number = 10

  /**
   * 获取贷款列表
   * @params LendingsPayload
   */
  @action getLendingList = async (payload: LendingsPayload = {}) => {
    const res = await api.getLendingLists(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          this.lendingList = res.data.loans
          this.total_count = res.data.total_count
        }
      }
    } catch (err) {
      // Message.error(err)
    }
  }
  /**
   * 获取自定放款状态
   */
  @action checkAutoStatus = async (cb?: Callback) => {
    const res = await api.getAutoStatus()
    if (res && res.success && res.data) {
      this.autoStatus = res.data
      cb && cb(res.data)
    }
  }

  @action UpdateAutoStatus = async (payload: UpdateAutoReq, cb?: Callback) => {
    const res = await api.updateAutoStatus(payload)
    if (res && res.success) {
      cb && cb(res.data)
    }
  }
  /**
   * 取消放款
   * @params 订单号,操作人,操作人id
   */
  @action createCancelLoan = async (payload: CancelLoanReq, cb: Callback) => {
    await api.getCancelLoan(payload)
    cb()
  }

  /**
   * 放款or重新放款
   * @params 订单号,操作人,操作人id
   */
  @action createLoanRetry = async () => {}
}
export default Lendings
