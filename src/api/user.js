import request from '@/utils/request'
export function login (data) {
  return request({
    url: `/login`,
    data: data,
    method: 'post'
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}
