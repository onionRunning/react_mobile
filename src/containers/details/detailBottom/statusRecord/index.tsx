import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import Table from 'components/table'
import DetailsStore from 'stores/details'
import CommonStore from 'stores/common'
import { MixProps } from 'global/interface'
import { getTableTitle, Reason } from './config'
import * as response from 'api/response'

interface Props extends MixProps {
  details: DetailsStore
  common: CommonStore
}

@inject('details', 'common')
@observer
export class StatusRecord extends Component<Props> {
  componentDidMount() {
    this.handleLoading()
  }

  render() {
    const { statusRecordList } = this.props.details
    getTableTitle[getTableTitle.length - 1].render = this.renderRemake
    return <Table tableTitle={getTableTitle} tableData={statusRecordList} size="small" />
  }

  renderRemake = (record: response.StatusRecordList) => {
    const reasons: Reason[] = record.reasons ? JSON.parse(record.reasons) : []
    if (reasons.length) {
      return (
        <div>
          <span>{record.remark}</span>
          {reasons.map((item, index) => {
            return <span key={index}>{item.reason_value}</span>
          })}
        </div>
      )
    } else {
      return <span>{record.remark}</span>
    }
  }

  handleLoading = () => {
    this.props.common.composeLoading(this.getStatusRecord)
  }

  // 获取状态记录
  getStatusRecord = async () => {
    const { order_no } = this.props.location.state
    await this.props.details.getStatusRecord({
      order_no
    })
  }
}

export default InfoWrapper('Status record')(StatusRecord)
