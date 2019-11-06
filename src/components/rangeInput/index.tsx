import React, { Component } from 'react'
import Input, { Msg } from 'components/input'
import { noop } from 'lodash'

export interface Item {
  key?: string
  label?: string
  range?: {
    maxLength?: number
    start: Msg
    end: Msg
  }
}

interface Props {
  item: Item
  onChange: (...args: any) => void
}

class RangeInput extends Component<Props> {
  static defaultProps = {
    item: {}, // 默认传入一个key值
    onChange: noop
  }
  render() {
    const { item, onChange } = this.props
    return (
      <div key={item.key} className="filter-item" id={item.key}>
        <label className="form-label-key">{item.label}</label>
        <Input maxLength={item.range!.maxLength} msg={item.range!.start} onChange={onChange} />
        <i className="range-line" />
        <Input maxLength={item.range!.maxLength} msg={item.range!.end} onChange={onChange} />
      </div>
    )
  }
}

export default RangeInput
