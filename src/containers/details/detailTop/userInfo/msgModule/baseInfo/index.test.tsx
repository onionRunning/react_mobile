import React from 'react'
import { BaseInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('BaseInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<BaseInfo>

  beforeEach(() => {
    component = shallow(<BaseInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
