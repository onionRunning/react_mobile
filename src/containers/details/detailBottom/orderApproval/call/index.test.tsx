import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Call } from './index'
import { mockRouteProps } from 'test/mock'

describe('Call', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )
  const approval: any = {
    getTelephoneVerifyInfo: jest.fn(),
    getCallRecord: jest.fn(),
    callUp: jest.fn(),
    updateCallInfo: jest.fn()
  }

  const mockProps = {
    editPermission: true,
    approval,
    ...mockRoute
  }

  let component: ShallowWrapper<Call>, instance: Call
  beforeEach(() => {
    component = shallow(<Call {...mockProps} />).dive()
    instance = component.instance() as Call
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getTelephoneVerifyInfo', () => {
    instance.getTelephoneVerifyInfo()
    expect(mockProps.approval.getTelephoneVerifyInfo).toBeCalledWith(
      {
        order_no: 'P2g201911150020'
      },
      instance.handleTelephoneVerifyInfo
    )
  })

  it('handleTelephoneVerifyInfo', () => {
    const list = [
      {
        id: 24,
        user_name: 'aer sdfsdf',
        relation_ship: 'Self',
        phone: '1 (451) 251-255',
        order_no: 'Jp20191129000004'
      },
      {
        id: 25,
        user_name: 'ddd sxsss',
        relation_ship: 'Other relative',
        phone: '(352) 525-352',
        order_no: 'Jp20191129000004'
      }
    ]
    instance.handleTelephoneVerifyInfo(list)
    expect(instance.state.callRecord).toEqual([
      {
        id: 24,
        user_name: 'aer sdfsdf',
        relation_ship: 'Self',
        phone: '01 (451) 251-255',
        order_no: 'Jp20191129000004',
        show: false
      },
      {
        id: 25,
        user_name: 'ddd sxsss',
        relation_ship: 'Other relative',
        phone: '(352) 525-352',
        order_no: 'Jp20191129000004',
        show: false
      }
    ])
  })
})
