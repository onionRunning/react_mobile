import * as React from 'react'
import { shallow } from 'enzyme'
import AntdSelect from './index'

describe('AntdSelect', () => {
  let component: any, instance: any
  const props = {
    application_status: '',
    onChange: jest.fn(),
    name: '',
    mode: '',
    disabled: false,
    placeholder: 'enter',
    options: []
  }

  beforeEach(() => {
    component = shallow(<AntdSelect {...props} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    const timeChange = jest.spyOn(instance, 'timeChange')
    instance.componentDidMount()
    expect(timeChange).toBeCalled()
  })
  it('componentWillReceiveProps', () => {
    const startTimeout = jest.spyOn(instance, 'startTimeout')
    const newProps = { application_status: 'test1' }
    instance.componentWillReceiveProps(newProps)
    expect(startTimeout).toBeCalled()
  })
  it('startTimeout', () => {
    const timeChange = jest.spyOn(instance, 'timeChange')
    instance.startTimeout()
    setTimeout(() => {
      expect(timeChange).toBeCalled()
    }, 100)
  })
  it('timeChange', () => {
    instance.timeChange()
    expect(instance.state.temp).toBeTruthy()
  })
  it('handleChange', () => {
    const val = 'test'
    instance.handleChange(val)
    expect(props.onChange).toBeCalled()
  })
})
