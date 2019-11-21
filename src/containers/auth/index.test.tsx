import React from 'react'
import Auth from './index'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'

describe('Auth', () => {
  const mockRoute = mockRouteProps({ showType: 'test' })
  const mockProps = {
    ...mockRoute,
    common: {}
  }
  let component: ShallowWrapper<Auth>
  beforeEach(() => {
    component = shallow(<Auth {...mockProps} />)
    // instance = component.instance() as Auth
  })

  it('render', () => {
    expect(component.find('Switch').length).toBeGreaterThan(0)
  })

  it('checkToken', () => {
    // instance.checkToken('')
    // expect(mockRoute.history.replace).toBeCalledWith('/login')
    // instance.checkToken('token')
  })
})
