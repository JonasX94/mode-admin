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
export function getProductCateList (params) {
  return request({
    url: '/list/category',
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

export function customerList (params) {
  return request({
    url: '/customer/page',
    method: 'post',
    data: params
  })
}

export function customerExport (params) {
  return request({
    url: '/customer/export',
    method: 'post',
    data: params
  })
}

export function saveProduct (params) {
  return request({
    url: '/product/save',
    method: 'post',
    data: params
  })
}
export function updateProduct (params) {
  return request({
    url: '/product/update',
    method: 'post',
    data: params
  })
}

export function productDetail (params) {
  return request({
    url: '/product/info/batch/code',
    method: 'post',
    data: params
  })
}

export function productDel (params) {
  return request({
    url: '/product/remove',
    method: 'post',
    data: params
  })
}

export function productOnline (params) {
  return request({
    url: '/product/online',
    method: 'post',
    data: params
  })
}

export function articlePage (params) {
  return request({
    url: '/article/page',
    method: 'post',
    data: params
  })
}

export function articleDel (params) {
  return request({
    url: '/article/remove/code',
    method: 'post',
    data: params
  })
}
export function articleOnline (params) {
  return request({
    url: '/article/online',
    method: 'post',
    data: params
  })
}

export function articleDetail (params) {
  return request({
    url: '/article/info/batch/code',
    method: 'post',
    data: params
  })
}
export function articleUpdate (params) {
  return request({
    url: '/article/update',
    method: 'post',
    data: params
  })
}

export function articleSave (params) {
  return request({
    url: '/article/save',
    method: 'post',
    data: params
  })
}

export function bannerListFn (params) {
  return request({
    url: '/banner/page',
    method: 'post',
    data: params
  })
}

export function bannerRemove (params) {
  return request({
    url: '/banner/remove',
    method: 'post',
    data: params
  })
}

export function bannerOnline (params) {
  return request({
    url: '/banner/online',
    method: 'post',
    data: params
  })
}

export function bannerSave (params) {
  return request({
    url: '/banner/save',
    method: 'post',
    data: params
  })
}

export function bannerUpdate (params) {
  return request({
    url: '/banner/update',
    method: 'post',
    data: params
  })
}
