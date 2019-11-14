import React, { Component } from 'react'
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
import ListCondition, { BtnItem } from 'components/listCondition'
import Table from 'components/table'
import Message from 'components/message'
import Common from 'stores/common'
import Blacks from 'stores/orders/blacks'
import * as utils from './utils'
import { strTrim, composeFunc } from 'global/method'
import errs from 'global/errors'
import { getSortValue, DEFAULT_PAGE, DEFAULT_PER_PAGE, RowProps, FillInfo } from '../const'
import { MixProps } from 'global/interface'
import { intoDetail } from 'global/constants'
import styles from '../myOrders/index.module.scss'

interface Props extends MixProps {
  common: Common
  blacks: Blacks
}
interface State {
  request: FillInfo
  chose: Record<string, string | number>[]
  checkRow: number[] | string[]
  removeBlack: {
    operator_name: string | null
    operator_id: number
  }
}
@inject('common', 'blacks')
@observer
export class BlackLists extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: { ...utils.initRequest },
      chose: [],
      checkRow: [],
      removeBlack: {
        operator_name: sessionStorage.getItem('username'),
        operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
      }
    }
  }
  componentDidMount() {
    this.getBlackListsReq()
    this.getProductDetail()
    this.getBlackPerson()
  }

  componentWillUnmount() {
    this.setState({
      request: { ...utils.initRequest },
      chose: [],
      checkRow: []
    })
    this.props.blacks.clearBlackList()
  }

  render() {
    const { blackLists, blackListPage, blackListStatus } = this.props.blacks
    const tabTitle = utils.getTableTitle(this.replaceDetail)
    const rowSelection: RowProps<FillInfo> = {
      onChange: this.changeChose, //勾选函数
      selectedRowKeys: this.state.checkRow // 用于重置
    }
    return (
      <div className={styles.page}>
        <h3>BlankList Order</h3>
        <div className="orders-condition-wrapper">
          <ListCondition
            data={utils.filterConfig}
            btnItems={utils.btnItems() as BtnItem[]}
            onChange={this.handleFilter}
            btnClick={this.handleBtnClick}
          />
        </div>
        <div className="list-wapper">
          <Table
            tableData={blackLists}
            tableTitle={tabTitle as ColumnProps<{}>[]}
            pagination={blackListPage}
            onChange={this.tableChange}
            rowSelection={rowSelection}
            loading={blackListStatus}
          />
        </div>
      </div>
    )
  }
  // 表单筛选
  handleFilter = (v: FillInfo) => {
    let vals = strTrim(v.value)
    if (utils.turnToNumber.includes(v.key as string)) {
      if (vals) {
        vals = Number(vals)
      } else {
        vals = 0
      }
    }
    this.setState({
      request: { ...this.state.request, [v.key]: vals }
    })
  }
  // 按钮点击
  handleBtnClick = (type: string) => {
    type === 'inquery' && this.getBlackListsReq({ page: 1 })
    type === 'remove' && this.reomveBlacksList()
  }

  // 翻页 + 排序
  tableChange = (pag: PaginationConfig, _: {}, sorter: SorterResult<{}>) => {
    const { columnKey, order } = sorter
    const sorts = {
      page: pag.current ? pag.current : DEFAULT_PAGE,
      per_page: pag.pageSize ? pag.pageSize : DEFAULT_PER_PAGE,
      sort_value: columnKey ? columnKey : '',
      sort_order: getSortValue(order)
    }
    this.getBlackListsReq({ ...sorts })
    this.setState({
      request: { ...this.state.request, ...sorts }
    })
  }

  // 请求获取黑名单管理列表
  getBlackListsReq = (v?: FillInfo) => {
    // 黑名单管理
    this.props.blacks.getBlackLists({ ...this.state.request, ...v })
  }

  // 获取产品配置信息
  getProductDetail = () => {
    // get config
  }

  getBlackPerson = () => {
    // 获取管理黑名单用户
  }

  // 选择要移除黑名单
  changeChose = (k: number[] | string[], v: Record<string, string | number>[]) => {
    this.setState({ chose: v, checkRow: k })
  }

  // 移除黑名单
  reomveBlacksList = () => {
    if (!this.state.chose.length) {
      Message.error(errs.CHOOSE_ORDER_EMPTY)
      return
    }
    this.props.common.changeConfirm({
      show: true,
      title: 'Exit',
      text: 'are you sure remove list!',
      onCancel: this.closeConfirm,
      onOk: this.rightFunc
    })
  }

  // 开始移除黑名单
  rightFunc = () => {
    const { chose } = this.state
    const vMaps = chose.map((item: FillInfo) => {
      return item.id
    })
    const orders = chose.map((item: FillInfo) => {
      return item.order_no
    })
    const params = {
      id: vMaps,
      id_count: vMaps.length,
      ...this.state.removeBlack,
      order_no: orders
    }
    this.props.blacks.removeBlackList(params, this.successCb)
  }

  // 移除黑名单成功的回调: 关闭弹窗 && 重新请求列表
  successCb = () => {
    const { closeConfirm, getBlackListsReq, initChose } = this
    Message.info('remove success!')
    composeFunc(closeConfirm, getBlackListsReq({ page: 1 }), initChose)
  }
  // 初始化勾选内容
  initChose = () => {
    this.setState({ checkRow: [] })
  }
  //关闭弹窗
  closeConfirm = () => {
    this.props.common.changeConfirm({ show: false })
  }

  replaceDetail = (item: FillInfo) => () => {
    const { customer_id, order_no, product_name, mobile_id } = item
    const payload = {
      customer_id,
      order_no,
      product_name,
      mobile_id,
      viewType: intoDetail.BLACKORDER
    }
    this.props.history.push(`/auth/${intoDetail.BLACKORDER}/order_details`, {
      ...payload
    })
  }
}

export default BlackLists

// 页面逻辑:
// 查询 +  筛选
// 下载 && 查询
// 移除黑名单
