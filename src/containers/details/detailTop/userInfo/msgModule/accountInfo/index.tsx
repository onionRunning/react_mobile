import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { CollectionAccountInfoInput, CollectionAccountInfoInputCash } from './config'
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
    // 线上放款和线下放款显示不同
    const config =
      this.props.data.account_type === 'cash pickup' ? CollectionAccountInfoInputCash : CollectionAccountInfoInput
    return (
      <div className="info-content-account">
        <FormInputListUI config={config} data={this.props.data || {}} />
      </div>
    )
  }
}
const CollectionAccountInfoWrap = InfoWrapper('Bank Account Information')(CollectionAccountInfo)

export default CollectionAccountInfoWrap
