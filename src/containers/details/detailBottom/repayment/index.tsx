import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import { observer, inject } from 'mobx-react'
import DetailsStore from 'stores/details'
import { MixProps } from 'global/interface'
import { tableConfig, RepaymentInfoColumns } from './config'
import Table from 'components/table'
import { notExtendPeriod } from './utils'
import './index.scss'
import noDataImg from 'assets/icon-no@2x.png'
import * as response from 'api/response'

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
    // const { repaymentInfoList, repaymentInfoFlowList } = this.props.details
    const { repaymentInfoList } = this.props.details
    return (
      <div>
        <RepaymentDetail detailData={repaymentInfoList} dataFlow={[]} {...this.props} />
      </div>
    )
  }
}

interface DetailProps extends Props {
  detailData: response.RepaymentInfoList[]
  dataFlow: response.RepaymentInfoFlowList[]
}
export class RepaymentDetail extends Component<DetailProps> {
  render() {
    const { detailData } = this.props
    if (!detailData || detailData.length === 0) {
      return (
        <div>
          <TableCom key={1} {...this.props} detailDataItem={[]} headTitle={'Repayment information'} />
        </div>
      )
    }
    //第一期始终是最上面，其他都是展期倒叙排列
    const currentDetailData = JSON.parse(JSON.stringify(detailData)).reverse()

    let lastIndex = -1
    currentDetailData.map((item: response.RepaymentInfoList, index: number) => {
      if (notExtendPeriod(item.extend_period)) {
        lastIndex = index
      }
      return item
    })
    const firstItem = currentDetailData[lastIndex]
    let extensionItems
    if (lastIndex > 0) {
      extensionItems = currentDetailData.slice(0, lastIndex)
    }
    const out = [
      firstItem && (
        <TableCom key={1} {...this.props} detailDataItem={[firstItem]} headTitle={'Repayment information'} />
      ),
      extensionItems && extensionItems.length > 0 && (
        <TableCom key={2} {...this.props} detailDataItem={extensionItems} headTitle={'Loan extension'} />
      )
    ]
    return <div>{out}</div>
  }
}

interface TableComProps extends DetailProps {
  key: number
  headTitle: string
  detailDataItem: response.RepaymentInfoList[]
}
//自定义table
@InfoWrapper()
export class TableCom extends Component<TableComProps> {
  render() {
    const { detailDataItem } = this.props
    return (
      <div className="repay-table">
        <ul className="head">
          {tableConfig.map((item, index) => {
            return (
              <li key={index} className={item.widthStyle}>
                {item.title}
              </li>
            )
          })}
        </ul>
        {detailDataItem && detailDataItem.length > 0 ? (
          detailDataItem.map((detailItem, index) => {
            return <TableItem key={index} detailItem={detailItem} {...this.props} />
          })
        ) : (
          <div className="table-no-data">
            <img src={noDataImg} alt="no data" />
            <p>No data</p>
          </div>
        )}
      </div>
    )
  }
}

interface TableItemProps extends TableComProps {
  detailItem: response.RepaymentInfoList
}

interface TableState {
  isShow: boolean
}
export class TableItem extends Component<TableItemProps, TableState> {
  constructor(props: TableItemProps) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  handleCollapse = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    const { detailItem, dataFlow } = this.props
    const { isShow } = this.state
    return (
      <div className="table-item">
        <ul>
          {tableConfig.map((configItem, index) => {
            if (configItem.render) {
              return (
                <li key={index} className={configItem.widthStyle}>
                  {configItem.render(detailItem)}
                </li>
              )
            } else if (configItem.showExpend) {
              return (
                <li
                  key={index}
                  className={`show-detail ${isShow && 'show'}`}
                  onClick={this.handleCollapse}
                  id={`see-details-${detailItem.extend_period + 1}`}
                />
              )
            } else {
              return <li key={index}>{detailItem[configItem.dataIndex as keyof response.RepaymentInfoList]}</li>
            }
          })}
        </ul>
        {isShow && dataFlow && (
          <Table
            tableTitle={RepaymentInfoColumns}
            tableData={dataFlow.filter((item: response.RepaymentInfoFlowList) => {
              return detailItem.extend_period === item.extend_period
            })}
            size="small"
          />
        )}
      </div>
    )
  }
}

export default RepaymentInfo
