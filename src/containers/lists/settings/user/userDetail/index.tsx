import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import UserStore from 'stores/user'

import { Type, TitleMap, BtnMap, InputItem } from './config'
import { UserDetailRes, RoleInfoItem, RoleListItem, RoleListCheckBoxItem } from 'interface/user'
import UserInfo from './userInfo'
import UserRoles from './userRoles'
import Btn from './btn'
import Message from 'components/message'
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
  roleList: RoleListCheckBoxItem[]
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
    const { request, roleList, role_id } = this.state
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <span>{TitleMap[type]}</span>
        </header>
        <UserInfo {...this.props} type={type} userDetail={request} onChange={this.handleInputChange} />
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
    await this.props.user.getUserDetailData({ id }, this.handleUserDetailData)
  }

  // 处理用户数据
  handleUserDetailData = (userDetail: UserDetailRes) => {
    const { name, phone, email, role_info } = userDetail
    const selectedRole: number[] = role_info.map((el: RoleInfoItem) => {
      return el.id
    })
    this.setState({
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
    await this.props.user.getRoleListData(
      {
        page: 1,
        per_page: 1000
      },
      this.handleRoleListData
    )
  }

  // 处理角色列表数据
  handleRoleListData = (roleList: RoleListItem[]) => {
    const changedList: RoleListCheckBoxItem[] = roleList!.map((el: any) => {
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
    v === 'return' && this.goBack()
    v === 'add' && this.addUsers()
    v === 'edit' && this.editUsers()
  }

  // 返回上列表页
  goBack = () => {
    this.props.history.goBack()
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
    await this.props.user.addUsers(
      {
        name,
        account: email,
        email,
        phone,
        role_id
      },
      this.goBack
    )
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
    await this.props.user.editUsers(
      {
        id: +id,
        name,
        phone,
        role_id
      },
      this.goBack
    )
  }
}
export default UserDetail
