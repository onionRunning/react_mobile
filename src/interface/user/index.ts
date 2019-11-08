export type TableSortType = 'descend' | 'ascend' | ''

export type SortType = 'desc' | 'asc' | ''

export interface Pagination {
  current: number
  pageSize: number
  total: number
}

export interface UserListReq {
  page: number
  per_page: number
  sort: SortType
  search?: string
  frozen?: 'frozen' | 'normal'
}

export interface UserListReq {
  page: number
  per_page: number
  sort: SortType
  search?: string
  frozen?: 'frozen' | 'normal'
}

export interface UserListItem {
  id: number
  name: string
  account: string
  phone: string
  created_time: string
  email: string
  status: 'frozen' | 'normal'
}

export interface ChangeUserStatueReq {
  id: number
  frozen: 'frozen' | 'normal'
}
