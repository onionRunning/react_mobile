export enum RouteType {
  Detail = 'detail',
  Add = 'add',
  Edit = 'edit'
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
