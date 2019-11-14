import React, { Component } from 'react'
import BreadCrumb from 'components/breadCrumb'
import TabComponent from './component/tabComponent'
import { MixProps } from 'global/interface'
import './index.scss'
import { top_config, bot_config, handlerRouter } from './utils'
// todo
interface Props extends MixProps {
  userDetail: {}
  params: {
    showType?: string
  }
}

export class OrderDetails extends Component<Props> {
  // 默认调用用户信息

  render() {
    const breadRouter = handlerRouter(this.props.location.state.detail_type)
    return (
      <div className="order-details-page">
        <div className="bread-header">
          <BreadCrumb routes={breadRouter} {...this.props} />
        </div>
        <div className="information-box">
          <TabComponent {...this.props} config={top_config()} level="top" />
        </div>
        <div className="loan-info-box">
          <TabComponent {...this.props} config={bot_config()} level="bot" />
        </div>
      </div>
    )
  }
}

export default OrderDetails
