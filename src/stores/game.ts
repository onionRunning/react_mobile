/* eslint-disable no-invalid-this */
import { observable } from 'mobx'
import { IdiomLists } from 'interface/game'
import api from 'api'

const INIT_LEVEL = 0

class GameStore {
  // 成语列表
  @observable idiomLists: IdiomLists[] = []
  // 当前等级
  @observable currentLevel = INIT_LEVEL
  // 初始化等级
  initLevel = () => {
    const level = sessionStorage.getItem('level')!
    this.currentLevel = parseInt(level, 2)
  }

  // 更新等级
  updateLevel = (l: number) => {
    this.currentLevel = l
  }

  // 初始化成语列表
  setIdiomValue = async() => {
    const res = await api.getIdioms()
    if (res.success) {
      this.idiomLists = res.data.chengyu
    }
    return res.success
  }
}
export default GameStore
