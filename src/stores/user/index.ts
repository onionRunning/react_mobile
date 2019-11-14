import { observable, action } from 'mobx'
import Message from 'components/message'
import api from 'api'
import {
  Pagination,
  UserListReq,
  UserListItem,
  ChangeUserReq,
  UserDetaiReq,
  UserDetailRes,
  RoleListReq,
  AddUsersReq,
  EditUsersReq
} from 'interface/user'
// import message from 'components/message'
import { statusType } from 'containers/lists/settings/user/userList/config'

class User {
  @observable userList: UserListItem[] = []
  @observable pagination: Pagination = {
    current: 1,
    page_size: 10,
    total: 0
  }
  @action getUserListData = async (payload: UserListReq) => {
    try {
      let res = await api.getUserLists(payload)
      if (res.success && res.data) {
        this.userList = [...res.data.list]
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
  @action changeUserStatus = async (payload: ChangeUserReq, callback: () => void) => {
    try {
      let res = await api.changeUserStatus(payload)
      if (res.success) {
        Message.success(payload.frozen === statusType.FROZEN ? 'freeze success!' : 'unfreeze success!')
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action getUserDetailData = async (payload: UserDetaiReq, callback: (userDetail: UserDetailRes) => void) => {
    try {
      let res = await api.queryUserDetails(payload)
      if (res.success && res.data) {
        callback(res.data)
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action getRoleListData = async (payload: RoleListReq, callback: (roleList: any) => void) => {
    try {
      let res = await api.getRoleList(payload)
      if (res.success && res.data) {
        const { list = [] } = res.data
        callback(list)
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action addUsers = async (payload: AddUsersReq, callback: () => void) => {
    try {
      let res = await api.addUsers(payload)
      console.log(res)
      if (res.success) {
        Message.success('add successfully!')
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
  @action editUsers = async (payload: EditUsersReq, callback: () => void) => {
    try {
      let res = await api.editUsers(payload)
      console.log(res)
      if (res.success) {
        Message.success('edit successfully!')
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (err) {
      Message.error(err)
    }
  }
}

export default User
