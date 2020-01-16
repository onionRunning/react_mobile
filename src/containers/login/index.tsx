import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import styles from './index.module.scss'

const Login: React.FC<any> = () => {
  return (
    <div className={styles.box}>
      <NavBar
        mode="dark"
        leftContent="返回"
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />
        ]}
      >
        学习模块
      </NavBar>
    </div>
  )
}

export default Login
