import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import DetailsStore from 'stores/details'
import { MixProps } from 'global/interface'
import { StatusRecordColumns } from './config'

interface Props extends MixProps {
  details: DetailsStore
}

@inject('details')
@observer
export class StatusRecord extends Component<Props> {
  componentDidMount() {
    this.getStatusRecord()
  }

  render() {
    const { statusRecordList } = this.props.details
    return <Table tableTitle={StatusRecordColumns} tableData={statusRecordList} size="small" />
  }

  // 获取状态记录
  getStatusRecord = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.details.getStatusRecord(
      {
        order_no
      },
      viewType
    )
  }
}

export default InfoWrapper('Status record')(StatusRecord)
