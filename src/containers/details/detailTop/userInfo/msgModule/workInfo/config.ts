import { ObjType } from 'global/interface'
import { isValidObj } from 'global/method'

export const getCompanyAddress = (work: ObjType) => {
  if (!isValidObj(work)) return ''
  return work.user_company_address + ' ' + work.user_company_detailed_address
}

// 工作信息
export const WorkInfoInput = [
  {
    title: 'Occupation', // 职业
    stateName: 'user_career'
  },
  {
    title: 'Company name', // 公司名称
    stateName: 'user_company'
  },
  {
    title: 'Company phone number', // 公司电话
    valueType: 'phone',
    stateName: 'user_tel_in_company'
  },
  {
    title: 'Company address', // 公司地址
    stateName: 'address_in_company',
    func: getCompanyAddress
  },
  {
    title: 'Education level', // 教育水平
    stateName: 'user_educational_level'
  },
  {
    title: 'Years in current company', // 工作年限
    stateName: 'user_years_in_company'
  },
  {
    title: 'Salary', // 薪资
    stateName: 'user_salary'
  }
]
