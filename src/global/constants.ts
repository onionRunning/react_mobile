// 能进入详情的列表
export const intoDetail = {
  ORDERS: 'order_list',
  MYORDER: 'my_orders',
  REPAYMENT: 'repayments',
  BLACKORDER: 'black_list'
}

// 类型转换
export const typeReflect: any = {
  orders: 'order_list',
  my_orders: 'my_order',
  repayments: 'repayment'
}

export const CONFIRM_MSG = {
  COMMON_FONFIRM: 'Do you confirm this loan disbursement?', // 您确定要进行此操作吗？
  CANCEL_LOAN: 'Do you confirm the loan cancellation?' // 您是否想要取消这笔放款订单
}

// 筛选输入类型
export const formType = {
  INPUT: 1, // input
  RANGE_INPUT: 2, // 关联的范围输入框
  SELECT: 3, // select
  TIME: 4, // 时间
  RANGE_TIME: 5, // 关联的有范围的时间选择
  SEARCH: 6, // 搜索框
  TREE_SELECT: 7 // 树级select
}

export const STATUS_CONFIG = {
  NewApplication: {
    label: 'New Application',
    className: ''
  },
  AutoAuditing: {
    label: 'Auto Auditing',
    className: ''
  },
  AutoReject: {
    label: 'Auto Reject',
    className: 'red'
  },
  WaitingForManualAuditing: {
    label: 'Waiting For Manual Auditing',
    className: ''
  },
  ManualAuditing: {
    label: 'Manual Auditing',
    className: ''
  },
  AuditingPassed: {
    label: 'Auditing Passed',
    className: 'green'
  },
  AuditingReject: {
    label: 'Auditing Reject',
    className: 'red'
  }
}

// 产品
export const productOption = [
  { key: 'product_name', label: 'MQuickRupee', value: 'QuickRupee' },
  { key: 'product_name', label: 'GotoCash', value: 'GotoCash' }
]

export let imgPath = '/'
if (process.env.NODE_ENV === 'development') {
  imgPath = 'http://172.16.0.40:32004/'
}

export interface BtnItem {
  text: string
  key: string
  type: 'default' | 'primary' | 'black' | 'blue'
  className?: string
  authorityId?: string
  noShow?: boolean
  id?: string
}

// 订单类型: 新客户,复贷客户,多次申请, 返回数据和展示数据差距太大,映射比较合适
export const order_type = {
  NewApplicationOrder: 'New Client',
  RepeatApplicationOrder: 'Multiple Application',
  QualityApplicationOrder: 'Repeat Client 01',
  QualityApplicationOrderClassB: 'Repeat Client 02',
  QualityApplicationOrderClassC: 'Repeat Client 03'
}
