import React from 'react'
import { OrderInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('OrderInfo', () => {
  const mockProps = {
    userDetail: {
      order_msg: {},
      score_card_results: [
        {
          score: '1212',
          // label: string
          err_msg: 'test',
          order_no: '1111',
          original_score: '111',
          random_num: '111',
          sc_id: '111',
          trace_id: '111',
          tt_level: 10
        }
      ]
    },
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
