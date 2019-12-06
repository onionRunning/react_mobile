import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import OrderApproval from './index'
import { mockRouteProps } from 'test/mock'

describe('show ApprovalResult', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      viewType: 'order_list',
      application_status: 'AutoReject'
    }
  )
  const dispatch = jest.fn()
  const mockProps = {
    dispatch: dispatch,
    ...mockRoute
  }
  let component: ShallowWrapper<OrderApproval>
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('show Operate', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      viewType: 'my_orders',
      application_status: 'ManualAuditing'
    }
  )
  const mockProps = {
    ...mockRoute
  }
  let component: ShallowWrapper<OrderApproval>
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
