import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Switch from './index'

describe('Switch', () => {
  let component: ShallowWrapper<Switch>
  beforeEach(() => {
    component = shallow(<Switch />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
