import React from 'react'
import FormInputListUI from './index'
import { shallow } from 'enzyme'

describe('FormInputListUI', () => {
  const mockProps = {
    data: {
      test: 'test'
    },
    config: [
      {
        stateName: 'test'
      }
    ]
  }

  const component = shallow(<FormInputListUI {...mockProps} />)

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
