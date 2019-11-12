import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

import ListCondition, { Data } from 'components/listCondition'
import Table from 'components/table'
import { ListItem } from 'components/select'
import ListTitle from 'components/listTitle'
import Switch from 'components/switch'

import { MixProps } from 'global/interface'
import { Trim } from 'global/method'
import { LendingsPayload } from 'api/params'
import { LendingItem } from 'api/response'

import { userPermission } from 'design/permission'

import * as con from './const'
import styles from './index.module.scss'

interface Props extends MixProps {
  status?: boolean
  productOption: ListItem[]
  lendings: any
}

interface State {
  request: LendingsPayload
  isAutoLend?: boolean
}
const initRequest = {
  page: 1,
  per_page: 10,
  sort_order: 'desc',
  sort_value: 'apply_time'
}
@inject('lendings')
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

  renderOperating = (record: LendingItem, _: any, index: number) => {
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
      // productOption
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
    // const btns = con.getBtn()
    const switchStyle = {
      width: '325px',
      display: 'flex',
      'align-items': 'center'
    }
    return (
      <div className="list">
        <ListTitle>Disbursement management</ListTitle>
        <div className={styles.header}>
          <ListCondition
            data={searchData}
            // btnItems={btns}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
            // productSelectOptions={productOption}
          />
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
  tableChange = (pag: PaginationConfig, _: Record<keyof LendingItem, string[]>, sorter: SorterResult<LendingItem>) => {
    const { columnKey, order } = sorter
    const sorts = {
      page: pag.current ? pag.current : 1,
      per_page: pag.pageSize ? pag.pageSize : 10,
      sort_value: columnKey ? columnKey : '',
      sort_order: order === 'ascend' ? 'asc' : (order as string) === 'descend' ? 'desc' : ''
    }
    this.getLendingList({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 表格行按钮操作
  handleLoanCalcel = (v: LendingItem, type: string) => () => {
    type === 'cancel' ? this.cancelLoan(v) : this.makeLoanOrRetry(v.order_no)
  }

  // 弹窗
  // confrimStart = (confirm: Noop, type: string) => {
  //   const { title, text } = con.choseRight(type)
  //   console.log('弹出弹框')
  //   // this.props.dispatch(
  //   //   createConfirm({
  //   //     title: title,
  //   //     text: text,
  //   //     onOk: confirm,
  //   //     onCancel: this.closeConfirm
  //   //   })
  //   // )
  // }
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
    // this.props.dispatch(createCloseConfirm())
  }

  // 获取放款单列表
  getLendingList = (v?: LendingsPayload) => {
    const { getLendingList } = this.props.lendings
    const { request } = this.state
    // const auth = con.vertify(request) || con.vertifyTimes(request)
    // if (auth) {
    //   // TODO:全局报错相关错误信息
    //   // this.props.dispatch(createAlertError(auth))
    //   return
    // }
    getLendingList({ ...request, ...v })
    this.setState({ request: { ...this.state.request } })
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
