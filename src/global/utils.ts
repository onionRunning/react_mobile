import { INIT_NUMBER, INIT_WORLD, LEVEL_REWARDS } from './const'
const { ZERO, ONE, RANDOM_WORLD, RANDOM_ONE, RANDOM_THR, RANDOM_TWO } = INIT_NUMBER

// 随机函数
export const generateRandom = (seed: number) => {
  return (min = ZERO, max = ONE) => {
    seed = (seed * RANDOM_ONE + RANDOM_TWO) % RANDOM_THR
    const rnd = seed / RANDOM_THR
    return Math.floor(min + rnd * (max - min))
  }
}

// 数组随机排列
export function randomArray<T>(arr: T[], seed: number): T[] {
  arr = [...arr]
  const result = []
  const random = generateRandom(seed)
  while (arr.length > ZERO) {
    const t = random(ZERO, arr.length)
    result.push(arr.splice(t, ONE)[ZERO])
  }
  return result
}

// 随机取 WORLD 里取 （0） - (977 -21)
export const getRandomWorld = (seed: number) => {
  const randomFunc = generateRandom(seed)
  const randomIndex = randomFunc(ZERO, INIT_WORLD.length - RANDOM_WORLD)
  return [...INIT_WORLD].splice(randomIndex, RANDOM_WORLD)
}

// 获取随机seed
export const getRandomSeed = () => {
  return new Date().getTime()
}

// 判断类型是字符串
export const isString = <T>(s: T): boolean => {
  return Object.prototype.toString.call(s) === '[object String]'
}

// 判断类型是object
export const isObject = <T>(s: T): boolean => {
  return Object.prototype.toString.call(s) === '[object Object]'
}

// 获取奖励等级 以及 各个等级对应的奖励金额
interface Rewards {
  reward: number
  currentLevel: number
  rewardLevel: number
}
// 触发按钮点击下一题时才触发
export const getRewardsInfo = () => {
  const records: Rewards[] = []
  LEVEL_REWARDS.reduce((cur, pre, index) => {
    records.push({ reward: pre, currentLevel: cur + pre, rewardLevel: index })
    return cur + pre
  }, ZERO)
  return records
}
