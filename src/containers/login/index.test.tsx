import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Login } from './index'
import { mockRouteProps } from 'test/mock'
import * as utils from './utils'
import { LoginRes } from 'interface/login'
import { Res } from 'interface/common'
import errors from 'global/errors'

describe('Login', () => {
  // const mockClear = jest.spyOn(global.sessionStorage.__proto__, 'clear')
  const mockRoute = mockRouteProps({})
  const mockDispatch = jest.fn()
  const mockProps = {
    dispatch: mockDispatch,
    ...mockRoute,
    common: {
      changeLoading: jest.fn()
    }
  }
  let component: ShallowWrapper<Login>, instance: Login
  beforeEach(() => {
    mockDispatch.mockClear()
    global.sessionStorage.setItem('token', 'test')
    global.sessionStorage.setItem('isFirstLogin', 'false')
    global.sessionStorage.setItem('permissionArr', '[]')
    component = shallow(<Login {...mockProps} />).dive()
    instance = component.instance() as Login
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
    // expect(mockClear).toHaveBeenCalled()
  })

  it('handleInput', () => {
    const input = component.find('input[name="password"]')
    input.simulate('change', { target: { value: 'test', name: 'account' } })
    expect(instance.state.account).toBe('test')
    input.simulate('change', { target: { value: '123456', name: 'password' } })
    expect(instance.state.password).toBe('123456')
  })

  it('onFocusIpt', () => {
    instance.onFocusIpt('focusedAccount', true)()
    expect(instance.state.focusedAccount).toBe(true)
    instance.onFocusIpt('focusedPassword', true)()
    expect(instance.state.focusedPassword).toBe(true)
  })

  it('handleVisablePassword', () => {
    instance.setState({ passwordVisable: false })
    instance.handleVisablePassword()
    expect(instance.state.passwordInputType).toBe('text')
    expect(instance.state.passwordVisable).toBe(true)
    expect(instance.state.passwordVisableIcon).toBe('icon-eye-visable')

    instance.setState({ passwordVisable: true })
    instance.handleVisablePassword()
    expect(instance.state.passwordInputType).toBe('password')
    expect(instance.state.passwordVisable).toBe(false)
    expect(instance.state.passwordVisableIcon).toBe('')
  })

  it('vertify', () => {
    const user1 = {
      account: '',
      password: ''
    }
    const user2 = {
      account: '371975156@qq.com',
      password: ''
    }
    const user3 = {
      account: '371975156@qq.com',
      password: '123456'
    }
    expect(utils.vertify(user1)).toBe(errors.INPUT_EMPTY_ERR)
    expect(utils.vertify(user2)).toBe(errors.INPUT_EMPTY_ERR)
    expect(utils.vertify(user3)).toBe(undefined)
  })

  it('handleSubmit', () => {
    const form = component.find('form')
    const e = {
      preventDefault: () => {}
    }

    const user1 = {
      account: '',
      password: ''
    }

    instance.setState({
      account: user1.account,
      password: user1.password
    })

    form.simulate('submit', e)
    // expect(mockProps.dispatch).toBeCalledWith({
    //   type: TYPE.SEND_ERROR,
    //   error: 'Please enter a valid email address'
    // })

    const user2 = {
      account: '371975156@qq.com',
      password: ''
    }
    instance.setState({
      account: user2.account,
      password: user2.password
    })
    form.simulate('submit', e)
    // expect(mockProps.dispatch).toBeCalledWith({
    //   type: TYPE.SEND_ERROR,
    //   error: 'The input cannot be empty'
    // })

    const user3 = {
      account: '371975156@qq.com',
      password: '123456'
    }
    instance.setState({
      account: user3.account,
      password: user3.password
    })
    form.simulate('submit', e)
    // expect(mockProps.dispatch).toBeCalledWith({
    //   type: TYPE.LOGIN_REQUEST,
    //   payload: user3,
    //   callback: instance.handleLogin
    // })
  })

  it('handleLogin', () => {
    instance.handleLogin('false')
    global.sessionStorage.setItem('isFirstLogin', 'true')
    instance.handleLogin('true')
  })

  // new
  it('authCheck1', () => {
    instance.authCheck(false, '')
    expect(sessionStorage.getItem('token')).toEqual(null)
  })
  it('authCheck2', () => {
    instance.authCheck(false, 'xx')
    expect(sessionStorage.getItem('token')).toEqual(null)
  })
  it('authCheck3', () => {
    instance.authCheck(true, 'xx')
    expect(mockProps.history.replace).toBeCalledWith('/auth')
  })
  it('updateStates', () => {
    instance.updateStates('account', '123')
    expect(instance.state.account).toBe('123')
  })
  it('saveLocalData', () => {
    const dd: LoginRes = { id: '13', access_no: [1] }
    const data: Res<LoginRes> = {
      success: true,
      info: '',
      data: dd
    }
    utils.saveLocalData(data as any)
    expect(sessionStorage.getItem('userId')).toBe('13')
  })
})
