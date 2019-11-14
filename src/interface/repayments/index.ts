/**
 * 还款管理 --- 入参
 */
// 还款管理列表的参数
export interface RepaymentListReq {
  page?: number // 当前页
  per_page?: number // 每页数据条数
  actual_loan_start_date?: string // 放款创建时间,查找开始时间
  actual_loan_end_date?: string // 放款创建时间,查找开始时间
  due_start_date?: string // 还款时间,起始查询时间
  due_end_date?: string // 还款时间,结束查询时间
  like_keyword?: string // 申请单号，客户姓名模糊查询
  loan_amount_start?: number // 放款金额（查找开始）
  loan_amount_end?: number // 放款金额（查找结束）
  deduction_start_time?: string // 减免时间(起始时间)
  deduction_end_time?: string // 减免(结束时间)
  loan_status?: string // 放款单状态
  product_name?: string // 产品名称,默认不传
  sort_value?: string // 需要排序字段
  sort_order?: string // 排序方法
}
//  还款管理的下载参数
export interface RepaymentlistDownloadReq extends RepaymentListReq {
  exec_download: number
}

//=================================

/**
 * 还款管理 ---- 出参
 */

// 还款管理列表
export interface RepaymentResItem {
  customer_id: number
  order_no: string
  product_name: string
  actual_loan_time: string
  customer_name: string
  loan_principal: number
  loan_days: number
  repayment_schedule_status: string
  due_date: string
  repay_amount: number
  application_status: string
  mobile_id: number
  due_repay_amount: number
  need_in_collection_flag?: boolean
  need_out_collection_flag?: boolean
  id?: number
}
// 还款订单返回结果
export interface RepaymentListRes {
  page_count: number
  total_count: number
  repayment: RepaymentResItem[]
}
