import { getQueryString, strDecrypt } from 'global/method'
import { typeReflect } from 'global/constants'
interface PathRes {
  _p: string
  _b: string
}

export const chosePath = (type: string): PathRes => {
  switch (type) {
    case 'orders':
      return { _p: '/auth/orders', _b: 'Order List' }
    case 'my_orders':
      return { _p: '/auth/my_orders', _b: 'My Order' }
    case 'repayments':
      return { _p: '/auth/repayments', _b: 'Repayment' }
    default:
      return { _p: '/auth/orders', _b: 'Order List' }
  }
}

interface RouterRes {
  path: string
  breadcrumbName: string
}
/**
 *面包屑返回结果
 * @param type 路由类型
 */
export const handlerRouter = (type: string): RouterRes[] => {
  const init = [
    { path: 'orders', breadcrumbName: 'order_list' },
    { path: 'order_detail', breadcrumbName: 'order_detail' }
  ]
  const { _p, _b } = chosePath(type)
  init[0] = { path: _p, breadcrumbName: _b }
  return init
}

// 上半部分区域
export const top_config = (type: string, p: any) => {
  const temp = p[`${typeReflect[type]}_reflect`] || {}
  return [
    { type: 'User info', title: 'User info', isShow: true, id: 'detail-user' },
    {
      type: 'Duplicate checking detection',
      title: 'Duplicate checking detection',
      isShow: !!temp.p1,
      id: 'detail-duplicate-check'
    },
    // { type: 'Address book', title: 'Address book', isShow: product_name === 'GotoCash', id: 'detail-address' },
    {
      type: 'Mobile device information',
      title: 'Mobile device information',
      isShow: !!temp.p3,
      id: 'detail-mobile-device'
    }
  ]
}
// 下半部分区域
export const bot_config = (is_edit: boolean, type: string, p: any) => {
  const temp = p[`${typeReflect[type]}_reflect`] || {}
  return [
    {
      type: 'Approve operate',
      title: `${is_edit ? 'Approve operate' : 'Approve result'}`,
      isShow: !!temp.p4,
      id: 'detail-approve-operate'
    },
    { type: 'Repayment', title: 'Repayment info', isShow: !!temp.p5, id: 'detail-repayment-info' },
    { type: 'Loan', title: 'Loan info', isShow: !!temp.p6, id: 'detail-loan-info' },
    { type: 'SMS record', title: 'SMS record', isShow: !!temp.p7, id: 'detail-sms-record' },
    { type: 'Status record', title: 'Status record', isShow: !!temp.p8, id: 'detail-status-record' }
  ]
}

interface FinConfig {
  type: string
  title: string
  isShow?: boolean
}

export const getFinConfig = (arr: FinConfig[]): any => {
  return arr.filter(item => item.isShow)
}

export const getRouteState = (search: string) => {
  if (!search) return {}
  return {
    customer_id: parseInt(strDecrypt(getQueryString(search, 'customer_id')), 10),
    mobile_id: parseInt(getQueryString(search, 'mobile_id'), 10),
    order_no: strDecrypt(getQueryString(search, 'order_no')),
    status: getQueryString(search, 'status'),
    detail_type: getQueryString(search, 'detail_type'),
    product_name: getQueryString(search, 'product_name')
  }
}
