import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/product-list',
    component: Layout,
    name: 'product',
    meta: { title: '产品管理', icon: 'example' },
    children: [
      {
        path: '/product-list',
        name: 'product-list',
        component: () => import('@/views/product/product.vue'),
        meta: { title: '产品管理', icon: 'dashboard' }
      },
      {
        path: '/edit-product',
        name: 'edit-product',
        component: () => import('@/views/product/edit-product.vue'),
        meta: { title: '编辑产品', icon: 'dashboard' }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/news/new.vue'),
        meta: { title: '新闻管理', icon: 'dashboard' }
      },
      {
        path: '/news-detail',
        name: 'news-detail',
        component: () => import('@/views/news/edit-new.vue'),
        meta: { title: '新闻编辑', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/seo',
    component: Layout,
    children: [
      {
        path: 'seo-list',
        name: 'seo',
        component: () => import('@/views/set-page-meta/set-meta.vue'),
        meta: { title: 'SEO设置', icon: 'form' }
      }
    ]
  },
  {
    path: '/product-category',
    component: Layout,
    children: [
      {
        path: 'product-category-list',
        name: 'category',
        component: () => import('@/views/category/category.vue'),
        meta: { title: '产品分类', icon: 'form' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'customer-list',
        name: 'customer',
        component: () => import('@/views/customer/customer.vue'),
        meta: { title: '客户管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // mode: 'history',
  // base: '/admin/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
