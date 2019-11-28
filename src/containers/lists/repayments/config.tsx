import React, { MouseEventHandler } from 'react'
import { formType } from 'global/constants'
import { formatTime, formatDateDay } from 'global/method'

// 需要转换成数值型的输入字段
export const turnToNumber = ['loan_amount_start', 'loan_amount_end', 'loan_days']

export const getBtn = () => {
  return [
    {
      type: 'primary',
      key: 'query',
      text: 'Inquire',
      id: 'inquire-btn'
    }
  ]
}

//各种状态颜色
export const STATUS_CONFIG = {
  RepaymentProcessing: {
    label: 'Repayment Processing', // 还款中
    className: ''
  },
  RepaymentPaidOff: {
    label: 'Repayment PaidOff', // 结清
    className: 'green'
  },
  RepaymentOverdue: {
    label: 'Repayment Overdue', // 逾期
    className: 'red'
  }
}

// 筛选配置信息
export const filterData = [
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement succeed time:',
    key: 'disbursement_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'actual_loan_start_at'
      },
      end: {
        placeholder: 'end time',
        key: 'actual_loan_end_at'
      }
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Due date:',
    key: 'due_date', // 用于解决列表渲染key值的警告
    // disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'repay_date_start_at'
      },
      end: {
        placeholder: 'end time',
        key: 'repay_date_end_at'
      }
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Repayment time:',
    key: 'repayment_time',
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'paid_off_time_start_at'
      },
      end: {
        placeholder: 'end time',
        key: 'paid_off_time_end_at'
      }
    }
  },
  {
    formType: formType.SEARCH,
    key: 'order_no_customer_name',
    maxLength: 50,
    placeholder: 'Search for loan ID or Name'
  },
  {
    formType: formType.SELECT,
    label: 'Loan Status:',
    key: 'loan_status',
    data: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Repayment Processing', // 还款中
        value: 'RepaymentProcessing'
      },
      {
        label: 'Repayment PaidOff', // 已结清
        value: 'RepaymentPaidOff'
      },
      {
        label: 'Repayment Overdue', // 已逾期
        value: 'RepaymentOverdue'
      }
    ]
  },
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
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 修改为英文，修改key字段
    key: 'product_name',
    data: []
  },
  {
    formType: formType.SELECT,
    label: 'Loan days:', // 贷款天数
    key: 'loan_days',
    data: []
    // 接口获取剩下的贷款天数
  }
]
type ConfigType = keyof typeof STATUS_CONFIG

export const getTableTitle = (cb?: (args: {}, type: string) => MouseEventHandler<{}>) => {
  return [
    {
      title: 'Loan ID', // 订单编号
      dataIndex: 'order_no',
      key: 'order_no'
    },
    {
      title: 'Order type', // TODO 订单类型: 复贷订单\新订单 p4.1.1
      dataIndex: 'order_type',
      key: 'order_type'
    },
    {
      title: 'Name', // 客户姓名
      dataIndex: 'customer_name',
      key: 'customer_name'
    },
    {
      title: 'Disbursement succeed time', // 放款成功时间
      dataIndex: 'actual_loan_time',
      key: 'actual_loan_time',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (text: string) => {
        return <span>{formatTime(text)}</span>
      }
    },
    {
      title: 'Loan days', // 期限
      dataIndex: 'loan_days',
      key: 'loan_days'
    },
    {
      title: 'Loan Status', // 订单状态
      dataIndex: 'loan_status',
      key: 'status',
      render: (text: string) => {
        return (
          <span className={STATUS_CONFIG[text as ConfigType].className}>{STATUS_CONFIG[text as ConfigType].label}</span>
        )
      }
    },
    {
      title: 'Due date', // 本期应还日期
      dataIndex: 'due_date',
      key: 'due_date',
      sorter: true,
      render: (text: string) => {
        return <span>{formatDateDay(text)}</span>
      }
    },
    {
      title: 'Product name', // 订单来源\产品名称
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      title: 'Repayment time', //还款时间
      dataIndex: 'settled_at',
      key: 'settled_at',
      render: (text: string) => {
        return <span>{formatDateDay(text)}</span>
      }
    },
    {
      title: 'Operating',
      dataIndex: '',
      key: 'operating',
      width: 120,
      render: (item: {}, _: string, index: number) => {
        return (
          <>
            <span onClick={cb!(item, 'inquire')} className={`blue-color operating`} id={`inquire-${index}`}>
              Inquire
            </span>
          </>
        )
      }
    }
  ]
}
export interface ItemProps {
  customer_id?: number
  order_no?: string
  product_name?: string
  mobile_id?: number
  application_status?: string
}
