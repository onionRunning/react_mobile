import * as React from 'react'
import { shallow } from 'enzyme'
import { infoList, MobileInfo } from './index'

describe('mobile info', () => {
  let component: any, props: any
  props = {
    mobiles: {
      getLoanInfoList: jest.fn()
    },
    common: {
      composeLoading: jest.fn()
    },
    history: {
      push: jest.fn()
    },
    location: {
      state: { customer_id: 1, mobile_id: 2 }
    }
  }
  beforeEach(() => {
    component = shallow(<MobileInfo {...props} />)
  })
  it('ui render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('infoList', () => {
    expect(infoList([{ name: '1', stateName: 'name' }], { name: '2' })[0].props.className).toEqual(`info_item`)
  })
})
