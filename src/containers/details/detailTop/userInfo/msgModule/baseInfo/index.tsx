import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { BasicInfoInput } from './config'
import './index.scss'

interface Props {
  data?: any
}

export class BaseInfo extends Component<Props> {
  render() {
    return (
      <div className="info-content info-base">
        <FormInputListUI config={BasicInfoInput} data={this.props.data || {}} />
      </div>
    )
  }
}
const BaseInfoWrap = InfoWrapper('Personnal Information')(BaseInfo)
export default BaseInfoWrap
