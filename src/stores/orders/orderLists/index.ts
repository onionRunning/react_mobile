import { observable, action } from 'mobx'
import api from 'api'
import * as orders from 'interface/orders'
import { Res, Page } from 'interface/common'
class OrderLists {
  // 我的订单列表
  @observable orderLists: Partial<orders.MyOrderLists>[] = []
  // 我的订单页码
  @observable orderListsPage: Page = { page_size: 10, total_page: 0, total: 0, current: 0 }
  // 我的订单请求状态
  @observable orderListsStatus: boolean = false
  //获取订单列表
  @action getOrderLists = async (payload: orders.MyOrderReq) => {
    const res: Res<orders.MyOrderRes> = await api.myOrders(payload)
    if (res.success) {
      this.orderLists = res.data!.application_list
      this.orderListsPage = {
        total_page: res.data!.page_count,
        total: res.data!.total_count
      }
      this.orderListsStatus = res.data!.application_list.length > 0
    }
  }
}

export default OrderLists
