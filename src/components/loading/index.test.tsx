import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Loading from './index'
describe('Loading', () => {
  const props = {
    show: true
  }
  let component: ShallowWrapper<Loading>
  beforeEach(() => {
    component = shallow(<Loading {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('Loading show false', () => {
  const props = {
    show: false
  }
  let component: ShallowWrapper<Loading>
  beforeEach(() => {
    component = shallow(<Loading {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
