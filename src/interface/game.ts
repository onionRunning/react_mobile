export interface IdiomLists {
  // 成语名
  name: string
  // 描述
  description: string
}

export interface Res<T> {
  success: boolean
  data: T
}
