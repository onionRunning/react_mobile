import { observable, action } from 'mobx'
import Message from 'components/message'
import api from 'api'
import * as params from 'api/params'
import * as response from 'api/response'
import { RoleListReq, Pagination, RoleDetailReq } from 'interface/role'

class Role {
  @observable roleList: response.RoleList[] = []
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

  @action addRole = async (payload: params.UpdateRoleReq, callback: () => void) => {
    try {
      const res = await api.addRole(payload)
      if (res.success) {
        Message.success('Create role success!')
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }

  @action editRole = async (payload: params.UpdateRoleReq, callback: () => void) => {
    try {
      const res = await api.editRole(payload)
      if (res.success) {
        Message.success('Update role success!')
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
}

export default Role
