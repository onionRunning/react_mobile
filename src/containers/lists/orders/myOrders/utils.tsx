import React, { ReactText } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { formatTime, formatTf } from 'global/method'
import hint from 'global/hints'
import { formType } from 'global/constants'
import { userPermission } from 'design/permission'
import { AllIdType, TimeRange, OrderAllStatus, OrderTypes } from '../const'
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
  sort_order: 'asc'
}

export const GRAB = hint.GRAB_SUCCESS
// function

// 表格模块

export const geTableTitle = (): ColumnProps<object>[] => [
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
    key: 'order_type'
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
    dataIndex: 'id_num',
    key: 'id_num'
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
      return <p>{formatTf(item)}</p>
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
    render: (_: string, _record: any, index: number) => {
      const { my_order_func } = userPermission.finnalPermission!
      return (
        <span className={'blue-color operating'} id={`inquire-${index}`}>
          {my_order_func.p10201 && 'Inquire'}
        </span>
      )
    }
  }
]

// 筛选条件
export const filterData: any = [
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
    formType: formType.TREE_SELECT,
    // 订单类型
    label: 'Order type:',
    key: 'order_type',
    data: OrderTypes
  },
  {
    // 所属产品
    formType: formType.SELECT,
    label: 'Product:',
    key: 'product_name',
    data: [{ label: 'All', value: '' }]
  },
  {
    // 贷款天数
    formType: formType.SELECT,
    label: 'Loan days:',
    key: 'loan_days',
    data: []
  }
]
