// 获取查重检测列表
export interface CheckRepeatPayloadReq {
  order_no: string
}

export interface CheckRepeatResItem {
  application_status: string
  customer_name: string
  customer_phone_num: string
  id_num: string
  late_days: string
  loan_status: string
  order_no: string
  order_status: string
  result_value: string
  result_order_no: string
  customer_id: string
  product_name: string
}

export interface CheckRepeatPayloadRes {
  duplicate_list: CheckRepeatResItem[]
}
