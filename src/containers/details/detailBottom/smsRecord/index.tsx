import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import { SMSRecordColumns } from './config'
import Table from 'components/table'
import './index.scss'
import { MixProps } from 'global/interface'
// import { SMSRecordList } from 'api/response'
// import { sms } from 'global/constants'
import { observer, inject } from 'mobx-react'
import SMSRecordStore from 'stores/details/smsRecord'
import { SMSRecordReq } from 'interface/details/smsRecord'

interface Props extends MixProps {
  currentList?: string
  smsRecord: SMSRecordStore
}

interface State {
  showSendMsgBtn: boolean
  request: SMSRecordReq
}

@inject('smsRecord')
@observer
export class SMSRecord extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showSendMsgBtn: false,
      request: {
        PermissionId: '30102',
        order_no: 'P2g201911140004'
      }
    }
  }

  componentDidMount() {
    // const { currentList } = this.props
    // const { showType } = this.props.match.params
    // TODO Auth
    // if (window.getAuthorityBoolean(SMSRecordPermission[type])) {
    //   this.getSMSRecordInfo()
    // }
    this.getSMSRecordInfo()

    // if (currentList === 'my_order' && showType !== 'readOnly') this.setState({ showSendMsgBtn: true })
  }

  getSMSRecordInfo = async () => {
    const { request } = this.state
    await this.props.smsRecord.getLoanInfoList(request, 'repayment_list')
    // const { dispatch, location, currentList } = this.props
    // const { order_no = '' } = location.state || {}
    // dispatch({
    //   type: Type.GET_SMS_RECORD_REQUEST,
    //   payload: {
    //     order_no,
    //     PermissionId: sms[currentList!]
    //   },
    //   cb: this.handleSuccess,
    //   currentList
    // })
  }

  // handleSuccess = (data: SMSRecordList[]) => {
  //   this.setState({
  //     data
  //   })
  // }

  render() {
    const { SMSRecordList } = this.props.smsRecord
    return (
      <div className="sms-record-box">
        {/* {showSendMsgBtn && <div className="header-right">{this.renderSendMsgBtn()}</div>} */}
        <Table tableTitle={SMSRecordColumns} tableData={SMSRecordList} size="small" />
      </div>
    )
  }
  // 渲染发送短信按钮
  // renderSendMsgBtn = () => {
  //   return SendMsgBtn.map((item, index) => {
  //     return (
  //       <button
  //         key={index}
  //         className="theme-btn"
  //         onClick={this.handleSendMsg(item.type as SendMsgType)}
  //         id={`sms-${item.type}-btn`}
  //       >
  //         {item.text}
  //       </button>
  //     )
  //   })
  // }

  // 发送短信
  // handleSendMsg = (type: SendMsgType) => () => {
  //   // 弹出模态框提示
  //   this.props.dispatch({
  //     type: Type.OPEN_CONFIRM_REQ,
  //     payload: {
  //       title: SendMsg[type].title,
  //       text: SendMsg[type].text,
  //       // 如果确认发送短信，发起发送短信请求
  //       onOk: this.confirmSendMsg(type),
  //       onCancel: this.closeConfirm
  //     }
  //   })
  // }

  // 确认发送短信
  // confirmSendMsg = (type: SendMsgType) => () => {
  //   const { dispatch, location } = this.props
  //   const { order_no = '' } = location.state || {}
  //   // 核对接口时启用
  //   dispatch({
  //     type: Type.SMS_RECORD_SEND_MSG_REQUEST,
  //     payload: {
  //       order_no,
  //       button_type: SendMsgType[type]
  //     },
  //     cb: this.getSMSRecordInfo
  //   })
  //   this.closeConfirm()
  // }
  // 关闭模态框
  // closeConfirm = () => {
  //   this.props.dispatch({
  //     type: Type.CLOSE_CONFIRM_REQ
  //   })
  // }
}

export default InfoWrapper('SMS record')(SMSRecord)
