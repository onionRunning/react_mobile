import React, { ReactText, MouseEventHandler } from 'react'
import { formatTime, formatTf } from 'global/method'
import hint from 'global/hints'
import { formType } from 'global/constants'
// import { userPermission } from 'design/permission'
import {
  AllIdType,
  TimeRange,
  OrderAllStatus,
  OrderTypes,
  DEFAULT_LOAN_DAYS,
  DEFAULT_CHOSE,
  ORDER_TYPE_REFLECT
} from '../const'
import { TableTile } from 'global/interface'
// interface
export interface FillInfo {
  [p: string]: string | number | ReactText
}

// consts
export const turnToNumber = ['operator_id', 'loan_days']

export const initRequest = {
  page: 1,
  per_page: 10,
  loan_days: 0,
  sort_value: 'created_at',
  sort_order: 'asc',
  product_name: 'JetPeso'
}

export const GRAB = hint.GRAB_SUCCESS

// 表格模块
export const getTableTitle = (clickCallback: (args: {}) => MouseEventHandler<{}>): TableTile[] => {
  return [
    {
      // 订单编号
      title: 'Loan ID',
      dataIndex: 'order_no',
      key: 'order_no'
    },
    {
      // 订单类型: 复贷订单\新订单 p4.1.1
      title: 'Order type',
      dataIndex: 'order_type',
      key: 'order_type',
      render: (item: string) => {
        return <span>{ORDER_TYPE_REFLECT[item]}</span>
      }
    },
    {
      // 客户姓名
      title: 'Name',
      dataIndex: 'customer_full_name',
      key: 'customer_full_name'
    },
    {
      // 申请时间
      title: 'Application time',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      defaultSortOrder: 'ascend',
      render: (time: string) => {
        return <span>{formatTime(time)}</span>
      }
    },
    {
      // 证件号码
      title: 'ID No',
      dataIndex: 'id_number',
      key: 'id_number'
    },
    {
      // 证件类型
      title: 'ID type',
      dataIndex: 'id_type',
      key: 'id_type'
    },
    {
      // 订单状态
      title: 'Status',
      dataIndex: 'application_status',
      key: 'application_status',
      render: (item: string) => {
        return <span>{formatTf(item)}</span>
      }
    },
    {
      // 订单来源
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      // 放款天数
      title: 'Loan days',
      dataIndex: 'loan_days',
      key: 'loan_days'
    },
    {
      title: 'Operating',
      dataIndex: '',
      key: 'operating',
      render: (item: {}, _: string, index: number) => {
        return (
          <span onClick={clickCallback(item)} className={`blue-color operating`} id={`inquire-${index}`}>
            {'Inquire'}
          </span>
        )
      }
    }
  ]
}

// 筛选条件
export const filterData = [
  {
    formType: formType.RANGE_TIME,
    label: 'Application time:',
    key: 'time',
    disabledDate: true,
    range: TimeRange('start_date', 'end_date')
  },
  {
    formType: formType.SEARCH,
    key: 'multi_condition',
    maxLength: 50,
    placeholder: 'Search for loan ID, ID number ,Name'
  },
  {
    formType: formType.TREE_SELECT,
    // 订单类型
    label: 'Order type:',
    key: 'order_type',
    data: OrderTypes
  },
  {
    formType: formType.SELECT,
    // 证件类型
    label: 'ID type:',
    key: 'id_type',
    data: AllIdType
  },
  {
    formType: formType.SELECT,
    // 筛选状态选择
    label: 'Status:',
    key: 'application_status',
    data: OrderAllStatus
  },
  {
    // 贷款天数
    formType: formType.SELECT,
    label: 'Loan days:',
    key: 'loan_days',
    data: DEFAULT_LOAN_DAYS
  },
  {
    // 所属产品
    formType: formType.SELECT,
    label: 'Product:',
    key: 'product_name',
    data: DEFAULT_CHOSE
  }
]

// interface
export interface SorterProps {
  columnKey: string
  order: 'descend' | 'ascend'
}
