import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import TreeSelect from './index'

describe('TreeSelect has data', () => {
  const onChange = jest.fn()
  const props = {
    onChange,
    defaultValue: 'test',
    keyWord: 'test'
  }
  let component: ShallowWrapper<TreeSelect>, instance: TreeSelect
  beforeEach(() => {
    component = shallow(<TreeSelect {...props} />)
    instance = component.instance() as TreeSelect
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('onChange value', () => {
    instance.onChange('test')
    expect(instance.state.value).toBe('test')
    expect(onChange).toBeCalledWith({
      key: 'test',
      value: 'test'
    })
  })

  it('onChange empty value', () => {
    instance.onChange(undefined)
    expect(instance.state.value).toBe(undefined)
    expect(onChange).toBeCalledWith({
      key: 'test',
      value: ''
    })
  })
})
