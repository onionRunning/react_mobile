import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import Message from 'components/Message'
import * as utils from './utils'
import { getSortValue, DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../const'
import { strTrim } from 'global/method'
import { MixProps } from 'global/interface'
import { intoDetail } from 'global/constants'

import { userPermission } from 'design/permission'
import Orders from 'stores/orders/myOrders'
import Common from 'stores/common'
import styles from './index.module.scss'

interface Props extends MixProps {
  myOrders: Orders
  common: Common
}
interface State {
  request: utils.FillInfo
}
@inject('myOrders', 'common')
@observer
export class MyOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: { ...utils.initRequest, operator_id: parseInt(sessionStorage.getItem('userId')!, 10) }
    }
  }
  componentDidMount() {
    this.getMyOrdersList()
    this.getProductDetail()
  }
  render() {
    const { myOrderLists, myOrderPage, myOrderStatus } = this.props.myOrders
    const tabTitle = utils.geTableTitle()
    const { my_order_func } = userPermission.finnalPermission!
    return (
      <div className={styles.page}>
        <h3>My Order</h3>
        <div className="orders-condition-wrapper">
          <div className={styles.list_left}>
            <ListCondition btnClick={this.handleBtnClick} data={utils.filterData} onChange={this.handleFilter} />
          </div>
          {my_order_func.p10202 && (
            <button
              onClick={this.grabOrder}
              className={`${styles.right_posi} sub-btn-blue-large get-order-btn`}
              id="my-order-pick-btn"
            >
              Pick up the order
            </button>
          )}
        </div>
        <div className="list-wapper">
          <Table
            tableData={myOrderLists}
            tableTitle={tabTitle}
            pagination={myOrderPage}
            onChange={this.tableChange}
            loading={myOrderStatus}
          />
        </div>
      </div>
    )
  }
  // 表单筛选
  handleFilter = (v: utils.FillInfo) => {
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
    type === 'inquire' && this.getMyOrdersList({ page: 1 })
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
    this.getMyOrdersList({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 请求订单列表     // 校验
  getMyOrdersList = async (v?: utils.FillInfo) => {
    this.props.common.composeLoading(this.tempFunc(v))
  }
  // 中间函数
  tempFunc = (v?: utils.FillInfo) => () => {
    this.props.myOrders.getMyOrderLists({ ...this.state.request, ...v })
  }
  // 获取产品配置信息
  getProductDetail = () => {
    // 获取产品配置
  }
  // 抢单逻辑
  grabOrder = () => {
    const id = sessionStorage.getItem('userId')
    const params = {
      operator_id: parseInt(id!, 10),
      operator_name: sessionStorage.getItem('username')!
    }
    this.props.myOrders.getGrabOrder(params, {
      successCb: this.successCb,
      errCb: Message.error
    })
  }
  successCb = () => {
    Message.info(utils.GRAB)
    this.getMyOrdersList()
  }
  // 进入详情
  replaceDetail = (item: utils.ItemProps) => () => {
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
