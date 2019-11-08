import React, { Component } from 'react'
import { noop } from 'lodash'
import { Pagination } from 'antd'

interface Props {
  totalCount: number
  current: number
  pageSizeOptions?: string[]
  onChange?: (...args: any[]) => void
  onShowSizeChange?: (...args: any[]) => void
}

class Paginator extends Component<Props> {
  static defaultProps = {
    totalCount: 0, // 数据总条数
    pageSizeOptions: ['10', '20', '30', '40', '50'], // 指定每页可以显示的条数
    onChange: noop, // 页码改变时的回调,参数是改变后的页码以及每页条数
    onShowSizeChange: noop // 每页展示条数变化回调,参数是当前页和修改后每页条数
  }
  render() {
    const { onShowSizeChange, pageSizeOptions, totalCount, onChange, current } = this.props
    return (
      <Pagination
        showSizeChanger
        showQuickJumper
        current={current}
        defaultCurrent={1}
        pageSizeOptions={pageSizeOptions}
        total={totalCount}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    )
  }
}

export default Paginator
