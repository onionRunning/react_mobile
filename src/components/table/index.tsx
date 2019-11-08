import React, { Component } from 'react'
import { noop } from 'lodash'
import { ColumnProps, TableRowSelection, PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table'
import { Table } from 'antd'
import { defaultPagination, Pagination } from './config'
import noDataImg from './images/icon-no@2x.png'
import styles from './index.module.scss'

interface Props<T> {
  rowKey?: string | (() => string)
  tableData: T[]
  loading?: boolean
  onChange: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra: TableCurrentDataSource<T>
  ) => void
  scroll?: {
    x?: boolean | number | string
    y?: boolean | number | string
  }
  tableTitle?: ColumnProps<T>[]
  rowSelection?: TableRowSelection<T>
  pagination?: Pagination
}

class TableComponent<T> extends Component<Props<T>> {
  static defaultProps = {
    rowKey: 'id', // 表格行key的取值
    tableTitle: [], // 表格头部-显示的列
    tableData: [], // 表格数据显示的内容
    scroll: {}, //  滚动条, 默认不给滚动条
    rowSelection: null, // 行选择,默认没有行选择器
    pagination: false, // 默认不显示分页
    loading: false, // 显示加载中提示
    onChange: noop // 处理表格数据变化
  }
  shouldComponentUpdate(nextPrpos: Props<T>) {
    if (nextPrpos.tableData === null || nextPrpos.tableData === undefined) return false
    return true
  }
  render() {
    const { tableTitle, tableData, onChange, pagination, rowSelection, scroll, loading, rowKey } = this.props
    // 合并分页内容,设置默认参数 (分页的存在: 判断数据的长度)
    console.log('pagination', pagination)
    let _pagination = tableData.length > 0 && pagination ? { ...pagination, ...defaultPagination } : false
    return (
      <div className={styles.wrapper}>
        <Table
          scroll={scroll}
          columns={tableTitle}
          dataSource={tableData}
          rowSelection={rowSelection}
          loading={false}
          onChange={onChange}
          pagination={_pagination}
          bordered
          rowKey={rowKey}
        />
        {/* 没有数据提示 */}
        {!loading && !tableData.length && (
          <div className={styles.no_data}>
            <img src={noDataImg} alt="no data" />
            <p>No data</p>
          </div>
        )}
      </div>
    )
  }
}

export default TableComponent
