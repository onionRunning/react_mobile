import { action } from 'mobx'
import api from 'api/index'
import { CheckRepeatPayloadReq } from 'interface/details/checkRepeat'
import Message from 'components/message'
import { Callback } from 'global/type'

class CheckRepeat {
  /**
   * 获取查重数据
   * @params
   */
  @action getCheckLists = async (payload: CheckRepeatPayloadReq, cb: Callback) => {
    const res = await api.getRepeatList(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          cb && cb(JSON.parse(res.data))
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
  @action retryChecklists = async (payload: CheckRepeatPayloadReq, cb: Callback) => {
    const res = await api.checkRepeatList(payload)
    try {
      if (res && res.success) {
        this.getCheckLists(payload, cb)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}
export default CheckRepeat
