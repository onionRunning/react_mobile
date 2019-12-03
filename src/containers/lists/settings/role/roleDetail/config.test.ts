import { showBreadcrumbName, getbreadcrumbConfig, RouteType } from './config'

describe('config', () => {
  it('showBreadcrumbName', () => {
    expect(showBreadcrumbName(RouteType.Detail)).toBe('Inquire role')
    expect(showBreadcrumbName(RouteType.Add)).toBe('Add role')
    expect(showBreadcrumbName(RouteType.Edit)).toBe('Edit role')
    const err: any = 'err'
    expect(showBreadcrumbName(err)).toBe('err')
  })

  it('getbreadcrumbConfig', () => {
    expect(getbreadcrumbConfig(RouteType.Detail)).toEqual([
      { path: `/auth/roles`, breadcrumbName: 'Setting(Role management)' },
      { path: `/auth/roles/${RouteType.Detail}`, breadcrumbName: showBreadcrumbName(RouteType.Detail) }
    ])
  })
})
