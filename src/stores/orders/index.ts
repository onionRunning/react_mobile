import { observable, action } from 'mobx'
import api from 'api'
import * as orders from 'interface/orders'
import { Res } from 'interface/common'
class Orders {
  @observable myOrderLists: Partial<orders.MyOrderLists>[] = []
  @action getMyOrderLists = async (payload: orders.MyOrderReq) => {
    //获取订单列表
    const res: Res<orders.MyOrderRes> = await api.myOrders(payload)
    if (res.success) {
      this.myOrderLists = res.data!.application_list
    }
  }
}

export default Orders
