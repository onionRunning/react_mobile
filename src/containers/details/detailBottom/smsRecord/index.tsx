import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import Button from 'components/button'
import { SMSRecordColumns, SendMsg, SendMsgBtn, SendMsgType } from './config'
import { MixProps } from 'global/interface'
import DetailsStore from 'stores/details'
import CommonStore from 'stores/common'
import * as params from 'api/params'
import { intoDetail } from 'global/constants'
import styles from './index.module.scss'

interface Props extends MixProps {
  details: DetailsStore
  common: CommonStore
}

interface State {
  showSendMsgBtn: boolean
  request: params.SMSRecordReq
}

@inject('details', 'common')
@observer
export class SMSRecord extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showSendMsgBtn: false,
      request: {
        PermissionId: '',
        order_no: ''
      }
    }
  }

  componentDidMount() {
    this.getSMSRecordInfo()
  }

  render() {
    const { viewType } = this.props.location.state
    const { SMSRecordList } = this.props.details
    return (
      <div className={styles.wrap}>
        {viewType === intoDetail.MYORDER && <div className={styles.operate_wrap}>{this.renderSendMsgBtn()}</div>}
        <Table tableTitle={SMSRecordColumns} tableData={SMSRecordList} size="small" />
      </div>
    )
  }

  // 渲染发送短信按钮
  renderSendMsgBtn = () => {
    return SendMsgBtn.map((item, index) => {
      return (
        <Button
          key={index}
          type="primary"
          onClick={this.handleClickBtn(item.type as SendMsgType)}
          id={`sms-${item.type}-btn`}
        >
          {item.text}
        </Button>
      )
    })
  }

  // 获取短信记录
  getSMSRecordInfo = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.details.getSMSRecordList(
      {
        ...this.state.request,
        order_no
      },
      viewType
    )
  }

  // 点击发送短信按钮
  handleClickBtn = (type: SendMsgType) => () => {
    // 弹出模态框提示
    this.props.common.changeConfirm({
      show: true,
      title: SendMsg[type].title,
      text: SendMsg[type].text,
      onOk: this.confirmSendMsg(type),
      onCancel: this.closeConfirm
    })
  }

  // 确认发送短信
  confirmSendMsg = (type: SendMsgType) => async () => {
    const { order_no } = this.props.location.state
    await this.props.details.sendMsgSMSRecord(
      {
        order_no,
        button_type: type
      },
      this.sendMsgSuccess
    )
  }

  // 发送成功后的回调
  sendMsgSuccess = () => {
    this.closeConfirm()
    this.getSMSRecordInfo()
  }

  // 关闭模态框
  closeConfirm = () => {
    this.props.common.changeConfirm({
      show: false
    })
  }
}

export default InfoWrapper('SMS record')(SMSRecord)
