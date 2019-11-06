import React from 'react'
import { formatTime, Trim } from 'global/method'

type SortType = 'descend' | 'ascend'
interface TableTile {
  title: string
  dataIndex: string
  key: string
  width?: number
  render?: (...arg: any[]) => React.ReactNode
  sorter?: boolean
  defaultSortOrder?: SortType
}

export const setName = (name: string) => Trim(name)
export const setTime = (text: string) => formatTime(text)
export const setProduct = (text: string) => (text === 'QuickRupee' ? `M${text}` : text)

export const tableTitle: TableTile[] = [
  {
    title: 'Order number', // 订单编号
    dataIndex: 'order_no',
    key: 'order_no',
    width: 188
  },
  {
    title: 'Name',
    dataIndex: 'customer_full_name', // 客户姓名
    key: 'customer_full_name',
    width: 607,
    render: setName
  },
  {
    title: 'Application time', // 申请时间
    dataIndex: 'created_at',
    key: 'created_at',
    render: setTime,
    width: 200
  },
  {
    title: 'ID No.', // 证件号码
    dataIndex: 'id_num',
    key: 'id_num',
    width: 125
  },
  {
    title: 'ID type', // 证件类型
    dataIndex: 'id_type',
    key: 'id_type',
    width: 83
  },
  {
    title: 'Product', // 订单来源
    dataIndex: 'product_name',
    key: 'product_name',
    width: 112,
    render: setProduct
  },
  {
    title: 'Status', // 订单状态
    dataIndex: 'application_status',
    key: 'application_status',
    // render: (record: OrderListItem) => {
    //   const { application_status = '', exception_reason } = record
    //   return <p className={`${exception_reason ? 'red' : ''}`}>{application_status}</p>
    // },
    width: 144
  },
  {
    title: 'Operating',
    dataIndex: '',
    key: 'operating'
  }
]
