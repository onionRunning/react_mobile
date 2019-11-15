import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ListCondition from 'components/listCondition'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

import { intoDetail } from 'global/constants'
import { Trim, gotoDetail } from 'global/method'
import { MixProps } from 'global/interface'
import { ListItem } from 'components/select'
import ListTitle from 'components/listTitle'
import Table from 'components/table'
import { Data as ChangeData } from 'components/listCondition'
import { RepaymentListReq, RepaymentResItem } from 'interface/repayments'
import { userPermission } from 'design/permission'
import RepaymentProps from 'stores/repayments'
import Common from 'stores/common'

// import { getBtn } from '../lendings/const'
import { vertifyAmountTime, vertifyRangeAmount, vertifyTime } from './uitls'
import { turnToNumber, tableTitle, filterData } from './config'

import styles from './index.module.scss'

import 'global/list.scss'
import { repayments } from 'api/params'
interface Props extends MixProps {
  // page: 1
  data: RepaymentResItem[]
  status: boolean
  productOption: ListItem[]
  repayments: RepaymentProps
  common: Common
}

interface State {
  request: RepaymentListReq
  showRepayPop: boolean
  currentRepay?: RepaymentResItem
}

type RequestType = keyof RepaymentListReq

@inject('repayments', 'common')
@observer
export class Repayments extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // 初始化数据,包括页码和请求数据
    this.state = {
      request: {
        page: 1, // 当前页
        per_page: 10, // 每页数据条数
        sort_value: 'actual_loan_time', // 需要排序字段
        sort_order: 'desc' // 排序方法
      },
      showRepayPop: false
    }
  }

  // 进入页面初始化,请求数据
  componentDidMount() {
    this.getRepaymentList(this.state.request)
  }

  render() {
    const {
      status,
      productOption,
      repayments: { lists, page, total_count, page_count }
    } = this.props
    tableTitle[tableTitle.length - 1].render = this.renderOperating
    // const { repayment_func } = userPermission.finnalPermission!
    const pagination = {
      current: page,
      pageSize: page_count,
      total: total_count
    }
    return (
      <div className={styles.list}>
        <ListTitle>Repayment management</ListTitle>
        {/* 筛选功能 */}
        <div className={styles.header}>
          <ListCondition
            data={filterData}
            // btnItems={getBtn(repayment_func)}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
            productSelectOptions={productOption}
          />
        </div>
        {/* 表格 */}
        <div className="list-wapper">
          <Table
            tableTitle={tableTitle}
            tableData={lists}
            pagination={pagination}
            onChange={this.tableChange}
            loading={status}
          />
        </div>
      </div>
    )
  }

  renderOperating = (record: RepaymentResItem, _: string, index: number) => {
    const { repayment_func } = userPermission.finnalPermission!
    const names = `blue-color operating`
    return (
      <div>
        {repayment_func.p30101 && (
          <span className={names} onClick={this.toDetail(record)} id={`inquery-${index}`}>
            Inquire
          </span>
        )}
      </div>
    )
  }
  toDetail = (record: RepaymentResItem) => () => {
    gotoDetail(record, intoDetail.REPAYMENT)
  }

  // 处理筛选输入
  handleFilter = (item: ChangeData) => {
    // 默认去除前后空格
    item.value = Trim(item.value)

    // 符合条件的字段转成数值型数据
    if (turnToNumber.indexOf(item.key) > -1) item.value = item.value ? parseFloat(item.value) : undefined

    const obj: RepaymentListReq = { ...this.state.request }
    obj[item.key as RequestType] = item.value
    this.setState({ request: obj })
  }

  // 表格和分页操作
  tableChange = (
    pagination: PaginationConfig,
    filters: Record<keyof RepaymentResItem, string[]>,
    sorter: SorterResult<RepaymentResItem>
  ) => {
    const req = { ...this.state.request }
    // 翻页
    req.page = pagination.current as number
    req.per_page = pagination.pageSize as number
    // 排序
    req.sort_value = sorter.columnKey ? sorter.columnKey : req.sort_value
    req.sort_order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : ''
    // 更新数据
    this.setState(
      {
        request: req
      },
      this.getRepaymentList
    )
  }

  // 处理筛选的按钮点击, 根据type类型处理
  handleBtnClick = (type: string) => {
    if (type === 'inquire') {
      this.handleStartFilter()
    }
  }

  // 开始筛选
  handleStartFilter = () => {
    const { request } = this.state
    if (!this.verifyReq(request)) return
    this.setState(
      {
        request: {
          ...this.state.request,
          page: 1
        }
      },
      this.getRepaymentList
    )
  }
  //获取还款列表
  getRepaymentList = (v?: repayments.RepaymentListReq) => {
    const { request } = this.state
    const { getRepaymentList } = this.props.repayments
    this.props.common.composeLoading(this.tempFunc({ ...request, ...v }))
    getRepaymentList({ ...request, ...v })
  }
  tempFunc = (v?: repayments.RepaymentListReq) => () => {
    const { getRepaymentList } = this.props.repayments
    getRepaymentList({ ...v })
  }

  // 验证参数
  verifyReq = (request: RepaymentListReq): boolean => {
    const vertifyTimeErr = vertifyTime(
      request.actual_loan_start_date as string,
      request.actual_loan_end_date as string,
      'Disbursement succeed time'
    )
    if (vertifyTimeErr) {
      // this.startErrHint(vertifyTimeErr)
      return false
    }
    const vertifyAmountTimeErr = vertifyAmountTime(
      request.due_start_date as string,
      request.due_end_date as string,
      'Due date'
    )
    if (vertifyAmountTimeErr) {
      // this.startErrHint(vertifyAmountTimeErr)
      return false
    }
    const vertifyRangeAmountErr = vertifyRangeAmount(request.loan_amount_start, request.loan_amount_end)
    if (vertifyRangeAmountErr) {
      // this.startErrHint(vertifyRangeAmountErr)
      return false
    }
    const vertifyDudutionTimeErr = vertifyAmountTime(
      request.deduction_start_time as string,
      request.deduction_end_time as string,
      'Settlement time'
    )
    if (vertifyDudutionTimeErr) {
      // this.startErrHint(vertifyDudutionTimeErr)
      return false
    }
    return true
  }

  // 开启提示
  // startErrHint = (err: string) => {
  //   console.log(err)
  //   // this.props.dispatch(createAlertError(err))
  // }
}

export default Repayments
