import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import { Pagination } from 'components/table/config'
import * as utils from './utils'
import { strTrim } from 'global/method'
import { MixProps } from 'global/interface'
import { intoDetail } from 'global/constants'
import { userPermission } from 'design/permission'

import styles from './index.module.scss'

interface Props extends MixProps {
  page?: Pagination
  myOrderData: any[]
  cleanTableSelectKeys?: () => void
  status: boolean
  product: any
  person?: any[]
}
const initRequest = {
  page: 1,
  per_page: 10,
  loan_days: 0,
  sort_value: 'created_at', // 需要排序字段
  sort_order: 'asc' // 排序的方法 asc desc
}
@inject('orders')
@observer
export class MyOrder extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: { ...initRequest, operator_id: parseInt(sessionStorage.getItem('userId')!, 10) }
    }
  }
  componentDidMount() {
    this.getMyOrdersList()
    this.getProductDetail()
  }
  render() {
    const { page, myOrderData = [], status } = this.props
    const tabTitle = utils.geTableTitle()
    const { my_order_func } = userPermission.finnalPermission!
    return (
      <div className={styles.page}>
        <h3>My Order</h3>
        <div className="orders-condition-wrapper">
          <ListCondition data={utils.filterData} onChange={this.handleFilter} />
          {my_order_func.p10202 && (
            <button onClick={this.grabOrder} className="sub-btn-blue-large get-order-btn" id="my-order-pick-btn">
              Pick up the order
            </button>
          )}
        </div>
        <div className="list-wapper">
          <Table
            tableData={myOrderData}
            tableTitle={tabTitle}
            pagination={page}
            onChange={this.tableChange}
            loading={status}
          />
        </div>
      </div>
    )
  }
  // 表单筛选
  handleFilter = (v: any) => {
    const obj: any = {}
    v.value = strTrim(v.value) // 转string
    if (utils.turnToNumber.includes(v.key)) {
      // 转number
      v.value = v.value ? Number(v.value) : v.value === '' ? 0 : v.value
    }
    this.setState({
      request: { ...this.state.request, [v.key]: v.value, ...obj }
    })
  }
  // 按钮点击
  handleBtnClick = (type: string) => {
    type === 'query' && this.getMyOrdersList({ page: 1 })
  }

  // 翻页 + 排序
  tableChange = (pag: PaginationConfig, _: any, sorter: SorterResult<any>) => {
    const { columnKey, order } = sorter
    const sorts = {
      page: pag.current ? pag.current : 1,
      per_page: pag.pageSize ? pag.pageSize : 10,
      sort_value: columnKey ? columnKey : '',
      sort_order: order === 'ascend' ? 'asc' : (order as string) === 'descend' ? 'desc' : ''
    }
    this.getMyOrdersList({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 请求订单列表     // 校验
  getMyOrdersList = (v?: any) => {
    // this.props.dispatch({
    //   type: Type.GET_MY_ORDER_REQUEST,
    //   params: { ...this.state.request, ...v }
    // })
    console.log(v)
  }

  // 获取产品配置信息
  getProductDetail = () => {
    // this.props.dispatch({
    //   type: Type.GET_PRODUCT_DETAIL_REQUEST
    // })
  }
  // 抢单逻辑
  grabOrder = () => {
    const id = sessionStorage.getItem('userId')
    // this.props.dispatch({
    //   type: Type.GRAB_ORDER_REQUEST,
    //   params: {
    //     operator_id: parseInt(id!, 10),
    //     operator_name: sessionStorage.getItem('username')
    //   },
    //   cb: this.successCb
    // })
    console.log(id)
  }

  successCb = () => {
    this.getMyOrdersList()
  }
  replaceDetail = (item: any) => () => {
    const { customer_id, order_no, product_name, mobile_id } = item
    const payload = {
      customer_id,
      order_no,
      product_name,
      mobile_id,
      viewType: intoDetail.MYORDER
    }
    this.props.history.push(`/auth/${intoDetail.MYORDER}/order_details`, {
      ...payload
    })
  }
}

export default MyOrder

// 页面逻辑:
// 查询 && 搜索
// 抢单
