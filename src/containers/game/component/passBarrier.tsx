import React from 'react'
import BULING from 'assets/badge-bg.png'
import BOT from 'assets/bot.png'
import { getAchievement } from '../utils'
import { AchievementLevel } from 'global/const'
import gameStyle from '../game.module.scss'

interface Props {
  rewardLevel?: number
  coins?: number
  currentLevel?: number
  newStart?(): void
}

const PassBarrier = (props: Props) => {
  const { rewardLevel, currentLevel, coins, newStart } = props
  return (
    <>
      <div className={gameStyle.passBarrier}>
        <p className={gameStyle.passworld}>恭喜通关</p>
        <div className={gameStyle.showImg}>
          <div className={gameStyle.rotateBg}>
            <img className={gameStyle.rotateImg} src={BULING} alt="光芒" />
            <img className={gameStyle.achieveBg} src={getAchievement(rewardLevel!)} alt="成就" />
          </div>
          <p className={gameStyle.commonWorld}>获得成就</p>
          <p className={gameStyle.achieveName}>{AchievementLevel[rewardLevel!]}</p>
        </div>
        <div className={gameStyle.line} />
        <div className={gameStyle.barrierInfo}>
          <div className={gameStyle.barrierLevel}>
            <p>闯关数</p>
            <p>{currentLevel}</p>
          </div>
          <div className={gameStyle.barrierCoins}>
            <p>累计金币</p>
            <p>{coins}</p>
          </div>
        </div>
        <div className={gameStyle.line} />
        <p className={gameStyle.newStart}>结束是新的开始</p>
        <img className={gameStyle.thinkImg} alt="think" src={BOT} />
      </div>
      <div className={gameStyle.passBut}>
        <button className={gameStyle.newbut} onClick={newStart}>
          <p>关卡重玩</p>
          <p>复习一下这些成语吧</p>
        </button>
      </div>
    </>
  )
}
export default PassBarrier
