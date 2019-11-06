import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ConditionInput from './index'

describe('ConditionInput', () => {
  const isEmpty = jest.fn()
  const onChange = jest.fn()
  const props = {
    onChange,
    isEmpty,
    msg: {
      pickerle: 'test',
      id: '1',
      key: '1'
    },
    maxLength: 1
  }
  let component: ShallowWrapper<ConditionInput>, instance: ConditionInput
  beforeEach(() => {
    component = shallow(<ConditionInput {...props} />)
    instance = component.instance() as ConditionInput
  })

  it('render', () => {
    expect(component.find('label').length).toBeGreaterThan(0)
  })

  it('handleOnBlur', () => {
    const e: any = {
      target: {
        value: ''
      }
    }
    instance.handleOnBlur(e)
    expect(isEmpty).not.toBeCalled()
    // instance.props = {
    //   ...instance.props,
    //   msg: {
    //     ...instance.msg,
    //     required: true
    //   }
    // }
    // instance.handleOnBlur(e)
    // expect(isEmpty).toBeCalled()
  })

  it('handleChange', () => {
    const e: any = {
      target: {
        value: 'test'
      }
    }
    instance.handleChange(e)
    expect(instance.state.val).toBe('t')
    expect(onChange).toBeCalledWith({
      id: '1',
      key: '1',
      value: 'test',
      isLimited: true
    })
  })
})

describe('ConditionInput', () => {
  const isEmpty = jest.fn()
  const onChange = jest.fn()
  const props = {
    onChange,
    isEmpty,
    msg: {
      prickle: 'test',
      id: '1',
      key: '1',
      defaultValue: 'test',
      type: 'test',
      label: 'test',
      placeholder: 'test',
      className: 'test'
    },
    maxLength: 1
  }
  let component: ShallowWrapper<ConditionInput>
  beforeEach(() => {
    component = shallow(<ConditionInput {...props} />)
  })

  it('render', () => {
    expect(component.find('label').length).toBeGreaterThan(0)
  })
})
