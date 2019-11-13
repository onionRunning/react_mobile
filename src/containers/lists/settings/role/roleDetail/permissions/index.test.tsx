import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Permissions from './index'

describe('Permissions', () => {
  const mockProps = {
    isEdit: true,
    permissionsTree: [
      {
        id: 1,
        name: 'test',
        notes: 'test',
        number: 1,
        parentNumber: 1,
        siblingsHasChild: false,
        children: []
      }
    ],
    selectIds: [],
    handleChangeSelect: jest.fn()
  }

  let component: ShallowWrapper<Permissions>, instance: Permissions

  beforeEach(() => {
    component = shallow(<Permissions {...mockProps} />)
    instance = component.instance() as Permissions
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleSelect', () => {
    instance.handleSelect([])
    expect(mockProps.handleChangeSelect).toBeCalled()
  })

  it('handleUnselect', () => {
    instance.handleUnselect([])
    expect(mockProps.handleChangeSelect).toBeCalled()
  })
})

describe('Permissions', () => {
  const mockProps = {
    isEdit: false,
    permissionsTree: [
      {
        id: 1,
        name: 'test',
        notes: 'test',
        number: 1,
        parentNumber: 1,
        siblingsHasChild: false,
        children: []
      }
    ],
    selectIds: [],
    handleChangeSelect: jest.fn()
  }

  let component: ShallowWrapper<Permissions>, instance: Permissions

  beforeEach(() => {
    component = shallow(<Permissions {...mockProps} />)
    instance = component.instance() as Permissions
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleSelect', () => {
    instance.handleSelect([])
    expect(instance.handleSelect([])).toBeUndefined()
  })

  it('handleUnselect', () => {
    expect(instance.handleUnselect([])).toBeUndefined()
  })
})
