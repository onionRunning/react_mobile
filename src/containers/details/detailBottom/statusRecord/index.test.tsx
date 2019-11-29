import * as React from 'react'
import { shallow } from 'enzyme'
import { StatusRecord } from './index'
import { mockRouteProps } from 'test/mock'

describe('StatusRecord', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'order_list'
    }
  )

  const details: any = {
    statusRecord: [],
    getStatusRecord: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    details
  }

  let component: any, instance: StatusRecord

  beforeEach(() => {
    component = shallow(<StatusRecord {...mockProps} />).dive()
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBe(0)
  })

  it('getStatusRecord', () => {
    instance.getStatusRecord()
    expect(mockProps.details.getStatusRecord).toBeCalledWith({
      order_no: 'P2g201911150020'
    })
  })
})
