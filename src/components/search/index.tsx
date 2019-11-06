import React, { Component } from 'react'
import { noop } from 'lodash'
import { Input } from 'antd'
import './index.scss'

interface Props {
  size?: 'small' | 'default' | 'large'
  placeholder?: string
  onSearch?: (...args: any[]) => any
  maxLength?: number
  onChange: (...args: any[]) => void
  id?: string
}

interface State {
  value: string
}

const Search = Input.Search

class SearchComponent extends Component<Props, State> {
  static defaultProps = {
    size: 'large', // 默认是大搜索框
    placeholder: 'Please enter search', // 默认设置的输入提示
    maxLength: null, // 搜索框默认输入长度限制
    onChange: noop, // 实时监听改变内容
    onSearch: noop // 开始搜索
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  render() {
    const { placeholder, onSearch, size, id } = this.props
    const { value } = this.state
    return (
      <Search
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onSearch={onSearch}
        id={id}
      />
    )
  }
  handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    const { maxLength } = this.props
    let value
    if (maxLength) {
      value = e.target.value.substr(0, maxLength).replace(/[\u4E00-\u9FA5]/g, '')
    } else {
      value = e.target.value.replace(/[\u4E00-\u9FA5]/g, '')
    }
    this.setState({
      value: value
    })
    this.props.onChange(value)
  }
}

export default SearchComponent
