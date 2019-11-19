import { observable, action } from 'mobx'
import api from 'api/index'
import { CheckRepeatPayloadRes, CheckRepeatPayloadReq } from 'interface/details/checkRepeat'
import Message from 'components/message'

class CheckRepeat {
  @observable lists: CheckRepeatPayloadRes[] = []

  /**
   * 获取查重数据
   * @params
   */
  @action getCheckLists = async (payload: CheckRepeatPayloadReq) => {
    const res = await api.getRepeatList(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          const data = res.data
          this.lists = data.CheckAndOther
        }
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
  /**
   *
   * 重新获取查重数据
   * @memberof CheckRepeat
   */
  @action retryChecklists = async (payload: CheckRepeatPayloadReq) => {
    const res = await api.checkRepeatList(payload)
    try {
      if (res && res.success) {
        this.getCheckLists(payload)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}
export default CheckRepeat
