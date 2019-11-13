import { observable, action } from 'mobx'
import api from 'api/index'

class Details {
  @observable order_msg: any = {}
  @observable user_msg: any = {}
  @observable work: any = {}
  @observable personal: any = {}
  @observable id: any = {}
  @observable device_info: any = {}
  @observable contact: any = {}
  @observable account: any = {}
  @observable score_card_results: any = {}

  /**
   * 获取用户信息
   * @params
   */
  @action getUserInfo = async (payload: any = {}, current?: string) => {
    const res = await api.getUserInfo(payload, current)
    try {
      if (res && res.success) {
        if (res.data) {
          console.log(res.data)
          this.order_msg = res.data.order_msg
          this.user_msg = res.data.user_msg
          this.personal = res.data.user_msg.personal_info
          this.work = res.data.user_msg.work_info
          this.account = res.data.user_msg.account_info
          this.id = res.data.user_msg.ID_info
          this.contact = res.data.user_msg.contact_info
          this.device_info = res.data.user_msg.mobile_info
          this.score_card_results = res.data.score_card_result
        }
      }
    } catch (err) {
      // Message.error(err)
    }
  }
}
export default Details
