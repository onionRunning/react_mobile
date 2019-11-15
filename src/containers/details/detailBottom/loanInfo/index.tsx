import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoanInfoStore from 'stores/details/loanInfo'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import { LoanInfoColumns } from './config'
import { LoanInfoReq, LoanInfoRes, LoanInfoList } from 'interface/details/loanInfo'
import { MixProps } from 'global/interface'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

interface Props extends MixProps {
  loanInfo: LoanInfoStore
}

interface State {
  request: LoanInfoReq
  loanInfoList: LoanInfoList[]
}

type TableSortType = 'ascend' | 'descend' | ''

@inject('loanInfo')
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
      },
      loanInfoList: []
    }
  }

  componentDidMount() {
    this.getLoanInfo()
  }

  render() {
    const { loanInfoList } = this.state
    return (
      <div style={{ marginTop: '6px' }}>
        <Table tableTitle={LoanInfoColumns} tableData={loanInfoList} onChange={this.handleTableChange} size="small" />
      </div>
    )
  }

  getLoanInfo = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.loanInfo.getLoanInfoList(
      {
        ...this.state.request,
        order_no
      },
      viewType,
      this.handleLoanInfo
    )
  }

  handleLoanInfo = (LoanInfo: LoanInfoRes[]) => {
    console.log(LoanInfo)
    const loanInfoList: LoanInfoList[] = LoanInfo.map((el: LoanInfoRes, index: number) => {
      return {
        id: index,
        created_at: el.flow.created_at,
        actual_loan_time: el.flow.created_at,
        actual_loan_amount: el.loan.actual_loan_amount,
        transfer_fee: el.loan.transfer_fee,
        loan_days: el.loan.loan_days,
        loan_status: el.loan.loan_status,
        loan_flow_status: el.flow.loan_flow_status,
        request_no: el.flow.request_no,
        out_flow_num: el.flow.out_flow_num,
        err_msg: el.flow.err_msg
      }
    })
    this.setState({
      loanInfoList: [...loanInfoList]
    })
  }

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
