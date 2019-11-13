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
      order_msg: {
        sign_name_file_url: 'assert/upload/720/cid_720_NameSignPhoto_1562133492385993812790493_.jpg'
      },
      user_info: {
        id: {
          addr_card_back_img: 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg',
          addr_card_front_img: 'assert/upload/720/cid_720_FrontAddrPhoto_1562133491844998862282488_.jpg',
          id_card_front_img: 'assert/upload/720/cid_720_FrontIDPhoto_1562133491400207589194531_.jpg',
          id_card_hold_img: 'assert/upload/720/cid_720_HoldIDPhoto_1562133491691870734955214_.jpg'
        },
        sup_cert: {
          salary_img_1: 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg',
          bank_stmt_img_1: 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg',
          bank_stmt_img_2: 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg',
          bank_stmt_img_3: 'assert/upload/720/cid_720_BackAddrPhoto_1562133491772519690544244_.jpg'
        }
      }
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
