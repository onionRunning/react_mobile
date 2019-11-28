import React from 'react'
import { ContactInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('ContactInfo', () => {
  const mockProps = {
    data: {
      user_contact_info:
        '[{"user_relation_ship":"Father","user_name":"ba ba","user_mobile":"1234567890","user_contact_type":"immediate"}]'
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
