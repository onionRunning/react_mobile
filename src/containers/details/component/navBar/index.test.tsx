import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { NavBar } from './index'

describe('NavBar empty', () => {
  const mockProps = {
    handleClick: jest.fn(),
    type: 'User info'
  }
  let component: ShallowWrapper<NavBar>

  beforeEach(() => {
    component = shallow(<NavBar {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('li').length).toBe(0)
  })
})

describe('NavBar', () => {
  const mockProps = {
    config: [
      { type: 'User info', title: 'User info', isShow: true, id: 'detail-user' },
      {
        type: 'Duplicate checking detection',
        title: 'Duplicate checking detection',
        isShow: true,
        id: 'detail-duplicate-check'
      },
      {
        type: 'Mobile device information',
        title: 'Mobile device information',
        isShow: true,
        id: 'detail-mobile-device'
      }
    ],
    handleClick: jest.fn(),
    type: 'User info'
  }
  let component: ShallowWrapper<NavBar>

  beforeEach(() => {
    component = shallow(<NavBar {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('ul').length).toBeGreaterThan(0)
  })
})
