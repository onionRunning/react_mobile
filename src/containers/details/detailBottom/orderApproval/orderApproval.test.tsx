import React from 'react'
import { shallow } from 'enzyme'
import OrderApproval from './index'
import { mockRouteProps } from 'test/mock'

describe('OrderApproval', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      viewType: 'my_orders',
      application_status: 'ManualAuditing'
    }
  )
  const dispatch = jest.fn()
  const mockProps = {
    dispatch: dispatch,
    ...mockRoute
  }
  let component: any, instance: OrderApproval
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleShowApproveResult', () => {
    expect(instance.handleShowApproveOperate()).toBe(false)
  })
})
