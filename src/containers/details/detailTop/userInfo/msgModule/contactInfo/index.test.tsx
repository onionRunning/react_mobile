import React from 'react'
import { ContactInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('ContactInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<ContactInfo>

  beforeEach(() => {
    component = shallow(<ContactInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
