import React, { MouseEventHandler } from 'react'
import { formType } from 'global/constants'
import { formatTime, formatTf } from 'global/method'
import { AllIdType, TimeRange, OrderAllStatus, OrderTypes, DEFAULT_CHOSE } from '../const'

// 需要转换成数值型数据的字段
export const turnToNumber = ['operator_id', 'loan_days']

// 筛选配置信息
export const filterData = [
  {
    formType: formType.RANGE_TIME,
    label: 'Application time:',
    key: 'time',
    disabledDate: true,
    range: TimeRange('start_date', 'end_date')
  },
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
    maxLength: 100,
    placeholder: 'search for loan ID,ID NO,Name'
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
    formType: formType.SELECT,
    // 所属产品
    label: 'Product:',
    key: 'product_name',
    data: DEFAULT_CHOSE
  },
  {
    formType: formType.SELECT,
    label: 'Loan days:', // 贷款天数
    key: 'loan_days',
    data: []
  },
  {
    formType: formType.SELECT,
    label: 'Reviewer:', // 审核人
    key: 'operator_id',
    data: DEFAULT_CHOSE
  }
]
// 筛选部分按钮配置信息
export const btnItems = () => {
  return [{ type: 'primary', key: 'inquery', text: 'Inquire' }]
}

export const getTabTitle = (clickCallback: (args: {}) => MouseEventHandler<{}>) => {
  return [
    {
      title: 'Loan ID',
      dataIndex: 'order_no',
      key: 'order_no'
    },
    {
      title: 'Order type', // 订单类型: 复贷订单\新订单 p4.1.1
      dataIndex: 'order_type',
      key: 'order_type',
      render: (record: string) => {
        return record
      }
    },
    {
      title: 'Name',
      dataIndex: 'customer_full_name',
      key: 'customer_full_name'
    },
    {
      title: 'Application time',
      dataIndex: 'created_at',
      key: 'created_at',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (record: string) => {
        return <span>{formatTime(record)}</span>
      }
    },
    {
      title: 'Review time',
      dataIndex: 'application_finish_time',
      key: 'application_finish_time',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (record: string) => {
        return <span>{formatTime(record)}</span>
      }
    },
    {
      title: 'ID No',
      dataIndex: 'id_num',
      key: 'id_num'
    },
    {
      title: 'ID type',
      dataIndex: 'id_type',
      key: 'id_type'
    },
    {
      title: 'Status',
      dataIndex: 'application_status',
      key: 'application_status',
      render: (record: string) => {
        return <span>{formatTf(record)}</span>
      }
    },
    {
      title: 'Product', // 所属产品
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      title: 'Reviewer',
      dataIndex: 'operator_name',
      key: 'operator_name'
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
      width: 120,
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
// 搜索条件类型
export interface SearchType {
  key: string
  label?: string | number
  operator_name?: string | number
  value?: string | number
}

// init state
export const initRequest = {
  page: 1,
  per_page: 10,
  sort_value: 'created_at',
  sort_order: 'desc',
  loan_days: 0
}
