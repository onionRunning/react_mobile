import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import RoleItem from './index'

describe('RoleItem siblingsHasChild true', () => {
  const mockProps = {
    isEdit: true,
    selectIds: [1, 2],
    permissions: {
      id: 1,
      name: 'test',
      notes: 'test',
      number: 1,
      parentNumber: 1,
      siblingsHasChild: true,
      children: [
        {
          id: 11,
          name: 'test11',
          notes: 'test11',
          number: 11,
          parentNumber: 1,
          siblingsHasChild: false,
          children: []
        }
      ]
    },
    handleUnselect: jest.fn(),
    handleSelect: jest.fn()
  }

  let component: ShallowWrapper<RoleItem>, instance: RoleItem

  beforeEach(() => {
    component = shallow(<RoleItem {...mockProps} />)
    instance = component.instance() as RoleItem
    instance.setState({
      showChildren: true
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleToggle', () => {
    instance.handleToggle()
    expect(instance.state.showChildren).toBe(false)
  })

  it('isSelect', () => {
    instance.isSelect(1)
    expect(instance.isSelect(1)).toBe(true)
  })

  it('toggleSelect', () => {
    const permissions = {
      id: 1,
      name: 'test',
      notes: 'test',
      number: 1,
      parentNumber: 1,
      siblingsHasChild: false,
      children: []
    }
    instance.toggleSelect(permissions)()
    instance.toggleSelect({ ...permissions, id: 3 })()
  })
})

describe('RoleItem siblingsHasChild false', () => {
  const mockProps = {
    isEdit: true,
    selectIds: [1, 2],
    permissions: {
      id: 1,
      name: 'test',
      notes: 'test',
      number: 1,
      parentNumber: 1,
      siblingsHasChild: false,
      children: [
        {
          id: 11,
          name: 'test11',
          notes: 'test11',
          number: 11,
          parentNumber: 1,
          siblingsHasChild: false,
          children: []
        }
      ]
    },
    handleUnselect: jest.fn(),
    handleSelect: jest.fn()
  }

  let component: ShallowWrapper<RoleItem>, instance: RoleItem

  beforeEach(() => {
    component = shallow(<RoleItem {...mockProps} />)
    instance = component.instance() as RoleItem
    instance.setState({
      showChildren: true
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
