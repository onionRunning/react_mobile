import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import UserDetail from './index'
import { Type } from './config'
import Message from 'components/message'

jest.mock('components/message')
Message.error = jest.fn()

describe('userdetail add', () => {
  const type: Type = 'add'
  const mockRoute = mockRouteProps({ type, id: '1' })
  const user: any = {
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
    const userDetail1 = {
      id: 110,
      name: '12545',
      phone: '5464644',
      email: '1fengyibo@mintechai.com',
      role_info: []
    }
    instance.handleUserDetailData(userDetail1)
    expect(instance.state.role_id).toEqual([])
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
    expect(Message.warning).toBeCalledWith('Please enter user name!')
    instance.operateBtn('edit')
    expect(Message.warning).toBeCalledWith('Please enter user name!')
  })

  it('operateUser', () => {
    instance.operateUser()
    expect(Message.warning).toBeCalledWith('Please enter user name!')
    instance.setState({
      request: {
        name: 'test',
        email: 'test@qq.com',
        phone: '13600000001'
      },
      role_id: [1]
    })
    instance.operateUser()
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
})

describe('userdetail edit', () => {
  const type: Type = 'edit'
  const mockRoute = mockRouteProps({ type, id: '1' })
  const user: any = {
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

  it('operateUser', () => {
    instance.operateUser()
    expect(Message.warning).toBeCalledWith('Please enter user name!')
    instance.setState({
      request: {
        name: 'test',
        email: 'test@qq.com',
        phone: '13600000001'
      },
      role_id: [1]
    })
    instance.operateUser()
    expect(mockProps.user.editUsers).toBeCalledWith(
      {
        id: 1,
        name: 'test',
        account: 'test@qq.com',
        email: 'test@qq.com',
        phone: '13600000001',
        role_id: [1]
      },
      instance.goBack
    )
  })
})
