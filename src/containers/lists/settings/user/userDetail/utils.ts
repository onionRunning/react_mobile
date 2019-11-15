import * as method from 'global/method'
import { Vertify } from 'design/vertify'
import { State } from './index'

export const createObj = (v: string | any[], t: string, f: (params: any) => boolean) => {
  return { value: v, text: t, func: f }
}

// 新增角色的校验
export const addVertify = (state: State) => {
  const { name, phone, email } = state.request
  const temp = [
    createObj(name!, 'Please enter user name!', method.isStringEmpty),
    createObj(phone!, 'Please enter cellphone number!', method.isStringEmpty),
    createObj(email!, 'Please enter user email or right email!', method.isEmail),
    createObj(state.role_id!, 'Please pick one role at least!', method.arrayLength)
  ]
  return new Vertify(temp).startAuth()
}
