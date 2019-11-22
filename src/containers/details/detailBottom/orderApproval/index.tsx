import React, { Component } from 'react'
import ApprovalResult from './approvalResult'
import Call from './call'
import Operate from './operate'
import { MixProps } from 'global/interface'
import { hideApproveResultOrderStatus, showApproveResultOrderStatus } from './config'
import { intoDetail } from 'global/constants'

class OrderApproval extends Component<MixProps> {
  render() {
    const { viewType } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    const callData = { ...this.props, editPermission: isMine }
    return (
      <div>
        {this.handleShowApproveResult() && <ApprovalResult {...this.props} />}
        <Call {...callData} />
        {this.handleShowApproveOperate() && <Operate {...this.props} />}
      </div>
    )
  }

  // 处理审批结果内容块显示和隐藏
  handleShowApproveResult() {
    const { viewType, application_status } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    // 从我的订单列表页跳转过来的 + 非 AuditingReturn 状态，隐藏
    if (isMine && !showApproveResultOrderStatus.includes(application_status)) {
      return false
    }
    // 不是从我的订单列表页跳转过来的 + 状态为 ManualAuditing、WaitingForManualAuditing，隐藏
    if (!isMine && hideApproveResultOrderStatus.includes(application_status)) {
      return false
    }
    return true
  }

  // 处理审核操作显示和隐藏
  handleShowApproveOperate() {
    const { viewType, application_status } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    // 从我的订单列表页跳转过来的 + 非 AuditingReturn 状态，显示
    if (isMine && !hideApproveResultOrderStatus.includes(application_status)) {
      return true
    }
    return false
  }
}

export default OrderApproval
