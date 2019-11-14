import React from 'react'
import styles from './index.module.scss'

interface Props {
  children: React.ReactNode
}

const ListTitle: React.FC<Props> = ({ children }) => {
  return <h3 className={styles.wrap}>{children}</h3>
}

export default ListTitle
