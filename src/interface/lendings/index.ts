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
  loan_list: LendingItem[]
}

export interface LendingItem {
  order_no: string
  apply_time: string
  customer_name: string
  loan_principal: string
  actual_loan_amount: string
  loan_days: string
  request_loan_time: string
  actual_loan_time: string
  loan_status: string
  loan_flow_no: string
  out_flow_no: string
  err_msg: string
  customer_id: number
  product_name: string
  is_in_batch_loan: boolean
  loan_flow_status: string
  loan_pay_type: string
}
