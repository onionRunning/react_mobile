import moment from 'moment'
import { isNumber } from 'util'

//校验贷款金额
export const vertifyRangeAmount = (start?: number, end?: number): string | undefined => {
  if (isNumber(start) && start < 0) return 'please input the correct start of Loan Amount'
  if (isNumber(end) && end < 0) return 'please input the correct end of Loan Amount'
  if (isNumber(start) && !isNumber(end)) return 'please input the end of Loan Amount'
  if (isNumber(end) && !isNumber(start)) return 'please input the start of Loan Amount'
  if (isNumber(start) && isNumber(end) && start >= end) return "the start shouldn't be more the end in Loan Amount"
}
//校验时间段
export const vertifyTime = (start: string, end: string, name: string): false | string => {
  if (moment(start).isAfter(moment(), 'day')) return `start of ${name} can't be more than today `
  if (!start && end) return `please choose start of ${name}`
  if (start && !end) return `please choose end of ${name}`
  const maxDay = 30
  if (
    moment(end)
      .subtract(maxDay, 'days')
      .isAfter(start)
  ) {
    return `Number of days between start and end in ${name} can't be more than ${maxDay}`
  }

  return false
}
//校验还款时间段
export const vertifyAmountTime = (start: string, end: string, name: string): false | string => {
  if (!start && end) return `please choose start of ${name}`
  if (start && !end) return `please choose end of ${name}`
  if (moment(start).isAfter(moment(end), 'day')) return `start of ${name} can't be more than the end `
  const maxDay = 30
  if (
    name !== 'Due date' &&
    moment(end)
      .add(-maxDay, 'd')
      .isAfter(moment(start))
  )
    return `Number of days between start and end in ${name}  can't be more than ${maxDay}`
  return false
}

//检查是否显示线下还款按钮
// export const showOfflineRepay = (status: string) => {
//   return status === 'RsProcessing' || status === 'RsOverdue'
// }
