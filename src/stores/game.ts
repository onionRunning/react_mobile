import { observable } from 'mobx'
import { IdiomLists, WorldItem } from 'interface/game'
import api from 'api'
import { getRandomSeed, getRandomWorld, randomArray } from 'global/utils'
import { INIT_IDIOS } from 'global/const'

const INIT_LEVEL = 0
const IDIOM_LENGTH = 4
const TYPES = {
  FILL: 'fill',
  EMPTY: 'empty',
  INIT: 'init',
  ERR: 'error',
}
class GameStore {
  // 成语列表
  @observable idiomLists: IdiomLists[] = []
  // 当前关卡的文字列表
  @observable worldLists: WorldItem[] = []
  // 四字的成语展示栏
  @observable idiomWorld: WorldItem[] = INIT_IDIOS
  // 当前等级
  @observable currentLevel = INIT_LEVEL
  // 初始化等级
  initLevel = () => {
    const level = sessionStorage.getItem('level')!
    this.currentLevel = parseInt(level, 2)
  }
  // 初始化文字列表信息
  initWorld = (level: number = INIT_LEVEL) => {
    const initIdiom = this.idiomLists[level].name
    const temp = [...getRandomWorld(getRandomSeed()), ...initIdiom.split('')]
    const randomArr = randomArray(temp, getRandomSeed())
    this.worldLists = randomArr.map((item, index) => {
      return { value: item, types: TYPES.FILL, id: index }
    })
  }
  // 更新文字信息列表显示状态
  uodateWorld = (id: number) => {
    if (this.checkUpdate()) return
    const temp = [...this.worldLists]
    const values = temp.map((item, index) => {
      if (index === id) {
        return { ...item, types: TYPES.EMPTY, id: index }
      }
      return { ...item, id: index }
    })
    this.worldLists = values
    this.updateIdiom(values, id)
  }
  // 更新状态
  changeWorldStatus = (id: number) => {
    const temp = [...this.worldLists]
    temp[id] = { ...temp[id], types: TYPES.FILL }
    this.worldLists = temp
  }
  // check empty个数不能大于4
  checkUpdate = () => {
    return (
      this.worldLists.filter(item => {
        return item.types === 'empty'
      }).length >= IDIOM_LENGTH
    )
  }
  // 更新展示成语列表 找到第一个为空的 value值并且赋值
  updateIdiom = (data: WorldItem[], index: number) => {
    const temp = [...this.idiomWorld]
    const values = temp.findIndex(item => {
      return item.value === ''
    })
    temp[values] = { ...data[index], types: TYPES.FILL }
    const validLength = temp.filter(item => {
      return item.value !== ''
    }).length
    // console.log(validLength, 'validLength')
    if (validLength === IDIOM_LENGTH) {
      this.checkIdiomStatus(temp)
      return
    }
    this.idiomWorld = temp
  }
  // 判断当前的四字成语成功(提示弹窗出现) 还是失败(显示红色报错)
  checkIdiomStatus = (data: WorldItem[]) => {
    const choseIdiomValue = data.reduce((current, pre) => {
      return (current += pre.value)
    }, '')
    console.error(choseIdiomValue, 'choseIdiomValue')
    if (choseIdiomValue === this.idiomLists[this.currentLevel].name) {
      this.idiomWorld = [...data]
      // 成功后的逻辑
    } else {
      this.idiomWorld = [...data].map(item => {
        return { ...item, types: TYPES.ERR }
      })
    }
  }
  // 移除成语点击
  removeIdiom = (id: number, index: number) => {
    let temp = [...this.idiomWorld]
    // 用于把错误状态进行重置
    const validLength = temp.filter(item => {
      return item.types === TYPES.ERR
    }).length
    if (validLength === IDIOM_LENGTH) {
      temp = temp.map(item => {
        return { ...item, types: TYPES.FILL }
      })
    }
    temp[index] = { value: '', types: TYPES.INIT }
    this.idiomWorld = temp
    this.changeWorldStatus(id)
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
  // 清回归最初状态
  initWorldAndIdiom = () => {
    this.idiomWorld = [...INIT_IDIOS]
    this.worldLists = [...this.worldLists].map(item => {
      return { ...item, types: TYPES.FILL }
    })
  }
}
export default GameStore

// 注意联动逻辑的处理 数据A更新 -> 更新B // 数据B更新 -> 数据A