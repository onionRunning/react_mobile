import React, { Component } from 'react'
import './index.scss'
import { imgPath } from 'global/constants'

interface Props {
  config?: any[]
  showPicture?: Function
}

interface ItemType {
  src: string
  title: string
  showId: number
}

class IdCardPhoto extends Component<Props> {
  render() {
    // const { config = [] } = this.props
    return (
      <div className="identification-photo-wrapper">
        {/* {config.map((item, index) => {
          return this.renderImgaes(item, index)
        })} */}
      </div>
    )
  }
  renderImgaes = (item: ItemType, index: number): JSX.Element => {
    const { showPicture } = this.props
    const src = item.src.indexOf('/') === 0 ? item.src : imgPath + item.src
    return (
      <div className="photo-item" key={index}>
        <div className="phont-item-wrap">
          <img src={src} onClick={showPicture && showPicture(item.showId, src)} alt="hello world" />
          <span className="photo-span">{item.title}</span>
        </div>
      </div>
    )
  }
}

export default IdCardPhoto
