import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from '../../../component/infoWrapper'
import ApprovalStore from 'stores/details/approval'
import { MixProps } from 'global/interface'
import styles from './index.module.scss'

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
    const { application_status, application_finish_time, operator_name, remark } = this.props.approval.approvalResult
    return (
      <div className={styles.wrap}>
        <p className={styles.item}>Results of review : {application_status}</p>
        <p className={styles.item}>Review time: {application_finish_time}</p>
        <p className={styles.item}>Reviewer: {operator_name}</p>
        {this.renderReason()}
        <p className={styles.item}>Remark: {remark}</p>
      </div>
    )
  }

  //获取审批结果信息
  getApprovalResult = async () => {
    const { order_no } = this.props.location.state
    await this.props.approval.getApprovalResult({
      order_no
    })
  }

  // 渲染拒绝理由
  renderReason = () => {
    const { orderReason } = this.props.approval
    return orderReason.map((item, index) => {
      return (
        <p key={index} className={styles.item}>
          Reason for reject_reason
          {index + 1}: {item.reason_value}
        </p>
      )
    })
  }
}

export default InfoWrapper('Results of review')(ApprovalResult)

// 展示逻辑是: 机审拒绝显示机审的内容
// 人审结果优先展示
