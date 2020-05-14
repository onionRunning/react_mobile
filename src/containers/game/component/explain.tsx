import React from 'react'
import { getImgUrl } from '../utils'
import gameStyle from '../game.module.scss'

const Explains: React.FC<any> = () => {
  return (
    <div className={gameStyle.explain}>
      <p className={gameStyle.levelTitle}>第{1200}关</p>
      <img className={gameStyle.idiomImg} src={getImgUrl('开门见山')} alt={'开门见山'} />
    </div>
  )
}

export default Explains
