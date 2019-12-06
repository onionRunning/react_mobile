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
    // await this.props.details.getRepaymentFlow(
    //   {
    //     order_no
    //   }
    // )
  }

  render() {
    const arr = [
      {
        extend_period: 1,
        due_date: '2019-12-04T17:39:24+08:00',
        actual_paid_off_date: '2019-12-04T17:39:24+08:00',
        overdue_days: 2,
        fee: {
          principal_fee: 3000,
          actual_principal_fee: 3000,
          interests_fee: 50,
          actual_interests_fee: 50,
          manage_fee: 120,
          actual_manage_fee: 120,
          extend_fee: 240,
          actual_extend_fee: 240,
          overdue_late_fee: 560, // 逾期滞纳金
          actual_overdue_late_fee: 560,
          overdue_interests_fee: 150, // 逾期罚息
          actual_overdue_interests_fee: 150,
          reduce_fee: 100,
          repay_amount: 4020,
          actual_repay_amount: 4020
        }
      }
    ]
    return <CustomTable columns={tableConfig} dataSource={arr} expandedRowRender={this.expandedRowRender} />
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
