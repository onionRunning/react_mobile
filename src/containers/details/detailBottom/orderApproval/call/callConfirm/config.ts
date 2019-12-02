// export const callStatus = ['号码未接通', '号码已接通']
export const callStatus: any = ['Not connected', 'Connected']
export const callSuccess: any = [
  'Client confirms the loan application',
  'Client denied the loan application',
  'Customer inforation is normal',
  'Customer information abnormal'
]

export const callSuccessOfContact: any = [
  'Contacts do not know customers',
  'Contacts oppose customer loans',
  `Contact refuses to be the customer's loan contact`,
  'Contacts feedback that customers have other risks (drug-related gambling, no job, etc.)'
]
// A和B互斥，二者只能存在其一
export const mutex: any = {
  A: ['Contacts do not know customers'],
  B: [
    'Contacts oppose customer loans',
    `Contact refuses to be the customer's loan contact`,
    'Contacts feedback that customers have other risks (drug-related gambling, no job, etc.)'
  ]
}
export const callFail: any = [
  'No one heard',
  'The other party hangs up',
  'Shut down',
  'Out of service area',
  'Arrears',
  'Number not exsit'
]

export const handArr = (detail: any) => {
  return typeof detail === 'string'
    ? detail
    : detail
        .reduce((allitem: string, curtem: string) => {
          return allitem + ',' + curtem
        }, '')
        .substring(1)
}

export const getStatus = (status: string) => {
  return !status ? 'success' : 'fail'
}

export const InitParams = (props: any, state: any) => {
  return {
    call_id: props.call_id,
    reason: handArr(state.detail),
    remark: state.remark,
    call_status: getStatus(state.light)
  }
}

// 检测客户本人互斥可选项
export const justify = (detail: any[], same: string, back: string) => {
  return (
    detail &&
    detail
      .map(item => {
        console.log(item.includes(same), 'item')
        return item.includes(same) || item.includes(back) ? item : null
      })
      .filter(item => item).length === 2
  )
}

// detail值是否可以在arr中找到
export const exsitArr = (detail: any[], arr: any[]) => {
  if (!detail || !arr) return null
  let flag = false
  detail.map(item => {
    if (arr.indexOf(item) > -1) flag = true
    return item
  })
  return flag
}

// 检测联系人互斥可选项
export const justifyArr = (detail: any[], arrA: any, arrB: any) => {
  if (!detail) return false
  let exsitA = exsitArr(detail, arrA)
  let exsitB = exsitArr(detail, arrB)
  return exsitA && exsitB
}

export const vertify = (info: any, state: any) => {
  // 选择内容不能为空
  if (state.status === '' || state.status.length === 0) {
    info('Please select result')
    return true
  }
  // 选择answered , description 为必填
  if ((state.selectValue.value === '' || state.selectValue.value === '0') && state.status === 'Answered') {
    info('Please enter descrition')
    return true
  }
}

// 状态列表  4.7.2
export const statusList = [
  'Active No.',
  'Incorrect  No.',
  'Busy Tone',
  'Hung Up',
  'Auto Reject',
  'Call Divert',
  'Power Off',
  'Unattended',
  'NPV',
  'Answered'
]
export const selfAnswer = [
  {
    label: 'Client answered',
    value: 'Client answered'
  },
  {
    label: 'Non client answered',
    value: 'Non client answered'
  },
  {
    label: 'Client canceled loan',
    value: 'Client canceled loan'
  },
  {
    label: 'Client was verified',
    value: 'Client was verified'
  },
  {
    label: 'Client was not verified',
    value: 'Client was not verified'
  },
  {
    label: 'Client refuse to undergo verification',
    value: 'Client refuse to undergo verification'
  },
  {
    label: 'Client has another phone NO.',
    value: 'Client has another phone NO.'
  }
]

export const contactAnswer = [
  {
    label: 'Reference answered',
    value: 'Reference answered'
  },
  {
    label: 'Non reference answered',
    value: 'Non reference answered'
  },
  {
    label: 'Reference does not know the client',
    value: 'Reference does not know the client'
  },
  {
    label: 'Reference opposed client’s loan',
    value: 'Reference opposed client’s loan'
  },
  {
    label: 'Reference refused to be the client’s reference',
    value: 'Reference refused to be the client’s reference'
  },
  {
    label: 'Reference feedbacks that the client has other risks',
    value: 'Reference feedbacks that the client has other risks'
  },
  {
    label: 'Reference and client has the same phone NO.',
    value: 'Reference and client has the same phone NO.'
  },
  {
    label: 'Reference and client has a similar voice',
    value: 'Reference and client has a similar voice'
  },
  {
    label: 'Reference and client information is inconsistent',
    value: 'Reference and client information is inconsistent'
  },
  {
    label: 'Reference and client relationship is inconsistent',
    value: 'Reference and client relationship is inconsistent'
  }
]
