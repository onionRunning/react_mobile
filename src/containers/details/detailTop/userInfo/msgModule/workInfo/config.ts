import { ObjType } from 'global/interface'
import { isValidObj } from 'global/method'

export const getCompanyAddress = (work: ObjType) => {
  if (!isValidObj(work)) return ''
  return work.company_address + ' ' + work.company_detail_address
}

// 工作信息
export const WorkInfoInput = [
  {
    title: 'Occupation', // 职业
    // widthStyle: 'small',
    stateName: 'career'
  },
  {
    title: 'Company name', // 公司名称
    // widthStyle: 'large',
    stateName: 'company'
  },
  {
    title: 'Company phone number', // 公司电话
    valueType: 'phone',
    // widthStyle: 'large',
    stateName: 'tel_in_company'
  },
  {
    title: 'Company address', // 公司地址
    // widthStyle: 'large',
    stateName: 'address_in_company',
    func: getCompanyAddress
  },
  {
    title: 'Education level', // 教育水平
    // widthStyle: 'mid-large',
    stateName: 'education_level'
  },
  {
    title: 'Years in current company', // 工作年限
    // widthStyle: 'mid-large',
    stateName: 'years_in_company'
  },
  {
    title: 'Salary', // 薪资
    // widthStyle: 'mid-large',
    stateName: 'salary'
  }
]
