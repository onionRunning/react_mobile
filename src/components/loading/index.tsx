import React, { Component } from 'react'
import ICON_LOADING from './images/loading.png'
import './index.scss'

interface Props {
  show?: boolean
  text?: string
}

class Loading extends Component<Props> {
  static defaultProps = {
    show: false,
    text: ''
  }
  render() {
    const { show, text } = this.props
    const style = show ? { display: 'block' } : { display: 'none' }
    return (
      <div className="mask" style={style}>
        <div className="loading">
          <div className="icon">
            <img src={ICON_LOADING} alt="" />
          </div>
          <p>{text}</p>
        </div>
      </div>
    )
  }
}

export default Loading
