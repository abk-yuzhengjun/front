<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;height:10%;display: flex;justify-content: space-between;padding-left:20px;padding-top: 10px;padding-right: 10px">
      <span style="font-size: 20px;font-weight: bold">APP列表</span>
      <el-input v-model="tableDataName" placeholder="请输入" suffix-icon="el-icon-search" style="width:360px" @input="doFilter" />
    </div>
    <div style="width: 100%;height:90%;display: flex;flex-direction: column;padding:10px;">
      <el-table
        :data="tempList"
        :header-cell-style="{color:'#666666',font: '20px large'}"
        :cell-style="{font: '16px Medium', color:'#333333',height:'50px'}"
        stripe
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
        width="100%"
        height="1"
      >
        <el-table-column property="phone" label="手机号" min-width="10px" align="center" />
        <el-table-column property="app_list" label="应用信息" min-width="20px" align="center">
          <template slot-scope="scope">
            <el-link v-for="item in scope.row.app_list" :key="item" @click="jumpToAppInformation">
              {{ item }}&nbsp;
            </el-link>
          </template>
        </el-table-column>
        <!--        <el-table-column label="操作" align="center" width="80">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="mini" type="danger" @click="confirmDelete(scope.$index,scope.row)">删除</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
  </div>
</template>

<script>
// eslint-disable-next-line no-undef,no-unused-vars
import axios from 'axios'

export default {
  name: 'AppDisplay',
  data() {
    return {
      total1: 0,
      tempList: [],
      emptyText: '',
      currentPage1: 1,
      details: '本文用于示范，展示一些不同类型的内容，在文章中应该如何展示。包括：标题，段落，链接，附件，代码块，图片，表格内容。',
      pageSize: 10,
      bondsAllList: '',
      tableDataName: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      flag: 0,
      task_name: '',
      case_name: '',
      phone: ''
    }
  },
  watch: {
    '$route': 'init'
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getParams()
      this.getMessage()
    },
    getMessage() {
      const path = 'http://localhost:5000/forensic/forensic-details/' + this.phone
      axios.get(path)
        .then((res) => {
          // this.$message.warning('res:' + res.data)
          this.bondsAllList = res.data
          this.tableDataName = ''
          this.getCreateTable()
        })
        .catch((error) => {
          alert(error)
        })
    },
    handleSizeChange1: function(pageSize) { // 每页条数切换
      // eslint-disable-next-line eqeqeq
      if (this.flag === 1) {
        return
      }
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function(currentPage) { // 页码切换
      this.currentPage1 = currentPage
      // eslint-disable-next-line eqeqeq
      if (this.flag === 0) {
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
      if (this.tableDataName === '') {
        this.getCreateTable()
        return
      }
      this.tableDataEnd = []
      this.filterTableDataEnd = []
      this.bondsAllList.forEach((value, index) => {
        if (value.phone) {
          if (value.phone.indexOf(this.tableDataName) >= 0) {
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
    getParams() {
      this.task_name = this.$route.query.taskName
      this.case_name = this.$route.query.caseName
      this.phone = this.$route.query.phone
    },
    jumpToCaseDisplay() {
      this.$router.push(
        {
          name: 'casedisplay'
        })
    },
    jumpToAppInformation() {
      this.$router.push(
        {
          name: 'appinformation'
        }
      )
    }
  }
}
</script>

<style scoped>
  .header {
    /*background: #F3F4F7;*/
    width:100%;
    padding:5px;
    float:right;
  }
  .nav {
    height:1024px;
    width:10%;
    float:left;
    padding:5px;
  }
  .section {
    height:1024px;
    width:100%;
    float:left;
    padding:5px;
  }
  .footer {
    clear:both;
    text-align:center;
    padding:5px;
  }
  section.el-table__header tr,
  section.el-table__header th {
    padding: 0;
    height: 110px;
  }
  section.el-table__body tr,
  section.el-table__body td {
    padding: 0;
    height: 110px;
  }

</style>

