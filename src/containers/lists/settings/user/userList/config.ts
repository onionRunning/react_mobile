import { TableTile } from 'global/interface'
import { formType } from 'global/constants'
import { UserListItem } from 'interface/user'
import { transformTime } from 'global/method'

interface BtnItem {
  text: string
  key: string
  type: 'default' | 'primary' | 'black' | 'blue'
  className?: string
  authorityId?: string
  noShow?: boolean
  id?: string
}

export const statusType = {
  NORMAL: 'normal',
  FROZEN: 'frozen'
}

export const condition = [
  {
    formType: formType.SEARCH,
    key: 'search',
    maxLength: 100, // 允许输入的最大长度
    placeholder: 'Search for loan ID, Name, Id number',
    id: 'search'
  },
  {
    formType: formType.SELECT,
    label: 'Status:',
    key: 'frozen',
    data: [
      {
        label: 'normal',
        value: 'normal'
      },
      {
        label: 'frozen',
        value: 'frozen'
      }
    ],
    id: 'status'
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
    text: 'Add user',
    id: 'add-user-btn'
  }
]

export const getTableTitle = (
  render: (text: string, record: UserListItem, index: number) => React.ReactNode
): TableTile[] => [
  {
    align: 'center',
    title: 'User ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    align: 'center',
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    align: 'center',
    title: 'Email',
    dataIndex: 'account',
    key: 'account'
  },
  {
    align: 'center',
    title: 'Cellphone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    align: 'center',
    title: 'Creation time',
    dataIndex: 'created_time',
    sorter: true,
    defaultSortOrder: 'descend',
    key: 'created_time',
    render: transformTime
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    align: 'center',
    title: 'Operating',
    dataIndex: '',
    key: 'operzating',
    render
  }
]
