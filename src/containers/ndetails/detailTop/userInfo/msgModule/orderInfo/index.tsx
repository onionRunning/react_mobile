import React, { Component } from 'react'
import InfoWrapper from 'containers/ndetails/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { OrderInfoInput, scoreConfig } from './config'
// import { imgPath } from 'global/constants'
// import {getData} from './utils'
import './index.scss'

interface Props {
  data?: any
  showPicture: (_id: number, src: string) => () => void
  sign_photo: string
  scoreData?: any
  creditData?: any
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
    const { data, scoreData, creditData } = this.props
    let orderConfig = OrderInfoInput
    if (data.order_type === 'OrderTypeIndNewClient') {
      orderConfig = [...OrderInfoInput, ...scoreConfig]
    }
    return <FormInputListUI config={orderConfig} data={{ ...data, ...scoreData, ...creditData }} />
  }
}

const OrderInfoWrap = InfoWrapper('Order Information')(OrderInfo)

export default OrderInfoWrap
