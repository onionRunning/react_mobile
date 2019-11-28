import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { BasicInfoConfig } from './config'
import './index.scss'
import { isEmpty } from 'global/method'

interface PropsType {
  [names: string]: string | number | boolean | Function
}
interface Props {
  data?: PropsType
}

export class BaseInfo extends Component<Props> {
  render() {
    const { data } = this.props
    // BasicInfoConfig.adress = user_current_address + user_current_address_detail
    const newData = isEmpty(data!)
      ? this.props.data
      : { ...data, adress: `${data!.user_current_address} ${data!.user_current_address_detail}` }
    return (
      <div className="info-content info-base">
        <FormInputListUI config={BasicInfoConfig} data={newData} />
      </div>
    )
  }
}
const BaseInfoWrap = InfoWrapper('Personnal Information')(BaseInfo)
export default BaseInfoWrap
