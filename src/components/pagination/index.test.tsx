import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Paginator from './index'

describe('Paginator', () => {
  let component: ShallowWrapper<Paginator>
  const mockProps = {
    totalCount: 1,
    current: 1
  }
  beforeEach(() => {
    component = shallow(<Paginator {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
