import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { LinkManInfoInputFir } from './config'
import './index.scss'

interface PropsType {
  [names: string]: string | number | boolean
}
interface Props {
  data: {
    user_contact_info: string
  }
}

export class ContactInfo extends Component<Props> {
  render() {
    const { data } = this.props
    const newData = JSON.parse(data.user_contact_info)
    return (
      <div className="info-content-contact">
        {newData &&
          newData.map((item: PropsType, index: number) => {
            return <FormInputListUI config={LinkManInfoInputFir} data={item || {}} key={index} />
          })}
      </div>
    )
  }
}

const ContactInfoWrap = InfoWrapper('Contact Information')(ContactInfo)

export default ContactInfoWrap
