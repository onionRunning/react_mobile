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
// 黑名单列表下的类型
export const black_type = [
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

// common
export interface ItemProps {
  customer_id?: number
  order_no?: string
  product_name?: string
  mobile_id?: number
}
export interface TempInfo {
  [p: string]: string | number
}

export const addFont = (val: TempInfo[], spec?: string) => {
  return [{ label: 'All', value: `${spec ? 0 : ''}` }, ...val]
}

type Product = string | number
export const handArr = (arr: Product[]) => {
  return arr.map(item => {
    return { label: item, value: item }
  })
}

// 人员特殊处理
export const handerPerson = (person: TempInfo[]) =>
  person.map(item => {
    return { label: item.name, value: item.id }
  })
//筛选操作人 添加System
export const filterPerson = (arr: TempInfo[]) => {
  const hasSystem = arr.find(item => item.value === 0)
  return hasSystem ? arr : arr.concat([{ label: 'System', value: 0 }])
}
// 数据填充
export const handleData = (config: TempInfo[], product: string) => {
  return config.findIndex(item => item.key === product)
}

export const selectHandler = (config: any[], product?: any, person?: TempInfo[]) => {
  const nConfig = [...config]
  const { loan_days = '', products = '' } = product ? product : {}
  products && (nConfig[handleData(config, 'product_name')].data = addFont(handArr(products || [])))
  loan_days && (nConfig[handleData(config, 'loan_days')].data = addFont(handArr(loan_days || []), 'special'))
  person && (nConfig[handleData(config, 'operator_id')].data = filterPerson(handerPerson(person!)))
  return nConfig
}
