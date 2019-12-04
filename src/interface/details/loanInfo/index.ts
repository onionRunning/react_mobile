// 获取放款信息
export interface LoanInfoReq {
  order_no: string
  sort_order?: 'asc' | 'desc' | ''
  sort_value?: string
}

export interface LoanInfoRes {
  loan_flows: LoanInfoList[]
}

// 放款信息
export interface LoanInfoList {
  created_at: string
  actual_loan_time: string
  actual_loan_amount: number
  loan_days: number
  status: string
  loan_flow_no: string
  out_loan_flow: string
  fail_reason: string
  fee: Fee
  transfer_fee?: number
}

interface Fee {
  transfer_fee: number
}
