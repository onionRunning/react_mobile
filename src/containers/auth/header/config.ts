import { userPermission } from 'design/permission'

const routesConfig = () => {
  const { _module, order, setting } = userPermission.finnalPermission!
  return [
    {
      title: 'Order',
      route: ['/orders', '/my_orders'],
      isShow: _module.p1,
      id: 'nav-order',
      children: [
        {
          title: 'Order list',
          route: '/orders',
          isShow: order.p101,
          id: 'nav-order-order-list'
        },
        {
          title: 'My order',
          route: '/my_orders',
          isShow: order.p102,
          id: 'nav-order-my-orders'
        },
        {
          title: 'Blacklist management',
          route: '/blacklist_management',
          isShow: order.p103,
          id: 'nav-order-blacklist-management'
        },
        {
          title: 'Blacklist',
          route: '/blacklist',
          isShow: order.p104,
          id: 'nav-order-blacklist'
        }
      ]
    },
    {
      title: 'Lending',
      route: '/lendings',
      isShow: _module.p2,
      id: 'nav-lending'
    },
    {
      title: 'Repayment',
      route: '/repayments',
      isShow: _module.p3,
      id: 'nav-repayment'
    },
    {
      title: 'Setting',
      route: ['/users', '/roles'],
      isShow: _module.p4,
      id: 'nav-setting',
      children: [
        {
          title: 'User',
          route: '/users',
          isShow: setting.p401,
          id: 'nav-setting-user'
        },
        {
          title: 'Role',
          route: '/roles',
          isShow: setting.p402,
          id: 'nav-setting-role'
        }
      ]
    },
    {
      title: 'Content',
      route: '/callRecords',
      isShow: false,
      id: 'nav-content'
    }
  ]
}
export type RoutesConfig = typeof routesConfig

export default routesConfig

/**
 * navRouter: 路由配置项
 *
 */
