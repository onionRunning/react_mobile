import React from 'react'
import { CollectionAccountInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('BaseInfo', () => {
  const mockProps = {
    data: {
      order_no: 1,
      account_type: 'cash pickup'
    }
  }
  let component: ShallowWrapper<CollectionAccountInfo>

  beforeEach(() => {
    component = shallow(<CollectionAccountInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
