import React, { MouseEventHandler } from 'react'
import { formatTime } from 'global/method'
import { formType } from 'global/constants'

import { AllIdType, TimeRange, TempInfo } from '../const'

// 黑名单映射关系
export const blackReflect = {
  ManuallyAddedBlacklist: 'BlackList 1',
  OverdueBlacklist: 'BlackList 2'
}
type BlackType = 'ManuallyAddedBlacklist' | 'OverdueBlacklist'
// 需要转换成数值型数据的字段
export const turnToNumber = ['operator_id']

// 表格头部配置信息
export const getTableTitle = (clickCallback: (args: {}) => MouseEventHandler<{}>) => [
  {
    title: 'Loan ID', // 订单编号
    dataIndex: 'order_no',
    key: 'order_no'
  },
  {
    title: 'Name', // 姓名
    dataIndex: 'customer_name',
    key: 'customer_name'
  },
  {
    title: 'Phone', // 手机号码
    dataIndex: 'phone_number',
    key: 'phone_number'
  },
  {
    title: 'ID type', // 证件类型1
    dataIndex: 'id_type',
    key: 'id_type'
  },
  {
    title: 'ID No', // 证件号码1
    dataIndex: 'id_number',
    key: 'id_number'
  },
  {
    title: 'Status',
    dataIndex: 'order_status', // 订单状态
    key: 'order_status'
  },
  {
    title: 'Blacklist Type', // 黑名单类型
    dataIndex: 'blacklist_type',
    key: 'blacklist_type',
    render: (black_type: BlackType) => {
      return <span>{blackReflect[black_type]}</span>
    }
  },
  {
    title: 'Product', // 产品
    dataIndex: 'product_name',
    key: 'product_name'
  },
  {
    title: 'Add blacklist time', // 添加时间
    dataIndex: 'added_at',
    key: 'added_at',
    sorter: true, // p4.3.1添加sorter
    defaultSortOrder: 'descend',
    render: (added_at: string) => {
      return <span>{formatTime(added_at)}</span>
    }
  },
  {
    title: 'Operator', // add
    dataIndex: 'add_operator_name',
    key: 'add_operator_name'
  },
  {
    title: 'Operating',
    dataIndex: '',
    key: 'operating',
    render: (item: TempInfo, _: string, index: number) => {
      return (
        <span onClick={clickCallback(item)} className={'blue-color operating'} id={`inquire-${index}`}>
          {'Inquire'}
        </span>
      )
    }
  }
]

// 筛选项配置信息
export const filterConfig = [
  {
    formType: formType.RANGE_TIME,
    label: 'Add blacklist time:',
    key: 'time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: TimeRange('add_blacklist_time_start', 'add_blacklist_time_end')
  },
  {
    formType: formType.SEARCH,
    key: 'multi_like_query_value',
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
    label: 'Blacklist type:',
    key: 'blacklist_type',
    data: [
      { label: 'BlackList 1', value: 'ManuallyAddedBlacklist' },
      { label: 'BlackList 2', value: 'OverdueBlacklist' }
    ]
  },
  {
    formType: formType.SELECT,
    label: 'Status:',
    key: 'order_status',
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
    label: 'Operator:', // 人
    key: 'operator_id',
    data: []
  }
]

// 按钮
export const btnItems = () => {
  return [
    {
      type: 'primary',
      key: 'inquery',
      text: 'Inquire'
    },
    {
      type: 'blue',
      className: 'sub-btn',
      key: 'remove',
      text: 'Remove blacklist'
    },
    {
      type: 'black',
      key: 'download',
      className: 'sub-btn-blue',
      text: 'Export order'
    }
  ]
}

// ===================
// consts

export const initRequest = {
  page: 1, // 当前页码
  per_page: 10, // 页码大小，每页条数
  sort_value: 'added_at', // p4.3.1添加排序
  sort_order: 'desc'
}
