export interface Pagination {
  current?: number
  page_size?: number
  total_page?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: string[]
  showTotal?: (...arg: any[]) => string
  position?: 'top' | 'bottom' | 'both'
}

export const defaultPagination: Pagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '30', '40', '50'],
  showTotal: (total: number) => `Total ${total} lines`,
  position: 'bottom'
}

// export type Pagination = typeof defaultPagination
