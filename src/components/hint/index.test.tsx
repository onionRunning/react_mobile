import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Hint from './index'
describe('Hint success', () => {
  const props = {
    type: 'success',
    show: true
  }
  let component: ShallowWrapper<Hint>
  beforeEach(() => {
    component = shallow(<Hint {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('Hint error', () => {
  const props = {
    type: 'error',
    show: true
  }
  let component: ShallowWrapper<Hint>
  beforeEach(() => {
    component = shallow(<Hint {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('Hint default', () => {
  const props = {
    type: 'default',
    show: true
  }
  let component: ShallowWrapper<Hint>
  beforeEach(() => {
    component = shallow(<Hint {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('Hint show false', () => {
  const props = {
    type: 'default',
    show: false
  }
  let component: ShallowWrapper<Hint>
  beforeEach(() => {
    component = shallow(<Hint {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
