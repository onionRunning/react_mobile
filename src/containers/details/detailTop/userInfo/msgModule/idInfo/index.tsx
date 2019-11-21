import React, { Component } from 'react'
import IdCardPhoto from '../../component/idCardPhoto'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { IdInfoInterface } from 'interface/details/userInfo'
import './index.scss'

import { IdentityInfoInputTop, botImgArr } from './config'

interface Props {
  data: IdInfoInterface
  showPicture?: (_id: number, src: string, imgArr: []) => () => void
}

export class Identify extends Component<Props> {
  render() {
    const { data = {} } = this.props
    return (
      <div className="info-content-id">
        <div className="info-id">
          <FormInputListUI config={IdentityInfoInputTop} data={data} />
        </div>
        <IdCardPhoto {...this.props} config={botImgArr(data)} />
      </div>
    )
  }
}

const IdentifyWrap = InfoWrapper('Identity Information')(Identify)

export default IdentifyWrap
