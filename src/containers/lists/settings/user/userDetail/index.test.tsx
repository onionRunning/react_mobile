import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import UserDetail from './index'
import UserStore from 'stores/user'
import { Type } from './config'

describe('userlist', () => {
  const type: Type = 'detail'
  const mockRoute = mockRouteProps({ type, id: '1' })
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
    ...mockRoute,
    user
  }
  let component: ShallowWrapper<UserDetail>, instance: UserDetail
  beforeEach(() => {
    component = shallow(<UserDetail {...mockProps} />).dive()
    instance = component.instance() as UserDetail
    instance.setState({
      request: {
        name: '',
        phone: '',
        email: ''
      },
      roleList: [],
      role_id: []
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('init', () => {
    instance.init()
    expect(mockProps.user.getUserDetailData).toBeCalledWith({ id: 1 }, instance.handleUserDetailData)
  })

  it('getUserDetailData', () => {
    instance.getUserDetailData(1)
    expect(mockProps.user.getUserDetailData).toBeCalledWith({ id: 1 }, instance.handleUserDetailData)
  })

  it('handleUserDetailData', () => {
    const userDetail = {
      id: 110,
      name: '12545',
      phone: '5464644',
      email: '1fengyibo@mintechai.com',
      role_info: [{ id: 3 }]
    }
    instance.handleUserDetailData(userDetail)
    expect(instance.state.role_id).toEqual([3])
    expect(instance.state.request).toEqual({
      name: '12545',
      phone: '5464644',
      email: '1fengyibo@mintechai.com'
    })
  })

  it('getRoleListData', () => {
    instance.getRoleListData()
    expect(mockProps.user.getRoleListData).toBeCalledWith(
      {
        page: 1,
        per_page: 1000
      },
      instance.handleRoleListData
    )
  })

  it('handleRoleListData', () => {
    const roleList = [{ id: 1, role_name: 'admin' }]
    instance.handleRoleListData(roleList)
    expect(instance.state.roleList).toEqual([{ label: 'admin', value: 1 }])
  })

  it('handleInputChange', () => {
    instance.handleInputChange({
      key: 'name',
      value: 'test'
    })
    expect(instance.state.request.name).toBe('test')
  })

  it('handleChange', () => {
    instance.handleChange([1])
    expect(instance.state.role_id).toEqual([1])
  })

  it('operateBtn', () => {
    instance.operateBtn('return')
    expect(mockProps.history.goBack).toBeCalled()
    instance.operateBtn('add')
    // expect(mockProps.user.addUsers).toBeCalledTimes(1)
    instance.operateBtn('edit')
    // expect(mockProps.user.editUsers).toBeCalledTimes(1)
  })

  it('addUsers', () => {
    instance.editUsers()
    instance.setState({
      request: {
        name: 'test',
        email: 'test@qq.com',
        phone: '13600000001'
      },
      role_id: [1]
    })
    instance.addUsers()
    expect(mockProps.user.addUsers).toBeCalledWith(
      {
        name: 'test',
        account: 'test@qq.com',
        email: 'test@qq.com',
        phone: '13600000001',
        role_id: [1]
      },
      instance.goBack
    )
  })

  it('editUsers', () => {
    instance.editUsers()
    instance.setState({
      request: {
        name: 'test',
        email: 'test@qq.com',
        phone: '13600000001'
      },
      role_id: [1]
    })
    instance.editUsers()
    expect(mockProps.user.editUsers).toBeCalledWith(
      {
        id: 1,
        name: 'test',
        phone: '13600000001',
        role_id: [1]
      },
      instance.goBack
    )
  })
})
