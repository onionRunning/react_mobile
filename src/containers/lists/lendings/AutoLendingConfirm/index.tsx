import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Switch from 'components/switch'
import Lendings from 'stores/lendings'
import * as lendings from 'interface/lendings'
import { autoLoanNoData, OnOff, switchStatus } from './config'
import './index.scss'

interface Props {
  lendings: Lendings
  modalClose: () => void
}

interface StateInterface {
  switchMsg: lendings.AutoLoanItem[]
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
        <Switch
          checked={item.current_status === 'on'}
          onChangeSwitch={() => this.handleSwitch(item)}
          label={item.product_name}
          key={index}
        />
      )
    })
  }
  // 提交修改
  handleSubmit = () => {
    const { modalClose } = this.props
    const { switchMsg } = this.state
    modalClose()
    const switches = switchMsg.map((item: lendings.AutoLoanItem) => {
      return {
        product_name: item.product_name,
        switch_to: item.current_status
      }
    })
    this.switchAutoLoan(switches)
  }
  // 处理切换状态
  handleSwitch = (item: lendings.AutoLoanItem) => {
    const msg = [...this.state.switchMsg]
    msg.map(el => {
      if (el.product_name === item.product_name) {
        el.current_status = this.toggleValue(item.current_status)
      }
      return el
    })
    this.setState({ switchMsg: msg })
  }
  // 值的切换
  toggleValue = (value: string): OnOff => {
    if (value === switchStatus.on) return switchStatus.off as OnOff
    return switchStatus.on as OnOff
  }

  initAutoLoan = () => {
    const { checkAutoStatus } = this.props.lendings
    checkAutoStatus(this.initAutoLoanMsg)
  }
  // 初始化自动放款开关数据
  initAutoLoanMsg = (res: lendings.AutoLoanItem[]) => {
    this.setState({
      switchMsg: res
    })
  }

  switchAutoLoan = (req: lendings.UpdateAutoLoanItem[]) => {
    // 处理自动放款
    const { UpdateAutoStatus } = this.props.lendings
    UpdateAutoStatus({ switches: req })
  }
}

export default AutoLendingConfirm
