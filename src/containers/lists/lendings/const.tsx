import React, { MouseEventHandler } from 'react'
import moment from 'moment'
import { formType } from 'global/constants'
import { formatTime, Trim } from 'global/method'
import { isNumber } from 'util'
import { LendingItem, LendingsPayload } from 'interface/lendings'
import errors from 'global/errors'
import { ORDER_TYPE_REFLECT } from '../orders/const'

// 筛选输入中,需要转换成数值行的数据
export const turnToNumber = ['loan_amount_start', 'loan_amount_end', 'loan_days']

// 筛选输入中,需要转换成数组的数据
export const turnToArray = ['product_names', 'order_type']
// 所有的产品
export const AllProduct = ['JetPeso']
export const Applicants = ['NewApplicationOrder', 'RepeatApplicationOrder']
export const RepeatClients = [
  'QualityApplicationOrder',
  'QualityApplicationOrderClassB',
  'QualityApplicationOrderClassC'
]

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

// 筛选配置信息
export const filterData = [
  {
    formType: formType.RANGE_TIME,
    label: 'Application time:',
    key: 'apply_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'apply_start_date'
      },
      end: {
        placeholder: 'end time',
        key: 'apply_end_date'
      }
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement Requisition time:',
    key: 'loan_request_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'request_loan_start_date'
      },
      end: {
        placeholder: 'end time',
        key: 'request_loan_end_date'
      }
    }
  },
  {
    formType: formType.RANGE_TIME, // p3.12.1生产希望区分放款时间（申请\成功）增加了一个筛选项， 增加在p3.12.2
    label: 'Disbursement succeed time:',
    key: 'loan_succeed_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'actual_loan_start_date'
      },
      end: {
        placeholder: 'end time',
        key: 'actual_loan_end_date'
      }
    }
  },
  {
    formType: formType.SEARCH,
    key: 'like_keyword',
    maxLength: 50, // 允许输入的最大长度
    placeholder: 'Search for loan ID or Name'
  },
  {
    formType: formType.SELECT,
    label: 'Loan Status:', // 筛选状态选择
    key: 'loan_status',
    data: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Create Loan', // 待放款
        value: 'CreateLoan'
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
    ]
  },
  {
    formType: formType.TREE_SELECT,
    label: 'Order formType:', // 订单类型
    key: 'order_type',
    data: [
      {
        title: 'Applicants',
        value: 'Applicants', // 数组时.默认显示第一个值
        key: 'Applicants',
        children: [
          {
            title: 'New Client',
            value: ['NewApplicationOrder'],
            key: 'NewApplicationOrder'
          },
          {
            title: 'Multiple Application',
            value: ['RepeatApplicationOrder'],
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
            value: ['QualityApplicationOrder'],
            key: 'QualityApplicationOrder'
          },
          {
            title: 'Repeat Client 02',
            value: ['QualityApplicationOrderClassB'],
            key: 'QualityApplicationOrderClassB'
          },
          {
            title: 'Repeat Client 03',
            value: ['QualityApplicationOrderClassC'],
            key: 'QualityApplicationOrderClassC'
          }
        ]
      }
    ]
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 所属产品 修改为英文，修改key字段
    key: 'product_names',
    data: [
      {
        label: 'All',
        value: 'all'
      },
      {
        label: 'JetPeso',
        value: 'JetPeso'
      }
    ]
  },
  {
    formType: formType.RANGE_INPUT,
    label: 'Loan Amount:',
    key: 'loan_amountd',
    range: {
      start: {
        placeholder: 'please enter amount',
        key: 'loan_amount_start'
      },
      end: {
        placeholder: 'please enter amount',
        key: 'loan_amount_end'
      }
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
  },
  {
    formType: formType.SELECT,
    label: 'Loan days:', // 贷款天数
    key: 'loan_days',
    data: [
      {
        label: 'All',
        value: 0
      },
      {
        label: '7',
        value: 7
      },
      {
        label: '14',
        value: 14
      }
    ]
  }
]

// 订单状态
export const orderStatus = {
  No: '', // 没有状态信息
  LoanFailed: 'Loan Failed', // 放款失败
  CreateLoan: 'Create Loan', // 创建放款单
  LoanProcessing: 'Loan Processing' // 放款中
}

// 表格滚动条设置
export const tableScroll = { x: 2900 }
export const setTime = (text: string) => formatTime(text)
export const setName = (name: string) => Trim(name)
export const setStatus = (text: StatusConfigKeys) => {
  const className = STATUS_CONFIG[text] ? STATUS_CONFIG[text].className : ''
  const label = STATUS_CONFIG[text] ? STATUS_CONFIG[text].label : ''
  return <span className={className}>{label}</span>
}

// 开关状态
export const switchStatus = {
  On: 'On',
  Off: 'Off'
}

export interface SearchType {
  key: string
  value?: string | number | string[]
}

// 放款按钮文字
export const MAKE_LOAN_TEXT = 'Make Loan'
// 重试按钮文字
export const RETRY_TEXT = 'Retry'
// 放款弹窗文字
export const CONFIREM_TITLE = 'Confirmation prom'
// 取消放款按钮文字
export const LOAN_CANCEL_TEXT = 'Loan cancellation'
// 线下放款方式
export const OFFLINE_LOAN = 'OFFLINE_LOAN'

/**
 * 根据订单状态显示放跨按钮和重新放款按钮
 * @param element
 * @param lending_func
 */
export const getMakeLoanText = (element: LendingItem): string => {
  const { loan_status } = element
  const { LoanFailed, CreateLoan } = orderStatus
  if (loan_status === LoanFailed) {
    return RETRY_TEXT
  }
  if (loan_status === CreateLoan) {
    return MAKE_LOAN_TEXT
  }
  return ''
}

// 根据订单状态显示取消贷款文字  1.贷款失败+权限 2.创建贷款+权限 3.线下放款+放款中+权限
export const getCancleLoanText = (element: LendingItem): string => {
  const { LoanFailed, CreateLoan, LoanProcessing, No } = orderStatus
  const { loan_status, loan_flow_status, loan_pay_type } = element
  if (loan_status === LoanFailed && loan_flow_status === LoanFailed) return LOAN_CANCEL_TEXT
  if (loan_status === CreateLoan && loan_flow_status === No) return LOAN_CANCEL_TEXT
  if (loan_status === LoanProcessing && loan_pay_type === OFFLINE_LOAN) return LOAN_CANCEL_TEXT
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

export const IsValid = (str: string | undefined | number): boolean => {
  return str === undefined || str === ''
}

// 校验金额函数
export const vertify = (state: LendingsPayload) => {
  const { loan_amount_start, loan_amount_end } = state!
  if (loan_amount_start! < 0) return errors.INPUT_CORRECT_START_AMOUNT
  if (loan_amount_end! < 0) return errors.INPUT_CORRECT_END_AMOUNT
  if (isNumber(loan_amount_start) && IsValid(loan_amount_end)) return errors.INPUT_END_AMOUNT
  if (isNumber(loan_amount_end) && IsValid(loan_amount_start)) return errors.INPUT_START_AMOUNT
  if (loan_amount_start! >= loan_amount_end!) return errors.START_AMOUNT_LESS_THAN_END_AMOUNT
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

export const commonVertify = (state: LendingsPayload, str: string) => {
  const start = state[`${str}_start_date` as keyof LendingsPayload]
  const end = state[`${str}_end_date` as keyof LendingsPayload]
  const name = showName(str)
  if (!start && end) return `please input ${name} start time`
  if (start && !end) return `please input ${name} end time`
  const maxTime = 30
  if (
    moment(end as string)
      .add(-maxTime, 'd')
      .isAfter(moment(start as string))
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
export const vertifyDownload = (request: LendingsPayload) => {
  const obj = { ...useless, ...request, page: '', per_page: '', sort_order: '', sort_value: '' }
  for (const k in obj) {
    if (obj[k as keyof typeof obj]) {
      return ''
    }
  }
  return 'Please select at least one option'
}
// 表格头部配置信息

export const getTableTitle = (cb?: (args: LendingItem, type: string) => MouseEventHandler<{}>) => {
  return [
    {
      title: 'Loan ID', // 订单编号
      dataIndex: 'order_no',
      width: '180px',
      fixed: 'left',
      key: 'order_no'
    },
    {
      title: 'Order type', // 订单类型: 复贷订单\新订单 p4.1.1
      dataIndex: 'order_type',
      width: '137px',
      key: 'order_type',
      render: (item: string) => {
        return <span>{ORDER_TYPE_REFLECT[item]}</span>
      }
    },
    {
      title: 'Name', // 客户姓名
      dataIndex: 'customer_name',
      width: '102px',
      key: 'customer_name'
    },
    {
      title: 'Application time', // 申请时间
      dataIndex: 'apply_time',
      width: '170px',
      key: 'apply_time',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: 'Disbursement Requisition time', // 请求放款时间
      dataIndex: 'request_loan_time',
      width: '250px',
      key: 'request_loan_time',
      sorter: true
    },
    {
      title: 'Loan Amount', // 贷款金额
      dataIndex: 'approved_principal',
      width: '167px',
      key: 'approved_principal'
    },
    {
      title: 'Disbursement Amount', // 实际放款金额
      dataIndex: 'loan_amount',
      width: '180px',
      key: 'loan_amount'
    },
    {
      title: 'Loan days', // 放款期限
      dataIndex: 'loan_days',
      width: '110px',
      key: 'loan_days'
    },
    {
      title: 'Loan status', // 订单状态
      dataIndex: 'loan_status',
      width: '150px',
      key: 'loan_status'
    },
    {
      title: 'Disbursement succeed time', // 成功放款时间-放款结果时间
      dataIndex: 'actual_loan_time',
      width: '250px',
      key: 'actual_loan_time',
      sorter: true
    },
    {
      title: 'Disbursement Status', // 放款流水状态
      dataIndex: 'loan_flow_status',
      width: '165px',
      key: 'loan_flow_status'
    },
    {
      title: 'Disbursement Ref number', // 放款流水号
      dataIndex: 'request_no',
      width: '220px',
      key: 'request_no'
    },
    {
      title: 'External RefNo', // p4.3.1需求 增加第三方放款码
      dataIndex: 'loan_pay_code',
      width: '130px',
      key: 'loan_pay_code'
    },
    {
      title: 'External Txnld', // p4.2.1紧急需求 增加第三方放款流水号
      dataIndex: 'out_flow_num',
      width: '190px',
      key: 'out_flow_num'
    },
    {
      title: 'Reason for Disbursement Failure', //放款失败原因
      dataIndex: 'err_msg',
      width: '260px',
      key: 'err_msg'
    },
    {
      title: 'Product', // 所属产品
      dataIndex: 'product_name',
      width: '120px',
      key: 'product_name'
    },
    {
      title: 'Pay channel', // 还款渠道
      dataIndex: 'pay_channel',
      width: '125px',
      key: 'pay_channel'
    },
    {
      title: 'Operating',
      dataIndex: '',
      fixed: 'right', // 固定在右侧
      width: 150,
      key: 'operating',
      render: (item: LendingItem, _: string, index: number) => {
        return (
          <div className="operatingWrap">
            <span onClick={cb!(item, 'makeOrRetry')} className={`blue-color operating`} id={`inquire-${index}`}>
              {getMakeLoanText(item)}
            </span>
            <span onClick={cb!(item, 'cancel')} className={`orange-color operating`} id={`inquire-${index}`}>
              {getCancleLoanText(item)}
            </span>
          </div>
        )
      }
    }
  ]
}
