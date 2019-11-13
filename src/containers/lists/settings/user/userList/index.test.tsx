import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { UserListItem } from 'interface/user'
import User from './index'
import UserStore from 'stores/user'

describe('userlist', () => {
  const mockRoute = mockRouteProps({})
  const user: UserStore = {
    userList: [
      {
        account: 'lbbtest@qq.com',
        created_time: 1572922927,
        email: 'lbbtest@qq.com',
        id: 107,
        name: 'lbbtest@qq.com',
        phone: '127253572182',
        status: 'normal'
      }
    ],
    pagination: {
      current: 1,
      page_size: 10,
      total: 0
    },
    getUserListData: jest.fn(),
    changeUserStatus: jest.fn(),
    getRoleListData: jest.fn(),
    getUserDetailData: jest.fn(),
    addUsers: jest.fn(),
    editUsers: jest.fn()
  }
  const mockProps = {
    user,
    ...mockRoute
  }
  let component: ShallowWrapper<User>, instance: User
  beforeEach(() => {
    component = shallow(<User {...mockProps} />).dive()
    instance = component.instance() as User
    instance.setState({
      request: {
        page: 1,
        per_page: 10,
        sort: 'desc'
      }
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderOperate', () => {
    const record: UserListItem = {
      account: 'lbbtest@qq.com',
      created_time: 1572922927,
      email: 'lbbtest@qq.com',
      id: 107,
      name: 'lbbtest@qq.com',
      phone: '127253572182',
      status: 'normal'
    }
    expect(instance.renderOperate(record.status, record, 0).type).toEqual('div')
  })

  it('getUserList', () => {
    instance.getUserList()
    expect(mockProps.user.getUserListData).toBeCalledWith(instance.state.request)
  })

  it('handleChange', () => {
    const item = {
      key: 'status',
      value: 'normal'
    }
    instance.handleChange(item)
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      status: 'normal'
    })
  })

  it('handleBtnclick', () => {
    instance.handleBtnclick('inquire')
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      page: 1
    })
    instance.handleBtnclick('add')
    expect(mockProps.history.push).toBeCalledWith('/auth/users_page/add')
  })

  it('handleClickInquire', () => {
    instance.handleClickInquire()
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      page: 1
    })
  })

  it('handleClickAdd', () => {
    instance.handleClickAdd()
    expect(mockProps.history.push).toBeCalledWith('/auth/users_page/add')
  })

  it('operateUser', () => {
    instance.operateUser(0, 'normal')()
    expect(mockProps.user.changeUserStatus).toBeCalledWith(
      {
        id: 0,
        frozen: 'frozen'
      },
      instance.getUserList
    )
  })

  it('handleTableChange', () => {
    const pagination = {
      current: 1,
      pageSize: 10
    }
    const filters: any = {}
    const sorter: any = { order: 'descend' }
    instance.handleTableChange(pagination, filters, sorter)
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      page: 1,
      per_page: 10,
      sort: 'desc'
    })
  })

  it('transformStatus', () => {
    expect(instance.transformStatus('normal')).toBe('freeze')
    expect(instance.transformStatus('frozen')).toBe('unfreeze')
  })

  it('transformSort', () => {
    expect(instance.transformSort('')).toBe('')
    expect(instance.transformSort('descend')).toBe('desc')
    expect(instance.transformSort('ascend')).toBe('asc')
  })

  it('getOppositeStatus', () => {
    expect(instance.getOppositeStatus('normal')).toBe('frozen')
    expect(instance.getOppositeStatus('frozen')).toBe('normal')
  })
})
