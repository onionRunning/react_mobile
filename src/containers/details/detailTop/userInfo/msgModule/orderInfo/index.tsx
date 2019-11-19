import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { OrderInfoInput, scoreConfig } from './config'
// import { imgPath } from 'global/constants'
import './index.scss'
import UserDetail from 'stores/details/userDetail'
import { intoDetail } from 'global/constants'

interface Props {
  userDetail: UserDetail
  currentList: string
}

export class OrderInfo extends Component<Props> {
  render() {
    return (
      <div className="info-content info-order">
        <div className="sig-cons">{this.renderContent()}</div>
      </div>
    )
  }
  renderContent = () => {
    const {
      currentList,
      userDetail: { order_msg, score_card_results }
    } = this.props
    let orderConfig = OrderInfoInput
    const status = order_msg && order_msg.application_status !== 'WaitingForManualAuditing'
    // 我的订单 && 订单状态待人审 隐藏分数
    if (currentList !== intoDetail.ORDERS && status) {
      orderConfig = [...OrderInfoInput, ...scoreConfig]
    }
    return (
      <>
        <FormInputListUI config={orderConfig} data={{ ...order_msg, ...score_card_results }} />
        {/* <DecileCard type={order_msg && order_msg.order_type} data={score_card_results} />  */}
      </>
    )
  }
}

const OrderInfoWrap = InfoWrapper('Order Information')(OrderInfo)

export default OrderInfoWrap
