<template>
  <div class="card-box">
    <div style="height: 50px">
      <el-button type="primary" size="mini" style="margin-bottom: 20px;" @click="handleClick"><i class="el-icon-download el-icon--left" />导出</el-button>
    </div>
    <div class="flex-1">
      <el-table class="flex-dp" :data="list" size="mini" height="100%" stripe>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="mail" label="邮箱" />
      </el-table>
    </div>
    <div v-if="list.length > 0" style="height: 50px; display: flex; justify-content: flex-end; padding-top: 10px">
      <el-pagination
        small
        :current-page="params.current"
        :page-size="params.size"
        :total="params.total"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { customerList } from '@/api/table.js'
import { comonDownLoad } from '@/utils/download.js'

export default {
  name: 'SetMeta',
  data () {
    return {
      list: [],
      params: {
        current: 1,
        size: 20,
        total: 100
      }
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    handleCurrentChange (val) {
      this.params.current = val
      this.getTableList()
    },
    getTableList () {
      customerList(this.params).then(res => {
        const { data } = res
        this.params.current = Number(data.current)
        this.params.size = Number(data.size)
        this.params.total = Number(data.total)
        this.list = data.records || []
      })
    },
    handleClick () {
      comonDownLoad('post', '/customer/export', null, this.params)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 50px);
  .flex-1 {
      display: flex;
      flex: 1;
  }
//   overflow: scroll;
}
</style>
