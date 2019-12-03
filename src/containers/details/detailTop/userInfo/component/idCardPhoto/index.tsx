import React, { Component } from 'react'
import './index.scss'

interface Props {
  config?: ItemType[]
  showPicture?: Function
}

interface ItemType {
  src: string
  title: string
  showId: number
}

class IdCardPhoto extends Component<Props> {
  render() {
    const { config = [] } = this.props
    return (
      <div className="identification-photo-wrapper">
        {config.map((item, index) => {
          return this.renderImgaes(item, index)
        })}
      </div>
    )
  }
  renderImgaes = (item: ItemType, index: number): JSX.Element => {
    const { showPicture, config = [] } = this.props
    return (
      <div className="photo-item" key={index}>
        <div className="phont-item-wrap">
          <img src={item.src} onClick={showPicture && showPicture(item.showId, item.src, config)} alt={item.title} />
          <span className="photo-span">{item.title}</span>
        </div>
      </div>
    )
  }
}

export default IdCardPhoto
