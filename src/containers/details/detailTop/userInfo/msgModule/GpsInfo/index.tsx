import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { GPSInformationConfig } from './config'
import './index.scss'

interface Props {
  data: any
}

export class GPSInfo extends Component<Props> {
  render() {
    return (
      <div className="info-content-gps">
        <FormInputListUI config={GPSInformationConfig} data={this.props.data || {}} />
      </div>
    )
  }
}
const GPSInfoWrap = InfoWrapper('GPS information')(GPSInfo)
export default GPSInfoWrap
