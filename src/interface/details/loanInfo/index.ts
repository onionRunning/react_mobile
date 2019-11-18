export interface LoanInfoReq {
  order_no: string
  PermissionId?: string
  sort_order?: 'asc' | 'desc' | ''
  sort_value?: string
}

export interface LoanInfoRes {
  flow: LoanFlow
  loan: LoanList
}

export interface LoanFlow {
  created_at: string
  actual_loan_time: string
  loan_flow_status: string
  request_no: string
  out_flow_num: string
  err_msg: string
}

export interface LoanList {
  actual_loan_amount: number
  loan_days: string
  loan_status: string
  transfer_fee: string
}

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
