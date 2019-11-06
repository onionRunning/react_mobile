import React from 'react'
import BreadCrumbCom from './index'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'

describe('BreadCrumbCom', () => {
  const mockRoutes = [
    {
      path: 'test',
      breadcrumbName: 'test'
    },
    {
      path: 'test1',
      breadcrumbName: 'test1'
    }
  ]
  const routeProps = mockRouteProps({})
  const mockShowErr = jest.fn()
  const mockProps = {
    routes: mockRoutes,
    showErr: mockShowErr,
    ...routeProps
  }

  let component: ShallowWrapper<BreadCrumbCom>, instance: BreadCrumbCom

  beforeEach(() => {
    component = shallow(<BreadCrumbCom {...mockProps} />)
    instance = component.instance() as BreadCrumbCom
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('itemRender', () => {
    expect(instance.itemRender.bind(instance, mockRoutes[0], undefined, mockRoutes)).not.toThrow()
    expect(instance.itemRender.bind(instance, mockRoutes[1], undefined, mockRoutes)).not.toThrow()
  })

  it('handleJump', () => {
    instance.handleJump('test')()
    expect(routeProps.history.push).toBeCalledWith('test')
  })
})
