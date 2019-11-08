import { observable, action } from 'mobx'
import { Pagination, UserListReq, UserListItem, ChangeUserStatueReq } from 'interface/user'
import api from 'api'
import Message from 'components/Message'

class User {
  @observable userList: UserListItem[] = []
  @observable pagination: Pagination = {
    current: 1,
    pageSize: 10,
    total: 0
  }

  @action getUserListData = async (payload: UserListReq) => {
    try {
      const res = await api.getUserLists(payload)
      console.log(res)
      if (res.success && res.data) {
        this.userList = res.data.list || []
        this.pagination = {
          current: payload.page,
          pageSize: payload.per_page,
          total: res.data.total_count
        }
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  @action handleChangeUserStatus = async (payload: ChangeUserStatueReq) => {
    try {
      const res = await api.changeUserStatus(payload)
      console.log(res)
    } catch (error) {}
  }
}

export default User
