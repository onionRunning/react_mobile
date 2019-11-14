import React, { Component } from 'react'
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table'
import { RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import ListCondition, { BtnItem } from 'components/listCondition'
import Table from 'components/table'
import OrderListStore from 'stores/orders/orderLists'
import Common from 'stores/common'
import * as utils from './utils'
import { FillInfo, getSortValue, DEFAULT_PAGE, DEFAULT_PER_PAGE, ItemProps, handlerSelectCont } from '../const'
import { strTrim } from 'global/method'
import { intoDetail } from 'global/constants'
import styles from '../myOrders/index.module.scss'

type MixProps = RouteComponentProps

interface Props extends MixProps {
  orderLists: OrderListStore
  common: Common
}
interface State {
  request: FillInfo
}
@inject('orderLists', 'common')
@observer
export class OrderLists extends Component<Props, State> {
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
    this.props.orderLists.clearData()
  }
  render() {
    const { page, lists, status, users } = this.props.orderLists
    const tabTitle = utils.getTabTitle(this.replaceDetail)
    const listData = handlerSelectCont(utils.filterData, { products: [], loan_days: [] }, users)
    return (
      <div className={styles.page}>
        <h3>Order list</h3>
        <div className="orders-condition-wrapper">
          <ListCondition
            data={listData}
            btnItems={utils.btnItems() as BtnItem[]}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
          />
        </div>
        <div className="list-wapper">
          <Table
            tableData={lists}
            tableTitle={tabTitle as ColumnProps<{}>[]}
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
    type === 'inquery' && this.getOrdersList({ page: 1 })
  }

  // 翻页 + 排序
  tableChange = (pag: PaginationConfig, _: {}, sorter: SorterResult<{}>) => {
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
  // 请求订单
  getOrdersList = async (v?: FillInfo) => {
    this.props.common.composeLoading(this.tempFunc(v))
  }
  // 中间函数
  tempFunc = (v?: FillInfo) => () => {
    this.props.orderLists.getOrderLists({ ...this.state.request, ...v })
  }
  // 获取产品配置信息
  getProductDetail = () => {
    // console.log('v', 'product')
  }

  // 获取操作人列表
  getApprovalPerson = () => {
    this.props.orderLists.getOperateUser()
  }

  // 跳转
  replaceDetail = (item: ItemProps) => () => {
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
