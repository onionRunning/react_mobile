import React from 'react'
import { InitIdios } from '../utils'
import Items from 'components/items/items'
import { WorldItem } from 'interface/game'
import gameStyle from '../game.module.scss'

interface Props {
  data?: WorldItem[]
  onClick(id: number): () => void
}

const WorldLists = (props: Props) => {
  const { data, onClick } = props

  const createIdimos = (lists: WorldItem[]) => {
    return lists.map((item, index) => {
      return <Items onClick={onClick(index)} key={index} types={item.types} value={item.value} />
    })
  }
  return <div className={gameStyle.world}>{createIdimos(data!)}</div>
}

export default WorldLists
