import { showSwitch, switchLabels, switchStatus } from './config'
import { _isArray } from 'global/method'
import { SwitchInterface } from './config'

export const turnToSwitchMsg = (msg: SwitchInterface[]) => {
  if (!_isArray(msg)) return []
  const arr = JSON.parse(JSON.stringify(msg))
  const tmp: SwitchInterface[] = []
  arr.forEach((element: SwitchInterface) => {
    showSwitch.filter(item => {
      if (element.name === item) {
        element.label = switchLabels[item as keyof typeof switchLabels]
        element.checked = element.value === switchStatus.on ? true : false
        // element.label = element.product_name
        // element.checked = element.current_status === switchStatus.on ? true : false
        // element.value = element.current_status
        tmp.push(element)
      }
      return item
    })
  })
  return tmp
}
