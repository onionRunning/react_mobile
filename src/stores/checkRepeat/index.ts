import { observable, action } from 'mobx'
import api from 'api/index'

class CheckRepeat {
  @observable lists: object[] = []
  /**
   * 获取查重数据
   * @params
   */
  @action getCheckLists = async (payload: any = {}) => {
    const res = await api.getRepeatList(payload)
    if (res && res.success) {
      if (res.data) {
        this.lists = res.data.CheckAndOther
      }
    }
  }
  /**
   *
   * 重新获取查重数据
   * @memberof CheckRepeat
   */
  @action retryChecklists = async (payload: any = {}) => {
    const res = await api.checkRepeatList(payload)
    if (res && res.success) {
      if (res.data) {
        this.lists = res.data.CheckAndOther
      }
    }
  }
}
export default CheckRepeat
