import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import DetailsStore from 'stores/details'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { LoanInfoColumns } from './config'
import { MixProps } from 'global/interface'
import * as params from 'api/params'
import * as response from 'api/response'

interface Props extends MixProps {
  details: DetailsStore
}

interface State {
  request: params.LoanInfoReq
}

type TableSortType = 'ascend' | 'descend' | ''

@inject('details')
@observer
export class LoanInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        PermissionId: '',
        order_no: '',
        sort_order: '',
        sort_value: ''
      }
    }
  }

  componentDidMount() {
    this.getLoanInfo()
  }

  render() {
    const { loanInfoList } = this.props.details
    return (
      <Table tableTitle={LoanInfoColumns} tableData={loanInfoList} onChange={this.handleTableChange} size="small" />
    )
  }

  // 获取放款信息
  getLoanInfo = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.details.getLoanInfoList(
      {
        ...this.state.request,
        order_no
      },
      viewType
    )
  }

  // 排序
  handleTableChange = (
    _pagination: PaginationConfig,
    _filters: Record<keyof response.LoanInfoList, string[]>,
    sorter: SorterResult<response.LoanInfoList>
  ) => {
    const { columnKey, order } = sorter
    this.setState(
      {
        request: {
          ...this.state.request,
          sort_value: columnKey,
          sort_order: this.transformSort(order)
        }
      },
      this.getLoanInfo
    )
  }

  // 转换排序字段
  transformSort = (order: TableSortType) => {
    switch (order) {
      case 'descend':
        return 'desc'
      case 'ascend':
        return 'asc'
      default:
        return ''
    }
  }
}

export default InfoWrapper('Loan')(LoanInfo)
