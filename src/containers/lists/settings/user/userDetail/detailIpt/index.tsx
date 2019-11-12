import React, { Component } from 'react'
import styles from './index.module.scss'
import * as iRole from 'interface/role'

interface Props {
  userDetail?: any
  type?: string
  onChange: (req: iRole.ReqType) => void
}

export class UserInfo extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: ''
    }
  }

  static getDerivedStateFromProps = (props: Props, state: any) => {
    const { name = '', email = '', phone = '' } = props.userDetail
    if (email !== state.email || name !== state.name || phone !== state.phone) {
      return {
        name,
        email,
        phone
      }
    }
    return null
  }

  render() {
    const { name, email, phone } = this.state
    const isEdit = this.props.type === 'detail'
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
          disabled={isEdit}
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
          disabled={this.props.type !== 'add'}
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
          disabled={isEdit}
          onChange={this.handleChange}
        />
      </div>
    )
  }
  handleChange = (
    e: React.ChangeEvent<{
      value: string
      name: string
    }>
  ) => {
    const { name, value } = e.target
    let vals = value.replace(/[\u4e00-\u9fa5]/g, '')
    if (name === 'phone') {
      vals = vals.replace(/[^\d]/g, '').substr(0, 12)
    }
    this.setState({ [name]: vals })
    this.props.onChange({ key: name, value: vals })
  }
}

export default UserInfo
