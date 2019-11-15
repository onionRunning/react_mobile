import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { headerLists } from './config'
import { MixProps } from 'global/interface'
import CheckRepeatProps from 'stores/checkRepeat'
import Table from 'components/table'

import styles from './index.module.scss'

interface Props extends MixProps {
  checkRepeat: CheckRepeatProps
}
interface State {
  currentList: Record<string, any>[]
}

@inject('checkRepeat')
@observer
// 查重检测
export class CheckRepeat extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentList: []
    }
  }
  async componentDidMount() {
    await this.getCheckLists()
    const { lists } = this.props.checkRepeat
    this.setState({
      currentList: lists
    })
  }
  // 获取查重列表
  getCheckLists = () => {
    const { getCheckLists } = this.props.checkRepeat
    const {
      state: { order_no }
    } = this.props.location
    getCheckLists({ order_no })
  }

  // 重新匹配列表
  newClick = () => {
    const { retryChecklists } = this.props.checkRepeat
    const {
      state: { order_no }
    } = this.props.location
    retryChecklists({ order_no })
  }
  render() {
    const { currentList } = this.state
    const { viewType } = this.props.location.state
    return (
      <div className={styles.checkRepeatWrap}>
        <div className={styles.tableWrap}>
          {/* TODO: 样式待优化 */}
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
