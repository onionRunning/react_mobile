import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styles from './index.module.scss'

interface Props extends RouteComponentProps {
  temp: null
}

interface State {
  page: number
  pageSize: number
}

class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <h3 className={styles.header}>User management</h3>
      </div>
    )
  }
}

export default User
