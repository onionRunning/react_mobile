import { observable, action } from 'mobx'
import api from 'api/index'
import { UserInfoPayload } from 'api/params'
import Message from 'components/message'

interface PropsType {
  [names: string]: string | number | boolean
}
class UserDetail {
  @observable userInfo: PropsType = {}
  @observable orderInfo: PropsType = {}
  @observable deviceInfo: PropsType = {}
  @observable extraInfo: PropsType = {}

  /**
   * 获取用户信息
   * @params
   */
  @action getUserInfo = async (payload: UserInfoPayload) => {
    const res = await api.getUserInfo(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          this.userInfo = res.data.user_info // 包含(用户基本信息,用户联系人信息,工作信息,收款信息,信用等级,id信息,)
          this.orderInfo = res.data.order_info // 相关订单信息
          this.deviceInfo = res.data.device_info // 设备信息
          this.extraInfo = res.data.phl_extra_info // 包含(脸书帐号, 线下收款机构)
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
