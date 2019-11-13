import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
// import NormalText from '../../component/normalText'
import { CollectionAccountInfoInput, CollectionAccountInfoInputCash } from './config'
import { MixProps } from 'global/interface'

import './index.scss'

interface Props extends MixProps {
  isEdit?: boolean
  isShowBtn?: boolean
  data?: any
  userDetail?: any
}

// @InfoWrapper('Bank Account Information')
export class CollectionAccountInfo extends Component<Props> {
  render() {
    // let authResult = this.props.data && this.props.data[authResultConfig.stateName]
    const config =
      this.props.data.account_type === 'cash pickup' ? CollectionAccountInfoInputCash : CollectionAccountInfoInput
    console.log(this.props.data)
    return (
      <div className="info-content-account">
        <FormInputListUI config={config} data={this.props.data || {}} />
        {/* <div>
          <NormalText {...authResultConfig} value={authResult} />
        </div> */}
      </div>
    )
  }
}
const CollectionAccountInfoWrap = InfoWrapper('Bank Account Information')(CollectionAccountInfo)

export default CollectionAccountInfoWrap
