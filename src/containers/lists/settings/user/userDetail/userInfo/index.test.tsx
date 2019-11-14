import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import UserInfo from './index'

describe('UserInfo', () => {
  const mockProps = {
    userDetail: {
      name: 'test',
      email: 'test@qq.com',
      phone: '13600000001'
    },
    type: 'edit',
    onChange: jest.fn()
  }

  let component: ShallowWrapper<UserInfo>, instance: UserInfo

  beforeEach(() => {
    component = shallow(<UserInfo {...mockProps} />)
    instance = component.instance() as UserInfo
    instance.setState({
      name: '',
      email: '',
      phone: ''
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleChange', () => {
    const e = { target: { value: '13600000009', name: 'phone' } }
    const input = component.find('input[name="name"]')
    input.simulate('change', e)
    expect(mockProps.onChange).toBeCalled()
    const e1 = { target: { value: '13600000009@qq.com', name: 'email' } }
    const input1 = component.find('input[name="email"]')
    input1.simulate('change', e1)
    expect(mockProps.onChange).toBeCalled()
  })
})
