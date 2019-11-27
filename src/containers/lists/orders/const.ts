import { ReactText } from 'react'

// 订单 状态映射
export const ORDER_TYPE_REFLECT: TempInfo = {
  NewApplicationOrder: 'New Client',
  RepeatApplicationOrder: 'Multiple Application',
  QualityApplicationOrder: 'Repeat Client 01',
  QualityApplicationOrderClassB: 'Repeat Client 02',
  QualityApplicationOrderClassC: 'Repeat Client 03'
}

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
    label: 'Auto Auditing', // 机审中
    value: 'AutoAuditing'
  },
  {
    label: 'Auto Reject', // 机审拒绝
    value: 'AutoReject'
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
  },
  {
    label: 'JetPeso',
    value: 'JetPeso'
  }
]

export const DEFAULT_LOAN_DAYS = [
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
  application_status?: string
}
export interface TempInfo {
  [p: string]: string | number
}

export const addFont = (val: TempInfo[], spec?: string) => {
  return [{ label: 'All', value: `${spec ? 0 : ''}` }, ...val]
}

type Product = string | number
export const handArr = (arr: Product[]) => {
  if (!Array.isArray(arr)) return [{ label: 'All', value: '' }]
  return arr.map((item: Product) => {
    return { label: item, value: item }
  })
}

// 人员特殊处理
export const handerPerson = (person: TempInfo[]) => {
  if (!Array.isArray(person)) return [{ label: 'All', value: '' }]
  return person.map((item: TempInfo) => {
    return { label: item.name, value: item.id }
  })
}
//筛选操作人 添加System
export const filterPerson = (arr: TempInfo[]) => {
  const hasSystem = arr.find((item: TempInfo) => item.value === 0)
  return hasSystem ? arr : arr.concat([{ label: 'System', value: 0 }])
}
// 数据填充
export const handleData = (config: TempInfo[], product: string) => {
  return config.findIndex((item: TempInfo) => item.key === product)
}

export interface ProductProps {
  products: string[]
  loan_days: number[]
}
export const handlerSelectCont = (config: any[], product?: ProductProps, person?: any[]) => {
  const nConfig = [...config]
  // const { loan_days, products } = product!
  // const productContent = nConfig[handleData(config, 'product_name')]
  // const dayContent = nConfig[handleData(config, 'loan_days')]
  const operateContent = nConfig[handleData(config, 'operator_id')]
  // productContent && (productContent.data = addFont(handArr(products)!))
  // dayContent && (dayContent.data = addFont(handArr(loan_days)!, 'special'))
  operateContent && (operateContent.data = filterPerson(handerPerson(person!)!))
  return nConfig
}
// antd chose
export interface RowProps<T> {
  selectedRowKeys?: string[] | number[]
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void
}
