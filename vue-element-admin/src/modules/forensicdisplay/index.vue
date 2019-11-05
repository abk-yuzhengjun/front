<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;display: flex;padding-bottom: 20px; background: #F3F4F7">
      <div style="width: 100%; background: #FFFFFF;display: flex; padding: 20px 20px 10px 20px;flex-direction: column;">
        <el-row>
          <el-col style="width: 30px;">
            <svg-icon icon-class="task_phone" style="width: 26px;height: 26px"></svg-icon>
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
              <span style="font-size: 14px;color: #666666;">上号/取号成功</span>
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
              <el-button :type="this.task_status_show_dict.get(taskInfo.task_status)" v-if="taskInfo!==undefined" @click="updateTaskStatus" size="mini">{{task_status_dict.get(taskInfo.task_status)}}</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="display: flex;justify-content: flex-end">
              <span style="font-size: 16px;color: #333333;">{{this.capturePhoneNumber}}/{{this.phoneNumber}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 5px;padding-top: 6px">
          <el-col style="width: 30px;">
            &nbsp
          </el-col>
          <el-col :span="6">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">取号范围:&nbsp </span>
              <span style="font-size: 14px;color: #333333;" v-if="taskInfo!==undefined">{{this.capture_mode_dict.get(taskInfo.number_content.capture_mode)}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="display: flex;flex-direction:row">
              <span style="font-size: 14px;color: #666666;">取号方式:&nbsp </span>
              <span style="font-size: 14px;color: #333333;" v-if="taskInfo!==undefined">{{this.capture_type_dict.get(taskInfo.number_content.capture_type)}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 15px;padding-top: 15px;">
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
      </div>
    </div>

    <div style="width: 100%;display: flex;padding-bottom: 20px; background: #F3F4F7">
      <div style="width: 100%; background: #FFFFFF;display: flex; padding: 20px 20px 20px 20px;flex-direction: column;">
        <el-row>
          <el-col :span="24">
            <div style="display: flex;justify-content: space-between">
              <span style="font-size: 16px;color: #333333; font-weight: bold">任务动态&nbsp</span>
              <el-button type="text" @click="jumpToPhoneDetails">全部</el-button>
            </div>
          </el-col>
          <el-col :span="24" style="padding-bottom: 10px;padding-top: 6px">
            <div style="display: flex;">
              <span class="status-success"  v-if="this.message_scoll1!==''"></span>
              <span style="font-size: 16px;color: #333333;" v-if="this.message_scoll1!==''">&nbspimsi:&nbsp&nbsp{{this.message_scoll1.msg.imsi}}&nbsp&nbsp&nbsp&nbsp {{this.imsi_status_dict.get(this.message_scoll1.msg.imsi_status)}} &nbsp&nbsp&nbsp&nbsp{{this.message_scoll1.head.timestamp}}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="display: flex;">
              <span class="status-success"  v-if="this.message_scoll2!==''"></span>
              <span style="font-size: 16px;color: #333333;" v-if="this.message_scoll2!==''">&nbspimsi:&nbsp&nbsp{{this.message_scoll2.msg.imsi}}&nbsp&nbsp&nbsp&nbsp {{this.imsi_status_dict.get(this.message_scoll2.msg.imsi_status)}} &nbsp&nbsp&nbsp&nbsp{{this.message_scoll2.head.timestamp}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row style="padding: 20px 10px 0px 20px;">
      <el-col :span="17">
        <div style="display: flex;flex-direction:row">
          <span style="font-size: 16px;font-weight: bold">取号列表</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div style="display: flex;flex-direction:row">
          <el-input v-model="tableDataName" align="right" placeholder="请输入" suffix-icon="el-icon-search" style="width:360px" @input="doFilter" />
        </div>
      </el-col>
    </el-row>
    <div style="width: 100%;display: flex;flex-direction: column;padding:10px;">
      <el-table
        :data="tempList"
        :header-cell-style="{color:'#666666',font: '14px Base'}"
        :cell-style="{font: '14px Base', color:'#333333'}"
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
        width="100%"
      >
        <el-table-column property="imsi" label="Imsi" min-width="20px" align="left" />
        <el-table-column property="phone" label="手机号码" min-width="20px" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.phone === undefined">------</span>
            <span v-else>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="20px" align="left" >
          <template slot-scope="scope">
            <span :class="imsi_status_show_dict.get(scope.row.status)"></span>
            <el-tag :type="imsi_status_tag_show_dict.get(scope.row.status)">{{imsi_status_dict.get(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="gsm_imsi_capture_ts" label="2G主动式上号时间" min-width="20px" align="left" >
          <template slot-scope="scope">
            <span v-if="scope.row.gsm_imsi_capture_ts === undefined">--------</span>
            <span v-else>{{scope.row.gsm_imsi_capture_ts}}</span>
          </template>
        </el-table-column>
        <el-table-column property="lte_imsi_capture_ts" label="4G主动式上号时间" min-width="20px" align="left" >
          <template slot-scope="scope">
            <span v-if="scope.row.lte_imsi_capture_ts === undefined">--------</span>
            <span v-else>{{scope.row.lte_imsi_capture_ts}}</span>
          </template>
        </el-table-column>
        <el-table-column property="phone_capture_ts" label="取号成功时间" min-width="20px" align="left" />
        <el-table-column  label="耗时" min-width="10px" align="left" >
          <template slot-scope="scope">
            <span>{{calcSpendTime(scope.row.gsm_imsi_capture_ts,scope.row.lte_imsi_capture_ts,scope.row.phone_capture_ts)}}</span>
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
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        :total="total1"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    </div>
    <div v-if="dialogFormVisible">
      <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
        <task_comp :taskData ='dialogPropTask' v-on:closeTaskDialog="closeTaskDialog" />
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
  name: 'PhoneInformation',
  components: {task_comp},
  data() {
    return {
      total1: 0,
      dialogFormVisible: 0,
      currentPage1: 1,
      pageSize: 5,
      bondsAllList: '',
      tempList: [],
      emptyText: '',
      tableDataName: '',
      details: '',
      status: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      flag: 0,
      task_name: '',
      case_name: '',
      task_id: '',
      case_id: '',
      phoneNumber: 0,
      capturePhoneNumber: 0,
      capture_type_dict: new Map([[1, "网络优先"], [2, "仅空口"]]),
      capture_mode_dict: new Map([[1, "全部"], [2, "黑名单"]]),
      task_status_dict: new Map([["ready", "准备中"], ["running", "取号中"], ["complete", "已完成"], ["failed", "已失败"], ["canceled", "已取消"]]),
      task_status_show_dict: new Map([["ready", 'primary'], ["running", "danger"], ["complete", 'success'], ["failed", 'warning'], ["canceled", 'info']]),
      message_scoll1:'',
      message_scoll2:'',
      imsi_status_dict:new Map([["", "未开始"], ["1", "控制中心下发取号任务"], ["2", "4G主动式上号"],["3", "2G主动式上号"],["31", "2G主动式丢失目标"],
          ["4", "控制中心给伪终端发任务"],["5", "伪终端鉴权中"],
          ["51", "收到伪终端rand"],["52", "收到主动式sres"],["53", "伪终端鉴权成功"],["54", "伪终端鉴权失败"],
          ["6", "伪终端发送取号短信成功"], ["7", "伪终端发送取号短信失败"],["8", "取号成功"]]),
      imsi_status_show_dict:new Map([["1", "status-primary"], ["2", "status-primary"], ["3", "status-warning"],["31", "status-info"], ["4", "status-success"],
          ["51", "status-primary"],["52", "status-primary"],["53", "status-success"],["54", "status-info"],
          ["5", "status-danger"], ["6", "status-warning"], ["7", "status-info"], ["8", "status-success"]]),
        imsi_status_tag_show_dict:new Map([["1", "primary"], ["2", "primary"], ["3", "warning"],["31", "info"], ["4", "success"], ["5", "danger"],
            ["51", "primary"],["52", "primary"],["53", "success"],["54", "info"],
            ["6", "warning"], ["7", "info"], ["8", "success"]]),
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
          console.log('watch phone init.......');
          this.init()
      },
      phoneInfo() {
          console.log('watch phoneInfo.......');
          this.getPhoneInfo(this.phoneInfo);
      },
      phoneImsiInfo() {
          console.log('watch phoneImsiInfo.......');
          console.log(this.phoneImsiInfo)
          if(this.phoneImsiInfo.length === 0)
          {
              return;
          }
          console.log('update bonds')
          this.bondsAllList = this.phoneImsiInfo;
          this.tableDataName = '';
          // this.currentPage1 = 1;
          // let page = parseInt(this.phoneImsiInfo.length/this.pageSize)
          // if(page * this.pageSize < this.phoneImsiInfo.length)
          // {
          //     page += 1
          // }
          // this.currentPage1 = page
          this.getCreateTable()


      },
      taskStatusError() {
        let errorInfo = this.taskStatusError.msg.cause;
        if(errorInfo === 'Active device is not online.'){
            errorInfo = '没有可用的主动式设备'
        }
          this.$message({
              message: errorInfo,
              type: 'warning'
          });
          this.$store.commit('phoneDetails/webSetTaskStatusErrorFlag', 1)
      }
  },
  created() {
    this.init()
  },
    computed: {
        ...mapGetters({ caseInfo:'caseInfo',taskInfo:'taskInfo',
            phoneInfo:'phoneInfo',phoneImsiInfo:'phoneImsiInfo',
            taskStatusError: 'taskStatusError'}),
    },
    // sockets: {
    // },
  methods: {
      closeTaskDialog() {
          console.log('-------------Task----------------')
          this.dialogFormVisible = !this.dialogFormVisible
          this.getTreeMessage()
      },
      notifyMessage(status,data) {
          this.$notify({
              title: '取号任务',
              message: data,
              type: 'success',
              duration: 0,
              dangerouslyUseHTMLString: true
          });
      },
      getTreeMessage() {
          const path2 = this.$store.getters.host + '/forensic/casetaskdisplay'
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
      calcSpendTime(begin2GTime,begin4GTime,endTime) {
          if(endTime === undefined)
          {
              return '未结束';
          }
          else if(begin2GTime === undefined && begin4GTime === undefined)
          {
              return '0秒'
          }
          if(begin2GTime === undefined)
          {
              begin2GTime = begin4GTime
          }
          else if(begin4GTime === undefined)
          {
              begin4GTime = begin2GTime
          }
          let time2G = new Date(begin2GTime);
          let time4G = new Date(begin4GTime);
          let time1 = Math.min(time2G,time4G)
          time1 = new Date(time1)
          let time2 = new Date(endTime);
          let spendTimeSecond = Math.abs(time1.getTime() - time2.getTime())/1000;
          let spendTimeMin = parseInt(spendTimeSecond/60);
          if(spendTimeSecond < 60)
          {
              return spendTimeSecond + '秒'
          }
          else
          {
              spendTimeSecond = spendTimeSecond - 60 * spendTimeMin;
              return spendTimeMin + '分' + spendTimeSecond + '秒';
          }
          return
      },
      getPhoneInfo(data) {
          console.log('getPhoneInfo:')
          let temp = data
          let result = []
          for(let index in temp)
          {
              if(temp[index]['msg']['task_id'] === this.task_id)
              {
                  result.push(temp[index])
              }
          }
          let length = result.length;
          if(length >= 2)
          {
              this.message_scoll1 = result[length - 1];
              this.message_scoll2 = result[length - 2];
          }
          else if(length == 1)
          {
              this.message_scoll1 = result[0];
              this.message_scoll2 = '';
          }
          else
          {
              this.message_scoll1 = '';
              this.message_scoll2 = '';
          }
          // for(let index in result)
          // {
          //     if(result[index].msg.imsi_status === '8')
          //     {
          //         this.notifyMessage('',result[index]['msg']['imsi']+'\n'+this.imsi_status_dict.get(result[index]['msg']['imsi_status'])+'<br/>'+result[index]['msg']['phone']+'<br/>'+result[index]['head']['timestamp'])
          //     }
          // }
          console.log(this.message_scoll1)
          console.log(this.message_scoll2)
      },
      init() {
          console.log('phoneInformation init')
          console.log(this.$store.state.user.host)
          this.getParams()
          if(this.$store.getters.phoneInfo !== [])
          {
              this.getPhoneInfo(this.$store.getters.phoneInfo)
          }
          // this.getMessage()
          this.getMessageByPost()
          let task_show_dict = new Map([["ready", '准备中'], ["running", '运行中'], ["complete", '已完成'], ["failed", '失败'], ["canceled", '已取消']]);
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
      },
      updateTaskStatus() {
          let taskStatus = ''
          console.log(this.task_info.task_status)
          if(this.task_info.task_status==='ready')
          {
              taskStatus = '开始'
          }
          else if(this.task_info.task_status === 'running')
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
                  console.log('start update status')
                  this.handelTaskStatus(taskStatus)
              })
              .catch(() => {
                  // this.$message({
                  //     type: 'info',
                  //     message: '已取消!'
                  // })
              })
      },
      handelTaskStatus(taskStatus) {
          const path2 = this.$store.getters.host + '/caseManage/caseInfo/taskStateSubmit'
          this.taskStatusLoading = true
          console.log('start update loading status')
          const param = {
              user_id: this.$store.state.user.name,
              case_id: this.case_id,
              task_id: this.task_id,
              task_status: this.task_info.task_status
          }
          console.log('param!');
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
          console.log(this.dialogPropTask)
          console.log('task dialog')
      },
      getMessageByPost() {
          const path = this.$store.getters.host + '/forensic/phoneInformation'
          const list = {
              task_id:this.task_id
          }
          axios.post(path,list)
              .then((res) => {
                  this.bondsAllList = res.data;
                  this.tableDataName = '';
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
      this.pageSize = pageSize;
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function(currentPage) { // 页码切换
      this.currentPage1 = currentPage;
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
          console.log(this.$store.getters.host)
        this.phoneNumber = 0
        this.capturePhoneNumber = 0
        for (let index in this.bondsAllList)
        {
            if( this.bondsAllList[index].status === "8")
            {
                this.phoneNumber++;
            }
            if( parseInt(this.bondsAllList[index].status) > 1)
            {
                this.capturePhoneNumber++;
            }
        }
        this.currentPage1 = 1;
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
          else if (value.imsi) {
              if (value.imsi.indexOf(this.tableDataName) >= 0) {
                  this.filterTableDataEnd.push(value)
              }
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
        this.$store.commit('forensic/getTreeCaseInfo', this.case_id)
        this.$store.commit('forensic/getTreeTaskInfo', this.task_id)
    },
    jumpToCaseDisplay() {
      this.$router.push(
        {
          name: 'casedisplay'
        })
    },
      jumpToPhoneDetails() {
          this.$router.push(
              {
                  name: 'phoneDetailsShow',
                  query:{
                      task_id:this.task_id,
                  }
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

