import * as React from 'react'
import { shallow } from 'enzyme'
import { Operate, getReducer } from './index'
import { mockRouteProps } from 'test/mock'

describe('Operate', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps = {
    dispatch,
    ...mockRoute,
    reasionLists: [],
    detailPayload: {
      order_no: '1'
    },
    currentList: 'my_order'
  }
  let component: any, instance: any, curRoute: any
  beforeEach(() => {
    component = shallow(<Operate {...mockProps} />)
    instance = component.instance()
    mockProps.history.push = jest.fn().mockImplementation(str => {
      curRoute = str
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('renderRadio', () => {
    instance.renderRadio()
    expect(component.find('RadioGroup')).not.toBeUndefined()
  })
  it('showVal', () => {
    const e = {
      target: {
        checked: false,
        value: 'test'
      },
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      nativeEvent: jest.fn()
    }
    instance.showVal(e)
    expect(instance.state.application_status).toEqual('test')
  })
  it('showSelect', () => {
    instance.state.application_status = 'Rejected'
    const e = {
      target: {
        checked: false,
        value: 'test'
      },
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      nativeEvent: jest.fn()
    }
    instance.showVal(e)
    expect(instance.state.application_status).toEqual('test')
  })
  it('renderSelect', () => {
    instance.application_status = 'Rejected'

    expect(instance.renderSelect()).not.toBeUndefined()
  })
  it('changeValue', () => {
    const val = { val: 'val' }
    instance.changeValue(val)
    expect(instance.state.val).toEqual('val')
  })
  it('changeText', () => {
    const e = { target: { value: 'value', name: 'name' } }
    instance.changeText(e)
    expect(instance.state.name).toEqual('value')
  })
  it('initParams', () => {
    expect(instance.initParams().suffix).toEqual('my_order_result')
  })
  it('subInfo', () => {
    instance.state.config = {
      application_status: ''
    }
    instance.subInfo()
    expect(mockProps.dispatch).toBeCalled()

    instance.state.config = {
      application_status: 'Approved'
    }
    instance.subInfo()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('handleApproveSuccess', () => {
    instance.handleApproveSuccess()
    expect(curRoute).toEqual('/auth/my_orders')
  })
})
describe('getReducer', () => {
  it('getReducer', () => {
    const state = {
      approvalReducer: {
        approvalReducer: []
      }
    }
    expect(getReducer(state).approvalReducer.length).toBe(0)
  })
})
