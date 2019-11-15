import React, { Component } from 'react'
import InfoWrapper from 'containers/ndetails/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { WorkInfoInput } from './config'
import './index.scss'

interface WorkData {
  address_in_company: string
  base_user_id: number
  career: string
  company: string
  company_detailed_address: string
  created_at: string
  deleted_at: null
  id: number
  payday_first: string
  payday_second: string
  salary: string
  tel_in_company: string
  updated_at: string
  years_in_company: string
}
interface Props {
  data?: any
}
export class WorkInfo extends Component<Props> {
  render() {
    return (
      <div className="info-content-work">
        <FormInputListUI config={WorkInfoInput} data={this.props.data!} />
      </div>
    )
  }
}

const WorkInfoWrap = InfoWrapper('Work Information')(WorkInfo)

export default WorkInfoWrap
