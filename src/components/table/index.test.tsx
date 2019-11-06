import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Table from './index'

describe('Table has data', () => {
  const pagination = {
    current: 1
  }
  const tableData = [{ id: '1' }, {}]
  const props = {
    pagination,
    tableData
  }
  let component: ShallowWrapper<Table<any>>, instance: Table<any>
  beforeEach(() => {
    component = shallow(<Table {...props} />)
    instance = component.instance() as Table<any>
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('shouldComponentUpdate', () => {
    const nextProps = {
      tableData: [{ id: '1' }, {}],
      onChange: jest.fn()
    }
    expect(instance.shouldComponentUpdate(nextProps)).toBe(true)
  })
})

describe('Table no data', () => {
  const tableData: any[] = []
  const props = {
    tableData
  }
  let component: ShallowWrapper<Table<any>>
  beforeEach(() => {
    component = shallow(<Table {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
