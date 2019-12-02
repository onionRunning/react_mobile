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

  it('renderRemake', () => {
    const record = {
      created_at: '2019-11-15T16:50:07+08:00',
      current_status: 'CreateApplication',
      id: 27628,
      operator_name: 'wzc 13',
      reasons: '',
      remark: '111'
    }
    expect(instance.renderRemake(record).props.children).toEqual('111')
    const record1 = {
      created_at: '2019-11-15T16:50:07+08:00',
      current_status: 'CreateApplication',
      id: 27628,
      operator_name: 'wzc 13',
      reasons: `[{"reason_code":"R101","reason_value":"Age does not meet the requirements"}]`,
      remark: '111'
    }
    expect(instance.renderRemake(record1).props.children.length).toBe(2)
  })

  it('getStatusRecord', () => {
    instance.getStatusRecord()
    expect(mockProps.details.getStatusRecord).toBeCalledWith({
      order_no: 'P2g201911150020'
    })
  })
})
