import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import DecileCard from './components/DecileCard'
import { OrderInfoInput, scoreConfig, PipelineConfig } from './config'
// import { imgPath } from 'global/constants'
import style from './index.module.scss'
import UserDetail from 'stores/details/userInfo'
import { intoDetail } from 'global/constants'
import { getData } from './utils'

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
      userDetail: { order_msg, score_card_results }
    } = this.props
    let orderConfig = OrderInfoInput
    const status = order_msg && order_msg.application_status !== 'WaitingForManualAuditing'
    const newScoreData = getData(order_msg.order_type, score_card_results)
    // 我的订单 && 订单状态待人审 隐藏分数
    if (currentList !== intoDetail.ORDERS && status) {
      orderConfig = [...OrderInfoInput, ...scoreConfig]
    }
    return (
      <>
        <FormInputListUI config={orderConfig} data={{ ...order_msg, ...newScoreData }} />
        {/* 评分 */}
        <DecileCard data={newScoreData} />
        {/* pipeline */}
        <FormInputListUI config={PipelineConfig} data={order_msg} />
      </>
    )
  }
}

const OrderInfoWrap = InfoWrapper('Order Information')(OrderInfo)

export default OrderInfoWrap
