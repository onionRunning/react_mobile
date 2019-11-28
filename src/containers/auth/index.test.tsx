import React from 'react'
import Auth from './index'
import * as cons from './index'
import Details from 'containers/details'
import BlackLists from 'containers/lists/orders/blackLists'
import AddBlack from 'containers/lists/orders/addBlack'
import UserList from 'containers/lists/settings/user/userList'
import UserDetail from 'containers/lists/settings/user/userDetail'
import RoleList from 'containers/lists/settings/role/roleList'
import RoleDetail from 'containers/lists/settings/role/roleDetail'
import OrderLists from 'containers/lists/orders/orderLists'
import MyOrder from 'containers/lists/orders/myOrders'
import Lending from 'containers/lists/lendings'
import Repayments from 'containers/lists/repayments'
import { mockRouteProps } from 'test/mock'
import { ShallowWrapper, shallow } from 'enzyme'

describe('Auth', () => {
  const mockRoute = mockRouteProps({ showType: 'test' })
  const mockProps: any = {
    ...mockRoute,
    common: {},
    baseUrl: ''
  }
  let component: ShallowWrapper<Auth>, instance: Auth
  beforeEach(() => {
    component = shallow(<Auth {...mockProps} />)
    instance = component.instance() as Auth
  })

  it('render', () => {
    expect(component.find('Switch').length).toBeGreaterThan(0)
  })

  it('checkToken', () => {
    instance.checkToken('')
    expect(mockRoute.history.replace).toBeCalledWith('/login')
    instance.checkToken('token')
  })
  it('OrderDetails', async () => {
    const temp = await cons.getDetails()
    expect(temp.OrderDetails).toEqual(Details)
  })

  it('BlackLists', async () => {
    const temp = await cons.getBlackLists()
    expect(temp.BlackLists).toEqual(BlackLists)
  })

  it('BlackOrder', async () => {
    const temp = await cons.getAddBlack()
    expect(temp.default).toEqual(AddBlack)
  })

  it('UserList', async () => {
    const temp = await cons.getUserList()
    expect(temp.default).toEqual(UserList)
  })

  it('getUserDetail', async () => {
    const temp = await cons.getUserDetail()
    expect(temp.default).toEqual(UserDetail)
  })

  it('getRoleList', async () => {
    const temp = await cons.getRoleList()
    expect(temp.default).toEqual(RoleList)
  })

  it('getOrderLists', async () => {
    const temp = await cons.getOrderLists()
    expect(temp.default).toEqual(OrderLists)
  })
  it('getRoleDetail', async () => {
    const temp = await cons.getRoleDetail()
    expect(temp.default).toEqual(RoleDetail)
  })

  it('getMyOrder', async () => {
    const temp = await cons.getMyOrder()
    expect(temp.default).toEqual(MyOrder)
  })

  it('getLending', async () => {
    const temp = await cons.getLending()
    expect(temp.default).toEqual(Lending)
  })

  it('getRepayments', async () => {
    const temp = await cons.getRepayments()
    expect(temp.default).toEqual(Repayments)
  })
})
