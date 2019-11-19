import React from 'react'
import { WorkInfo } from './index'
import { ShallowWrapper, shallow } from 'enzyme'

describe('WorkInfo', () => {
  const mockProps = {
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<WorkInfo>

  beforeEach(() => {
    component = shallow(<WorkInfo {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
