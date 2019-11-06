import React, { Component } from 'react'
import ICON_SUCCESS from './images/success.png'
import ICON_ERROR from './images/error.png'
import ICON_ALERT from 'assets/icon-fault@2x.png'

import './index.scss'
const HINT_TYPE = {
  success: 'success',
  error: 'error',
  notice: 'notice'
}

interface Props {
  type?: string
  show?: boolean
  text?: string
}

class Hint extends Component<Props> {
  getIcon = () => {
    switch (this.props.type) {
      case HINT_TYPE.success:
        return { src: ICON_SUCCESS, names: 'success-hint' }
      case HINT_TYPE.error:
        return { src: ICON_ERROR, names: 'error-hint' }
      case HINT_TYPE.notice:
        return { src: ICON_ALERT, names: 'notice-hint' }
      default:
        return { src: '', names: '' }
    }
  }
  render() {
    const { show, text } = this.props
    const { src, names } = this.getIcon()
    return show ? (
      <div className="hint-mask">
        <div className={`hint ${names}`}>
          <div className="icon">
            <img src={src} alt="hint" />
          </div>
          <div className="content">
            <p>{text}</p>
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  }
}
export default Hint
