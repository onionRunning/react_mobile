import React, { Component } from 'react'
import Switch from 'components/switch'
import { switchStatus } from './config'
import { turnToSwitchMsg } from './utils'
import { autoLoanNoData, SwitchInterface, StateInterface, OnOff } from './config'
import './index.scss'
import { inject, observer } from 'mobx-react'
import Lendings from 'stores/lendings'

interface Props {
  lendings: Lendings
  modalClose: () => void
}

@inject('lendings')
@observer
export class AutoLendingConfirm extends Component<Props, StateInterface> {
  constructor(props: Props) {
    super(props)
    this.state = {
      switchMsg: [] // 自动放款数据信息设置
    }
  }
  componentDidMount() {
    // 初始化时检测自动放款按钮的状态-获取服务器状态,直接修改初始状态
    this.initAutoLoan()
  }
  render() {
    const { modalClose } = this.props
    const { switchMsg } = this.state
    return (
      <div className="confirm-box">
        <div className="confirm-mask" />
        <div className="confirm-wrapper">
          <h3 className="confirm-title">
            {'Automatic lending'}
            <i className="title-close-icon" onClick={modalClose}>
              ×
            </i>
          </h3>
          <div className="confirm-content">
            {this.renderContent()}
            {switchMsg.length > 0 && (
              <button className="auto-loan-submit" onClick={this.handleSubmit} id="auto-loan-sub">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  renderContent() {
    const { switchMsg } = this.state
    if (switchMsg.length <= 0) {
      return <p>{autoLoanNoData}</p>
    }
    return switchMsg.map((item, index) => {
      return (
        <Switch checked={item.checked} onChangeSwitch={() => this.handleSwitch(item)} label={item.label} key={index} />
      )
    })
  }
  // 提交修改
  handleSubmit = () => {
    const { modalClose } = this.props
    let { switchMsg } = this.state
    modalClose()
    this.switchAutoLoan(switchMsg)
  }
  // 处理切换状态
  handleSwitch = (item: SwitchInterface) => {
    let msg = [...this.state.switchMsg]
    msg.map(el => {
      if (el.id === item.id) {
        el.checked = !el.checked
        el.value = this.toggleValue(el.value)
      }
      return el
    })
    this.setState({ switchMsg: msg })
  }
  // 值的切换
  toggleValue = (value: OnOff): OnOff => {
    if (value === switchStatus.on) return switchStatus.off as OnOff
    return switchStatus.on as OnOff
  }

  initAutoLoan = () => {
    const { checkAutoStatus } = this.props.lendings
    checkAutoStatus(this.initAutoLoanMsg)
  }
  // 初始化自动放款开关数据
  initAutoLoanMsg = (res: SwitchInterface[]) => {
    let switchMsg = turnToSwitchMsg(res)
    this.setState({
      switchMsg: switchMsg
    })
  }

  switchAutoLoan = (req: SwitchInterface[]) => {
    // 处理自动放款
    const { UpdateAutoStatus } = this.props.lendings
    UpdateAutoStatus(req)
  }
}

export default AutoLendingConfirm
