import { action, observable } from 'mobx'
import api from 'api'
import Message from 'components/message'

class MobileInfo {
  @observable mobileInfo: any = {}
  @action getLoanInfoList = async (payload: any) => {
    try {
      const res = await api.getMobileInfo(payload)
      if (res.success && res.data) {
        this.mobileInfo = res.data
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default MobileInfo
