import React from 'react'
import ICONS from 'assets/icon.png'
import gameStyle from '../game.module.scss'

interface Props {
  world: string
  isShowPop: boolean
  onclick?(): void
}
const Popup = (props: Props) => {
  const { world, onclick, isShowPop } = props
  if (!isShowPop) return <div />
  return (
    <div className={gameStyle.popupBox}>
      <div className={gameStyle.popHint}>
        <div className={gameStyle.popupCoins}>
          <span>+</span>
          <span>5</span>
          <img src={ICONS} alt="coins" />
        </div>
        <p className={gameStyle.popupWorld}>{world}</p>
        <button onClick={onclick} className={gameStyle.popupNext} type="next">
          下一题
        </button>
      </div>
      <div className={gameStyle.mask} />
    </div>
  )
}

export default Popup
