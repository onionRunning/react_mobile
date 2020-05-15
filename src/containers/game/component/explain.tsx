import React from 'react'
import { getImgUrl, InitIdios } from '../utils'
import Items from 'components/items/items'
import gameStyle from '../game.module.scss'
import { WorldItem } from 'interface/game'

interface Props {
  data?: WorldItem[]
  // id 是属性， index 是序号
  onClick(id: number, index: number): () => void
}

const Explains = (props: Props) => {
  const { data, onClick } = props
  const createIdimos = (lists: WorldItem[]) => {
    return lists.map((item, index) => {
      return <Items key={index} types={item.types} value={item.value} onClick={onClick(item.id!, index)} />
    })
  }
  return (
    <div className={gameStyle.explain}>
      <p className={gameStyle.levelTitle}>第{1200}关</p>
      <img className={gameStyle.idiomImg} src={getImgUrl('开门见山')} alt={'开门见山'} />
      <div className={gameStyle.chenyu}>{createIdimos(data!)}</div>
    </div>
  )
}

export default Explains
