import React, { Component } from 'react'
import { noop } from 'lodash'
import Select from 'react-select'
import { ValueType } from 'react-select/lib/types'
import './select.scss'

export interface ListItem {
  id?: number
  label: string
  value: string
}

interface Props {
  defaultValue?: ValueType<ListItem>
  className?: string
  required?: boolean
  placeholder?: string
  flag?: number
  list: ListItem[]
  noResultsText: string
  onChange: (...args: any[]) => void
  keyWord: string
  id?: string
}

interface State {
  value: ValueType<ListItem> | null
}

class SelectDemo extends Component<Props, State> {
  static defaultProps = {
    placeholder: 'Please choose',
    noResultsText: 'no result',
    keyWord: '', // 用于请求数据的字段
    defaultValue: null, // 默认选中值
    required: false,
    menuBuffer: 0,
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
  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.defaultValue || null
    }
  }

  componentDidUpdate(preProps: Props) {
    if (this.props.flag !== preProps.flag) {
      this.setState({ value: null })
    }
    // 设置默认值
    if (this.props.defaultValue !== preProps.defaultValue) {
      this.setState({
        value: this.props.defaultValue
      })
    }
  }

  render() {
    const { value } = this.state
    const { noResultsText, list, placeholder, required, className = '', id } = this.props
    return (
      <div className="select-wrapper" id={id}>
        <Select
          placeholder={placeholder}
          searchable={true}
          isClearable={true}
          options={list || []}
          value={value}
          className={`${className}`}
          noResultsText={noResultsText}
          onChange={this.handleChange}
          required={required}
          styles={{
            control: (styles, state) => {
              if (state.isFocused) {
                return {
                  ...styles,
                  borderColor: 'rgba(250, 153, 48)',
                  boxShadow: '0 0 0 1px rgba(250, 153, 48, 0.1)',
                  ':hover': {
                    borderColor: 'rgba(250, 153, 48)',
                    boxShadow: '0 0 0 1px rgba(250, 153, 48, 0.1)'
                  }
                }
              }
              return {
                ...styles
              }
            }
          }}
        />
      </div>
    )
  }
  // 选择内容
  handleChange = (value: ValueType<ListItem>) => {
    // 如果必须选择一个,将传入的默认值填入
    if (this.props.required) {
      let selectOption = value
        ? { ...{ key: this.props.keyWord }, ...value }
        : { ...{ key: this.props.keyWord }, ...this.props.defaultValue }
      this.setState({ value: value || this.props.defaultValue })
      this.props.onChange(selectOption)
      return
    }

    let selectOption = value ? { ...{ key: this.props.keyWord }, ...value } : { key: this.props.keyWord, value: '' }
    this.setState({ value })
    this.props.onChange(selectOption)
  }
}

export default SelectDemo
