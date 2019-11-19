import React from 'react'
import { EquipmentOverviewInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('EquipmentOverviewInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<EquipmentOverviewInfo>

  beforeEach(() => {
    component = shallow(<EquipmentOverviewInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
