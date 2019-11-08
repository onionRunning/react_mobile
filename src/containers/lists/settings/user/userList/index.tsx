import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ListTitle from 'components/listTitle'
import ListCondition from 'components/listCondition'
// import Button from 'components/button'
import Table from 'components/table'
// import Message from 'components/Message'
import { condition, btnItems, getTableTitle } from './config'
import styles from './index.module.scss'
import { userPermission } from 'design/permission'
import UserStore from 'stores/user'
import { TableSortType, UserListReq, UserListItem } from 'interface/user'
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
        {/* <div className={styles.header}> */}
        <ListCondition data={condition} btnItems={btnItems} onChange={this.handleChange} btnClick={this.btnClick} />
        {/* <div className={styles.operator}>
            <Button onClick={this.handleInquire} type="primary">
              Inquire
            </Button>
            <Button onClick={() => Message.info('blue')} type="blue">
              Add user
            </Button>
          </div>
        </div> */}
        <Table tableTitle={tableTitle} tableData={userList} pagination={pagination} onChange={this.handleTableChange} />
      </div>
    )
  }

  renderOperate = (record: UserListItem, _: any, index: number) => {
    // const { p40102, p40103, p40104, p40105 } = userPermission.finnalPermission!.user_func
    const { p40102, p40103, p40104 } = userPermission.finnalPermission!.user_func
    const temp = record.status === 'normal' ? 'freeze' : 'unfreeze'
    const { name } = record
    return (
      <div className={styles.action}>
        {p40102 && <Link to={`/auth/users_details/${record.id}`}>detail</Link>}
        {name !== 'admin' && p40103 && <Link to={`/auth/users_edit/${record.id}`}>edit</Link>}
        {name !== 'admin' && p40104 && (
          <span onClick={this.operateUser()} id={`${temp}-${index}`}>
            {temp}
          </span>
        )}
        {/* {name !== 'admin' && p40105 && (
          <a onClick={this.resetUsers(record.id)} id={`reset-pwd-${index}`}>
            Reset Password
          </a>
        )} */}
      </div>
    )
  }

  // 获取列表数据
  getUserList = async () => {
    const { request } = this.state
    console.log(request.page)
    await this.props.user.getUserListData(request)
  }

  // 选择筛选项时更新state
  handleChange = (item: Item) => {
    console.log(item)
    this.setState({
      request: {
        ...this.state.request,
        [item.key]: item.value
      }
    })
  }

  btnClick = (v: any) => {
    console.log(v)
    v === 'inquire' && this.handleInquire()
  }

  // 查询列表，重置页码
  handleInquire = () => {
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

  // 冻结 or 解冻用户,出现弹窗
  operateUser = () => () => {
    // const bool = operate.status === 'frozen' ? true : false
    // const titles = operate.status === 'normal' ? 'disabling' : 'enabling'
    // this.props.dispatch(
    //   Action.createConfirm({
    //     title: 'Confirmation prompt',
    //     text: `Do you confirm ${titles} user ?`,
    //     onOk: this.rightFunc(operate.id, !bool),
    //     onCancel: this.closeConfirm
    //   })
    // )
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
}

export default inject('user')(User)
