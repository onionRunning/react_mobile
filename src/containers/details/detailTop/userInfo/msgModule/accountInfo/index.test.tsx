import React from 'react'
import { CollectionAccountInfo } from './index'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'
import { RouteType } from 'containers/lists/settings/role/config'

describe('CollectionAccountInfo', () => {
  const mockParams = {
    order_no: '11',
    type: RouteType.Add,
    a: 'a'
  }
  const mockRoute = mockRouteProps(mockParams)
  const mockDispatch = jest.fn()
  const mockProps = {
    ...mockRoute,
    dispatch: mockDispatch,
    data: {
      order_no: 1
    }
  }
  let component: ShallowWrapper<CollectionAccountInfo>, instance: CollectionAccountInfo

  beforeEach(() => {
    component = shallow(<CollectionAccountInfo {...mockProps} />)
    instance = component.instance() as CollectionAccountInfo
    mockDispatch.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getBankAuthResult', () => {
    instance.getBankAuthResult()
    expect(mockDispatch.mock.calls[0][0].payload).toEqual({ order_no: 1 })
  })

  it('getUserInfo', () => {
    instance.getUserInfo()
    expect(mockDispatch.mock.calls[0][0].payload).toEqual({ order_no: 1 })
  })
})
