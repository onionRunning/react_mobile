export enum relationShip {
  SELF = 'Self',
  SELF2 = 'Self2'
}

export const ANSWERED = 'Answered'

export const selfAnswer = [
  {
    label: 'Client answered',
    value: 'Client answered'
  },
  {
    label: 'Non client answered',
    value: 'Non client answered'
  },
  {
    label: 'Client canceled loan',
    value: 'Client canceled loan'
  },
  {
    label: 'Client was verified',
    value: 'Client was verified'
  },
  {
    label: 'Client was not verified',
    value: 'Client was not verified'
  },
  {
    label: 'Client refuse to undergo verification',
    value: 'Client refuse to undergo verification'
  },
  {
    label: 'Client has another phone NO.',
    value: 'Client has another phone NO.'
  }
]

export const contactAnswer = [
  {
    label: 'Reference answered',
    value: 'Reference answered'
  },
  {
    label: 'Non reference answered',
    value: 'Non reference answered'
  },
  {
    label: 'Reference does not know the client',
    value: 'Reference does not know the client'
  },
  {
    label: 'Reference opposed client’s loan',
    value: 'Reference opposed client’s loan'
  },
  {
    label: 'Reference refused to be the client’s reference',
    value: 'Reference refused to be the client’s reference'
  },
  {
    label: 'Reference feedbacks that the client has other risks',
    value: 'Reference feedbacks that the client has other risks'
  },
  {
    label: 'Reference and client has the same phone NO.',
    value: 'Reference and client has the same phone NO.'
  },
  {
    label: 'Reference and client has a similar voice',
    value: 'Reference and client has a similar voice'
  },
  {
    label: 'Reference and client information is inconsistent',
    value: 'Reference and client information is inconsistent'
  },
  {
    label: 'Reference and client relationship is inconsistent',
    value: 'Reference and client relationship is inconsistent'
  }
]

// 状态列表  4.7.2
export const statusList = [
  'Active No.',
  'Incorrect  No.',
  'Busy Tone',
  'Hung Up',
  'Auto Reject',
  'Call Divert',
  'Power Off',
  'Unattended',
  'NPV',
  'Answered'
]
