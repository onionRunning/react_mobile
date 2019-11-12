import React, { Component } from 'react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
import ListCondition from 'components/listCondition'
import Table from 'components/table'
import Message from 'components/Message'
import Common from 'stores/common'
import Blacks from 'stores/orders/blacks'
import * as utils from './utils'
import { strTrim, composeFunc } from 'global/method'
import errs from 'global/errors'
import { MixProps } from 'global/interface'
import { getSortValue, DEFAULT_PAGE, DEFAULT_PER_PAGE, FillInfo } from '../const'

import styles from '../myOrders/index.module.scss'

interface Props extends MixProps {
  common: Common
  blacks: Blacks
}
interface State {
  [p: string]: any
}
@inject('common', 'blacks')
@observer
export class BlackOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: { ...utils.initRequest },
      chose: [],
      checkRow: [],
      blacklist_type: '',
      addBlack: {
        operator_name: sessionStorage.getItem('username'),
        operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
      }
    }
  }
  componentDidMount() {
    this.getBlackReqs()
    this.getProductDetail()
    this.getBlackPerson()
  }

  componentWillUnmount() {
    this.setState({ request: { ...utils.initRequest }, chose: [], checkRow: [] })
    this.props.blacks.clearblackMng()
  }

  render() {
    const { blackMngLists, blackMngPage, blackMngStatus } = this.props.blacks
    const tabTitle = utils.tabBlackTitle()
    // const nFilterData = selectHandler(utils.searchBlackConfig, { ...product.products }, blackPerson)
    const rowSelection: any = {
      onChange: this.changeChose, //勾选函数
      selectedRowKeys: this.state.checkRow // 用于重置
    }
    return (
      <div className={styles.page}>
        <h3>Add To BlackList</h3>
        <div className="orders-condition-wrapper">
          <ListCondition
            data={utils.searchBlackConfig}
            btnItems={utils.blackBtnItems() as any}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
          />
        </div>
        <div className="list-wapper">
          <Table
            tableData={blackMngLists}
            tableTitle={tabTitle}
            pagination={blackMngPage}
            onChange={this.tableChange}
            rowSelection={rowSelection}
            loading={blackMngStatus}
          />
        </div>
      </div>
    )
  }
  // 表单筛选
  handleFilter = (v: any) => {
    const obj = { operator_name: '' }
    let vals = strTrim(v.value)
    if (utils.turnToNumber.includes(v.key as string)) {
      if (vals) {
        vals = Number(vals)
      } else {
        vals = 0
      }
    }
    if (v.key === 'operator_id') {
      obj.operator_name = v.label
    }
    this.setState({
      request: { ...this.state.request, [v.key]: vals, ...obj }
    })
  }
  // 按钮点击
  handleBtnClick = (type: string) => {
    type === 'inquire' && this.getBlackReqs({ page: 1 })
    type === 'add_black' && this.addBlacksList()
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
    this.getBlackReqs({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }
  // 中间函数
  tempFunc = (v?: FillInfo) => () => {
    this.props.blacks.getBlackMngLists({ ...this.state.request, ...v })
  }
  // loading 组合
  getBlackReqs = async (v?: FillInfo) => {
    this.props.common.composeLoading(this.tempFunc(v))
  }
  // 请求黑名单管理列表  // 校验
  getBlacksList = (v?: any) => {
    this.props.blacks.getBlackMngLists({ ...this.state.request, ...v })
  }

  // 获取产品配置信息
  getProductDetail = () => {
    // 产品配置
  }

  // 获取黑名单管理操作人列表
  getBlackPerson = () => {
    // user
  }

  // 调单选用的
  changeChose = (k: any, v: any) => {
    this.setState({ chose: v, checkRow: k })
  }

  // 添加黑名单
  addBlacksList = () => {
    if (!this.state.chose.length) {
      Message.error(errs.CHOOSE_ORDER_EMPTY)
      return
    }
    this.props.common.changeConfirm({
      show: true,
      title: utils.EXIT,
      text: utils.addText,
      onOk: this.currentFunc,
      onCancel: this.closeConfirm
    })
  }
  currentFunc = () => this.props.common.composeLoading(this.rightFunc)

  closeConfirm = () => {
    this.props.common.changeConfirm({ show: false })
  }

  // 开始添加黑名单
  rightFunc = () => {
    const { checkRow, addBlack } = this.state
    const vMaps = utils.getOrderNo(checkRow, this.props.blacks.blackMngLists)
    const params = {
      order_no: vMaps,
      order_count: vMaps.length,
      blacklist_type: 'blacklist_type',
      ...addBlack
    }
    this.props.blacks.addBlackMngOrder(params, this.successCb)
  }

  // 添加黑名单成功的回调: 关闭弹窗 && 重新请求列表
  successCb = () => {
    const { closeConfirm, getBlacksList, initChose } = this
    composeFunc(closeConfirm, getBlacksList, initChose)
  }
  // 初始化勾选内容
  initChose = () => {
    this.setState({ checkRow: [] })
  }
}

export default BlackOrder

// 页面逻辑:
// 查询 +  筛选
// 添加筛选框 添加黑名单
