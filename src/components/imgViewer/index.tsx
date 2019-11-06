import React, { Component } from 'react'
import { noop } from 'lodash'
import Viewer from 'react-viewer'
import 'react-viewer/dist/index.css'
// import './index.scss'

interface Props {
  show?: boolean
  onClose?: any
  imgArr?: { src: string }[]
  currentIndex?: number
}

class ImgViewer extends Component<Props> {
  // 设置组件的默认状态
  static defaultProps = {
    config: {
      show: false,
      imgArr: [],
      currentIndex: 0,
      onClose: noop
    }
  }
  // 渲染
  render() {
    let { show, onClose, imgArr, currentIndex } = this.props
    return <Viewer visible={show} images={imgArr} onClose={onClose} activeIndex={currentIndex} />
  }
}

export default ImgViewer
