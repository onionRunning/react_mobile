import React from 'react'
import IdCardPhoto from './index'
import { shallow } from 'enzyme'

describe('IdCardPhoto', () => {
  const mockProps = {
    config: [
      {
        src: 'test',
        showId: '1',
        title: 'test'
      }
    ],
    showPicture: jest.fn()
  }

  const component = shallow(<IdCardPhoto {...mockProps} />)

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
