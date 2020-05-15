import React from 'react'
import itemStyle from './index.module.scss'

interface Props {
  value: string
  types: string
  onClick?(): void
}
const EMPTY = ''
const HIDE_TYPE = ['empty']
const Items: React.FC<Props> = (props: Props) => {
  const { value, types, onClick } = props
  const finValue = !HIDE_TYPE.includes(types) ? value : EMPTY
  return (
    <div onClick={onClick} className={`${itemStyle.wrapper} ${itemStyle[types]}`}>
      {finValue}
    </div>
  )
}

export default Items

// 组件自身有4种状态
// init(初始为空) fill(填充状态) empty(背景) error(错误)
