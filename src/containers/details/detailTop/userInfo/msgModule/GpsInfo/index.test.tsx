import React from 'react'
import { GPSInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('GPSInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<GPSInfo>

  beforeEach(() => {
    component = shallow(<GPSInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
