import request from '@/utils/request'

export function getProductList (params) {
  return request({
    url: '/product/page',
    method: 'post',
    data: params
  })
}
export function getSeoList (params) {
  return request({
    url: '/mate/list',
    method: 'post',
    data: params
  })
}
export function metaUpdate (params) {
  return request({
    url: '/mate/update',
    method: 'post',
    data: params
  })
}

export function getCateList (params) {
  return request({
    url: '/category/list',
    method: 'post',
    data: params
  })
}

export function addCate (params) {
  return request({
    url: '/category/save',
    method: 'post',
    data: params
  })
}

export function editCate (params) {
  return request({
    url: '/category/update',
    method: 'post',
    data: params
  })
}

export function DelCate (params) {
  return request({
    url: '/category/remove',
    method: 'post',
    data: params
  })
}
