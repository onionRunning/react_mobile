import { observable } from 'mobx'
import { IdiomLists, WorldItem, Rewards } from 'interface/game'
import api from 'api'
import { getRandomSeed, getRandomWorld, randomArray, generateRandom, isString } from 'global/utils'
import { INIT_IDIOS } from 'global/const'

const INIT_LEVEL = 0
const ZERO = 0
const IDIOM_LENGTH = 4
const ONE = 1
const INIT_COINS = 100
const ADD_RANGE = 5
const REDUCE_RANGE = -3
const ALL_LEVEL = 1200

const TYPES = {
  FILL: 'fill',
  EMPTY: 'empty',
  INIT: 'init',
  ERR: 'error',
}
class GameStore {
  // 成语列表 后端返回
  @observable idiomLists: IdiomLists[] = []
  // 当前关卡的文字列表
  @observable worldLists: WorldItem[] = []
  // 四字的成语展示栏
  @observable idiomWorld: WorldItem[] = INIT_IDIOS
  // 展示成功输入成功后的弹窗
  @observable isShowPop = false
  // 当前等级
  @observable currentLevel = INIT_LEVEL
  // 当前金额
  @observable coins = INIT_COINS
  // 展示当前金币变化等级
  @observable rangeCoins = REDUCE_RANGE
  // 展示成就模块
  @observable showAchievement = false
  // 成就页面展示的信息
  @observable achievementInfo: Rewards = {}
  // 通关的次数(预留)
  @observable passNumber = INIT_LEVEL
  // 临时变量储存随机的文字列表
  @observable randomWorlds: string[] = []
  // 页面加载执行的函数
  didMount = async() => {
    this.initLevel()
    this.initConins()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await this.setIdiomValue()
    this.getRandomWorlds(ZERO)
    this.initWorld()
  }
  // 页面离开时执行函数
  willUnMount = () => {
    this.initAllInfo()
  }
  // 更新通关次数
  updatePassNum = () => {
    const nums = localStorage.getItem('pass_num')!
    let isRightNum = false
    if (isString(nums) && nums !== 'NaN') {
      isRightNum = true
    }
    this.passNumber = parseInt(isRightNum ? nums : INIT_LEVEL.toString(), 10) + ONE
  }
  // 初始化等级
  initLevel = () => {
    const level = localStorage.getItem('level')!
    let isRightLevel = false
    if (isString(level) && level !== 'NaN') {
      isRightLevel = true
    }
    this.currentLevel = parseInt(isRightLevel ? level : INIT_LEVEL.toString(), 10)
  }
  // 初始化金额
  initConins = () => {
    const storageCoins = localStorage.getItem('coins')!
    let isRightCoins = false
    if (isString(storageCoins) && storageCoins !== 'NaN') {
      isRightCoins = true
    }
    this.coins = parseInt(isRightCoins ? storageCoins : INIT_COINS.toString(), 10)
  }
  // 储存等级
  saveLevel = (l: number) => {
    localStorage.setItem('level', l.toString())
  }
  // 获取随机当前关卡的下一关文字变量
  getRandomWorlds = (step = ONE) => {
    if (this.currentLevel === ALL_LEVEL - ONE) {
      step = ZERO
    }
    const initIdiom = this.idiomLists[this.currentLevel + step].name
    const temp = [...getRandomWorld(getRandomSeed()), ...initIdiom.split('')]
    this.randomWorlds = randomArray(temp, getRandomSeed())
  }
  // 初始化文字列表信息
  initWorld = () => {
    const randomArr = [...this.randomWorlds]
    this.worldLists = randomArr.map((item, index) => {
      return { value: item, types: TYPES.FILL, id: index }
    })
  }
  // 更新文字信息列表显示状态(文字列表点击更新为空, 成语展示显示)
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
  // 更新文字状态
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
    if (choseIdiomValue === this.idiomLists[this.currentLevel].name) {
      this.idiomWorld = [...data]
      // 成功后的逻辑
      this.isShowPop = true
      this.getRandomWorlds() // 把下一关的随机文字先准备好
      this.updateCoins(ADD_RANGE)
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
  // 成语 和文字信息 清回归最初状态
  initWorldAndIdiom = () => {
    this.idiomWorld = [...INIT_IDIOS]
    this.worldLists = [...this.worldLists].map(item => {
      return { ...item, types: TYPES.FILL }
    })
  }
  // 减少/增加 金额
  updateCoins = (range: number) => {
    this.coins = this.coins + range
    this.rangeCoins = range
    localStorage.setItem('coins', this.coins.toString())
  }
  // 点击获取提示按钮()1. 更新2份数据源 2. 更新金额 3. check 限制
  getTips = () => {
    if (this.checkClick()) return
    this.tipUpdateIdioms()
    this.updateCoins(REDUCE_RANGE)
  }
  checkClick = () => {
    const temp = [...this.idiomWorld]
    return (
      temp.filter(item => {
        return item.value !== ''
      }).length >= IDIOM_LENGTH
    )
  }
  // 提示更新展示的world
  tipUpdateWorld = (str: string) => {
    const temp = [...this.worldLists].map(item => {
      if (item.value === str) {
        return { ...item, types: TYPES.EMPTY }
      }
      return item
    })
    this.worldLists = temp
  }
  // 提示情况下更新成语展示
  tipUpdateIdioms = () => {
    const temp = [...this.idiomWorld]
    const emptyIndexArr = temp
      .map((item, index) => {
        if (item.value === '') {
          return index
        }
        return ''
      })
      .filter(i => {
        return i !== ''
      }) as number[]
    const idiomArr = this.idiomLists[this.currentLevel].name.split('')
    if (emptyIndexArr.length === ONE) {
      temp[emptyIndexArr[ZERO]!] = {
        ...temp[emptyIndexArr[ZERO]!],
        value: idiomArr[emptyIndexArr[ZERO]!],
        types: TYPES.FILL,
      }
      this.tipUpdateWorld(idiomArr[emptyIndexArr[ZERO]!])
      this.checkIdiomStatus(temp)
      return
    }
    // 如果长度大于 1 需要进行随机处理
    const radoms = generateRandom(getRandomSeed())(ZERO, emptyIndexArr.length)
    temp[emptyIndexArr[radoms]!] = {
      ...temp[emptyIndexArr[radoms]!],
      value: idiomArr[emptyIndexArr[radoms]!],
      types: TYPES.FILL,
    }
    this.tipUpdateWorld(idiomArr[emptyIndexArr[radoms]!])
    this.idiomWorld = temp
  }
  // 更新新的题目
  updateNextIdioms = (l = ONE) => {
    this.updateLevel(this.currentLevel + l)
    this.saveLevel(this.currentLevel)
    this.isShowPop = false
    this.initWorld()
    this.idiomWorld = [...INIT_IDIOS]
  }
  // 初始化信息
  initAllInfo = () => {
    this.isShowPop = false
    this.initWorldAndIdiom()
    this.handleAchievement(false, {})
  }
  // 成就相关逻辑
  handleAchievement = (s: boolean, info: Rewards) => {
    this.updateAchievementStatus(s)
    this.updateAchievementInfo(info)
  }
  // 打开或关闭成就模块
  updateAchievementStatus = (status: boolean) => {
    this.showAchievement = status
  }
  // 更新成就相关信息
  updateAchievementInfo = (info: Rewards) => {
    this.achievementInfo = info
  }
}
export default GameStore

// 注意联动逻辑的处理 数据A更新 -> 更新B // 数据B更新 -> 数据A
