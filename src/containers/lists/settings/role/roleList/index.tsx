import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ListTitle from 'components/listTitle'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import { condition, btnItems, getTableTitle } from './config'
import { userPermission } from 'design/permission'
import Role from 'stores/role'
import { TableSortType, RoleListReq } from 'interface/role'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import * as response from 'api/response'

import styles from './index.module.scss'

interface Props extends RouteComponentProps {
  role: Role
}

interface Item {
  key: string
  value: string
}

interface State {
  request: RoleListReq
}

@inject('role')
@observer
class RoleList extends Component<Props, State> {
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
    this.getRoleList()
  }

  render() {
    const tableTitle = getTableTitle(this.renderOperate)
    const { roleList, pagination } = this.props.role
    return (
      <div className={styles.page}>
        <ListTitle>Role management</ListTitle>
        <ListCondition
          data={condition}
          btnItems={btnItems}
          onChange={this.handleChange}
          btnClick={this.handleBtnclick}
        />
        <Table tableTitle={tableTitle} tableData={roleList} pagination={pagination} onChange={this.handleTableChange} />
      </div>
    )
  }

  renderOperate = (text: string, record: response.RoleList) => {
    const { p40202, p40203 } = userPermission.finnalPermission!.role_func
    const { id } = record
    return (
      <div className={styles.action}>
        {p40202 && <Link to={`/auth/roles_page/detail/${id}`}>inquire</Link>}
        {p40203 && <Link to={`/auth/roles_page/edit/${id}`}>edit</Link>}
      </div>
    )
  }

  // 获取列表数据
  getRoleList = async () => {
    const { request } = this.state
    await this.props.role.getRoleListData(request)
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
    type === 'inquire' && this.handleInquire()
    type === 'add' && this.handleAdd()
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
      this.getRoleList
    )
  }

  handleAdd = () => {
    this.props.history.push('/auth/roles_page/add')
  }

  // 分页，排序
  handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<keyof response.RoleList, string[]>,
    sorter: SorterResult<response.RoleList>
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
      this.getRoleList
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

export default RoleList
