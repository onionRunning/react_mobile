import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Search from './index'

describe('Search', () => {
  const onChange = jest.fn()
  const props = {
    onChange
  }
  let component: ShallowWrapper<Search>, instance: Search
  beforeEach(() => {
    component = shallow(<Search {...props} />)
    instance = component.instance() as Search
    onChange.mockClear()
  })

  it('render', () => {
    expect(component.find('Search').length).toBeGreaterThan(0)
  })

  it('handleChange without maxlength', () => {
    const e: any = {
      target: {
        value: 'test'
      }
    }
    instance.handleChange(e)
    expect(instance.state.value).toBe('test')
    expect(onChange).toBeCalled()
  })

  // it('handleChange with maxlength', () => {
  //   const e = {
  //     target: {
  //       value: 'test'
  //     }
  //   }
  //   component.props = {
  //     ...props,
  //     maxLength: 10
  //   }
  //   instance.handleChange(e)
  //   expect(instance.state.value).toBe('test')
  //   expect(onChange).toBeCalled()
  // })
})
