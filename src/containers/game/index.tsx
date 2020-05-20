import React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import GameStore from 'stores/game'
import TopBack from './component/topBack'
import Explains from './component/explain'
import WorldLists from './component/world'
import BotButton from './component/botButton'
import Popup from './component/popup'
import Achievement from './component/achievement'
import gameStyle from './game.module.scss'
import { INIT_NUMBER } from 'global/const'
import { getRewardsInfo, isObject } from 'global/utils'
import { Toast } from 'antd-mobile'

const INIT_ACHIEVEMENT = getRewardsInfo()
// console.error(INIT_ACHIEVEMENT)
interface Props extends RouteComponentProps {
  game: GameStore
}

@inject('game')
@observer
class Game extends React.Component<Props> {
  componentDidMount() {
    const { didMount } = this.props.game
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    didMount()
  }
  // 重置用户信息
  componentWillUnmount() {
    const { willUnMount } = this.props.game
    willUnMount()
  }

  render() {
    const {
      idiomWorld,
      worldLists,
      idiomLists,
      currentLevel,
      coins,
      isShowPop,
      rangeCoins,
      showAchievement,
    } = this.props.game
    if (idiomLists.length === INIT_NUMBER.ZERO) return null
    const name = idiomLists[currentLevel].name
    const world = idiomLists[currentLevel].description
    if (showAchievement) {
      return this.showAchieveContain()
    }
    return (
      <div className={gameStyle.gameBox}>
        <TopBack handleBack={this.handleBack} coins={coins} rangeCoins={rangeCoins} />
        <Explains
          level={currentLevel}
          name={name}
          data={idiomWorld}
          onClick={this.clickIdiom}
          clickClear={this.clickClear}
        />
        <WorldLists onClick={this.clickWorld} data={worldLists} />
        <BotButton startTips={this.startTips} />
        <Popup isShowPop={isShowPop} world={world} onclick={this.clickNext} />
      </div>
    )
  }
  showAchieveContain = () => {
    const { coins, rangeCoins, achievementInfo } = this.props.game
    return (
      <div className={gameStyle.gameBox}>
        <Achievement
          {...achievementInfo}
          handleBack={this.handleBack}
          coins={coins}
          rangeCoins={rangeCoins}
          clickNext={this.checkToNext}
          newStart={this.newStart}
        />
      </div>
    )
  }
  // 返回图标
  handleBack = () => {
    this.props.history.goBack()
  }
  // 点击文字信息产生的交互
  clickWorld = (index: number) => {
    return () => {
      // check 超过4个值已经消失了
      const { uodateWorld } = this.props.game
      uodateWorld(index)
    }
  }

  // 点击展示成语 移除自己 添加world
  clickIdiom = (id: number, index: number) => {
    return () => {
      const { removeIdiom } = this.props.game
      removeIdiom(id, index)
    }
  }
  // 点击清除按钮进行重置
  clickClear = () => {
    const { initWorldAndIdiom } = this.props.game
    initWorldAndIdiom()
  }
  // 点击开始提示按钮(校验当前金币是否大于 3)
  startTips = () => {
    const { getTips, coins } = this.props.game
    if (coins <= INIT_NUMBER.THREE) {
      Toast.info('金币不足,多加思考哦!!!', INIT_NUMBER.TWO)
      return
    }
    getTips()
  }
  // 点击下一题, 初始化下个题目 (判断是否需要进入成就页面)
  clickNext = () => {
    const { updateNextIdioms, handleAchievement, updateCoins } = this.props.game
    const res = this.checkAchievement()
    if (isObject(res)) {
      // 进入成就页面
      handleAchievement(true, res)
      // 奖励金币默认添加奖励金额
      updateCoins(res.reward)
      return
    }
    updateNextIdioms(INIT_NUMBER.ONE)
  }
  // check 当前规则是否需要进入成就页
  checkAchievement = () => {
    const { currentLevel } = this.props.game
    return [...INIT_ACHIEVEMENT].filter(item => {
      return item.currentLevel === currentLevel + INIT_NUMBER.ONE
    })[INIT_NUMBER.ZERO]
  }
  // 点击继续晋级下一关
  checkToNext = () => {
    const { updateNextIdioms, handleAchievement, achievementInfo } = this.props.game
    let step = INIT_NUMBER.ONE
    if (achievementInfo.rewardLevel === INIT_NUMBER.PASS_LEVEL) {
      step = INIT_NUMBER.ZERO
    }
    handleAchievement(false, {})
    updateNextIdioms(step)
  }
  // 通关后重新开始 重置关卡(暂时回到 1199关)
  newStart = () => {
    const { updateNextIdioms, updateAchievementStatus } = this.props.game
    updateNextIdioms(INIT_NUMBER.ZERO)
    updateAchievementStatus(false)
  }
}

export default Game
