import React, { Component } from 'react'
import { trim } from 'lodash'
import { inject, observer } from 'mobx-react'
import md5 from 'blueimp-md5'
import { LoginReq } from 'interface/login'
import api from 'api'
import { createRequest } from 'api/request'
import { userPermission } from 'design/permission'
import message from 'components/message'
import * as utils from './utils'
import logo from 'assets/logo@2x.png'
import './index.scss'

@inject('common')
@observer
export class Login extends Component<utils.Props, utils.State> {
  constructor(props: utils.Props) {
    super(props)
    this.state = utils.initState
  }
  componentDidMount() {
    const token = sessionStorage.getItem('token')
    const isFirstLogin = sessionStorage.getItem('isFirstLogin') === 'false'
    this.authCheck(isFirstLogin, token)
  }

  render() {
    return (
      <div className="login-bg">
        <div className="login-wapper">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <img src={logo} alt="logo" />
            <div className={this.state.focusedAccount ? 'focused' : ''}>
              <i className="icon-username" />
              <input
                type="text"
                name="account"
                placeholder="Please enter email"
                value={this.state.account}
                autoComplete="off"
                onChange={this.handleInput}
                onFocus={this.onFocusIpt('focusedAccount', true)}
                onBlur={this.onFocusIpt('focusedAccount', false)}
                id={'login-account-input'}
              />
            </div>
            <div className={this.state.focusedPassword ? 'focused' : ''} id={'123'}>
              <i className="icon-password" />
              <input
                type={this.state.passwordInputType}
                name="password"
                placeholder="Please enter password"
                value={this.state.password}
                autoComplete="new-password"
                onChange={this.handleInput}
                onFocus={this.onFocusIpt('focusedPassword', true)}
                onBlur={this.onFocusIpt('focusedPassword', false)}
                id={'login-pwd-input'}
              />
              <i className={`icon-eye ${this.state.passwordVisableIcon}`} onClick={this.handleVisablePassword} />
            </div>
            <input type="submit" data-authorityid={1} defaultValue={'login'} id={'login-btn'} />
          </form>
        </div>
      </div>
    )
  }
  authCheck = (isFirstLogin: boolean, token: string | null) => {
    if (isFirstLogin && token) {
      this.props.history.replace('/auth')
      return
    }
    sessionStorage.clear()
  }

  // 用户输入帐号,密码
  handleInput = (
    e: React.ChangeEvent<{
      value: string
      name: string
    }>
  ) => {
    const { name, value } = e.target
    this.updateStates(
      name as utils.StringStateKey,
      name === utils.ACCOUNT
        ? value.substr(0, utils.MAX_LENGTH)
        : value.replace(/[\u4E00-\u9FA5]/g, '').substr(0, utils.VALID_LENGTH)
    )
  }

  // 聚焦 - 失焦
  onFocusIpt = (name: string, bool: boolean) => () => {
    this.updateStates(name as utils.BoolStateKey, bool)
  }

  // 用户修改密码输入框是否可见
  handleVisablePassword = () => {
    const { passwordVisable } = this.state
    const type = !passwordVisable ? utils.TEXT : utils.PASSWORD
    const icon = !passwordVisable ? utils.SHOW_EYES : utils.RMPTY
    this.setState({
      passwordInputType: type,
      passwordVisable: !passwordVisable,
      passwordVisableIcon: icon
    })
  }
  // 提交登录请求
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      account: trim(this.state.account),
      password: trim(this.state.password)
    }
    const info = utils.vertify(user)
    if (info) {
      message.error(info)
      return
    }
    this.finnalSubmit(user)
  }
  // 触发登陆逻辑
  finnalSubmit = async (user: LoginReq) => {
    this.props.common.changeLoading(true)
    const res = await api.postLogin({ ...user, password: md5(user.password!) })
    if (res.success) {
      utils.saveLocalData(res)
      this.handleLogin(res.data!.is_first_login!)
      this.props.common.changeLoading(false)
    }
  }
  // 测试
  // 登陆成功后
  handleLogin = (isFirstLogin: string) => {
    api.changeRequest(createRequest())
    userPermission.update(JSON.parse(sessionStorage.getItem('permissionArr')!))
    if (isFirstLogin) {
      this.props.history.replace('/auth')
      return
    }
    this.props.history.replace('/auth')
  }
  updateStates = (key: utils.BoolStateKey | utils.StringStateKey, value: string | boolean) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }
}

export default Login
