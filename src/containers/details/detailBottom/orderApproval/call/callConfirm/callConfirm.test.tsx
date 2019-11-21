import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { CallConfirm } from './index'

describe('CallConfirm', () => {
  let component: any, instance: any
  const mockRoute = mockRouteProps({
    order_no: '1111',
    showType: 'test',
    type: 'test',
    relation_ship: 'self',
    call_id: '1111'
  })
  const props = {
    ...mockRoute,
    dispatch: jest.fn(),
    name: 'test',
    item: {
      relation_ship: 'self'
    },
    getApproval: jest.fn(() => true),
    CloseConfirm: jest.fn(),
    getAllCallLists: jest.fn(),
    add: true,
    show: true
  }
  beforeEach(() => {
    component = shallow(<CallConfirm {...props} />)
    instance = component.instance()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('renderRadio', () => {
    const all = ['test'],
      name = 'test'
    instance.renderRadio(all, name)
    expect(component.find('Radio').length).toBeGreaterThan(0)
  })
  it('showVal', () => {
    const e = { target: { value: 'test' } }
    instance.showVal(e)
    expect(instance.state.status).toEqual('test')
  })
  it('saveCall', () => {
    instance.saveCall()
    expect(props.dispatch).toBeCalled()
  })
  it('showErr', () => {
    instance.showErr()
    expect(props.dispatch).toBeCalled()
  })
  it('successCb', () => {
    instance.successCb()
    expect(props.dispatch).toBeCalled()
  })
})
