import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { EquipmentOverviewConfig } from './config'
import './index.scss'

interface PropsType {
  [names: string]: string | number | boolean | Function
}
interface Props {
  data?: PropsType
}

export class EquipmentOverviewInfo extends Component<Props> {
  render() {
    return (
      <div className="info-content info-equip">
        <FormInputListUI config={EquipmentOverviewConfig} data={this.props.data} />
      </div>
    )
  }
}

const EquipmentOverviewInfoWrap = InfoWrapper('Equipment overview')(EquipmentOverviewInfo)

export default EquipmentOverviewInfoWrap