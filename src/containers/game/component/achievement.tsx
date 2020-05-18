import React from 'react'
import TopBack from 'containers/game/component/topBack'
import { getAchievement } from '../utils'
import { AchievementLevel } from 'global/const'
import BULING from 'assets/badge-bg.png'
import ICONS from 'assets/coins2.png'
import BOT from 'assets/bot.png'
import { Rewards } from 'interface/game'
import gameStyle from '../game.module.scss'

interface Props extends Rewards {
  rangeCoins?: number
  coins?: number
  handleBack?(): void
  clickNext?(): void
}

const Achievement: React.FC<Props> = (props: Props) => {
  const { coins, rangeCoins, handleBack, clickNext, rewardLevel, reward } = props
  return (
    <div className={gameStyle.achievement}>
      <TopBack handleBack={handleBack} coins={coins} rangeCoins={rangeCoins} />
      <div className={gameStyle.hints}>
        <div className={gameStyle.hintWorlds}>
          <div className={gameStyle.rotateBg}>
            <img className={gameStyle.rotateImg} src={BULING} alt="光芒" />
            <img className={gameStyle.achieveBg} src={getAchievement(rewardLevel!)} alt="成就" />
          </div>
          <p className={gameStyle.getAchie}>获得成就</p>
          <p className={gameStyle.achieveName}>{AchievementLevel[rewardLevel!]}</p>
          <p className={gameStyle.otherAch}>额外奖励</p>
          <p className={gameStyle.rewardCoins}>
            <img src={ICONS} alt="coins" />
            <span className={gameStyle.addCoins}>+{reward}</span>
          </p>
        </div>
        <img className={gameStyle.thinkImg} alt="think" src={BOT} />
      </div>
      <div className={gameStyle.botButtons}>
        <button className={gameStyle.btnShare}>分享</button>
        <button onClick={clickNext} className={gameStyle.btnConfirm}>
          确定
        </button>
      </div>
    </div>
  )
}

export default Achievement
