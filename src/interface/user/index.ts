export type TableSortType = 'ascend' | 'descend' | ''

export type SortType = 'asc' | 'desc' | ''

export type StatusType = 'normal' | 'frozen'

export interface Pagination {
  current: number
  page_size: number
  total: number
}

export interface UserListReq {
  page: number
  per_page: number
  sort?: SortType
  search?: string
  frozen?: StatusType
}

export interface UserListItem {
  id: number
  name: string
  account: string
  email: string
  phone: string
  created_time: number
  status: StatusType
}

export interface ChangeUserReq {
  id: number
  frozen: StatusType
}

export const Type = {
  DETAIL: 'detail',
  ADD: 'add',
  EDIT: 'edit'
}

export interface UserDetaiReq {
  id: number
}

export interface UserDetailRes {
  id: number
  name: string
  phone: string
  email: string
  role_info: RoleInfoItem[]
}

export interface RoleInfoItem {
  id: number
}

export interface RoleListReq {
  page: number
  per_page: number
  search?: string
  sort?: SortType
}

export interface RoleListItem {
  id: number
  role_name: string
}

export interface RoleListCheckBoxItem {
  value?: number
  label?: string
}

export interface AddUsersReq {
  name: string
  account: string
  email: string
  phone: string
  role_id: number[]
}

export interface EditUsersReq {
  id: number
  name: string
  phone: string
  role_id: number[]
}
