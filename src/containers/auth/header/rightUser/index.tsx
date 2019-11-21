import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Common from 'stores/common'
import avatar from 'assets/avatar@2x.png'
import './index.scss'
// import
interface Props extends RouteComponentProps {
  checkIsReadOnly: () => boolean
  common: Common
}
export class RightUser extends React.Component<Props> {
  render() {
    const username = sessionStorage.getItem('username')
    return (
      <div className={`right-nav-user`}>
        <div className="nav-user-info">
          <div className="icon-bot" onClick={this.logOut} id="log-out">
            <i className="icon-exit" />
            <p>exit</p>
          </div>
        </div>
        <img className="avatar-img" src={avatar} alt="avatar" />
        <div className="welcome">
          <h3>hi {username}</h3>
        </div>
      </div>
    )
  }
  clickPassword = () => {
    const { checkIsReadOnly } = this.props
    if (checkIsReadOnly()) return
    this.props.history.push('/password')
  }
  logOut = () => {
    const { checkIsReadOnly } = this.props
    if (checkIsReadOnly()) return
    this.props.common.changeConfirm({
      show: true,
      title: 'Exit',
      text: 'Whether to quit the current account？',
      onOk: this.loginExit,
      onCancel: this.closeConfirm
    })
  }

  loginExit = () => {
    const { checkIsReadOnly } = this.props
    if (checkIsReadOnly()) return
    sessionStorage.clear()
    this.closeConfirm()
    this.props.history.push('/login')
  }

  closeConfirm = () => this.props.common.changeConfirm({ show: false })
}

export default RightUser
