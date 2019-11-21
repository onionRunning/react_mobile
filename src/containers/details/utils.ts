export interface ConfigType {
  title: string
  type: string
  isShow?: boolean
  id?: string
  hasResult?: boolean
}

export const top_config = (hasResult: boolean): ConfigType[] => {
  return [
    { type: 'User info', title: 'User info', id: 'detail-user' },
    {
      type: 'Duplicate checking detection',
      title: 'Duplicate checking detection',
      id: 'detail-duplicate-check',
      hasResult
    },
    {
      type: 'Mobile device information',
      title: 'Mobile device information',
      id: 'detail-mobile-device'
    }
  ]
}

export const bot_config = (): ConfigType[] => {
  return [
    {
      type: 'Approve operate',
      title: 'Approve operate',
      id: 'detail-approve-operate'
    },
    { type: 'Repayment', title: 'Repayment info', id: 'detail-repayment-info' },
    { type: 'Loan', title: 'Loan info', id: 'detail-loan-info' },
    { type: 'SMS record', title: 'SMS record', id: 'detail-sms-record' },
    { type: 'Status record', title: 'Status record', id: 'detail-status-record' }
  ]
}

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

export const handlerRouter = (type: string): RouterRes[] => {
  const init = [
    { path: 'orders', breadcrumbName: 'order_list' },
    { path: 'order_detail', breadcrumbName: 'order_detail' }
  ]
  const { _p, _b } = chosePath(type)
  init[0] = { path: _p, breadcrumbName: _b }
  return init
}
