import React, { Component } from 'react'
import { Select } from 'antd'
import { ModeOption } from 'antd/lib/select'
import './index.scss'
const Option = Select.Option

interface Props {
  application_status?: string
  onChange?: (s: any) => void
  name?: string
  mode?: ModeOption
  disabled?: boolean
  placeholder?: string
  options?: any[]
}

export class AntdSelect extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = { temp: false }
  }
  componentDidMount() {
    this.timeChange()
  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.application_status !== nextProps.application_status) {
      this.setState({ temp: false })
      this.startTimeout()
    }
  }
  startTimeout = () => {
    var timer
    clearTimeout(timer)
    timer = setTimeout(this.timeChange, 100)
  }
  timeChange = () => this.setState({ temp: true })

  handleChange = (value: any) => {
    const { onChange, name, mode } = this.props
    onChange!({ [name!]: mode ? value : [value] })
  }
  render() {
    const { disabled, placeholder, options, mode } = this.props
    return (
      <div className="antd-reason-select">
        <div className="antd-content" id="select-operate-reason">
          {this.state.temp && (
            <Select
              onChange={this.handleChange}
              style={{ width: 740 }}
              disabled={disabled}
              placeholder={placeholder}
              mode={mode}
            >
              {options &&
                options.map((item, index) => {
                  return (
                    <Option key={index} value={item.label}>
                      {item.label + ' '}
                      {item.value}
                    </Option>
                  )
                })}
            </Select>
          )}
        </div>
      </div>
    )
  }
}
export default AntdSelect
