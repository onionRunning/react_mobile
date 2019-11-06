export interface Module {
  p1: boolean //订单模块
  p2: boolean // 放款模块
  p3: boolean //还款模块
  p4: boolean // 设置模块
  p5: boolean // 其他内容模块（通话录音）
}

export interface Order {
  p101: boolean // 订单列表
  p102: boolean // 我的订单
  p103: boolean // 黑名单管理
  p104: boolean // 黑名单列表
}
export interface Lending {
  p201: boolean // 放款列表
}

export interface Repayment {
  p301: boolean // 还款列表
}

export interface Setting {
  p401: boolean // 用户列表
  p402: boolean // 角色列表
}

export interface CallRecords {
  p501: boolean // 通话录音列表
}

export interface OrderListFunc {
  p10101: boolean // 订单列表详情
  p10102: boolean // 订单列表下载功能
  p10103: boolean // 分单
}
export interface MyOrderFunc {
  p10201: boolean // 我的列表详情
  p10202: boolean // 我的列表领取订单功能
}

export interface BlacklistManagementFunc {
  p10301: boolean // 加入黑名单
}

export interface BlacklistFunc {
  p10401: boolean // 黑名单列表下载功能
  p10402: boolean // 移除黑名单
}

export interface OrderListDetail {
  p1010101: boolean //用户信息
  p1010102: boolean // 查重信息
  p1010103: boolean // 通讯录信息
  p1010104: boolean // 设备信息
  p1010105: boolean // 审批操作
  p1010106: boolean // 还款信息
  p1010107: boolean // 放款信息
  p1010108: boolean // 短信记录
  p1010109: boolean // 状态记录
}

export interface MyOrderDetail {
  p1020101: boolean //用户信息
  p1020102: boolean // 查重信息
  p1020103: boolean // 通讯录信息
  p1020104: boolean // 设备信息
  p1020105: boolean // 审批操作
  p1020106: boolean // 还款信息
  p1020107: boolean // 放款信息
  p1020108: boolean // 短信记录
  p1020109: boolean // 状态记录
}

export interface LendingFunc {
  p20101: boolean // 自动放款开关
  p20102: boolean // 下载放款列表
  p20103: boolean // 确认手动放款
  p20104: boolean // 重试放款
  p20105: boolean // 贷款取消
  p20106: boolean // 批量放款
}

export interface RepaymentFunc {
  p30101: boolean // 还款列表详情
  p30102: boolean // 还款列表下载
  p30103: boolean // 入催功能按钮
  p30104: boolean // 出催功能按钮
  p30105: boolean // 线下还款接口
}

export interface RepaymentDetail {
  p3010101: boolean //用户信息
  p3010102: boolean // 查重信息
  p3010103: boolean // 通讯录信息
  p3010104: boolean // 设备信息
  p3010105: boolean // 审批操作
  p3010106: boolean // 还款信息
  p3010107: boolean // 放款信息
  p3010108: boolean // 短信记录
  p3010109: boolean // 状态记录
}

export interface UserFunc {
  p40101: boolean // 新增员工
  p40102: boolean // 查看员工
  p40103: boolean // 修改员工
  p40104: boolean // 启用/禁用
  p40105: boolean // 重置密码
}

export interface RoleFunc {
  p40201: boolean // 新增角色
  p40202: boolean // 查看角色
  p40203: boolean // 修改角色
}

export interface CallRecordsFunc {
  p50101: boolean // 录音列表下载
  p50102: boolean // 录音下载
}

export interface FinnalPermission {
  _module: Module
  order: Order
  lending: Lending
  repayment: Repayment
  setting: Setting
  call_records: CallRecords
  order_list_func: OrderListFunc
  my_order_func: MyOrderFunc
  blacklist_management_func: BlacklistManagementFunc
  blacklist_func: BlacklistFunc
  order_list_detail: OrderListDetail
  my_order_detail: MyOrderDetail
  lending_func: LendingFunc
  repayment_func: RepaymentFunc
  repayment_detail: RepaymentDetail
  user_func: UserFunc
  role_func: RoleFunc
  call_records_func: CallRecordsFunc
  my_order_reflect?: any
  order_list_reflect?: any
  repayment_reflect?: any
}
// reflect 是为了复用编号  将后端权限整理 - 前端对应的编号
