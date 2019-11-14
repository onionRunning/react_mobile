import { observable, action } from 'mobx'
import Message from 'components/message'
import api from 'api'
import { RoleListReq, Pagination, RoleListItem, RoleDetailReq } from 'interface/role'

class Role {
  @observable roleList: RoleListItem[] = []
  @observable pagination: Pagination = {
    current: 1,
    page_size: 10,
    total: 0
  }
  @action getRoleListData = async (payload: RoleListReq) => {
    try {
      const res = await api.getRoleList(payload)
      if (res.success && res.data) {
        const { list = [] } = res.data
        this.roleList = [...list]
        this.pagination = {
          current: payload.page,
          page_size: payload.per_page,
          total: res.data.total_count
        }
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action getProductListData = async () => {
    try {
      const res = await api.getProductDetail()
      if (res.success && res.data) {
        return res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action getRoleDetailDate = async (payload: RoleDetailReq) => {
    try {
      const res = await api.getRoleDetail(payload)
      if (res.success && res.data) {
        return res.data
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action getPermissionsListData = async () => {
    try {
      const res = await api.getPermissionsList()
      if (res.success && res.data) {
        return res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
}

export default Role
