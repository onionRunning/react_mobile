import React from 'react'
import NormalText from './index'
import { ShallowWrapper, shallow } from 'enzyme'
import { formatTime, formatMoney, splitWord } from 'global/method'

describe('NormalText', () => {
  const mockProps = {
    title: 'title',
    widthStyle: 'style',
    value: 1,
    userType: 'default'
  }

  let component: ShallowWrapper<NormalText>, instance: NormalText
  beforeEach(() => {
    component = shallow(<NormalText {...mockProps} />)
    instance = component.instance() as NormalText
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handTypeValue', () => {
    expect(instance.handTypeValue('time', '2019-01-01')).toBe(formatTime('2019-01-01'))
    expect(instance.handTypeValue('money', 1)).toBe(`Rs. ${formatMoney(1)}`)
    expect(instance.handTypeValue('date', '1')).toBe('1 days')
    expect(instance.handTypeValue('status', 'sdfS')).toBe(splitWord('sdfS'))
  })
})
