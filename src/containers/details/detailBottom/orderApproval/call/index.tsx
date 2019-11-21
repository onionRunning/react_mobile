import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import { MixProps } from 'global/interface'
import ApprovalStore from 'stores/details/approval'
import Select from 'components/select'
import { Table } from 'antd'
import { phoneOps, Columns } from './utils'
import { SelectOption } from 'components/select'
import PhoneIcon from './images/phone@2x.png'
import styles from './index.module.scss'
import * as response from 'api/response'
import Message from 'components/message'
import CallConfirm from './callConfirm'

interface Props extends MixProps {
  editPermission?: boolean
  approval: ApprovalStore
}

interface State {
  callRecord: response.TelephoneList[]
  call_phone: string
  visible: boolean
  name: string
  relation_ship: string
  call_id: string
}

const SELF2 = 'self2'

@inject('approval')
@observer
class Call extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      callRecord: [],
      call_phone: '',
      visible: false,
      name: '',
      relation_ship: '',
      call_id: ''
    }
  }
  componentDidMount() {
    // const current = this.props.match.params.type === intoDetail.MYORDER
    // current && this.getAppLists()

    // this.getApproval()
    // this.getAllCallLists()
    // this.getCallRecordDetail()
    this.init()
  }

  render() {
    // const { editPermission = true } = this.props
    const { visible, name, relation_ship } = this.state
    return (
      <div className="call-record">
        <div className="call-record-cons">
          <div className="call-record-cons-top">{this.renderPhone()}</div>
          {/* {editPermission && (
            <div className="call-record-cons-bot">
              <AddCallRecord {...this.props} getAllCallLists={this.getAllCallLists} getApproval={this.getApproval} />
            </div>
          )} */}
          <CallConfirm
            show={visible}
            name={name}
            relation_ship={relation_ship}
            onCancel={this.handleClickCancel}
            onConfirm={this.handleClickConfirm}
          />
        </div>
      </div>
    )
  }

  // 展示记录
  renderPhone = () => {
    const { callRecord } = this.state
    const { editPermission } = this.props
    // 将self2放在self后面 对数组重新排序
    const self2Index = callRecord && callRecord.findIndex(item => item.relation_ship === SELF2)
    if (callRecord && self2Index !== -1) {
      const self2 = callRecord.filter(item => item.relation_ship === SELF2)
      callRecord.splice(self2Index!, 1)
      callRecord.splice(1, 0, self2[0])
    }
    return (
      <ul className={styles.content}>
        {callRecord &&
          callRecord.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                <div className={styles.item_top}>
                  <div>{item.relation_ship}</div>
                  <div>
                    <span>Name:</span>
                    <span>{item.user_name}</span>
                  </div>
                  <div>
                    <span>Phone number:</span>
                    <span>{item.cellphone}</span>
                  </div>
                  <div className={styles.view_btn} onClick={this.handleClickView(index)}>
                    View call history
                  </div>
                  {editPermission && (
                    <div>
                      <Select
                        list={phoneOps}
                        size="default"
                        value={item.selectValue}
                        onChange={this.handleChangeSelect(index)}
                      />
                    </div>
                  )}
                  {editPermission && (
                    <div>
                      <img src={PhoneIcon} alt="phone" onClick={this.handleclickphone(item)} />
                    </div>
                  )}
                </div>
                {item.show && (
                  <div key={index}>
                    <Table columns={Columns} dataSource={item.detailList} size="small" pagination={false} />
                  </div>
                )}
              </li>
            )
          })}
      </ul>
    )
  }

  init = async () => {
    await this.getTelephoneVerifyInfo()
    await this.getCallRecordDetail()
  }

  // 获取联系人列表
  getTelephoneVerifyInfo = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.approval.getTelephoneVerifyInfo(
      {
        order_no,
        suffix: `${viewType}_result`
      },
      this.handleTelephoneVerifyInfo
    )
  }

  // 获取联系人列表成功后，对数据进行处理
  handleTelephoneVerifyInfo = (result: response.TelephoneList[]) => {
    const newCallRecord = result!.map(el => {
      return { ...el, cellphone: `${el.relation_ship === 'self' ? '0' : ''}${el.cellphone}`, show: false }
    })
    this.setState({
      callRecord: [...newCallRecord]
    })
  }

  // 显示、隐藏当前号码的通话记录详情列表
  handleClickView = (currentIndex: number) => () => {
    const { callRecord } = this.state
    const newCallRecord = callRecord!.map((el, index) => {
      if (currentIndex === index) {
        return { ...el, show: !el.show }
      }
      return el
    })
    this.setState({
      callRecord: [...newCallRecord]
    })
  }

  // 获取当前号码的通话记录详情
  getCallRecordDetail = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.approval.getCallRecord(
      {
        internal_id: order_no,
        internal_sys: 1,
        suffix: `${viewType}_result`
      },
      this.handleCallRecordDetail
    )
  }

  // 获取当前号码的通话记录详情后，对数据进行处理
  handleCallRecordDetail = (result: response.CallRecordInfoList[]) => {
    const { callRecord } = this.state
    const newCallRecord = callRecord.map(el => {
      const filterArr = result.filter(item => item.call_to === el.cellphone)
      return {
        ...el,
        detailList: filterArr
      }
    })
    this.setState({
      callRecord: [...newCallRecord]
    })
  }

  handleChangeSelect = (currentIndex: number) => (item: SelectOption) => {
    const { callRecord } = this.state
    const newCallRecord = callRecord!.map((el, index) => {
      if (currentIndex === index) {
        return { ...el, selectValue: item.value }
      }
      return el
    })
    this.setState({
      callRecord: [...newCallRecord]
    })
  }

  handleclickphone = (item: response.TelephoneList) => async () => {
    const { order_no, cellphone, id, selectValue } = item
    if (!selectValue) {
      Message.error('Please select the cloud phone number')
      return
    }

    this.setState({
      name: item.user_name,
      relation_ship: item.relation_ship
    })

    await this.props.approval.callUp(
      {
        internal_id: order_no,
        internal_sys: 1, // 默认为1
        call_from: selectValue,
        call_to: cellphone,
        third_channel: 'yeastar',
        approval_call_id: id
      },
      this.callUpSuccess
    )
  }

  callUpSuccess = (id: string) => {
    this.setState({
      call_id: id,
      visible: true
    })
  }

  handleClickCancel = () => {
    this.setState(
      {
        visible: false
      },
      this.getCallRecordDetail
    )
  }

  handleClickConfirm = async (reason: string, remark: string) => {
    const { call_id } = this.state
    await this.props.approval.updateCallInfo(
      {
        call_id,
        reason,
        remark,
        call_status: 'fail'
      },
      this.updateCallInfoSuccess
    )
  }

  updateCallInfoSuccess = () => {
    this.handleClickCancel()
  }
}

export default InfoWrapper('Telephone verification')(Call)
