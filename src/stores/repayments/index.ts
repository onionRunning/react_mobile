import { observable, action } from 'mobx'
import api from 'api/index'
import { RepaymentListReq } from 'interface/repayments'
// import { Callback } from 'global/type'

class Repayments {
  @observable lists: any = []

  @observable page: number = 1
  @observable total_count: number = 0
  @observable page_count: number = 10

  /**
   * 获取贷款列表
   * @params LendingsPayload
   */
  @action getRepaymentList = async (payload: RepaymentListReq = {}) => {
    const res = await api.getRepaymentList(payload)
    if (res && res.success) {
      if (res.data) {
        this.lists = res.data.repayment
        this.total_count = res.data.total_count
        this.page = payload.page!
        this.page_count = payload.per_page!
      }
    }
  }
}
export default Repayments
