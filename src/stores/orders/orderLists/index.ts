import { observable, action } from 'mobx'
import api from 'api'
import * as orders from 'interface/orders'
import { Res, Page } from 'interface/common'
const initPage = { page_size: 10, total_page: 0, total: 0, current: 0 }
const handleRes = (data: Partial<orders.MyOrderLists>[]) => {
  if (!data) return []
  return data
}
interface UserProps {
  [p: string]: string | number
}
class OrderLists {
  // 我的订单列表
  @observable lists: Partial<orders.MyOrderLists>[] = []
  // 我的订单页码
  @observable page: Page = initPage
  // 我的订单请求状态
  @observable status: boolean = false
  @observable users: UserProps[] = []
  //获取订单列表
  @action getOrderLists = async (payload: orders.OrderListsReq) => {
    const res: Res<any> = await api.getOrderList(payload as any)
    if (res.success) {
      this.lists = handleRes(res.data!.list)
      this.page = {
        total_page: res.data!.page_count,
        total: res.data!.total_count
      }
      this.status = handleRes(res.data!.list).length > 0
    }
  }
  // 获取操作用户
  @action getOperateUser = async () => {
    const res: any = await api.getPersonApprove()
    if (res.success) {
      this.users = res.data
    }
  }
  // 清空数据
  @action clearData = () => {
    this.lists = []
    this.page = initPage
    this.status = false
  }
}

export default OrderLists
