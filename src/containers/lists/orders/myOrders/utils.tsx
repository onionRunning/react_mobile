import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import { formatTime } from 'global/method'
import { formType } from 'global/constants'
import { userPermission } from 'design/permission'
import { AllIdType, TimeRange, OrderAllStatus, OrderTypes } from '../const'
// consts
export const turnToNumber = ['operator_id', 'loan_days']

// function

// 表格模块
export const geTableTitle = (): ColumnProps<object>[] => [
  {
    title: 'Loan ID', // 订单编号
    dataIndex: 'order_no',
    key: 'order_no'
  },
  {
    title: 'Order type', // 订单类型: 复贷订单\新订单 p4.1.1
    dataIndex: 'order_type',
    key: 'order_type'
  },
  {
    title: 'Name',
    dataIndex: 'customer_full_name', // 客户姓名
    key: 'customer_full_name'
  },
  {
    title: 'Application time', // 申请时间
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: true,
    defaultSortOrder: 'ascend',
    render: (time: string) => {
      return <span>{formatTime(time)}</span>
    }
  },
  {
    title: 'ID No', // 证件号码
    dataIndex: 'id_num',
    key: 'id_num'
  },
  {
    title: 'ID type', // 证件类型
    dataIndex: 'id_type',
    key: 'id_type'
  },
  {
    title: 'Status', // 订单状态
    dataIndex: 'application_status',
    key: 'application_status',
    render: (item: string) => {
      return <p>{formatTime(item)}</p>
    }
  },
  {
    title: 'Product', // 订单来源
    dataIndex: 'product_name',
    key: 'product_name'
  },
  {
    title: 'Loan days', // 放款天数
    dataIndex: 'loan_days',
    key: 'loan_days'
  },
  {
    title: 'Operating',
    dataIndex: '',
    key: 'operating',
    render: (_: any, _record: any, index: number) => {
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
    key: 'time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: TimeRange
  },
  {
    formType: formType.SEARCH,
    key: 'multi_condition',
    maxLength: 50,
    placeholder: 'Search for loan ID, ID number ,Name'
  },
  {
    formType: formType.SELECT,
    label: 'ID type:', // 证件类型
    key: 'id_type',
    data: AllIdType
  },
  {
    formType: formType.SELECT,
    label: 'Status:', // 筛选状态选择
    key: 'application_status',
    data: OrderAllStatus
  },
  {
    formType: formType.TREE_SELECT,
    label: 'Order type:', // 订单类型
    key: 'order_type',
    data: OrderTypes
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 所属产品
    key: 'product_name',
    data: [{ label: 'All', value: '' }]
  },
  {
    formType: formType.SELECT,
    label: 'Loan days:', // 贷款天数
    key: 'loan_days',
    data: []
  }
]
