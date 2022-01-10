<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="$router.push({ name: 'edit-product' })"
    >
      新建
    </el-button>
    <el-table>
      <el-table-column prop="name" label="标题" width="180" />
      <el-table-column prop="picture" label="封面" width="180" />
      <el-table-column prop="releaseDate" label="发布日期" width="180" />
    </el-table>
  </div>
</template>
<script>
import { getProductList } from '@/api/table.js'
export default {
  name: 'SetMeta',
  data () {
    return {
      params: {
        current: 1,
        language: 0,
        online: 0,
        size: 20
      }
    }
  },
  created () {
    this._getList()
  },
  methods: {
    _getList () {
      getProductList(this.params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
