import { btnType } from 'components/button'

export type Type = 'detail' | 'add' | 'edit'

export const TitleMap = {
  add: 'Add user',
  detail: 'User detail',
  edit: 'User edit'
}

export interface BtnItem {
  type: btnType
  label: string
  key: string
  id: string
}

export const addBtn: BtnItem[] = [
  { type: 'primary', label: 'OK', key: 'add', id: 'ok-btn' },
  { type: 'gray', label: 'Cancel', key: 'return', id: 'cancel-btn' }
]

export const detailBtn: BtnItem[] = [{ type: 'primary', label: 'Return', key: 'return', id: 'return-btn' }]

export const editBtn: BtnItem[] = [
  { type: 'primary', label: 'OK', key: 'edit', id: 'ok-btn' },
  { type: 'gray', label: 'Cancel', key: 'return', id: 'cancel-btn' }
]

export const BtnMap = {
  add: addBtn,
  detail: detailBtn,
  edit: editBtn
}

export interface InputItem {
  key: string
  value: string
}

export interface RoleItem {
  id?: number
  role_name?: string
  light?: boolean
}
