// 获取放款信息
export interface LoanInfoReq {
  order_no: string
  sort_order?: 'asc' | 'desc' | ''
  sort_value?: string
}

// 放款信息
export interface LoanInfoList {
  created_at: string
  actual_loan_time: string
  actual_loan_amount: number
  transfer_fee: string
  loan_days: string
  loan_status: string
  loan_flow_status: string
  request_no: string
  out_flow_num: string
  err_msg: string
}
