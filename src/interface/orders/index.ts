// 我的订单模块
// 入参
export interface MyOrderReq {
  page?: number
  per_page?: number
  loan_days?: number
  operator_id?: number
  // 排序字段
  sort_value?: string
  // 排序的值
  sort_order?: string
}
// 出参
export interface MyOrderLists {
  order_no: string
  order_type: string
  customer_full_name: string
  created_at: string
  id_num: string
  id_type: string
  // 订单状态
  application_status: string
  product_name: string
  // 申请期限
  loan_days: number
}

export interface MyOrderRes {
  application_list: MyOrderLists[]
  page_count: number
  total_count: number
}
// 我的订单抢单逻辑
export interface GrabOrderReq {
  operator_id?: number
  operator_name?: string
}

export interface CallBacks {
  successCb: Function
  errCb: Function
}
