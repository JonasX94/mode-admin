<template>
  <div class="card-box">
    <el-button
      style="margin-bottom: 20px"
      type="primary"
      size="mini"
      @click="$router.push({ name: 'edit-product' })"
    >创建产品</el-button>
    <el-table class="flex-dp" stripe size="mini" :data="tableData">
      <el-table-column prop="code" label="产品编号" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          {{ scope.row.online === '0'? '上线' : '草稿' }}
        </template>
      </el-table-column>
      <el-table-column prop="picture" label="封面">
        <template slot-scope="scope">
          <div v-if="scope.row.picture" style="width: 32px;height: 32px"><img style="width: 100%;height: 100%" :src="scope.row.picture" alt=""></div>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="产品类型" />
      <el-table-column prop="releaseDate" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handlePublish(scope.row, 0)">发布</el-button>
          <el-button v-if="scope.row.online === '0'" type="text" size="small" @click="handlePublish(scope.row, 1)">撤回</el-button>
          <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
          <el-button v-if="scope.row.online === '1'" type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getProductList, productDel, productOnline } from '@/api/table.js'
export default {
  name: 'SetMeta',
  data () {
    return {
      params: {
        current: 1,
        language: 0,
        // online: 0,
        size: 100
      },
      tableData: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    _getList () {
      getProductList(this.params).then(res => {
        const { records, total, current } = res.data
        this.tableData = records || []
        this.params.total = Number(total)
        this.params.current = Number(current)
      })
    },
    handleDel (row) {
      productDel({ id: row.id }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    },
    handleEdit (row) {
      this.$router.push({
        name: 'edit-product',
        query: {
          code: row.code,
          type: 'edit'
        }
      })
    },
    handleView (row) {
      this.$router.push({
        name: 'edit-product',
        query: {
          code: row.code,
          type: 'view'
        }
      })
    },
    handlePublish (row, online) {
      productOnline({ id: row.id, online: online }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    }
  }
}
</script>

<style >
.card-box {
  padding: 16px;
}
.flex-dp {
    display: flex;
    flex: 1;
    flex-direction: column;
}
</style>

