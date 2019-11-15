// import { isValidObj } from 'global/method'

// export interface ObjType {
//   [names: string]: string | number | boolean
// }

// // special function
// export const getFullName = (person: ObjType) => {
//   if (!isValidObj(person)) return ''
//   return person.first_name + ' ' + person.last_name
// }
// // 永久地址
// export const permanentAddress = (person: ObjType) => {
//   if (!isValidObj(person)) return ''
//   const { permanent_address, permanent_detail_address } = person
//   return permanent_address + ' ' + permanent_detail_address
// }

// // 当前地址
// export const currentAddress = (person: ObjType) => {
//   if (!isValidObj(person)) return ''
//   const { current_address, current_detail_address } = person
//   return current_address + ' ' + current_detail_address
// }

export const BasicInfoInput = [
  {
    title: 'Gender', // 性别
    stateName: 'sexual_distinction'
  },
  {
    title: 'Birthday', // 出生日期
    valueType: 'date',
    stateName: 'dob'
  },
  {
    title: 'Educational Background', // 教育程度
    stateName: 'educational_level'
  },
  {
    title: 'Marital Status', // 婚姻状况
    stateName: 'marital_status'
  },
  {
    title: 'Email address', // 邮箱
    stateName: 'email'
  },
  {
    title: 'Facebook Username',
    stateName: 'facebook_account'
  },
  {
    title: 'Email or phone number link to Facebook',
    stateName: 'facebook_phone_or_email'
  },
  {
    title: 'Purpose of loan', // 借款用途
    stateName: 'usage_of_loan'
  },
  {
    title: 'Personal residential address', // 个人住址
    type: 'textarea',
    stateName: 'personal_address'
  }
]
