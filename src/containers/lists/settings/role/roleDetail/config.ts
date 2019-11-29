import { btnType } from 'components/button'

export enum RouteType {
  Detail = 'detail',
  Add = 'add',
  Edit = 'edit'
}

export interface BtnItem {
  type: btnType
  label: string
  key: string
  id: string
}

export const addBtn: BtnItem[] = [
  { type: 'primary', label: 'Confirm', key: 'add', id: 'confirm-btn' },
  { type: 'gray', label: 'Cancel', key: 'return', id: 'cancel-btn' }
]

export const detailBtn: BtnItem[] = [{ type: 'primary', label: 'Return', key: 'return', id: 'return-btn' }]

export const editBtn: BtnItem[] = [
  { type: 'primary', label: 'Save', key: 'edit', id: 'save-btn' },
  { type: 'gray', label: 'Cancel', key: 'return', id: 'cancel-btn' }
]

export const BtnMap = {
  add: addBtn,
  detail: detailBtn,
  edit: editBtn
}

export interface PermissionsType {
  id: number
  name: string
  notes: string
  number: number
  parentNumber: number
  key?: number | string
  title?: string
  siblingsHasChild?: boolean
  children?: PermissionsType[]
}

export const showBreadcrumbName = (type: RouteType) => {
  switch (type) {
    case RouteType.Detail:
      return 'Inquire role'
    case RouteType.Add:
      return 'Add role'
    case RouteType.Edit:
      return 'Edit role'
    default:
      return type
  }
}

export const getbreadcrumbConfig = (type: RouteType) => [
  { path: `/auth/roles`, breadcrumbName: 'Setting(Role management)' },
  { path: `/auth/roles/${type}`, breadcrumbName: showBreadcrumbName(type) }
]
