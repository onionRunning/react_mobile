import * as React from 'react'
import { shallow } from 'enzyme'
import DecileCard from './index'

describe('DecileCard', () => {
  let component: any
  const props = {
    data: [
      {
        sc_id: 'phl_p2g_sc_v1_nc_gl1213',
        tt_level: '6'
      }
    ],
    type: 'New Client'
  }

  beforeEach(() => {
    component = shallow(<DecileCard {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(1)
  })
})
describe('DecileCard', () => {
  let component: any
  const props = {
    data: [],
    type: 'New Client'
  }

  beforeEach(() => {
    component = shallow(<DecileCard {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
