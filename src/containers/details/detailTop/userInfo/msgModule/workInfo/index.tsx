import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { WorkInfoInput } from './config'
import './index.scss'

interface PropsType {
  [names: string]: string | number | boolean | Function
}
interface Props {
  data: PropsType
}
export class WorkInfo extends Component<Props> {
  render() {
    const { data } = this.props
    return (
      <div className="info-content-work">
        <FormInputListUI config={WorkInfoInput} data={data} />
      </div>
    )
  }
}

const WorkInfoWrap = InfoWrapper('Work Information')(WorkInfo)

export default WorkInfoWrap
