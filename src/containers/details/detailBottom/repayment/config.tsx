import React from 'react'
// import { DetailRepaymentList } from 'api/response'
import { formatTimeNoHour, numberSubtractionNumber, formatTime } from 'global/method'

export const getDomlist = (value: number = 0) => {
  return (
    <ul>
      <li>{value}</li>
      <li>--</li>
      <li>--</li>
    </ul>
  )
}

export interface DetailRepaymentList {
  extend_period: number
  due_date: string
  actual_paid_off_date: string
  principal: number
  actual_principal: number
  free_principal: number
  interests_fee: number
  actual_interests_fee: number
  free_interests_fee: number
  service_fee: number
  actual_service_fee: number
  free_service_fee: number
  extend_fee: number
  actual_extend_fee: number
  try_extend_fee: number
  free_extend_fee: number
  late_days: number
  late_penalty_fee: number
  actual_late_penalty_fee: number
  free_late_penalty_fee: number
  late_fee: number
  actual_late_fee: number
  number: number
  free_late_fee: number
  late_interests_fee: number
  actual_late_interests_fee: number
  free_late_interests_fee: number
  free_amount: number
  repay_amount: number
  actual_repay_amount: number
}

export const tableConfig = [
  {
    title: 'Terms',
    dataIndex: 'extend_period',
    render: (item: DetailRepaymentList) => {
      return <p>{item.extend_period + 1}</p>
    }
  },
  {
    title: 'Status',
    dataIndex: 'pay_status',
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
    render: (item: DetailRepaymentList) => {
      const { due_date, actual_paid_off_date } = item
      return (
        <ul>
          {/* 当期到期日期 */}
          <li>{formatTimeNoHour(due_date)}</li>
          {/* 本期实还日期 p3.12.2修改字段为actual_paid_off_date， p3.12.1为：current_actual_repay_date*/}
          <li>{(actual_paid_off_date && formatTimeNoHour(actual_paid_off_date)) || '--'}</li>
          <li> -- </li>
        </ul>
      )
    }
  },
  {
    title: 'Principal',
    dataIndex: 'amount',
    render: (item: DetailRepaymentList) => {
      const { principal, actual_principal, free_principal } = item
      const amount = numberSubtractionNumber(principal, actual_principal, free_principal)
      return (
        <ul>
          {/* 本期应还本金 */}
          <li>{principal}</li>
          {/* 本期实还本金 */}
          <li>{actual_principal}</li>
          <li>{amount < 0 ? 0 : amount} </li>
        </ul>
      )
    }
  },
  {
    title: 'Interest',
    dataIndex: 'interest',
    render: (item: DetailRepaymentList) => {
      const { interests_fee, actual_interests_fee, free_interests_fee } = item
      const amount = numberSubtractionNumber(interests_fee, actual_interests_fee, free_interests_fee)
      return (
        <ul>
          {/* p3.12.2注释改为：正常到期应还利息费 */}
          <li>{interests_fee}</li>
          {/* p3.12.2注释改为：正常到期实付利息费 */}
          <li>{actual_interests_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    title: 'Service fee',
    dataIndex: 'fee',
    render: (item: DetailRepaymentList) => {
      const { service_fee, actual_service_fee, free_service_fee } = item
      const amount = numberSubtractionNumber(service_fee, actual_service_fee, free_service_fee)
      return (
        <ul>
          {/* 贷款服务费 */}
          <li>{service_fee}</li>
          {/* 实付贷款服务费 */}
          <li>{actual_service_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    title: 'Extension fee',
    dataIndex: 'extend_fee',
    render: (item: DetailRepaymentList) => {
      const { extend_fee, actual_extend_fee, try_extend_fee, free_extend_fee } = item
      const amount = numberSubtractionNumber(extend_fee, actual_extend_fee, free_extend_fee)
      if (extend_fee === 0) {
        return (
          <ul>
            {/* 展期试算费用 */}
            <li>{try_extend_fee}</li>
            <li>0</li>
            <li>0</li>
          </ul>
        )
      }
      return (
        <ul>
          {/* 展期应还手续费 */}
          <li>{extend_fee}</li>
          {/* 实付展期手续费 */}
          <li>{actual_extend_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    title: 'Day past due',
    dataIndex: 'overDue',
    render: (item: DetailRepaymentList) => {
      const { late_days } = item
      // 逾期天数
      return getDomlist(late_days)
    }
  },
  {
    title: 'Overdue penalty', // p4.1.1UAT验收修改关键字
    dataIndex: 'overFee',
    render: (item: DetailRepaymentList) => {
      const { late_penalty_fee, actual_late_penalty_fee, free_late_penalty_fee } = item
      const amount = numberSubtractionNumber(late_penalty_fee, actual_late_penalty_fee, free_late_penalty_fee)
      return (
        <ul>
          {/* 逾期应还违约金 */}
          <li>{late_penalty_fee}</li>
          {/* 实付逾期违约金 */}
          <li>{actual_late_penalty_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    title: 'Late Payment Fee', // p4.1.1UAT验收修改关键字
    dataIndex: 'overlateFee',
    render: (item: DetailRepaymentList) => {
      const { late_fee, actual_late_fee, free_late_fee } = item
      const amount = numberSubtractionNumber(late_fee, actual_late_fee, free_late_fee)
      return (
        <ul>
          {/* 逾期应还滞纳金 */}
          <li>{late_fee}</li>
          {/* 实付逾期滞纳金 */}
          <li>{actual_late_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    title: 'Penalty Interest', // p4.1.1UAT验收修改关键字提示
    dataIndex: '',
    render: (item: DetailRepaymentList) => {
      const { late_interests_fee, actual_late_interests_fee, free_late_interests_fee } = item
      const amount = numberSubtractionNumber(late_interests_fee, actual_late_interests_fee, free_late_interests_fee)
      return (
        <ul>
          {/* 逾期应还滞纳金 */}
          <li>{late_interests_fee}</li>
          {/* 实付逾期滞纳金 */}
          <li>{actual_late_interests_fee}</li>
          <li>{amount < 0 ? 0 : amount}</li>
        </ul>
      )
    }
  },
  {
    widthStyle: 'min',
    title: 'Loan Deduction',
    dataIndex: 'free_amount',
    render: (item: DetailRepaymentList) => {
      // 减免费用
      const { free_amount } = item
      return (
        <ul>
          <li>{free_amount}</li>
          <li>{free_amount}</li>
          <li>{'--'} </li>
        </ul>
      )
    }
  },
  {
    widthStyle: 'min',
    title: 'Total',
    dataIndex: 'total',
    render: (item: DetailRepaymentList) => {
      const { repay_amount, actual_repay_amount, free_amount } = item
      const amount = numberSubtractionNumber(repay_amount, actual_repay_amount, free_amount)
      return (
        <ul>
          {/* 本期应还总金额 */}
          <li>{repay_amount}</li>
          {/* 本期实还总金额 */}
          <li>{actual_repay_amount}</li>
          <li>{amount < 0 ? 0 : amount} </li>
        </ul>
      )
    }
  },
  {
    title: 'See details',
    dataIndex: 'see',
    showExpend: true
  }
]

export const RepaymentInfoColumns = [
  {
    title: 'Deduction time', // 实际支付时间
    dataIndex: 'actual_paid_time',
    key: 'actual_paid_time',
    render: (actual_paid_time: string) => {
      return formatTime(actual_paid_time)
    }
  },
  {
    title: 'Should refund the money', // current_remain_should_repay_amount
    dataIndex: 'current_remain_should_repay_amount',
    key: 'current_remain_should_repay_amount'
  },
  {
    title: 'Loan Deduction', // Loan Deduction
    dataIndex: 'free_amount',
    key: 'free_amount'
  },
  {
    title: 'Actual repayment amount', // 实还金额
    dataIndex: 'actual_repay_amount',
    key: 'actual_repay_amount'
  },
  {
    title: 'Repayment channel', // 还款渠道
    dataIndex: 'pay_channel',
    key: 'pay_channel'
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
    dataIndex: 'business_type',
    key: 'business_type'
  },
  {
    title: 'Repayment number', // 请求支付编号
    dataIndex: 'request_no',
    key: 'request_no'
  },
  {
    title: 'External Txnld', // TODO p4.2.1紧急需求增加 第三方还款流水号
    dataIndex: 'out_flow_num',
    key: 'out_flow_num'
  },
  {
    title: 'External RefNo', // TODO p4.2.1紧急需求增加 还款码
    dataIndex: 'repay_code',
    key: 'repay_code'
  },
  {
    title: 'Deduction status', // 支付状态
    dataIndex: 'repayment_status',
    key: 'repayment_status'
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
