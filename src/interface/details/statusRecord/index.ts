export interface StatusRecordReq {
  order_no: string
}

export interface StatusRecordList {
  id: string
  current_status: string
  operator_name: string
  created_at: string
  reasons: string
  remark: string
}
