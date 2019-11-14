import React from 'react'
import moment from 'moment'
import { formType } from 'global/constants'
import { formatTime, Trim } from 'global/method'
import { isNumber } from 'util'
import { LendingFunc } from 'design/interface'
import { LendingsPayload } from 'api/params'
import errors from 'global/errors'

// 筛选输入中,需要转换成数值行的数据
export const turnToNumber = ['loan_amount_start', 'loan_amount_end', 'loan_days']

export const getBtn = () => {
  return [
    {
      text: 'Inquire',
      type: 'default',
      key: 'query',
      id: 'inquire-btn'
    }
  ]
}

//各种状态颜色
export const STATUS_CONFIG = {
  'Create Loan': {
    label: 'Create Loan', // 待放款
    className: ''
  },
  'Loan Processing': {
    label: 'Loan Processing', // 放款中
    className: ''
  },
  'Loan Failed': {
    label: 'Loan Failed', // 放款失败
    className: 'red'
  },
  'Loan Canceled': {
    label: 'Loan Canceled', // 取消放款
    value: 'LoanCanceled',
    className: ''
  },
  'Loan Success': {
    label: 'Loan Success', // 放款成功
    className: 'green'
  }
}
type StatusConfigKeys = keyof typeof STATUS_CONFIG
interface TempType {
  className?: string
  label?: string
}

// 筛选配置信息
export const filterData = [
  {
    formType: formType.RANGE_TIME,
    label: 'Application time:',
    key: 'apply_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'apply_start_date',
        id: 'application-start-time'
      },
      end: {
        placeholder: 'End time',
        key: 'apply_end_date',
        id: 'application-end-time'
      }
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement requisition time:',
    key: 'loan_request_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'request_loan_start_date',
        id: 'request-loan-start-date'
      },
      end: {
        placeholder: 'End time',
        key: 'request_loan_end_date',
        id: 'request-loan-end-date'
      }
    }
  },
  // {
  //   formType: formType.SELECT,
  //   label: 'Product:', // 所属产品 修改为英文，修改key字段
  //   key: 'product_name',
  //   selectOptionType: 'product',
  //   data: [],
  //   id: 'product-name'
  // },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement succeed time:',
    key: 'loan_succeed_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'actual_loan_start_date',
        id: 'actual-loan-start-date'
      },
      end: {
        placeholder: 'End time',
        key: 'actual_loan_end_date',
        id: 'actual-loan-end-date'
      }
    }
  },
  {
    formType: formType.SEARCH,
    key: 'like_keyword',
    maxLength: 100, // 允许输入的最大长度
    placeholder: 'Search for loan ID or Name',
    id: 'search'
  },
  {
    formType: formType.SELECT,
    label: 'Loan Status:', // 筛选状态选择
    key: 'loan_status',
    data: [
      {
        label: 'Create Loan', // 待放款
        value: 'LoanCreate'
      },
      {
        label: 'Loan Processing', // 放款中
        value: 'LoanProcessing'
      },
      {
        label: 'Loan Failed', // 放款失败
        value: 'LoanFailed'
      },
      {
        label: 'Loan Canceled', // 取消放款
        value: 'LoanCanceled'
      },
      {
        label: 'Loan Success', // 放款成功
        value: 'LoanSuccess'
      }
    ],
    id: 'loan-status'
  },
  {
    formType: formType.TREE_SELECT,
    label: 'Order formType:',
    key: 'order_type',
    data: [
      {
        title: 'Applicants',
        value: 'Applicants',
        key: 'Applicants',
        children: [
          {
            title: 'New Client',
            value: 'NewApplicationOrder',
            key: 'NewApplicationOrder'
          },
          {
            title: 'Multiple Application',
            value: 'RepeatApplicationOrder',
            key: 'RepeatApplicationOrder'
          }
        ]
      },
      {
        title: 'Return Customers',
        value: 'RepeatClients',
        key: 'RepeatClients',
        children: [
          {
            title: 'Repeat Client 01',
            value: 'QualityApplicationOrder',
            key: 'QualityApplicationOrder'
          },
          {
            title: 'Repeat Client 02',
            value: 'QualityApplicationOrderClassB',
            key: 'QualityApplicationOrderClassB'
          },
          {
            title: 'Repeat Client 03',
            value: 'QualityApplicationOrderClassC',
            key: 'QualityApplicationOrderClassC'
          }
        ]
      }
    ]
  },
  {
    formType: formType.RANGE_INPUT,
    label: 'Loan amount:',
    key: 'loan_amountd',
    range: {
      start: {
        placeholder: 'Amount',
        key: 'loan_amount_start',
        type: 'number',
        id: 'loan-amount-start'
      },
      end: {
        placeholder: 'Amount',
        key: 'loan_amount_end',
        type: 'number',
        id: 'loan-amount-end'
      },
      maxLength: 12
    }
  },
  {
    formType: formType.SELECT,
    label: 'Pay channels:', // 渠道
    key: 'pay_channel',
    data: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'paymaya',
        value: 'PAYMAYA'
      },
      {
        label: 'dragonpay',
        value: 'DRAGONPAY'
      },
      {
        label: 'skypay',
        value: 'SKYPAY'
      }
    ]
  }
  // TODO:分期产品还有这个概念吗?
  // {
  //   formType: formType.SELECT,
  //   label: 'Loan days:', // 贷款天数
  //   key: 'loan_days',
  //   data: []
  //   // 接口获取剩下的贷款天数
  // }
]

// 订单状态
export const orderStatus = {
  No: '', // 没有状态信息
  LoanFailed: 'Loan Failed', // 放款失败
  CreateLoan: 'Loan Create', // 创建放款单
  LoanProcessing: 'Loan Processing' // 放款中
}

type SortType = 'descend' | 'ascend'

interface TableTile {
  title: string
  dataIndex: string
  key: string
  width?: number
  render?: (...arg: any[]) => React.ReactNode
  sorter?: boolean
  defaultSortOrder?: SortType
  fixed?: boolean | 'left' | 'right'
}
// 表格滚动条设置
export const tableScroll = { x: 2500, y: 500 }
export const setTime = (text: string) => formatTime(text)
export const setName = (name: string) => Trim(name)
export const setStatus = (text: StatusConfigKeys) => {
  const className = STATUS_CONFIG[text] ? STATUS_CONFIG[text].className : ''
  const label = STATUS_CONFIG[text] ? STATUS_CONFIG[text].label : ''
  return <span className={className}>{label}</span>
}

// 表格头部配置信息
export const tableTitle: TableTile[] = [
  {
    title: 'Loan ID', // 订单编号
    dataIndex: 'order_no',
    width: 150,
    fixed: 'left',
    key: 'order_no'
  },
  {
    title: 'Order type', // 订单类型
    dataIndex: 'order_type',
    width: 190,
    key: 'order_type'
  },
  {
    title: 'Name', // 客户姓名
    dataIndex: 'customer_name',
    width: 150,
    key: 'customer_name',
    render: setName
  },
  {
    title: 'Application time', // 申请时间
    dataIndex: 'apply_time',
    width: 180,
    key: 'apply_time',
    defaultSortOrder: 'descend',
    sorter: true,
    render: setTime
  },
  {
    title: 'Disbursement Requisition time', // 请求放款时间
    dataIndex: 'request_loan_time',
    width: 230,
    key: 'request_loan_time',
    sorter: true,
    render: setTime
  },
  {
    title: 'Loan Amount', // 贷款金额
    dataIndex: 'approved_principal',
    width: 140,
    key: 'approved_principal'
  },
  {
    title: 'Disbursement Amount', // 实际放款金额
    dataIndex: 'loan_amount',
    width: 190,
    key: 'loan_amount'
  },
  {
    title: 'Loan days', // 放款期限
    dataIndex: 'loan_days',
    width: 102,
    key: 'loan_days'
  },
  {
    title: 'Loan status', // 订单状态
    dataIndex: 'loan_status',
    width: 150,
    key: 'loan_status',
    render: setStatus
  },
  {
    title: 'Disbursement succeed time', // 成功放款时间-放款结果时间
    dataIndex: 'actual_loan_time',
    width: 212,
    key: 'actual_loan_time',
    sorter: true,
    render: setTime
  },
  {
    title: 'Disbursement Status', // 放款流水状态
    dataIndex: 'loan_flow_status',
    width: 157,
    key: 'loan_flow_status',
    render: setStatus
  },
  {
    title: 'Disbursement Ref number', // 放款流水号
    dataIndex: 'request_no',
    width: 220,
    key: 'request_no'
  },
  {
    title: 'External Txnld', // 第三方放款流水号
    dataIndex: 'out_flow_num',
    width: 190,
    key: 'out_flow_num'
  },
  {
    title: 'Reason for Disbursement Failure', //放款失败原因
    dataIndex: 'err_msg',
    width: 236,
    key: 'err_msg'
  },
  {
    title: 'Product', // 所属产品
    dataIndex: 'product_name',
    width: 92,
    key: 'product_name'
  },
  {
    title: 'Pay channel', // 还款渠道
    dataIndex: 'pay_channel',
    width: 136,
    key: 'pay_channel'
  },
  {
    title: 'Operating',
    dataIndex: '',
    fixed: 'right', // 固定在右侧
    width: 150,
    key: 'operating'
  }
]

// 开关状态
export const switchStatus = {
  On: 'On',
  Off: 'Off'
}

export interface SearchType {
  key: string
  value?: string | number
}

// 放款按钮文字
export const MAKE_LOAN_TEXT = 'Make Loan'
// 重试按钮文字
export const RETRY_TEXT = 'Retry'
// 放款弹窗文字
export const CONFIREM_TITLE = 'Confirmation prom'
// 取消放款按钮文字
export const LOAN_CANCEL_TEXT = 'Loan cancellation'

export interface ElementType {
  loan_status: string
  order_no: string
  product_name: string
  is_in_batch_loan: boolean
}

/**
 * 根据订单状态显示放跨按钮和重新放款按钮
 * @param element
 * @param lending_func
 */
export const getMakeLoanText = (element: ElementType, lending_func: LendingFunc): string => {
  const { loan_status, is_in_batch_loan } = element
  const { LoanFailed, CreateLoan } = orderStatus
  const { p20103, p20104 } = lending_func
  switch (true) {
    case loan_status === LoanFailed && p20104 && !is_in_batch_loan: // 重新放款: 放款失败+权限
      return RETRY_TEXT
    case loan_status === CreateLoan && p20103 && !is_in_batch_loan: // 放款: 创建放款+权限
      return MAKE_LOAN_TEXT
    default:
      return ''
  }
}

// 根据订单状态显示取消贷款文字  1.贷款失败+权限 2.创建贷款+权限 3.线下放款+放款中+权限
export const getCancleLoanText = (element: ElementType, lending_func: LendingFunc): string => {
  const { LoanFailed, CreateLoan, LoanProcessing } = orderStatus
  const { loan_status } = element
  const { p20105 } = lending_func
  if ((loan_status === LoanFailed || loan_status === CreateLoan) && p20105) {
    return LOAN_CANCEL_TEXT
  } else if (loan_status === LoanProcessing && lending_func.p20105) {
    // TODO: 差一个是否为线下放款的状态
    return LOAN_CANCEL_TEXT
  }
  return ''
}

//  选择合适的 title 和 text
export const choseRight = (type: string) => {
  let title, text
  if (type === 'cancel') {
    title = LOAN_CANCEL_TEXT
    text = 'Do you confirm the loan cancellation?'
  }
  if (type === 'makeOrRetry') {
    title = CONFIREM_TITLE
    text = 'Do you confirm this loan disbursement?'
  }
  return {
    title,
    text
  }
}

export const IsValid = (str: string | undefined): boolean => {
  return str === undefined || str === ''
}

// 校验金额函数
export const vertify = (state: any) => {
  const { loan_amount_start, loan_amount_end } = state
  if (loan_amount_start < 0) return errors.INPUT_CORRECT_START_AMOUNT
  if (loan_amount_end < 0) return errors.INPUT_CORRECT_END_AMOUNT
  if (isNumber(loan_amount_start) && IsValid(loan_amount_end)) return errors.INPUT_END_AMOUNT
  if (isNumber(loan_amount_end) && IsValid(loan_amount_start)) return errors.INPUT_START_AMOUNT
  if (loan_amount_start >= loan_amount_end) return errors.START_AMOUNT_LESS_THAN_END_AMOUNT
}

// 获取提示名称
export const showName = (name: string) => {
  switch (name) {
    case 'apply':
      return 'Application time'
    case 'request_loan':
      return 'Disbursement Requisition time'
    case 'actual_loan':
      return 'Disbursement succeed time'
    default:
      return name
  }
}

export const commonVertify = (state: any, str: string) => {
  const start = state[`${str}_start_date`]
  const end = state[`${str}_end_date`]
  const name = showName(str)
  if (!start && end) return `please input ${name} start time`
  if (start && !end) return `please input ${name} end time`
  const maxTime = 30
  if (
    moment(end)
      .add(-maxTime, 'd')
      .isAfter(moment(start))
  )
    return `Number of days between start and end in ${showName(name)} can't be more than ${maxTime}`
}

// 校验时间函数
export const vertifyTimes = (state: LendingsPayload) => {
  return commonVertify(state, 'apply') || commonVertify(state, 'request_loan') || commonVertify(state, 'actual_loan')
}

// 校验下载
export const useless = {
  startDate: '',
  endDate: '',
  approvedTimeStart: '',
  approvedTimeEnd: '',
  multiCondition: '',
  applicationStatus: '',
  operatorId: '',
  operatorName: '',
  sortValue: '',
  sortOrder: '',
  productName: ''
}
export const vertifyDownload = (request: any) => {
  const obj = { ...useless, ...request, page: '', per_page: '', sort_order: '', sort_value: '' }
  for (const k in obj) {
    if (obj[k]) {
      return ''
    }
  }
  return 'Please select at least one option'
}
