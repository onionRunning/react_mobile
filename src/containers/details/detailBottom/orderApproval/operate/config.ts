// import * as method from 'global/method'

// export const radioConfig = ['Approved', 'Rejected', 'Return', 'Loan cancellation']
export const radioConfig = ['Approved', 'Rejected']

export enum radioType {
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

// // 审批操作选择个数限制
// export const limitApprove: any = {
//   Rejected: {
//     min: 1
//   },
//   Return: {
//     min: 1
//   },
//   'Loan cancellation': {
//     min: 1
//   }
// }

// // 返回一个全新数组 && antd select有点坑需要转换
// export const finallyArr = (nowArr: any[], config: any[]) => {
//   var allArr = method.isEmpty(config) ? [] : JSON.parse(JSON.stringify(config))
//   var _nowArr: any[] = method.isEmpty(nowArr) ? [] : JSON.parse(JSON.stringify(nowArr))
//   let newArr = []
//   newArr = _nowArr.map(nowItem => {
//     for (let i = 0, len = allArr.length; i < len; i++) {
//       if (nowItem === allArr[i].reason_code) return allArr[i]
//     }
//     return null
//   })

//   return newArr
// }

// export const RightBack: any = {
//   Approved: 'AuditingPassed',
//   Rejected: 'AuditingReject',
//   Return: 'AuditingReturn',
//   'Loan cancellation': 'ApplicationCanceled'
// }
