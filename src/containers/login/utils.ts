import { RouteComponentProps } from 'react-router-dom'
import errors from 'global/errors'
import { KeyOfByType } from 'global/type'
import { isEmail, getStringLength } from 'global/method'
import { LoginRes } from 'interface/login'
import { Res } from 'interface/common'
import { LoginParams } from 'api/params'
import Common from 'stores/common'

// const 定义常量
export const TEXT = 'text'
export const PASSWORD = 'password'
export const MAX_LENGTH = 320
export const VALID_LENGTH = 16
export const SHOW_EYES = 'icon-eye-visable'
export const RMPTY = ''
export const ACCOUNT = 'account'

export const initState = {
  focusedAccount: false,
  focusedPassword: false,
  account: '',
  password: '',
  passwordVisable: false, // 密码是否可见，默认不可见
  passwordInputType: PASSWORD, // 默认不显示输入的密码
  passwordVisableIcon: '' // 密码可见\不可见时的icon
}
export type State = typeof initState
export interface Props extends RouteComponentProps {
  common: Common
}
export type StringStateKey = KeyOfByType<State, string>
export type BoolStateKey = KeyOfByType<State, boolean>

// 校验函数
export const vertify = (user: LoginParams) => {
  const { account, password } = user
  if (!account || !password) return errors.INPUT_EMPTY_ERR
  const isRightEmail = isEmail(account)
  const isValidLength = getStringLength(account) > MAX_LENGTH
  if (!isRightEmail || isValidLength) return errors.INPUT_VALID_EMAIL
}

// 保存本地信息
export const saveLocalData = (res: Res<LoginRes>) => {
  sessionStorage.setItem('token', res.data!.token!)
  sessionStorage.setItem('userId', res.data!.id!)
  sessionStorage.setItem('username', res.data!.name!)
  sessionStorage.setItem('isFirstLogin', res.data!.is_first_login!)
  sessionStorage.setItem('permissionArr', JSON.stringify(res.data!.access_no! || []))
  sessionStorage.setItem('productArr', JSON.stringify(res.data!.product_id! || []))
}
