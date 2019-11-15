import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

import ListCondition, { Data } from 'components/listCondition'
import Table from 'components/table'
import ListTitle from 'components/listTitle'
import Switch from 'components/switch'
import Message from 'components/message'

import { MixProps } from 'global/interface'
import { Trim } from 'global/method'
import { lendings } from 'api/params'

import LendingProps from 'stores/lendings'
import Common from 'stores/common'

import { userPermission } from 'design/permission'

import * as con from './const'
import styles from './index.module.scss'
import { Noop } from 'global/type'

interface Props extends MixProps {
  status?: boolean
  lendings: LendingProps
  common: Common
}

interface State {
  request: lendings.LendingsPayload
  isAutoLend?: boolean
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
      isAutoLend: false
    }
  }

  async componentDidMount() {
    const { p20101 } = userPermission.finnalPermission!.lending_func
    this.getLendingList(this.state.request)
    p20101 && this.checkAutoStatus()
  }

  renderOperating = (record: lendings.LendingItem, _: string, index: number) => {
    const { lending_func } = userPermission.finnalPermission!
    return (
      <>
        <span
          className={`blue-color operating`}
          onClick={this.handleLoanCalcel(record, 'makeOrRetry')}
          id={`${con.getMakeLoanText(record, lending_func)}-${index}`}
        >
          {con.getMakeLoanText(record, lending_func)}
        </span>
        <span
          className={`orange-color operating`}
          onClick={this.handleLoanCalcel(record, 'cancel')}
          id={`${con.getCancleLoanText(record, lending_func)}-${index}`}
        >
          {con.getCancleLoanText(record, lending_func)}
        </span>
      </>
    )
  }

  render() {
    const {
      status,
      lendings: { page, lendingList, total_count, page_count }
    } = this.props
    const { isAutoLend } = this.state
    const searchData: Data[] = con.filterData
    const tableTitle = con.tableTitle
    // TODO: 传一个回调回来
    tableTitle[tableTitle.length - 1].render = this.renderOperating
    // const { lending_func } = userPermission.finnalPermission!
    const pagination = {
      current: page,
      pageSize: page_count,
      total: total_count
    }
    const switchStyle = {
      display: 'flex',
      alignItems: 'center'
    }
    return (
      <div className={styles.list}>
        <ListTitle>Disbursement management</ListTitle>
        <div className={styles.header}>
          <ListCondition data={searchData} onChange={this.handleFilter} btnClick={this.handleBtnClick} />
          <Switch
            checked={isAutoLend}
            onChangeSwitch={this.changeAutoStatus}
            label={'Automatic loan'}
            id="switch"
            style={switchStyle}
          />
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
      </div>
    )
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
  tableChange = (
    pag: PaginationConfig,
    _: Record<keyof lendings.LendingItem, string[]>,
    sorter: SorterResult<lendings.LendingItem>
  ) => {
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
  handleLoanCalcel = (v: lendings.LendingItem, type: string) => () => {
    const rightFunc = type === 'cancel' ? this.cancelLoan(v) : this.makeLoanOrRetry(v.order_no)
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
  cancelLoan = (item: lendings.LendingItem) => () => {
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
  getLendingList = (v?: lendings.LendingsPayload) => {
    const { request } = this.state
    const auth = con.vertify(request) || con.vertifyTimes(request)
    if (auth) {
      Message.error(auth)
      return
    }
    this.props.common.composeLoading(this.tempFunc({ ...request, ...v }))
    this.setState({ request: { ...this.state.request } })
  }
  tempFunc = (v?: lendings.LendingsPayload) => () => {
    const { getLendingList } = this.props.lendings
    getLendingList({ ...v })
  }
  // 查询自动放款状态
  checkAutoStatus = () => {
    const { checkAutoStatus } = this.props.lendings
    checkAutoStatus(this.settingAuto)
  }

  // 设置自动放款开关
  settingAuto = (data: string) => {
    const auto = data === 'On' ? true : data === 'Off' ? false : false
    this.setState({ isAutoLend: auto })
  }

  // 手动修改放款为是否自动放款
  changeAutoStatus = () => {
    const { UpdateAutoStatus } = this.props.lendings
    const config_value = !this.state.isAutoLend ? 'On' : 'Off'
    UpdateAutoStatus({ config_value }, this.checkAutoStatus)
  }
}
export default Lendings
