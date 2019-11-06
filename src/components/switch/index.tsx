import React, { Component } from 'react'
import { noop } from 'lodash'
import { Switch } from 'antd'
import './index.scss'

interface Props {
  label?: string
  checked?: boolean
  checkedChildren?: React.ReactNode
  unCheckedChildren?: React.ReactNode
  onChangeSwitch?: (checked: boolean, event: MouseEvent) => any
  id?: string
}

class SwitchDemo extends Component<Props> {
  static defaultProps = {
    checked: false, // 默认按钮关闭
    checkedChildren: 'on', // 打开文字
    unCheckedChildren: 'off', // 关闭文字
    label: '', // 关键字
    onChangeSwitch: noop // 处理开关按钮
  }
  render() {
    const { label, checked, checkedChildren, unCheckedChildren, onChangeSwitch, id } = this.props
    return (
      <div className="filter-item filter-switch-item">
        <label className="filter-switch-label">
          {label}
          {!label ? '' : ':'}
        </label>
        <div id={id} className="switch-wrap">
          <Switch
            defaultChecked
            checkedChildren={checkedChildren}
            unCheckedChildren={unCheckedChildren}
            checked={checked}
            onChange={onChangeSwitch}
          />
        </div>
      </div>
    )
  }
}

export default SwitchDemo
