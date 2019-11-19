import React from 'react'
import { OrderInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('OrderInfo', () => {
  const mockProps = {
    userDetail: {
      order_msg: {},
      score_card_results: {}
    },
    showPicture: jest.fn(),
    sign_photo: 'test',
    currentList: 'order_list'
  }
  let component: ShallowWrapper<OrderInfo>

  beforeEach(() => {
    component = shallow(<OrderInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
