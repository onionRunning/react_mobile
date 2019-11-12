import React, { Component } from 'react'
import { noop } from 'lodash'
import { TreeSelect } from 'antd'
import { TreeNode } from 'antd/lib/tree-select'
import styles from './index.module.scss'

type TreeValue = string | number | any[]

interface Props {
  list: TreeNode[]
  keyWord: string
  onChange: (selected: { key: string; value: any }) => void
  placeholder?: string
  className?: string
  defaultValue?: TreeValue
}

interface State {
  value?: TreeValue
}

class TreeSelectDemo extends Component<Props, State> {
  static defaultProps = {
    placeholder: 'please choose',
    noResultsText: 'no result',
    defaultValue: null, // 默认选中值
    list: [],
    onChange: noop
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.defaultValue || undefined
    }
  }

  render() {
    const { value } = this.state
    const { placeholder, list, className = '' } = this.props
    return (
      <div className={styles.wrap}>
        <TreeSelect
          className={`${className}`}
          placeholder={placeholder}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={list}
          treeDefaultExpandAll
          onChange={this.onChange}
          allowClear
          style={{ width: 160 }}
        />
      </div>
    )
  }

  onChange = (value: any) => {
    this.setState({ value })
    let selectOption = value ? { key: this.props.keyWord, value: value } : { key: this.props.keyWord, value: '' }
    this.props.onChange(selectOption)
  }
}

export default TreeSelectDemo
