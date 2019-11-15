import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { RoleListCheckBoxItem } from 'interface/user'
import styles from './index.module.scss'

interface Props extends RouteComponentProps {
  roleList: RoleListCheckBoxItem[] // 所有角色
  value?: number[] // 选中的角色
  disabled?: boolean // 禁用
  onchange: (selectedRole: CheckboxValueType[]) => void
}

export class UserRoles extends Component<Props> {
  render() {
    const { roleList, value, disabled } = this.props
    return (
      <div className={styles.wrap}>
        <span className={styles.title}>roles:</span>
        <div className={styles.content}>
          <Checkbox.Group style={{ width: '100%' }} value={value} disabled={disabled} onChange={this.onChange}>
            {roleList!.map((el, index) => {
              return (
                <div className={styles.item} key={index}>
                  <Checkbox value={el.value}>{el.label}</Checkbox>
                </div>
              )
            })}
          </Checkbox.Group>
        </div>
      </div>
    )
  }

  onChange = (checkedValues: CheckboxValueType[]) => {
    this.props.onchange(checkedValues)
  }
}

export default UserRoles
