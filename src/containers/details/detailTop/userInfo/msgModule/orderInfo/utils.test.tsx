import * as Utils from './utils'

describe('test ScoreCard/utils', () => {
  it('test getScId new', () => {
    const orderType = 'New Client'
    expect(Utils.getScId(orderType, [{ sc_id: 'phl_p2g_sc_v1_nc_gl1213' }])).toEqual('phl_p2g_sc_v1_nc_gl1213')
  })

  it('test getScId old', () => {
    const orderType = 'test'
    expect(Utils.getScId(orderType, [{ sc_id: 'phl_p2g_sc_oc_cr1218' }])).toEqual('phl_p2g_sc_oc_cr1218')
  })

  it('test getScId old', () => {
    const orderType = 'test'
    expect(Utils.getScId(orderType, [{ sc_id: 'phl_p2g_sc_v1_nc_gl1213' }])).toEqual('phl_p2g_sc_v1')
  })
  it('test getData new', () => {
    const orderType = 'New Client'
    expect(Utils.getData(orderType, [{ sc_id: 'phl_p2g_sc_v1_nc_gl1213' }]).sc_id).not.toBeUndefined()
  })
  it('test getData old', () => {
    const orderType = 'test'
    expect(Utils.getData(orderType, [{ sc_id: 'phl_p2g_sc_v1_nc_gl1213' }])).toBeUndefined()
  })
})
