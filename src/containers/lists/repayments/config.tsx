import React from 'react'
import { formType } from 'global/constants'
import { formatTime, formatDateDay } from 'global/method'
import { RepaymentFunc } from 'design/interface'

// 需要转换成数值型的输入字段
export const turnToNumber = ['loan_amount_start', 'loan_amount_end', 'loan_days']

export const getBtn = (repayment_func: RepaymentFunc) => {
  return [
    {
      type: 'query',
      text: 'Inquire',
      id: 'inquire-btn'
    },
    {
      type: 'loaddown',
      className: 'sub-btn-grey',
      text: 'Download',
      id: 'download-btn',
      noShow: !repayment_func.p30102
    }
  ]
}

//各种状态颜色
export const STATUS_CONFIG = {
  RsProcessing: {
    label: 'Repayment Processing', // 还款中
    className: ''
  },
  RsPaidOff: {
    label: 'Repayment PaidOff', // 结清
    className: 'green'
  },
  RsOverdue: {
    label: 'Repayment Overdue', // 逾期
    className: 'red'
  }
}

// 筛选配置信息
export const filterData = [
  {
    formType: formType.SEARCH,
    key: 'like_keyword',
    maxLength: 100,
    placeholder: 'Search for loan ID or Name',
    id: 'search'
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement succeed time:',
    key: 'disbursement_time', // 用于解决列表渲染key值的警告
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
    formType: formType.RANGE_TIME,
    label: 'Due date:',
    key: 'due_date', // 用于解决列表渲染key值的警告
    disabledDate: false,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'due_start_date',
        id: 'due-start-date'
      },
      end: {
        placeholder: 'End time',
        key: 'due_end_date',
        id: 'due-end-date'
      }
    }
  },
  {
    formType: formType.RANGE_INPUT,
    label: 'Loan amount:',
    key: 'loan_amountd',
    range: {
      start: {
        type: 'number',
        placeholder: 'Amount',
        key: 'loan_amount_start',
        id: 'loan-amount-start'
      },
      end: {
        type: 'number',
        placeholder: 'Amount',
        key: 'loan_amount_end',
        id: 'loan-amount-end'
      },
      maxLength: 12
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Settlement time:',
    key: 'deduction_date',
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'deduction_start_time',
        id: 'settlement-start-time'
      },
      end: {
        placeholder: 'End time',
        key: 'deduction_end_time',
        id: 'settlement-end-time'
      }
    }
  },
  {
    formType: formType.SELECT,
    label: 'Loan status:',
    key: 'repayment_schedule_status',
    data: [
      {
        label: 'Repayment Processing', // 还款中
        value: 'RsProcessing'
      },
      {
        label: 'Repayment PaidOff', // 已结清
        value: 'RsPaidOff'
      },
      {
        label: 'Repayment Overdue', // 已逾期
        value: 'RsOverdue'
      }
    ],
    id: 'repayment-status'
  },
  // {
  //   formType: formType.SELECT,
  //   label: 'Product:', // 修改为英文，修改key字段
  //   key: 'product_name',
  //   selectOptionType: 'product',
  //   data: [],
  //   id: 'product-name'
  // },
  {
    formType: formType.TREE_SELECT,
    label: 'Order type:', // 订单类型
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
  }
]
type ConfigType = keyof typeof STATUS_CONFIG

type SortType = 'descend' | 'ascend'

interface TableTile {
  title: string
  dataIndex: string
  key: string
  width: number
  render?: (...arg: any[]) => React.ReactNode
  sorter?: boolean
  defaultSortOrder?: SortType
}
// 表格头部配置信息
export const tableTitle: TableTile[] = [
  {
    title: 'Loan ID', // 订单编号
    dataIndex: 'order_no',
    key: 'order_no',
    width: 200
  },
  {
    title: 'Disbursement succeed time', // 放款成功时间
    dataIndex: 'actual_loan_time',
    key: 'actual_loan_time',
    defaultSortOrder: 'descend' as SortType,
    sorter: true,
    render: (text: string) => {
      return <span>{formatTime(text)}</span>
    },
    width: 220
  },
  {
    title: 'Name', // 客户姓名
    dataIndex: 'customer_name',
    key: 'customer_name',
    width: 300,
    render: (name: string) => {
      return <span dangerouslySetInnerHTML={{ __html: name.replace(/ /g, '&nbsp') }} />
    }
  },
  {
    title: 'Loan amount', // 贷款金额
    dataIndex: 'loan_principal',
    key: 'loan_principal',
    width: 100
  },
  {
    title: 'Loan term', // 期限
    dataIndex: 'loan_days',
    key: 'loan_days',
    width: 100
  },
  {
    title: 'Loan status', // 订单状态
    dataIndex: 'repayment_schedule_status',
    key: 'repayment_schedule_status',
    render: (text: string) => {
      return (
        <span className={STATUS_CONFIG[text as ConfigType].className}>{STATUS_CONFIG[text as ConfigType].label}</span>
      )
    },
    width: 180
  },
  {
    title: 'Settlement time', // 结清时间
    dataIndex: 'actual_paid_off_date',
    key: 'actual_paid_off_date',
    render: (text: string) => {
      return <span>{formatTime(text || '')}</span>
    },
    width: 150
  },
  {
    title: 'Due date', // 本期应还日期
    dataIndex: 'due_date',
    key: 'due_date',
    sorter: true,
    render: (text: string) => {
      return <span>{formatDateDay(text)}</span>
    },
    width: 150
  },
  {
    title: 'Amount due', // 应还金额
    dataIndex: 'repay_amount',
    key: 'repay_amount',
    width: 120
  },
  {
    title: 'Product name', // 订单来源\产品名称
    dataIndex: 'product_name',
    key: 'product_name',
    width: 120
  },
  {
    title: 'Operating',
    dataIndex: '',
    key: 'operating',
    width: 120
  }
]
