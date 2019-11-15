import React, { Component } from 'react'
import InfoWrapper from 'containers/ndetails/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { CollectionAccountInfoInput, CollectionAccountInfoInputCash } from './config'
import { MixProps } from 'global/interface'

import './index.scss'

interface Props extends MixProps {
  isEdit?: boolean
  isShowBtn?: boolean
  data?: any
  userDetail?: any
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
