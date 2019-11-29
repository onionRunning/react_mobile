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

// 拨打电话
export interface CallUpReq {
  internal_id: string
  internal_sys: number // 默认为 1
  call_from: string
  call_to: string
  third_channel: string // 默认为 'yeastar'
  approval_call_id: number
}
