import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Radio, Select } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Button from 'components/button'
import Message from 'components/message'
import { MixProps } from 'global/interface'
import ApprovalStore from 'stores/details/approval'
import { radioConfig, radioType } from './config'
import { ReasonType } from 'api/params'
import errs from 'global/errors'
import styles from './index.module.scss'

interface Props extends MixProps {
  approval: ApprovalStore
}

interface State {
  application_status: string
  reasons: ReasonType[]
  remark: string
}

@inject('approval')
@observer
export class Operate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      application_status: '',
      reasons: [],
      remark: ''
    }
  }

  componentDidMount = () => {
    this.getRefuseReason()
  }

  render() {
    const { remark } = this.state
    return (
      <div className={styles.wrap}>
        <div className={styles.radio_box}>{this.renderRadio()}</div>
        <div className={styles.select_box}>{this.renderSelect()}</div>
        <div className={styles.content_box}>
          <div className={styles.textarea_box}>
            <p>Comments</p>
            <textarea name="remark" value={remark} onChange={this.handleChangeTextarea} />
          </div>
          <div className={styles.tip}>{remark.length}/1000</div>
        </div>
        <div className={styles.operate_box}>
          <Button type="primary" onClick={this.handleSubmitInfo}>
            Confrirm to submit
          </Button>
        </div>
      </div>
    )
  }

  renderRadio = () => {
    return (
      <Radio.Group size="large" onChange={this.handleChangeRadio}>
        {radioConfig.map((item, index) => {
          return (
            <span className={styles.radio_item} key={index} id={`operate-${item.toLowerCase()}-btn`}>
              <Radio name="application_status" value={item} />
              {item}
            </span>
          )
        })}
      </Radio.Group>
    )
  }

  renderSelect = () => {
    const { refuseReasonList } = this.props.approval
    const { application_status } = this.state
    return (
      application_status === radioType.REJECTED && (
        <Select
          showArrow
          mode="multiple"
          style={{ width: 742 }}
          placeholder="Please select"
          onChange={this.handleChangeSelect}
        >
          {refuseReasonList.map(item => (
            <Select.Option key={item.id} value={item.reason_code}>
              {item.reason_code + ' ' + item.reason_value}
            </Select.Option>
          ))}
        </Select>
      )
    )
  }

  getRefuseReason = async () => {
    await this.props.approval.getRefuseReason()
  }

  // 选择审核结果
  handleChangeRadio = (e: RadioChangeEvent) => this.setState({ application_status: e.target.value })

  // 选择拒绝理由
  handleChangeSelect = (value: any) => console.log(value)

  // 输入备注
  handleChangeTextarea = (e: React.ChangeEvent<{ value: string }>) => {
    // 不允许输入汉字
    const value = e.target.value.replace(/[\u4E00-\u9FA5]/g, '')
    // 字符长度不允许超过1000
    if (value.length > 1000) return
    this.setState({
      remark: value
    })
  }

  // 提交审批
  handleSubmitInfo = () => {
    const { order_no } = this.props.location.state
    const { application_status, reasons, remark } = this.state
    // 审核状态不能为空
    if (!application_status) {
      Message.warning(errs.ORDER_APPROVE_EMPTY)
      return
    }

    // 当审核状态为拒绝时，拒绝理由不能为空
    if (application_status === radioType.REJECTED && !reasons.length) {
      Message.warning(errs.ORDER_APPROVE_RETURN_TYPE)
      return
    }

    this.props.approval.approvalOrder(
      {
        order_no,
        operator_name: sessionStorage.getItem('username'),
        operator_id: parseInt(sessionStorage.getItem('userId')!, 10),
        application_status,
        reasons,
        remark
      },
      this.handleApproveSuccess
    )
  }

  handleApproveSuccess = () => {
    this.props.history.push('/auth/my_orders')
  }
}

export default InfoWrapper('Operation approval')(Operate)
