import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import { config } from './config'
import { imgPath } from 'global/constants'
import './index.scss'

interface Props {
  data?: any
  showPicture: (_id: number, src: string) => () => void
  sign_photo: string
}

export class SupplementInfo extends Component<Props> {
  render() {
    return <div className="supplement-info-box">{this.getSupplementInfoItem()}</div>
  }

  getSupplementInfoItem = () => {
    const { data, showPicture } = this.props
    return config.map((el, index) => {
      if (data[el.value!]) {
        let temp = data[el.value!]
        const src = temp.indexOf('/') === 0 ? temp : imgPath + imgPath
        return (
          <div className="supplement-info-item" key={index}>
            <img
              className="supplement-info-item-img"
              onClick={showPicture(el.id, data[el.value!])}
              src={src}
              alt="img"
            />
            <div className="supplement-info-item-title">{el.title}</div>
          </div>
        )
      } else {
        return ''
      }
    })
  }
}

const SupplementInfoWrap = InfoWrapper('Supplementary Certification')(SupplementInfo)

export default SupplementInfoWrap
