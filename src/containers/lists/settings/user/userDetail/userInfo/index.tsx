import React, { Component } from 'react'
import styles from './index.module.scss'
import * as iRole from 'interface/role'
import { Type } from 'interface/user'

interface UserDetail {
  name: string
  phone: string
  email: string
}

interface Props {
  userDetail: UserDetail
  type: string
  onChange: (req: iRole.ReqType) => void
}

class UserInfo extends Component<Props> {
  render() {
    const { name, email, phone } = this.props.userDetail
    const isDetail = this.props.type === Type.DETAIL
    const isAdd = this.props.type === Type.ADD
    return (
      <div className={styles.wrap}>
        <label>User Name：</label>
        <input
          id="name"
          className="base-input"
          type="text"
          placeholder="Please enter"
          maxLength={50}
          name="name"
          value={name}
          disabled={isDetail}
          onChange={this.handleChange}
        />
        <label>e-mail：</label>
        <input
          id="email"
          className="base-input"
          type="text"
          placeholder="Please enter"
          value={email}
          name="email"
          maxLength={320}
          disabled={!isAdd}
          onChange={this.handleChange}
        />
        <label>Cellphone：</label>
        <input
          id="phone"
          className="base-input"
          type="text"
          placeholder="Please enter"
          value={phone}
          name="phone"
          maxLength={20}
          disabled={isDetail}
          onChange={this.handleChange}
        />
      </div>
    )
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let vals = value.replace(/[\u4e00-\u9fa5]/g, '')
    if (name === 'phone') {
      vals = vals.replace(/[^\d]/g, '').substr(0, 12)
    }
    this.setState({ name: vals })
    this.props.onChange({ key: name, value: vals })
  }
}

export default UserInfo
