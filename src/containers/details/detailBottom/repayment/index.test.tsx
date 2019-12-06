import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { RepaymentInfo } from './index'

describe('RepaymentInfo', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )

  const details: any = {
    getRepaymentInfo: jest.fn(),
    repaymentInfoList: [],
    repaymentInfoFlowList: [
      {
        actual_paid_off_date: '2019-12-04T17:39:24+08:00',
        is_offline: 0,
        repayment_type: 'test',
        repayment_flow_no: 'test',
        out_flow_no: 'test',
        status: 'test',
        operator_name: 'test',
        remark: 'test',
        fee: {
          reduce_fee: 100,
          repay_amount: 4020,
          actual_repay_amount: 4020
        }
      }
    ]
  }

  const mockProps = {
    ...mockRoute,
    details
  }

  let component: ShallowWrapper<RepaymentInfo>, instance: RepaymentInfo

  beforeEach(() => {
    component = shallow(<RepaymentInfo {...mockProps} />).dive()
    instance = component.instance() as RepaymentInfo
  })

  it('expandedRowRender', () => {
    instance.expandedRowRender()
  })
})
