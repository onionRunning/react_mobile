import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { trim } from 'lodash'
import logo from 'assets/logo@2x.png'
import api from 'api'
import { createRequest } from 'api/request'
import { LoginParams } from 'api/params'

import { isEmail, getStringLength } from 'global/method'
import { KeyOfByType } from 'global/type'
import errors from 'global/errors'

import { userPermission } from 'design/permission'

import './index.scss'

const initState = {
  focusedAccount: false,
  focusedPassword: false,
  account: '',
  password: '',
  passwordVisable: false, // 密码是否可见，默认不可见
  passwordInputType: 'password', // 默认不显示输入的密码
  passwordVisableIcon: '' // 密码可见\不可见时的icon
}

type State = typeof initState

type Props = RouteComponentProps

type StringStateKey = KeyOfByType<State, string>

type BoolStateKey = KeyOfByType<State, boolean>

export class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = initState
  }
  componentDidMount() {
    const token = sessionStorage.getItem('token')
    const isFirstLogin = sessionStorage.getItem('isFirstLogin') === 'false'
    isFirstLogin && token ? this.props.history.replace('/auth') : sessionStorage.clear()
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
  // 用户输入帐号,密码
  handleInput = (
    e: React.ChangeEvent<{
      value: string
      name: string
    }>
  ) => {
    const value = e.target.value
    const name = e.target.name
    this.updateStringState(
      name as StringStateKey,
      name === 'account' ? value.substr(0, 320) : value.replace(/[\u4E00-\u9FA5]/g, '').substr(0, 16)
    )
  }

  // 聚焦 - 失焦
  onFocusIpt = (name: string, bool: boolean) => () => {
    this.updateBoolState(name as BoolStateKey, bool)
  }

  // 用户修改密码输入框是否可见
  handleVisablePassword = () => {
    const { passwordVisable } = this.state
    const type = !passwordVisable ? 'text' : 'password'
    const icon = !passwordVisable ? 'icon-eye-visable' : ''
    const bool = !passwordVisable ? true : false
    this.setState({
      passwordInputType: type,
      passwordVisable: bool,
      passwordVisableIcon: icon
    })
  }

  // 校验函数
  vertify = (user: LoginParams) => {
    const isRightEmail = isEmail(user.account)

    switch (true) {
      case !isRightEmail || getStringLength(user.account) > 320:
        return errors.INPUT_VALID_EMAIL
      case !user.account || !user.password:
        return errors.INPUT_EMPTY_ERR
      default:
        return ''
    }
  }

  // 提交登录请求
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      account: trim(this.state.account),
      password: trim(this.state.password)
    }

    const info = this.vertify(user)

    if (info) {
      this.startErrHint(info)
      return
    }

    // this.props.dispatch(createLogin(user, this.handleLogin))
  }
  // 处理登录请求发送获得的结果
  handleLogin = (isFirstLogin: string) => {
    // this.props.dispatch(getProductDetailList())
    api.changeRequest(createRequest())
    userPermission.update(JSON.parse(sessionStorage.getItem('permissionArr')!))
    this.props.history.replace(`${isFirstLogin === 'true' ? '/password' : '/auth'}`)
  }
  //startErrHint
  startErrHint = (err: string) => {
    console.log(err)
    // this.props.dispatch({
    //   type: TYPE.SEND_ERROR,
    //   error: err
    // })
  }

  updateStringState = (key: StringStateKey, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  updateBoolState = (key: BoolStateKey, value: boolean) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }
}

export default Login
