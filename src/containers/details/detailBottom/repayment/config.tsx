import React from 'react'
import { RepaymentDetailList } from 'interface/details/repaymentInfo'
import { formatTime } from 'global/method'

export interface Columns {
  title: string
  dataIndex: string
  render: (record: RepaymentDetailList) => React.ReactNode
  width?: number
}

export const tableConfig: Columns[] = [
  {
    title: 'Terms',
    dataIndex: 'extend_period',
    width: 50,
    render: (record: RepaymentDetailList) => {
      return <span>{record.extend_period}</span>
    }
  },
  {
    title: 'Status',
    dataIndex: 'pay_status',
    width: 150,
    render: () => {
      return (
        <ul>
          <li>Should Pay</li>
          <li>Paid</li>
          <li>Outstanding Balance</li>
        </ul>
      )
    }
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (record: RepaymentDetailList) => {
      // const { due_date, actual_paid_off_date } = item
      return (
        <ul>
          {/* 当期到期日期 */}
          <li>{formatTime(record.due_date)}</li>
          {/* 本期实还日期*/}
          <li>{formatTime(record.actual_paid_off_date) || '--'}</li>
          <li> -- </li>
        </ul>
      )
    }
  },
  {
    title: 'Principal',
    dataIndex: 'amount',
    render: (record: RepaymentDetailList) => {
      const { principal_fee, actual_principal_fee } = record.fee
      return (
        <ul>
          {/* 本期应还本金 */}
          <li>{principal_fee}</li>
          {/* 本期实还本金 */}
          <li>{actual_principal_fee}</li>
          <li>{principal_fee - actual_principal_fee} </li>
        </ul>
      )
    }
  },
  {
    title: 'Interest',
    dataIndex: 'interest',
    render: (record: RepaymentDetailList) => {
      const { interests_fee, actual_interests_fee } = record.fee
      // const amount = numberSubtractionNumber(interests_fee, actual_interests_fee, free_interests_fee)
      return (
        <ul>
          {/*利息费 */}
          <li>{interests_fee}</li>
          {/*实付利息费*/}
          <li>{actual_interests_fee}</li>
          <li>{interests_fee - actual_interests_fee}</li>
        </ul>
      )
    }
  },
  {
    title: 'Service fee',
    dataIndex: 'fee',
    render: (record: RepaymentDetailList) => {
      const { manage_fee, actual_manage_fee } = record.fee
      return (
        <ul>
          {/* 贷款服务费 */}
          <li>{manage_fee}</li>
          {/* 实付贷款服务费 */}
          <li>{actual_manage_fee}</li>
          <li>{manage_fee - actual_manage_fee}</li>
        </ul>
      )
    }
  },
  {
    title: 'Extension fee',
    dataIndex: 'extend_fee',
    render: (record: RepaymentDetailList) => {
      const { extend_fee, actual_extend_fee } = record.fee
      return (
        <ul>
          {/* 展期费 */}
          <li>{extend_fee}</li>
          {/* 实付展期费 */}
          <li>{actual_extend_fee}</li>
          <li>{extend_fee - actual_extend_fee}</li>
        </ul>
      )
    }
  },
  {
    title: 'Day past due',
    dataIndex: 'overDue',
    render: (record: RepaymentDetailList) => {
      const { overdue_days } = record
      return (
        <ul>
          <li>{overdue_days}</li>
          <li>--</li>
          <li>--</li>
        </ul>
      )
    }
  },
  {
    title: 'Late Payment Fee',
    dataIndex: 'overlateFee',
    render: (record: RepaymentDetailList) => {
      const { overdue_late_fee, actual_overdue_late_fee } = record.fee
      return (
        <ul>
          {/* 逾期应还滞纳金 */}
          <li>{overdue_late_fee}</li>
          {/* 实付逾期滞纳金 */}
          <li>{actual_overdue_late_fee}</li>
          <li>{overdue_late_fee - actual_overdue_late_fee}</li>
        </ul>
      )
    }
  },
  {
    title: 'Penalty Interest', // p4.1.1UAT验收修改关键字提示
    dataIndex: '',
    render: (record: RepaymentDetailList) => {
      const { overdue_interests_fee, actual_overdue_interests_fee } = record.fee
      return (
        <ul>
          {/* 逾期罚息 */}
          <li>{overdue_interests_fee}</li>
          {/* 实付逾期罚息 */}
          <li>{actual_overdue_interests_fee}</li>
          <li>{overdue_interests_fee - actual_overdue_interests_fee}</li>
        </ul>
      )
    }
  },
  {
    title: 'Loan Deduction',
    dataIndex: 'free_amount',
    render: (record: RepaymentDetailList) => {
      // 减免费用
      const { reduce_fee } = record.fee
      return (
        <ul>
          <li>{reduce_fee}</li>
          <li>{reduce_fee}</li>
          <li>{'--'} </li>
        </ul>
      )
    }
  },
  {
    title: 'Total',
    dataIndex: 'total',
    render: (record: RepaymentDetailList) => {
      const { repay_amount, actual_repay_amount } = record.fee
      return (
        <ul>
          {/* 应还总金额 */}
          <li>{repay_amount}</li>
          {/* 实还总金额 */}
          <li>{actual_repay_amount}</li>
          <li>{repay_amount - actual_repay_amount} </li>
        </ul>
      )
    }
  }
]

export const RepaymentInfoColumns = [
  {
    title: 'Deduction time', // 实际支付时间
    dataIndex: 'actual_paid_off_date',
    key: 'actual_paid_off_date',
    render: (time: string) => {
      return formatTime(time)
    }
  },
  {
    title: 'Should refund the money', // current_remain_should_repay_amount
    dataIndex: 'repay_amount',
    key: 'repay_amount'
  },
  {
    title: 'Loan Deduction', // Loan Deduction
    dataIndex: 'reduce_fee',
    key: 'reduce_fee'
  },
  {
    title: 'Actual repayment amount', // 实还金额
    dataIndex: 'actual_repay_amount',
    key: 'actual_repay_amount'
  },
  {
    title: 'Repayment channel', // 还款渠道: 0->线上、1->线下
    dataIndex: 'is_offline',
    key: 'is_offline'
  },
  // 4.9.1新需求
  {
    title: 'Points Deduction', // 积分抵扣
    dataIndex: 'free_amount',
    key: 'free_amount',
    render: (item: any, record: any) => {
      return record.free_type === 'points' ? record.free_amount : 0
    }
  },
  {
    title: 'Repayment type', // 交易类型
    dataIndex: 'repayment_type',
    key: 'repayment_type'
  },
  {
    title: 'Repayment number', // 请求支付编号
    dataIndex: 'repayment_flow_no',
    key: 'repayment_flow_no'
  },
  {
    title: 'External Txnld', // TODO p4.2.1紧急需求增加 第三方还款流水号
    dataIndex: 'out_flow_no',
    key: 'out_flow_no'
  },
  {
    title: 'External RefNo', // TODO p4.2.1紧急需求增加 还款码
    dataIndex: 'repay_code',
    key: 'repay_code'
  },
  {
    title: 'Deduction status', // 支付状态
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Operator',
    dataIndex: 'operator_name', // 操作人默认为系统：前端写死
    key: 'operator_name',
    render: (record: string) => record || 'system'
  },
  {
    title: 'Remarks',
    dataIndex: 'remark', // 备注信息
    key: 'remark'
  }
]
