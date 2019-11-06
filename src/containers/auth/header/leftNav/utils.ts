import { FinnalPermission } from 'design/interface'
/**
 * routeMap : 当前路由显示高亮配置
 * @param {*} routeMap 路由配置
 * @param {*} cRoute 当前路由
 * return : 返回具有高亮属性的路由配置
 */
export const getRouteMap = (routeMap: any[], cRoute: string, baseUrl: string) => {
  const matchRoute = cRoute.replace(baseUrl, '')
  return routeMap.map(item => {
    return { ...item, isHeight: item.route === matchRoute }
    // return { ...item, isHeight: item.route === matchRoute || item.route.includes(matchRoute) }
  })
}

export const settingRoute = (router: string) => {
  // console.log(router,"router")
  // return router.includes('roles') || router.includes('users')
  return router === '/auth/users' || router === '/auth/roles'
}

// 校验路由能否点击,针对lending && repayment && content 特殊处理
export const vertifyRoutePermission = (permission: FinnalPermission, route: string | string[]) => {
  const { p2, p3, p5 } = permission._module
  const { p201 } = permission.lending
  const { p301 } = permission.repayment
  const { p501 } = permission.call_records
  // return (!p2 && route === "lendings" ) || (!p3 && route === "repayments" )
  switch (true) {
    case p2 && !p201 && route === '/lendings':
      return true
    case p3 && !p301 && route === '/repayments':
      return true
    case p5 && !p501 && route === '/callRecords':
      return true
    default:
      return false
  }
}
