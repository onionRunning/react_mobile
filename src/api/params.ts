import * as loginParams from 'interface/login'
import * as orders from 'interface/orders'
import * as repayments from 'interface/repayments'
import * as lendings from 'interface/lendings'
export { loginParams, orders, repayments, lendings }
// 请求参数
// 登陆参数
export interface LoginParams {
  account: string
  password: string
}

// 修改密码
export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  id: number
}

// 订单列表
export interface PostOrdersPayload {
  page: number // 当前页码
  perPage: number // 每页的页码数
  startDate: string // 筛选功能,申请单创建开始时间,设置默认的请求时间
  endDate: string // 筛选功能,申请单创建结束时间
  approvedTimeStart: string //筛选审批时间  开始时间
  approvedTimeEnd: string //筛选审批时间  结束时间
  multiCondition: string // 多个条件模糊筛选 - 订单号,姓名,客户联系电话
  applicationStatus: string // 订单状态
  operatorId: number // 审核人id
  operatorName: string //审核人name
  sortValue: string // 需要排序字段
  sortOrder: string // 排序的方法 asc desc
  productName: string // 订单来源
}

// 我的订单列表
export interface MyOrdersPayload {
  page: number // 当前页码
  per_page: number // 每页的页码数
  operator_id: number
  sort_value: string
  sort_order: string
}

// 抢单
export interface GrabOrdersPayload {
  operator_id: number
  operator_name: string | null
}

// 获取app联系人信息
export interface GetAppContractPayload {
  mobile_id?: number
  order_no?: string
  multi_condition?: string
}

// 获取用户信息
export interface UserInfoPayload {
  order_no: string
  customer_id: string
}

// 获取第三方银行卡认证结果
export interface BankVeritifyResult {
  order_no: string
}

// 获取设备信息
export interface MobilePayload {
  mobile_id?: number
  order_no?: string
}

// 获取查重检测列表
export interface CheckRepeatPayload {
  order_no: string
}

// 用来定义请求参数的 interface

// 获取放款列表详情
// export interface LoanInfoReq {
//   order_no: string
//   PermissionId?: string
//   sort_order?: 'asc' | 'desc'
//   sort_value?: string
// }

// 获取短信记录
export interface GetSMSRecordReq {
  order_no: string
}

// 发送短信
export interface ApprovalSendMsgReq {
  order_no: string
  send_type: string
}

// 获取还款详情
export interface RepaymentReq {
  order_no: string
}

// 获取状态记录
export interface StatusRecordReq {
  order_no: string
}

// 批量放款
export interface LoanOrRetryReqBatch {
  order_nos: string[] | number[]
  operator: string
  operator_id: number
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
export interface UpdateAutoReq {
  config_value: string
}

// 下载订单列表
export interface DownloadLendings extends LendingsPayload {
  exec_download: number
}

// 创建审批呼叫记录
export interface ApprovalCallPayload {
  customer_id: number
  order_no: string
  name: string
  phone_number: string
  relation_ship: string
}

// 获取审批呼叫记录
export interface GetApprovalCall {
  order_no: string
}

// 获取话务系统通话列表
export interface RiskGetCall {
  order_no: string
}

// 修改话务系统备注
export interface ResiCallRemark {
  remark: string
  order_no: string
  phone_to: string
  id: number
}

//=================================
// 放款订单列表
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

// 还款订单列表
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

// 通话录音列表
export interface CallRecordListReq {
  page: number // 当前页
  per_page: number // 每页数据条数
  sort_value: string // 需要排序字段
  sort_order: string // 排序方法
  phone_from?: string // 话机号
  phone_to?: string // 被叫手机号
  start_time?: string // 筛选呼叫时间 开始时间
  end_time?: string // 筛选呼叫时间 结束时间
  download_flag?: string // 下载
}

// 黑名单管理列表
export interface BlacklistManagementReq {
  page: number // 当前页
  per_page: number // 每页数据条数
  sort_value: string // 需要排序字段
  sort_order: string // 排序方法
  multi_condition?: string // 申请单号，客户姓名，id号码模糊查询
  start_date?: string // 筛选申请时间 开始时间
  end_date?: string // 筛选申请时间 结束时间
  approved_time_start?: string // 筛选审核时间 开始时间
  approved_time_end?: string // 筛选审核时间 结束时间
  application_status?: string // 审核状态
  product_name?: string // 产品
  operator_name?: string // 操作人
  blacklist_type?: string // 黑名单类型
  phone?: string // 号码
  download_flag?: string // 下载
}

export interface AddBlacklistReq {
  order_list: string[]
  blacklist_type: string
}

// 黑名单列表
export interface BlacklistReq {
  page: number // 当前页
  per_page: number // 每页数据条数
  sort_value?: string // 需要排序字段
  sort_order?: string // 排序方法
  multi_condition?: string // 申请单号，客户姓名，id号码模糊查询
  start_time?: string // 筛选加入时间 开始时间
  end_time?: string // 筛选加入时间 结束时间
  product_name?: string // 产品
  operator_name?: string // 操作人
  customer_phone?: string // 号码
  download_flag?: string // 下载
}

export interface RemoveBlacklistReq {
  order_list: string[]
}

// 手动出催 或 入催(旧)
export interface CsParamsReq {
  scheduleId?: number
  type?: string
}

// 手动出催 或 入催(新)
export interface NewCsParamsReq {
  order_no: string
  product_name: string
  action_type: string
}

export interface RepaymentlistDownloadReq extends RepaymentListReq {
  exec_download: number
}

// 全部订单列表
export interface PostOrdersReq {
  page: number // 当前页码
  per_page: number // 每页的页码数
  start_date: string // 筛选功能,申请单创建开始时间,设置默认的请求时间
  end_date: string // 筛选功能,申请单创建结束时间
  approved_time_start: string //筛选审批时间  开始时间
  approved_time_end: string //筛选审批时间  结束时间
  multi_condition: string // 多个条件模糊筛选 - 订单号,姓名,客户联系电话
  application_status: string // 订单状态
  operator_id: number // 审核人id
  operator_name: string //审核人name
  sort_value: string // 需要排序字段
  sort_order: string // 排序的方法 asc desc
  product_name: string // 订单来源
  phone: string // 号码
}

export interface OrderListReqState {
  page: number // 当前页码
  perPage: number // 每页的页码数
  startDate: string // 筛选功能,申请单创建开始时间,设置默认的请求时间
  endDate: string // 筛选功能,申请单创建结束时间
  approvedTimeStart: string //筛选审批时间  开始时间
  approvedTimeEnd: string //筛选审批时间  结束时间
  multiCondition: string // 多个条件模糊筛选 - 订单号,姓名,客户联系电话
  applicationStatus: string // 订单状态
  operatorId: number // 审核人id
  operatorName: string //审核人name
  sortValue: string // 需要排序字段
  sortOrder: string // 排序的方法 asc desc
  productName: string // 订单来源
  phone: string // 号码
}

// 订单列表: state转强求参数
export const transformOrderListReq = (req: OrderListReqState): PostOrdersReq => {
  return {
    page: req.page,
    per_page: req.perPage,
    start_date: req.startDate,
    end_date: req.endDate,
    approved_time_start: req.approvedTimeStart,
    approved_time_end: req.approvedTimeEnd,
    multi_condition: req.multiCondition,
    application_status: req.applicationStatus,
    operator_id: req.operatorId,
    operator_name: req.operatorName,
    sort_value: req.sortValue,
    sort_order: req.sortOrder,
    product_name: req.productName,
    phone: req.phone
  }
}

// 重新检测查重检测
export interface NewCheckRepeatPayload {
  order_no: string
}

/**
 * 权限管理
 */

// 获取角色列表
export interface GetRoleListReq {
  // search?: string
  // sort: any
  page: number
  per_page: number
}

// 获取角色详情
export interface GetRoleDetailReq {
  id: number
}

// 新增/修改角色信息
export interface UpdateRoleReq {
  id?: number
  role_name: string
  notes: string
  access_id: number[]
  product_id: number[]
}

// 分单参数
export interface SubmitAllocateReq {
  orders: string[]
  alloc_operator_name: string
  alloc_operator_id: number
  dest_operator_name: string
  dest_operator_id: number
}

// 线下还款参数
export interface OfflineRepayReq {
  order_no: string
  repayment_type: string
  customer_id: number
  customer_name: string
  actual_amount: number
  actual_repayment_time: string
  reduction_amount: number
  repayment_flow: string
  repayment_channel: string
  remark: string
  operator_id: number
  operator_name: string
}

// 获取还款试算
export interface RepaymentTrial {
  order_no: string
  customer_id: number
  repayment_type: string
  repayment_time: string
}

/******* 详情下半部分 *********/

// 获取审核结果
export interface ApprovalResultReq {
  order_no: string
  suffix: string
}

// 获取电话审核信息
export interface TelephoneVerifyReq {
  order_no: string
  suffix: string
}

// 获取通话记录信息
export interface CallRecordInfoReq {
  internal_id: string
  internal_sys: number
  suffix: string
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

// 更新话务系统信息
export interface UpdateCallInfoReq {
  call_id: string
  call_status: string
  reason: string
  remark: string
}

export interface ReasonType {
  reason_code: string
  reason_value: string
  id: number
}

// 审核订单
export interface ApprovalOrder {
  order_no: string
  operator_name: string | null
  operator_id: number
  application_status: string
  reasons: ReasonType[]
  remark?: string
}

// 获取还款详情
export interface RepaymentDetailReq {
  order_no: string
  PermissionId?: string
}

// 获取放款信息
export interface LoanInfoReq {
  order_no: string
  PermissionId?: string
  sort_order?: 'asc' | 'desc' | ''
  sort_value?: string
}

// 获取短信记录
export interface SMSRecordReq {
  order_no: string
  PermissionId?: string
}

// 发送短信
export interface SendSmsReq {
  order_no: string
  button_type: string
}

// 获取状态记录
export interface StatusRecordReq {
  PermissionId?: string
  order_no: string
}
