import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import DetailsStore from 'stores/details'
import CommonStore from 'stores/common'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import { transformSort } from 'global/method'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { LoanInfoColumns } from './config'
import { MixProps } from 'global/interface'
import { LoanInfoReq, LoanInfoList } from 'interface/details/loanInfo'

interface Props extends MixProps {
  details: DetailsStore
  common: CommonStore
}

interface State {
  request: LoanInfoReq
}

@inject('details', 'common')
@observer
export class LoanInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        order_no: '',
        sort_order: '',
        sort_value: ''
      }
    }
  }

  componentDidMount() {
    this.handleLoading()
  }

  render() {
    const { loanInfoList } = this.props.details
    return (
      <Table tableTitle={LoanInfoColumns} tableData={loanInfoList} onChange={this.handleTableChange} size="small" />
    )
  }

  handleLoading = () => {
    this.props.common.composeLoading(this.getLoanInfo)
  }

  // 获取放款信息
  getLoanInfo = async () => {
    const { order_no } = this.props.location.state
    await this.props.details.getLoanInfoList({
      ...this.state.request,
      order_no
    })
  }

  // 排序
  handleTableChange = (
    _pagination: PaginationConfig,
    _filters: Record<keyof LoanInfoList, string[]>,
    sorter: SorterResult<LoanInfoList>
  ) => {
    const { columnKey, order } = sorter
    this.setState(
      {
        request: {
          ...this.state.request,
          sort_value: columnKey,
          sort_order: transformSort(order)
        }
      },
      this.getLoanInfo
    )
  }
}

export default InfoWrapper('Loan')(LoanInfo)
