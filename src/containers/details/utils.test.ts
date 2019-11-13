import { chosePath, handlerRouter, top_config, bot_config, getFinConfig, getRouteState } from './utils'
import { strEncrypt, getQueryString, strDecrypt } from 'global/method'

describe('utils', () => {
  const permission = {
    order_list_reflect: {
      p0: true,
      p1: true,
      p2: true,
      p3: true,
      p4: true,
      p5: true,
      p6: true,
      p7: true,
      p8: true,
      p1010101: true,
      p1010102: true,
      p1010103: true,
      p1010104: true,
      p1010105: true,
      p1010106: true,
      p1010107: true,
      p1010108: true,
      p1010109: true
    }
  }
  it('chosePath', () => {
    expect(chosePath('orders')).toEqual({
      _p: '/auth/orders',
      _b: 'Order List'
    })
    expect(chosePath('my_orders')).toEqual({
      _p: '/auth/my_orders',
      _b: 'My Order'
    })
    expect(chosePath('repayments')).toEqual({
      _p: '/auth/repayments',
      _b: 'Repayment'
    })
    expect(chosePath('default')).toEqual({
      _p: '/auth/orders',
      _b: 'Order List'
    })
  })

  it('handlerRouter', () => {
    expect(handlerRouter('orders')).toEqual([
      { path: '/auth/orders', breadcrumbName: 'Order List' },
      { path: 'order_detail', breadcrumbName: 'order_detail' }
    ])
    expect(handlerRouter('my_orders')).toEqual([
      { path: '/auth/my_orders', breadcrumbName: 'My Order' },
      { path: 'order_detail', breadcrumbName: 'order_detail' }
    ])
    expect(handlerRouter('repayments')).toEqual([
      { path: '/auth/repayments', breadcrumbName: 'Repayment' },
      { path: 'order_detail', breadcrumbName: 'order_detail' }
    ])
  })

  it('top_config', () => {
    // TODO: 因为原文直接暂时写死了
    // expect(top_config('error', permission)).toEqual([
    //   { type: 'User info', title: 'User info', isShow: false, id: 'detail-user' },
    //   {
    //     type: 'Duplicate checking detection',
    //     title: 'Duplicate checking detection',
    //     isShow: false,
    //     id: 'detail-duplicate-check'
    //   },
    //   {
    //     type: 'Mobile device information',
    //     title: 'Mobile device information',
    //     isShow: false,
    //     id: 'detail-mobile-device'
    //   }
    // ])
    expect(top_config('orders', permission)).toEqual([
      { type: 'User info', title: 'User info', isShow: true, id: 'detail-user' },
      {
        type: 'Duplicate checking detection',
        title: 'Duplicate checking detection',
        isShow: true,
        id: 'detail-duplicate-check'
      },
      {
        type: 'Mobile device information',
        title: 'Mobile device information',
        isShow: true,
        id: 'detail-mobile-device'
      }
    ])
  })

  it('bot_config', () => {
    expect(bot_config(true, 'error', permission)).toEqual([
      { type: 'Approve operate', title: 'Approve operate', isShow: false, id: 'detail-approve-operate' },
      { type: 'Repayment', title: 'Repayment info', isShow: false, id: 'detail-repayment-info' },
      { type: 'Loan', title: 'Loan info', isShow: false, id: 'detail-loan-info' },
      { type: 'SMS record', title: 'SMS record', isShow: false, id: 'detail-sms-record' },
      { type: 'Status record', title: 'Status record', isShow: false, id: 'detail-status-record' }
    ])
    expect(bot_config(true, 'orders', permission)).toEqual([
      { type: 'Approve operate', title: 'Approve operate', isShow: true, id: 'detail-approve-operate' },
      { type: 'Repayment', title: 'Repayment info', isShow: true, id: 'detail-repayment-info' },
      { type: 'Loan', title: 'Loan info', isShow: true, id: 'detail-loan-info' },
      { type: 'SMS record', title: 'SMS record', isShow: true, id: 'detail-sms-record' },
      { type: 'Status record', title: 'Status record', isShow: true, id: 'detail-status-record' }
    ])
    expect(bot_config(false, 'orders', permission)).toEqual([
      { type: 'Approve operate', title: 'Approve result', isShow: true, id: 'detail-approve-operate' },
      { type: 'Repayment', title: 'Repayment info', isShow: true, id: 'detail-repayment-info' },
      { type: 'Loan', title: 'Loan info', isShow: true, id: 'detail-loan-info' },
      { type: 'SMS record', title: 'SMS record', isShow: true, id: 'detail-sms-record' },
      { type: 'Status record', title: 'Status record', isShow: true, id: 'detail-status-record' }
    ])
  })

  it('getFinConfig', () => {
    const config = [
      { type: 'User info', title: 'User info', isShow: true, id: 'detail-user' },
      {
        type: 'Duplicate checking detection',
        title: 'Duplicate checking detection',
        isShow: false,
        id: 'detail-duplicate-check'
      },
      {
        type: 'Mobile device information',
        title: 'Mobile device information',
        isShow: false,
        id: 'detail-mobile-device'
      }
    ]

    expect(getFinConfig(config)).toEqual([{ type: 'User info', title: 'User info', isShow: true, id: 'detail-user' }])
  })

  it('getRouteState', () => {
    expect(getRouteState('')).toEqual({})
    const encryptCustomer_id = strEncrypt(String(8895))
    const encryptOrder_no = strEncrypt('Gt20191029000011')
    const search = `?customer_id=${encryptCustomer_id}&order_no=${encryptOrder_no}&mobile_id=0&status=AuditingPassed&detail_type=orders&product_name=GotoCash`
    expect(getRouteState(search)).toEqual({
      customer_id: parseInt(strDecrypt(getQueryString(search, 'customer_id')), 10),
      mobile_id: parseInt(getQueryString(search, 'mobile_id'), 10),
      order_no: strDecrypt(getQueryString(search, 'order_no')),
      status: getQueryString(search, 'status'),
      detail_type: getQueryString(search, 'detail_type'),
      product_name: getQueryString(search, 'product_name')
    })
  })
})
