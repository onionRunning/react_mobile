// 放款管理
export interface LendingsPayload {
  page?: number // 当前页
  per_page?: number // 每页数据条数
  apply_start_date?: string // 申请单创建时间,查找开始时间
  apply_end_date?: string // 申请单创建时间,查找结束时间
  request_loan_start_date?: string // 请求放款时间,起始查询时间
  request_loan_end_date?: string // 请求放款时间,结束查询时间
  actual_loan_start_date?: string // 实际放款成功开始时间筛选
  actual_loan_end_date?: string // 实际放款成功结束时间的筛选
  like_keyword?: string // 申请单号，客户姓名模糊查询
  loan_amount_start?: number // 开始放款金额
  loan_amount_end?: number // 结束放款金额
  loan_status?: string // 放款单状态
  product_name?: string // 订单来源
  sort_value?: string | number | boolean // 排序字段
  sort_order?: string // 排序方式:asc/desc
}

// 手动放款 or 重试
export interface LoanOrRetryReq {
  order_no: string
  operator: string
  operator_id: number
}
// 取消放款
export interface CancelLoanReq {
  order_no: string
  operator: string
  operator_id: number
}

// 手动放款开关
export interface UpdateAutoReqItem {
  available: string
  checked: boolean
  conf_type: string
  created_at: string
  deleted_at: string
  id: number
  label: string
  name: string
  remark: string
  remark_available: string
  updated_at: string
  value: string
}

// ===================
/**
 * 放款管理 --- 出参
 */

// 放款列表
export interface LendingsRes {
  total_page: number
  total_count: number
  loan_list: LendingResItem[]
}

export interface LoanItem {
  id: string
  order_no: string
  customer_name: string
  apply_time: string
  request_loan_time: string
  loan_principal: string
  loan_days: string
  loan_channel: string
  status: string
  loan_pay_type: string
  order_type: string
  product_name: string
  customer_info_id: string
}
export interface FlowItem {
  actual_loan_amount: string
  actual_loan_time: string
  status: string
  loan_flow_no: string
  fail_reason: string
  out_loan_flow: string
  loan_pay_code: string
  loan_pay_platform: string
}
export interface LendingResItem {
  loan: LoanItem
  loan_flow: FlowItem
}
export interface LendingItem {
  id: string
  order_no: string
  customer_name: string
  apply_time: string
  request_loan_time: string
  approved_principal: string
  loan_amount: number
  loan_days: number
  channel: string
  loan_status: string
  actual_loan_time: string
  loan_flow_status: string
  loan_flow_number: string
  request_no: string
  err_msg: string
  customer_id: string
  product_name: string
  order_type: string
  out_flow_num: string
  loan_pay_code: string
  pay_channel: string
  loan_pay_type: string
}
