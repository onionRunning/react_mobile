import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { headerLists } from './config'
import { MixProps } from 'global/interface'
import CheckRepeatProps from 'stores/details/checkRepeat'
import { CheckRepeatResItem, CheckRepeatRes } from 'interface/details/checkRepeat'
import Table from 'components/table'

import styles from './index.module.scss'
import Common from 'stores/common'

interface Props extends MixProps {
  checkRepeat: CheckRepeatProps
  common: Common
  type?: string
}
interface State {
  currentList: CheckRepeatResItem[]
}

@inject('checkRepeat', 'common')
@observer
// 查重检测
export class CheckRepeat extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentList: []
    }
  }
  componentDidMount() {
    const { changeLoading } = this.props.common
    changeLoading(true)
    this.getCheckLists()
  }
  componentWillUnmount() {
    const { changeLoading } = this.props.common
    changeLoading(false)
  }
  // 获取查重列表
  getCheckLists = () => {
    const { getCheckLists } = this.props.checkRepeat
    const {
      state: { order_no }
    } = this.props.location
    getCheckLists({ order_no }, this.renderContent)
  }
  renderContent = (res: CheckRepeatRes) => {
    if (res) {
      this.props.common.changeLoading(false)
      this.setState({
        currentList: res.CheckAndOther
      })
    }
  }
  // 重新匹配列表
  newClick = () => {
    const { retryChecklists } = this.props.checkRepeat
    const {
      state: { order_no }
    } = this.props.location
    retryChecklists({ order_no }, this.renderContent)
  }
  render() {
    const { currentList } = this.state
    const { viewType } = this.props.location.state
    return (
      <div className={styles.checkRepeatWrap}>
        <div className={styles.tableWrap}>
          <Table tableTitle={headerLists} tableData={currentList} />
        </div>
        {viewType === 'my_order' && (
          <button className={`${styles.rematchBtn} theme-btn`} onClick={this.newClick}>
            Rematch
          </button>
        )}
      </div>
    )
  }
}

export default CheckRepeat
