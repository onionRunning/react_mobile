import React, { Component } from 'react'
import { RepaymentDetailList } from 'interface/details/repaymentInfo'
import { Columns } from '../config'
import noDataImg from 'assets/icon-no@2x.png'
import styles from './index.module.scss'

interface Props {
  columns: Columns[]
  dataSource: RepaymentDetailList[]
  expandedRowRender?: () => React.ReactNode
}

interface State {
  visible: boolean
}

export default class CustomTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    const { dataSource, expandedRowRender } = this.props
    return (
      <React.Fragment>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {this.renderTitle()}
              {expandedRowRender && <th key="extends">See details</th>}
            </tr>
          </thead>
          <tbody className={styles.tbody}>{this.renderBody()}</tbody>
        </table>
        {!dataSource.length && (
          <div className={styles.empty}>
            <img src={noDataImg} alt="no data" />
            <p>No data</p>
          </div>
        )}
      </React.Fragment>
    )
  }

  renderTitle = () => {
    const { columns } = this.props
    return columns.map((item, index) => {
      return (
        <th key={index} style={{ minWidth: item.width }}>
          {item.title}
        </th>
      )
    })
  }

  renderBody = () => {
    const { columns, dataSource, expandedRowRender } = this.props
    const { visible } = this.state
    return dataSource.map((record, recordIndex) => {
      return (
        <React.Fragment key={recordIndex}>
          <tr key={recordIndex}>
            {columns.map((item, index) => {
              return (
                <td style={{ minWidth: item.width }} key={index}>
                  {item.render(record)}
                </td>
              )
            })}
            {expandedRowRender && (
              <td
                key={`${recordIndex}-extra-td`}
                className={`${styles.operation} ${visible ? styles.rotate : ''}`}
                onClick={this.handleExpaned}
              />
            )}
          </tr>
          {expandedRowRender && this.state.visible && (
            <tr key={`${recordIndex}-extra-row`} className={styles.expanded_row}>
              <td colSpan={columns.length + 1}>{expandedRowRender!()}</td>
            </tr>
          )}
        </React.Fragment>
      )
    })
  }

  handleExpaned = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
}
