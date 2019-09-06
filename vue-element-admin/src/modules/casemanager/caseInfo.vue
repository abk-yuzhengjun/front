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
                {{ tableData.case_info.case_id }}
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
                {{ tableData.case_info.case_name }}
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="grid-form-3">
            <el-form-item label="详情：">
              {{ tableData.case_info.case_info }}
            </el-form-item>
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
            <span style="margin-left: 10px">{{(scope.row.create_ts.$date -(8*3600*1000)) | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
                <el-button size="mini" class="grid-form-state" @click="taskStateChange(0)" round>未开始</el-button>
                <el-button type="danger" class="grid-form-state" size="mini" @click="taskStateChange(1)" round>进行中</el-button>
                <el-button type="success" class="grid-form-state" size="mini" @click="taskStateChange(2)" round>完成</el-button>
              </div>
              <el-button type="primary" slot="reference" style="width:80px">{{ taskStateShow(scope.row.task_state) }}</el-button>
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
              @click="remId(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :page-size="10"-->
<!--        :total=total class="grid-form-pag"-->
<!--        >-->
<!--      </el-pagination>-->
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
      <task-creator type="1" ></task-creator>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button  @click="dialogSubmit" >取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogFlase">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>
      </div>
  </el-form>



</template>

<script>
import TaskCreator from "./creattask";
import store from '../../store'

const axios = require('axios')

export default {
  name: 'CaseInfo',
    props: {
      // taskInfo:{
      //     type:Array,
      //     required:ture
      // }
    },
    components: {TaskCreator},
    data() {
    return {
        cid:0,
        // tableKey: 0,
        // list: null,
        // visible: false,
        dialogFormVisible:false,
        total: 0,
        currentRow: "",
        currentPage: 1,
        pageSize: 10,
        tempList:[],
        // listLoading: true,
        listQuery: {
            page: 1,
            limit: 20,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id'
        },

      tableData:{
            case_info:{
                user_id: '',
                case_id: 1,
                case_name: '',
                case_info: '',
                create_ts: '',
                update_ts: '',
            },
          task_info: [
              {
                  visible: false,
                  user_id: '',
                  case_name:'',
                  task_id: 1,
                  task_name: '',
                  create_ts: '',
                  task_type: '',
                  task_state: 0,
                  dev_list: [],
                  number_content: {
                      capture_mode: '',
                      imsi_black_list: [
                          ''
                      ],
                      capture_operation: '',
                      capture_typr: ''
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
      options_operator: [
          '全部',
          '中国移动',
          '中国联通',
          '中国电信',
      ],
      option_app: [
          '全部',
          '支付宝',
          '微信',
          '微博',
          '抖音',
          '淘宝',
      ],
      form: {
        user_id:'',
        case_name: '',
        describe: ''
      },
      formLabelWidth: '120px',
      activeName: 'CN',
      value1:[],
      value2:[],
    }


  },

    created() {
        this.getList()
        this.form.case_name = this.$route.query.case_name



    },

    methods: {

        dialogSubmit(){

        },
        remId(id){
            console.log("row id  ",id)
            this.cid = id
            this.dialogFormVisible = !this.dialogFormVisible;
            console.log("remb id ",this.cid)
            this.dialogShow()
        },
       dialogShow:function(){
           console.log("dialogShow called");
           console.log("cid:",this.cid)
           console.log("info:",this.tableData.task_info[this.cid])
           // this.dialogFormVisible = !this.dialogFormVisible;
           this.$store.commit('caseInfo/setDialogRow',this.tableData.task_info[this.cid])

       },
        dialogFlase:function(){
            this.dialogFormVisible = !this.dialogFormVisible;

        },
        taskTypeShow(type){
            if (type == 1){
                return '取号'
            }
            else {
                return '取证'
            }
        },
        taskStateShow(type){
            if (type == 0){
                return '未开始'
            }
            else if(type == 1){
                return '进行中'
            }
            else if(type == 2){
                return '完成'
            }
            else {
                return '错误状态'
            }
        },
        taskStateSubmit(){
            const host = 'http://localhost:5000'
            this.form.user_id = this.$store.getters.name
            this.form.case_name = this.$store.getters.case_name

            console.log("taskStateSubmit")
            axios.post(host + '/caseManage/caseInfo/taskStateSubmit', this.currentRow)
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
        taskStateChange(type){
            this.currentRow.visible = false
            this.currentRow.task_state = type
            console.log("task_state:",this.currentRow.task_state)
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
            this.currentChangePage(this.tableData.task_info,val)
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
          const host = 'http://localhost:5000'
          console.log('query case!')
          this.form.user_id = this.$store.getters.name
          this.form.case_name = this.$store.getters.case_name

          console.log(this.$store.getters.case_name)
          axios.post(host + '/caseManage/caseInfo/getInfo', this.form)
              .then(response => { this.tableData = response.data
                  console.log(this.tableData)
                  this.total = this.tableData.task_info.length
                  console.log("this.total:",this.total)
                  this.currentChangePage(this.tableData.task_info,1)}
              )
              .catch(function(error) {
                  console.log(error)
              })
              .finally(function() {
                  console.log('get request finally')
              })
      }
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
