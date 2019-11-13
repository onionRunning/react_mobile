import React from 'react'
import classNames from 'classnames'
import { PermissionsType } from '../../config'
import { getChildrenIds } from '../../utils'

interface Props {
  isEdit: boolean
  selectIds: number[]
  permissions: PermissionsType
  handleUnselect: (role: number[]) => void
  handleSelect: (num: number[]) => void
}

interface State {
  showChildren: boolean
}

export class RoleItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showChildren: true
    }
  }

  render() {
    const { permissions, selectIds, handleUnselect, isEdit } = this.props
    const { showChildren } = this.state
    return (
      <div className={classNames('role-item', permissions.siblingsHasChild ? 'has-child' : 'last-item')}>
        {permissions.children && permissions.children.length > 0 && (
          <span className="fold" onClick={this.handleToggle}>
            {showChildren ? '-' : '+'}
          </span>
        )}
        <div
          className={classNames('role', { select: this.isSelect(permissions.id), disabled: !isEdit })}
          onClick={this.toggleSelect(permissions)}
          id={`${permissions.number}`}
        >
          <span onClick={this.toggleSelect(permissions)}>{permissions.name}</span>
        </div>
        <div className="role-list-wrap">
          {showChildren &&
            permissions.children &&
            permissions.children.length > 0 &&
            permissions.children.map((item, index) => {
              return (
                <RoleItem
                  key={index}
                  isEdit={isEdit}
                  permissions={item}
                  selectIds={selectIds}
                  handleSelect={this.handleSelect}
                  handleUnselect={handleUnselect}
                />
              )
            })}
        </div>
      </div>
    )
  }
  handleToggle = () => {
    const { showChildren } = this.state
    this.setState({
      showChildren: !showChildren
    })
  }

  isSelect = (num: number) => {
    const { selectIds } = this.props
    return selectIds.some(_num => _num === num)
  }

  toggleSelect = (role: PermissionsType) => () => {
    if (this.isSelect(role.id)) {
      this.handleUnselect(role)
    } else {
      // 选中子规则
      const childrenIds = getChildrenIds(role)
      this.handleSelect(childrenIds)
    }
  }

  handleUnselect = (role: PermissionsType) => {
    const childrenIds = getChildrenIds(role)
    this.props.handleUnselect(childrenIds)
  }

  handleSelect = (numArr: number[]) => {
    const {
      permissions: { id }
    } = this.props
    //添加当前id(因为childrenIds中包括当前id,所以会重复push当前id,不过最后会做去重处理可忽略)
    numArr.push(id)
    this.props.handleSelect(numArr)
  }
}

export default RoleItem
