import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { Call, getState } from './index'

describe('test call', () => {
  let component: ShallowWrapper<Call>
  let instance: any
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: '',
    type: 'my_order'
  })
  const dispatch = jest.fn()
  const props = {
    dispatch,
    currentList: 'my_order',
    detailPayload: jest.fn,
    appLists: [],
    approvalCallData: jest.fn,
    editPermission: true,
    ...mockRoute
  }

  beforeEach(() => {
    component = shallow(<Call {...props} />)
    instance = component.instance() as Call
  })

  it('test render', () => {
    expect(component.find('div').length).toEqual(4)
  })

  it('test componentDidMount', () => {
    instance.componentDidMount()
  })
  it('test getAppLists', () => {
    instance.getAppLists()
    expect(props.dispatch).toBeCalled()
  })
  it('test getApproval', () => {
    instance.getApproval()
    expect(props.dispatch).toBeCalled()
  })
  it('test getAllCallLists', () => {
    instance.getAllCallLists()
    expect(props.dispatch).toBeCalled()
  })
  it('test renderPhone', () => {
    const approvalData = {
      CallRecord: [
        {
          relation_ship: 'self2'
        },
        {
          relation_ship: 'sister'
        },
        {
          relation_ship: 'self2'
        }
      ]
    }
    instance.renderPhone(approvalData)
    expect(props.dispatch).toBeCalled()
  })
})

describe('getState', () => {
  it('getState', () => {
    const state = {
      approvalReducer: {
        test: 'test'
      }
    }
    expect(getState(state).test).toEqual('test')
  })
})
