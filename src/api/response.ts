export interface TestRes {
  test: string
}
// 用于书写结果的

export interface LoginResponse {
  token: string
  name: string
  id: string
  access_no?: number[]
  product_id?: number[]
  is_first_login?: string
}

// 放款列表
export interface LendingsRes {
  total_page: number
  total_count: number
  loans: LendingItem[]
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
}

// 拒绝原因列表的结果
export interface RefuseListResponse {
  reason_code: string
  reason_value: string
  id: number
}

// detail bottom
// loan info 返回结果
export interface LoanInfoRes {
  created_at: string
  actual_loan_time: string
  loan_principal: string
  actual_loan_amount: number
  data_fee: number
  evaluate_fee: number
  gst_tax: string
  loan_days: string
  loan_flow_status: string
  loan_flow_no: string
  out_flow_no: string
  err_msg: string
  member_fee: number
}
// 不是注重data
// export interface IgnoreResData {

// }

// 短信记录
export interface SMSRecordRes {
  label: string
  created_at: string
  sms_content: string
  send_status: string
}

// 还款详情结果
export interface RepaymentRes {
  repayment_schedule_status: string
  repayment_type: string
  // should pay
  due_date: string
  loan_principal: number
  interests_fee: number
  manage_fee: number
  extend_fee: number
  gst_tax: string
  overdue_days: string
  overdue_fee: number
  overdue_interests_fee: number
  repay_amount: number
  // actual pay
  actual_paid_off_date: string
  actual_principal: number
  actual_interests_fee: number
  actual_mange_fee: number
  actual_extend_fee: number
  actual_gst_tax: string
  actual_overdue_fee: number
  actual_overdue_interests_fee: number
  actual_repay_amount: number
  flows: RepaymentFlow[]
  offline_reduce_amount: number
  offline_repay_amount: number
  product_name: string
}

// 还款详情展期
export interface RepaymentFlow {
  actual_repay_amount: number
  actual_paid_off_date: string
  repay_amount: number
  repayment_channel: string
  repayment_type: string
  repayment_flow_no: string
  out_flow_no: string
  repayment_flow_status: string
  operator_name: string
  remark: string
  updated_at: string
  is_offline: number
  manage_fee: number
  extend_fee: number
  gst_tax: number
}

// 状态记录结果
export interface StatusRecordRes {
  current_status: string
  operator_name: string
  created_at: string
  remark: string
  reasons: string
}

// 还款订单返回结果
export interface RepaymentListRes {
  page_count: number
  total_count: number
  repayment_schedules: RepaymentResItem[]
}

// 还款订单列表
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

// 产品详情列表
export interface ProductDetail {
  id: number
  name: string
}

// 全部订单列表
export interface OrderListRes {
  page_count: number
  total_count: number
  application_list: OrderListItem[]
}

export interface OrderListItem {
  order_no: string
  created_at: string
  application_finish_time: string
  customer_full_name: string
  id_type: string
  id_num: string
  application_status: string
  product_name: string
  customer_id: number
  exception_reason?: string
  mobile_id: number
}

// 审核人员列表

export interface ApproveOperator {
  name: string
  id: number
}

/**
 * 角色管理
 */
// 角色列表
export interface RoleListRes {
  total_page: number
  total_count: number
  list: RoleList[]
}
export interface RoleList {
  id: number
  role_name: string
  notes: string
  access_id: string
  created_time: number
  label?: string
  value?: number
}

// 角色详情
export interface RoleDetail {
  id: number
  role_name: string
  notes: string
  access_id: number[]
  product_id: number[]
}

// 权限列表
export interface PermissionsList {
  id: number
  access_no: number
  parent_no: number
  name: string
  notes: string
}

export interface CallRecordsListRes {
  total_page: number
  total_counts: number
  record_list: CallRecordsItem[]
}

export interface CallRecordsItem {
  id: number
  phone_from: string
  phone_to: string
  duration: string
  start_time: string
  record_url: string
}

// 分单员工列表
export interface AlloateAccountList {
  id: number
  name: string
}

// 还款试算
export interface RepaymentTrialRes {
  now_repayment_amount: number
  acl_repayment_amount: number
  reduction_amount: number
}

export interface BlacklistManagementRes {
  page_count: number
  total_count: number
  application_list: BlacklistManagementItem[]
}

export interface BlacklistManagementItem {
  id: number
  order_no: string
  created_at: string
  application_finish_time: string
  customer_full_name: string
  id_type: string
  id_num: string
  application_status: string
  product_name: string
  customer_id: number
  operator_name: string
  customer_phone_num: string
  blacklist_type: string
}

export interface BlacklistRes {
  total_page: number
  total_count: number
  blacklist: BlacklistItem[]
}

export interface BlacklistItem {
  id: number
  order_no: string
  customer_name: string
  id_num: string
  addr_card_type: string
  addr_card_num: string
  product_name: string
  customer_phone: string
  created_at: string
  operator_name: string
  mac: string
  ip: string
  device_no: string
}
