import React from 'react'
import styles from './index.module.scss'

export type btnType = 'default' | 'primary' | 'black' | 'blue' | 'gray'

interface Props {
  id?: string
  type?: btnType
  children: React.ReactNode
  onClick: (e: React.MouseEvent) => void
}

const Button: React.FC<Props> = ({ type = 'default', children, onClick }) => {
  return (
    <button className={`${styles.item} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
