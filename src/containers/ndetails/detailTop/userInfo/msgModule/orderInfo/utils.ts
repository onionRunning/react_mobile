// 获取评分模型的id
export const getScId = (orderType: string, data: any) => {
  // 默认最老模型
  let sc_id = 'phl_p2g_sc_v1'
  if (orderType === 'New Client' || orderType === 'Multiple Application') {
    // 新客模型
    if (data && data.find((item: any) => item.sc_id === 'phl_p2g_sc_v1_nc_gl1213')) {
      sc_id = 'phl_p2g_sc_v1_nc_gl1213'
    }
  } else {
    // 老客模型
    if (data && data.find((item: any) => item.sc_id === 'phl_p2g_sc_oc_cr1218')) {
      sc_id = 'phl_p2g_sc_oc_cr1218'
    }
  }
  return sc_id
}

export const getData = (orderType: string, data: any) => {
  const sc_id = getScId(orderType, data)
  return data && data.find((item: any) => item.sc_id === sc_id)
}
