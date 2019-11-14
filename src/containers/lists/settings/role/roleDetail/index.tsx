import React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import BreadCrumb from 'components/breadCrumb'
import { RouteType, getbreadcrumbConfig, PermissionsType } from './config'
// import { MixProps } from 'global/interface'
// import { isPropsChanged, getStateFromProps, getIsEdit, vertifyReq, choseProductArr } from './utils'
import { PermissionsList } from 'api/response'
import Permissions from './permissions'
import Role from 'stores/role'
import { ListItem } from 'components/select'
import { Checkbox } from 'antd'
import styles from './index.module.scss'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

const CheckboxGroup = Checkbox.Group

interface MatchParams {
  type: RouteType
  id: string
}

export interface Props extends RouteComponentProps<MatchParams> {
  role: Role
  roleName: string
  selectedIds: number[]
  roleDescription: string
  permissionsList: PermissionsList[]
  increaseNum: number
  product_id: number[]
  productList: ListItem[]
}

interface Request {
  name: string
  description: string
}

export interface State {
  request: Request
  indeterminate: boolean
  checkAll: boolean
  checkedList: any[]
  productOption: any[]
  selectIds: number[]
  // permissionsList: PermissionsList[]
  permissionsTree: PermissionsType[]
  //   increaseNum: number
  //   checkProductList: number[]
}

@inject('role')
@observer
class RoleDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      request: {
        name: '',
        description: ''
      },
      indeterminate: true,
      checkAll: false,
      checkedList: [],
      productOption: [],
      selectIds: [],
      // permissionsList: [],
      permissionsTree: []
      //   ...getStateFromProps(props)
    }
  }

  componentDidMount = () => {
    this.init()
    this.getProductListData()
    this.getPermissionsListData()
  }

  render() {
    const { name, description } = this.state.request
    const { type } = this.props.match.params
    const { productOption, selectIds, permissionsTree } = this.state
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
          <div className={styles.split_line}>
            <span />
            <span>Produce setting</span>
            <span />
          </div>
          <div className={styles.product_wrap}>
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
                value={this.state.checkedList}
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
    const roleDetail = await this.props.role.getRoleDetailDate({ id })
    const { role_name, notes, product_id, access_id } = roleDetail!
    this.setState({
      request: {
        ...this.state.request,
        name: role_name,
        description: notes
      },
      checkedList: [...product_id],
      selectIds: [...access_id]
    })
  }

  // 获取所有权限
  getPermissionsListData = async () => {
    const permissionsList = await this.props.role.getPermissionsListData()
    console.log(permissionsList)
    // this.setState({
    //     permissionsList: [...permissionsList!]
    // })
    const permissionsTree = this.permissiontListToTree(permissionsList!)
    console.log(permissionsTree)
    this.setState({
      permissionsTree: [...permissionsTree]
    })
  }

  permissiontListToTree = (data: PermissionsList[], parentNumber: number = 0) => {
    data = data.map(item => (item.parent_no ? item : { ...item, parent_no: 0 })) // 后台数据问题parent_no为空时视为0
    const childList = data.filter(item => item.parent_no === parentNumber)
    // 所有相邻的角色中是否有子角色
    let siblingsHasChild = false
    const tree = childList.map(item => {
      const { id, access_no, parent_no, name, notes } = item
      const obj: PermissionsType = {
        id,
        name,
        notes,
        number: access_no,
        parentNumber: parent_no
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

  // 获取产品列表数据
  getProductListData = async () => {
    const list = await this.props.role.getProductListData()
    const transfromList = list!.map(el => {
      return { id: el.id, label: el.name, value: el.id }
    })
    this.setState({
      productOption: [...transfromList]
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
    let selectedProduct: string[] = []
    if (checked) {
      selectedProduct = productOption.map(el => {
        return el.value
      })
    }
    this.setState({
      checkedList: selectedProduct,
      indeterminate: false,
      checkAll: checked
    })
  }

  // 单选产品
  onChange = (checkedList: CheckboxValueType[]) => {
    console.log(checkedList)
    const { productOption } = this.state
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < productOption.length,
      checkAll: checkedList.length === productOption.length
    })
  }

  // 选择权限
  handleChangeSelect = (selectIds: number[]) => {
    this.setState({
      selectIds: [...selectIds]
    })
  }
}

export default RoleDetail
