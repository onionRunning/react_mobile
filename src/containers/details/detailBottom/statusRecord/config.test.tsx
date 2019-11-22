import { StatusRecordColumns } from './config'

describe('config', () => {
  it('StatusRecordColumns 0', () => {
    expect(StatusRecordColumns[0].render!('1', {}, 0)).toBe('1')
  })

  it('StatusRecordColumns 1', () => {
    expect(StatusRecordColumns[1].render!('CreateApplication')).toBe('Create Application')
  })

  it('StatusRecordColumns 3', () => {
    expect(StatusRecordColumns[3].render!('2019-11-15T16:50:07+08:00')).toBe('2019-11-15 16:50:07')
  })

  it('StatusRecordColumns 4', () => {
    const record = {
      created_at: '2019-11-15T16:50:07+08:00',
      current_status: 'CreateApplication',
      id: 27628,
      operator_name: 'wzc 13',
      reasons: '',
      remark: '111'
    }
    StatusRecordColumns[4].render!(record)
  })
})
