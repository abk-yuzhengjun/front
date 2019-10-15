<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;display: flex;padding-bottom: 20px; background: #F3F4F7">
      <div style="width: 100%; background: #FFFFFF;display: flex; padding: 20px 20px 10px 20px;flex-direction: column;">
        <el-row>
          <el-col style="width: 30px;">
            <svg-icon icon-class="task_evidence" style="width: 26px;height: 26px"></svg-icon>
          </el-col>
          <el-col :span="16">
            <div style="display: flex;flex-direction:row;justify-content: flex-start">
              <span style="font-size: 16px;color: #333333; font-weight: bold;">任务编号:&nbsp{{task_id}}</span>
              <el-button type="text" size="mini" icon="el-icon-edit" @click="editTaskInfo"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 10px;padding-top: 6px">
          <el-col style="width: 30px;">
            &nbsp
          </el-col>
          <el-col :span="6">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">任务名:&nbsp </span>
              <span style="font-size: 14px;color: #333333;">{{task_name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">创建时间:&nbsp </span>
              <span style="font-size: 14px;color: #333333;" v-if="taskInfo!== undefined">{{taskInfo.create_ts}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="display: flex;justify-content: flex-end">
              <span style="font-size: 14px;color: #666666;">状态&nbsp&nbsp</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="display: flex;justify-content: flex-end">
              <span style="font-size: 14px;color: #666666;">取证(上号/取证成功)</span>
            </div>
          </el-col>
          <!--          <el-col :span="1">-->
          <!--            <div style="display: flex;flex-direction:row">-->
          <!--              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editTaskInfo"></el-button>-->
          <!--            </div>-->
          <!--          </el-col>-->
        </el-row>
        <el-row style="padding-bottom: 5px;padding-top: 6px">
          <el-col style="width: 30px;">
            &nbsp
          </el-col>
          <el-col :span="6">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">创建人:&nbsp </span>
              <span style="font-size: 14px;color: #333333;">***</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">完成时间:&nbsp </span>
              <span style="font-size: 14px;color: #333333;"  v-if="taskInfo!== undefined">{{taskInfo.update_ts}}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="display: flex;justify-content: flex-end">
              <el-button type="primary" @click="updateTaskStatus" size="mini">{{task_status_dict.get(task_status)}}</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="display: flex;justify-content: flex-end">
              <span style="font-size: 16px;color: #333333;">100/20</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 15px;">
          <el-col style="width: 30px;">
            &nbsp
          </el-col>
          <el-col :span="1.5">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">详情:&nbsp </span>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #333333;">{{details}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 10px;padding-top: 6px">
          <el-col style="width: 30px;">
            &nbsp
          </el-col>
          <el-col :span="2">
            <div style="display: flex;flex-direction:row">
              <span class="status-success"></span>
              <span style="font-size: 16px;color: #333333;">&nbsp&nbsp任务动态:</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 16px;color: #333333;">{{this.message_scoll.phone}}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 16px;color: #333333;">{{this.app_status_dict.get(this.message_scoll.phone_status)}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 16px;color: #333333;">{{this.message_scoll.timestr}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

<!--    <el-row style="padding: 10px 10px 0px 20px;">-->
<!--      <el-col :span="17">-->
<!--        <div style="display: flex;flex-direction:row">-->
<!--          <span style="font-size: 16px;font-weight: bold">取证列表</span>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <div style="display: flex;flex-direction:row">-->
<!--          <el-input v-model="tableDataName" align="right" placeholder="请输入" suffix-icon="el-icon-search" style="width:360px" @input="doFilter" />-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row style="padding: 0px 10px 20px 10px;">
      <el-col :span="20">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 20px 0px;">

      <el-tab-pane
        v-for="(item, index) in evdencePhoneList"
        :key="index"
        :label="item.phone"
        :name="item.phone"
      >
        <el-row>
          <el-col>
            <span style="font-size: 14px;color: #333333; font-weight: bold; padding: 20px">手机号码：&nbsp{{item.phone}}</span>
<!--            <svg-icon icon-class="phone" style="width: 40px;height: 40px"></svg-icon>-->
          </el-col>
        </el-row>
        <el-row style="padding: 20px" >
          <el-col :span="6">
            <span style="font-size: 16px;color: #666666;" >imsi:46000012345</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px;color: #666666;"> 上号时间：2019-9-20 16:30:04</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px;color: #666666;"> 取号时间：2019-9-20 10:18:49</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px;color: #666666;">取证状态：&nbsp</span>
            <el-tag type="danger">取证中</el-tag>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
      </el-col>
      <el-col :span="4" style="padding: 10px 10px 0px 10px;">
        <div style="display: flex;flex-direction:row">
          <el-input v-model="tableDataName" align="right" placeholder="请输入手机号" suffix-icon="el-icon-search" style="width:360px" @input="doFilter" />
        </div>
      </el-col>
    </el-row>

<!--    <el-divider></el-divider>-->
    <div style="padding-left: 20px;padding-right: 20px;height: 350px">
      <el-table
        :data="tempList"
        :show-header="false"
        :header-cell-style="{color:'#666666',font: '14px Base'}"
        :cell-style="{font: '14px Base', color:'#333333'}"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
        width="100%"
      >
        <el-table-column
          type="index"
          width="50px">
        </el-table-column>
        <el-table-column  width="60px" align="left">
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.appName === '微信'" icon-class="wechat" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === '支付宝'" icon-class="alipay" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === '京东'" icon-class="jingdong" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === 'Taobao'" icon-class="taobao" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === '美团'" icon-class="meituan" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === '拼多多'" icon-class="pinduoduo" style="width: 40px;height: 40px"></svg-icon>
            <svg-icon v-else-if="scope.row.appName === '百度贴吧'" icon-class="baidutieba" style="width: 40px;height: 40px"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column  width="200px" align="left">
          <template slot-scope="scope">
            <span style="font-size: 14px;color: #666666; font-weight: bold;">{{ app_list.get(scope.row.appName) }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="left" >
          <template slot-scope="scope">
            <span :class="app_show_dict.get(scope.row.appStatus)"></span>
            <span style="font-size: 14px;color: #666666;">{{app_status_dict.get(scope.row.appStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column width="300px" align="left" >
          <template slot-scope="scope">
            <span style="font-size: 14px;color: #666666;">获取订单信息</span>
          </template>
        </el-table-column>
        <el-table-column width="300px" align="left" >
          <template slot-scope="scope">
            <span style="font-size: 14px;color: #666666;">2019-9-23 15:11:30</span>
          </template>
        </el-table-column>
        <el-table-column width="360px" align="center" >
          <template slot-scope="scope">
            <el-button type="text">更多</el-button>
          </template>
        </el-table-column>



        <!--        <el-table-column label="操作" align="center" width="80">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="mini" type="danger" @click="confirmDelete(scope.$index,scope.row)">删除</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>
      <el-pagination
        align="center"
        :current-page="currentPage1"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        :total="total1"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    <div v-if="dialogFormVisible">
      <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
        <task_comp :taskData ='dialogPropTask' v-on:closeTaskDialog="closeTaskDialog"/>
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
      value1:true,
      activeName: '',
      currentPage1: 1,
      details: '',
      status: '',
      pageSize: 5,
      bondsAllList: '',
      evidencePhoneInfo: '',
      evdencePhoneList: [],
      tableDataName: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      taskStatusLoading: false,
      flag: 0,
      task_name: '',
      case_name: '',
      task_id: '',
      case_id: '',
      task_info: '',
      task_status: '',
      message_scoll:{
          phone:'',
          app:'',
          app_status: '',
          phone_status: '',
          timestr: '',
        },
      app_list: new Map([["Taobao", "淘宝"], ["running", "运行中"], ["complete", "已完成"],["canceled",'已取消']]),
      task_status_dict: new Map([["ready", "准备中"], ["running", "运行中"], ["complete", "已完成"],["canceled",'已取消']]),
      app_status_dict: new Map([["1", "下发取证任务"], ["2", "APP登录中"], ["3", "处理验证码"], ["4", "登录成功"], ["5", "登录失败"], ["6", "开始取证"], ["7", "取证完成"]]),
      app_show_dict: new Map([["1", "status-primary"], ["2", "status-primary"], ["3", "status-warning"], ["4", "status-success"], ["5", "status-danger"], ["6", "status-warning"], ["7", "status-success"]]),
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
        ...mapGetters({ caseInfo:'caseInfo',taskInfo:'taskInfo'}),
    },
    sockets: {
        webEvidenceUpdate: function (data) {
            console.log('web-evidence-update')
            console.log(data)
            if(data['msg']['task_id'] !== this.task_id)
            {
                return
            }
            this.message_scoll.phone = data['msg']['phone']
            this.message_scoll.app = data['msg']['app']
            this.message_scoll.app_status = data['msg']['app_status']
            this.message_scoll.phone_status = data['msg']['phone_status']
            this.message_scoll.timestr = data['head']['timestamp']
            console.log(this.message_scoll)
        },
    },
  methods: {
      closeTaskDialog() {
          console.log('-------------Task----------------')
          this.dialogFormVisible = !this.dialogFormVisible
          this.getTreeMessage()
      },
      getTreeMessage() {
          const path2 = 'http://localhost:5000/forensic/casetaskdisplay'
          const param = {
              user_id: this.$store.state.user.name
          }
          console.log('12345')
          axios.post(path2, JSON.stringify(param))
              .then((res) => {
                  this.$store.commit('forensic/getCaseInfo', res.data)
                  //this.getTreeData()
              })
              .catch((error) => {
                  alert(error)
              })
      },
    init() {
      this.getParams()
      // this.getMessage()
      //this.getMessageByPost()
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
                    this.bondsAllList = this.task_info.evidence_content
                    this.evdencePhoneList = this.bondsAllList
                    this.task_status = this.caseInfo.task_list[j].task_status
                    this.activeName = this.bondsAllList[0].phone
                    console.log('activeName :' + this.activeName)
                    this.tableDataName = ''
                    this.getCreateTable()
                }
            }
        }
    },
      handleClick(tab, event) {
          console.log(tab.name);
          this.activeName = tab.name
          this.getCreateTable()
      },
      updateTaskStatus() {
          let taskStatus = ''
          if(this.task_status==='ready')
          {
              taskStatus = '开始'
          }
          else if(this.task_status === 'running')
          {
              taskStatus= '结束'
          }
          else
          {
              return;
          }
          this.$confirm('确认' + taskStatus + '?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          })
              .then(() => {
                  this.handelTaskStatus(this.task_status)
              })
              .catch(() => {
                  // this.$message({
                  //     type: 'info',
                  //     message: '已取消!'
                  // })
              })
      },
      handelTaskStatus(task_status) {
          const path2 = 'http://localhost:5000/caseManage/caseInfo/taskStateSubmit'
          this.taskStatusLoading = true
          const param = {
              user_id: this.$store.state.user.name,
              case_id: this.case_id,
              task_id: row.task_id,
              task_status: task_status
          }
          console.log(param)
          axios.post(path2, param)
              .then((res) => {
                  console.log(res.data)
                  this.getTreeMessage()
                  this.taskStatusLoading = false
              })
              .catch((error) => {
                  alert(error)
                  this.taskStatusLoading = false
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
        this.currentChangePage(this.evidencePhoneInfo.app_list, currentPage)
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
      console.log(this.tempList)
    },
    getCreateTable() {
        this.bondsAllList.forEach((value, index) => {
            if (value.phone) {
                if (value.phone === this.activeName) {
                    this.evidencePhoneInfo = value
                }
            }
        })
        console.log(this.evidencePhoneInfo)
      this.total1 = this.evidencePhoneInfo.app_list.length
      this.flag = 0
      this.handleCurrentChange1(this.currentPage1)
    },
    doFilter() {
      // eslint-disable-next-line eqeqeq
      if (this.tableDataName === '') {
        this.evdencePhoneList = this.bondsAllList
        this.getCreateTable()
        return
      }
      this.tableDataEnd = []
      this.filterTableDataEnd = []
      this.evdencePhoneList = []
      this.bondsAllList.forEach((value, index) => {
        if (value.phone) {
          if (value.phone.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
              this.evdencePhoneList.push(value)
          }
        }
      })
      this.currentPage1 = 1
      this.tempList = []
      this.activeName = this.evdencePhoneList[0].phone
      this.getCreateTable()
      // this.total1 = this.filterTableDataEnd.length
      // this.currentChangePage(this.filterTableDataEnd, this.currentPage1)
      // this.flag = 1
    },
    openData() {
      this.tableDataName = []
      this.getCreateTable()
    },
    getParams() {
      this.case_id = this.$route.query.caseId;
      this.task_id = this.$route.query.taskId;
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
  /*section.el-table__header tr,*/
  /*section.el-table__header th {*/
  /*  padding: 0;*/
  /*  height: 110px;*/
  /*}*/
  /*section.el-table__body tr,*/
  /*section.el-table__body td {*/
  /*  padding: 0;*/
  /*  height: 110px;*/
  /*}*/
  .status-info{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#909399;
    border-radius:50%;
    /*border:2px solid #909399;*/
  }
  .status-primary{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#409eff;
    border-radius:50%;
    /*border:2px solid #409eff;*/
  }
  .status-success{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#67c23a;
    border-radius:50%;
    /*border:2px solid #67c23a;*/
  }
  .status-warning{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#e6a23c;
    border-radius:50%;
    /*border:2px solid #e6a23c;*/
  }
  .status-danger{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#f56c6c;
    border-radius:50%;
    /*border:2px solid #f56c6c;*/
  }

</style>

