import React, { Component } from 'react'
import ApprovalResult from './approvalResult'
import Call from './call'
import Operate from './operate'
import { MixProps } from 'global/interface'
import { orderStatus } from './config'
import { intoDetail } from 'global/constants'

class OrderApproval extends Component<MixProps> {
  render() {
    const { viewType } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    const callData = { ...this.props, editPermission: isMine }
    return (
      <div>
        {this.isShowApproveResult() && <ApprovalResult {...this.props} />}
        <Call {...callData} />
        {this.isShowApproveOperate() && <Operate {...this.props} />}
      </div>
    )
  }

  // 显示、隐藏审批结果
  isShowApproveResult() {
    const { viewType, application_status } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    // 从我的订单列表页跳转过来的 + 非 AuditingReturn 状态，隐藏
    if (isMine && application_status !== orderStatus.AUDITINGRETURN) {
      return false
    }
    // 不是从我的订单列表页跳转过来的 + 状态为 ManualAuditing、WaitingForManualAuditing，隐藏
    if (
      !isMine &&
      (application_status === orderStatus.MANUALAUDITING || application_status === orderStatus.WAITINGFORMANUALAUDITING)
    ) {
      return false
    }
    return true
  }

  // 显示、隐藏审核操作
  isShowApproveOperate() {
    const { viewType, application_status } = this.props.location.state
    // 从我的订单列表页跳转过来的 + 非 AuditingReturn 状态，显示
    return viewType === intoDetail.MYORDER && application_status !== orderStatus.AUDITINGRETURN
  }
}

export default OrderApproval
