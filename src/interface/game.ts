export interface IdiomLists {
  // 成语名
  name: string
  // 描述
  description: string
}

export interface WorldItem {
  value: string
  types: string
  // 当前的编号
  id?: number
}

export interface Res<T> {
  success: boolean
  data: T
}
