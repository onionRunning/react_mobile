import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { LinkManInfoInputFir } from './config'
import './index.scss'

interface PropsType {
  [names: string]: string | number | boolean
}
interface Props {
  data: PropsType[]
}

export class ContactInfo extends Component<Props> {
  render() {
    const { data } = this.props
    return (
      <div className="info-content-contact">
        {data &&
          data.map((item: PropsType, index: number) => {
            return <FormInputListUI config={LinkManInfoInputFir} data={item || {}} key={index} />
          })}
      </div>
    )
  }
}

const ContactInfoWrap = InfoWrapper('Contact Information')(ContactInfo)

export default ContactInfoWrap
