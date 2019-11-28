import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import {
  CollectionAccountInfoInputCash,
  CollectionAccountInfoInputBank,
  CollectionAccountInfoInputEwallet
} from './config'
import { MixProps } from 'global/interface'

import './index.scss'

interface PropsType {
  [names: string]: string | number | boolean | Function
}
interface Props extends MixProps {
  data: PropsType
}
export class CollectionAccountInfo extends Component<Props> {
  render() {
    // 银行卡, 电子钱包和线下放款三种不同显示
    const type = this.props.data.user_account_type
    const config =
      type === 'ewallet'
        ? CollectionAccountInfoInputEwallet
        : type === 'bank'
        ? CollectionAccountInfoInputBank
        : CollectionAccountInfoInputCash
    return (
      <div className="info-content-account">
        <FormInputListUI config={config} data={this.props.data || {}} />
      </div>
    )
  }
}
const CollectionAccountInfoWrap = InfoWrapper('Bank Account Information')(CollectionAccountInfo)

export default CollectionAccountInfoWrap
