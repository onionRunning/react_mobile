import React, { Component } from 'react'
import ApprovalResult from './approvalResult'
import Call from './call'
import Operate from './operate'
import { MixProps } from 'global/interface'
import { orderStatus } from './config'
import { intoDetail } from 'global/constants'

class OrderApproval extends Component<MixProps> {
  render() {
    const { viewType, application_status } = this.props.location.state
    const isMine = viewType === intoDetail.MYORDER
    const callData = { ...this.props, editPermission: isMine }
    return (
      <div>
        {/* 不是从我的订单列表页跳转过来的 + 状态不是 ManualAuditing、WaitingForManualAuditing */}
        {!isMine &&
          application_status !== orderStatus.MANUALAUDITING &&
          application_status !== orderStatus.WAITINGFORMANUALAUDITING && <ApprovalResult {...this.props} />}
        <Call {...callData} />
        {isMine && <Operate {...this.props} />}
      </div>
    )
  }
}

export default OrderApproval
