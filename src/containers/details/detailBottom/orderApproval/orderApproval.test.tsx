import React from 'react'
import { shallow } from 'enzyme'
import { OrderApproval } from './index'
import { mockRouteProps } from 'test/mock'
import { AllProps } from 'test/allprops'

describe('OrderApproval', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps = {
    dispatch: dispatch,
    ...mockRoute,
    ...AllProps
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<OrderApproval {...mockProps} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    const getAllReasion = jest.spyOn(instance, 'getAllReasion')
    instance.componentDidMount()
    expect(getAllReasion).toBeCalled()
  })
  it('getAllReasion', () => {
    instance.getAllReasion()
    expect(mockProps.dispatch).not.toBeCalled()
  })
})
