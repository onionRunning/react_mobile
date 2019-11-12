import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { UserInfo } from './index'

describe('UserInfo', () => {
  const mockProps = {
    name: 'test',
    email: 'test@qq.com',
    cellphone: '13600000001',
    userDetail: {},
    type: 'edit',
    onChange: jest.fn()
  }

  let component: ShallowWrapper<UserInfo>

  beforeEach(() => {
    component = shallow(<UserInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleChange', () => {
    const e = { target: { value: '13600000009', name: 'cellphone' } }
    const input = component.find('input[name="name"]')
    input.simulate('change', e)
    expect(mockProps.onChange).toBeCalled()
  })
})
