<template>
  <div class="card-box">
    <el-button
      style="margin-bottom: 20px"
      type="primary"
      size="mini"
      @click="$router.push({ name: 'news-detail' })"
    >新建文章</el-button>
    <el-table class="flex-dp" stripe size="mini" :data="tableData">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="subtitle" label="副标题" />
      <el-table-column prop="picture" label="封面">
        <template slot-scope="scope">
          <img v-if="scope.row.picture" :src="scope.row.picture" alt="" style="width: 30px;height: 30px;">
        </template>
      </el-table-column>
      <el-table-column prop="releaseDate" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="handleDel(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { articlePage, articleDel } from '@/api/table.js'
export default {
  name: 'SetMeta',
  data () {
    return {
      params: {
        current: 1,
        language: 0,
        online: 0,
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
      articlePage(this.params).then(res => {
        const { records, total, current } = res.data
        this.tableData = records || []
        this.params.total = Number(total)
        this.params.current = Number(current)
      })
    },
    handleDel (row) {
      articleDel({ id: row.id }).then(res => {
        this.$message.success(res.msg)
        this._getList()
      })
    },
    handleEdit (row) {
      this.$router.push({
        name: 'news-detail',
        query: {
          code: row.code,
          type: 'edit'
        }
      })
    },
    handleView (row) {
      this.$router.push({
        name: 'news-detail',
        query: {
          code: row.code,
          type: 'view'
        }
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

