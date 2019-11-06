import { getRouteMap, vertifyRoutePermission } from './utils'

describe('utils', () => {
  it('getRouteMap', () => {
    const routers = [{ title: 'Lending', route: '/lendings', isShow: true, id: 'nav-lending' }]
    expect(getRouteMap(routers, '/auth/my_orders', '/auth')).toEqual([
      { title: 'Lending', route: '/lendings', isShow: true, id: 'nav-lending', isHeight: false }
    ])
  })

  it('vertifyRoutePermission', () => {
    const permission = {
      _module: { p1: true, p2: true, p3: true, p4: true, p5: true },
      order: { p101: true, p102: true, p103: true, p104: true },
      lending: { p201: false },
      repayment: { p301: false },
      setting: { p401: true, p402: true },
      call_records: { p501: false },
      order_list_func: { p10101: true, p10102: true, p10103: true },
      my_order_func: { p10201: true, p10202: true },
      blacklist_management_func: { p10301: true },
      blacklist_func: { p10401: true, p10402: true },
      lending_func: { p20101: true, p20102: true, p20103: true, p20104: true, p20105: true, p20106: false },
      repayment_func: { p30101: true, p30102: true, p30103: true, p30104: true, p30105: true },
      role_func: { p40201: true, p40202: true, p40203: true },
      user_func: { p40101: true, p40102: true, p40103: true, p40104: true, p40105: true },
      call_records_func: { p50101: true, p50102: true },
      order_list_detail: {
        p1010101: true,
        p1010102: true,
        p1010103: true,
        p1010104: true,
        p1010105: true,
        p1010106: true,
        p1010107: true,
        p1010108: true,
        p1010109: true
      },
      my_order_detail: {
        p1020101: true,
        p1020102: true,
        p1020103: true,
        p1020104: true,
        p1020105: true,
        p1020106: true,
        p1020107: true,
        p1020108: true,
        p1020109: true
      },
      repayment_detail: {
        p3010101: true,
        p3010102: true,
        p3010103: true,
        p3010104: true,
        p3010105: true,
        p3010106: true,
        p3010107: true,
        p3010108: true,
        p3010109: true
      }
    }
    expect(vertifyRoutePermission(permission, '/lendings')).toBe(true)
    expect(vertifyRoutePermission(permission, '/repayments')).toBe(true)
    expect(vertifyRoutePermission(permission, '/callRecords')).toBe(true)
  })
})
