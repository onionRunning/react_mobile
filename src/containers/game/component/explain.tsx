import React from 'react'
import Items from 'components/items/items'
import { WorldItem } from 'interface/game'
import { getImgUrl } from '../utils'
import ERR_CLEAR from 'assets/err_clear.png'
import gameStyle from '../game.module.scss'
import { INIT_NUMBER, IDIOM_STATUS } from 'global/const'

interface Props {
  data?: WorldItem[]
  // id 是属性， index 是序号
  onClick(id: number, index: number): () => void
  clickClear(): void
}

const Explains = (props: Props) => {
  const { data, onClick, clickClear } = props
  const createIdimos = (lists: WorldItem[]) => {
    return lists.map((item, index) => {
      return <Items key={index} types={item.types} value={item.value} onClick={onClick(item.id!, index)} />
    })
  }
  const showImg = (lists: WorldItem[]) => {
    const isShowClear =
      lists?.filter(item => {
        return item.types === IDIOM_STATUS.ERROR
      }).length === INIT_NUMBER.FOUR
    if (isShowClear) {
      return <img onClick={clickClear} className={gameStyle.clear} src={ERR_CLEAR} alt="清空" />
    }
  }
  return (
    <div className={gameStyle.explain}>
      <p className={gameStyle.levelTitle}>第{1200}关</p>
      <img className={gameStyle.idiomImg} src={getImgUrl('开门见山')} alt={'开门见山'} />
      <div className={gameStyle.chenyu}>
        {createIdimos(data!)}
        {showImg(data!)}
      </div>
    </div>
  )
}

export default Explains
