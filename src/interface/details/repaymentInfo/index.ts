// 还款计划
export interface RepaymentDetailReq {
  order_no: string
}

export interface RepaymentInfoList {
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

// 还款流水
export interface RepaymentFlowsReq {
  order_no: string
}

export interface RepaymentInfoFlowList {
  created_at: string
  actual_loan_time: string
  actual_loan_amount: number
  loan_days: number
  loan_status: string
  loan_flow_status: string
  request_no: string
  out_flow_numL: string
  err_msg: string
  extend_period: number
}
