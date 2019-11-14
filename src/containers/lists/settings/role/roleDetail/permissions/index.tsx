import React from 'react'
import { PermissionsType } from '../config'
import PermissionsItem from './permissionsItem'
import { arrRemoveDuplicate, arrRemoveArr } from '../utils'
import './index.scss'

interface Props {
  isEdit: boolean
  permissionsTree: PermissionsType[]
  selectIds: number[]
  handleChangeSelect: (numArr: number[]) => void
}

export class Permissions extends React.Component<Props> {
  render() {
    const { permissionsTree, selectIds, isEdit } = this.props
    return (
      <div className="role-wrap">
        {permissionsTree.map((item, index) => {
          return (
            <PermissionsItem
              key={index}
              isEdit={isEdit}
              permissions={item}
              selectIds={selectIds}
              handleSelect={this.handleSelect}
              handleUnselect={this.handleUnselect}
            />
          )
        })}
      </div>
    )
  }

  handleSelect = (numArr: number[]) => {
    const { isEdit } = this.props
    if (!isEdit) return
    const { selectIds, handleChangeSelect } = this.props
    const allSelect = selectIds.concat(numArr)
    handleChangeSelect(arrRemoveDuplicate(allSelect))
  }

  handleUnselect = (unSelectArr: number[]) => {
    const { isEdit } = this.props
    if (!isEdit) return
    const { selectIds, handleChangeSelect } = this.props
    handleChangeSelect(arrRemoveDuplicate(arrRemoveArr(selectIds, unSelectArr)))
  }
}

export default Permissions
