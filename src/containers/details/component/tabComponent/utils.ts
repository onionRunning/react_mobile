import { typeReflect } from 'global/constants'
import { justfyString } from 'global/method'

const tabTop = {
  p0: 'User info',
  p1: 'Duplicate checking detection',
  p2: 'Address book',
  p3: 'Mobile device information'
}

const botTop = {
  p4: 'Approve operate',
  p5: 'Repayment',
  p6: 'Loan',
  p7: 'SMS record',
  p8: 'Status record'
}

// k <p1 - p9> todo:smile-.-
const handleK = (k: string): boolean => {
  return justfyString(k) && Number(k.replace('p', '')) < 20
}

export const choseTab = (r: any, maps: any) => {
  for (let k in r) {
    if (r[k] && handleK(k)) {
      return maps[k]
    }
  }
  return ''
}

// 默认选中tab项 从左往右
export const choseRedictTab = (level: string, detail_type: string, p: any) => {
  const temps = p[`${typeReflect[detail_type]}_reflect`]
  console.log(detail_type)
  const topT = { p0: temps.p0, p1: temps.p1, p2: temps.p2, p3: temps.p3 }
  const botT = { p4: temps.p4, p5: temps.p5, p6: temps.p6, p7: temps.p7, p8: temps.p8 }
  switch (true) {
    case level === 'top' && temps.p0:
      return 'User info'
    case level === 'bot' && temps.p4:
      return 'Approve operate'
    case level === 'top':
      return choseTab(topT, tabTop)
    case level === 'bot':
      return choseTab(botT, botTop)
    default:
      return ''
  }
}
