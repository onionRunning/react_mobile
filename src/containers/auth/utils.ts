export const ordersRouter: any = {
  p101: '/orders',
  p102: '/my_orders',
  p103: '/blacklist_management',
  p104: '/blacklist'
}

export const settingRouter: any = {
  p401: '/users',
  p402: '/roles'
}

// 与权限做匹配，指定二级菜单默认路由，p: permission, r: router
export const choseRoute = (p: any, r: any) => {
  for (let key in p) {
    if (p[key]) {
      return r[key]
    }
  }
  return ''
}

// 与权限做匹配，指定默认路由
export const getRedictRoute = (permission: any) => {
  const { _module, order, lending, repayment, setting, call_records } = permission
  // console.log('permission', permission)
  switch (true) {
    case _module.p1 && order.p102: // 进入默认路由 - 我的订单
      return '/my_orders'
    case _module.p1:
      return choseRoute(order, ordersRouter)
    case _module.p2 && lending.p201:
      return '/lendings'
    case _module.p3 && repayment.p301:
      return '/repayments'
    case _module.p4:
      return choseRoute(setting, settingRouter)
    case _module.p5 && call_records.p501:
      return '/callRecords'
    default:
      return ''
  }
}
// FIXME:开始默认路由是auth 但是在route中已经定义过了，不能出现完全一样的路由否则会出现路由循环嵌套报错
