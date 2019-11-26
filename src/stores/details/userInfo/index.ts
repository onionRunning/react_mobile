import { observable, action } from 'mobx'
import api from 'api/index'
import { UserInfoPayload } from 'api/params'
import Message from 'components/message'

interface PropsType {
  [names: string]: string | number | boolean
}
class UserDetail {
  @observable order_msg: PropsType = {}
  @observable user_msg: PropsType = {}
  @observable work: PropsType = {}
  @observable personal: PropsType = {}
  @observable id: PropsType = {}
  @observable device_info: PropsType = {}
  @observable contact: PropsType[] = []
  @observable account: PropsType = {}
  @observable score_card_results: PropsType = {}
  // 用户的信息
  @observable userInfo: PropsType = {}
  @observable orderInfo: PropsType = {}
  @observable deviceInfo: PropsType = {}
  @observable extraInfo: PropsType = {}

  @observable currentList: string | undefined

  /**
   * 获取用户信息
   * @params
   */
  @action getUserInfo = async (payload: UserInfoPayload, current?: string) => {
    const res = await api.getUserInfo(payload, current)
    try {
      if (res && res.success) {
        if (res.data) {
          this.order_msg = res.data.order_msg
          this.user_msg = res.data.user_msg
          this.personal = res.data.user_msg.personal_info
          this.work = res.data.user_msg.work_info
          this.account = res.data.user_msg.account_info
          this.id = res.data.user_msg.ID_info
          this.contact = res.data.user_msg.contact_info
          this.device_info = res.data.user_msg.mobile_info
          this.score_card_results = res.data.score_card_result

          // 新的数据结构
          this.userInfo = res.data.user_info // 包含(用户基本信息,用户联系人信息,工作信息,收款信息,信用等级,id信息,)
          this.orderInfo = res.data.order_info // 相关订单信息
          this.deviceInfo = res.data.device_info // 设备信息
          this.extraInfo = res.data.phl_extra_info // 包含(脸书帐号, 线下收款机构)
          this.currentList = current!
        }
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}
export default UserDetail
