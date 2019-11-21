import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { CallConfirm } from './index'

describe('CallConfirm', () => {
  let component: any, instance: CallConfirm
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
    show: true,
    name: 'test',
    relation_ship: 'test',
    onCancel: jest.fn(),
    onConfirm: jest.fn()
  }

  beforeEach(() => {
    component = shallow(<CallConfirm {...props} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderRadio', () => {
    const all = ['test']
    instance.renderRadio(all)
    expect(component.find('Radio').length).toBeGreaterThan(0)
  })

  it('handleChangeRadio', () => {
    const e: any = { target: { value: 'test' } }
    instance.handleChangeRadio(e)
    expect(instance.state.reason).toEqual('test')
  })

  it('handleChangeSelect', () => {
    instance.handleChangeSelect({
      key: 'test',
      value: 'test'
    })
    expect(instance.state.remark).toEqual('test')
  })

  it('handleClickSave', () => {
    instance.handleClickSave()
    expect(props.onConfirm).toBeCalled()
  })
})
