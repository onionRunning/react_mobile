import React from 'react'
import { RightUser } from './index'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'
// import { createConfirm, createCloseConfirm } from 'stores/actions/actionCreator'

describe('RightUser', () => {
  const mockRoute = mockRouteProps({}, {}, '/auth/order_details')
  const mockDispatch = jest.fn()
  const mockProps = {
    dispatch: mockDispatch,
    checkIsReadOnly: jest.fn().mockReturnValue(false),
    ...mockRoute
  }

  let component: ShallowWrapper<RightUser>, instance: RightUser
  beforeEach(() => {
    component = shallow(<RightUser {...mockProps} />)
    instance = component.instance() as RightUser
    mockDispatch.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('clickPassword', () => {
    instance.clickPassword()
    expect(mockRoute.history.push).toBeCalledWith('/password')
  })

  it('logOut', () => {
    instance.logOut()
    // expect(mockDispatch.mock.calls[0][0].type).toBe(Type.OPEN_CONFIRM_REQ)
    // expect(mockProps.dispatch).toBeCalledWith(
    //   createConfirm({
    //     title: 'Exit',
    //     text: 'Whether to quit the current account？',
    //     onOk: instance.loginExit,
    //     onCancel: instance.closeConfirm
    //   })
    // )
  })

  it('loginExit', () => {
    instance.loginExit()
    expect(mockRoute.history.push).toBeCalledWith('/login')
  })

  it('closeConfirm', () => {
    // instance.closeConfirm()
    // expect(mockProps.dispatch).toBeCalledWith(createCloseConfirm())
  })
})

describe('RightUser readOnly', () => {
  const mockRoute = mockRouteProps({}, {}, '/auth/order_details/readOnly')
  const mockDispatch = jest.fn()
  const mockProps = {
    dispatch: mockDispatch,
    checkIsReadOnly: jest.fn().mockReturnValue(true),
    ...mockRoute
  }

  let component: ShallowWrapper<RightUser>, instance: RightUser
  beforeEach(() => {
    component = shallow(<RightUser {...mockProps} />)
    instance = component.instance() as RightUser
    mockDispatch.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('clickPassword', () => {
    instance.clickPassword()
  })

  it('logOut', () => {
    instance.logOut()
  })

  it('loginExit', () => {
    instance.loginExit()
  })
})
