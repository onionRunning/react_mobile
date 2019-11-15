import React from 'react'
import { OrderInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('OrderInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    },
    showPicture: jest.fn(),
    sign_photo: 'test'
  }
  let component: ShallowWrapper<OrderInfo>

  beforeEach(() => {
    component = shallow(<OrderInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
