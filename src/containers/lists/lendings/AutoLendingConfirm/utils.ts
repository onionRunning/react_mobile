import { showSwitch, switchLabels, switchStatus } from './config'
import { _isArray } from 'global/method'
import { SwitchInterface } from './config'

export const turnToSwitchMsg = (msg: SwitchInterface[]) => {
  if (!_isArray(msg)) return []
  let arr = JSON.parse(JSON.stringify(msg))
  let tmp: SwitchInterface[] = []
  arr.forEach((element: SwitchInterface) => {
    showSwitch.filter(item => {
      if (element.name === item) {
        element.label = switchLabels[item as keyof typeof switchLabels]
        element.checked = element.value === switchStatus.on ? true : false
        tmp.push(element)
      }
      return item
    })
  })
  return tmp
}
