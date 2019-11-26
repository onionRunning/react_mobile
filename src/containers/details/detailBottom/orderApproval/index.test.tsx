import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import OrderApproval from './index'
import { mockRouteProps } from 'test/mock'

describe('OrderApproval my_orders ManualAuditing', () => {
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
  let component: ShallowWrapper<OrderApproval>, instance: OrderApproval
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
    instance = component.instance() as OrderApproval
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('isShowApproveResult', () => {
    expect(instance.isShowApproveResult()).toBe(false)
  })

  it('isShowApproveOperate', () => {
    expect(instance.isShowApproveOperate()).toBe(true)
  })
})

describe('OrderApproval order_list ManualAuditing', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      viewType: 'order_list',
      application_status: 'ManualAuditing'
    }
  )
  const dispatch = jest.fn()
  const mockProps = {
    dispatch: dispatch,
    ...mockRoute
  }
  let component: ShallowWrapper<OrderApproval>, instance: OrderApproval
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
    instance = component.instance() as OrderApproval
  })

  it('isShowApproveResult', () => {
    expect(instance.isShowApproveResult()).toBe(false)
  })
})

describe('OrderApproval order_list AutoReject', () => {
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
  let component: ShallowWrapper<OrderApproval>, instance: OrderApproval
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
    instance = component.instance() as OrderApproval
  })

  it('isShowApproveResult', () => {
    expect(instance.isShowApproveResult()).toBe(true)
  })
})
