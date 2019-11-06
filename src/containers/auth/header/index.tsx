import React from 'react'
import { DispatchProp } from 'react-redux'
import './index.scss'
import LeftNav from './leftNav'
import { RouteComponentProps } from 'react-router-dom'
import RightUser from './rightUser'
import routesConfig from './config'

interface Props extends RouteComponentProps<{ showType: string }> {
  baseUrl: string
}

export class Header extends React.Component<Props & Partial<DispatchProp>> {
  render() {
    // console.log(this.props.location.pathname.includes("readOnly"))
    // console.log(this.props)
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
