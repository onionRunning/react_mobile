import { DispatchProp } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

export interface ObjType {
  [names: string]: string | number | boolean
}
export interface Params {
  order_no: string
  type: any
  a: string
}

// 公共Props
export type MixProps = DispatchProp & RouteComponentProps<Params>

export interface Res<T> {
  success: boolean
  info: string
  data: T
}
