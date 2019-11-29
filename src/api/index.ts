import { wrapperSend, createRequest, Response, ReqType, createHeaderRequest, HeaderType } from './request'
import { AxiosInstance } from 'axios'
import * as response from './response'
import * as params from './params'
import { UserInfoPayload } from 'interface/details/userInfo'
import { CheckRepeatPayloadReq } from 'interface/details/checkRepeat'

import { LoanInfoReq, LoanInfoList } from 'interface/details/loanInfo'
import { SMSRecordReq, SendSmsReq, SMSRecordRes } from 'interface/details/SMSRecord'
import { StatusRecordReq, StatusRecordList } from 'interface/details/statusRecord'

export class Api {
  request: AxiosInstance
  down: AxiosInstance
  reqHeader: (s: HeaderType, r?: string) => AxiosInstance
  constructor(request: ReqType, reqHeader: (s: HeaderType) => AxiosInstance) {
    this.request = request.http
    this.reqHeader = reqHeader
    this.down = request.down
  }

  private download = async <T = any>(url = '', body: any = {}) => {
    const res = await wrapperSend<T>(() => {
      return this.request.post<Response>(url, body, { responseType: 'blob' })
    }, 'down')
    return res
  }

  // header 进行重写操作
  private postHeader = async <T = any>(url = '', body?: any, header?: HeaderType, r?: string) => {
    const res = await wrapperSend<T>(() => {
      return this.reqHeader(header!, r).post<Response>(url, body)
    })
    return res
  }

  private post = async <T = any>(url = '', body?: any) => {
    const res = await wrapperSend<T>(() => {
      return this.request.post<Response>(url, body)
    })
    return res
  }
  private get = async <T = any>(url = '', body: any = {}) => {
    const res = await wrapperSend<T>(() => {
      return this.request.get<Response>(url, {
        params: body
      })
    })
    return res
  }
  private put = async <T = any>(url = '', body: any = {}) => {
    const res = await wrapperSend<T>(() => {
      return this.request.put<Response>(url, body)
    })
    return res
  }
  changeRequest = (req: ReqType) => {
    // 用于重新登陆的时候重置
    this.request = req.http
    this.down = req.down
  }

  // 新版本登陆
  postLogin = (payload: params.loginParams.LoginReq) => {
    return this.post<params.loginParams.LoginRes>(`/back_mgr/login`, payload)
    // return this.post<params.loginParams.LoginRes>(`/back_mgr/login`, payload)
  }
  // 请求订单列表
  postOrders = (payload: params.orders.OrderListsReq) => {
    return this.post<any>(`/back_mgr/get_order_list`, payload)
  }
  // 我的订单列表
  myOrders = (payload: params.orders.MyOrderReq) => {
    return this.post<params.orders.MyOrderRes>(`/back_mgr/get_my_order_list`, payload)
  }

  // 抢单
  grabOrders = (payload: params.orders.GrabOrderReq) => {
    return this.post<string>(`/back_mgr/grab_order`, payload)
  }
  // 获取app联系人信息
  getAppContract = (payload: params.GetAppContractPayload, stuffix?: string) => {
    return this.postHeader<any>(`/back_mgr/get_mobile_contact_info`, payload, { stuffix })
  }
  // 获取用户信息
  // getUserInfo = (payload: params.UserInfoPayload, stuffix?: string) => {
  //   return this.postHeader(`/back_mgr/get_one_order/${stuffix}`, payload, { stuffix })
  // }
  getUserInfo = (payload: UserInfoPayload, current?: string) => {
    return this.post(`/back_mgr/get_one_order/${current}`, payload)
  }

  // 获取设备信息
  getMobileInfo = (payload: params.MobilePayload, stuffix?: string) => {
    return this.postHeader<any>(`/back_mgr/device_info`, payload, { stuffix })
  }

  // 查重检测
  getRepeatList = (payload: CheckRepeatPayloadReq) => {
    console.log(payload)
    return this.post<any>(`/back_mgr/get_danger_list`, payload)
  }
  ///back_mgr/check_duplicate
  // 重新查重检测
  checkRepeatList = (payload: CheckRepeatPayloadReq) => {
    return this.post<any>(`/back_mgr/check_duplicate`, payload)
  }
  // 获取放款单列表
  getLendingLists = (payload: params.lendings.LendingsPayload) => {
    return this.post<params.lendings.LendingsRes>('/back_mgr/get_loan_list_page', payload)
  }

  // 手动放款or 重试
  getLoanOrRetry = (payload: params.lendings.LoanOrRetryReq) => {
    return this.post('/make_loan', payload)
  }

  // 取消放款
  getCancelLoan = (payload: params.lendings.CancelLoanReq) => {
    return this.post('/cancel_loan', payload)
  }

  // 获取自动放款开关
  getAutoStatus = () => {
    return this.get('/get_auto_loan_status')
  }

  // 开启或关闭开关,手动放款
  updateAutoStatus = (payload: params.lendings.UpdateAutoReqItem[]) => {
    return this.post('/set_auto_loan', payload)
  }

  // 下载放款列表
  downloadLendings = (payload: params.DownloadLendings) => {
    return this.download<any>('/back_mgr/query_loan_list', payload)
  }

  // 详情页获取用户银行卡第三方认证结果
  getBankAuthResult = (req: params.UserInfoPayload) => {
    return this.post<any>('/back_mgr/verify_bank_card', req)
  }

  /* -------订单详情(下半部分模块-)------- */

  // 获取审批结果
  getOrderApprovalResult = (payload: params.ApprovalResultReq) => {
    return this.post<response.ApprovalResultRes>(`/back_mgr/query_auditing_result`, payload)
  }

  // 获取联系人列表
  getTelephoneVerifyInfo = (payload: params.TelephoneVerifyReq) => {
    return this.post<response.TelephoneList[]>(`/back_mgr/query_call_record`, payload)
  }

  // 获取通话记录信息
  getCallRecord = (payload: params.CallRecordInfoReq) => {
    return this.post<any>(`/back_mgr/query_call_info`, payload)
  }

  // 拨打电话
  callUp = (payload: params.CallUpReq) => {
    return this.post<response.CallUpRes>(`/back_mgr/call`, payload)
  }

  // 更新话务系统信息
  updateCallInfo = (payload: params.UpdateCallInfoReq) => {
    return this.post(`/back_mgr/update_call_record`, payload)
  }

  // 获取拒绝理由配置
  getRefuseReason = () => {
    return this.post<response.RefuseList[]>('/back_mgr/get_reason_config_list')
  }

  // 审核订单
  approvalOrder = (payload: params.ApprovalOrder) => {
    return this.post(`/back_mgr/update_auditing_result`, payload)
  }

  // 获取还款信息
  getRepaymentDetail = (payload: params.RepaymentDetailReq) => {
    return this.post<response.RepaymentInfoList[]>(`/back_mgr/query_payment_info`, payload)
  }

  // 获取还款流水
  getRepaymentDetailFlow = (payload: params.RepaymentDetailReq) => {
    return this.post<response.RepaymentInfoFlowList[]>(`/back_mgr/query_payment_flow`, payload)
  }

  // 获取放款信息
  getLoanInfo = (payload: LoanInfoReq) => {
    return this.post<LoanInfoList[]>(`/back_mgr/query_payout_info`, payload)
  }

  // 获取短信记录
  getSMSRecord = (payload: SMSRecordReq) => {
    return this.post<SMSRecordRes>(`/back_mgr/approval_sms_record`, payload)
  }

  // 发送短信
  sendMsgSMSRecord = (payload: SendSmsReq) => {
    return this.post(`/back_mgr/approval_send_sms`, payload)
  }

  // 获取状态记录
  getStatusRecord = (payload: StatusRecordReq) => {
    return this.post<StatusRecordList[]>(`/back_mgr/get_order_status_record`, payload)
  }

  /************************************ 分割线 *******************************************/

  addApprovalCall = (payload: params.ApprovalCallPayload) => {
    return this.post<any>(`/back_mgr/add_approval_call_contacts`, payload)
  }

  // getApprovalCall = (payload: params.GetApprovalCall, stuffix?: string) => {
  //   return this.postHeader<any>(`/back_mgr/get_approval_call_contacts`, payload, { stuffix })
  // }

  queryRiskCall = (payload: params.RiskGetCall, stuffix?: string) => {
    return this.postHeader<any>(`/back_mgr/query_call_log_record`, payload, { stuffix })
  }

  updateRiskCall = (payload: params.ResiCallRemark) => {
    return this.post<any>(`/back_mgr/update_call_log_record`, payload)
  }

  approvalSendMsg = (payload: params.ApprovalSendMsgReq) => {
    return this.post('/back_mgr/approval_send_sms', payload)
  }

  getRepaymentInfo = (payload: params.RepaymentReq, stuffix?: string) => {
    return this.postHeader<response.RepaymentRes[]>('/back_mgr/query_repayment_schedule', payload, { stuffix })
  }

  // 还款订单列表
  getRepaymentList = (payload: params.repayments.RepaymentListReq) => {
    return this.post<params.repayments.RepaymentListRes>('/back_mgr/get_repayment_list', payload)
  }

  // 下载还款列表
  downloadRepaymentList = (payload: params.RepaymentlistDownloadReq) => {
    return this.download('/back_mgr/query_repayment_list', payload)
  }

  // 出催或入催逻辑(旧)
  csOperate = (payload: params.CsParamsReq) => {
    return this.postHeader<any>('/backManage/manual', payload, {}, '/collect')
  }

  // 出催或入催逻辑(新)
  newCsOperate = (payload: params.NewCsParamsReq) => {
    return this.postHeader<any>('/backManage/manual_operate', payload, {}, '/ncollect')
  }

  // 获取产品详情列表
  getProductDetail = () => {
    return this.post<response.ProductDetail[]>('/back_mgr/read_product_list')
  }

  // 获取全部订单列表
  getOrderList = (payload: params.OrderListReqState) => {
    return this.post<response.OrderListRes>('/back_mgr/get_order_list', payload)
  }

  // 下载全部订单列表
  downloadOrderList = (payload: params.OrderListReqState) => {
    return this.download('/back_mgr/export_application_list', params.transformOrderListReq(payload))
  }

  // 获取审核人列表
  getPersonApprove = () => {
    return this.post<any>('/query/user_auditor')
  }

  /**
   * 角色管理模块
   */
  // 获取角色列表
  getRoleList = (payload: params.GetRoleListReq) => {
    return this.post<response.RoleListRes>('/back_mgr/read_role_list', payload)
  }

  // 获取角色详情
  getRoleDetail = (payload: params.GetRoleDetailReq) => {
    return this.post<response.RoleDetail>('/back_mgr/read_role', payload)
  }

  // 获取权限列表
  getPermissionsList = () => {
    return this.post<response.PermissionsList[]>('/back_mgr/read_access_list')
  }

  // 新增角色
  addRole = (payload: params.UpdateRoleReq) => {
    return this.post('/back_mgr/create_role', payload)
  }

  // 编辑角色
  editRole = (payload: params.UpdateRoleReq) => {
    return this.post('/back_mgr/update_role', payload)
  }

  /**
   * 用户管理模块
   */

  // 用户模块列表
  getUserLists = (payload: any) => {
    return this.post<any>(`/back_mgr/read_operator_list`, payload)
  }

  // 冻结或解冻用户
  changeUserStatus = (payload: any) => {
    return this.post<any>(`/back_mgr/frozen_operator`, payload)
  }

  // 查询角色列表
  getRoleLists = (payload: any) => {
    return this.post<any>(`/query${payload.permission ? '/role_no_authority' : '/role'}`, payload)
  }

  // 新增用户
  addUsers = (payload: any) => {
    return this.post<any>(`/back_mgr/create_operator`, payload)
  }

  // 查询用户详情
  queryUserDetails = (payload: any) => {
    return this.post<any>(`/back_mgr/read_operator`, payload)
  }

  // 编辑用户详情
  editUsers = (payload: any) => {
    return this.post<any>(`/back_mgr/update_operator`, payload)
  }

  // 重置密码
  resetUsers = (payload: any) => {
    return this.post<any>(`/back_mgr/reset_password`, payload)
  }

  // 查询通话记录列表
  queryCallRecords = (payload: any) => {
    return this.post<any>(`/back_mgr/query_call_recording`, payload)
  }

  // 下载通话记录列表
  downloadCallRecords = (payload: any) => {
    return this.download<any>(`/back_mgr/query_call_recording`, payload)
  }

  // 线下还款提交
  submitOfflineRepay = (payload: params.OfflineRepayReq) => {
    return this.post('/back_mgr/offline_repayment', payload)
  }

  // 获取还款试算
  getRepaymentTrail = (payload: params.RepaymentTrial) => {
    return this.post<response.RepaymentTrialRes>('/back_mgr/offline_repayment_trial', payload)
  }

  // 获取分单员工选项
  getAllocationAccountList = () => {
    return this.post<response.AlloateAccountList[]>('/back_mgr/read_approval_operator_name_list')
  }

  // 分单
  submitAllocate = (payload: params.SubmitAllocateReq) => {
    return this.post('/back_mgr/allocate_application', payload)
  }

  // 黑名单管理列表
  queryBlacklistManagementLists = (payload: any) => {
    return this.post<any>('/back_mgr/get_order_list', payload)
  }

  // 加入黑名单
  addBlacklist = (payload: any) => {
    return this.post<any>('/back_mgr/add_black', payload)
  }

  // 黑名单列表
  queryBlacklists = (payload: any) => {
    return this.post<any>('/back_mgr/blacklist', payload)
  }

  // 移除黑名单
  removeBlacklist = (payload: any) => {
    return this.post<any>('/back_mgr/remove_black', payload)
  }

  // 批量放款
  getLoanOrRetryBatch = (payload: any) => {
    return this.post<any>('/back_mgr/make_loan_batch', payload)
  }
}

const getAPI = (request: ReqType) => new Api(request, createHeaderRequest())

export default getAPI(createRequest())
