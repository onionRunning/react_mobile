import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import StatusRecordStores from 'stores/details/statusRecord'
import { MixProps } from 'global/interface'
import { StatusRecordColumns } from './config'

interface Props extends MixProps {
  statusRecord: StatusRecordStores
}

@inject('statusRecord')
@observer
export class StatusRecord extends Component<Props> {
  componentDidMount() {
    this.getStatusRecord()
  }

  render() {
    const { statusRecord } = this.props.statusRecord
    return (
      <div style={{ marginTop: '6px' }}>
        <Table tableTitle={StatusRecordColumns} tableData={statusRecord} size="small" />
      </div>
    )
  }

  getStatusRecord = async () => {
    const { order_no, viewType } = this.props.location.state
    await this.props.statusRecord.getStatusRecord(
      {
        order_no
      },
      viewType
    )
  }
}

export default InfoWrapper('Status record')(StatusRecord)
