import React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import BreadCrumb from 'components/breadCrumb'
import Permissions from './permissions'
import Message from 'components/message'
import Btn from '../../user/userDetail/btn'
import { RouteType, getbreadcrumbConfig, PermissionsType, BtnMap } from './config'
import Role from 'stores/role'
import { RoleDetailRes, ProductList, PermissionsList } from 'interface/role'
import { Checkbox } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import styles from './index.module.scss'

const CheckboxGroup = Checkbox.Group

interface MatchParams {
  type: RouteType
  id: string
}

export interface Props extends RouteComponentProps<MatchParams> {
  role: Role
}

interface Request {
  name: string
  description: string
  checkedList: CheckboxValueType[]
  selectIds: number[]
}

export interface State {
  request: Request
  indeterminate: boolean
  checkAll: boolean
  productOption: any[]
  permissionsTree: PermissionsType[]
}

@inject('role')
@observer
class RoleDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        name: '',
        description: '',
        checkedList: [],
        selectIds: []
      },
      indeterminate: true,
      checkAll: false,
      productOption: [],
      permissionsTree: []
    }
  }

  componentDidMount = () => {
    this.init()
    this.getProductListData()
    this.getPermissionsListData()
  }

  render() {
    const { name, description, checkedList, selectIds } = this.state.request
    const { type } = this.props.match.params
    const { productOption, permissionsTree } = this.state
    return (
      <div className={styles.wrap}>
        <div className={styles.header_wrap}>
          <BreadCrumb routes={getbreadcrumbConfig(type)} {...this.props} />
        </div>
        <div className={styles.main_wrap}>
          <div className={styles.info_wrap}>
            <div className={styles.input_item}>
              <label htmlFor="role-name">Role name：</label>
              <input
                id="role-name"
                name="name"
                type="text"
                value={name}
                placeholder="please input role name"
                maxLength={30}
                disabled={type === RouteType.Detail}
                onChange={this.handleInputChange}
              />
            </div>
            <div className={styles.input_item}>
              <label htmlFor="role-description">Role description：</label>
              <input
                id="role-description"
                name="description"
                type="text"
                value={description}
                style={{ width: '480px' }}
                placeholder="please input description"
                maxLength={150}
                disabled={type === RouteType.Detail}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className={styles.product_wrap}>
            <div className={styles.product_labe}>support produce:</div>
            <div className={styles.check_wrap}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
                disabled={type === RouteType.Detail}
              >
                Check all
              </Checkbox>
              <CheckboxGroup
                options={productOption}
                value={checkedList}
                onChange={this.onChange}
                disabled={type === RouteType.Detail}
              />
            </div>
          </div>
          <div className={styles.split_line}>
            <span />
            <span>Permission setting</span>
            <span />
          </div>
          <div className={styles.permission_wrap}>
            <Permissions
              selectIds={selectIds}
              permissionsTree={permissionsTree}
              handleChangeSelect={this.handleChangeSelect}
              isEdit={type !== RouteType.Detail}
            />
          </div>
          <div className={styles.operate_wrap}>
            <Btn btnData={BtnMap[type]} clickProps={this.operateBtn} />
          </div>
        </div>
      </div>
    )
  }

  init = () => {
    const { id } = this.props.match.params
    id && this.getRoleDetailData(+id)
  }

  // 获取角色详情
  getRoleDetailData = async (id: number) => {
    await this.props.role.getRoleDetailDate({ id }, this.handleRoleDetailData)
  }

  handleRoleDetailData = (roleDetail: RoleDetailRes) => {
    const { role_name, notes, product_id = [], access_id = [] } = roleDetail
    const new_access_id = access_id.map(el => {
      return +el
    })
    this.setState({
      request: {
        ...this.state.request,
        name: role_name,
        description: notes,
        checkedList: [...product_id],
        selectIds: [...new_access_id]
      }
    })
  }

  // 获取产品列表数据
  getProductListData = async () => {
    await this.props.role.getProductListData(this.handleProductListData)
  }

  handleProductListData = (list: ProductList[]) => {
    const transfromList = list!.map(el => {
      return { id: el.id, label: el.name, value: el.id }
    })
    this.setState({
      productOption: [...transfromList]
    })
  }

  // 获取所有权限
  getPermissionsListData = async () => {
    await this.props.role.getPermissionsListData(this.handlePermissionsListData)
  }

  handlePermissionsListData = (list: PermissionsList[]) => {
    const permissionsTree = this.permissiontListToTree(list!)
    this.setState({
      permissionsTree: [...permissionsTree]
    })
  }

  permissiontListToTree = (data: PermissionsList[], parentNumber: string = '0') => {
    data = data.map(item => (item.parent_no ? item : { ...item, parent_no: '0' })) // 后台数据问题parent_no为空时视为0
    const childList = data.filter(item => item.parent_no === parentNumber)
    // 所有相邻的角色中是否有子角色
    let siblingsHasChild = false
    const tree = childList.map(item => {
      const { id, access_no, parent_no, name, notes } = item
      const obj: PermissionsType = {
        id: +id,
        name,
        notes,
        number: +access_no,
        parentNumber: +parent_no!
      }
      if (data.some(_item => _item.parent_no === item.access_no)) {
        siblingsHasChild = true
        obj.children = this.permissiontListToTree(data, item.access_no)
      }
      return obj
    })
    return tree.map(item => {
      return {
        ...item,
        siblingsHasChild
      }
    })
  }

  // 修改角色信息
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState({
      request: {
        ...this.state.request,
        [name]: value
      }
    })
  }

  // 全选产品
  onCheckAllChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target
    const { productOption } = this.state
    let selectedProduct: CheckboxValueType[] = []
    if (checked) {
      selectedProduct = productOption.map(el => {
        return el.value
      })
    }
    this.setState({
      request: {
        ...this.state.request,
        checkedList: selectedProduct
      },
      indeterminate: false,
      checkAll: checked
    })
  }

  // 单选产品
  onChange = (checkedList: CheckboxValueType[]) => {
    const { productOption } = this.state
    this.setState({
      request: {
        ...this.state.request,
        checkedList
      },
      indeterminate: !!checkedList.length && checkedList.length < productOption.length,
      checkAll: checkedList.length === productOption.length
    })
  }

  // 选择权限
  handleChangeSelect = (selectIds: number[]) => {
    this.setState({
      request: {
        ...this.state.request,
        selectIds
      }
    })
  }

  // 点击相应的详情操作
  operateBtn = (v: string) => {
    v === 'return' && this.goBack()
    v === 'add' && this.operateRole()
    v === 'edit' && this.operateRole()
  }

  // 返回上列表页
  goBack = () => {
    this.props.history.goBack()
  }

  operateRole = async () => {
    const { id, type } = this.props.match.params
    const { name, description, checkedList, selectIds } = this.state.request
    const errInfo = this.vertifyReq()
    if (errInfo) {
      Message.warning(errInfo)
      return
    }
    const request = {
      role_name: name,
      notes: description,
      access_id: selectIds,
      product_id: checkedList
    }
    type === RouteType.Add && (await this.props.role.addRole(request, this.goBack))
    type === RouteType.Edit && (await this.props.role.editRole({ ...request, id: +id }, this.goBack))
  }

  vertifyReq = () => {
    const { name, description, selectIds, checkedList } = this.state.request
    if (!name) return 'Please fill in the name!'
    if (!description) return 'Please fill in the description!'
    if (!selectIds.length) return 'Please select the permissions!'
    if (!checkedList.length) return 'Please select the product!'
  }
}

export default RoleDetail
