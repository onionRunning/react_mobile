import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import UserStore from 'stores/user'

import { Type, TitleMap, BtnMap, InputItem } from './config'
import { UserDetaiReq, RoleListReq } from 'interface/user'
import UserInfo from './detailIpt'
import UserRoles from './userRoles'
import Btn from './btn'
import Message from 'components/Message'
import { addVertify } from './utils'
import styles from './index.module.scss'

interface MatchParams {
  type: Type
  id: string
}

interface Props extends RouteComponentProps<MatchParams> {
  user: UserStore
}

export interface State {
  request: {
    name: string
    phone: string
    email: string
  }
  userDetail: any
  roleList: any[]
  role_id: number[]
}

@inject('user')
@observer
class UserDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        name: '',
        phone: '',
        email: ''
      },
      userDetail: {},
      roleList: [],
      role_id: []
    }
  }
  componentDidMount = () => {
    this.init()
    this.getRoleListData()
  }

  render() {
    const { type } = this.props.match.params
    const { userDetail, roleList, role_id } = this.state
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <span>{TitleMap[type]}</span>
        </header>
        <UserInfo {...this.props} type={type} userDetail={userDetail} onChange={this.handleInputChange} />
        <UserRoles
          {...this.props}
          roleList={roleList}
          value={role_id}
          disabled={type === 'detail'}
          onchange={this.handleChange}
        />
        <div className={styles.operate_wrap}>
          <Btn btnData={BtnMap[type]} clickProps={this.operateBtn} />
        </div>
      </div>
    )
  }

  init = () => {
    const { id } = this.props.match.params
    id && this.getUserDetailData(+id)
  }

  // 获取用户详情
  getUserDetailData = async (id: number) => {
    const request: UserDetaiReq = {
      id
    }
    const userDetail = await this.props.user.getUserDetailData(request)
    const { name, phone, email } = userDetail
    const selectedRole: number[] = userDetail.role_info.map((el: any) => {
      return el.id
    })
    this.setState({
      userDetail: { ...userDetail },
      role_id: [...selectedRole],
      request: {
        name,
        phone,
        email
      }
    })
  }

  // 获取角色列表
  getRoleListData = async () => {
    const request: RoleListReq = {
      page: 1,
      per_page: 1000
    }
    const list = await this.props.user.getRoleListData(request)
    const changedList = list!.map(el => {
      return { label: el.role_name, value: el.id }
    })
    this.setState({
      roleList: [...changedList]
    })
  }

  // 修改用户信息
  handleInputChange = (item: InputItem) => {
    this.setState({
      request: {
        ...this.state.request,
        [item.key]: item.value
      },
      userDetail: {
        ...this.state.userDetail,
        [item.key]: item.value
      }
    })
  }

  // 选中角色
  handleChange = (selectedRole: number[]) => {
    this.setState({
      role_id: [...selectedRole]
    })
  }

  // 点击相应的详情操作
  operateBtn = (v: string) => {
    v === 'return' && this.props.history.goBack()
    v === 'add' && this.addUsers()
    v === 'edit' && this.editUsers()
  }

  // 新增用户
  addUsers = async () => {
    const text = addVertify(this.state)
    if (text) {
      Message.warning(text)
      return
    }
    const { role_id } = this.state
    const { name, email, phone } = this.state.request
    const request = {
      name,
      account: email,
      email,
      phone,
      role_id
    }
    const isSuccess = await this.props.user.addUsersDetail(request)
    isSuccess && this.props.history.push('/auth/users')
  }

  // 编辑用户
  editUsers = async () => {
    const text = addVertify(this.state)
    if (text) {
      Message.warning(text)
      return
    }
    const { id } = this.props.match.params
    const { role_id } = this.state
    const { name, phone } = this.state.request
    const request = {
      id: +id,
      name,
      phone,
      role_id
    }
    const isSuccess = await this.props.user.editUsersDetail(request)
    isSuccess && this.props.history.push('/auth/users')
  }
}
export default UserDetail
