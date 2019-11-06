import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import SelectDemo from './index'

describe('SelectDemo', () => {
  const onChange = jest.fn()
  const props = {
    onChange,
    keyWord: 'test',
    noResultsText: 'no result',
    list: [
      {
        label: 'label1',
        value: 'value1'
      },
      {
        label: 'label2',
        value: 'value2'
      }
    ]
  }
  let component: ShallowWrapper<SelectDemo>, instance: SelectDemo
  beforeEach(() => {
    component = shallow(<SelectDemo {...props} />)
    instance = component.instance() as SelectDemo
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('componentDidUpdate', () => {
    instance.componentDidUpdate({ ...props, flag: 1 })
    expect(instance.state.value).toBe(null)
  })

  it('handleChange not require', () => {
    const value = {
      label: 'label2',
      value: 'value2'
    }
    instance.handleChange(value)
    expect(instance.state.value).toEqual(value)
    expect(onChange).toBeCalled()
  })

  // it('handleChange required without value', () => {
  //   instance.props = {
  //     ...instance.props,
  //     require: true
  //   }
  //   instance.handleChange()
  //   expect(instance.state.value).toEqual('test')
  //   expect(onChange).toBeCalled()
  // })

  // it('handleChange required', () => {
  //   instance.props = {
  //     ...instance.props,
  //     require: true
  //   }
  //   const value = { test: 'test' }
  //   instance.handleChange(value)
  //   expect(instance.state.value).toEqual(value)
  //   expect(onChange).toBeCalled()
  // })
})

describe('SelectDemo no defaultValue', () => {
  const onChange = jest.fn()
  const props = {
    onChange,
    keyWord: 'test',
    noResultsText: 'no result',
    list: [
      {
        label: 'label1',
        value: 'value1'
      },
      {
        label: 'label2',
        value: 'value2'
      }
    ]
  }
  let component: ShallowWrapper<SelectDemo>
  beforeEach(() => {
    component = shallow(<SelectDemo {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
