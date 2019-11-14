import { observable, action } from 'mobx'
import api from 'api'
// import * as orders from 'interface/orders'
import { Res, Page } from 'interface/common'
const initPage = { page_size: 10, total_page: 0, total: 0, current: 0 }
interface BlackLists {
  [p: string]: string | number
}
class Blacks {
  // 黑名单管理列表
  @observable blackMngLists: BlackLists[] = []
  // 黑名单列表
  @observable blackLists: BlackLists[] = []
  // 黑名单管理 page
  @observable blackMngPage: Page = initPage
  // 黑名单列表 page
  @observable blackListPage: Page = initPage
  // 黑名单管理列表请求状态
  @observable blackMngStatus: boolean = false
  // 黑名单列表请求状态
  @observable blackListStatus: boolean = false

  //获取黑名单管理列表(黑名单管理)
  @action getBlackMngLists = async (payload: any) => {
    const res: Res<any> = await api.queryBlacklistManagementLists(payload)
    if (res.success) {
      this.blackMngLists = res.data!.application_list
      this.blackMngPage = {
        total_page: res.data!.page_count,
        total: res.data!.total_count
      }
      this.blackMngStatus = res.data!.application_list.length > 0
    }
  }
  // 加入黑名单
  @action addBlackMngOrder = async (payload: any, callBack: () => void) => {
    const res: Res<string> = await api.addBlacklist(payload)
    if (res.success) {
      callBack()
    }
  }

  // 获取黑名单列表
  @action getBlackLists = async (payload: any) => {
    const res: Res<any> = await api.queryBlacklists(payload)
    if (res.success) {
      this.blackLists = res.data!.data
      this.blackListPage = {
        total_page: res.data!.page_count,
        total: res.data!.total_count
      }
      this.blackListStatus = res.data!.data.length > 0
    }
  }
  // 移除黑名单
  @action removeBlackList = async (payload: any, callBack: () => void) => {
    const res: Res<string> = await api.removeBlacklist(payload)
    if (res.success) {
      callBack()
    }
  }

  @action clearblackMng = () => {
    this.blackMngLists = []
    this.blackMngPage = initPage
    this.blackMngStatus = false
  }

  @action clearBlackList = () => {
    this.blackLists = []
    this.blackListPage = initPage
    this.blackListStatus = false
  }
}

export default Blacks
