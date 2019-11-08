import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import RangeDatePicker from './index'
import moment from 'moment'
import { timeStampBeauty } from 'global/method'

describe('RangeDatePicker', () => {
  const onChange = jest.fn()
  const props = {
    onChange,
    item: {
      label: 'test',
      range: {
        start: {
          key: '1',
          placeholder: 'test'
        },
        end: {
          key: '2',
          palceholder: 'test'
        }
      }
    },
    disabledDate: true
  }
  let component: ShallowWrapper<RangeDatePicker>, instance: RangeDatePicker
  beforeEach(() => {
    component = shallow(<RangeDatePicker {...props} />)
    instance = component.instance() as RangeDatePicker
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('i').length).toBeGreaterThan(0)
  })

  it('onChangeTime start', () => {
    const value = moment(new Date(2000, 1, 1))
    instance.onChangeTime({ key: 'test' }, 'start')(value)
    expect(onChange).toBeCalledWith({ key: 'test', value: timeStampBeauty(value.valueOf()) })
  })

  it('onChangeTime end', () => {
    const value = moment(new Date(2000, 1, 1))
    instance.onChangeTime({ key: 'test' }, 'end')(value)
    expect(onChange).toBeCalledWith({ key: 'test', value: timeStampBeauty(value.valueOf()) })
  })
})
