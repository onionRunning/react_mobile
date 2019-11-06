import React from 'react'
import { LeftNav } from './index'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'
jest.mock('design/permission', () => ({
  userPermission: {
    finnalPermission: {
      _module: {
        p2: true,
        p3: true,
        p5: true
      },
      lending: {
        p201: true
      },
      repayment: {
        p301: true
      },
      call_records: {
        p501: false
      }
    }
  }
}))

describe('LeftNav', () => {
  const mockRoute = mockRouteProps({}, {}, '/auth/lendings')
  const mockProps = {
    baseUrl: '/auth',
    config: [
      {
        title: 'Order',
        route: ['/orders', '/my_orders'],
        isShow: true,
        id: 'nav-order',
        children: []
      },
      {
        title: 'Lending',
        route: '/lendings',
        isShow: true,
        id: 'nav-lending'
      },
      {
        title: 'Repayment',
        route: '/repayments',
        isShow: false,
        id: 'nav-repayment'
      },
      {
        title: 'Setting',
        route: ['/users', '/roles'],
        isShow: true,
        id: 'nav-setting',
        children: [
          {
            title: 'User',
            route: '/users',
            isShow: true,
            id: 'nav-setting-user'
          },
          {
            title: 'Role',
            route: '/roles',
            isShow: true,
            id: 'nav-setting-role'
          }
        ]
      }
    ],
    checkIsReadOnly: jest.fn().mockReturnValue(true),
    ...mockRoute
  }

  let component: ShallowWrapper<LeftNav>, instance: LeftNav

  beforeEach(() => {
    component = shallow(<LeftNav {...mockProps} />)
    instance = component.instance() as LeftNav
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handlerSecondNav', () => {
    const ul = document.createElement('ul')
    document.getElementsByClassName = () => {
      return [ul] as any
    }
    // instance.handlerSecondNav()
  })

  it('showFirstNav', () => {
    expect(instance.showFirstNav().length).toBe(4)
  })

  it('secondNavList', () => {
    const mockTemp = [
      {
        title: 'Lending',
        route: '/lendings'
      }
    ]
    expect(instance.secondNavList(mockTemp).length).toBe(1)
  })

  it('clickRoute', () => {
    instance.clickRoute('/callRecords')()
    instance.clickRoute('/lendings')()
  })
})

describe('LeftNav', () => {
  const mockRoute = mockRouteProps({}, {}, '/auth/orders')
  const mockProps = {
    baseUrl: '/auth',
    config: [
      {
        title: 'Order',
        route: ['/orders', '/my_orders'],
        isShow: true,
        id: 'nav-order',
        children: [
          {
            title: 'Order list',
            route: '/orders',
            isShow: true,
            id: 'nav-order-order-list'
          },
          {
            title: 'My order',
            route: '/my_orders',
            isShow: true,
            id: 'nav-order-my-orders'
          },
          {
            title: 'Blacklist management',
            route: '/blacklist_management',
            isShow: true,
            id: 'nav-order-blacklist-management'
          },
          {
            title: 'Blacklist',
            route: '/blacklist',
            isShow: true,
            id: 'nav-order-blacklist'
          }
        ]
      },
      {
        title: 'Lending',
        route: '/lendings',
        isShow: true,
        id: 'nav-lending'
      },
      {
        title: 'Repayment',
        route: '/repayments',
        isShow: false,
        id: 'nav-repayment'
      },
      {
        title: 'Setting',
        route: ['/users', '/roles'],
        isShow: true,
        id: 'nav-setting',
        children: []
      }
    ],
    checkIsReadOnly: jest.fn().mockReturnValue(false),
    ...mockRoute
  }

  let component: ShallowWrapper<LeftNav>, instance: LeftNav

  beforeEach(() => {
    component = shallow(<LeftNav {...mockProps} />)
    instance = component.instance() as LeftNav
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('clickRoute', () => {
    expect(instance.clickRoute('')()).toBe('')
    expect(instance.clickRoute(['/orders', '/my_orders'])()).toBe('')
    instance.clickRoute('/lendings')()
    expect(mockRoute.history.push).toBeCalledWith('/auth/lendings')
  })
})
