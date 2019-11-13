import React, { Component } from 'react'
import InfoWrapper from 'containers/details/component/infoWrapper'
import FormInputListUI from '../../component/formInputListUI'
import { LinkManInfoInputFir, LinkManInfoInputTwo } from './config'
import './index.scss'

interface Props {
  data?: any
}

export class ContactInfo extends Component<Props> {
  render() {
    const { data } = this.props
    return (
      <div className="info-content-contact">
        <FormInputListUI config={LinkManInfoInputFir} data={data || {}} />
        <FormInputListUI config={LinkManInfoInputTwo} data={data || {}} />
      </div>
    )
  }
}

const ContactInfoWrap = InfoWrapper('Contact Information')(ContactInfo)

export default ContactInfoWrap
