import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

import ListCondition from 'components/listCondition'
import Table from 'components/table'
import ListTitle from 'components/listTitle'
import Message from 'components/message'
import AutoLendingConfirm from './AutoLendingConfirm'

import { MixProps } from 'global/interface'
import { Trim } from 'global/method'
import { LendingsPayload, LendingItem } from 'interface/lendings'

import LendingProps from 'stores/lendings'
import Common from 'stores/common'

import * as con from './const'
import styles from './index.module.scss'
import { Noop } from 'global/type'

interface Props extends MixProps {
  status?: boolean
  lendings: LendingProps
  common: Common
}

interface State {
  request: LendingsPayload
  showAutoLendPop: boolean
}
const initRequest = {
  page: 1,
  per_page: 10,
  sort_order: 'desc',
  sort_value: 'apply_time'
}
@inject('lendings', 'common')
@observer
export class Lendings extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: initRequest,
      showAutoLendPop: false
    }
  }

  componentDidMount() {
    this.getLendingList(this.state.request)
  }
  render() {
    const {
      status,
      lendings: { page, lendingList, total_count, page_count }
    } = this.props
    const { showAutoLendPop } = this.state
    const tableTitle = con.getTableTitle(this.handleLoanCalcel) as []
    const pagination = {
      current: page,
      pageSize: page_count,
      total: total_count
    }
    return (
      <div className={styles.list}>
        <ListTitle>Disbursement management</ListTitle>
        <div className={styles.header}>
          <ListCondition data={con.filterData} onChange={this.handleFilter} btnClick={this.handleBtnClick} />
          <button className={`${styles.autoLendBtn} sub-btn-blue-large`} onClick={this.showAutoLendingPop}>
            Automatic loan
          </button>
        </div>
        <div className="list-wapper">
          <Table
            rowKey="order_no"
            scroll={con.tableScroll}
            tableTitle={tableTitle}
            tableData={lendingList}
            pagination={pagination}
            onChange={this.tableChange}
            loading={status}
          />
        </div>
        {showAutoLendPop && <AutoLendingConfirm modalClose={this.hideAutoLendingPop} {...this.props} />}
      </div>
    )
  }
  // 显示自动放款弹窗
  showAutoLendingPop = () => {
    this.setState({
      showAutoLendPop: true
    })
  }
  // 显示自动放款弹窗
  hideAutoLendingPop = () => {
    this.setState({
      showAutoLendPop: false
    })
  }
  // 筛选条件
  handleFilter = (v: con.SearchType) => {
    v.value = Trim(v.value)
    if (con.turnToNumber.includes(v.key)) {
      v.value = v.value ? Number(v.value) : undefined
    }
    this.setState({
      request: { ...this.state.request, [v.key]: v.value }
    })
  }

  // 按钮的点击
  handleBtnClick = (v: string) => {
    v === 'inquire' && this.getLendingList({ page: 1 })
  }

  // 翻页 + 排序
  tableChange = (pag: PaginationConfig, _: Record<keyof LendingItem, string[]>, sorter: SorterResult<LendingItem>) => {
    const { columnKey, order } = sorter,
      pageSize = 10,
      pageCurrent = 1
    const sorts = {
      page: pag.current ? pag.current : pageCurrent,
      per_page: pag.pageSize ? pag.pageSize : pageSize,
      sort_value: columnKey ? columnKey : '',
      sort_order: order === 'ascend' ? 'asc' : (order as string) === 'descend' ? 'desc' : ''
    }
    this.getLendingList({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 表格行按钮操作
  handleLoanCalcel = (item: LendingItem, type: string) => () => {
    const rightFunc = type === 'cancel' ? this.cancelLoan(item) : this.makeLoanOrRetry(item.order_no)
    this.confrimStart(rightFunc, type)
  }

  // 弹窗
  confrimStart = (rightFunc: Noop, type: string) => {
    const { title, text } = con.choseRight(type)
    this.props.common.changeConfirm({
      show: true,
      title,
      text,
      onCancel: this.closeConfirm,
      onOk: rightFunc
    })
  }
  // 放款 or 重试
  makeLoanOrRetry = (order: string) => () => {
    const { createLoanRetry } = this.props.lendings
    const payload = {
      order_no: order,
      operator: sessionStorage.getItem('username')!,
      operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
    }
    createLoanRetry(payload, this.composeFunction)
    this.setState({ request: { ...this.state.request } })
  }

  // 取消放款
  cancelLoan = (item: LendingItem) => () => {
    const { createCancelLoan } = this.props.lendings
    const payload = {
      order_no: item.order_no,
      operator: sessionStorage.getItem('username')!,
      operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
    }
    createCancelLoan(payload, this.composeFunction)
    this.setState({ request: { ...this.state.request } })
  }

  // 操作成功时的回调
  composeFunction = () => {
    this.closeConfirm()
    this.getLendingList()
  }

  // 关闭弹窗
  closeConfirm = () => {
    this.props.common.changeConfirm({ show: false })
  }

  // 获取放款单列表
  getLendingList = (v?: LendingsPayload) => {
    const { request } = this.state
    const auth = con.vertify(request) || con.vertifyTimes(request)
    if (auth) {
      Message.error(auth)
      return
    }
    this.props.common.composeLoading(this.tempFunc({ ...request, ...v }))
    this.setState({ request: { ...this.state.request } })
  }
  tempFunc = (v?: LendingsPayload) => () => {
    const { getLendingList } = this.props.lendings
    getLendingList({ ...v })
  }
}
export default Lendings
