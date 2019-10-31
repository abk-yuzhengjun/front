<template>
  <el-form class="grid-form-1">
    <div class="grid-form-2">
      <el-form ref="form" :model="form">
        <el-form-item label="案件详情" class="grid-form-2">
        </el-form-item>
        <el-row class= "grid-form-3">
          <el-col :span="8">
            <el-form-item label="案件编号：">
              <el-form-item label="">
                {{ tableData.case_id }}
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-form-item label="">
                进行中
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件名：">
              <el-form-item label="">
                {{ tableData.case_name }}
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="grid-form-3">
            <el-form-item label="详情：">
              {{ tableData.case_detail }}
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-right: 0px">
            <el-button
              size="mini"
              type="text"
              @click="caseInfoEdit">编辑</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="grid-form-2">
      <el-form-item label="任务列表" class= "grid-form-4">
        <el-input
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          class="grid-form-5">
        </el-input>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
      <el-table
        :data="tempList"
        style="width: 100% ; margin-left: 50px;align:center"
        highlight-current-row
        @current-change="handleTableChange">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{(scope.row.create_ts -(8*3600)) | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务名"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.task_name }}
          </template>
        </el-table-column>
        <el-table-column
          label="任务类型"
          width="180">
          <template slot-scope="scope">
            {{ taskTypeShow(scope.row.task_type) }}
          </template>
        </el-table-column>
        <el-table-column label="任务状态"
                         width="180">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <p>  进度选择</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" class="grid-form-state" @click="taskStateChange('ready',scope.$index)" round>未开始</el-button>
                <el-button type="warning" class="grid-form-state" size="mini" @click="taskStateChange('running',scope.$index)" round>进行中</el-button>
                <el-button type="success" class="grid-form-state" size="mini" @click="taskStateChange('complete',scope.$index)" round>完成</el-button>
                <el-button type="danger" class="grid-form-state" size="mini" @click="taskStateChange('failed',scope.$index)" round>失败</el-button>
                <el-button  type="info" class="grid-form-state" size="mini" @click="taskStateChange('canceled',scope.$index)" round>放弃</el-button>
              </div>
              <el-button type="primary" slot="reference" style="width:80px">{{ taskStateShow(scope.row.task_status) }}</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="任务详情"
          width="180"
          style="margin-left: 50px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="编辑"
          width="180"
          type="index"
          style="margin-left: 50px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="dialogShow(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
    </div>
    <div v-if="dialogFormVisible">
    <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
      <task_comp :taskData = 'form' ></task_comp>
    </el-dialog>
      </div>
    <div v-if="dialogcaseInfoVisible">
      <el-dialog title="编辑案件" :visible.sync="dialogcaseInfoVisible" >
        <case_comp :compData='caseEditInfo'></case_comp>
      </el-dialog>
    </div>
  </el-form>




</template>

<script>
import task_comp from "../component/task_comp";
import case_comp from "../component/case_comp";
import store from '../../store'

const axios = require('axios')

export default {
  name: 'CaseInfo',
    props: {

    },
    components: {task_comp,case_comp},
    data() {
    return {
        cid:0,
        dialogFormVisible:false,
        dialogcaseInfoVisible:false,
        total: 0,
        currentRow: "",
        currentPage: 1,
        pageSize: 10,
        tempList:[],
        form:{
            type:'',
            dev_list:[],
            case_list:[],
            oper_list:[],
            app_list:[],
            task_info:''
        },
        newForm :{
            user_id:'',
            case_name:'',
            case_id:''},
        caseEditInfo:{
            user_id:'',
            case_id: '',
            case_name: '',
            case_detail: '',
            create_ts: '',
            update_ts: '',
            type: ''
        },
      tableData:{
            user_id:'',
            case_id: '',
            case_name: '',
            case_detail: '',
            create_ts: '',
            update_ts: '',
            type: '',//创建任务页面0 案件中新增任务1 编辑已有任务2
            dev_list:[],
            case_list:[],
            oper_list:[],
            app_list:[],
          task_list: [
              {
                  visible: false,
                  user_id: '',
                  case_name:'',
                  task_id: '',
                  task_name: '',
                  task_type: '',
                  task_status: '',
                  update_ts:'',
                  create_ts:'',
                  dev_list: [],
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
          ]
       },
        taskStatusChange:{
            user_id:'',
            case_id: '',
            task_id:'',
            task_status:''
        },
      formLabelWidth: '120px',

    }


  },

    created() {
        this.getUsrInfo()
        this.getList()




    },

    methods: {
        caseInfoEdit(){

            this.caseEditInfo.type = 1
            this.caseEditInfo.case_name = this.tableData.case_name
            this.caseEditInfo.case_detail = this.tableData.case_detail
            this.caseEditInfo.case_id = this.tableData.case_id
            this.caseEditInfo.user_id = this.tableData.user_id
            this.dialogcaseInfoVisible = !this.dialogcaseInfoVisible


        },
        getUsrInfo(){
            console.log("store:",this.$store.state)
            this.tableData.dev_list = this.$store.state.baseInfo.dev_list
            this.tableData.app_list = this.$store.state.baseInfo.app_list
            this.tableData.oper_list = this.$store.state.baseInfo.oper_list
            this.tableData.case_list = this.$store.state.baseInfo.case_list
        },
        dialogSubmit(){

        },
       dialogShow(id){

           console.log("dialogShow called");

           console.log("info:",this.tableData.task_list[this.cid])
           this.form.dev_list = this.tableData.dev_list
           this.form.app_list = this.tableData.app_list
           this.form.oper_list = this.tableData.oper_list
           this.form.case_list = this.tableData.case_list
           this.form.task_info = this.tableData.task_list[id]
           this.dialogFormVisible = !this.dialogFormVisible;
       },
        taskTypeShow(type){
            if (type === 1){
                return '取号'
            }
            else {
                return '取证'
            }
        },
        taskStateShow(type){
            console.log("taskStateShow",type)
            if (type === 'ready'){
                return '未开始'
            }
            else if(type === 'running'){
                return '进行中'
            }
            else if(type === 'complete'){
                return '完成'
            }
            else if(type === 'failed'){
                return '失败'
            }
            else if(type === 'canceled'){
                return '放弃'
            }
            else {
                return '错误状态'
            }
        },
        taskStateSubmit(){
            const host = this.$store.getters.host
            this.taskStatusChange.case_id = this.tableData.case_id
            this.taskStatusChange.user_id = this.tableData.user_id
            this.taskStatusChange.task_id = this.currentRow.task_id
            this.taskStatusChange.task_status = this.currentRow.task_status

            console.log("taskStateSubmit",this.taskStatusChange)

            axios.post(host + '/caseManage/caseInfo/taskStateSubmit', this.taskStatusChange)
                .then(function (response){
                    console.log(response)
                    }
                )
                .catch(function(error) {
                    console.log(error)
                })
                .finally(function() {
                    console.log('get request finally')
                })
        },
        taskStateChange(type,index){

            this.tableData.task_list[index].visible =!this.tableData.task_list[index].visible
            this.tableData.task_list[index].task_status = type
            console.log("taskStateChange:",this.tableData.task_list[index])
            this.taskStateSubmit()
            // scope.row.visible = false
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.handleCurrentChange(this.currentPage);


        },
        handleTableChange(val) {
            this.currentRow = val
            console.log("currentrow ：",this.currentRow)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.currentChangePage(this.tableData.task_list,val)
        },
        currentChangePage(list,page) {
            let from = (page - 1) * this.pageSize;
            let to = page * this.pageSize;

            this.tempList = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.tempList.push(list[from]);
                }
            }
        },

      getList(){
          const host = this.$store.getters.host

          this.newForm.user_id = this.$store.getters.name
          console.log("query", this.$route.query)
          this.newForm.case_name  = this.$route.query.info.case.case_name
          this.newForm.case_id  = this.$route.query.info.case.case_id
          console.log("newform", this.newForm)

          axios.post(host + '/caseManage/caseInfo/getInfo', this.newForm)
              .then(response => { this.tableData = response.data
                  console.log("tableData11:",this.tableData)
                  this.total = this.tableData.task_list.length
                  console.log("this.total:",this.total)
                  this.currentChangePage(this.tableData.task_list,1)}
              )
              .catch(function(error) {
                  console.log(error)
              })
              .finally(function() {
                  console.log('get request finally')
              })
      },

    },


}

</script>

<style scoped>

  .grid-form-1 {
    background-color: #f2f2f2;
    width: 100%;


  }
  .grid-form-2 {
    margin: 10px;
    font-size: 25px;
    background-color: white;
  }
  .grid-form-3 {
     margin-left: 20px;

   }
  .grid-form-4 {
    margin-left: 10px;
  }
  .grid-form-5 {
    width: 300px;
    margin-left: 750px;
  }
  .grid-form-pag{
    margin-left: 50px;
    margin-top: 50px;
  }
  .grid-form-state{
    margin:5px;
    width:120px

  }
  .grid_form_state_1{
    margin:5px;

  }
  .grid_form_state_2{
    margin:5px;
    type:'danger';

  }
  .grid_form_state_3{
    margin:5px;
    type:'success';
    width:100px
  }

</style>
