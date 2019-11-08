export type TableSortType = 'ascend' | 'descend' | ''

export type SortType = 'asc' | 'desc' | ''

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
  frozen?: 'normal' | 'frozen'
}

export interface UserListItem {
  id: string
  name: string
  account: string
  phone: string
  created_time: string
  status: string
}
