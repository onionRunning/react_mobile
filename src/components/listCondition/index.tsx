import React, { Component } from 'react'
import { noop } from 'lodash'

import Input, { Msg } from 'components/input'
import RangeInput, { Item } from 'components/rangeInput'
import Select, { ListItem } from 'components/select'
// import { ValueType } from 'react-select/lib/types'
import TreeSelect from 'components/treeSelect'
import Search from 'components/search'
import DatePicker from 'components/datePicker'
import RangeDatePicker from 'components/rangeDatePicker'
import Switch from 'components/switch'

import { TreeNode } from 'antd/lib/tree-select'
import { formType } from 'global/constants'

import './index.scss'
import { Moment } from 'moment'
import { timeStampBeauty } from 'global/method'

type MixType = Msg & Item

interface BtnItem {
  text: string
  type: string
  className?: string
  authorityId?: string
  noShow?: boolean
  id?: string
}

export interface Data extends MixType {
  formType: number
  data?: ListItem[] | TreeNode[]
  maxLength?: number
  placeholder?: string
  disabledDate?: boolean
  value?: string | number
  selectOptionType?: string
  type?: string
  className?: string
  id?: string
}

interface Props {
  data: Data[]
  btnItems?: BtnItem[]
  onChange?: (...args: any) => any
  hasSwitch?: boolean
  switchChecked?: boolean
  handleSwitch?: (checked: boolean, event: MouseEvent) => any
  switchLabel?: string
  btnClick?: (type: string) => void
  productSelectOptions?: ListItem[]
  operatorSelectOptions?: ListItem[]
}

class QueryCondition extends Component<Props> {
  static defaultProps = {
    data: [], // 默认数据为空
    btnItems: [
      {
        type: 'query', // 默认是查询按钮
        text: 'Inquire', // 默认的按钮文字
        id: 'inquire-btn'
      }
    ],
    hasSwitch: false, // 默认没有开关
    switchChecked: false, // 开关打开关闭控制字段,默认关闭
    onChange: noop, // 输入筛选,或者改变筛选条件
    btnClick: noop, // 点击按钮时触发
    onSearch: noop, // 搜索框开始搜索
    handleSwitch: noop, // 处理开关按钮
    switchLabel: ''
  }
  render() {
    const { hasSwitch, switchChecked, handleSwitch, switchLabel } = this.props
    return (
      <div className="filter-wapper">
        {this.renderConditionInput()}
        {/* 按钮操作, 紧接在后面的操作按钮 */}
        <div className="filter-item filter-inquire-item">{this.renderButtons()}</div>
        {/* 操作开关 */}
        {hasSwitch && <Switch checked={switchChecked} onChangeSwitch={handleSwitch} label={switchLabel} id="switch" />}
      </div>
    )
  }
  // 渲染输入内容
  renderConditionInput = () => {
    const { data, onChange } = this.props
    return data.map(item => {
      switch (item.formType) {
        // 普通输入框
        case formType.INPUT:
          return (
            <div key={item.key} className="filter-item">
              <Input msg={item} onChange={onChange} maxLength={item.maxLength} />
            </div>
          )
        // 带范围的输入框
        case formType.RANGE_INPUT:
          return <RangeInput key={item.key} item={item} onChange={onChange} />
        // 下拉菜单
        case formType.SELECT:
          const list = this.getSelectOption(item)
          return (
            <div key={item.key} className="filter-item">
              {item.label && <label className="form-label-key">{item.label}</label>}
              <Select
                keyWord={item.key}
                list={list}
                placeholder={item.placeholder}
                onChange={onChange}
                id={item.id}
                required={item.required}
                defaultValue={item.selectOptionType === 'product' ? list[0] : null}
              />
            </div>
          )
        case formType.TREE_SELECT:
          return (
            <div key={item.key} className="filter-item" id={item.key}>
              {item.label && <label className="form-label-key">{item.label}</label>}
              <TreeSelect
                keyWord={item.key}
                list={item.data as TreeNode[]}
                placeholder={item.placeholder}
                onChange={onChange}
              />
            </div>
          )
        // 时间输入
        case formType.TIME:
          return (
            <div key={item.key} className="filter-item filter-item-search" id={item.key}>
              {item.label && <label className="form-label-key">{item.label}</label>}
              <DatePicker placeholder={item.placeholder} onChange={this.onChangeTime(item)} />
            </div>
          )
        // 时间范围选择
        case formType.RANGE_TIME:
          return <RangeDatePicker key={item.key} item={item} onChange={onChange} disabledDate={item.disabledDate} />
        default:
          return (
            <div key={item.key} className="filter-item" id={item.key}>
              {item.label && <label className="form-label-key">{item.label}</label>}
              <Search
                placeholder={item.placeholder}
                maxLength={item.maxLength}
                onChange={this.onSearchChange(item)}
                onSearch={this.onSearch(item)}
                id={item.id}
              />
            </div>
          )
      }
    })
  }

  // 获取下拉选项
  getSelectOption = (item: Data): ListItem[] => {
    const { productSelectOptions, operatorSelectOptions } = this.props
    switch (item.selectOptionType) {
      case 'product':
        return productSelectOptions!
      case 'operator':
        return operatorSelectOptions!
      default:
        return item.data! as ListItem[]
    }
  }

  // 渲染跟在后面的button按钮
  renderButtons = () => {
    const { btnItems } = this.props
    // 如果没有不需要按钮,则直接返回
    if (!btnItems) return ''
    // 否则渲染按钮列表
    return btnItems.map((btnItem, index) => {
      let className = !btnItem.className ? 'sub-btn btn' : `${btnItem.className} btn`
      if (btnItem.noShow) return ''
      return (
        <button type="button" key={index} className={className} onClick={this.btnClick(btnItem.type)} id={btnItem.id}>
          {btnItem.text}
        </button>
      )
    })
  }

  // 处理选中时间
  onChangeTime = (item: Data) => (value: Moment) => {
    let time = value ? timeStampBeauty(value.valueOf()) : ''
    this.props.onChange!({ key: item.key, value: time })
  }
  // 实时监听搜索框变化
  onSearchChange = (item: Data) => (value: any) => {
    let el = { ...item }
    el.value = value
    this.props.onChange!(el)
  }
  // 开始搜索
  onSearch = (item: Data) => (value: string) => {
    console.log(item, value)
    // this.props.onSearch()
  }

  btnClick = (type: string) => (e: React.MouseEvent) => {
    this.props.btnClick!(type)
    e.stopPropagation()
  }
}

export default QueryCondition
