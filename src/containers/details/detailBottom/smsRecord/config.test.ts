import { SMSRecordColumns } from './config'

describe('config', () => {
  it('SMSRecordColumns 0', () => {
    expect(SMSRecordColumns[0].render!('1', {}, 0)).toBe('1')
  })

  it('SMSRecordColumns 1', () => {
    expect(SMSRecordColumns[1].render!('User Unconnected')).toBe('User  Unconnected')
  })

  it('SMSRecordColumns 2', () => {
    expect(SMSRecordColumns[2].render!('2019-11-15T16:50:07+08:00')).toBe('2019-11-15 16:50:07')
  })

  it('SMSRecordColumns 4', () => {
    expect(SMSRecordColumns[4].render!('SendSuccess')).toBe('Send Success')
  })
})
