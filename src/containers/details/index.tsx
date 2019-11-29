import React, { Component } from 'react'
import BreadCrumb from 'components/breadCrumb'
import TabComponent from './component/tabComponent'
import { MixProps } from 'global/interface'
import './index.scss'
import { top_config, bot_config, handlerRouter } from './utils'
import ApprovalStore from 'stores/details/approval'
import { inject, observer } from 'mobx-react'
import UserDetail from 'stores/details/userInfo'
interface Props extends MixProps {
  approval: ApprovalStore
  userDetail: UserDetail
  params: {
    showType?: string
  }
}

@inject('userDetail')
@observer
export class OrderDetails extends Component<Props> {
  // 默认调用用户信息 需要duplicate_status 去判断是否显示小红点
  componentDidMount() {
    const { getUserInfo } = this.props.userDetail
    const { order_no } = this.props.location.state
    getUserInfo({ order_no })
  }
  render() {
    const { state } = this.props.location
    if (!state) return
    const breadRouter = handlerRouter(state.detail_type)
    // const {
    //   // order_msg: { duplicate_status }
    // } = this.props.userDetail
    // TODO: hasResult
    // const hasResult = this.props.userDetail.order_msg && duplicate_status && duplicate_status === 'HasResult'
    return (
      <div className="order-details-page">
        <div className="bread-header">
          <BreadCrumb routes={breadRouter} {...this.props} />
        </div>
        <div className="information-box">
          <TabComponent {...this.props} config={top_config(true)} level="top" />
        </div>
        <div className="loan-info-box">
          <TabComponent {...this.props} config={bot_config()} level="bot" />
        </div>
      </div>
    )
  }
}

export default OrderDetails
