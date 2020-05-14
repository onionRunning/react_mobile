import React from 'react'
import itemStyle from './index.module.scss'

interface Props {
  value: string
}

const Items: React.FC<Props> = (props: Props) => {
  const { value } = props
  return <div className={itemStyle.wrapper}>{value}</div>
}

export default Items
