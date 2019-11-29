import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ApprovalResult } from './index'
import { mockRouteProps } from 'test/mock'

describe('ApprovalResult', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )

  const approval: any = {
    approvalResult: {
      application_status: 'AuditingReject',
      application_finish_time: '2019-11-29 12:00:00',
      operator_name: 'admin',
      remark: 'test'
    },
    orderReason: {
      reject_reason: [
        {
          reason_code: 'R101',
          reason_value: 'test',
          value_chinese: 'test'
        }
      ]
    },
    getApprovalResult: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    approval
  }

  let component: ShallowWrapper<ApprovalResult>, instance: ApprovalResult

  beforeEach(() => {
    component = shallow(<ApprovalResult {...mockProps} />).dive()
    instance = component.instance() as ApprovalResult
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getApprovalResult', () => {
    instance.getApprovalResult()
    expect(mockProps.approval.getApprovalResult).toBeCalledWith({ order_no: 'P2g201911150020' })
  })

  it('showReason', () => {
    expect(instance.showReason().length).toEqual(1)
  })
})

describe('ApprovalResult no reason', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )

  const approval: any = {
    approvalResult: {
      application_status: 'test',
      application_finish_time: '2019-11-29 12:00:00',
      operator_name: 'admin',
      remark: 'test'
    },
    orderReason: {
      reject_reason: []
    },
    getApprovalResult: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    approval
  }

  let component: ShallowWrapper<ApprovalResult>, instance: ApprovalResult

  beforeEach(() => {
    component = shallow(<ApprovalResult {...mockProps} />).dive()
    instance = component.instance() as ApprovalResult
  })

  it('showReason', () => {
    expect(instance.showReason().length).toEqual(0)
  })
})
