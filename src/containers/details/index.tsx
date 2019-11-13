import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import BreadCrumb from 'components/breadCrumb'
import TabComponent from './component/tabComponent'
import { top_config, bot_config, getRouteState, getFinConfig, handlerRouter } from './utils'
import { MixProps } from 'global/interface'
import { userPermission } from 'design/permission'
import UserDetail from 'stores/details/userDetail'

import './index.scss'

// TODO: 类型
interface Props extends MixProps {
  userDetail: UserDetail
  params: {
    showType?: string
  }
}
@inject('userDetail')
@observer
export class OrderDetails extends Component<Props> {
  // 默认调用用户信息
  componentDidMount() {
    const { order_no, detail_type, customer_id } = getRouteState(this.props.location.search)
    const { getUserInfo } = this.props.userDetail
    getUserInfo({ order_no, detail_type, customer_id: customer_id }, detail_type)
  }
  render() {
    const { order_msg = {} } = this.props.userDetail
    if (JSON.stringify(order_msg) === '{}') return null
    let props: any = {
      ...this.props
    }
    props.location.state = { ...props.location.state, ...getRouteState(this.props.location.search) }
    if (order_msg.mobile_id) {
      props.location.state = { ...props.location.state, mobile_id: order_msg.mobile_id }
    }
    const bread_router = handlerRouter(props.location.state.detail_type)
    const isEdit =
      props.location.state.detail_type === 'my_orders' && !this.props.location.pathname.includes('readOnly')
    props = { ...props, isEdit }
    return (
      <div className="order-details-page">
        <div className="bread-header">
          <BreadCrumb routes={bread_router} {...props} />
        </div>
        <div className="information-box">
          <TabComponent
            {...props}
            config={getFinConfig(top_config(props.location.state.detail_type, userPermission.finnalPermission))}
            level="top"
          />
        </div>
        <div className="loan-info-box">
          <TabComponent
            {...props}
            config={getFinConfig(bot_config(isEdit, props.location.state.detail_type, userPermission.finnalPermission))}
            level="bot"
          />
        </div>
      </div>
    )
  }
}
export default OrderDetails

/**
 * 逻辑调整:
 * 拿到数据后渲染页面: 是由于还款列表没有mobile_id 所以从用户信息中取
 * 1. 先获取路由的参数添加到props.location.state中 { ...props.location.state, ...getRouteState(this.props) }
 * 2. 拿到详情后替换mobile_id
 */
