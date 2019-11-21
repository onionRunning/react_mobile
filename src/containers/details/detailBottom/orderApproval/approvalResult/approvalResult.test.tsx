import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'

import { ApprovalResult, getState } from './index'

describe('ApprovalResult', () => {
  let component: any, instance: any
  const mockRoute = mockRouteProps({
    order_no: '1111',
    showType: 'test',
    type: 'my_order'
  })
  const props = {
    ...mockRoute,
    detailPayload: [],
    dispatch: jest.fn()
  }
  beforeEach(() => {
    component = shallow(<ApprovalResult {...props} />)
    instance = component.instance()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    const getApprovalResultRequest = jest.spyOn(instance, 'getApprovalResultRequest')
    instance.componentDidMount()
    expect(getApprovalResultRequest).toBeCalled()
  })
  it('showReason', () => {
    instance.state.resultData.application_status = 'AutoReject'
    instance.state.orderReasons = [
      {
        reject_reason: 'test',
        reason_value: 'test'
      }
    ]
    expect(instance.showReason()).toBeUndefined()
  })
  it('setResponseData', () => {
    const data = {
      application_status: 'AutoReject',
      return_time: '2019-07-12',
      application_finish_time: '2019-07-11',
      operator_name: 'test',
      remark: 'remark'
    }
    const type = 'review'
    const filterStatus = jest.spyOn(instance, 'filterStatus')
    instance.setResponseData(data, type)
    expect(filterStatus).toBeCalled()

    const type1 = 'time'
    expect(instance.setResponseData(data, type1)).toEqual('2019-07-11')

    const type2 = 'reviewer'
    expect(instance.setResponseData(data, type2)).toEqual('test')

    const type3 = 'remark'
    expect(instance.setResponseData(data, type3)).toEqual('remark')

    const type4 = 'other'
    expect(instance.setResponseData(data, type4)).toEqual('')
  })
  it('filterStatus', () => {
    const data = {
      application_status: 'WaitingForManualAuditing',
      return_time: '2019-07-12',
      application_finish_time: '2019-07-11',
      operator_name: 'test',
      remark: 'remark'
    }
    expect(instance.filterStatus(data)).toBeFalsy()

    const data1 = {
      application_status: 'AutoReject',
      return_time: '2019-07-12',
      application_finish_time: '2019-07-11',
      operator_name: 'test',
      remark: 'remark'
    }
    expect(instance.filterStatus(data1)).toBeTruthy()
  })
  it('getApprovalResultRequest', () => {
    instance.getApprovalResultRequest()
    expect(props.dispatch).toBeCalled()
  })
  it('getApprovalResultSuccess', () => {
    const data = {
      order_msg: 'test msg',
      order_reasons: '还不是因为你长得丑'
    }
    instance.getApprovalResultSuccess(data)
    expect(instance.state.resultData).toEqual('test msg')
  })
})

describe('getState', () => {
  it('getState', () => {
    const state = {
      callRecordInfo: {
        test: 'test'
      }
    }
    expect(getState(state).test).toEqual('test')
  })
})
