import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ListTitle from 'components/listTitle'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import { statusType, condition, btnItems, getTableTitle } from './config'
import styles from './index.module.scss'
import { userPermission } from 'design/permission'
import UserStore from 'stores/user'
import { StatusType, TableSortType, UserListReq, UserListItem, ChangeUserReq } from 'interface/user'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

interface Props extends RouteComponentProps {
  user: UserStore
}

interface Item {
  key: string
  value: string
}

interface State {
  request: UserListReq
}

@inject('user')
@observer
class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        page: 1,
        per_page: 10,
        sort: 'desc'
      }
    }
  }
  componentDidMount = () => {
    this.getUserList()
  }

  render() {
    const tableTitle = getTableTitle(this.renderOperate)
    const { userList, pagination } = this.props.user
    return (
      <div className={styles.page}>
        <ListTitle>User management</ListTitle>
        <ListCondition
          data={condition}
          btnItems={btnItems}
          onChange={this.handleChange}
          btnClick={this.handleBtnclick}
        />
        <Table tableTitle={tableTitle} tableData={userList} pagination={pagination} onChange={this.handleTableChange} />
      </div>
    )
  }

  renderOperate = (text: string, record: UserListItem, index: number) => {
    // const { p40102, p40103, p40104, p40105 } = userPermission.finnalPermission!.user_func
    const { p40102, p40103, p40104 } = userPermission.finnalPermission!.user_func
    const { id, name, status } = record
    const statusText = this.transformStatus(status)
    return (
      <div className={styles.action}>
        {p40102 && <Link to={`/auth/users_page/detail/${id}`}>detail</Link>}
        {name !== 'admin' && p40103 && <Link to={`/auth/users_page/edit/${id}`}>edit</Link>}
        {name !== 'admin' && p40104 && (
          <span onClick={this.operateUser(id, status)} id={`${statusText}-${index}`}>
            {statusText}
          </span>
        )}
        {/* {name !== 'admin' && p40105 && (
          <a onClick={this.resetUsers(id)} id={`reset-pwd-${index}`}>
            Reset Password
          </a>
        )} */}
      </div>
    )
  }

  // 获取列表数据
  getUserList = async () => {
    const { request } = this.state
    await this.props.user.getUserListData(request)
  }

  // 选择筛选项时更新state
  handleChange = (item: Item) => {
    this.setState({
      request: {
        ...this.state.request,
        [item.key]: item.value
      }
    })
  }

  handleBtnclick = (type: string) => {
    type === 'inquire' && this.handleClickInquire()
    type === 'add' && this.handleClickAdd()
  }

  // 查询列表，重置页码
  handleClickInquire = () => {
    this.setState(
      {
        request: {
          ...this.state.request,
          page: 1
        }
      },
      this.getUserList
    )
  }

  // 跳转到新增页面
  handleClickAdd = () => {
    this.props.history.push('/auth/users_page/add')
  }

  // 冻结、解冻用户
  operateUser = (id: number, status: StatusType) => async () => {
    const request: ChangeUserReq = {
      id,
      frozen: this.getOppositeStatus(status)!
    }
    await this.props.user.changeUserStatus(request, this.getUserList)
  }

  // 分页，排序
  handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<keyof UserListItem, string[]>,
    sorter: SorterResult<UserListItem>
  ) => {
    const { order } = sorter
    const { current, pageSize } = pagination
    this.setState(
      {
        request: {
          ...this.state.request,
          page: current!,
          per_page: pageSize!,
          sort: this.transformSort(order)
        }
      },
      this.getUserList
    )
  }

  // 转换状态，用于按钮文本显示
  transformStatus = (status: StatusType) => {
    if (status === statusType.NORMAL) {
      return 'freeze'
    } else {
      return 'unfreeze'
    }
  }

  // 转换排序字段
  transformSort = (order: TableSortType) => {
    switch (order) {
      case 'descend':
        return 'desc'
      case 'ascend':
        return 'asc'
      default:
        return ''
    }
  }

  // 获取相反的状态
  getOppositeStatus = (status: StatusType) => {
    if (status === statusType.NORMAL) {
      return 'frozen'
    } else {
      return 'normal'
    }
  }
}

export default User
