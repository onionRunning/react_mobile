import * as React from 'react'
import { shallow } from 'enzyme'
import { BlackOrder } from './index'
import Message from 'components/message'
import errs from 'global/errors'
import * as utils from './utils'
jest.mock('components/message')
Message.error = jest.fn()

describe('BlackOrder', () => {
  let component: any, props: any, ins: BlackOrder, getBlackReqs: any, addBlacksList: any
  props = {
    blacks: {
      clearblackMng: jest.fn(),
      getBlackMngLists: jest.fn(),
      addBlackMngOrder: jest.fn()
    },
    common: {
      composeLoading: jest.fn(),
      changeConfirm: jest.fn()
    },
    history: {
      push: jest.fn()
    }
  }
  beforeEach(() => {
    component = shallow(<BlackOrder {...props} />).dive()
    ins = component.instance()
    getBlackReqs = jest.spyOn(ins, 'getBlackReqs')
    addBlacksList = jest.spyOn(ins, 'addBlacksList')
  })
  it('ui render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    ins.componentDidMount()
    expect(getBlackReqs).toBeCalled()
  })
  it('handleFilter ', () => {
    expect(ins.handleFilter({ key: 'xx', value: '0' }))
    expect(ins.state.request.xx).toBe('0')
  })
  it('handleFilter3 ', async () => {
    await expect(ins.handleFilter({ key: 'operator_id', value: '' }))
    expect(ins.state.request.operator_id).toBe(0)
  })
  it('handleFilter4 ', async () => {
    await expect(ins.handleFilter({ key: 'operator_id', label: '123', value: '1' }))
    expect(ins.state.request.operator_name).toBe('123')
  })

  it('handleBtnClick', () => {
    ins.handleBtnClick('inquire')
    expect(getBlackReqs).toBeCalledWith({ page: 1 })
  })
  it('handleBtnClick2', () => {
    ins.handleBtnClick('add_black')
    expect(addBlacksList).toBeCalled()
  })
  it('tableChange', () => {
    const sorter: any = {
      column: '',
      order: 'ascend',
      field: 'test',
      columnKey: 'test'
    }
    const pag = {
      current: 2,
      pageSize: 10
    }
    let _: any
    ins.tableChange(pag, _, sorter)
    expect(getBlackReqs).toBeCalled()
    expect(ins.state.request.page).toBe(2)
  })
  it('tableChange2', () => {
    const sorter: any = {
      column: '',
      order: 'ascend',
      field: 'test',
      columnKey: ''
    }
    const pag = {
      current: 0,
      pageSize: 0
    }
    let _: any
    ins.tableChange(pag, _, sorter)
    expect(getBlackReqs).toBeCalled()
    expect(ins.state.request.page).toBe(1)
    expect(ins.state.request.per_page).toBe(10)
  })
  it('tempFunc', () => {
    ins.tempFunc()()
    expect(props.blacks.getBlackMngLists).toBeCalled()
  })
  it('getBlackReqs', () => {
    ins.getBlackReqs()
    expect(props.common.composeLoading).toBeCalled()
  })
  it('getBlacksList', () => {
    ins.getBlacksList()
    expect(props.blacks.getBlackMngLists).toBeCalled()
  })
  it('getProductDetail', () => {
    ins.getProductDetail()
  })
  it('getBlackPerson', () => {
    ins.getBlackPerson()
  })
  it('changeChose', () => {
    ins.changeChose([1], [{ key: 'value' }])
    expect(ins.state.chose).toEqual([{ key: 'value' }])
  })
  it('addBlacksList', async () => {
    await ins.setState({ chose: [] })
    await ins.addBlacksList()
    expect(Message.error).toBeCalledWith(errs.CHOOSE_ORDER_EMPTY)
  })
  it('addBlacksList 2', async () => {
    await ins.setState({ chose: [1] })
    await ins.addBlacksList()
    expect(props.common.changeConfirm).toBeCalledWith({
      show: true,
      title: utils.EXIT,
      text: utils.addText,
      onOk: ins.currentFunc,
      onCancel: ins.closeConfirm,
      showSelect: ins.showText
    })
  })
  it('currentFunc', () => {
    ins.currentFunc()
    expect(props.common.composeLoading).toBeCalledWith(ins.startAddblack)
  })
  it('closeConfirm', () => {
    ins.closeConfirm()
    expect(props.common.changeConfirm).toBeCalledWith({ show: false })
  })
  it('startAddblack', () => {
    ins.startAddblack()
    expect(props.blacks.addBlackMngOrder).toBeCalledWith(
      {
        blacklist_type: 'blacklist_type',
        operator_id: NaN,
        operator_name: null,
        order_nos: [],
        remark: ''
      },
      ins.successCb
    )
  })
  it('successCb', () => {
    ins.successCb()
    expect(props.common.changeConfirm).toBeCalledWith({ show: false })
  })
  it('initChose', () => {
    ins.initChose()
    expect(ins.state.checkRow).toEqual([])
  })
  it('componentWillUnmount', () => {
    ins.componentWillUnmount()
    expect(ins.state.checkRow).toEqual([])
    expect(ins.state.chose).toEqual([])
    expect(props.blacks.clearblackMng).toBeCalled()
  })
})
