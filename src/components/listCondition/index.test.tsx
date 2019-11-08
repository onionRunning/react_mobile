import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ListCondition from './index'
import moment from 'moment'
import { formType } from 'global/constants'

describe('ListCondition', () => {
  const onChange = jest.fn()
  const data = [
    { formType: formType.INPUT, label: 'test', key: '1' },
    { formType: formType.RANGE_INPUT, label: 'test', key: '2' },
    { formType: formType.SELECT, label: 'test', key: '3' },
    { formType: formType.TREE_SELECT, label: 'test', key: '3' },
    { formType: formType.TIME, label: 'test', key: '4' },
    { formType: formType.RANGE_TIME, label: 'test', key: '5' },
    { formType: 11111, label: 'test', key: '6' }
  ]
  const props = {
    data,
    onChange
  }
  let component: ShallowWrapper<ListCondition>, instance: ListCondition
  beforeEach(() => {
    component = shallow(<ListCondition {...props} />)
    instance = component.instance() as ListCondition
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('onSearchChange', () => {
    instance.onSearchChange(data[0])('test')
    expect(onChange).toBeCalledWith({ ...data[0], value: 'test' })
  })

  it('onChangeTime with value', () => {
    instance.onChangeTime(data[0])(moment(new Date(2000, 1, 1)))
    expect(onChange).toBeCalledWith({ key: '1', value: '2000-02-01' })
  })
})
