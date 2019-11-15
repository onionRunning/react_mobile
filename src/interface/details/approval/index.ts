export interface ApprovalResultReq {
  order_no: string
  suffix: string
}

export interface OrderMsg {
  application_status: string
  application_finish_time: string
  return_time: string
  operator_name: string
  remark: string
}

export interface ReasonItem {
  reason_code: string
  reason_value: string
  value_chinese: string
}

export interface OrderReason {
  reject_reason: ReasonItem[]
}

export interface ApprovalResultRes {
  order_msg: OrderMsg
  order_reasons: OrderReason
}
