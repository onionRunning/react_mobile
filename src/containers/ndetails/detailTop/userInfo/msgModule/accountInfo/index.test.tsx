// import React from 'react'
// import { CollectionAccountInfo } from './index'
// import { mockRouteProps } from 'test/mock'
// import { ShallowWrapper, shallow } from 'enzyme'
// describe('CollectionAccountInfo', () => {
//   const mockParams = {
//     order_no: '11',
//     type: 'test',
//     a: 'a'
//   }
//   const mockRoute = mockRouteProps(mockParams)
//   const mockDispatch = jest.fn()
//   const mockProps = {
//     ...mockRoute,
//     dispatch: mockDispatch,
//     data: {
//       order_no: 1
//     }
//   }
//   let component: ShallowWrapper<CollectionAccountInfo>
//   let instance

//   beforeEach(() => {
//     component = shallow(<CollectionAccountInfo {...mockProps} />).dive()
//     instance = component.instance() as CollectionAccountInfo
//     mockDispatch.mockClear()
//   })

//   it('render', () => {
//     expect(component.find('div').length).toBeGreaterThan(0)
//   })
// })
