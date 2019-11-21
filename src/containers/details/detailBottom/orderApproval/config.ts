// 以下订单状态隐藏审批结果(订单列表、还款列表P3.12.1需求问题记录)
export const hideApproveResultOrderStatus = ['ManualAuditing', 'WaitingForManualAuditing']

// 以下是我的订单列表进来可以看到审批结果的订单状态
export const showApproveResultOrderStatus = ['AuditingReturn']

// 隐藏我的订单-详情-审批操作的订单状态
export const hideApproveOperateOrderStatus = ['AuditingReturn']
