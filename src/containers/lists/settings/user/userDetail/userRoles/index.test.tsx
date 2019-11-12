import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { UserRoles } from './index'
import { mockRouteProps } from 'test/mock'

describe('UserRoles', () => {
  const mockRoute = mockRouteProps({})
  const mockProps = {
    roleList: [
      {
        value: 1,
        label: 'test1'
      },
      {
        value: 2,
        label: 'test2'
      }
    ],
    value: [1],
    onchange: jest.fn(),
    ...mockRoute
  }
  let component: ShallowWrapper<UserRoles>, instance: UserRoles

  beforeEach(() => {
    component = shallow(<UserRoles {...mockProps} />)
    instance = component.instance() as UserRoles
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('onChange', () => {
    instance.onChange([1])
    expect(mockProps.onchange).toBeCalled()
  })
})
