import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ListTitle from 'components/listTitle'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import { statusType, condition, btnItems, getTableTitle, operateType } from './config'
import styles from './index.module.scss'
import { userPermission } from 'design/permission'
import UserStore from 'stores/user'
import CommonStore from 'stores/common'
import { StatusType, UserListReq, UserListItem, ChangeUserReq } from 'interface/user'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { transformSort } from 'global/method'

interface Props extends RouteComponentProps {
  user: UserStore
  common: CommonStore
}

interface Item {
  key: string
  value: string
}

interface State {
  request: UserListReq
}

@inject('common', 'user')
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
    this.handleLoading()
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
      </div>
    )
  }

  handleLoading = () => {
    this.props.common.composeLoading(this.getUserList)
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
  operateUser = (id: number, status: StatusType) => () => {
    // 弹出模态框提示
    this.props.common.changeConfirm({
      show: true,
      title: operateType[status].title,
      text: operateType[status].text,
      onOk: this.confirmOperateUser(id, status),
      onCancel: this.closeConfirm
    })
  }

  confirmOperateUser = (id: number, status: StatusType) => async () => {
    const request: ChangeUserReq = {
      id,
      frozen: this.getOppositeStatus(status)!
    }
    await this.props.user.changeUserStatus(request, this.operateUserSuccess)
  }

  // 发送成功后的回调
  operateUserSuccess = () => {
    this.closeConfirm()
    this.getUserList()
  }

  // 关闭模态框
  closeConfirm = () => {
    this.props.common.changeConfirm({
      show: false
    })
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
          sort: transformSort(order)
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
