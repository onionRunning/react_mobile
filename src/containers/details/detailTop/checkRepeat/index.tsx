import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { headerLists } from './config'
import { MixProps } from 'global/interface'
import CheckRepeatProps from 'stores/details/checkRepeat'
import { CheckRepeatPayloadRes } from 'interface/details/checkRepeat'
import Table from 'components/table'

import styles from './index.module.scss'
import Common from 'stores/common'
import { intoDetail } from 'global/constants'
// import { gotoDetail } from 'global/method'

interface Props extends MixProps {
  checkRepeat: CheckRepeatProps
  common: Common
  type?: string
}
interface State {
  currentList: any[]
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
    // 请求接口时间过长,切换页面时关闭loading
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
  renderContent = (res: CheckRepeatPayloadRes) => {
    this.props.common.changeLoading(false)
    this.setState({
      currentList: res.duplicate_list
    })
  }
  // 重新匹配列表
  newClick = () => {
    const { retryChecklists } = this.props.checkRepeat
    const {
      state: { order_no }
    } = this.props.location
    retryChecklists({ order_no }, this.renderContent)
  }
  operating = () => () => {
    // TODO:
    // gotoDetail(item, true)
  }
  render() {
    const { currentList } = this.state
    const { viewType } = this.props.location.state
    const headerConfig = headerLists(this.operating)
    return (
      <div className={styles.checkRepeatWrap}>
        <div className={styles.tableWrap}>
          {viewType === intoDetail.MYORDER && (
            <button className={`${styles.rematchBtn} theme-btn`} onClick={this.newClick}>
              Rematch
            </button>
          )}
          <Table tableTitle={headerConfig} tableData={currentList} />
        </div>
      </div>
    )
  }
}

export default CheckRepeat
