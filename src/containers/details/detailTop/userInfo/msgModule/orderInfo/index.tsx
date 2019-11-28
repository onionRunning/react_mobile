import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
// import DecileCard from './components/DecileCard'
import { OrderInfoInput, scoreConfig } from './config'
import style from './index.module.scss'
import UserDetail from 'stores/details/userInfo'
import { intoDetail, orderStatus } from 'global/constants'
// import { getData } from './utils'

interface Props {
  userDetail: UserDetail
  currentList: string
}

export class OrderInfo extends Component<Props> {
  render() {
    return <div className={`info-content ${style.infoOrder} `}>{this.renderContent()}</div>
  }
  renderContent = () => {
    const {
      currentList,
      userDetail: { orderInfo }
    } = this.props
    let orderConfig = OrderInfoInput
    const status = orderInfo && orderInfo.application_status !== orderStatus.WaitingForManualAuditing
    // const newScoreData = getData(order_msg.order_type, score_card_results)
    // 我的订单 && 订单状态待人审 隐藏分数
    if (currentList !== intoDetail.ORDERS && status) {
      orderConfig = [...OrderInfoInput, ...scoreConfig]
    }
    return (
      <>
        <FormInputListUI config={orderConfig} data={{ ...orderInfo }} />
        {/* 评分 */}
        {/* <DecileCard data={newScoreData} /> */}
        {/* pipeline */}
        {/* <FormInputListUI config={PipelineConfig} data={order_msg} /> */}
      </>
    )
  }
}

const OrderInfoWrap = InfoWrapper('Order Information')(OrderInfo)

export default OrderInfoWrap
