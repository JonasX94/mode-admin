import request from '@/utils/request'

export function getProductList (params) {
  return request({
    url: '/product/page',
    method: 'post',
    data: params
  })
}
