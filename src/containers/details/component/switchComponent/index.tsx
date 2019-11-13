import React, { Component } from 'react'
// import ContactInfo from 'containers/details/detailTop/contactInfo' // 联系人信息
import UserInfo from 'containers/details/detailTop/userInfo'
// import MobileInfo from 'containers/details/detailTop/mobileInfo'
// import CheckRepeat from 'containers/details/detailTop/checkRepeat'
// import Approval from 'containers/details/detailBottom/approval'
// import LoanInfo from 'containers/details/detailBottom/loanInfo'
// import SMSRecord from 'containers/details/detailBottom/smsRecord'
// import StatusRecord from 'containers/details/detailBottom/statusRecord'
// import Repayment from 'containers/details/detailBottom/repayment'
import { MixProps } from 'global/interface'
// import { userPermission } from 'design/permission'
// import { typeReflect } from 'global/constants'

interface Props extends MixProps {
  type: string
  level?: string
}

interface State {
  height: number
}

export class SwitchComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      height: this.getHeight()
    }
  }
  componentDidMount() {
    this.screenChange()
  }
  // todo 防抖 && 节流
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  screenChange = () => {
    window.addEventListener('resize', this.resize)
  }
  resize = () => {
    this.setState({
      height: this.getHeight()
    })
  }
  getHeight = () => {
    const viewHeight = document.documentElement.clientHeight || document.body.clientHeight
    return (viewHeight - 42 - 48 - 36 * 2 - 10) / 2
  }

  // TODO : p0-p3 用户信息上半模块
  //  p4- p8 下半模块
  // 根据权限展示 动态控制上下模块的高度
  finHeight = () => {
    // const { level } = this.props
    // let p: any = userPermission.finnalPermission
    // const { detail_type } = this.props.location.state
    // const temps = p[`${typeReflect[detail_type]}_reflect`]
    // const hasTop = temps.p0 || temps.p1 || temps.p2 || temps.p3 // 有上半模块
    // const hasBot = temps.p4 || temps.p5 || temps.p6 || temps.p7 || temps.p8 // 有下半模块
    // switch (true) {
    //   case level === 'top' && hasTop && !hasBot:
    //   case level === 'bot' && !hasTop && hasBot:
    //     return this.getHeight() * 2 + 36
    //   case level === 'top' && hasTop:
    //   case level === 'bot' && hasBot:
    //     return this.getHeight()
    //   default:
    //     return 0
    // }
    return this.getHeight()
  }

  render() {
    const { type } = this.props
    console.log(this.finHeight())
    return (
      <div className="loan-info-container" style={{ height: this.finHeight() }}>
        {this.renderTabs(type)}
      </div>
    )
  }

  renderTabs = (type: string) => {
    switch (type) {
      // case 'Repayment':
      //   return <Repayment {...this.props} />
      // case 'Loan':
      //   return <LoanInfo {...this.props} />
      // case 'SMS record':
      //   return <SMSRecord {...this.props} />
      // case 'Status record':
      //   return <StatusRecord {...this.props} />
      // case 'Approve operate':
      //   return <Approval {...this.props} />
      case 'User info':
        return <UserInfo {...this.props} />
      // case 'Address book':
      //   return <ContactInfo {...this.props} />
      // case 'Mobile device information':
      //   return <MobileInfo {...this.props} />
      // case 'Duplicate checking detection':
      //   return <CheckRepeat {...this.props} />
      default:
        return ''
    }
  }
}

export default SwitchComponent
