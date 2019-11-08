import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import ListTitle from 'components/listTitle'
import ListCondition from 'components/listCondition'
import Button from 'components/button'
import Table from 'components/table'
import Message from 'components/Message'
import { condition, getTableTitle } from './config'
import styles from './index.module.scss'
import { userPermission } from 'design/permission'

interface Props extends RouteComponentProps {
  temp: null
}

interface Item {
  key: string
  value: string
}

interface UserListParams {
  page: number
  pageSize: number
  multi_condition?: string
  frozen?: 'normal' | 'frozen'
}

interface State {
  params: UserListParams
}

const data = [
  {
    id: '1',
    name: 'admin',
    account: 'zs@qq.com',
    phone: '13600000001',
    created_time: '2019-07-18 16:40:01',
    status: 'normal'
  },
  {
    id: '2',
    name: 'admin2',
    account: 'zs@qq.com',
    phone: '13600000002',
    created_time: '2019-07-18 16:40:02',
    status: 'normal'
  }
]

class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      params: {
        page: 1,
        pageSize: 10
      }
    }
  }

  render() {
    const tableTitle = getTableTitle(this.renderOperate)
    return (
      <div className={styles.page}>
        <ListTitle>User management</ListTitle>
        <div className={styles.header}>
          <ListCondition data={condition} onChange={this.handleChange} />
          <div className={styles.operator}>
            <Button onClick={() => Message.info('primary')} type="primary">
              Inquire
            </Button>
            <Button onClick={() => Message.info('blue')} type="blue">
              Add user
            </Button>
          </div>
        </div>
        <Table
          tableTitle={tableTitle}
          tableData={data}
          pagination={{
            current: 1,
            page_size: 10,
            total: 20
          }}
        />
      </div>
    )
  }

  renderOperate = (record: any, _: any, index: number) => {
    // const { p40102, p40103, p40104, p40105 } = userPermission.finnalPermission!.user_func
    const { p40102, p40103, p40104 } = userPermission.finnalPermission!.user_func
    const temp = record.status === 'normal' ? 'freeze' : 'unfreeze'
    const { name } = record
    return (
      <div className={styles.action}>
        {p40102 && <Link to={`/auth/users_details/${record.id}`}>detail</Link>}
        {name !== 'admin' && p40103 && <Link to={`/auth/users_edit/${record.id}`}>edit</Link>}
        {name !== 'admin' && p40104 && (
          <span onClick={this.operateUser()} id={`${temp}-${index}`}>
            {temp}
          </span>
        )}
        {/* {name !== 'admin' && p40105 && (
          <a onClick={this.resetUsers(record.id)} id={`reset-pwd-${index}`}>
            Reset Password
          </a>
        )} */}
      </div>
    )
  }

  // 冻结 or 解冻用户,出现弹窗
  operateUser = () => () => {
    // const bool = operate.status === 'frozen' ? true : false
    // const titles = operate.status === 'normal' ? 'disabling' : 'enabling'
    // this.props.dispatch(
    //   Action.createConfirm({
    //     title: 'Confirmation prompt',
    //     text: `Do you confirm ${titles} user ?`,
    //     onOk: this.rightFunc(operate.id, !bool),
    //     onCancel: this.closeConfirm
    //   })
    // )
  }

  handleChange = (item: Item) => {
    console.log(item)
    this.setState({
      params: {
        ...this.state.params,
        [item.key]: item.value
      }
    })
  }
}

export default User
