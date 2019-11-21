import React from 'react'
import { DispatchProp } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import LeftNav from './leftNav'
import RightUser from './rightUser'
import Common from 'stores/common'
import routesConfig from './config'

import './index.scss'

interface Props extends RouteComponentProps<{ showType: string }> {
  baseUrl: string
  common: Common
}
@inject('common')
@observer
export class Header extends React.Component<Props & Partial<DispatchProp>> {
  render() {
    return (
      <div className="header">
        <div className="logo" onClick={this.clickhome} id="logo" />
        <div className="left-nav">
          <LeftNav {...this.props} config={routesConfig()} checkIsReadOnly={this.checkIsReadOnly} />
        </div>
        <div className="right-user">
          <span className="wall-line" />
          <RightUser {...this.props} checkIsReadOnly={this.checkIsReadOnly} />
        </div>
      </div>
    )
  }
  // 回到首页
  clickhome = () => {
    if (!this.checkIsReadOnly()) this.props.history.push('/')
  }
  // 检查是否readonly
  checkIsReadOnly = () => {
    const text = this.authReadOnly(this.props.location.pathname)
    // console.log(this.props.location)
    if (text) {
      //   this.props.dispatch!(createAlertError(text))
      return true
    }
    return false
  }

  authReadOnly = (showType: string) => {
    return showType.includes('readOnly') ? 'ReadOnly this page, Cannot to Direact' : ''
  }
}

export default Header
