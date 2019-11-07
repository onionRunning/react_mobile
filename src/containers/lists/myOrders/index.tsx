import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PaginationConfig } from 'antd/lib/table'
import Table from 'components/table'
import Select from 'components/select'
import { tableTitle } from './const'
import { Pagination } from 'components/table/config'
import { intoDetail } from 'global/constants'
import { gotoDetail, debounce, getDefaultProductName } from 'global/method'
import styles from './index.module.scss'
import { OrderListItem } from 'api/response'
import { userPermission } from 'design/permission'
import { ListItem } from 'components/select'
import ListTitle from 'components/listTitle'

type MixProps = RouteComponentProps
interface Props extends MixProps {
  page?: Pagination
  data: OrderListItem[]
  status: boolean
  total: number
  productOption: ListItem[]
}

const initState = {
  request: {
    page: 1, // 当前页码
    per_page: 20, // 每页的页码数
    product_name: ''
  }
}

interface State {
  request: any
}

export class MyOrders extends Component<Props, State> {
  debounceGetMyOrders: () => void
  constructor(props: Props) {
    super(props)
    this.state = initState
    this.debounceGetMyOrders = debounce(this.getMyOrders)
  }
  componentDidMount() {
    this.getProductOptions()
    let productName: string = getDefaultProductName()
    this.setState(
      {
        request: {
          ...this.state.request,
          product_name: productName
        }
      },
      this.getMyOrders
    )
  }

  render() {
    const { data, status, total, productOption } = this.props
    const { page, per_page } = this.state.request
    const { my_order_func } = userPermission.finnalPermission!
    // const tableTitle = getTable(this.handleToDetail, my_order_func)
    tableTitle[tableTitle.length - 1].render = this.renderOperating
    const { p10202 } = my_order_func
    const pagination = {
      current: page,
      pageSize: per_page,
      total: total
    }
    return (
      <div className={styles.page}>
        <ListTitle>My Order</ListTitle>
        <div className={styles.header}>
          <Select list={productOption} onChange={this.handleChangeSelect} />
          {p10202 && (
            <button className="sub-btn-blue get-my-order-btn" onClick={this.grabOrder} id={'my-order-pick-btn'}>
              Pick up the order
            </button>
          )}
        </div>
        <div className={styles.content}>
          <Table
            tableTitle={tableTitle}
            tableData={data}
            loading={status}
            pagination={pagination}
            onChange={this.tableChange}
          />
        </div>
      </div>
    )
  }

  renderOperating = (record: OrderListItem, _: any, index: number) => {
    const { my_order_func } = userPermission.finnalPermission!
    return (
      my_order_func.p10201 && (
        <span className={`blue-color operating`} onClick={this.handleToDetail(record)} id={`inquery-${index}`}>
          Inquire
        </span>
      )
    )
  }

  // 获取产品选项
  getProductOptions = () => {
    // this.props.dispatch(getProductDetailList())
  }

  // 选择产品
  handleChangeSelect = (selectedOption: ListItem) => {
    let { value } = selectedOption
    sessionStorage.setItem('productName', value)
    this.setState(
      {
        request: {
          ...this.state.request,
          product_name: value
        }
      },
      this.getMyOrders
    )
  }

  // 分页跳转
  tableChange = (pagination: PaginationConfig) => {
    const { request } = this.state
    // 更新数据
    this.setState(
      {
        request: {
          ...request,
          page: pagination.current!,
          per_page: pagination.pageSize!
        }
      },
      this.getMyOrders
    )
  }

  // 打开新窗口进入详情
  handleToDetail = (record: OrderListItem) => () => {
    gotoDetail(record, intoDetail.MYORDER)
  }

  // 领取订单 - 抢单
  grabOrder = () => {
    // const id = sessionStorage.getItem('userId') || '0'
    // const name = sessionStorage.getItem('username')
    // const { product_name } = this.state.request
    // const payload = {
    //   operator_id: parseInt(id, 10),
    //   operator_name: name,
    //   product_name
    // }
    // this.props.dispatch(createGrabOrders(payload, this.debounceGetMyOrders))
  }

  // 获取我的订单列表
  getMyOrders = () => {
    const { request } = this.state
    sessionStorage.setItem('productName', request.product_name)
    // const payload = {
    //   ...request,
    //   operator_id: parseInt(sessionStorage.getItem('userId') || '', 10), // 操作人
    //   sort_value: 'created_at', // 需要排序字段
    //   sort_order: 'desc' // 排序的方法 asc desc
    // }
    // this.props.dispatch(createMyOrdersRequest(payload))
  }
}
export default MyOrders
