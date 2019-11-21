import errs from 'global/errors'
import { limitApprove } from './const'

/**
 * 从外面把limit传进去，是为了降低函数的耦合性
 * @param {*} limit 限制值
 * @param {*} type 检查类型（限制对象中的具体某个类型）
 * @param {*} len 限制长度
 */
export const limitChooseNumber = (limit: any, type: string, len: number) => {
  if ((limit[type].min && len < limit[type].min) || (limit[type].max && len > limit[type].max)) {
    return true
  }
  return false
}

// 校验操作
export const vertify = (state: any) => {
  const { application_status, reasons } = state
  if (application_status === '') {
    return {
      flag: true,
      hintText: errs.ORDER_APPROVE_EMPTY
    }
  }
  if (application_status !== 'Approved' && limitChooseNumber(limitApprove, application_status, reasons.length)) {
    return {
      flag: true,
      hintText: errs.ORDER_APPROVE_RETURN_TYPE
    }
  }
  return { flag: false }
}

export const getFinConfig = (all: any, status: string) => {
  const { reject_reason = [], return_reason = [], cancel_reason = [] } = all
  return status === 'Rejected'
    ? reject_reason
    : status === 'Return'
    ? return_reason
    : status === 'Loan cancellation'
    ? cancel_reason
    : []
}
