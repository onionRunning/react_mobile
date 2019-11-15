import * as React from 'react'
import { shallow } from 'enzyme'
import { StatusRecord } from './index'
import StatusRecordStores from 'stores/details/statusRecord'
import { mockRouteProps } from 'test/mock'

describe('StatusRecord', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'order_list'
    }
  )

  const statusRecord: StatusRecordStores = {
    statusRecord: [],
    getStatusRecord: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    statusRecord
  }

  let component: any, instance: any

  beforeEach(() => {
    component = shallow(<StatusRecord {...mockProps} />).dive()
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getStatusRecord', () => {
    instance.getStatusRecord()
    expect(mockProps.statusRecord.getStatusRecord).toBeCalledWith(
      {
        order_no: 'P2g201911150020'
      },
      'order_list'
    )
  })
})
