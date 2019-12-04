import React, { MouseEventHandler } from 'react'
import { CheckRepeatResItem } from 'interface/details/checkRepeat'

// table tableTitle
export const headerLists = (clickCallback?: (args: {}) => MouseEventHandler<{}>) => {
  return [
    {
      title: 'Match Content',
      dataIndex: 'result_value',
      key: 'result_value'
    },
    {
      title: 'Loan ID',
      dataIndex: 'result_order_no',
      key: 'result_order_no'
    },
    {
      title: 'Full name',
      dataIndex: 'customer_name',
      key: 'customer_name'
    },
    {
      title: 'Phone number',
      dataIndex: 'customer_phone_num',
      key: 'customer_phone_num'
    },
    {
      title: 'ID number',
      dataIndex: 'id_num',
      key: 'id_num'
    },
    {
      title: 'Review result',
      dataIndex: 'application_status',
      key: 'application_status'
    },
    {
      title: 'Repayment status',
      dataIndex: 'loan_status',
      key: 'loan_status'
    },
    {
      title: 'DPD',
      dataIndex: 'late_days',
      key: 'late_days'
    },
    {
      title: 'Blacklist type',
      dataIndex: 'order_status',
      key: 'order_status'
    },
    {
      title: 'Operating',
      dataIndex: 'operating',
      key: 'operating',
      render: (_: string, record: CheckRepeatResItem, index: number) => {
        return (
          <span onClick={clickCallback!(record)} className={`blue-color operating`} id={`inquire-${index}`}>
            {'Inquire'}
          </span>
        )
      }
    }
  ]
}
