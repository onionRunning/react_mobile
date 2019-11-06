import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import DatePickerDemo from './index'
import moment from 'moment'

describe('DatePickerDemo', () => {
  const onChange = jest.fn()
  const props = {
    onChange
  }

  let component: ShallowWrapper<DatePickerDemo>, instance: DatePickerDemo
  beforeEach(() => {
    component = shallow(<DatePickerDemo {...props} />)
    instance = component.instance() as DatePickerDemo
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('onChange', () => {
    const m = moment()
    instance.onChange(m)
    expect(onChange).toBeCalledWith(m)
  })
})
