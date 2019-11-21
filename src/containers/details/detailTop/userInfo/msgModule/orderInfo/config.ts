// 客户信息中的订单信息
export const OrderInfoInput = [
  {
    title: 'Loan ID',
    stateName: 'order_no'
  },
  {
    title: 'Order type',
    stateName: 'order_type'
  },
  {
    title: 'Application time',
    stateName: 'created_at'
  },
  {
    title: 'Reviewer',
    stateName: 'operator_name'
  },
  {
    title: 'Results of review',
    stateName: 'application_status'
  },
  {
    title: 'Review time',
    stateName: 'auto_audited_time'
  },
  {
    title: 'Loan amount',
    stateName: 'apply_principal'
  },
  {
    title: 'Loan days',
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
