import { ReactText } from 'react'
// 证件类型
export const AllIdType = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'PRC',
    value: 'PRC'
  },
  {
    label: 'SSS',
    value: 'SSS'
  },
  {
    label: 'UMID',
    value: 'UMID'
  },
  {
    label: "Driver's license",
    value: "Driver's license"
  },
  {
    label: 'GSIS',
    value: 'GSIS'
  },
  {
    label: 'TIN',
    value: 'TIN'
  },
  {
    label: 'sssGsis',
    value: 'sssGsis'
  }
]

// 时间筛选框
export const TimeRange = (startKey: string, endKey: string) => {
  return {
    start: {
      placeholder: 'start time',
      key: startKey
    },
    end: {
      placeholder: 'end time',
      key: endKey
    }
  }
}

// 订单状态
export const OrderAllStatus = [
  {
    label: 'All', // 所有状态
    value: ''
  },
  {
    label: 'Create Application', // 新建申请
    value: 'CreateApplication'
  },
  {
    label: 'Initial Auditing Reject', // 初审拒绝
    value: 'InitialAuditingReject'
  },
  {
    label: 'Auto Auditing', // 机审中
    value: 'AutoAuditing'
  },
  {
    label: 'Auto Reject', // 机审拒绝
    value: 'AutoReject'
  },
  {
    label: 'Risk Control Reject', // 风控拒绝
    value: 'RiskControlReject'
  },
  {
    label: 'Waiting For ManualAuditing', // 待人工审核
    value: 'WaitingForManualAuditing'
  },
  {
    label: 'Manual Auditing', // 审核中
    value: 'ManualAuditing'
  },
  {
    label: 'Auditing Passed', // 审核通过
    value: 'AuditingPassed'
  },
  {
    label: 'Auditing Reject', // 审核拒绝
    value: 'AuditingReject'
  },
  {
    label: 'Auditing Return', // 审核退回
    value: 'AuditingReturn'
  },
  {
    label: 'Application Canceled', // 订单取消
    value: 'ApplicationCanceled'
  }
]

// 订单类型
export const OrderTypes = [
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
export const DEFAULT_CHOSE = [
  {
    label: 'All', // 所有来源
    value: ''
  }
]
// interface
export interface FillInfo {
  [p: string]: string | number | ReactText
}

// consts 常量申明
export const DEFAULT_PAGE = 1
export const DEFAULT_PER_PAGE = 10

export const ASC = 'ascend'
export const ASC_CHOSE = 'asc'
export const DESC = 'descend'
export const DESC_CHOSE = 'desc'
// 默认0页
// default function

export const getSortValue = (order: string) => {
  if (order === ASC) return ASC_CHOSE
  if (order === DESC) return DESC_CHOSE
  return ''
}
