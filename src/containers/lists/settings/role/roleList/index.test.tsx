import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import RoleList from './index'

describe('userlist', () => {
  const mockRoute = mockRouteProps({})
  const role: any = {
    getRoleListData: jest.fn()
  }
  const mockProps = {
    ...mockRoute,
    role
  }
  let component: ShallowWrapper<RoleList>, instance: RoleList
  beforeEach(() => {
    component = shallow(<RoleList {...mockProps} />).dive()
    instance = component.instance() as RoleList
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
    const record = {
      created_time: '1574844744',
      id: 1,
      notes: 'Review of the order',
      role_name: 'Reviewer'
    }
    expect(instance.renderOperate('', record).type).toEqual('div')
  })

  it('getRoleList', () => {
    instance.getRoleList()
    expect(mockProps.role.getRoleListData).toBeCalledWith({
      ...instance.state.request
    })
  })

  it('handleChange', () => {
    instance.handleChange({
      key: 'search',
      value: 'test'
    })
    expect(instance.state.request.search).toBe('test')
  })

  it('handleBtnclick', () => {
    instance.handleBtnclick('inquire')
    expect(instance.state.request.page).toBe(1)
    expect(mockProps.role.getRoleListData).toBeCalledWith({
      ...instance.state.request
    })
    instance.handleBtnclick('add')
    expect(mockProps.history.push).toBeCalledWith('/auth/roles_page/add')
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
})
