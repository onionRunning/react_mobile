import React, { Component } from 'react'
import { noop } from 'lodash'

import Input, { Msg } from 'components/input'
import RangeInput, { Item } from 'components/rangeInput'
import Select, { ListItem } from 'components/select'
import TreeSelect from 'components/treeSelect'
import Search from 'components/search'
import DatePicker from 'components/datePicker'
import RangeDatePicker from 'components/rangeDatePicker'
import { TreeNode } from 'antd/lib/tree-select'
import { formType } from 'global/constants'
import styles from './index.module.scss'
import { Moment } from 'moment'
import { timeStampBeauty } from 'global/method'

type MixType = Msg & Item

interface BtnItem {
  text: string
  type: 'default' | 'primary' | 'black' | 'blue'
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
  onChange?: (...args: any) => any
  productSelectOptions?: ListItem[]
  operatorSelectOptions?: ListItem[]
}

class QueryCondition extends Component<Props> {
  static defaultProps = {
    data: [], // 默认数据为空
    onChange: noop // 输入筛选,或者改变筛选条件
  }
  render() {
    return <div className={styles.wrap}>{this.renderConditionInput()}</div>
  }
  // 渲染输入内容
  renderConditionInput = () => {
    const { data, onChange } = this.props
    return data.map(item => {
      switch (item.formType) {
        // 普通输入框
        case formType.INPUT:
          return (
            <div key={item.key} className={styles.item}>
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
            <div key={item.key} className={styles.item}>
              {item.label && <label className={styles.item_label}>{item.label}</label>}
              <Select
                keyWord={item.key}
                list={list}
                placeholder={item.placeholder}
                onChange={onChange}
                id={item.id}
                defaultValue={item.defaultValue}
              />
            </div>
          )
        case formType.TREE_SELECT:
          return (
            <div key={item.key} className={styles.item} id={item.key}>
              {item.label && <label className={styles.item_label}>{item.label}</label>}
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
            <div key={item.key} className={styles.item} id={item.key}>
              {item.label && <label className={styles.item_label}>{item.label}</label>}
              <DatePicker placeholder={item.placeholder} onChange={this.onChangeTime(item)} />
            </div>
          )
        // 时间范围选择
        case formType.RANGE_TIME:
          return <RangeDatePicker key={item.key} item={item} onChange={onChange} disabledDate={item.disabledDate} />
        default:
          return (
            // <div key={item.key} className={styles.item} id={item.key}>
            <div key={item.key} className={styles.item} id={item.key}>
              {item.label && <label className={styles.item_label}>{item.label}</label>}
              <Search
                placeholder={item.placeholder}
                maxLength={item.maxLength}
                onChange={this.onSearchChange(item)}
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
}

export default QueryCondition
