import { observable, action } from 'mobx'
import Message from 'components/Message'
import api from 'api'
import { Pagination, UserListReq, UserListItem } from 'interface/user'

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
}

export default User
