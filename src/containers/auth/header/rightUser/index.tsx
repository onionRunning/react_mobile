import React from 'react'
import './index.scss'
import avatar from 'assets/avatar@2x.png'
import { RouteComponentProps } from 'react-router-dom'
// import
interface Props extends RouteComponentProps {
  checkIsReadOnly: () => boolean
}

export class RightUser extends React.Component<Props> {
  render() {
    const username = sessionStorage.getItem('username')
    return (
      <div className={`right-nav-user`}>
        <div className="nav-user-info">
          <div className="icon-top" onClick={this.clickPassword} id="edit-password">
            <i className="icon-password" />
            <p>change the password</p>
          </div>
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
    // this.props.dispatch(
    //   createConfirm({
    //     title: 'Exit',
    //     text: 'Whether to quit the current account？',
    //     onOk: this.loginExit,
    //     onCancel: this.closeConfirm
    //   })
    // )
  }

  loginExit = () => {
    const { checkIsReadOnly } = this.props
    if (checkIsReadOnly()) return
    sessionStorage.clear()
    // this.closeConfirm()
    this.props.history.push('/login')
  }

  //   closeConfirm = () => this.props.dispatch(createCloseConfirm())
}

export default RightUser
