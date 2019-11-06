import { choseRoute, getRedictRoute } from './utils'

describe('utils', () => {
  it('choseRoute', () => {
    const noPermission = {
      p101: false,
      p102: false,
      p103: false,
      p104: false
    }
    const orderPermission = {
      p101: false,
      p102: true,
      p103: true,
      p104: true
    }
    const settingPermission = {
      p401: false,
      p402: true
    }
    const ordersRouter = {
      p101: '/orders',
      p102: '/my_orders',
      p103: '/blacklist_management',
      p104: '/blacklist'
    }
    const settingRouter = {
      p401: '/users',
      p402: '/roles'
    }
    expect(choseRoute(noPermission, ordersRouter)).toBe('')
    expect(choseRoute(orderPermission, ordersRouter)).toBe('/my_orders')
    expect(choseRoute(settingPermission, settingRouter)).toBe('/roles')
  })

  it('getRedictRoute', () => {
    const permission = {
      order: { p101: true, p102: true, p103: true, p104: true },
      lending: { p201: true },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: true, p2: true, p3: true, p4: true, p5: true }
    }
    const permission1 = {
      order: { p101: true, p102: false, p103: true, p104: true },
      lending: { p201: true },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: true, p2: true, p3: true, p4: true, p5: true }
    }
    const permission2 = {
      order: { p101: false, p102: false, p103: true, p104: true },
      lending: { p201: true },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: true, p2: true, p3: true, p4: true, p5: true }
    }
    const permission3 = {
      order: { p101: false, p102: false, p103: false, p104: true },
      lending: { p201: true },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: true, p2: true, p3: true, p4: true, p5: true }
    }
    const permission4 = {
      order: { p101: false, p102: false, p103: false, p104: false },
      lending: { p201: true },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: false, p2: true, p3: true, p4: true, p5: true }
    }
    const permission5 = {
      order: { p101: false, p102: false, p103: false, p104: false },
      lending: { p201: false },
      repayment: { p301: true },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: false, p2: false, p3: true, p4: true, p5: true }
    }
    const permission6 = {
      order: { p101: false, p102: false, p103: false, p104: false },
      lending: { p201: false },
      repayment: { p301: false },
      setting: { p401: true, p402: true },
      call_records: { p501: true },
      _module: { p1: false, p2: false, p3: false, p4: true, p5: true }
    }
    const permission7 = {
      order: { p101: false, p102: false, p103: false, p104: false },
      lending: { p201: false },
      repayment: { p301: false },
      setting: { p401: false, p402: true },
      call_records: { p501: true },
      _module: { p1: false, p2: false, p3: false, p4: true, p5: true }
    }
    const permission8 = {
      order: { p101: false, p102: false, p103: false, p104: false },
      lending: { p201: false },
      repayment: { p301: false },
      setting: { p401: false, p402: false },
      call_records: { p501: true },
      _module: { p1: false, p2: false, p3: false, p4: false, p5: true }
    }

    expect(getRedictRoute(permission)).toBe('/my_orders')
    expect(getRedictRoute(permission1)).toBe('/orders')
    expect(getRedictRoute(permission2)).toBe('/blacklist_management')
    expect(getRedictRoute(permission3)).toBe('/blacklist')
    expect(getRedictRoute(permission4)).toBe('/lendings')
    expect(getRedictRoute(permission5)).toBe('/repayments')
    expect(getRedictRoute(permission6)).toBe('/users')
    expect(getRedictRoute(permission7)).toBe('/roles')
    expect(getRedictRoute(permission8)).toBe('/callRecords')
  })
})
