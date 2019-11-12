import React from 'react'
import { formType } from 'global/constants'
import { formatTime, formatOfOrderType } from 'global/method'
// import { userPermission } from 'design/permission'
import { AllIdType } from '../const'

export const turnToNumber = ['operator_id']

export const reflectStr = (str: string) => {
  if (!str) return ''
  return str
    .replace('ManuallyAddedBlacklist', 'BlackList 1')
    .replace('OverdueBlacklist', 'BlackList 2')
    .replace('/', ',')
}

export const BlackType: any = [
  {
    label: 'BlackList 1',
    value: 'ManuallyAddedBlacklist'
  },
  {
    label: 'BlackList 2',
    value: 'OverdueBlacklist'
  }
]
// 列表选项配置(表头)
export const tabBlackTitle = (): any => [
  {
    title: 'Loan ID',
    dataIndex: 'order_no',
    key: 'order_no'
  },
  {
    title: 'Order type',
    dataIndex: 'order_type',
    key: 'order_type',
    render: (order_type: string) => {
      return formatOfOrderType(order_type)
    }
  },
  {
    title: 'Name',
    dataIndex: 'customer_full_name',
    key: 'customer_full_name'
  },
  {
    title: 'Phone',
    dataIndex: 'customer_phone_num',
    key: 'customer_phone_num'
  },
  {
    title: 'Review time',
    dataIndex: 'application_finish_time',
    key: 'application_finish_time',
    defaultSortOrder: 'descend',
    sorter: true,
    render: (time: string) => {
      return <span>{formatTime(time)}</span>
    }
  },
  {
    title: 'ID type1',
    dataIndex: 'id_type',
    key: 'id_type'
  },
  {
    title: 'ID No1',
    dataIndex: 'id_num',
    key: 'id_num'
  },
  {
    title: 'ID type2',
    dataIndex: 'id_type_2',
    key: 'id_type_2'
  },
  {
    title: 'ID No2',
    dataIndex: 'id_num_2',
    key: 'id_num_2'
  },
  {
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status'
  },
  {
    // 黑名单类型
    title: 'Black Type',
    dataIndex: 'blacklist_type',
    key: 'blacklist_type',
    render: (str: string) => {
      return <span>{reflectStr(str)}</span>
    }
  },
  {
    // 所属产品
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name'
  },
  {
    title: 'Reviewer',
    dataIndex: 'operator_name',
    key: 'operator_name'
  }
]

// 筛选项配置

export const searchBlackConfig: any = [
  {
    formType: formType.RANGE_TIME,
    label: 'Review time:',
    key: 'time2',
    disabledDate: true,
    range: {
      start: {
        placeholder: 'start time',
        key: 'approved_time_start'
      },
      end: {
        placeholder: 'end time',
        key: 'approved_time_end'
      }
    }
  },
  {
    formType: formType.SEARCH,
    key: 'multi_condition',
    maxLength: 50,
    placeholder: 'Search for loan ID, ID number, Name, Phone'
  },
  {
    formType: formType.SELECT,
    label: 'ID type:',
    key: 'id_type',
    data: AllIdType
  },
  {
    formType: formType.SELECT,
    label: 'Status:',
    key: 'application_status',
    data: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Risk Control Reject',
        value: 'RiskControlReject'
      },
      {
        label: 'Auditing Passed',
        value: 'AuditingPassed'
      },
      {
        label: 'Initial Auditing Reject',
        value: 'InitialAuditingReject'
      },
      {
        label: 'Auto Reject',
        value: 'AutoReject'
      },
      {
        label: 'Auditing Reject',
        value: 'AuditingReject'
      },
      {
        label: 'Application Canceled',
        value: 'ApplicationCanceled'
      }
    ]
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 产品
    key: 'product_name',
    data: [
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Peso2go',
        value: 'Peso2go'
      },
      {
        label: 'CashNiJuan',
        value: 'CashNiJuan'
      },
      {
        label: 'JetPeso',
        value: 'JetPeso'
      }
    ]
  },
  {
    formType: formType.SELECT,
    label: 'Reviewer:', // 审核人
    key: 'operator_id',
    data: [
      {
        label: 'All',
        value: ''
      }
    ]
  }
]

// btn 按钮
export const blackBtnItems = () => {
  return [
    {
      type: 'query',
      text: 'Inquire'
    },
    {
      type: 'add',
      className: 'sub-btn',
      text: 'Add Black',
      hasPermission: true
    }
  ]
}

//
export const getOrderNo = (chose: number[], all: any[]) => {
  return chose
    .map(item => {
      for (var i = 0; i < all.length; i++) {
        if (item === all[i].id) {
          return all[i].order_no
        }
      }
      return null
    })
    .filter(item => item)
}
