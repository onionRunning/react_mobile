export interface Res<T> {
  success: boolean
  info: string
  data?: T
}
// test

export interface Page {
  page_size?: number
  total_page?: number
  total?: number
  current?: number
}
