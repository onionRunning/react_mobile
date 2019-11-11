import { observable, action } from 'mobx'
import api from 'api'
import * as orders from 'interface/orders'
import { Res, Page } from 'interface/common'
class MyOrders {
  // 我的订单列表
  @observable myOrderLists: Partial<orders.MyOrderLists>[] = []
  // 我的订单页码
  @observable myOrderPage: Page = { page_size: 10, total_page: 0, total: 0, current: 0 }
  // 我的订单请求状态
  @observable myOrderStatus: boolean = false
  //获取订单列表
  @action getMyOrderLists = async (payload: orders.MyOrderReq) => {
    const res: Res<orders.MyOrderRes> = await api.myOrders(payload)
    if (res.success) {
      this.myOrderLists = res.data!.application_list
      this.myOrderPage = {
        total_page: res.data!.page_count,
        total: res.data!.total_count
      }
      this.myOrderStatus = res.data!.application_list.length > 0
    }
  }
  // 抢单逻辑
  @action getGrabOrder = async (payload: orders.GrabOrderReq, callBack: orders.CallBacks) => {
    const { successCb, errCb } = callBack
    const res: Res<string> = await api.grabOrders(payload)
    if (res.success) {
      successCb()
      return
    }
    errCb(res.info)
  }
}

export default MyOrders
