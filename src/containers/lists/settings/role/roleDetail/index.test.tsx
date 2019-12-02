import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { RouteType } from './config'
import RoleDetail from './index'

describe('RoleDetail add', () => {
  const mockRoute = mockRouteProps({ type: RouteType.Add, id: '1' })
  const role: any = {
    getRoleDetailDate: jest.fn(),
    getProductListData: jest.fn(),
    getPermissionsListData: jest.fn(),
    addRole: jest.fn(),
    editRole: jest.fn()
  }

  const mockProps = {
    role,
    ...mockRoute
  }
  let component: ShallowWrapper<RoleDetail>, instance: RoleDetail
  beforeEach(() => {
    component = shallow(<RoleDetail {...mockProps} />).dive()
    instance = component.instance() as RoleDetail
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getRoleDetailData', () => {
    instance.getRoleDetailData(1)
    expect(mockProps.role.getRoleDetailDate).toBeCalledWith({ id: 1 }, instance.handleRoleDetailData)
  })

  it('handleRoleDetailData', () => {
    const data: any = {
      created_time: '1574844744',
      id: '2',
      notes: 'Review of the order',
      role_name: 'Reviewer'
    }
    instance.handleRoleDetailData(data)
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      name: 'Reviewer',
      description: 'Review of the order',
      checkedList: [],
      selectIds: []
    })
    instance.handleRoleDetailData({
      access_id: ['1', '6', '7', '8', '9'],
      created_time: '1574844744',
      id: '2',
      notes: 'Review of the order',
      product_id: ['1', '2'],
      role_name: 'Reviewer'
    })
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      name: 'Reviewer',
      description: 'Review of the order',
      checkedList: ['1', '2'],
      selectIds: [1, 6, 7, 8, 9]
    })
  })

  it('getProductListData', () => {
    instance.getProductListData()
    expect(mockProps.role.getProductListData).toBeCalledWith(instance.handleProductListData)
  })

  it('handleProductListData', () => {
    instance.handleProductListData([{ id: '1', name: 'JetPeso' }])
    expect(instance.state.productOption).toEqual([{ id: '1', label: 'JetPeso', value: '1' }])
  })

  it('getPermissionsListData', () => {
    instance.getPermissionsListData()
    expect(mockProps.role.getPermissionsListData).toBeCalledWith(instance.handlePermissionsListData)
  })

  it('handlePermissionsListData', () => {
    const list = [
      { access_no: '1', id: '1', name: 'Order', notes: '订单模块' },
      { access_no: '101', id: '6', name: 'Order list', notes: '订单列表', parent_no: '1' }
    ]
    instance.handlePermissionsListData(list)
    expect(instance.state.permissionsTree).toEqual([
      {
        id: 1,
        name: 'Order',
        notes: '订单模块',
        number: 1,
        parentNumber: 0,
        siblingsHasChild: true,
        children: [
          {
            id: 6,
            name: 'Order list',
            notes: '订单列表',
            number: 101,
            parentNumber: 1,
            siblingsHasChild: false
          }
        ]
      }
    ])
  })

  it('handleInputChange', () => {
    const e: any = {
      target: {
        name: 'name',
        value: 'test'
      }
    }
    instance.handleInputChange(e)
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      name: 'test'
    })
  })

  it('onCheckAllChange', () => {
    instance.setState({
      productOption: [{ id: '1', label: 'JetPeso', value: '1' }, { id: '2', label: 'Peso2Go', value: '2' }]
    })
    const e: any = {
      target: {
        checked: true
      }
    }
    instance.onCheckAllChange(e)
    expect(instance.state.checkAll).toBe(true)
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      checkedList: ['1', '2']
    })
    const e1: any = {
      target: {
        checked: false
      }
    }
    instance.onCheckAllChange(e1)
    expect(instance.state.checkAll).toBe(false)
  })

  it('onChange', () => {
    instance.setState({
      productOption: [{ id: '1', label: 'JetPeso', value: '1' }, { id: '2', label: 'Peso2Go', value: '2' }]
    })
    instance.onChange(['1'])
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      checkedList: ['1']
    })
  })

  it('handleChangeSelect', () => {
    instance.handleChangeSelect([1])
    expect(instance.state.request).toEqual({
      ...instance.state.request,
      selectIds: [1]
    })
  })

  it('operateBtn', () => {
    instance.operateBtn('return')
    expect(mockProps.history.goBack).toBeCalled()
    instance.operateBtn('add')
  })

  it('operateRole', () => {
    instance.setState({
      request: {
        name: 'test',
        description: 'test',
        checkedList: ['1'],
        selectIds: [1]
      }
    })
    instance.operateRole()
    expect(mockProps.role.addRole).toBeCalledWith(
      {
        role_name: 'test',
        notes: 'test',
        product_id: ['1'],
        access_id: [1]
      },
      instance.goBack
    )
  })

  it('vertifyReq', () => {
    expect(instance.vertifyReq()).toBe('Please fill in the name!')
    instance.setState({
      request: {
        ...instance.state.request,
        name: 'test'
      }
    })
    expect(instance.vertifyReq()).toBe('Please fill in the description!')
    instance.setState({
      request: {
        ...instance.state.request,
        description: 'test'
      }
    })
    expect(instance.vertifyReq()).toBe('Please select the permissions!')
    instance.setState({
      request: {
        ...instance.state.request,
        selectIds: [1]
      }
    })
    expect(instance.vertifyReq()).toBe('Please select the product!')
  })
})

describe('RoleDetail edit', () => {
  const mockRoute = mockRouteProps({ type: RouteType.Edit, id: '1' })
  const role: any = {
    getRoleDetailDate: jest.fn(),
    getProductListData: jest.fn(),
    getPermissionsListData: jest.fn(),
    addRole: jest.fn(),
    editRole: jest.fn()
  }

  const mockProps = {
    role,
    ...mockRoute
  }
  let component: ShallowWrapper<RoleDetail>, instance: RoleDetail
  beforeEach(() => {
    component = shallow(<RoleDetail {...mockProps} />).dive()
    instance = component.instance() as RoleDetail
  })

  it('operateBtn', () => {
    instance.operateBtn('edit')
  })

  it('operateRole', () => {
    instance.setState({
      request: {
        name: 'test',
        description: 'test',
        checkedList: ['1'],
        selectIds: [1]
      }
    })
    instance.operateRole()
    expect(mockProps.role.editRole).toBeCalledWith(
      {
        id: 1,
        role_name: 'test',
        notes: 'test',
        product_id: ['1'],
        access_id: [1]
      },
      instance.goBack
    )
  })
})
