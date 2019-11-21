import React, { MouseEventHandler } from 'react'
import style from './index.module.scss'

interface ConfigType {
  type: string
  title: string
  isShow: boolean
  id?: string
  hasResult?: boolean
}

interface Props {
  handleClick: (args: string) => MouseEventHandler<{}>
  config: ConfigType[]
  type?: string
}
// 渲染列表
export const getLists = (props: Props) => {
  const { config = [], handleClick, type } = props
  return config.map((item, index) => {
    return (
      <li
        className={`${item.type === type ? style.active : ''}`}
        onClick={handleClick(item.type)}
        key={index}
        id={item.id}
      >
        {item.title}
        {item.hasResult && item.type === 'Duplicate checking detection' && <div className={style.icon} />}
      </li>
    )
  })
}
const NavBar: React.FC<Props> = (props: Props) => {
  return (
    <div className={style['con-nav-bar']}>
      <ul className={style.title_style}>{getLists(props)}</ul>
    </div>
  )
}
// 函数组件 内部的嵌套函数处在内部还是外部效果都是一样的, 放在组件外部是便于测试, 组件内部无法进行测试
export default NavBar
