import { TableTile } from 'global/interface'
import { formType, BtnItem } from 'global/constants'
import { transformTime } from 'global/method'
import { RoleListItem } from 'interface/role'

export const condition = [
  {
    formType: formType.SEARCH,
    key: 'search',
    maxLength: 100, // 允许输入的最大长度
    placeholder: 'Search for role name',
    id: 'search'
  }
]

export const btnItems: BtnItem[] = [
  {
    type: 'primary',
    key: 'inquire',
    text: 'Inquire',
    id: 'inquire-btn'
  },
  {
    type: 'blue',
    key: 'add',
    text: 'Add role',
    id: 'add-role-btn'
  }
]

export const getTableTitle = (
  render: (text: string, record: RoleListItem, index: number) => React.ReactNode
): TableTile[] => [
  {
    align: 'center',
    title: 'Loan ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    align: 'center',
    title: 'Role name',
    dataIndex: 'role_name',
    key: 'role_name'
  },
  {
    align: 'center',
    title: 'Role description',
    dataIndex: 'notes',
    key: 'notes'
  },
  {
    align: 'center',
    title: 'Create time',
    dataIndex: 'created_time',
    key: 'created_time',
    defaultSortOrder: 'descend',
    sorter: true,
    render: transformTime
  },
  {
    align: 'center',
    title: 'Operating',
    dataIndex: '',
    key: 'operzating',
    render
  }
]
