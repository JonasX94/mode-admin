<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      menuList: [
        {
          meta: {
            icon: 'form',
            title: '产品分类'
          },
          name: 'category',
          path: '/product-category/product-category-list'
        },
        {
          meta: {
            title: '产品管理',
            icon: 'dashboard'
          },
          name: 'product-list',
          path: '/product-list'
        },
        {
          meta: {
            title: '新闻管理',
            icon: 'form'
          },
          name: 'news',
          path: '/news'
        },
        {
          meta: {
            title: 'Banner管理',
            icon: 'form'
          },
          name: 'banner',
          path: '/banner-list'
        },
        {
          meta: {
            title: '客户管理',
            icon: 'form'
          },
          name: 'customer',
          path: '/customer/customer-list'
        },
        {
          meta: {
            title: 'SEO设置',
            icon: 'form'
          },
          name: 'seo',
          path: '/seo/seo-list'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
