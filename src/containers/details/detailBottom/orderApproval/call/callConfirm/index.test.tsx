import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { CallConfirm } from './index'
import Message from 'components/message'

Message.warning = jest.fn()

describe('CallConfirm', () => {
  let component: any, instance: CallConfirm
  const mockRoute = mockRouteProps({})
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
    instance.renderRadio()
    expect(component.find('Radio').length).toBeGreaterThan(0)
  })

  it('handleChangeRadio', () => {
    const e: any = { target: { value: 'test' } }
    instance.handleChangeRadio(e)
    expect(instance.state.reason).toEqual('test')
    expect(instance.state.remark).toEqual('')

    instance.setState({
      remark: 'test'
    })
    const e1: any = { target: { value: 'Answered' } }
    instance.handleChangeRadio(e1)
    expect(instance.state.reason).toEqual('Answered')
    expect(instance.state.remark).toEqual('test')
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
    expect(Message.warning).toBeCalledWith('Please select result')
    instance.setState({
      reason: 'Answered'
    })
    instance.handleClickSave()
    expect(Message.warning).toBeCalledWith('Please enter descrition')
    instance.setState({
      remark: 'test'
    })
    instance.handleClickSave()
    expect(props.onConfirm).toBeCalledWith('Answered', 'test')
  })
})

describe('CallConfirm self', () => {
  let component: any, instance: CallConfirm
  const mockRoute = mockRouteProps({})
  const props = {
    ...mockRoute,
    dispatch: jest.fn(),
    show: true,
    name: 'test',
    relation_ship: 'self',
    onCancel: jest.fn(),
    onConfirm: jest.fn()
  }

  beforeEach(() => {
    component = shallow(<CallConfirm {...props} />)
    instance = component.instance()
    instance.setState({
      reason: 'Answered'
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
