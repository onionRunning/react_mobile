import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
// import { RouteType } from 'containers/lists/settings/role/config'
import { UserInfo } from './index'
// import { imgPath } from 'global/constants'

describe('UserInfo', () => {
  const mockRoute = mockRouteProps({ order_no: '1', type: 'my_orders', a: '1' })
  const mockProps = {
    dispatch: jest.fn(),
    ...mockRoute,
    userDetail: {
      getUserInfo: jest.fn(),
      order_msg: {
        sign_name_file_url: 'test'
      },
      user_msg: {},
      work: {},
      personal: {},
      id: {},
      device_info: {},
      contact: {},
      account: {},
      score_card_results: {}
    }
  }

  let component: ShallowWrapper<UserInfo>, instance: UserInfo
  beforeEach(() => {
    component = shallow(<UserInfo {...mockProps} />).dive()
    instance = component.instance() as UserInfo
    instance.setState({
      request: {
        page: 1, // 当前页
        per_page: 10, // 每页数据条数
        sort_value: 'start_time', // 需要排序字段
        sort_order: '' // 排序方法
      }
    })
  })
  it('componentDidMount', () => {
    instance.componentDidMount()
    expect(mockProps.userDetail.getUserInfo).toBeCalled()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  // it('showPicture', () => {
  //   instance.showPicture(0, imgPath + 'assert/upload/720/cid_720_NameSignPhoto_1562133492385993812790493_.jpg')()
  //   expect(mockProps.dispatch).toBeCalledWith(
  //     createOpenImgView(
  //       0,
  //       [
  //         { src: imgPath + 'assert/upload/720/cid_720_NameSignPhoto_1562133492385993812790493_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_FrontIDPhoto_1562133491400207589194531_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_HoldIDPhoto_1562133491691870734955214_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_FrontAddrPhoto_1562133491844998862282488_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg' },
  //         { src: imgPath + 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg' }
  //       ],
  //       instance.hidePicture
  //     )
  //   )
  // })

  // it('hidePicture', () => {
  //   instance.hidePicture()
  //   expect(mockProps.dispatch).toBeCalledWith(createHideImgView())
  // })
})
