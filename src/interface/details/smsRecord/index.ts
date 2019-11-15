export interface SMSRecordList {
  send_type: string
  send_at: string
  send_content: string
  send_status: string
}

export interface SMSRecordReq {
  order_no: string
  PermissionId?: string
}

export interface SendSmsReq {
  order_no: string
  button_type: string
}
