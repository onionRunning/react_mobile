// 还款计划
export interface RepaymentDetailReq {
  order_no: string
}

export interface RepaymentDetailRes {
  schedules: RepaymentDetailList[]
}

export interface RepaymentDetailList {
  extend_period: number
  due_date: string
  actual_paid_off_date: string
  overdue_days: number
  fee: Fee
  flows?: RepaymentFlowsList
}

export interface Fee {
  principal_fee: number
  actual_principal_fee: number
  interests_fee: number
  actual_interests_fee: number
  manage_fee: number
  actual_manage_fee: number
  extend_fee: number
  actual_extend_fee: number
  overdue_late_fee: number // 逾期滞纳金
  actual_overdue_late_fee: number
  overdue_interests_fee: number // 逾期罚息
  actual_overdue_interests_fee: number
  reduce_fee: number
  repay_amount: number
  actual_repay_amount: number
}

export interface RepaymentFlowsList {
  actual_paid_off_date: string
  is_offline: number
  repayment_type: string
  repayment_flow_no: string
  out_flow_no: string
  status: string
  operator_name: string
  remark: string
  fee: Fee
  repay_amount?: number
  reduce_fee?: number
  actual_repay_amount?: number
}

// export interface RepaymentInfoList {
//   extend_period: number
//   due_date: string
//   actual_paid_off_date: string
//   principal: number
//   actual_principal: number
//   free_principal: number
//   interests_fee: number
//   actual_interests_fee: number
//   free_interests_fee: number
//   service_fee: number
//   actual_service_fee: number
//   free_service_fee: number
//   extend_fee: number
//   actual_extend_fee: number
//   try_extend_fee: number
//   free_extend_fee: number
//   late_days: number
//   late_penalty_fee: number
//   actual_late_penalty_fee: number
//   free_late_penalty_fee: number
//   late_fee: number
//   actual_late_fee: number
//   number: number
//   free_late_fee: number
//   late_interests_fee: number
//   actual_late_interests_fee: number
//   free_late_interests_fee: number
//   free_amount: number
//   repay_amount: number
//   actual_repay_amount: number
// }

// // 还款流水
// export interface RepaymentFlowsReq {
//   order_no: string
// }

// export interface RepaymentInfoFlowList {
//   created_at: string
//   actual_loan_time: string
//   actual_loan_amount: number
//   loan_days: number
//   loan_status: string
//   loan_flow_status: string
//   request_no: string
//   out_flow_numL: string
//   err_msg: string
//   extend_period: number
// }
