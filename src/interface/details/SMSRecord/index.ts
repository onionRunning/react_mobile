export interface SMSRecordReq {
  order_no: string
}

export interface SMSRecordRes {
  flows: SMSRecordList[]
}

export interface SMSRecordList {
  send_type: string
  created_at: string
  content: string
  send_status: string
}

export interface SendSmsReq {
  order_no: string
  send_type: string
}
