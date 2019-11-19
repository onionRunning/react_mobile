import React from 'react'
import { Identify } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('Identify', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<Identify>

  beforeEach(() => {
    component = shallow(<Identify {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
