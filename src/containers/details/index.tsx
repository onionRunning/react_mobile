import React, { Component } from 'react'
import LoanInfo from './detailBottom/loanInfo'
import SMSRecord from './detailBottom/smsRecord'

class Details extends Component {
  render() {
    return (
      <div>
        <LoanInfo />
        <SMSRecord />
      </div>
    )
  }
}

export default Details
