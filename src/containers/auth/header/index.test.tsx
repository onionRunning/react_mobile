import React from 'react'
import { Header } from './index'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'
// import { createAlertError } from 'stores/actions/actionCreator'

describe('Header', () => {
  const mockRoute = mockRouteProps({ showType: 'stest' }, {}, '/auth/order_details')
  const mockProps = {
    ...mockRoute,
    baseUrl: 'test',
    dispatch: jest.fn()
  }

  let component: ShallowWrapper<Header>, instance: Header

  beforeEach(() => {
    component = shallow(<Header {...mockProps} />)
    instance = component.instance() as Header
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('clickhome', () => {
    instance.clickhome()
    expect(mockRoute.history.push).toBeCalledWith('/')
  })

  it('checkIsReadOnly', () => {
    expect(instance.checkIsReadOnly()).toBe(false)
  })

  it('authReadOnly', () => {
    expect(instance.authReadOnly('/auth/order_details')).toBe('')
  })
})

describe('Header readOnly', () => {
  const mockRoute = mockRouteProps({ showType: 'stest' }, {}, '/auth/order_details/readOnly')
  const mockProps = {
    ...mockRoute,
    baseUrl: 'test',
    dispatch: jest.fn()
  }

  let component: ShallowWrapper<Header>, instance: Header

  beforeEach(() => {
    component = shallow(<Header {...mockProps} />)
    instance = component.instance() as Header
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('clickhome', () => {
    instance.clickhome()
  })

  it('checkIsReadOnly', () => {
    expect(instance.checkIsReadOnly()).toBe(true)
    // expect(mockProps.dispatch).toBeCalledWith(createAlertError('ReadOnly this page, Cannot to Direact'))
  })

  it('authReadOnly', () => {
    expect(instance.authReadOnly('/auth/order_details/readOnly')).toBe('ReadOnly this page, Cannot to Direact')
  })
})
