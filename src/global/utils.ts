import { INIT_NUMBER, INIT_WORLD } from './const'
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

export const isString = (s: any) => {
  return Object.prototype.toString.call(s) === '[object String]'
}
