<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;display: flex;padding-bottom: 5px; background: #F3F4F7">
      <div style="width: 100%; background: #FFFFFF;display: flex; padding: 10px 20px 0px 20px;flex-direction: column;">
        <span style="font-size: 16px;color: #333333; font-weight: bold">任务详情</span>
        <div style="display: flex;justify-content: space-between;padding-bottom: 10px;padding-top: 10px;font-size: 16px;color: #333333">
          <span>任务名 : &nbsp;{{ task_name }}</span>
          <span>所属案件:&nbsp; {{ case_name }}</span>
          <span>任务编号:&nbsp; {{ task_id }}</span>
          <span>状态 :&nbsp; {{ status }}</span>
        </div>
        <div style="display: flex;justify-content: space-between; height: 10px">
          <span style="font-size: 16px;color: #333333">详情&nbsp;&nbsp;&nbsp;&nbsp; {{ details }}</span>
          <el-button type="text" style="text-decoration: underline; font-size:16px" @click="editTaskInfo">编辑任务</el-button>
        </div>
        <el-divider content-position="center" />
      </div>
    </div>
    <div style="width: 100%;height:5%;display: flex;justify-content: space-between;padding-left:20px;padding-top: 10px;padding-right: 10px">
      <span style="font-size: 16px;font-weight: bold">取证列表</span>
      <el-input v-model="tableDataName" align="right" placeholder="请输入" suffix-icon="el-icon-search" style="width:360px" @input="doFilter" />
    </div>
    <div style="width: 100%;height:70%;display: flex;flex-direction: column;padding:10px;">
      <el-table
        :data="tempList"
        :header-cell-style="{color:'#666666',font: '14px Base'}"
        :cell-style="{font: '14px Base', color:'#333333'}"
        stripe
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
        width="100%"
        height="1"
      >
        <el-table-column property="phone" label="手机号" min-width="10px" align="center" />
        <el-table-column property="imsi" label="Imsi" min-width="20px" align="center" />
        <el-table-column property="create_time" label="时间" min-width="20px" align="center" />
        <el-table-column label="应用信息" min-width="20px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.app_list[0] }} {{ scope.row.app_list[1] }} {{ scope.row.app_list[2] }} {{ scope.row.app_list[3] }}</span>
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
    <div v-if="dialogFormVisible">
      <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
        <task_comp :taskData ='dialogPropTask' />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef,no-unused-vars
import axios from 'axios'
import store from '../../store'
import task_comp from '../component/task_comp'
import { mapGetters } from 'vuex'

export default {
  name: 'EvidenceInformation',
  components: {task_comp},
  data() {
    return {
      total1: 0,
      dialogFormVisible: 0,
      tempList: [],
      emptyText: '',
      currentPage1: 1,
      details: '',
      status: '',
      pageSize: 10,
      bondsAllList: '',
      tableDataName: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      flag: 0,
      task_name: '',
      case_name: '',
      task_id: '',
      case_id: '',
      task_info: '',
      dialogPropTask: {
            type: 0,
            dev_list: [],
            oper_list: [],
            case_list: [],
            task_info: {
                user_id: '',
                case_name: '',
                case_id: '',
                task_id: 1,
                task_name: '',
                task_detail: '',
                dev_list:[],
                oper_list:[],
                create_ts: '',
                task_type: '',
                number_content: {
                    capture_mode: '',
                    imsi_black_list: [
                        ''
                    ],
                    capture_operation: '',
                    capture_type: ''
                },
                evidence_content: [
                    {
                        phone: '',
                        imsi: '',
                        app_list: '',
                    }
                ]
            }
        },
    }
  },
  watch: {
    '$route': 'init',
      caseInfo() {
          console.log('watch evidenceInformation.......');
          this.init()
      }
  },
  created() {
    this.init()
  },
    computed: {
        ...mapGetters({ caseInfo:'caseInfo'}),
    },
  methods: {
    init() {
      this.getParams()
      // this.getMessage()
      this.getMessageByPost()
        // this.$store.commit('forensic/getTreeCaseInfo','')
        // this.$store.commit('forensic/getTreeTaskInfo',this.task_id)
        let task_show_dict= new Map([["ready",'准备中'],["running",'运行中'],["complete",'已完成'],["failed",'失败'],["canceled",'已取消']]);
        if(this.caseInfo !== undefined) {
            this.case_name = this.caseInfo.case_name
            for (var j = 0; j < this.caseInfo.task_list.length; j++) {
                if (this.caseInfo.task_list[j].task_id === this.task_id) {
                    this.details = this.caseInfo.task_list[j].task_detail
                    this.status = task_show_dict.get(this.caseInfo.task_list[j].task_status)
                    this.task_name = this.caseInfo.task_list[j].task_name
                    this.task_info = this.caseInfo.task_list[j]
                }
            }
        }
        // for(var i = 0; i < this.$store.state.forensic.case_info.length; i++) {
        //     if(this.$store.state.forensic.case_info[i].case_id === this.case_id) {
        //         for (var j = 0; j < this.$store.state.forensic.case_info[i].task_list.length; j++) {
        //             if (this.$store.state.forensic.case_info[i].task_list[j].task_id === this.task_id) {
        //                 this.details = this.$store.state.forensic.case_info[i].task_list[j].task_detail
        //                 this.status = task_show_dict.get(this.$store.state.forensic.case_info[i].task_list[j].task_status)
        //                 this.case_name = this.$store.state.forensic.case_info[i].case_name
        //                 this.task_name = this.$store.state.forensic.case_info[i].task_list[j].task_name
        //                 this.task_info = this.$store.state.forensic.case_info[i].task_list[j]
        //             }
        //         }
        //     }
        // }
    },
    getMessage() {
      const path = 'http://10.10.100.59:5000/forensic/forensic-details'
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
      getMessageByPost() {
          const path = 'http://localhost:5000/forensic/forensic-details'
          const list = {
              task_id : '10000'
          }
          axios.post(path,list)
              .then((res) => {
                  this.bondsAllList = res.data
                  this.tableDataName = ''
                  this.getCreateTable()
              })
              .catch((error) => {
                  alert(error)
              })
      },
      editTaskInfo() {
          this.dialogFormVisible = !this.dialogFormVisible
          this.dialogPropTask.type = 2
          this.dialogPropTask.dev_list = this.$store.state.baseInfo.dev_list
          this.dialogPropTask.app_list = this.$store.state.baseInfo.app_list
          this.dialogPropTask.oper_list = this.$store.state.baseInfo.oper_list
          this.dialogPropTask.task_info.task_detail = this.task_info.task_detail
          this.dialogPropTask.task_info.dev_list = this.task_info.dev_list
          this.dialogPropTask.task_info.task_id = this.task_info.task_id
          this.dialogPropTask.task_info.case_id = this.case_id
          this.dialogPropTask.task_info.case_name = this.case_name
          this.dialogPropTask.task_info.task_name = this.task_info.task_name
          this.dialogPropTask.task_info.task_type = this.task_info.task_type
          this.dialogPropTask.task_info.evidence_content = this.task_info.evidence_content
          this.dialogPropTask.task_info.number_content = this.task_info.number_content
          console.log(this.dialogPropTask)
          console.log('task dialog')
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
      this.case_id = this.$route.query.caseId
      this.task_id = this.$route.query.taskId
        console.log('123')
        this.$store.commit('forensic/getTreeCaseInfo', this.case_id)
        this.$store.commit('forensic/getTreeTaskInfo', this.task_id)
    },
    jumpToCaseDisplay() {
      this.$router.push(
        {
          name: 'casedisplay'
        })
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

