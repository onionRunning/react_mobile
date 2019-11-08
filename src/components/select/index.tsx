import React, { Component } from 'react'
import { noop } from 'lodash'
import styles from './index.module.scss'

import { Select } from 'antd'
const { Option } = Select

export interface ListItem {
  id?: number
  label: string
  value: string
}

export interface SelectOption {
  key: string
  value: string
}

interface Props {
  id?: string
  keyWord: string
  list: ListItem[]
  allowClear?: boolean
  disabled?: boolean
  defaultValue?: string
  placeholder?: string
  notFoundContent?: string
  value?: string
  onChange: (value: SelectOption) => void
  size?: 'small' | 'default' | 'large'
}

class SelectDemo extends Component<Props> {
  static defaultProps = {
    allowClear: true,
    disabled: false,
    defaultValue: null, // 默认选中值
    placeholder: 'Please choose',
    notFoundContent: 'no result',
    keyWord: '', // 用于请求数据的字段
    list: [
      {
        label: 'label1',
        value: 'value1'
      },
      {
        label: 'label2',
        value: 'value2'
      }
    ],
    onChange: noop
  }

  render() {
    const { id, list, allowClear, disabled, placeholder, notFoundContent, size } = this.props
    return (
      <div className={styles.wrapper} id={id}>
        <Select
          allowClear={allowClear}
          placeholder={placeholder}
          notFoundContent={notFoundContent}
          disabled={disabled}
          size={size}
          style={{ width: 160 }}
          onChange={this.handleChange}
        >
          {list.map((item, index) => {
            return (
              <Option key={index} value={item.label}>
                {item.label}
              </Option>
            )
          })}
        </Select>
      </div>
    )
  }
  // 选择内容
  handleChange = (value: string) => {
    let selectOption: SelectOption = { key: this.props.keyWord, value: value ? value : '' }
    this.props.onChange(selectOption)
  }
}

export default SelectDemo
