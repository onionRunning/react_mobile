// import { Props } from './index'
import { PermissionsType } from './config'

// 前面数组删除后面数组中包含的值
export const arrRemoveArr = (originArr: number[], removeArr: number[]) => {
  return originArr.filter(item => !removeArr.some(_item => item === _item))
}

// 数组去重
export const arrRemoveDuplicate = (arr: number[]) => {
  return Array.from(new Set(arr))
}

// 获取所有子节点的id(包括自己的id)
export const getChildrenIds = (role: PermissionsType, idArr: number[] = []) => {
  idArr.push(role.id)
  if (role.children) {
    role.children.forEach(_role => {
      getChildrenIds(_role, idArr)
    })
  }
  return idArr
}
