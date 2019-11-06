import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ListCondition from './index'
import moment from 'moment'
import { formType } from 'global/constants'

describe('ListCondition', () => {
  const onChange = jest.fn()
  const onSearch = jest.fn()
  const btnClick = jest.fn()
  const data = [
    { formType: formType.INPUT, label: 'test', key: '1' },
    { formType: formType.RANGE_INPUT, label: 'test', key: '2' },
    { formType: formType.SELECT, label: 'test', key: '3' },
    { formType: formType.TREE_SELECT, label: 'test', key: '3' },
    { formType: formType.TIME, label: 'test', key: '4' },
    { formType: formType.RANGE_TIME, label: 'test', key: '5' },
    { formType: 11111, label: 'test', key: '6' }
  ]
  const btnItems = [
    {
      className: 'test',
      type: '',
      text: ''
    },
    {
      className: '',
      authorityId: '15',
      type: '',
      text: ''
    }
  ]
  const props = {
    btnClick,
    data,
    onChange,
    hasSwitch: true,
    btnItems,
    onSearch
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

  // it('renderButtons no data', () => {
  //   instance.props = {
  //     ...instance.props,
  //     btnItems: null
  //   }
  //   expect(instance.renderButtons()).toBe('')
  // })

  it('onSearchChange', () => {
    instance.onSearchChange(data[0])('test')
    expect(onChange).toBeCalledWith({ ...data[0], value: 'test' })
  })

  it('onChangeTime with value', () => {
    instance.onChangeTime(data[0])(moment(new Date(2000, 1, 1)))
    expect(onChange).toBeCalledWith({ key: '1', value: '2000-02-01' })
  })

  it('btnClick', () => {
    const type = 'test'
    const e: any = {
      stopPropagation: jest.fn()
    }
    instance.btnClick(type)(e)
    expect(btnClick).toBeCalledWith('test')
  })
})
