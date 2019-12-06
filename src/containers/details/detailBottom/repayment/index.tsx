import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import DetailsStore from 'stores/details'
import { MixProps } from 'global/interface'
import InfoWrapper from 'containers/details/component/infoWrapper'
import CustomTable from './customTable'
import Table from 'components/table'
import { tableConfig, RepaymentInfoColumns } from './config'

interface Props extends MixProps {
  details: DetailsStore
}

@inject('details')
@observer
export class RepaymentInfo extends Component<Props> {
  componentDidMount() {
    this.getRepaymentInfo()
  }

  getRepaymentInfo = async () => {
    const { order_no } = this.props.location.state
    await this.props.details.getRepaymentInfo({
      order_no
    })
  }

  render() {
    const { repaymentInfoList } = this.props.details
    return (
      <CustomTable columns={tableConfig} dataSource={repaymentInfoList} expandedRowRender={this.expandedRowRender} />
    )
  }

  expandedRowRender = () => {
    const { repaymentInfoFlowList } = this.props.details
    const tableDate = repaymentInfoFlowList.map(el => {
      return {
        ...el,
        repay_amount: el.fee.repay_amount,
        reduce_fee: el.fee.reduce_fee,
        actual_repay_amount: el.fee.actual_repay_amount
      }
    })
    return <Table tableTitle={RepaymentInfoColumns} tableData={tableDate} size="small" />
  }
}

export default InfoWrapper('Repayment information')(RepaymentInfo)
