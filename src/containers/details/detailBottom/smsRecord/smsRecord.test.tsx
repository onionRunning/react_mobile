import * as React from 'react'
import { shallow } from 'enzyme'
import { SMSRecord } from './index'
import { mockRouteProps } from 'test/mock'

describe('SMSRecord', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'readOnly',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps = {
    dispatch,
    ...mockRoute,
    currentList: 'my_order'
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<SMSRecord {...mockProps} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    instance.componentDidMount()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('getSMSRecordInfo', () => {
    instance.getSMSRecordInfo()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('handleSuccess', () => {
    const data: any = []
    instance.handleSuccess(data)
    expect(instance.state.data.length).toBe(0)
  })
  it('renderSendMsgBtn', () => {
    expect(instance.renderSendMsgBtn()).not.toBeUndefined()
  })
  it('handleSendMsg', () => {
    const type = 'all'
    instance.handleSendMsg(type)()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('confirmSendMsg', () => {
    instance.confirmSendMsg()()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('closeConfirm', () => {
    instance.closeConfirm()
    expect(mockProps.dispatch).toBeCalled()
  })
})
