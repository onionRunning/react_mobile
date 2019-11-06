// 列表筛选专用日期范围选择框
import React, { Component } from 'react'
import { noop } from 'lodash'
import DatePicker from 'components/datePicker'
import './index.scss'
import moment, { Moment } from 'moment'
import { timeStampBeauty } from 'global/method'

interface RangeItem {
  placeholder?: string
  key: string
  id?: string
}

interface Item {
  label?: string
  range?: {
    start: RangeItem
    end: RangeItem
  }
  key?: string
  className?: string
}

interface Props {
  item: Item
  onChange: (...args: any[]) => void
  defaultValue?: string
  disabled?: boolean
  disabledDate?: boolean
}

interface State {
  startVal: Moment
  endVal: Moment
}

class RangeDatePicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      startVal: moment().endOf('day'), //开始日期
      endVal: moment().add(30, 'days') //结束日期
    }
  }
  static defaultProps = {
    item: {
      label: '', // 显示关键词
      range: {
        // 时间范围配置参数
        start: {},
        end: {}
      }
    },
    disabledDate: false, // 是否禁用日期区间
    disabled: false, // 禁用选择器, 默认不禁用
    defaultValue: '', // 默认显示日期
    onChange: noop // 时间修改
  }
  render() {
    const { item, defaultValue, disabled } = this.props
    return (
      <div className={`filter-item ${item.className}`}>
        {item.label && <label className="form-label-key">{item.label}</label>}
        <DatePicker
          disabledDate={this.disableStart}
          placeholder={item.range!.start.placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={this.onChangeTime(item.range!.start, 'start')}
          id={item.range!.start.id}
        />
        <i className="range-line" />
        <DatePicker
          disabledDate={this.disableEnd}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder={item.range!.end.placeholder}
          onChange={this.onChangeTime(item.range!.end, 'end')}
          id={item.range!.end.id}
        />
      </div>
    )
  }

  // 处理选中时间
  onChangeTime = (item: RangeItem, type: string) => (value: Moment) => {
    let time = value ? timeStampBeauty(value.valueOf()) : ''
    this.props.onChange({ key: item.key, value: time })
    switch (type) {
      case 'start':
        this.setState({
          startVal: value ? value.endOf('day') : moment().endOf('day')
        })
        break
      case 'end':
        this.setState({
          endVal: value ? value : moment().add(30, 'days')
        })
        break
      default:
        break
    }
  }
  //开始时间的禁用函数 , 可选同一天
  disableStart = (startDay?: Moment) => {
    const { endVal } = this.state
    const { disabledDate, item } = this.props
    if (moment(startDay).format('YYYY-MM-DD') === moment(endVal).format('YYYY-MM-DD')) {
      return false
    }
    if (item.key === 'due_date') {
      return moment(startDay).isAfter(endVal)
    }
    if (!disabledDate) return false
    return moment(startDay).isAfter(moment().endOf('day')) || moment(startDay).isAfter(endVal)
  }

  //结束日期的禁用函数
  disableEnd = (endDay?: Moment) => {
    const { startVal } = this.state
    const { disabledDate, item } = this.props
    if (item.key === 'due_date') {
      return moment(endDay).isBefore(moment(startVal).startOf('day'))
    }
    if (!disabledDate) return false
    return (
      moment(endDay).isBefore(moment(startVal).startOf('day')) ||
      moment(endDay).isAfter(moment(startVal).add(30, 'days')) ||
      moment(endDay).isAfter(moment().endOf('day'))
    )
  }
}

export default RangeDatePicker
