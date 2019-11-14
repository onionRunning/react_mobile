import React from 'react'
import { mount } from 'enzyme'
import NavBar, { getLists } from './index'

describe('NavBar empty', () => {
  const mockProps = {
    handleClick: jest.fn(),
    type: 'User info'
  }
  let component: any

  beforeEach(() => {
    component = mount(<NavBar {...mockProps} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBe(1)
  })
  it('getLists', async () => {
    const t = getLists({
      ...mockProps,
      config: [
        { type: 'User info', title: '2', isShow: true },
        { type: 'x', title: '21', isShow: true }
      ]
    })
    expect(t.length).toBe(2)
  })
})
