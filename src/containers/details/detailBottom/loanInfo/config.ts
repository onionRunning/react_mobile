import { formatTime } from 'global/method'
import { TableTile } from 'global/interface'

export const LoanInfoColumns: TableTile[] = [
  {
    align: 'center',
    title: 'Request Disbursement time', // 请求放款时间
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: true,
    render: (time: string) => formatTime(time)
  },
  {
    align: 'center',
    title: 'Disbursement success time', // 放款成功时间\放款结果时间 p3.12.2注释信息为实际放款时间
    dataIndex: 'actual_loan_time',
    key: 'actual_loan_time',
    sorter: true,
    render: (time: string) => formatTime(time)
  },
  {
    align: 'center',
    title: 'Disbursement Amount', // 实际放款金额
    dataIndex: 'actual_loan_amount',
    key: 'actual_loan_amount'
  },
  {
    align: 'center',
    title: 'Disbursement Handling Fee',
    dataIndex: 'transfer_fee',
    key: 'transfer_fee'
  },
  {
    align: 'center',
    title: 'terms', // 借贷每期天数
    dataIndex: 'loan_days',
    key: 'loan_days'
  },
  {
    align: 'center',
    title: 'Disbursement Status', // 放款状态
    dataIndex: 'status',
    key: 'status'
  },
  {
    align: 'center',
    title: 'Disbursement Ref number', // 放款流水号
    dataIndex: 'loan_flow_no',
    key: 'loan_flow_no'
  },
  {
    align: 'center',
    title: 'External Txnld', //  第三方放款流水号
    dataIndex: 'out_loan_flow',
    key: 'out_loan_flow'
  },
  {
    align: 'center',
    title: 'Reason for Disbursement Failure', // 失败理由
    dataIndex: 'fail_reason',
    key: 'fail_reason'
  }
]
