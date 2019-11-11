import { observable, action } from 'mobx'
import api from 'api/index'
// import { RepaymentListReq } from 'api/params'
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
  @action getRepaymentList = async (payload: any = {}) => {
    const res = await api.getRepaymentList(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          this.lists = res.data
          this.total_count = res.data.total_count
        }
      }
    } catch (err) {}
  }
}
export default Repayments
