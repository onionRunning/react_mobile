import React from 'react'
import { formType } from 'global/constants'
import { formatTime, formatOfOrderType } from 'global/method'
import { AllIdType, TimeRange, black_type, DEFAULT_CHOSE } from '../const'

export const turnToNumber = ['operator_id']

export const reflectStr = (str: string) => {
  if (!str) return ''
  return str
    .replace('ManuallyAddedBlacklist', 'BlackList 1')
    .replace('OverdueBlacklist', 'BlackList 2')
    .replace('/', ',')
}
// 列表选项配置(表头)
export const tabBlackTitle = () => [
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
    dataIndex: 'customer_phone',
    key: 'customer_phone'
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
    title: 'ID type',
    dataIndex: 'id_type',
    key: 'id_type'
  },
  {
    title: 'ID No',
    dataIndex: 'id_number',
    key: 'id_number'
  },
  {
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status'
  },
  {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name'
  },
  {
    title: 'Reviewer',
    dataIndex: 'operator_name',
    key: 'operator_name'
  },
  {
    title: 'tag',
    dataIndex: 'blacklist_type',
    key: 'blacklist_type',
    render: (str: string) => {
      return <span>{reflectStr(str)}</span>
    }
  }
]

// 筛选项配置

export const searchBlackConfig = [
  {
    formType: formType.RANGE_TIME,
    label: 'Review time:',
    key: 'time2',
    disabledDate: true,
    range: TimeRange('approved_time_start', 'approved_time_end')
  },
  {
    formType: formType.SEARCH,
    key: 'multi_condition',
    maxLength: 50,
    placeholder: 'Search for loan ID, ID number, Name, Phone'
  },
  {
    formType: formType.SELECT,
    label: 'Status:',
    key: 'application_status',
    data: black_type
  },
  {
    formType: formType.SELECT,
    label: 'ID type:',
    key: 'id_type',
    data: AllIdType
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 产品
    key: 'product_name',
    data: DEFAULT_CHOSE
  },
  {
    formType: formType.SELECT,
    label: 'Reviewer:', // 审核人
    key: 'operator_id',
    data: DEFAULT_CHOSE
  }
]

// btn 按钮
export const blackBtnItems = () => {
  return [
    {
      type: 'primary',
      key: 'inquire',
      text: 'Inquire'
    },
    {
      type: 'black',
      className: 'sub-btn',
      key: 'add_black',
      text: 'Add Black',
      hasPermission: true
    }
  ]
}

//
export const getOrderNo = (chose: number[], all: Record<string, string | number>[]) => {
  return chose
    .map(item => {
      for (let i = 0; i < all.length; i++) {
        if (item === all[i].id) {
          return all[i].order_no
        }
      }
      return null
    })
    .filter(item => item)
}
// init state
export const initRequest = {
  page: 1,
  per_page: 10,
  sort_value: 'application_finish_time', // 需要排序字段
  sort_order: 'desc' // 排序的方法 asc desc
}

// consts
export const EXIT = 'exit'
export const addText = 'are you sure add black list!'

// interface
