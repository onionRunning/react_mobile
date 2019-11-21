import React, { Component } from 'react'
import { noop } from 'lodash'
import moment, { Moment } from 'moment'
import { DatePicker } from 'antd'

import styles from './index.module.scss'

interface Props {
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
  allowClear?: boolean
  className?: string
  size?: 'large' | 'small' | 'default' | undefined
  style?: React.CSSProperties
  formatDate?: string
  disabledDate?: (current: Moment | undefined) => boolean
  onChange: (date: Moment) => void
  id?: string
}

interface State {
  focused: boolean
}

class DatePickerDemo extends Component<Props, State> {
  static defaultProps = {
    placeholder: 'time',
    format: 'YYYY-MM-DD',
    disabledDate: '', // 禁选日期,eg: "2018-11-20", 即2018-11-20日之前的日期都不能选择
    afterDisableDate: '', // 禁选日期,eg: "2018-11-30", 即2018-11-30日之后的日期都不能选择
    disabled: false, // 禁用选择器, 默认不禁用
    defaultValue: '', // 默认显示日期
    onChange: noop, // 处理更改时间
    allowClear: true,
    size: 'default'
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      focused: false
    }
  }
  render() {
    const {
      placeholder,
      disabled,
      defaultValue,
      formatDate,
      allowClear,
      className = '',
      size,
      style = {},
      // disabledDate,
      id
    } = this.props
    return (
      <div className={styles.wrapper} id={id}>
        <DatePicker
          size={size}
          style={style}
          className={`date-choose ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue ? moment(defaultValue, formatDate) : undefined}
          // disabledDate={disabledDate}   // 暂且先注释掉,放开最时间筛选的限制
          onChange={this.onChange as any}
          allowClear={allowClear}
        />
      </div>
    )
  }
  // 处理选择变化值
  onChange = (value: Moment) => {
    this.props.onChange(value)
  }
}

export default DatePickerDemo
