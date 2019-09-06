<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div>
    <div class="header">
      <table>
        <tr>
          <td align="left" width="240px">
            <h2>案件信息 / 取号任务</h2>
          </td>
          <td width="240px">
            <el-button type="primary" @click="jumpToTask">+创建任务</el-button>
          </td>
          <td align="center">
            <el-input v-model="tableDataName" placeholder="请输入数据" style="width:500px" />
            <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div align="left">
      <el-table
        :data="tempList"
        :header-cell-style="{background:'#F3F4F7',color:'#000000',font: '20px Extra large'}"
        :cell-style="{font: '16px Medium'}"
        stripe
        border
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
      >
        <el-table-column type="index" :index="indexMethod" label=" " width="60" align="center" />
        <el-table-column property="task_id" label="任务编号" sortable width="365" align="center" />
        <el-table-column property="task_name" label="任务信息" sortable width="1120" align="center" />
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button size="medium" type="success" @click="jumpToPhoneInformation(scope.$index,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        :current-page="currentPage1"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total1"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    </div>
    <div class="footer" />
  </div>
</template>

<script>
// eslint-disable-next-line no-undef,no-unused-vars
import axios from 'axios'

export default {
  name: 'PhoneDisplay',
  data() {
    return {
      total1: 10,
      currentPage1: 1,
      pageSize: 10,
      bondsAllList: '',
      tableDataName: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      flag: 0,
      caseID: ''
    }
  },
  watch: {
    '$route': 'getParams'
  },
  created() {
    this.getParams()
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/forensic/phonedisplay/' + this.caseID
      axios.get(path)
        .then((res) => {
          this.bondsAllList = res.data
          this.getCreateTable()
        })
        .catch((error) => {
          alert(error)
        })
    },
    getMessage2() {
      const path = 'http://localhost:5000/forensic/forensic-details/1'
      axios.get(path)
        .then((res) => {
          this.$message.warning('111111')
        })
        .catch((error) => {
          alert(error)
        })
    },
    sendMessage() {
      const path = 'http://localhost:5000/forensic/forensic-details/1'
      const list = [{
        name: 'yzj',
        age: 18
      },
      {
        name: 'jjj',
        age: 28
      }]
      const jsonList = JSON.stringify(list)
      axios.post(path, jsonList)
        .then(res => {
          this.tableDataName = res.data.name
        })
        .catch((error) => {
          alert(error)
        })
    },
    handleSizeChange1: function(pageSize) { // 每页条数切换
      // eslint-disable-next-line eqeqeq
      if (this.flag == 1) {
        return
      }
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function(currentPage) { // 页码切换
      this.currentPage1 = currentPage
      // eslint-disable-next-line eqeqeq
      if (this.flag == 0) {
        this.currentChangePage(this.bondsAllList, currentPage)
      } else {
        this.currentChangePage(this.filterTableDataEnd, currentPage)
      }
    },
    // 分页方法（重点）
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      this.tempList = []
      const to = currentPage * this.pageSize
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from])
        }
      }
    },
    getCreateTable() {
      this.total1 = this.bondsAllList.length
      this.flag = 0
      this.handleCurrentChange1(this.currentPage1)
    },
    doFilter() {
      // eslint-disable-next-line eqeqeq
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      this.filterTableDataEnd = []
      this.bondsAllList.forEach((value, index) => {
        if (value.task_id) {
          if (value.task_id.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      this.currentPage1 = 1
      this.total1 = this.filterTableDataEnd.length
      this.currentChangePage(this.filterTableDataEnd, this.currentPage1)
      this.flag = 1
    },
    openData() {
      this.tableDataName = []
      this.getCreateTable()
    },
    confirmDelete(index, row) {
      this.$confirm('确认删除' + ' time: ' + row.time + '  data: ' + row.data, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '开始删除'
          })
          this.handleDelete(index, row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    handleDelete(index, row) {
      const path = 'http://localhost:5000/forensic/forensic-details/1'
      axios.post(path, row)
        .then(res => {
          this.$message.warning('删除成功！')
          this.bondsAllList = res.data
          this.getCreateTable()
        })
        .catch((error) => {
          alert(error)
        })
    },
    jumpToPhoneInformation(index, row) {
      this.$router.push(
        {
          name: 'phoneinformation',
          query: {
            taskID: row.task_id
          }
        })
    },
    getParams() {
      this.caseID = this.$route.query.caseID
      this.$message.warning('caseID: ' + this.caseID)
    },
    jumpToTask() {
      this.$router.push(
        {
          name: 'TaskCreator'
        }
      )
    }
  }
}
</script>

<style type="text/css">
  .header {
    padding: 30px;
    text-align: left;

  }
  .footer {
    padding: 20px;
    text-align: center;
    margin-top: 20px;
  }

</style>

