import React, { Component } from 'react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router-dom'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import { Pagination } from 'components/table/config'

import * as utils from './utils'
import { FillInfo, getSortValue, DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../const'
import { strTrim } from 'global/method'
import { intoDetail } from 'global/constants'
import styles from '../myOrders/index.module.scss'

type MixProps = RouteComponentProps

interface Props extends MixProps {
  page?: Pagination
  orderData: any[]
  cleanTableSelectKeys?: () => void
  status: boolean
  product: any
  person?: any[]
}

export class OrderLists extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: { ...utils.initRequest }
    }
  }
  componentDidMount() {
    this.getOrdersList()
    this.getProductDetail()
    this.getApprovalPerson()
  }

  componentWillUnmount() {
    this.setState({
      request: { ...utils.initRequest }
    })
  }
  render() {
    const { page, orderData, status } = this.props
    const tabTitle = utils.getTabTitle(this.replaceDetail)
    return (
      <div className={styles.page}>
        <h3>Order list</h3>
        <div className="orders-condition-wrapper">
          <ListCondition
            data={utils.filterData}
            btnItems={utils.btnItems() as any}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
          />
        </div>
        <div className="list-wapper">
          <Table
            tableData={orderData}
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
  handleFilter = (v: FillInfo) => {
    let vals = strTrim(v.value)
    if (utils.turnToNumber.includes(v.key as string)) {
      if (vals) {
        vals = Number(vals)
      } else {
        vals = 0
      }
    }
    this.setState({
      request: { ...this.state.request, [v.key]: vals }
    })
  }
  // 按钮点击
  handleBtnClick = (type: string) => {
    type === 'query' && this.getOrdersList({ page: 1 })
    type === 'loaddown' && this.downloadOrder()
  }

  // 翻页 + 排序
  tableChange = (pag: PaginationConfig, _: object, sorter: SorterResult<any>) => {
    const { columnKey, order } = sorter
    const sorts = {
      page: pag.current ? pag.current : DEFAULT_PAGE,
      per_page: pag.pageSize ? pag.pageSize : DEFAULT_PER_PAGE,
      sort_value: columnKey ? columnKey : '',
      sort_order: getSortValue(order)
    }
    this.getOrdersList({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 请求订单列表     // 校验
  getOrdersList = (v?: any) => {
    console.log('v', v)
  }

  // 获取产品配置信息
  getProductDetail = () => {
    console.log('v', 'product')
  }

  // 获取操作人列表
  getApprovalPerson = () => {
    console.log('get_user')
  }

  // 下载订单列表
  downloadOrder = () => {
    console.log('download')
  }
  replaceDetail = (item: any) => () => {
    const { customer_id, order_no, product_name, mobile_id } = item
    const payload = {
      customer_id,
      order_no,
      product_name,
      mobile_id,
      viewType: intoDetail.ORDERS
    }
    this.props.history.push(`/auth/${intoDetail.ORDERS}/order_details`, {
      ...payload
    })
  }
}
export default OrderLists

// 页面逻辑:
// 查询 +  筛选
// 下载 同 查询
