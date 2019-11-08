import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import RangeInput from './index'

describe('RangeInput', () => {
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
  let component: ShallowWrapper<RangeInput>
  beforeEach(() => {
    component = shallow(<RangeInput {...props} />)
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('i').length).toBeGreaterThan(0)
  })
})
