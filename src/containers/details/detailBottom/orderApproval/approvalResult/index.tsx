import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from '../../../component/infoWrapper'
import ApprovalStore from 'stores/details/approval'
import { MixProps } from 'global/interface'
import { reflect_status } from './config'
import styles from './index.module.scss'
import * as response from 'api/response'

interface Props extends MixProps {
  approval: ApprovalStore
}

@inject('approval')
@observer
export class ApprovalResult extends Component<Props> {
  componentDidMount() {
    this.getApprovalResult()
  }

  render() {
    const { approvalResult } = this.props.approval
    return (
      <div className={styles.wrap}>
        <p className={styles.item}>Results of review : {this.setResponseData(approvalResult, 'review')}</p>
        <p className={styles.item}>Review time: {this.setResponseData(approvalResult, 'time')}</p>
        <p className={styles.item}>Reviewer: {this.setResponseData(approvalResult, 'reviewer')}</p>
        {this.showReason()}
        <p className={styles.item}>Remark: {this.setResponseData(approvalResult, 'remark')}</p>
      </div>
    )
  }

  //获取审批结果信息
  getApprovalResult = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.approval.getApprovalResult({
      order_no,
      suffix: `${viewType}_result`
    })
  }

  setResponseData = (data: response.ApprovalResult, type: string) => {
    switch (type) {
      case 'review':
        return this.filterStatus(data) ? data.application_status : ''
      case 'time':
        return this.filterStatus(data)
          ? data.application_status === 'AuditingReturn'
            ? data.return_time
            : data.application_finish_time
          : ''
      case 'reviewer':
        return this.filterStatus(data) ? data.operator_name : ''
      case 'remark':
        return this.filterStatus(data) ? data.remark : ''
      default:
        return ''
    }
  }

  filterStatus = (data: response.ApprovalResult) => {
    if (data.application_status !== 'WaitingForManualAuditing' && data.application_status !== 'ManualAuditing') {
      return true
    }
    return false
  }

  // 展示原因:机审拒绝 人审打回 人审拒绝 人审撤销
  showReason = () => {
    const { approvalResult, orderReason } = this.props.approval
    const { application_status } = approvalResult
    const key = reflect_status[application_status] as keyof typeof orderReason
    const reasonList: response.ReasonList[] = orderReason[key]!
    return (
      reasonList &&
      reasonList.map((item, index) => {
        return (
          <p key={index} className={styles.item}>
            Reason for {reflect_status[application_status]}
            {index + 1}: {item.reason_value}
          </p>
        )
      })
    )
  }
}

export default InfoWrapper('Results of review')(ApprovalResult)

// 展示逻辑是: 机审拒绝显示机审的内容
// 人审结果优先展示