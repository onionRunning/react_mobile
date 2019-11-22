// 客户信息中的订单信息
export const OrderInfoInput = [
  {
    title: 'Loan ID',
    stateName: 'order_no' //订单号
  },
  {
    title: 'Order type',
    stateName: 'order_type' //订单类型
  },
  {
    title: 'Application time',
    stateName: 'created_at' // 申请时间
  },
  {
    title: 'Reviewer',
    stateName: 'operator_name' // 审批人
  },
  {
    title: 'Results of review', // 审批结果
    stateName: 'application_status'
  },
  {
    title: 'Review time',
    stateName: 'auto_audited_time' //审批时间
  },
  {
    title: 'Loan amount',
    stateName: 'apply_principal' //贷款数额
  },
  {
    title: 'Loan days', //贷款天数
    stateName: 'loan_days'
  }
]

// 分数
export const scoreConfig = [
  {
    title: 'Customer risk score',
    stateName: 'score'
  },
  {
    title: 'Customer label',
    stateName: 'label',
    userType: 'label'
  }
]

export const PipelineConfig = [
  {
    title: 'Pipeline',
    stateName: 'pipeline_id'
  }
]
