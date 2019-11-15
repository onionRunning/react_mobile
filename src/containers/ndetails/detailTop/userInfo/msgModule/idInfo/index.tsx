import React, { Component } from 'react'
import IdCardPhoto from '../../component/idCardPhoto'
import InfoWrapper from 'containers/ndetails/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import './index.scss'

import { IdentityInfoInputTop, IdentityInfoInputBot, topImgArr, botImgArr } from './config'

interface Props {
  data: any
  showPicture?: (_id: number, src: string) => () => void
}

export class Identify extends Component<Props> {
  render() {
    const { data = {} } = this.props
    return (
      <div className="info-content-id">
        <div className="info-id">
          <FormInputListUI config={IdentityInfoInputTop} data={data} />
        </div>
        <IdCardPhoto {...this.props} config={topImgArr(data)} />
        <div className="info-id">
          <FormInputListUI config={IdentityInfoInputBot} data={data} />
        </div>
        <IdCardPhoto {...this.props} config={botImgArr(data)} />
      </div>
    )
  }
}

const IdentifyWrap = InfoWrapper('Identity Information')(Identify)

export default IdentifyWrap
